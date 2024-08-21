import { ListConfig } from "@keystone-6/core";

import { Post, Tag, User } from "./lists";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lists: Record<string, ListConfig<any>> = {
  Post,
  Tag,
  User,
};