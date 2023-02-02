import axios from "axios";

const getCloudDBDatas = async (year: number): Promise<any> => {
  try {
    const response = await axios.get(
      `https://cloud-db.42seoul.kr/data/${year}`
    );
    return response.data;
  } catch (e) {
    throw new Error();
  }
};

export default getCloudDBDatas;
