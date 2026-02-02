"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { useData } from "@/context/data-context";
import { useAuth } from "@/context/auth-context";
import type { Student } from "@/lib/types";

const formSchema = z.object({
    content: z.string().min(10, { message: "Remark must be at least 10 characters." }).max(500),
});

interface AddRemarkDialogProps {
    student: Student;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddRemarkDialog({ student, open, onOpenChange }: AddRemarkDialogProps) {
    const { addRemarkToStudent } = useData();
    const { user } = useAuth(); // Teacher

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { content: "" },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!user) return;
        addRemarkToStudent(student.id, values.content, user.name);
        form.reset();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Remark for {student.name}</DialogTitle>
                    <DialogDescription>
                        Your feedback will be visible to the student and their parent.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Remark</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="e.g. 'Shows great potential in solving complex problems...'" {...field} rows={4}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Save Remark</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
