type TSortType = "asc" | "desc" | null;

export type TSortProps = {
  sortBy: string | null;
  sortType: TSortType;
};

export type TSortModel = {
  field: string;
  sort?: TSortType;
};

export type TPaginationProps = {
  page: number;
  take: number;
};

export type TPaginationRequest = Partial<TPaginationProps> & Partial<TSortProps>;

export type TPaginationResponse<T> = {
  data: T[];
  totalItems: number;
  totalPages: number;
  page: number;
};