"use client";

import * as React from "react";
import { useAuth } from "@/context/auth-context";
import { useData } from "@/context/data-context";
import type { Role, Student, Teacher, Parent } from "@/lib/types";
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
import { mockCredentials } from "@/lib/mock-data";


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
    const { students, teachers, parents } = useData();
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

    const handleLogin = (userId: string) => {
        const user = mockCredentials.find(u => u.id === `user-${userId}`);
        if (user) {
            login(user);
            toast({
                title: "Login Successful",
                description: `Welcome back, ${user.name}!`,
            });
            router.push("/dashboard");
            onOpenChange(false);
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
                                    onClick={() => handleLogin(user.id)}
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.avatarUrl} alt={user.name}/>
                                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-3 text-left">
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-xs text-muted-foreground">{user.email}</div>
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
