import { AttendanceTracker } from "@/components/dashboard/attendance-tracker";

export default function AttendancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Attendance Tracker</h1>
        <p className="text-muted-foreground">
          Mark student attendance for your classes.
        </p>
      </div>
      <AttendanceTracker />
    </div>
  );
}
