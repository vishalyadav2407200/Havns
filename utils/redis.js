"use server";
import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_LINK,
    port: 13457,
  },
});

export default client;
