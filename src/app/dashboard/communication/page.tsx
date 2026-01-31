import { CommunicationHub } from "@/components/dashboard/communication-hub";

export default function CommunicationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Communication Hub</h1>
        <p className="text-muted-foreground">
          Stay connected with announcements and school-wide communication.
        </p>
      </div>
      <CommunicationHub />
    </div>
  );
}
