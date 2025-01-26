import { PlacesType } from 'react-tooltip';

export interface ITooltipProps {
  children: React.ReactNode;
  title: string;
  place?: PlacesType;
}
