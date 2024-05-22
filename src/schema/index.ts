import { ListConfig } from "@keystone-6/core";
import { Post, Tag, User } from "./lists";

export const lists: Record<string, ListConfig<any>> = {
  Post,
  Tag,
  User,
}