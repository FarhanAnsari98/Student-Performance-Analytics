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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  function handleQuickLogin(userId: string) {
    const user = mockCredentials.find(u => u.id === userId);
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
    <Card className="w-full max-w-sm mt-8 shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
        <CardDescription>
          Enter an email to access your dashboard, or use the quick login below.
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
        <div className="space-y-2 text-center">
            <p className="text-xs text-muted-foreground">For demo purposes, select any user to log in</p>
            <Select onValueChange={handleQuickLogin}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a user to log in..." />
                </SelectTrigger>
                <SelectContent>
                    {mockCredentials.sort((a, b) => a.name.localeCompare(b.name)).map(user => (
                        <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center gap-2">
                                <span>{user.name}</span>
                                <span className="text-muted-foreground">({user.role})</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </CardContent>
    </Card>
  );
}
