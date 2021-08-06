import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import filterReducer from "../features/filters/filterSlice";
import todosReducer from "../features/todos/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
