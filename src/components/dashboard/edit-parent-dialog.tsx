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
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { useData } from "@/context/data-context";
import type { Parent } from "@/lib/types";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

interface EditParentDialogProps {
    parent: Parent;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditParentDialog({ parent, open, onOpenChange }: EditParentDialogProps) {
    const { updateParent } = useData();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: parent.name,
        },
    });

    React.useEffect(() => {
        form.reset({ name: parent.name });
    }, [parent, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateParent(parent.id, values);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Parent Name</DialogTitle>
                    <DialogDescription>
                        Update the name for {parent.name}.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Jane Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
