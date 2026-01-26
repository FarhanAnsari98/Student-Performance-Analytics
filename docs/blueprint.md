# **App Name**: AtendaLearn

## Core Features:

- User Authentication: Secure authentication using Firebase Authentication with role-based access control (Admin, Teacher, Student, Parent).
- Firestore Data Model: Optimized Firestore schema for storing student, teacher, parent, class, assignment, attendance, results, and analytics data.
- Student Performance Summaries: Automatically precompute student performance summaries (attendancePercentage, averageScore, riskLevel) and save into the firestore database.
- Critical Queries Support: Support and optimize critical queries to fetch pending assignments, students assigned to a teacher, and students at academic risk. All the results will be accessible in the UI.
- Admin Aggregated Analytics: Cloud functions for maintaining aggregation collections for admin dashboards, to be shown in the admin UI.
- Real-time UI Updates: Listen to the different document collections for live performance analysis for various users: Students, Parents and Teachers.
- Academic Risk Assesment: Tool for analysis of a student’s overall situation. LLM reasoning combines the students performance summaries such as attendance percentage, average score with the most recent pending assignments in order to suggest a risk level. This provides actionable insights into student performance.

## Style Guidelines:

- Primary color: Deep indigo (#4B0082) to convey depth of knowledge and academic integrity.
- Background color: Very light lavender (#F5EEF8), close in hue to the primary color but greatly desaturated to provide a gentle backdrop that doesn't distract from the data.
- Accent color: Vibrant yellow (#FFC300), analogous to indigo, used sparingly for highlighting critical data points or interactive elements.
- Headline font: 'Playfair', serif, for a high-end, elegant feel; body font: 'PT Sans', sans-serif, for readability.
- Consistent use of line icons from a set like Font Awesome or Material Icons, using visual metaphors for concepts like attendance, assignments, and risk level.
- Dashboard layout featuring clear data visualizations, such as charts and tables, and a responsive design for accessibility on various devices.
- Subtle transitions and animations for UI elements to provide a smooth user experience when displaying information. For example, when new performance data loads or filters are applied.