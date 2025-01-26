export interface IAddSeveralMessagesProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

interface IMessageItem {
  recipient: string;
  content: string;
}

export interface ISeveralMessagePayload {
  messageType: number;
  items: IMessageItem[];
}
