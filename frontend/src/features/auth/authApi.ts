import API_URL from "../../config/api";
import { getAuthJsonHeaders } from "./authHeaders";
import type { LoginFormData } from "./loginSchema";

const AUTH_API_URL = `${API_URL}/auth`;

export async function loginApi(data: LoginFormData) {
  const response = await fetch(`${AUTH_API_URL}/login`, {
    method: "POST",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}