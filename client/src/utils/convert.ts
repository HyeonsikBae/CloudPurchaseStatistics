/**
 * 날짜 값을 문자열 형태로 받고, Date 형태로 변환하여 반환하는 함수
 * @param date 문자열 형태의 날짜 값
 * @returns Date 형태의 날짜 값
 */
const convertStringToDate = (date: string) => {
  const splitedDate = date.split(" ");
  const month = splitedDate[0];
  const day = splitedDate[1];
  const year = splitedDate[2];

  const rtn = new Date(year + month + day);
  return rtn;
};

export default convertStringToDate;
