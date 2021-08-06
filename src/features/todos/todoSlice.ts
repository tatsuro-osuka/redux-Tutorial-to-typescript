import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../../types/types";

import { StatusFilters } from "../filters/filterSlice";

interface TodoState {
  status: "idle" | "loading";
  entities: TodoType;
}

const initialState: TodoState = {
  status: "idle",
  entities: {},
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action) {
      const todo = action.payload;
      state.entities[todo.id] = todo;
    },
    todoToggled(state, action) {
      const todoId = action.payload;
      const todo: TodoType = state.entities[todoId];
      todo.completed = !todo.completed;
    },
    todoColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload;
        state.entities[todoId].color = color;
      },
      prepare(todoId, color): any {
        return {
          payload: { todoId, color },
        };
      },
    },
    todoDeleted(state, action) {
      delete state.entities[action.payload];
    },
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach((todo: any) => {
        todo.completed = true;
      });
    },
    completedTodosCleared(state, action) {
      Object.values(state.entities).forEach((todo: any) => {
        if (todo.completed) {
          delete state.entities[todo.id];
        }
      });
    },
    todosLoading(state, action) {
      state.status = "loading";
    },
    todosLoaded(state, action) {
      const newEntities: any = {};
      action.payload.forEach((todo: { id: string | number }) => {
        newEntities[todo.id] = todo;
      });
      state.entities = newEntities;
      state.status = "idle";
    },
  },
});

export const {
  allTodosCompleted,
  completedTodosCleared,
  todoAdded,
  todoColorSelected,
  todoDeleted,
  todoToggled,
  todosLoaded,
  todosLoading,
} = todosSlice.actions;

export default todosSlice.reducer;

// export const fetchTodos = () => async (dispatch) => {
//   dispatch(todosLoading());
//   const res = await client.get("/fakeApi/todos");
//   dispatch(todosLoaded(res.todos));
// };

// export function saveNewTodo(text) {
//   return async function saveNewTodoThunk(dispatch, getState) {
//     const initialTodo = { text };
//     const res = await client.post("/fakeApi/todos", { todo: initialTodo });
//     dispatch(todoAdded(res.todo));
//   };
// }

const selectTodoEntities = (state: { todos: { entities: any } }) =>
  state.todos.entities;

export const selectTodos = createSelector(selectTodoEntities, (entities) =>
  Object.values(entities)
);

export const selectTodoById = (state: any, todoId: number) => {
  return selectTodoEntities(state)[todoId];
};

export const selectTodoIds = createSelector(selectTodos, (todos) =>
  todos.map((todo: any) => todo.id)
);

export const selectFilteredTodos = createSelector(
  selectTodos,
  (state: any) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters;
    const showAllCompletions = status === StatusFilters.All;
    if (showAllCompletions && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Complete;
    return todos.filter((todo: any) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo: any) => todo.id)
);
