"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, GripVertical } from "lucide-react"

interface Topic {
  id?: string
  name: string
  description?: string
  mastery_level?: number
}

interface TopicManagerProps {
  topics: Topic[]
  onChange: (topics: Topic[]) => void
  disabled?: boolean
}

export function TopicManager({ topics, onChange, disabled }: TopicManagerProps) {
  const [newTopicName, setNewTopicName] = useState("")

  const addTopic = () => {
    if (!newTopicName.trim()) return
    
    onChange([
      ...topics,
      {
        name: newTopicName.trim(),
        mastery_level: 0,
      },
    ])
    setNewTopicName("")
  }

  const removeTopic = (index: number) => {
    onChange(topics.filter((_, i) => i !== index))
  }

  const updateTopicName = (index: number, name: string) => {
    const updated = [...topics]
    updated[index] = { ...updated[index], name }
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Assuntos (opcional)</label>
        <span className="text-xs text-muted-foreground">
          {topics.length} assunto{topics.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-2">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1 rounded-lg border bg-muted/50 px-3 py-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <Input
                value={topic.name}
                onChange={(e) => updateTopicName(index, e.target.value)}
                placeholder="Nome do assunto"
                className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                disabled={disabled}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeTopic(index)}
              disabled={disabled}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Adicionar assunto..."
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addTopic()
            }
          }}
          disabled={disabled}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addTopic}
          disabled={disabled || !newTopicName.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Adicione os principais assuntos desta matéria para acompanhar seu progresso
      </p>
    </div>
  )
}
