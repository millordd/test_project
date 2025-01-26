export interface IDatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];
