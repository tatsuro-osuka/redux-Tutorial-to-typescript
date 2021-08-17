import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  [id: number]: any;
}

export const fetchTodos = createAsyncThunk<{ todos: FetchData[] }>(
  "todos/fetchTodos",
  async () => ({
    todos: await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    ).then((res) => res.json()),
  })
);
