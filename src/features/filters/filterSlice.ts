import { createSlice } from "@reduxjs/toolkit";

interface StatusFiltersType {
  [All: string]: string;
}

export const StatusFilters: StatusFiltersType = {
  All: "all",
  Active: "active",
  Complete: "complete",
};

const initialState = {
  status: StatusFilters.All,
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
      reducer(state, action) {
        let {
          color,
          changeType,
        }: { color: never; changeType: "added" | "removed" } = action.payload;
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
      prepare(color, changeType): any {
        return {
          payload: { color, changeType },
        };
      },
    },
  },
});

export const { colorFilterChanged, statusFilterChanged } = filtersSlice.actions;
export default filtersSlice.reducer;
