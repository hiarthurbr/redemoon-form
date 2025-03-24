"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Select,
  SelectItem,
  Avatar,
  Tabs,
  Tab,
  Accordion,
  AccordionItem,
  Alert,
  Checkbox,
  CircularProgress,
  Image,
  NumberInput,
  Skeleton,
  Snippet,
  User,
  Divider,
  Tooltip,
} from "@heroui/react";
import { z, type ZodSchema } from "zod";

import humanId from "::lib/human-id";
import { MarkdownEditor } from "::components/markdown-editor";
import { MarkdownPreview } from "::components/markdown-preview";
import { DynamicList } from "::components/dynamic-list";

const age_schema = z.coerce.number().int().gt(0);
const list_item_schema = z.array(
  z.object({
    id: z.string(),
    value: z.string(),
    description: z.string().optional(),
  }),
);

export default function CharacterFormEditor() {
  const [formData, setFormData] = useState({
    // Sample Discord data (would be fetched from API in a real app)
    discordName: "ArthurBR",
    discordUsername: "hiarthurbr",
    discordProfileImage:
      "https://cdn.discordapp.com/avatars/405943355781021696/56e03cd162aebf4bed32585145066675",
    discordId: "405943355781021696",

    // Editable fields with default values
    minecraftUsername: "Ar7hurz1nh0",
    isOriginalAccount: true,
    characterName: "Arthur",
    age: 18,
    gender: "Male",
    pronouns: "He/Him",
    sexuality: "Bisexual",
    race: "Amethyst",
    origin: "",
    fearsList: [],
    fears: "",
    hobbiesAndInterests: "",
    motivation: "",
    personality: "",
    hobbiesAndInterestsList: [],
    motivationList: [],
    personalityList: [],
    originStory: "",
  });

  const handleFormChange = (name: string, schema?: ZodSchema) => {
    return (value: unknown) =>
      setFormData((prev) => ({
        ...prev,
        [name]: schema?.parse(value) ?? value,
      }));
  };

  const handleMarkdownChange = (value: string) => {
    setFormData((prev) => ({ ...prev, originStory: value }));
  };

  const handleSave = () => {
    console.log("Saving character form data:", formData);
    // Here you would typically send the data to your backend
    alert("Character data saved successfully!");
  };

  const [id, setId] = useState<string | null>(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [verticalLayout, setVerticalLayout] = useState(false);
  const [minecraftAccount, setMinecraftAccount] = useState<
    Record<"java" | "bedrock", boolean>
  >({ bedrock: false, java: false });

  useEffect(() => {
    setTimeout(
      () =>
        setId(humanId({ capitalize: false, separator: "-", addAdverb: true })),
      3000,
    );
    window.addEventListener("resize", () =>
      setVerticalLayout(window.innerWidth < 768),
    );

    setVerticalLayout(window.innerWidth < 768);
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto prose">
      <Tooltip content="I am a tooltip" showArrow placement="right">
        <Snippet
          classNames={{ pre: "inline-flex items-center gap-4" }}
          disableCopy={id == null}
          symbol="#"
        >
          {id ?? (
            <CircularProgress
              isIndeterminate
              aria-label="Loading"
              className="scale-75"
              size="sm"
            />
          )}
        </Snippet>
      </Tooltip>
      <Card className="bg-primary-50">
        <CardHeader>
          <h1>Discord Information</h1>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-rows-1 place-items-center max-md:grid-rows-3 gap-4">
              <Image
                as={Avatar}
                radius="full"
                showFallback
                isBlurred
                alt="Discord Profile"
                className="size-20 ml-4"
                classNames={{
                  wrapper: "row-span-2",
                }}
                src={formData.discordProfileImage}
              />
              <Button
                className="!mt-0 md:hidden"
                color="danger"
                size="lg"
                variant="shadow"
              >
                Unlink
              </Button>
            </div>
            <div className="space-y-2 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Input
                    disabled
                    readOnly
                    classNames={{
                      base: "flex-row",
                      inputWrapper:
                        "bg-transparent data-[hover=true]:bg-transparent",
                    }}
                    label="Discord Username"
                    value={formData.discordUsername}
                    size="sm"
                    // @ts-expect-error
                    as={(props) => {
                      return (
                        <Snippet
                          color="primary"
                          symbol=""
                          codeString={formData.discordUsername}
                          {...{
                            ...props,
                            children:
                              props.children?.filter(
                                (children: unknown) =>
                                  children instanceof Object,
                              ) ?? props.children,
                          }}
                        />
                      );
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    disabled
                    readOnly
                    classNames={{
                      base: "flex-row",
                      inputWrapper:
                        "bg-transparent data-[hover=true]:bg-transparent",
                    }}
                    label="Discord Id"
                    value={formData.discordId}
                    size="sm"
                    // @ts-expect-error
                    as={(props) => (
                      <Snippet
                        symbol=""
                        color="primary"
                        codeString={formData.discordId}
                        {...props}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2 flex flex-row gap-4 items-center">
                <Input
                  disabled
                  readOnly
                  classNames={{
                    base: "flex-row",
                    inputWrapper:
                      "bg-transparent data-[hover=true]:bg-transparent",
                  }}
                  label="Discord Name"
                  value={formData.discordName}
                  size="sm"
                  // @ts-expect-error
                  as={(props) => (
                    <Snippet
                      symbol=""
                      color="primary"
                      codeString={formData.discordName}
                      {...props}
                    />
                  )}
                />
                <Button
                  className="!mt-0 max-md:hidden"
                  color="danger"
                  size="lg"
                  variant="shadow"
                >
                  Unlink
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-success-50">
        <CardHeader>
          <h1>Minecraft Information</h1>
        </CardHeader>
        <CardBody className="space-y-4">
          <Accordion
            onSelectionChange={(set) =>
              setMinecraftAccount((obj) => {
                obj.bedrock = false;
                obj.java = false;
                for (const key of Array.from(set)) {
                  // @ts-expect-error
                  obj[key] = true;
                }
                return { ...obj };
              })
            }
            selectedKeys={
              new Set(
                Object.entries(minecraftAccount)
                  .filter(([, enabled]) => enabled)
                  .map(([key]) => key),
              )
            }
            selectionMode="multiple"
          >
            <AccordionItem
              key="java"
              title={
                <Checkbox
                  isSelected={minecraftAccount.java}
                  onValueChange={(checked) =>
                    setMinecraftAccount((prev) => ({
                      ...prev,
                      java: checked,
                    }))
                  }
                >
                  Java Edition
                </Checkbox>
              }
              textValue="Java Edition"
            >
              <Tabs
                className="md:min-h-36 max-md:w-full max-md:flex justify-center"
                color="success"
                isVertical={!verticalLayout}
                classNames={{ panel: "md:pl-12" }}
              >
                <Tab
                  key="original"
                  title="Original Account"
                  className="data-[selected=true]:font-semibold"
                >
                  <div className="grid grid-rows-1 md:grid-rows-2 gap-4 place-items-center">
                    <Button
                      color="success"
                      variant="flat"
                      className="font-semibold"
                      startContent={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                          fill="currentColor"
                          role="presentation"
                          className="size-10"
                        >
                          <path d="M 5 4 C 4.448 4 4 4.447 4 5 L 4 24 L 24 24 L 24 4 L 5 4 z M 26 4 L 26 24 L 46 24 L 46 5 C 46 4.447 45.552 4 45 4 L 26 4 z M 4 26 L 4 45 C 4 45.553 4.448 46 5 46 L 24 46 L 24 26 L 4 26 z M 26 26 L 26 46 L 45 46 C 45.552 46 46 45.553 46 45 L 46 26 L 26 26 z" />
                        </svg>
                      }
                    >
                      Link Microsoft Account
                    </Button>
                    <User
                      avatarProps={{
                        src: `https://mineskin.eu/avatar/${formData.minecraftUsername}/128.png`,
                        size: "lg",
                        radius: "sm",
                        as: Skeleton,
                        onLoad: () => {
                          setAvatarLoaded(true);
                        },
                        // @ts-expect-error
                        isLoaded: id != null && avatarLoaded,
                      }}
                      description={
                        <Skeleton
                          isLoaded={id != null}
                          className="rounded-large my-0.5"
                        >
                          Premium account
                        </Skeleton>
                      }
                      name={
                        <Skeleton
                          isLoaded={id != null}
                          className="rounded-large my-0.5"
                        >
                          {formData.minecraftUsername}
                        </Skeleton>
                      }
                    />
                  </div>
                </Tab>
                <Tab
                  key="cracked"
                  title="Cracked Account"
                  className="data-[selected=true]:font-semibold"
                >
                  <div className="grid grid-rows-2 gap-4">
                    <Input
                      label="Minecraft Java Username"
                      name="javaUsername"
                      color="success"
                      classNames={{
                        inputWrapper:
                          "data-[hover=true]:bg-success-100 group-data-[focus=true]:bg-success-100",
                      }}
                      value={formData.minecraftUsername}
                      onValueChange={handleFormChange("minecraftUsername")}
                    />
                    <Alert
                      color="warning"
                      variant="solid"
                      title={
                        "Make sure to double check if your username is correct"
                      }
                    />
                  </div>
                </Tab>
              </Tabs>
            </AccordionItem>
            <AccordionItem
              key="bedrock"
              title={
                <Checkbox
                  isSelected={minecraftAccount.bedrock}
                  onValueChange={(checked) =>
                    setMinecraftAccount((prev) => ({
                      ...prev,
                      bedrock: checked,
                    }))
                  }
                >
                  Bedrock Edition
                </Checkbox>
              }
              textValue="Bedrock Edition"
              classNames={{ content: "flex max-md:justify-center md:pl-16" }}
            >
              <Button
                color="success"
                variant="flat"
                className="font-semibold"
                startContent={
                  <svg
                    className="size-10 pointer-events-none"
                    viewBox="0 0 32 32"
                    version="1.1"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>xbox</title>
                    <path d="M16 5.425c-1.888-1.125-4.106-1.922-6.473-2.249l-0.092-0.010c-0.070-0.005-0.152-0.008-0.234-0.008-0.613 0-1.188 0.16-1.687 0.441l0.017-0.009c2.357-1.634 5.277-2.61 8.426-2.61 0.008 0 0.016 0 0.024 0h0.019c0.005 0 0.011 0 0.018 0 3.157 0 6.086 0.976 8.501 2.642l-0.050-0.033c-0.478-0.272-1.051-0.433-1.662-0.433-0.085 0-0.169 0.003-0.252 0.009l0.011-0.001c-2.459 0.336-4.677 1.13-6.648 2.297l0.082-0.045zM5.554 5.268c-0.041 0.014-0.077 0.032-0.11 0.054l0.002-0.001c-2.758 2.723-4.466 6.504-4.466 10.684 0 3.584 1.256 6.875 3.353 9.457l-0.022-0.028c-1.754-3.261 4.48-12.455 7.61-16.159-3.53-3.521-5.277-4.062-6.015-4.062-0.010-0-0.021-0.001-0.032-0.001-0.115 0-0.225 0.021-0.326 0.060l0.006-0.002zM20.083 9.275c3.129 3.706 9.367 12.908 7.605 16.161 2.075-2.554 3.332-5.845 3.332-9.43 0-4.181-1.709-7.962-4.467-10.684l-0.002-0.002c-0.029-0.021-0.063-0.039-0.1-0.052l-0.003-0.001c-0.1-0.036-0.216-0.056-0.336-0.056-0.005 0-0.011 0-0.016 0h0.001c-0.741-0-2.485 0.543-6.014 4.063zM6.114 27.306c2.627 2.306 6.093 3.714 9.888 3.714s7.261-1.407 9.905-3.728l-0.017 0.015c2.349-2.393-5.402-10.901-9.89-14.29-4.483 3.39-12.24 11.897-9.886 14.29z" />
                  </svg>
                }
              >
                Link Xbox Account
              </Button>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>

      <Card className="bg-secondary-50">
        <CardHeader>
          <h1>Character Basic Information</h1>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                color="secondary"
                variant="bordered"
                label="Character Name"
                name="characterName"
                value={formData.characterName}
                onValueChange={handleFormChange("characterName")}
              />
            </div>
            <div className="space-y-2">
              <NumberInput
                color="secondary"
                variant="bordered"
                label="Age"
                name="age"
                value={formData.age}
                min={0}
                onValueChange={handleFormChange("age", age_schema)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Select
                color="secondary"
                variant="bordered"
                label="Select gender"
                value={formData.gender}
                onSelectionChange={handleFormChange("gender")}
              >
                <SelectItem key="female">Female</SelectItem>
                <SelectItem key="male">Male</SelectItem>
                <SelectItem key="gender_fluid">Gender Fluid</SelectItem>
                <SelectItem key="agender">Agender</SelectItem>
              </Select>
            </div>
            <div className="space-y-2">
              <Select
                color="secondary"
                variant="bordered"
                label="Select pronouns"
                value={formData.pronouns}
                onSelectionChange={handleFormChange("pronouns")}
              >
                <SelectItem key="she-her">She/Her</SelectItem>
                <SelectItem key="he-him">He/Him</SelectItem>
                <SelectItem key="they-them">They/Them</SelectItem>
                <SelectItem key="all-of-them">All of them</SelectItem>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Select
                color="secondary"
                variant="bordered"
                label="Select sexuality"
                value={formData.sexuality}
                onSelectionChange={handleFormChange("sexuality")}
              >
                <SelectItem key="Heterosexual">Heterosexual</SelectItem>
                <SelectItem key="Homosexual">Homosexual</SelectItem>
                <SelectItem key="Bisexual">Bisexual</SelectItem>
                <SelectItem key="Pansexual">Pansexual</SelectItem>
                <SelectItem key="Asexual">Asexual</SelectItem>
              </Select>
            </div>
            <div className="space-y-2">
              <Select
                color="secondary"
                variant="bordered"
                label="Select race"
                value={formData.race}
                onSelectionChange={handleFormChange("race")}
              >
                <SelectItem key="angel">Angel</SelectItem>
                <SelectItem key="demon">Demon</SelectItem>
                <SelectItem key="human">Human</SelectItem>
                <SelectItem key="half-dragon">Half-Dragon</SelectItem>
                <SelectItem key="amethyst">Amethyst</SelectItem>
                <SelectItem key="ice">Ice</SelectItem>
                <SelectItem key="skulk">Skulk</SelectItem>
                <SelectItem key="end">End</SelectItem>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              color="secondary"
              variant="underlined"
              label="Origin"
              name="origin"
              placeholder="Describe your character's place of origin"
              value={formData.origin}
              onValueChange={handleFormChange("origin")}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h1>Character Details</h1>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="space-y-2">
            <Tabs>
              <Tab title="Text">
                <Textarea
                  className="min-h-[100px]"
                  label="Fears"
                  name="fears"
                  placeholder="List the character's fears"
                  value={formData.fears}
                  onValueChange={handleFormChange("fears")}
                />
              </Tab>
              <Tab title="List">
                <DynamicList
                  items={formData.fearsList}
                  onChange={handleFormChange("fearsList", list_item_schema)}
                  placeholder="Enter a fear"
                  descriptionPlaceholder="Describe why the character has this fear..."
                />
              </Tab>
            </Tabs>
          </div>

          <Divider />

          <div className="space-y-2">
            <Textarea
              className="min-h-[100px]"
              label="Hobbies and Interests"
              name="hobbiesAndInterests"
              placeholder="Describe the character's hobbies and interests"
              value={formData.hobbiesAndInterests}
              onValueChange={handleFormChange("hobbiesAndInterests")}
            />
          </div>

          <Divider />

          <div className="space-y-2">
            <Textarea
              className="min-h-[100px]"
              label="Motivation"
              name="motivation"
              placeholder="What drives this character?"
              value={formData.motivation}
              onValueChange={handleFormChange("motivation")}
            />
          </div>

          <Divider />

          <div className="space-y-2">
            <Textarea
              className="min-h-[100px]"
              label="Personality"
              name="personality"
              placeholder="Describe the character's personality traits"
              value={formData.personality}
              onValueChange={handleFormChange("personality")}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h1>Origin Story</h1>
        </CardHeader>
        <CardBody>
          <Tabs>
            <Tab key="editor" title="Editor">
              <MarkdownEditor
                value={formData.originStory}
                onChange={handleMarkdownChange}
              />
            </Tab>
            <Tab key="preview" title="Preview">
              <div className="border rounded-md p-4 min-h-[300px] bg-muted/30">
                <MarkdownPreview content={formData.originStory} />
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onPress={handleSave}>
          Save Character
        </Button>
      </div>
    </div>
  );
}
