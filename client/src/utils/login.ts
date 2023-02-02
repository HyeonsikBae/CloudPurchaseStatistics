import { NavigateFunction } from "react-router-dom";
import { getToken } from "../network/axios.custom.24hane";
import { getCookie, setCookie } from "./cookie";

/**
 * 42oauth를 통해 access_token을 저장하는 함수
 * 토큰 발급을 위한 code값이 없으면 입력으로 들어온 함수로 navigate
 * @param navigate navigate hook
 */
export async function setAccessToken(
  navigate: NavigateFunction
): Promise<void> {
  const urlSearch = new URLSearchParams(location.search);
  const code = await urlSearch.get("code");
  if (code) {
    setCookie("code", code);
  } else {
    navigate("/");
  }
  const accessToken = await getToken();
  setCookie("access_token", accessToken);
}

/**
 * access_token값이 없으면, 입력으로 들어온 함수로 navigate시키는 함수
 * @param navigate navigate hook
 */
export async function checkAccessToken(
  navigate: NavigateFunction
): Promise<void> {
  if (!getCookie("access_token")) {
    await setAccessToken(navigate);
  }
}
