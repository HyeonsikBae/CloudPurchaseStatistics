import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatas, getEvents, getToken } from "../../network/axios.custom";
import { ICloudCounts } from "../../types/ICloudCount.type";
import { ICloudCredit } from "../../types/ICloudCredit";
import { IMonthlyPurchase } from "../../types/IMonthlyPurchase";
import { IPurchase } from "../../types/IPurchase.type";
import LineChart from "../charts/LineChart";
import PieChart from "../charts/PieChart";

import { getCookie, setCookie } from "../utils/cookie";

function PageMain(): JSX.Element {
  const [datas, setDatas] = useState<IPurchase[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function setAccessToken() {
      const urlSearch = new URLSearchParams(location.search);
      const code = await urlSearch.get("code");
      if (code) {
        console.log("code!");
        setCookie("code", code);
      } else {
        navigate("/");
      }
      const accessToken = await getToken();
      setCookie("access_token", accessToken);
    }
    async function checkAccessToken() {
      if (!getCookie("access_token")) {
        console.log("nope");
        await setAccessToken();
      } else {
        const purchaseDatas = await getDatas();
        if (purchaseDatas) setDatas(purchaseDatas);
      }
    }
    async function getEventDatas() {
      const result = await getEvents();
      setEvents(result);
      console.log(events);
    }
    checkAccessToken();
    getEventDatas();
  }, []);

  const renderDatas = (): JSX.Element[] => {
    return datas.map((data) => {
      return (
        <div key={data.id}>
          <span>{data.id}</span> <span>{data.intra_id}</span>{" "}
          <span>{data.item}</span> <span>{data.amount}</span>{" "}
          <span>{data.create_at.toString()}</span>{" "}
          <span>{data.validated_at.toString()}</span>
        </div>
      );
    });
  };

  const getDatasForPieChart = () => {
    const clouds: ICloudCounts = {
      AWS: 0,
      NCP: 0,
      "KT Cloud": 0,
      "MS Azure": 0,
    };
    datas.forEach((data) => {
      clouds[data.item as keyof ICloudCounts] += 1;
    });
    return clouds;
  };

  const getCreditsForPieChart = () => {
    const clouds: ICloudCredit = {
      "10": 0,
      "50": 0,
      "100": 0,
    };
    datas.forEach((data) => {
      clouds[data.amount as keyof ICloudCredit] += 1;
    });
    return clouds;
  };

  const getDatasForLineChart = () => {
    const monthlyPurchase: IMonthlyPurchase = {
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
      if (data.create_at.getMonth()) {
        monthlyPurchase[
          (data.create_at.getMonth() + 1) as keyof IMonthlyPurchase
        ] += 1;
      }
    });
    console.log(monthlyPurchase);
    return monthlyPurchase;
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ width: "25%", height: "25%" }}>
        <PieChart
          labels={Array.from(Object.keys(getDatasForPieChart()))}
          datas={Array.from(Object.values(getDatasForPieChart()))}
        />
      </div>
      <div style={{ width: "25%", height: "25%" }}>
        <PieChart
          labels={Array.from(Object.keys(getCreditsForPieChart()))}
          datas={Array.from(Object.values(getCreditsForPieChart()))}
        />
      </div>
      <div style={{ width: "100%", height: "25%" }}>
        <LineChart datas={Array.from(Object.values(getDatasForLineChart()))} />
      </div>
    </div>
  );
}

export default PageMain;
