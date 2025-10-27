import axiosInstance from "@/api/axiosInstance";
import { PATIENT } from "@/constants/api";

export const getPatient = async (id: string) => {
  const response = await axiosInstance.get(`${PATIENT}/${id}`);
  return response.data;
};
