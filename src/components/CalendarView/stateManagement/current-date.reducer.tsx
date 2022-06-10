import { AnyAction } from "@reduxjs/toolkit";

const initialState = new Date();

export default function currentDayReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case "currentDate/increase":
      return new Date(state.getFullYear(), state.getMonth() + 1, 1);
    case "currentDate/decrease":
      return new Date(state.getFullYear(), state.getMonth() - 1, 1);
    case "currentDate/reset":
      return new Date()
    default:
      return state;
  }
}

export const increaseMonth = () => {
  return {
    type: "currentDate/increase",
  }
}

export const reset = () => {
  return {
    type: "currentDate/reset",
  }
}
export const decreaseMonth = () => {
  return {
    type: "currentDate/decrease",
  }
}
