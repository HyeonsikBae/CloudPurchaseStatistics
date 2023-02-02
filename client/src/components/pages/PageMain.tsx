import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getDatas, getEvents } from "../../network/axios.custom.42";
import { IPurchase } from "../../types/IPurchase.type";
import LineChart from "../charts/LineChart";
import PieChart from "../charts/PieChart";
import VerticalBarChart from "../charts/VerticalBarChart";
import { checkAccessToken } from "../../utils/login";
import { annualLabels, mockData } from "../../mock/mockData";
import {
  getLevelNowPurchasedCloud,
  getLevelWhenPurchasedCloud,
  getMonthlyEventCount,
  getMonthlyPurchasedCloudCount,
  getPurchasedCloudCount,
  getPurchasedCloudCountByEachUser,
  getPurchasedCreditAmount,
} from "../utils/dataCleansing";
import getCloudDBDatas from "../../network/axios.custom.cloudDB";
import { getMonthlyLog } from "../../network/axios.custom.24hane";
import TwoVerticalBarChart from "../charts/TwoVerticalBarChart";

const PieChartWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 1rem;
`;

const LineChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin: 2rem;
  padding: 1rem;
`;

const BarChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin: 2rem;
  padding: 1rem;
`;

function PageMain(): JSX.Element {
  // 연도 설정 값
  // 초기값 : 2022
  const [year, setYear] = useState<number>(2022);

  // 데이터 값
  // 초기값 : 빈 값
  const [datas, setDatas] = useState<IPurchase[]>([]);

  // 이벤트 값
  // 초기값 : 빈 값
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   checkAccessToken(navigate);
  // }, []);

  useEffect(() => {
    getNewDatas();
    // getEventDatas();
    // getMonthlyLog("joopark", year, 11);
  }, [year]);

  async function getNewDatas(): Promise<void> {
    setDatas(await getCloudDBDatas(year));
  }

  async function getEventDatas(): Promise<void> {
    setEvents(await getEvents(year));
  }

  const cloudCountData = useMemo(() => {
    return getPurchasedCloudCount(datas);
  }, [datas]);

  const creditAmountData = useMemo(() => {
    return getPurchasedCreditAmount(datas);
  }, [datas]);

  // const monthlyEventData = useMemo(() => {
  //   return getMonthlyEventCount(events);
  // }, [events]);

  const monthlyCloudCountData = useMemo(() => {
    return getMonthlyPurchasedCloudCount(datas);
  }, [datas]);

  const cloudCountByEachUserData = useMemo(() => {
    return getPurchasedCloudCountByEachUser(datas);
  }, [datas]);

  const atmLevelData = useMemo(() => {
    return getLevelWhenPurchasedCloud(datas);
  }, [datas]);

  const nowLevelData = useMemo(() => {
    return getLevelNowPurchasedCloud(datas);
  }, [datas]);

  const yearClickHandler = (selectedYear: number): void => {
    setYear(selectedYear);
  };

  return (
    <div style={{ width: "50vw", height: "100vh" }}>
      <header style={{ height: "3rem" }}>
        <div style={{ position: "fixed", right: "1rem" }}>
          <button onClick={(): void => yearClickHandler(2021)}>2021</button>
          <button onClick={(): void => yearClickHandler(2022)}>2022</button>
          <button onClick={(): void => yearClickHandler(2023)}>2023</button>
        </div>
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        <PieChartWrapper>
          <div>클라우드 구매 통계</div>
          <PieChart
            labels={Array.from(Object.keys(cloudCountData))}
            datas={Array.from(Object.values(cloudCountData))}
          />
        </PieChartWrapper>

        <PieChartWrapper>
          <div>크레딧 구매 통계</div>
          <PieChart
            labels={Array.from(Object.keys(creditAmountData))}
            datas={Array.from(Object.values(creditAmountData))}
          />
        </PieChartWrapper>
      </div>
      <LineChartWrapper>
        <div>월별 클라우드 구매 추이</div>
        <div style={{ width: "90%", height: "40%" }}>
          <LineChart
            datas={Array.from(Object.values(monthlyCloudCountData))}
            label="클라우드 구매 수량"
            title=""
            labels={annualLabels}
          />
        </div>
      </LineChartWrapper>
      <BarChartWrapper>
        <div>유저별 구매 크레딧</div>
        <div style={{ width: "90%", height: "40%" }}>
          <VerticalBarChart
            datas={Array.from(Object.values(cloudCountByEachUserData))}
            label="구매한 크레딧"
            title=""
            labels={Array.from(Object.keys(cloudCountByEachUserData))}
          />
        </div>
      </BarChartWrapper>
      <BarChartWrapper>
        <div>클라우드 구매자 레벨</div>
        <div style={{ width: "90%", height: "40%" }}>
          <TwoVerticalBarChart
            datas1={Array.from(Object.values(atmLevelData))}
            label1="클라우드 구매 시점"
            datas2={Array.from(Object.values(nowLevelData))}
            label2="현재"
            title=""
            labels={Array.from(Object.keys(nowLevelData))}
          />
        </div>
      </BarChartWrapper>
      {/* <BarChartWrapper>
        <div>월별 이벤트 수</div>
        <div style={{ width: "90%", height: "40%" }}>
          <VerticalBarChart
            datas={Array.from(Object.values(monthlyEventData))}
            label="이벤트 수"
            title=""
            labels={annualLabels}
          />
        </div>
      </BarChartWrapper> */}
    </div>
  );
}

export default PageMain;
