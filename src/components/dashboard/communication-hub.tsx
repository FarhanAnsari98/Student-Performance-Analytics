"use client";

import React from 'react';
import { useAuth } from '@/context/auth-context';
import { useData } from '@/context/data-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Megaphone, MessageSquare, ClipboardCheck, Loader2, BrainCircuit } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { QueriesTab } from './queries-tab';
import { MockTestsTab } from './mock-tests-tab';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
};

const announcementSchema = z.object({
  content: z.string().min(10, { message: "Announcement must be at least 10 characters." }).max(500, { message: "Announcement must not exceed 500 characters." }),
  scope: z.enum(['public', 'internal'], { required_error: 'Please select an audience.' }),
});

export function CommunicationHub() {
    const { user, role } = useAuth();
    const { announcements, addAnnouncement } = useData();

    const form = useForm<z.infer<typeof announcementSchema>>({
        resolver: zodResolver(announcementSchema),
        defaultValues: {
            content: "",
            scope: 'public',
        },
    });
    
    function onAnnouncementSubmit(values: z.infer<typeof announcementSchema>) {
        if (!user || !role) return;
        addAnnouncement(values.content, { id: user.id, name: user.name, role: role }, values.scope);
        form.reset();
    }
    
    const canAnnounce = role === 'ADMIN' || role === 'TEACHER';
    const canViewInternal = role === 'ADMIN' || role === 'TEACHER';

    const displayedAnnouncements = announcements.filter(a => {
        if (a.scope === 'public') return true;
        if (a.scope === 'internal' && canViewInternal) return true;
        return false;
    });

    return (
        <Tabs defaultValue="announcements">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="announcements">
                    <Megaphone className="mr-2 h-4 w-4" />
                    Announcements
                </TabsTrigger>
                <TabsTrigger value="queries">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Queries
                </TabsTrigger>
                <TabsTrigger value="mock-tests">
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Mock Tests
                </TabsTrigger>
            </TabsList>
            <TabsContent value="announcements">
                <Card>
                    <CardHeader>
                        <CardTitle>Announcements</CardTitle>
                        <CardDescription>
                            {canAnnounce 
                                ? "Post important updates for students, parents, and other staff."
                                : "View important updates from school administration and teachers."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {canAnnounce && (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onAnnouncementSubmit)} className="space-y-4 border p-4 rounded-lg">
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Textarea placeholder="Type your announcement here..." {...field} rows={3} />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="scope"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                            <FormLabel>Audience</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex items-center gap-4"
                                                >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                    <RadioGroupItem value="public" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                    Public
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                    <RadioGroupItem value="internal" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                    Internal (Staff only)
                                                    </FormLabel>
                                                </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={form.formState.isSubmitting}>
                                            <Megaphone className="mr-2 h-4 w-4" />
                                            Post Announcement
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        )}
                        <div className="space-y-4">
                            {displayedAnnouncements.length > 0 ? displayedAnnouncements.map(announcement => (
                                <div key={announcement.id} className="flex items-start gap-4 p-4 border rounded-lg">
                                    <Avatar>
                                        <AvatarImage />
                                        <AvatarFallback>{getInitials(announcement.authorName)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{announcement.authorName} <span className="text-xs font-normal text-muted-foreground">({announcement.authorRole})</span></p>
                                            <div className='flex items-center gap-2'>
                                                {announcement.scope === 'internal' && canViewInternal && (
                                                    <Badge variant="outline">Internal</Badge>
                                                )}
                                                <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(announcement.date), { addSuffix: true })}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-foreground/90 mt-1">{announcement.content}</p>
                                    </div>
                                </div>
                            )) : <p className="text-center text-muted-foreground">No announcements yet.</p>}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="queries">
                <QueriesTab />
            </TabsContent>
            <TabsContent value="mock-tests">
                <MockTestsTab />
            </TabsContent>
        </Tabs>
    );
}
