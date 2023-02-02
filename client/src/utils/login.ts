import { NavigateFunction } from "react-router-dom";
import { getToken } from "../network/axios.custom.24hane";
import { getCookie, setCookie } from "./cookie";

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

export async function checkAccessToken(
  navigate: NavigateFunction
): Promise<void> {
  if (!getCookie("access_token")) {
    await setAccessToken(navigate);
  }
}
