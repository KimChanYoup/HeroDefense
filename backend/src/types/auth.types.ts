export interface AuthUser {
  id: number;
  email: string;
  username: string;
}

export interface AuthenticatedRequest {
  user: AuthUser;
}
