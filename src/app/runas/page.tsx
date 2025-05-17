"use client";

import type React from "react";

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
  Select,
  SelectItem,
  Chip,
} from "@heroui/react";
import { Trash2 } from "lucide-react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";

const text_styles = {
  dark_red: { symbol: Symbol("§4"), chat: "§4", unicode: String.raw`\u00A74` },
  red: { symbol: Symbol("§c"), chat: "§c", unicode: String.raw`\u00A7c` },
  gold: { symbol: Symbol("§6"), chat: "§6", unicode: String.raw`\u00A76` },
  yellow: { symbol: Symbol("§e"), chat: "§e", unicode: String.raw`\u00A7e` },
  dark_green: {
    symbol: Symbol("§2"),
    chat: "§2",
    unicode: String.raw`\u00A72`,
  },
  green: { symbol: Symbol("§a"), chat: "§a", unicode: String.raw`\u00A7a` },
  aqua: { symbol: Symbol("§b"), chat: "§b", unicode: String.raw`\u00A7b` },
  dark_aqua: { symbol: Symbol("§3"), chat: "§3", unicode: String.raw`\u00A73` },
  dark_blue: { symbol: Symbol("§1"), chat: "§1", unicode: String.raw`\u00A71` },
  blue: { symbol: Symbol("§9"), chat: "§9", unicode: String.raw`\u00A79` },
  light_purple: {
    symbol: Symbol("§d"),
    chat: "§d",
    unicode: String.raw`\u00A7d`,
  },
  dark_purple: {
    symbol: Symbol("§5"),
    chat: "§5",
    unicode: String.raw`\u00A75`,
  },
  white: { symbol: Symbol("§f"), chat: "§f", unicode: String.raw`\u00A7f` },
  gray: { symbol: Symbol("§7"), chat: "§7", unicode: String.raw`\u00A77` },
  dark_gray: { symbol: Symbol("§8"), chat: "§8", unicode: String.raw`\u00A78` },
  black: { symbol: Symbol("§0"), chat: "§0", unicode: String.raw`\u00A70` },
  reset: { symbol: Symbol("§r"), chat: "§r", unicode: String.raw`\u00A7r` },
};

enum Formatter {
  Auto = "auto",
  Guided = "guided",
  WithPagination = "with_pagination",
  Manual = "manual",
}

type Store = {
  [Formatter.Auto]: string;
  [Formatter.Guided]: string;
  [Formatter.Manual]: string;
  [Formatter.WithPagination]: string;
  selectedFmt: Formatter;
  text: string;
  updateText: (fmt: Formatter, text: string) => void;
  updateFmt: (fmt: Formatter) => void;

  author: string;
  setAuthor: (author: string) => void;

  title: string;
  setTitle: (title: string) => void;

  target: string;
  setTarget: (target: string) => void;

  runas: Array<{ input: string; output: string }>;
  newChar: string;
  updateNewChar: (str: string) => void;
  handleAddCharacter: (e: React.FormEvent) => void;
  handleRemoveCharacter: (index: number) => void;
  handleChangeCharacter: (index: number, value: string) => void;
};

