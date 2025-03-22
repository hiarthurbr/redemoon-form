"use client";

import { useEffect, useState } from "react";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const [html, setHtml] = useState("");

  // Simple markdown parser (for a real app, use a library like marked or remark)
  useEffect(() => {
    // This is a very basic markdown parser for demonstration
    // In a real app, use a proper markdown library
    const parsedContent = content
      // Headers
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold my-2">$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Lists
      .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^\d\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>')
      // Blockquotes
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="pl-4 border-l-4 border-gray-300 italic">$1</blockquote>',
      )
      // Links
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/gim,
        '<a href="$2" class="text-blue-500 hover:underline">$1</a>',
      )
      // Line breaks
      .replace(/\n/gim, "<br />");

    setHtml(parsedContent);
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose max-w-none"
    />
  );
}
