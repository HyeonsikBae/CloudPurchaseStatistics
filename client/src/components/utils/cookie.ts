export const setCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${value}`;
};

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
