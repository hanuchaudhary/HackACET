import { IAccount, IUser } from "@/types/types";
import { create } from "zustand";
import axios from "axios";

interface AuthState {
  user: IUser | null;
  fetchUser: () => Promise<void>;
  userAccounts: IAccount[] | null;
  isLoading: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  userAccounts: null,
  user: null,
  isLoading: true,
  fetchUser: async () => {
    try {
      const response = await axios.get("/api/user");
      const data = response.data;
      set({
        user: data.user,
        userAccounts: data.user.accounts,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ user: null, isLoading: false });
    }
  },
}));
