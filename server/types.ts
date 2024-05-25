type TSortType = "asc" | "desc" | null;

export type TSortProps = {
  sortBy: UsersField | null;
  sortType: TSortType;
};

export type TPaginationProps = {
  page: number;
  take: number;
};

export enum UsersField {
  Id = "id",
  Name = "name",
  Age = "age"
}

export type TPaginationRequest = Partial<TPaginationProps> & Partial<TSortProps>;

export type TPaginationResponse<T> = {
  data: T[];
  totalItems: number;
  totalPages: number;
  page: number;
};