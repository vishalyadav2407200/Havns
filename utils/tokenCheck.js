import redis from "@utils/redis";
import { getToken, setToken } from "@actions/zoomActions";

export default async function tokenCheck() {
  const redis_token = await redis.get("access_token");
  let token = redis_token;

  if (!redis_token || [-1, -2].includes(redis_token)) {
    const { access_token, expires_in, error } = await getToken();

    if (error) {
      const { response, message } = error;
      console.error(`Failed to get token: ${message}`);
      return "error";
    }

    await setToken({ access_token, expires_in });
    token = access_token;
  }

  return token;
}
