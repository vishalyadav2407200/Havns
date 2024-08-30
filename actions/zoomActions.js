"use server";
// import redis from "@utils/redis";

export async function setToken({ access_token, expires_in }) {
  await redis.set("access_token", access_token);
  await redis.expires_in("access_token", expires_in);
}
