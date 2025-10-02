"use client"

import * as React from "react"
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  ClipboardList,
  BarChart3,
  Crown,
  Target,
  Clock,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user?: {
    name: string
    email: string
    avatar: string
  }
}

const defaultData = {
  user: {
    name: "Usuário",
    email: "usuario@focototal.com",
    avatar: "",
  },
  teams: [
    {
      name: "FocoTotal",
      logo: BookOpen,
      plan: "Premium",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Visão Geral",
          url: "/dashboard",
        },
        {
          title: "Estatísticas",
          url: "/dashboard/stats",
        },
      ],
    },
    {
      title: "Planejamento",
      url: "/planner",
      icon: Calendar,
      items: [
        {
          title: "Visão Geral",
          url: "/planner",
        },
        {
          title: "Minhas Matérias",
          url: "/planner/subjects",
        },
        {
          title: "Sessões de Estudo",
          url: "/planner/sessions",
        },
        {
          title: "Pomodoro",
          url: "/planner/pomodoro",
        },
      ],
    },
    {
      title: "Simulados",
      url: "/simulados",
      icon: ClipboardList,
      items: [
        {
          title: "Meus Simulados",
          url: "/simulados",
        },
        {
          title: "Histórico",
          url: "/simulados/history",
        },
        {
          title: "Análise",
          url: "/simulados/analysis",
        },
      ],
    },
    {
      title: "Desempenho",
      url: "/performance",
      icon: BarChart3,
      items: [
        {
          title: "Evolução Geral",
          url: "/performance",
        },
        {
          title: "Por Matéria",
          url: "/performance/subjects",
        },
        {
          title: "Pontos Fracos",
          url: "/performance/weaknesses",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Metas do Mês",
      url: "/goals",
      icon: Target,
    },
    {
      name: "Sessões de Estudo",
      url: "/sessions",
      icon: Clock,
    },
    {
      name: "Plano Premium",
      url: "/pricing",
      icon: Crown,
    },
  ],
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const userData = user || defaultData.user
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={defaultData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={defaultData.navMain} />
        <NavProjects projects={defaultData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
