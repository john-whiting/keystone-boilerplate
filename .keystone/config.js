"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);

// src/index.ts
var import_core4 = require("@keystone-6/core");

// src/schema/lists/post.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var Post = (0, import_core.list)({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: import_access.allowAll,
  // this is the fields for our Post list
  fields: {
    title: (0, import_fields.text)({ validation: { isRequired: true } }),
    // the document field can be used for making rich editable content
    //   you can find out more at https://keystonejs.com/docs/guides/document-fields
    content: (0, import_fields_document.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    // with this field, you can set a User as the author for a Post
    author: (0, import_fields.relationship)({
      // we could have used 'User', but then the relationship would only be 1-way
      ref: "User.posts",
      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      },
      // a Post can only have one author
      //   this is the default, but we show it here for verbosity
      many: false
    }),
    // with this field, you can add some Tags to Posts
    tags: (0, import_fields.relationship)({
      // we could have used 'Tag', but then the relationship would only be 1-way
      ref: "Tag.posts",
      // a Post can have many Tags, not just one
      many: true,
      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    })
  }
});

// src/schema/lists/tag.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Tag = (0, import_core2.list)({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: import_access2.allowAll,
  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  ui: {
    isHidden: true
  },
  // this is the fields for our Tag list
  fields: {
    name: (0, import_fields2.text)(),
    // this can be helpful to find out all the Posts associated with a Tag
    posts: (0, import_fields2.relationship)({ ref: "Post.tags", many: true })
  }
});

// src/schema/lists/user.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var User = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields3.text)({ validation: { isRequired: true } }),
    email: (0, import_fields3.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields3.password)({ validation: { isRequired: true } }),
    posts: (0, import_fields3.relationship)({ ref: "Post.author", many: true }),
    createdAt: (0, import_fields3.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// src/schema/index.ts
var lists = {
  Post,
  Tag,
  User
};

// src/utils/env.ts
function getEnvVariables(...variableNames) {
  const missingVariables = [];
  const variables = {};
  for (const variableName of variableNames) {
    const value = process.env[variableName];
    if (value === void 0 || value === null) {
      missingVariables.push(variableName);
    } else {
      variables[variableName] = value;
    }
  }
  if (missingVariables.length > 0) {
    return { success: false, missingVariables };
  }
  return { success: true, variables };
}

// src/utils/database.ts
function getDatabaseURL() {
  const databaseComponents = getEnvVariables("DB_NAME", "DB_USER", "DB_PASS", "DB_HOST", "DB_PORT");
  if (!databaseComponents.success) {
    throw new Error(`Missing environment variables: ${databaseComponents.missingVariables.join(", ")}`);
  }
  const { DB_HOST, DB_PORT, DB_NAME, DB_PASS, DB_USER } = databaseComponents.variables;
  return `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}
function getShadowDatabaseURL() {
  const databaseComponents = getEnvVariables("DB_SHADOW_NAME", "DB_USER", "DB_PASS", "DB_HOST", "DB_PORT");
  if (!databaseComponents.success) {
    throw new Error(`Missing environment variables: ${databaseComponents.missingVariables.join(", ")}`);
  }
  const { DB_HOST, DB_PORT, DB_SHADOW_NAME, DB_PASS, DB_USER } = databaseComponents.variables;
  return `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_SHADOW_NAME}`;
}

// src/index.ts
var src_default = (0, import_core4.config)({
  db: {
    provider: "postgresql",
    url: getDatabaseURL(),
    idField: { kind: "uuid" },
    shadowDatabaseUrl: getShadowDatabaseURL()
  },
  lists,
  server: {
    port: parseInt(process.env.PORT ?? "8080")
  }
});

// keystone.ts
var keystone_default = src_default;
//# sourceMappingURL=config.js.map
