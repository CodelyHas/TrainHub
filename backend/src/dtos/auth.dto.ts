import type LoginDTO from "../types/authTypes.ts";

export const createLoginDTO = (data: LoginDTO) => {
  return {
    email: data.email,
    password: data.password,
  };
};