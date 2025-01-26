interface ITableStructure {
  headerName: string;
  key: string;
  render?: () => React.ReactNode;
}
export interface ITableProps {
  data: Record<string, any>[];
  structure: ITableStructure[];
  hasCheckbox?: boolean;
  loading?: boolean;
}
