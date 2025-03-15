import type { UserRole } from "@/types";
import { auth } from "@/lib/auth";
import { join } from "path";
import { writeFile } from "fs/promises";
import slug from "slug";
import db from "@/lib/db";
import { generateRandomString } from "better-auth/crypto";

export function hasRole(
  user: typeof auth.$Infer.Session.user,
  role: UserRole[] | UserRole,
) {
  if (Array.isArray(role)) {
    return role.includes(user.role as UserRole);
  }

  return user.role === role;
}

export const containsUppercase = (str: string) => /[A-Z]/.test(str);

export const containsNumber = (str: string) => /\d/.test(str);

export const containsSpecialChars = (str: string) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return specialChars.test(str);
};

export const uploadFile = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const randomString = crypto.randomUUID();
  const fileName = `${randomString.slice(0, 10)}.${file.name.split('.')[1]}`;

  const path = join('./', 'public', fileName);

  await writeFile(path, buffer);

  return { fileName };
};

export async function generateSlugArticle(title: string) {
  let titleSlug = slug(title, {
    charmap: slug.charmap,
    fallback: true,
    lower: true,
    multicharmap: slug.multicharmap,
    replacement: "-",
    symbols: true,
    trim: true,
  });

  const getArticleBySlug = async (slug: string) =>
    await db.article.findUnique({ where: { slug } });

  let slugAlreadyExist = Boolean(getArticleBySlug(titleSlug));

  while (slugAlreadyExist) {
    titleSlug = titleSlug.concat("-", generateRandomString(4, "a-z"));

    slugAlreadyExist = Boolean(getArticleBySlug(titleSlug));
  }

  return titleSlug;
}
