export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
    sessions: ["auth", "sessions"] as const,
  },
  user: {
    profile: ["user", "profile"] as const,
  },
};
