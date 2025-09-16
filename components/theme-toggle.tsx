"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Monitor, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

// Toggle de tema seguindo o manual:
// - Container: inline-flex, rounded-full, border-input, bg-background, p-1, shadow-sm
// - Itens: 3 botões (light/system/dark) com ícones, sem texto, aria-label descritivo
// - Fallback de hidratação idêntico (SSR) com "system" visualmente ativo
// - Acessibilidade: radiogroup + radio, foco visível, navegação por teclado

type ThemeValue = "light" | "dark" | "system"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const current: ThemeValue = React.useMemo(() => {
    if (!mounted) return "system"
    return (theme as ThemeValue) || "system"
  }, [theme, mounted])

  const handleChange = (value: ThemeValue) => {
    if (value) setTheme(value)
  }

  const Group = ({ children }: { children: React.ReactNode }) => (
    <div
      role="radiogroup"
      aria-label="Alternar tema"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-input bg-background p-1 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )

  const Item = ({
    value,
    label,
    icon: Icon,
    active,
    onSelect,
    tabbable = true,
  }: {
    value: ThemeValue
    label: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    active: boolean
    onSelect: (value: ThemeValue) => void
    tabbable?: boolean
  }) => (
    <button
      type="button"
      role="radio"
      aria-label={label}
      aria-checked={active}
      data-state={active ? "on" : "off"}
      onClick={() => onSelect(value)}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full p-0 text-muted-foreground transition-all",
        "hover:bg-muted hover:text-foreground",
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
      tabIndex={tabbable ? 0 : -1}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )

  // Fallback de SSR com estrutura e dimensões idênticas e "system" ativo
  if (!mounted) {
    return (
      <Group>
        <Item value="light" label="Tema claro" icon={Sun} active={false} onSelect={() => {}} tabbable={false} />
        <Item value="system" label="Tema do sistema" icon={Monitor} active={true} onSelect={() => {}} tabbable={false} />
        <Item value="dark" label="Tema escuro" icon={Moon} active={false} onSelect={() => {}} tabbable={false} />
      </Group>
    )
  }

  // Estado hidratado
  return (
    <Group>
      <Item value="light" label="Tema claro" icon={Sun} active={current === "light"} onSelect={handleChange} />
      <Item value="system" label="Tema do sistema" icon={Monitor} active={current === "system"} onSelect={handleChange} />
      <Item value="dark" label="Tema escuro" icon={Moon} active={current === "dark"} onSelect={handleChange} />
    </Group>
  )
}

export default ThemeToggle