import { configureStore } from "@reduxjs/toolkit";
import remindersReducer from "components/CalendarView/reminders/stateManagement/reminders.slice";
import currentDayReducer from "components/CalendarView/stateManagement/current-date.reducer";

const store = configureStore({
  reducer: {
    reminders: remindersReducer,
    currentDate: currentDayReducer,
  },
  preloadedState: undefined,
});

export default store;
