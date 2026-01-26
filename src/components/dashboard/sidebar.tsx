import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users, BookCopy, BarChart3, ShieldAlert } from 'lucide-react';
import type { NavItem } from '@/lib/types';
import { useAuth } from '@/context/auth-context';

const navItems: NavItem[] = [
  { href: '/dashboard', title: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
  { href: '/dashboard/students', title: 'Students', icon: Users, roles: ['ADMIN', 'TEACHER'] },
  { href: '/dashboard/assignments', title: 'Assignments', icon: BookCopy, roles: ['STUDENT', 'PARENT'] },
  { href: '/dashboard/analytics', title: 'Analytics', icon: BarChart3, roles: ['ADMIN'] },
  { href: '/dashboard/risk-assessment', title: 'Risk Assessment', icon: ShieldAlert, roles: ['ADMIN', 'TEACHER'] },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  const filteredNavItems = navItems.filter(item => item.roles.includes(role!));

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary"><path d="M4 19.5 12 12m0 0 8 7.5M12 12v10.5M12 2a9 9 0 1 1-9 9m9-9a9 9 0 0 0 9 9"/></svg>
            <h2 className="text-2xl font-bold font-headline text-primary group-data-[collapsible=icon]:hidden">AtendaLearn</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.title, side: 'right' }}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
