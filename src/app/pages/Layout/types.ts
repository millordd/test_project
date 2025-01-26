export interface INotification {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  event: IEvent;
}

interface IEvent {
  type: number;
  id: string;
}
