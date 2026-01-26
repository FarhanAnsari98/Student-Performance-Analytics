"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import type { Role } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mockUsers } from "@/lib/mock-data";

export function LoginForm() {
  const [role, setRole] = React.useState<Role>("STUDENT");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let userToLogin;
    switch (role) {
      case "ADMIN":
        userToLogin = mockUsers.admin;
        break;
      case "TEACHER":
        userToLogin = mockUsers.teacher;
        break;
      case "PARENT":
        userToLogin = mockUsers.parent;
        break;
      case "STUDENT":
      default:
        userToLogin = mockUsers.student;
        break;
    }
    login(userToLogin);
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-sm mt-8 shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
        <CardDescription>
          Select your role to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <RadioGroup
            defaultValue="STUDENT"
            className="grid grid-cols-2 gap-4"
            onValueChange={(value: Role) => setRole(value)}
          >
            <div>
              <RadioGroupItem value="STUDENT" id="student" className="peer sr-only" />
              <Label
                htmlFor="student"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Student
              </Label>
            </div>
            <div>
              <RadioGroupItem value="TEACHER" id="teacher" className="peer sr-only" />
              <Label
                htmlFor="teacher"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Teacher
              </Label>
            </div>
            <div>
              <RadioGroupItem value="PARENT" id="parent" className="peer sr-only" />
              <Label
                htmlFor="parent"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Parent
              </Label>
            </div>
            <div>
              <RadioGroupItem value="ADMIN" id="admin" className="peer sr-only" />
              <Label
                htmlFor="admin"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Admin
              </Label>
            </div>
          </RadioGroup>
          <Button type="submit" className="w-full mt-4">
            Sign in as {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
