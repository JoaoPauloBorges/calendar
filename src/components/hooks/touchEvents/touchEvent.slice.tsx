import { createSlice } from "@reduxjs/toolkit";

export enum Directions {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  INITIAL = "INITIAL",
}

const touchEventSlice = createSlice({
  name: "touchEvent",
  initialState: Directions.INITIAL,
  reducers: {
    dispatchLeft(state: Directions | null) {
      return Directions.LEFT;
    },
    dispatchRight(state: Directions | null) {
      return Directions.RIGHT;
    },
    reset(state: Directions | null) {
      return Directions.INITIAL;
    },
  }
});

const selectTouchEvent = (store: any) => store.touchEvent;

export const { dispatchLeft, dispatchRight, reset } = touchEventSlice.actions;

export { selectTouchEvent };

export default touchEventSlice.reducer;
