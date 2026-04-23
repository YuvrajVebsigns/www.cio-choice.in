import { apiFetch } from "./apiFetch";
import { API_ENDPOINTS } from "@/constants/api";
import { User } from "@/types/user.types";

interface LoginCredentials {
  email: string;
  password?: string;
  // Adjust based on your actual auth mechanism
}

interface AuthResponse {
  user: User;
  accessToken?: string;
}

export const authService = {
  /**
   * Logs a user in and returns their session/token
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify(credentials),
      requireAuth: false,
    });
  },

  /**
   * Logs a user out
   */
  async logout(): Promise<void> {
    return apiFetch<void>(API_ENDPOINTS.AUTH.LOGOUT, {
      method: "POST",
    });
  },

  /**
   * Fetches the current authenticated user's profile
   */
  async getProfile(): Promise<User> {
    return apiFetch<User>(API_ENDPOINTS.AUTH.ME, {
      method: "GET",
    });
  },
};
