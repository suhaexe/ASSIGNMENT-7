import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("bazardor");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
