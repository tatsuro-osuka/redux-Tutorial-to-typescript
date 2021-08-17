export interface TodoType {
  [id: number]: any;
  id?: string | number;
  userId?: number;
  title?: string;
  completed?: boolean;
  color?: string;
}

export type StatusFiltersType = "all" | "active" | "complete";

export interface ColorFilterChanged {
  color: string;
  changeType: "added" | "removed";
}

export interface StateType {
  filters: {
    colors: string[];
    status: string;
  };
  todos: {
    entities: TodoType[];
    status: string;
  };
}