const useStore = create<Store>()(
  persist(
    immer<Store>((set, get) => ({
      [Formatter.Auto]: "",
      [Formatter.Guided]: "",
      [Formatter.Manual]: "",
      [Formatter.WithPagination]: "",
      selectedFmt: Formatter.Auto,
      text: "",

      author: "Caetano Veloso",
      title: "Dialogo",
      target: "@s",

      updateFmt(selectedFmt) {
        set({ selectedFmt, text: get()[selectedFmt] });
      },

      updateText(fmt, text) {
        const update = { [fmt]: text };

        if (get().selectedFmt === fmt) update.text = text;

        set(update);
      },

      setAuthor(author) {
        set({ author });
      },
      setTitle(title) {
        set({ title });
      },
      setTarget(target) {
        set({ target });
      },

      newChar: "",
      runas: [
        { input: `p`, output: String.raw`\uE001` },
        { input: `b`, output: String.raw`\uE002` },
        { input: `t`, output: String.raw`\uE003` },
        { input: `d`, output: String.raw`\uE004` },
        { input: `k`, output: String.raw`\uE005` },
        { input: `g`, output: String.raw`\uE006` },
        { input: `f`, output: String.raw`\uE007` },
        { input: `q`, output: String.raw`\uE008` },
        { input: `s`, output: String.raw`\uE009` },
        { input: `$`, output: String.raw`\uE010` },
        { input: `x`, output: String.raw`\uE011` },
        { input: `h`, output: String.raw`\uE012` },
        { input: `v`, output: String.raw`\uE013` },
        { input: `c`, output: String.raw`\uE014` },
        { input: `z`, output: String.raw`\uE015` },
        { input: `j`, output: String.raw`\uE016` },
        { input: `y`, output: String.raw`\uE017` },
        { input: `w`, output: String.raw`\uE018` },
        { input: `m`, output: String.raw`\uE019` },
        { input: `n`, output: String.raw`\uE020` },
        { input: `l`, output: String.raw`\uE021` },
        { input: `r`, output: String.raw`\uE022` },
        { input: `a`, output: String.raw`\uE023` },
        { input: `e`, output: String.raw`\uE024` },
        { input: `i`, output: String.raw`\uE025` },
        { input: `o`, output: String.raw`\uE026` },
        { input: `u`, output: String.raw`\uE027` },
        { input: `0`, output: String.raw`\uE028` },
        { input: `1`, output: String.raw`\uE029` },
        { input: `2`, output: String.raw`\uE030` },
        { input: `3`, output: String.raw`\uE031` },
        { input: `4`, output: String.raw`\uE032` },
        { input: `5`, output: String.raw`\uE033` },
        { input: `6`, output: String.raw`\uE034` },
        { input: `7`, output: String.raw`\uE035` },
        { input: `8`, output: String.raw`\uE036` },
        { input: `9`, output: String.raw`\uE037` },
        { input: ` `, output: String.raw`\uE000\uE000` },
        { input: `\n`, output: String.raw`\n\n` },
      ],
      handleAddCharacter(e) {
        e.preventDefault();

        set({
          newChar: "",
          runas: produce(get().runas, (draft) => {
            draft.push({ input: get().newChar, output: "" });
          }),
        });
      },
      handleChangeCharacter(index, value) {
        set({
          runas: produce(get().runas, (draft) => {
            draft[index].output = value;
          }),
        });
      },
      handleRemoveCharacter(index) {
        set({
          runas: produce(get().runas, (draft) => {
            draft.splice(index, 1);
          }),
        });
      },
      updateNewChar(newChar) {
        set({ newChar });
      },
    })),
    {
      name: "runas-store",
      storage: createJSONStorage(() => globalThis.localStorage),
    },
  ),
);

