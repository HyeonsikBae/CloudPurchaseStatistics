const convertStringToDate = (date: string) => {
  const splitedDate = date.split(" ");
  const month = splitedDate[0];
  const day = splitedDate[1];
  const year = splitedDate[2];

  const rtn = new Date(year + month + day);
  return rtn;
};

export default convertStringToDate;
