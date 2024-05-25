import { atom, } from "jotai";
import { TUser } from "../types/user";
import { TPaginationProps, TSortModel } from "../types/pagination";

export const users = atom<TUser[]>([]);
export const filter = atom<Partial<TUser>>({});
export const DEFAULT_SORT_MODEL = { field: "id", sort: null };
export const sortModel = atom<TSortModel>(structuredClone(DEFAULT_SORT_MODEL));
export const pagination = atom<TPaginationProps & { totalItems: number }>({ page: 0, take: 5, totalItems: 0 });