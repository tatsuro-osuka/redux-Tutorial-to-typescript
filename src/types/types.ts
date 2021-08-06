export interface TodoType {
  [id: number]: string;
  id?: number;
  userId?: number;
  title?: string;
  completed?: boolean;
  color?: string;
}
