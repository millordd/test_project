export interface AddMessagesProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}
export interface IMessagePayload {
  organizationId: number;
  messageType: number;
  recipient: string;
  content: string;
}
