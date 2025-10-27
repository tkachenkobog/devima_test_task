import axiosInstance from "@/api/axiosInstance";
import { VITALS } from "@/constants/api";

export const getVitals = async (id: string) => {
  const url = VITALS.replace(":id", id);
  const response = await axiosInstance.get(url);
  return response.data;
};
