export interface TodoType {
  [id: number]: any;
  id?: string | number;
  userId?: number;
  title?: string;
  completed?: boolean;
  color?: string;
}
