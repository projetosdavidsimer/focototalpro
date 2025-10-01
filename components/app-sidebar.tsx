"use client"

import * as React from "react"
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  ClipboardList,
  BarChart3,
  Settings,
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

const data = {
  user: {
    name: "Usuário",
    email: "usuario@focototal.com",
    avatar: "/avatars/user.jpg",
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
          title: "Ciclo de Estudos",
          url: "/planner",
        },
        {
          title: "Minhas Matérias",
          url: "/planner/subjects",
        },
        {
          title: "Cronômetro",
          url: "/planner/timer",
        },
      ],
    },
    {
      title: "Simulados",
      url: "/simulados",
      icon: ClipboardList,
      items: [
        {
          title: "Registrar Simulado",
          url: "/simulados/new",
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
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Perfil",
          url: "/settings/profile",
        },
        {
          title: "Assinatura",
          url: "/settings/subscription",
        },
        {
          title: "Preferências",
          url: "/settings/preferences",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
