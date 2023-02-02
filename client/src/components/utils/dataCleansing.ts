import { ICloudCounts } from "../../types/ICloudCount.type";
import { ICloudCredit } from "../../types/ICloudCredit.type";
import { IMonthlyData } from "../../types/IMonthlyData.type";

/**
 * datas 배열에서 각 클라우드별 구매 회수를 집계하여 반환하는 함수
 * @param datas 데이터 배열
 * @returns 각 클라우드별 구매 회수를 집계한 ICloudCounts 객체
 */
export const getPurchasedCloudCount = (datas: any[]): ICloudCounts => {
  const clouds: ICloudCounts = {
    AWS: 0,
    NCP: 0,
    "KT Cloud": 0,
    "MS Azure": 0,
  };

  datas.forEach((data) => {
    clouds[data.csp_item as keyof ICloudCounts] += 1;
  });
  return clouds;
};

/**
 * datas 배열에서 각 크레딧 구매 회수를 집계하여 반환하는 함수
 * @param datas 데이터 배열
 * @returns 각 크레딧별 구매 회수를 집계한 ICloudCredit 객체
 */
export const getPurchasedCreditAmount = (datas: any[]): ICloudCredit => {
  const clouds: ICloudCredit = {
    10: 0,
    50: 0,
    100: 0,
  };
  datas.forEach((data) => {
    clouds[data.csp_amount as keyof ICloudCredit] += 1;
  });
  return clouds;
};

/**
 * datas 배열에서 월별 이벤트 회수를 집계하여 반환하는 함수
 * @param datas 데이터 배열
 * @returns 월별 이벤트 회수를 집계한 IMonthlyData 객체
 */
export const getMonthlyEventCount = (datas: any[]): IMonthlyData => {
  const events: IMonthlyData = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };
  datas.forEach((data) => {
    if (new Date(data.begin_at).getMonth() + 1) {
      events[
        (new Date(data.begin_at).getMonth() + 1) as keyof IMonthlyData
      ] += 1;
    }
  });
  return events;
};

/**
 * datas 배열에서 월별 구매 회수를 집계하여 반환하는 함수
 * @param datas 데이터 배열
 * @returns 월별 구매 회수를 집계한 IMonthlyData 객체
 */
export const getMonthlyPurchasedCloudCount = (datas: any[]): IMonthlyData => {
  const monthlyPurchase: IMonthlyData = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };
  datas.forEach((data) => {
    monthlyPurchase[
      (new Date(data.created_at).getMonth() + 1) as keyof IMonthlyData
    ] += 1;
  });
  return monthlyPurchase;
};

/**
 * datas 배열에서 유저별 구매 회수를 집계하여 반환하는 함수
 * @param datas 데이터 배열
 * @returns 유저별 구매 회수를 집계한 객체
 */
export const getPurchasedCloudCountByEachUser = (datas: any[]): any => {
  const eachUserPurchase: any = {};
  datas.forEach((data) => {
    if (eachUserPurchase[data.username])
      eachUserPurchase[data.username] += data.csp_amount;
    else eachUserPurchase[data.username] = data.csp_amount;
  });
  return eachUserPurchase;
};

/**
 * datas 배열에서 구매 당시 유저의 레벨을 집계하여 반환하는 함수
 * @param datas 데이터 배열
 * @returns 구매 당시 유저의 레벨을 집계한 any 객체
 */
export const getLevelWhenPurchasedCloud = (datas: any[]): any => {
  const level: any = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  };
  datas.forEach((data) => {
    if (!level[data.level_atm.toFixed()]) level[data.level_atm.toFixed()] = 0;
    level[data.level_atm.toFixed()] += 1;
  });
  return level;
};

/**
 * datas 배열에서 유저의 현재 레벨을 집계하여 반환하는 함수
 * @param datas 데이터 배열
 * @returns 유저의 현재 레벨을 집계한 any 객체
 */
export const getLevelNowPurchasedCloud = (datas: any[]): any => {
  const level: any = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  };
  datas.forEach((data) => {
    if (data.level_now) {
      if (!level[data.level_now.toFixed()]) level[data.level_now.toFixed()] = 0;
      level[data.level_now.toFixed()] += 1;
    }
  });
  return level;
};
