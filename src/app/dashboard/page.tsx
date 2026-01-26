'use client';
import { useAuth } from '@/context/auth-context';
import { AdminDashboard } from '@/components/dashboard/admin-dashboard';
import { TeacherDashboard } from '@/components/dashboard/teacher-dashboard';
import { StudentDashboard } from '@/components/dashboard/student-dashboard';
import { ParentDashboard } from '@/components/dashboard/parent-dashboard';

export default function DashboardPage() {
  const { role } = useAuth();

  const renderDashboard = () => {
    switch (role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'TEACHER':
        return <TeacherDashboard />;
      case 'STUDENT':
        return <StudentDashboard />;
      case 'PARENT':
        return <ParentDashboard />;
      default:
        return <div>Loading dashboard...</div>;
    }
  };

  return <>{renderDashboard()}</>;
}
