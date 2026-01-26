"use client";
import { ParentsDataTable } from "@/components/dashboard/parents-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/data-context";

export default function ParentsPage() {
    const { parents } = useData();

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold font-headline">Parent Directory</h1>
                <p className="text-muted-foreground">
                    Browse and manage all parents in the system.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Parents</CardTitle>
                    <CardDescription>A complete list of parents.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ParentsDataTable parents={parents} />
                </CardContent>
            </Card>
        </div>
    )
}