export default function Dashboard() {
  const {
    author,
    auto,
    guided,
    text,
    handleAddCharacter,
    handleChangeCharacter,
    handleRemoveCharacter,
    manual,
    newChar,
    runas,
    selectedFmt,
    setAuthor,
    setTarget,
    setTitle,
    target,
    title,
    updateFmt,
    updateNewChar,
    updateText,
    with_pagination,
  } = useStore();
  const obfuscated = text
    .split("")
    .map(
      (c) =>
        runas.find(({ input }) => c.toLowerCase() === input)?.output ?? "?",
    )
    .join("");

  return (
    <>
      <div className="flex relative h-full">
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <h1>Notes</h1>
            </CardHeader>
            <CardBody className="h-[calc(100%-4rem)]">
              <Tabs classNames={{ panel: "size-full" }}>
                <Tab
                  key="editor"
                  className="flex flex-col gap-2"
                  title="Editor"
                >
                  <Select
                    className="w-md"
                    disabledKeys={[Formatter.Guided, Formatter.WithPagination]}
                    label="Formatação"
                    selectedKeys={[selectedFmt]}
                    onChange={(e) =>
                      // @ts-expect-error
                      e.target.value != false && updateFmt(e.target.value)
                    }
                  >
                    <SelectItem
                      key={Formatter.Auto}
                      description="Bom para escrever livros facilmente"
                    >
                      Automatica
                    </SelectItem>
                    <SelectItem
                      key={Formatter.Guided}
                      description="Evita erros, porém mais complicado de interagir"
                    >
                      Manual (com guias)
                    </SelectItem>
                    <SelectItem
                      key={Formatter.WithPagination}
                      description="Mais complexo e pode não mostrar corretamente"
                    >
                      Manual (com paginação)
                    </SelectItem>
                    <SelectItem
                      key={Formatter.Manual}
                      description="Usado para titulos e mensagens"
                    >
                      Manual (sem paginação)
                    </SelectItem>
                  </Select>
                  {selectedFmt === Formatter.Auto ? (
                    <Textarea
                      disableAutosize
                      className="h-full"
                      classNames={{ inputWrapper: "!h-full", input: "!h-full" }}
                      placeholder="Seu texto em portugues vai aqui"
                      value={auto}
                      onValueChange={(value) =>
                        updateText(Formatter.Auto, value)
                      }
                    />
                  ) : selectedFmt === Formatter.Guided ||
                    selectedFmt === Formatter.WithPagination ? (
                    <></>
                  ) : selectedFmt === Formatter.Manual ? (
                    <Input
                      placeholder="Seu texto em portugues vai aqui"
                      value={manual}
                      onValueChange={(value) =>
                        updateText(Formatter.Manual, value)
                      }
                    />
                  ) : (
                    (updateFmt(Formatter.Auto) as any)
                  )}
                </Tab>
                <Tab
                  key="commands"
                  className="flex flex-col gap-2"
                  title="Comandos"
                >
                  <div className="relative">
                    {text.includes("\n") && (
                      <div className="absolute size-full flex items-center z-50 p-8">
                        <Chip
                          className="select-none"
                          color="danger"
                          size="lg"
                          variant="shadow"
                        >
                          <b>Incompativel com textos multi-linhas</b>
                        </Chip>
                      </div>
                    )}
                    <div
                      className={
                        text.includes("\n") ? "space-y-2 blur" : "space-y-2"
                      }
                    >
                      <h2 className="select-none">Tellraw</h2>
                      <Input
                        isDisabled={text.includes("\n")}
                        label="Target"
                        value={target}
                        onValueChange={setTarget}
                      />
                      <Snippet
                        classNames={{
                          pre: "text-ellipsis overflow-hidden max-w-xl",
                          symbol: "select-text -mr-1.5",
                        }}
                        symbol="/"
                      >
                        {`tellraw ${target} {"text":"${obfuscated}","font":"runas"}`}
                      </Snippet>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="select-none">Criar Livro</h2>
                    <Input
                      label="Title"
                      value={title}
                      onValueChange={setTitle}
                    />
                    <Input
                      label="Autor"
                      value={author}
                      onValueChange={setAuthor}
                    />
                    <Snippet
                      classNames={{
                        pre: "text-ellipsis overflow-hidden max-w-xl",
                        symbol: "select-text -mr-1.5",
                      }}
                      symbol="/"
                    >
                      {`minecraft:give @s written_book[written_book_content={title:"${title}",author:"${author}",pages:['{"text":"${obfuscated.replaceAll("\\", String.raw`\\`)}","font":"runas"}']}] 1`}
                    </Snippet>
                    <br />
                    <code>
                      {`minecraft:give @s written_book[written_book_content={title:"${title}",author:"${author}",pages:['{"text":"${obfuscated.replaceAll("\\", String.raw`\\`)}","font":"runas"}']}] 1`}
                    </code>
                  </div>
                </Tab>
                <Tab key="chars" title="Caracteres">
                  <Card className="h-full">
                    <CardHeader>
                      <h1>Characters</h1>
                    </CardHeader>
                    <CardBody>
                      <form
                        className="flex gap-2 mb-4"
                        onSubmit={handleAddCharacter}
                      >
                        <Input
                          placeholder="Add a character..."
                          value={newChar}
                          onChange={(e) => updateNewChar(e.target.value)}
                        />
                        <Button type="submit">Add</Button>
                      </form>

                      <div className="space-y-2 overflow-y-auto flex flex-row flex-wrap h-96 gap-4">
                        {runas.length === 0 ? (
                          <p className="text-muted-foreground text-center py-4">
                            No characters added yet
                          </p>
                        ) : (
                          runas.map((character, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-center gap-2 p-1 px-2 h-16 bg-default-100/50 rounded-md"
                            >
                              <Input
                                label={
                                  character.input === "\n"
                                    ? "*enter*"
                                    : character.input === " "
                                      ? "*espaço*"
                                      : character.input
                                }
                                labelPlacement="outside-left"
                                placeholder="Insira um caracter"
                                value={character.output}
                                onChange={(e) =>
                                  handleChangeCharacter(index, e.target.value)
                                }
                              />
                              <Button
                                isIconOnly
                                aria-label={`Remove ${character.input}`}
                                color="danger"
                                size="sm"
                                startContent={<Trash2 className="h-4 w-4" />}
                                variant="light"
                                onPress={() => handleRemoveCharacter(index)}
                              />
                            </div>
                          ))
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
