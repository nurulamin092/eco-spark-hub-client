import axios from "axios";
import { env } from "../config/env";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export async function refreshAccessToken(): Promise<string> {
  if (refreshPromise) {
    return refreshPromise;
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        if (!isRefreshing && refreshPromise) {
          clearInterval(interval);
          try {
            const token = await refreshPromise;
            resolve(token);
          } catch (error) {
            reject(error);
          }
        }
      }, 50);
    });
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const response = await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh-token`,
        {},
        { withCredentials: true },
      );

      const newToken = response.data?.data?.accessToken;
      if (!newToken) {
        throw new Error("No access token received");
      }

      return newToken;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}
