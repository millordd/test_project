export interface IAddUserProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}
export interface IAddUserPayload {
  organizationId: number;
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
}
