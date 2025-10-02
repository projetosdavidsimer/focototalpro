"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"

interface WeeklyChartProps {
  data: {
    date: string
    minutes: number
    hours: number
  }[]
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const { theme } = useTheme()

  // Formatar data para exibição (ex: "Seg 20")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    const day = days[date.getDay()]
    const dayNum = date.getDate()
    return `${day} ${dayNum}`
  }

  const chartData = data.map((item) => ({
    name: formatDate(item.date),
    horas: item.hours,
  }))

  const totalHours = data.reduce((acc, item) => acc + item.hours, 0)

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Evolução Semanal</h3>
          <p className="text-sm text-muted-foreground">
            Últimos 7 dias
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{totalHours.toFixed(1)}h</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}h`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
              borderRadius: "0.5rem",
              fontSize: "14px",
            }}
            labelStyle={{
              color: theme === "dark" ? "#f9fafb" : "#111827",
              fontWeight: 600,
            }}
            formatter={(value: number) => [`${value.toFixed(1)} horas`, "Estudadas"]}
            cursor={{ fill: theme === "dark" ? "#374151" : "#f3f4f6" }}
          />
          <Bar
            dataKey="horas"
            fill="hsl(var(--primary))"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
