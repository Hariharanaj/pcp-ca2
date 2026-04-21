import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async () => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId: "E0123042",
    password: "646480",
    set: "setA",
  });

  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};
