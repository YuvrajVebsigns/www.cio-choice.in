export enum UserRole {
  // eslint-disable-next-line no-unused-vars
  SUPER_ADMIN = 'super_admin',
  // eslint-disable-next-line no-unused-vars
  ADMIN = 'admin',
  // eslint-disable-next-line no-unused-vars
  EDITOR = 'editor',
  // eslint-disable-next-line no-unused-vars
  VIEWER = 'viewer',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
