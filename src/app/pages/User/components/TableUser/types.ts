interface IFilters {
  userName: string;
  email: string;
  phoneNumber: string;
}

interface IOrderBy {
  orderColumn: number;
  direction: number;
}

interface IPageInfo {
  pageNumber: number;
  pageSize: number;
}

export interface IGetUsersPayload {
  filters: IFilters;
  orderBy: IOrderBy;
  pageInfo: IPageInfo;
}

export interface ITableUserProps {
  params: IGetUsersPayload;
}

export interface IUser {
  id: number;
  organizationId: number;
  userName: string;
  email: string;
  phoneNumber: string;
}
export interface IEditUserPayload extends IFilters {
  id: number;
  updatedAt: string;
  timestamp: string;
}

export interface IUserList {
  items: IUser[];
  total: number;
}
