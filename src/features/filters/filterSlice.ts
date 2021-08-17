import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusFiltersType } from "../../types/types";

export const statusFilters = {
  All: "all",
  Active: "active",
  Completed: "complete",
};

const initialState: { status: StatusFiltersType; colors: string[] } = {
  status: "all",
  colors: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload;
    },
    colorFilterChanged: {
      reducer(
        state,
        action: PayloadAction<{
          color: string;
          changeType: "added" | "removed";
        }>
      ) {
        const { color, changeType } = action.payload;
        const { colors } = state;
        switch (changeType) {
          case "added": {
            if (!colors.includes(color)) {
              colors.push(color);
            }
            break;
          }
          case "removed": {
            state.colors = colors.filter(
              (existingColor) => existingColor !== color
            );
            break;
          }
          default:
            return;
        }
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType },
        };
      },
    },
  },
});

export const { colorFilterChanged, statusFilterChanged } = filtersSlice.actions;
export default filtersSlice.reducer;
