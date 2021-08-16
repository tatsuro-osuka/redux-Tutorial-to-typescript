import { createAsyncThunk } from "@reduxjs/toolkit";

export interface FetchData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const data: FetchData[] = await res.json();
  return { todos: data };
});
