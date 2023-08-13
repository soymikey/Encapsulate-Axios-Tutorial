import { InternalAxiosRequestConfig } from "axios";

export const handleChangeRequestHeader = (
  config: InternalAxiosRequestConfig<unknown>
) => {
  config["baseURL"] =
    "https://www.fastmock.site/mock/fdc97c1d040ef9411e90d6e32b218ca8";
  config["timeout"] = 3000;
  return config;
};

export const handleConfigureAuth = (
  config: InternalAxiosRequestConfig<unknown>
) => {
  config.headers["token"] = localStorage.getItem("token") || "";
  return config;
};

export const handleNetworkError = (errStatus?: number): void => {
  const networkErrMap: { [index: string]: string } = {
    "400": "Network Error 400",
    "500": "Network Error 500",
  };
  if (errStatus) {
    alert(networkErrMap[errStatus] ?? `Network Error --${errStatus}`);
    return;
  }

  alert("can not connect to server");
};

export const handleAuthError = (errno: string): boolean => {
  const authErrMap: { [index: string]: string } = {
    "10031": "Login error, need to login again", // token invalid
    "10032": "Login expired, please login again~", // token expired
  };
  if (authErrMap[errno]) {
    alert(authErrMap[errno]);
    // auth error
    // logout();
    return false;
  }

  return true;
};

export const handleGeneralError = (errno: string, errmsg: string): boolean => {
  if (errno !== "0") {
    alert(errmsg);
    return false;
  }

  return true;
};
