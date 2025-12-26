import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./config/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL || "postgresql://neondb_owner:npg_DwW3KBfNjT5d@ep-odd-morning-adxo4cp3-pooler.c-2.us-east-1.aws.neon.tech/kidsapp?sslmode=require&channel_binding=require",
  },
  verbose: true,
  strict: true,
});
