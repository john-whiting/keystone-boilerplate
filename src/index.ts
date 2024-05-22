import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { getDatabaseURL, getShadowDatabaseURL } from "./utils/database";

export default config({
  db: {
    provider: "postgresql",
    url: getDatabaseURL(),
    idField: { kind: "uuid" },
    shadowDatabaseUrl: getShadowDatabaseURL(),
  },
  lists,
  server: {
    port: parseInt(process.env.PORT ?? "8080"),
  }
});
