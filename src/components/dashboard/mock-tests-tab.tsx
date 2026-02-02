"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';

export function MockTestsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
            <ClipboardCheck />
            Mock Tests Platform
        </CardTitle>
        <CardDescription>
          This feature is currently in development. Soon, teachers will be able to create and assign mock tests, and students can take them here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center min-h-[200px]">
          <p className="text-muted-foreground">Stay tuned!</p>
      </CardContent>
    </Card>
  );
}
