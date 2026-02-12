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
  userId: z.string().min(1, { message: "Please enter a valid User ID." }),
  password: z.string().min(1, { message: "Password is required." }), // Dummy validation
});

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const user = mockCredentials.find(u => u.id.toLowerCase() === values.userId.toLowerCase());

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
                description: "No user found with that ID.",
            });
            form.setError("userId", {
                type: "manual",
                message: "No user found with that ID.",
            });
        }
        setIsLoading(false);
    }, 500);
  }

  const sampleUsers = [
    { role: 'Admin', id: 'user-admin' },
    { role: 'Teacher', id: 'user-teacher-1' },
    { role: 'Student', id: 'user-student-1' },
    { role: 'Parent', id: 'user-parent-1' },
  ];

  return (
    <Card className="w-full max-w-sm mt-8 shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
        <CardDescription>
          Enter your User ID to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. user-admin"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setSelectedUserEmail(null);
                      }}
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
                {sampleUsers.map(user => (
                <Button
                    key={user.id}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                        e.preventDefault();
                        form.setValue('userId', user.id);
                        form.setValue('password', 'password');
                        const credential = mockCredentials.find(c => c.id === user.id);
                        setSelectedUserEmail(credential ? credential.email : null);
                    }}
                >
                    {user.role}
                </Button>
                ))}
            </div>
             {selectedUserEmail && (
                <div className="mt-3 text-xs text-muted-foreground">
                    Logging in with email: <span className="font-medium text-foreground">{selectedUserEmail}</span>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
