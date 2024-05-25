import axios from "axios";
import { TUser } from "../types/user";
import { TPaginationRequest, TPaginationResponse } from "../types/pagination";

const baseUrl = "http://localhost:8080";

export const getUsers = async (params: Partial<TUser> & TPaginationRequest) => {
  return (await axios.get<TPaginationResponse<TUser>>(`${baseUrl}/users`, { params })).data;
}