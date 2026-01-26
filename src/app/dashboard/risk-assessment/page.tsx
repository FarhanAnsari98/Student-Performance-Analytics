import { RiskAssessmentClient } from "@/components/dashboard/risk-assessment-client";

export default function RiskAssessmentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Academic Risk Assessment</h1>
        <p className="text-muted-foreground">
          Use AI to get a deeper understanding of a student's academic situation.
        </p>
      </div>
      <RiskAssessmentClient />
    </div>
  );
}
