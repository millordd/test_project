export interface IMessagePayload {
  organizationId: number;
  messageType: number;
  recipient: string;
  content: string;
}
