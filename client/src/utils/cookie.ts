/**
 * 쿠키 이름과 쿠키 값을 받고, 해당 쿠키를 저장하는 함수
 * @param name 쿠키 이름
 * @param value 쿠키 값
 */
export const setCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${value}`;
};

/**
 * 쿠키 이름을 받고, 해당 쿠키의 값을 반환하는 함수
 * @param name 가져올 쿠키 이름
 * @returns 쿠키의 값
 */
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(" ");
  const cookieName = `${name}=`;
  const len = cookieName.length;
  let index = 0;
  for (index; index < cookies.length; index += 1) {
    if (cookies[index].startsWith(cookieName)) break;
  }
  if (index === cookies.length) return null;
  return cookies[index].substring(len);
};
