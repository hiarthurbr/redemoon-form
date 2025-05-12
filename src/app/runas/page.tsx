"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Textarea,
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Snippet,
} from "@heroui/react";
import { Trash2, GripVertical } from "lucide-react";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [newCharacter, setNewCharacter] = useState("");
  const [characters, setCharacters] = useState<
    Array<{ input: string; output: string }>
  >([
    { input: String.raw`p`, output: String.raw`\\uE001` },
    { input: String.raw`b`, output: String.raw`\\uE002` },
    { input: String.raw`t`, output: String.raw`\\uE003` },
    { input: String.raw`d`, output: String.raw`\\uE004` },
    { input: String.raw`k`, output: String.raw`\\uE005` },
    { input: String.raw`g`, output: String.raw`\\uE006` },
    { input: String.raw`f`, output: String.raw`\\uE007` },
    { input: String.raw`q`, output: String.raw`\\uE008` },
    { input: String.raw`s`, output: String.raw`\\uE009` },
    { input: String.raw`$`, output: String.raw`\\uE010` },
    { input: String.raw`x`, output: String.raw`\\uE011` },
    { input: String.raw`h`, output: String.raw`\\uE012` },
    { input: String.raw`v`, output: String.raw`\\uE013` },
    { input: String.raw`c`, output: String.raw`\\uE014` },
    { input: String.raw`z`, output: String.raw`\\uE015` },
    { input: String.raw`j`, output: String.raw`\\uE016` },
    { input: String.raw`y`, output: String.raw`\\uE017` },
    { input: String.raw`w`, output: String.raw`\\uE018` },
    { input: String.raw`m`, output: String.raw`\\uE019` },
    { input: String.raw`n`, output: String.raw`\\uE020` },
    { input: String.raw`l`, output: String.raw`\\uE021` },
    { input: String.raw`r`, output: String.raw`\\uE022` },
    { input: String.raw`a`, output: String.raw`\\uE023` },
    { input: String.raw`e`, output: String.raw`\\uE024` },
    { input: String.raw`i`, output: String.raw`\\uE025` },
    { input: String.raw`o`, output: String.raw`\\uE026` },
    { input: String.raw`u`, output: String.raw`\\uE027` },
    { input: String.raw`0`, output: String.raw`\\uE028` },
    { input: String.raw`1`, output: String.raw`\\uE029` },
    { input: String.raw`2`, output: String.raw`\\uE030` },
    { input: String.raw`3`, output: String.raw`\\uE031` },
    { input: String.raw`4`, output: String.raw`\\uE032` },
    { input: String.raw`5`, output: String.raw`\\uE033` },
    { input: String.raw`6`, output: String.raw`\\uE034` },
    { input: String.raw`7`, output: String.raw`\\uE035` },
    { input: String.raw`8`, output: String.raw`\\uE036` },
    { input: String.raw`9`, output: String.raw`\\uE037` },
    { input: String.raw` `, output: String.raw`\\uE000\\uE000` },
    { input: String.raw`\n`, output: String.raw`\\n\\n` },
  ]);
  const [rightPanelWidth, setRightPanelWidth] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleAddCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCharacter.trim()) {
      setCharacters([...characters, { input: newCharacter, output: "" }]);
      setNewCharacter("");
    }
  };

  const handleRemoveCharacter = (index: number) => {
    const updatedCharacters = [...characters];
    updatedCharacters.splice(index, 1);
    setCharacters(updatedCharacters);
  };

  const handleDescriptionChange = (index: number, description: string) => {
    const updatedCharacters = [...characters];
    updatedCharacters[index].output = description;
    setCharacters(updatedCharacters);
  };

  const startResize = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = rightPanelWidth;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResize);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const deltaX = e.clientX - startXRef.current;
    const deltaPercentage = (deltaX / containerWidth) * 100;

    // Calculate new width percentage (constrain between 30% and 70%)
    const newWidth = Math.min(
      Math.max(startWidthRef.current - deltaPercentage, 30),
      70,
    );
    setRightPanelWidth(newWidth);
  };

  const stopResize = () => {
    isDraggingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResize);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResize);
    };
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Simple Dashboard</h1>

      <div ref={containerRef} className="flex relative h-[600px]">
        {/* Left side - Text Area */}
        <div className="flex-1" style={{ width: `${100 - rightPanelWidth}%` }}>
          <Card className="h-full">
            <CardHeader>
              <h1>Notes</h1>
            </CardHeader>
            <CardBody className="h-[calc(100%-4rem)]">
              <Tabs classNames={{ panel: "size-full" }}>
                <Tab key="editor" title="Editor">
                  <Textarea
                    placeholder="Enter your notes here..."
                    className="h-full"
                    classNames={{ inputWrapper: "!h-full", input: "!h-full" }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disableAutosize
                  />
                </Tab>
                <Tab key="result" title="Resultado">
                  <Snippet className="size-full" hideSymbol>
                    {text
                      .split("")
                      .map(
                        (c) =>
                          characters.find(
                            ({ input }) => c.toLowerCase() === input,
                          )?.output ?? "?",
                      )
                      .join("")}
                  </Snippet>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>

        {/* Resize handle */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className="w-2 cursor-col-resize flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 z-10"
          onMouseDown={startResize}
        >
          <GripVertical className="h-6 w-6 text-gray-400" />
        </div>

        {/* Right side - Character List */}
        <div style={{ width: `${rightPanelWidth}%` }}>
          <Card className="h-full">
            <CardHeader>
              <h1>Characters</h1>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleAddCharacter} className="flex gap-2 mb-4">
                <Input
                  placeholder="Add a character..."
                  value={newCharacter}
                  onChange={(e) => setNewCharacter(e.target.value)}
                />
                <Button type="submit">Add</Button>
              </form>

              <div className="space-y-2 overflow-y-auto max-h-[450px]">
                {characters.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No characters added yet
                  </p>
                ) : (
                  characters.map((character, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-muted rounded-md"
                    >
                      <span className="font-medium min-w-[80px] truncate">
                        {character.input}
                      </span>
                      <Input
                        placeholder="Description..."
                        value={character.output}
                        onChange={(e) =>
                          handleDescriptionChange(index, e.target.value)
                        }
                        className="h-8 flex-1 min-w-0"
                      />
                      <Button
                        variant="flat"
                        size="sm"
                        onClick={() => handleRemoveCharacter(index)}
                        aria-label={`Remove ${character.input}`}
                        isIconOnly
                        startContent={<Trash2 className="h-4 w-4" />}
                      />
                    </div>
                  ))
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
