import { IPurchase } from "../types/IPurchase.type";
import convertStringToDate from "./convert";

/**
 * 데이터와 연도 값을 받고, 객체 형태로 파싱하여 반환하는 함수
 * @param dataArr api를 통해 받아온 데이터 배열
 * @param year 설정 연도 값
 * @returns IPurchase 객체 배열
 */
const parsePurchaseData = (dataArr: string[], year: number) => {
  const rtn: IPurchase[] = [];
  for (let i = 0; i < dataArr.length; i += 1) {
    const obj: IPurchase = {
      id: "",
      transaction_id: "",
      user_id: "",
      intra_id: "",
      item: "",
      amount: "",
      create_at: new Date(),
      is_validated: "",
      validated_at: new Date(),
    };
    const dataString = dataArr[i].split(" ");
    let idx = 1;
    obj.id = dataString[idx++];
    obj.transaction_id = dataString[idx++];
    obj.user_id = dataString[idx++];
    obj.intra_id = dataString[idx++];
    obj.item =
      dataString[idx] === "AWS" || dataString[idx] === "NCP"
        ? dataString[idx++]
        : `${dataString[idx++]} ${dataString[idx++]}`;
    obj.amount = dataString[idx++];
    obj.create_at = convertStringToDate(
      `${dataString[idx++]} ${dataString[idx++]} ${dataString[idx++]} ${
        dataString[idx++]
      } ${dataString[idx++]}`
    );
    obj.is_validated = dataString[idx++];
    obj.validated_at = convertStringToDate(
      `${dataString[idx++]} ${dataString[idx++]} ${dataString[idx++]} ${
        dataString[idx++]
      } ${dataString[idx]}`
    );
    if (obj.create_at.getFullYear() === year) rtn.push(obj);
  }
  return rtn;
};

export default parsePurchaseData;
