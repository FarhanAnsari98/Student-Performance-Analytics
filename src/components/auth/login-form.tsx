
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useData } from "@/context/data-context";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";
import type { Role, User } from "@/lib/types";
import { QuickLoginDialog } from "./quick-login-dialog";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }), // Dummy validation
});

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { students, teachers, parents } = useData();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [quickLoginRole, setQuickLoginRole] = React.useState<Role | null>(null);

  const allUsers: User[] = React.useMemo(() => {
    const adminUser: User = { id: 'user-admin', name: 'Dr. Mehra', email: 'mehra.admin@gmail.com', role: 'ADMIN', avatarUrl: 'https://picsum.photos/seed/admin/200' };
    const studentUsers: User[] = students.map(s => ({ id: `user-${s.id}`, name: s.name, email: s.email, role: 'STUDENT', avatarUrl: s.avatarUrl }));
    const teacherUsers: User[] = teachers.map(t => ({ id: `user-${t.id}`, name: t.name, email: t.email, role: 'TEACHER', avatarUrl: t.avatarUrl }));
    const parentUsers: User[] = parents.map(p => ({ id: `user-${p.id}`, name: p.name, email: p.email, role: 'PARENT', avatarUrl: p.avatarUrl }));

    return [adminUser, ...studentUsers, ...teacherUsers, ...parentUsers];
  }, [students, teachers, parents]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const user = allUsers.find(u => u.email.toLowerCase() === values.email.toLowerCase());

    setTimeout(() => { // Simulate network delay
        if (user) {
            login(user);
            toast({
                title: "Login Successful",
                description: `Welcome back, ${user.name}!`,
            });
            router.push("/dashboard");
        } else {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Incorrect email or password.",
            });
            form.setError("email", {
                type: "manual",
                message: "Incorrect email or password.",
            });
        }
        setIsLoading(false);
    }, 500);
  }

  function handleAdminLogin() {
    const user = allUsers.find(u => u.id === 'user-admin');
    if (user) {
        login(user);
        toast({
            title: "Login Successful",
            description: `Welcome back, ${user.name}!`,
        });
        router.push("/dashboard");
    }
  }

  return (
    <>
        <Card className="w-full max-w-sm mt-8 shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
            <CardDescription>
            Sign in or use a quick login to explore a specific role.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="e.g. name@example.com"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormDescription>
                        Use any password for this demo application.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
                </Button>
            </form>
            </Form>
            <Separator className="my-4" />
            <div className="space-y-2">
                <p className="text-center text-xs text-muted-foreground">Quick Login</p>
                <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" onClick={handleAdminLogin}>Admin</Button>
                    <Button variant="outline" onClick={() => setQuickLoginRole('TEACHER')}>Teacher</Button>
                    <Button variant="outline" onClick={() => setQuickLoginRole('STUDENT')}>Student</Button>
                    <Button variant="outline" onClick={() => setQuickLoginRole('PARENT')}>Parent</Button>
                </div>
            </div>
        </CardContent>
        </Card>
        {quickLoginRole && (
            <QuickLoginDialog
                role={quickLoginRole}
                open={!!quickLoginRole}
                onOpenChange={(open) => { if (!open) setQuickLoginRole(null); }}
            />
        )}
    </>
  );
}
