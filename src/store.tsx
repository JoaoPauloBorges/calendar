import { configureStore } from "@reduxjs/toolkit";
import remindersReducer from "components/CalendarView/reminder/stateManagement/reminders.slice";
import currentDayReducer from "components/CalendarView/stateManagement/current-date.slice";
import touchEventReducer from "hooks/touchEvents/touchEvent.slice";

const store = configureStore({
  reducer: {
    reminders: remindersReducer,
    currentDate: currentDayReducer,
    touchEvent: touchEventReducer
  },
  preloadedState: undefined,
});

export default store;
