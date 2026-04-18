import axios from "axios";
import { env } from "../config/env";
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string): void {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addSubscriber(callback: (token: string) => void): void {
  refreshSubscribers.push(callback);
}

export async function refreshAccessToken(): Promise<string> {
  if (isRefreshing) {
    return new Promise((resolve) => {
      addSubscriber((token: string) => {
        resolve(token);
      });
    });
  }

  isRefreshing = true;

  try {
    const response = await axios.post(
      `${env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh-token`,
      {},
      { withCredentials: true }, // Cookie automatically sent
    );

    const newToken = response.data.data.accessToken;
    onRefreshed(newToken);
    return newToken;
  } catch (error) {
    window.location.href = "/login";
    throw error;
  } finally {
    isRefreshing = false;
  }
}
