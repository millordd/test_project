interface IOrganization {
  id: number;
  value: string;
}

export interface IMessageItem {
  id: number;
  organization: IOrganization;
  recipient: string;
  content: string;
  sentAt: string;
}

export interface IGetMessageResponse {
  items: IMessageItem[];
  total: number;
}

interface OrderBy {
  orderColumn: number;
  direction: number;
}

// interface PageInfo {
//   pageNumber: number;
//   pageSize: number;
// }

export interface IMessagePayload {
  // ids?: number[];
  orderBy: OrderBy;
  // pageInfo: PageInfo;
}

export interface ITableMessageProps {
  params: IMessagePayload;
}

export interface IEditMessagePayload {
  id: number;
  recipient: string;
  content: string;
}
