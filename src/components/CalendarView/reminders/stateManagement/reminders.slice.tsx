import { AnyAction } from "@reduxjs/toolkit";

export type Colors = "purple" | "blue";

export class ReminderStateItem {
  constructor(partial: ReminderStateItem) {
    Object.assign(this, partial);
  }
  when!: Date;
  text!: string;
  color!: Colors;
}

const initialState: ReminderStateItem[] = [];

export default function remindersReducer(
  state: ReminderStateItem[] = initialState,
  action: AnyAction
) {
  const payload = action.payload as ReminderStateItem;

  switch (action.type) {
    case "reminders/reminderAdded": {
      return [...state, new ReminderStateItem(payload)];
    }
    case "reminders/reminderEdited": {
      const filtered = state.filter(
        (reminder) => reminder.when !== payload.when
      );
      if (filtered.length === state.length) return state;

      return [...filtered, payload];
    }
    case "reminders/reminderDeleted": {
      return state.filter((reminder) => reminder.when !== payload.when);
    }
    default:
      return state;
  }
}
