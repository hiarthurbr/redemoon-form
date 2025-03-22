"use client";

import { Textarea } from "@heroui/input";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground mb-2">
        Supports Markdown formatting: **bold**, *italic*, # headings, &gt;
        quotes, - lists, etc.
      </div>
      <Textarea
        className="min-h-[300px] font-mono"
        placeholder="Write your character's origin story using Markdown..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
