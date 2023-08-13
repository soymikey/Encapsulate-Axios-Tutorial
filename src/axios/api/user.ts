import { ApiResponse, Get, Post } from "..";

export function getUsers<
  T = { uuid: string; email: string }[]
>(): ApiResponse<T> {
  return Get<T>("/api/users");
}

export function checkTokenExpired<T>(): ApiResponse<T> {
  return Get<T>("/api/tokenExpired");
}
export function checkTokenInvalid<T>(): ApiResponse<T> {
  return Get<T>("/api/tokenInvalid");
}

export function getUsersInfo<T = { uuid: string; email: string }>(
  email: string
): ApiResponse<T> {
  return Post<T>("/api/userInfo", { email });
}

export const userApi = {
  getUsers,
  getUsersInfo,
  checkTokenExpired,
  checkTokenInvalid,
};
