export interface TodoType {
  [id: number]: any;
  id?: string | number;
  userId?: number;
  title?: string;
  completed?: boolean;
  color?: string;
}

export interface StatusFiltersType {
  All: "all";
  Active: "active";
  Completed: "complete";
  [key: string]: string;
}

export interface ColorFilterChanged {
  color: never;
  changeType: "added" | "removed";
}
