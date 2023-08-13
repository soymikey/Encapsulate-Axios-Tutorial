// const [e, r] = await api.getUserInfo(userid)
// if (!e && r) this.userInfo = r.data.userinfo

import axios from "axios";
import {
  handleAuthError,
  handleChangeRequestHeader,
  handleConfigureAuth,
  handleGeneralError,
  handleNetworkError,
} from "./tools";

type Fn = (data: unknown) => unknown;

interface IAnyObj {
  [index: string]: unknown;
}

export interface FcResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}

export type ApiResponse<T> = Promise<[unknown, FcResponse<T> | undefined]>;

axios.interceptors.request.use((config) => {
  config = handleChangeRequestHeader(config);
  config = handleConfigureAuth(config);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);

    handleAuthError(response.data.errno);
    handleGeneralError(response.data.errno, response.data.errmsg);

    return response;
  },
  (err) => {
    handleNetworkError(err.response.status);
    Promise.reject(err.response);
  }
);

export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  clearFunc?: Fn
): ApiResponse<T> =>
  new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFunc !== undefined) {
          res = clearFunc(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as unknown as FcResponse<T>;
        }
        resolve([null, res]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });

export const Post = <T>(
  url: string,
  data: IAnyObj,
  params: IAnyObj = {},
  clearFunc?: Fn
): ApiResponse<T> =>
  new Promise((resolve) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        let res: FcResponse<T>;
        if (clearFunc !== undefined) {
          res = clearFunc(result.data) as unknown as FcResponse<T>;
        } else {
          res = result.data as unknown as FcResponse<T>;
        }
        resolve([null, res]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
