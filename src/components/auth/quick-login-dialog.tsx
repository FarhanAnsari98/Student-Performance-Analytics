"use client";

import * as React from "react";
import { useAuth } from "@/context/auth-context";
import { useData } from "@/context/data-context";
import type { Role, Student, Teacher, Parent, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";


const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
};

interface QuickLoginDialogProps {
    role: Role;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function QuickLoginDialog({ role, open, onOpenChange }: QuickLoginDialogProps) {
    const { login } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const { students, teachers, parents, classes } = useData();
    const [searchTerm, setSearchTerm] = React.useState("");

    const users: (Student | Teacher | Parent)[] = React.useMemo(() => {
        switch (role) {
            case 'STUDENT': return students.filter(s => s.status === 'ACTIVE');
            case 'TEACHER': return teachers;
            case 'PARENT': return parents;
            default: return [];
        }
    }, [role, students, teachers, parents]);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogin = (userToLogin: Student | Teacher | Parent) => {
        let userRole: Role | undefined;

        if ('classId' in userToLogin) {
            userRole = 'STUDENT';
        } else if ('subject' in userToLogin) {
            userRole = 'TEACHER';
        } else if ('childIds' in userToLogin) {
            userRole = 'PARENT';
        }
        
        if (userRole) {
            const userForAuth: User = {
                id: `user-${userToLogin.id}`,
                name: userToLogin.name,
                email: userToLogin.email,
                role: userRole,
                avatarUrl: userToLogin.avatarUrl
            };
            login(userForAuth);
            toast({
                title: "Login Successful",
                description: `Welcome back, ${userForAuth.name}!`,
            });
            router.push("/dashboard");
            onOpenChange(false);
        }
    };

    const getUserDescription = (user: Student | Teacher | Parent) => {
        switch (role) {
            case 'TEACHER': {
                const teacher = user as Teacher;
                const assignedClasses = classes.filter(c => c.teacherId === teacher.id).map(c => c.name.replace('Grade ','').replace(' - Section', ''));
                return `${teacher.subject}${assignedClasses.length > 0 ? ` (${assignedClasses.join(', ')})` : ''}`;
            }
            case 'STUDENT': {
                const student = user as Student;
                const studentClass = classes.find(c => c.id === student.classId);
                return studentClass?.name || 'No Class';
            }
            case 'PARENT': {
                const parent = user as Parent;
                const childrenDetails = parent.childIds.map(id => {
                    const student = students.find(s => s.id === id);
                    if (!student) return null;
                    const studentClass = classes.find(c => c.id === student.classId);
                    return `${student.name} (${studentClass?.name || 'No Class'})`;
                }).filter(Boolean);

                if (childrenDetails.length > 0) {
                    return `Parent of ${childrenDetails.join(', ')}`;
                }
                return 'No children assigned';
            }
            default:
                return user.email;
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Login as {role.charAt(0) + role.slice(1).toLowerCase()}</DialogTitle>
                    <DialogDescription>Select a user to log in as.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <Input 
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ScrollArea className="h-72">
                        <div className="space-y-2 pr-4">
                            {filteredUsers.map(user => (
                                <Button
                                    key={user.id}
                                    variant="ghost"
                                    className="w-full justify-start h-auto p-2"
                                    onClick={() => handleLogin(user)}
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.avatarUrl} alt={user.name}/>
                                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-3 text-left">
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-xs text-muted-foreground">{getUserDescription(user)}</div>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}
