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
import { mockCredentials } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }), // Dummy validation
});

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const user = mockCredentials.find(u => u.email.toLowerCase() === values.email.toLowerCase());

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
                description: "No user found with that email.",
            });
            form.setError("email", {
                type: "manual",
                message: "No user found with that email.",
            });
        }
        setIsLoading(false);
    }, 500);
  }

    // Find actual sample emails from mock data
  const adminUser = mockCredentials.find(u => u.id === 'user-admin');
  const teacherUser = mockCredentials.find(u => u.id === 'user-teacher-1');
  const studentUser = mockCredentials.find(u => u.id === 'user-student-1');
  const parentUser = mockCredentials.find(u => u.id === 'user-parent-1');

  const sampleUsers = [
    { role: 'Admin', email: adminUser?.email },
    { role: 'Teacher', email: teacherUser?.email },
    { role: 'Student', email: studentUser?.email },
    { role: 'Parent', email: parentUser?.email },
  ].filter(u => u.email); // Filter out any that might be undefined

  return (
    <Card className="w-full max-w-sm mt-8 shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
        <CardDescription>
          Enter your email to access your dashboard.
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
        <div className="text-center">
            <p className="text-xs text-muted-foreground">Or click to quick-login as:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
                {sampleUsers.map(user => user.email ? (
                <Button
                    key={user.email}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                        e.preventDefault();
                        form.setValue('email', user.email!);
                        form.setValue('password', 'password');
                    }}
                >
                    {user.role}
                </Button>
                ) : null)}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
