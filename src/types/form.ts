import { z } from "zod";

export const discord = z
  .strictObject({
    account: z.strictObject({
      username: z.string(),
      id: z.string({ coerce: true }),
      name: z.string(),
      image: z.string().url(),
    }),
    auth: z.strictObject({
      code: z.string(),
    }),
  })
  .or(z.null());

export const java_username = z.string().max(16, "Nome de usuário muito longo");
export const bedrock_username = z
  .string()
  .max(15, "Nome de usuário muito longo");

export const minecraft = z
  .strictObject({
    java_username,
    bedrock_username: bedrock_username.or(z.null()),
  })
  .or(
    z.strictObject({
      java_username: java_username.or(z.null()),
      bedrock_username,
    }),
  );

export const genders = z.enum(["female", "male", "fluid", "agender"]);

export const pronouns = z.enum(["female", "male", "neutral"]);

export const sexuality = z.enum([
  "heterosexual",
  "homosexual",
  "bisexual",
  "pansexual",
  "asexual",
]);

export const race = z.enum([
  "angel",
  "demon",
  "human",
  "half-dragon",
  "amethyst",
  "ice",
  "skulk",
  "end",
]);

export const character_info = z.strictObject({
  name: z.string(),
  age: z.number().positive(),
  gender: genders,
  pronouns: z.array(pronouns.or(z.string())),
  sexuality,
  race: race.or(z.string()),
  origin: z.string(),

  fears: z.strictObject({
    text: z.string(),
    list: z.array(z.string()),
    selected: z.enum(["text", "list"]),
  }),
  hobbies: z.string(),
  motivation: z.string(),
  personality: z.string(),

  story: z.string(),
});

// [create] draft
//   => (on draft submit) [create] review + [create] personal
//     => (on review aproval) [update] personal + [create] published + [create] admin_view
//       => (on admin_view publish action) [update] published
