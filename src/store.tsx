import { configureStore } from "@reduxjs/toolkit";
import remindersReducer from "components/CalendarView/reminders/stateManagement/reminders.slice";
import currentDayReducer from "components/CalendarView/stateManagement/current-date.slice";
import touchEventReducer from "components/hooks/touchEvents/touchEvent.slice";

const store = configureStore({
  reducer: {
    reminders: remindersReducer,
    currentDate: currentDayReducer,
    touchEvent: touchEventReducer
  },
  preloadedState: undefined,
});

export default store;
