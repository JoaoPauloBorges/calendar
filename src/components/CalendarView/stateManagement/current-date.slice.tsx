import { createSlice } from "@reduxjs/toolkit";

const currentDateSlice = createSlice({
  name: "currentDate",
  initialState: new Date().getTime(),
  reducers: {
    increaseMonth(state: number) {
      const date = new Date(state)
      return new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime();
    },
    decreaseMonth(state: number) {
      const date = new Date(state)
      return new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime();
    },
    reset(state: number) {
      return new Date().getTime();
    },
  },
});

const selectCurrentDate = (store: any) => store.currentDate;

export const { increaseMonth, decreaseMonth, reset } = currentDateSlice.actions;
export { selectCurrentDate };

export default currentDateSlice.reducer;
