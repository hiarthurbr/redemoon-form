"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { GripVertical, X } from "lucide-react";

export interface ListItem {
  id: string;
  value: string;
  description: string;
}

interface DynamicListProps {
  items: ListItem[];
  onChange: (items: ListItem[]) => void;
  placeholder?: string;
  descriptionPlaceholder?: string;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export function DynamicList({
  items,
  onChange,
  placeholder = "Enter an item",
  descriptionPlaceholder = "Enter a description (optional)",
}: DynamicListProps) {
  // Use a ref to track initialization
  const initialized = useRef(false);

  // Local state for the list items
  const [localItems, setLocalItems] = useState<ListItem[]>([]);

  // State for drag and drop
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null);

  // Generate a unique ID

  // Initialize the list once
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // If we have items from props, use them
      if (items.length > 0) {
        setLocalItems(items);
      } else {
        // Otherwise start with one empty item
        setLocalItems([{ id: generateId(), value: "", description: "" }]);
      }
    }
  }, [items]);

  // Function to ensure there's always an empty item at the end
  const ensureEmptyItemAtEnd = (items: ListItem[]) => {
    // Check if the last item is empty or if there's any empty item
    const hasEmptyItem = items.some((item) => item.value === "");

    // If no empty items, add one at the end
    if (!hasEmptyItem) {
      return [...items, { id: generateId(), value: "", description: "" }];
    }

    return items;
  };

  // Handle input changes
  const handleInputChange = (
    id: string,
    field: "value" | "description",
    value: string,
  ) => {
    const updatedItems = localItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );

    // Ensure there's an empty item at the end if needed
    const finalItems = ensureEmptyItemAtEnd(updatedItems);

    setLocalItems(finalItems);

    // Only send non-empty items to parent
    const nonEmptyItems = finalItems.filter((item) => item.value.trim() !== "");

    onChange(nonEmptyItems);
  };

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    const updatedItems = localItems.filter((item) => item.id !== id);

    // Make sure we always have at least one item
    if (updatedItems.length === 0) {
      const newItems = [{ id: generateId(), value: "", description: "" }];

      setLocalItems(newItems);
      onChange([]);
    } else {
      // Ensure there's an empty item at the end if needed
      const finalItems = ensureEmptyItemAtEnd(updatedItems);

      setLocalItems(finalItems);

      // Only send non-empty items to parent
      const nonEmptyItems = finalItems.filter(
        (item) => item.value.trim() !== "",
      );

      onChange(nonEmptyItems);
    }
  };

  // Handle drag and drop
  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOverItem(index);
  };

  const handleDrop = () => {
    if (draggedItem === null || draggedOverItem === null) return;

    const newItems = [...localItems];
    const draggedItemContent = newItems[draggedItem];

    // Remove the dragged item
    newItems.splice(draggedItem, 1);

    // Insert it at the new position
    newItems.splice(draggedOverItem, 0, draggedItemContent);

    setLocalItems(newItems);
    setDraggedItem(null);
    setDraggedOverItem(null);

    // Only send non-empty items to parent
    const nonEmptyItems = newItems.filter((item) => item.value.trim() !== "");

    onChange(nonEmptyItems);
  };

  return (
    <div className="space-y-3">
      {localItems.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col gap-2 pl-2 rounded-md ${
            draggedOverItem === index ? "border-primary bg-primary/5" : ""
          }`}
          draggable={item.value !== ""}
          onDragEnd={() => {
            setDraggedItem(null);
            setDraggedOverItem(null);
          }}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragStart={() => handleDragStart(index)}
          onDrop={handleDrop}
        >
          <div className="flex items-center gap-2">
            {item.value !== "" && (
              <div
                className="cursor-move p-1 hover:bg-muted rounded-sm"
                title="Drag to reorder"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <Input
              className="flex-1"
              placeholder={placeholder}
              value={item.value}
              onChange={(e) =>
                handleInputChange(item.id, "value", e.target.value)
              }
            />
            {item.value !== "" && (
              <Button
                isIconOnly
                color="danger"
                endContent={<X className="size-5" />}
                title="Remove item"
                variant="shadow"
                onPress={() => handleRemoveItem(item.id)}
              />
            )}
          </div>

          {item.value !== "" && (
            <Textarea
              className="min-h-[80px]"
              placeholder={descriptionPlaceholder}
              value={item.description}
              onChange={(e) =>
                handleInputChange(item.id, "description", e.target.value)
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}
