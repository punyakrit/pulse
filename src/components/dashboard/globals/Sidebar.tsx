"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  FolderOpen,
  Globe,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Plus,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Shield,
  Monitor,
  Database,
  GitBranch,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react"
import { RootState } from "@/lib/store/store"
import { useSelector } from "react-redux"

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    description: "Overview of all projects & websites",
  },
  {
    title: "Projects",
    icon: FolderOpen,
    href: "/dashboard/projects",
    description: "Manage your projects",
  },
  {
    title: "Websites",
    icon: Globe,
    href: "/dashboard/websites",
    description: "Monitor website performance",
  },
  {
    title: "Alerts",
    icon: Bell,
    href: "/dashboard/alerts",
    description: "View alert history",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    description: "Performance metrics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    description: "Notifications & integrations",
  },
]


const quickActions = [
  {
    title: "New Project",
    icon: Plus,
    href: "/dashboard/projects/new",
    description: "Create a new project",
  },
  {
    title: "Add Website",
    icon: Globe,
    href: "/dashboard/websites/new",
    description: "Monitor a new website",
  },
]

export default function SidebarComponent() {
    const {user} = useSelector((state: RootState) => state.user);
    const {projects} = useSelector((state: RootState) => state.project);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/dashboard" className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Pulse</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.description}>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />


        <SidebarGroup>
          <SidebarGroupLabel>Recent Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild tooltip={project.name}>
                    <a href={`/dashboard/projects/${project.id}`}>
                      <Globe className="h-6 w-6 text-primary" />
                      <span>{project.name}</span>
                  <div className={`w-2 h-2 rounded-full ml-auto ${
                    project.status === 'online' ? 'bg-green-500' : 
                    project.status === 'offline' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.title}>
                  <SidebarMenuButton asChild tooltip={action.description}>
                    <a href={action.href}>
                      <action.icon />
                      <span>{action.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button className="w-full">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/api/avatar" alt="User" />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user?.name}</span>
                    <LogOut className="ml-auto h-4 w-4" />
                  </button>
                </SidebarMenuButton>
             
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}