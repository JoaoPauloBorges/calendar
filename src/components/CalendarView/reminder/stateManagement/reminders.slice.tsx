import { createSlice } from "@reduxjs/toolkit";

export enum Colors {
  PURPLE = "purple",
  BLUE = "royalblue",
  ORANGE = "orange",
  RED = "red",
  GREEN = "green",
  INDIGO = "indigo",
  VIOLET = "violet",
}

export class ReminderStateItem {
  constructor(partial: ReminderStateItem) {
    Object.assign(this, partial);
  }
  when!: number;
  createdAt!: number;
  description!: string;
  color!: Colors;
}

const initialState: ReminderStateItem[] = [];
for (let i = 0; i < 7; i++) {
  initialState.push({
    when: new Date(2022, 6, i).getTime(),
    createdAt: new Date(2022, 6, i).getTime(),
    color: Object.values(Colors)[i],
    description: `example ${i}`,
  } as ReminderStateItem);
}

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder(state, { payload }: { payload: ReminderStateItem }) {
      state.push(payload);
    },
    editReminder(state, { payload }: { payload: ReminderStateItem }) {
      const filtered = state.filter(
        (reminder) => reminder.createdAt !== payload.createdAt
      );
      if (filtered.length === state.length) return state;

      return [...filtered, payload];
    },
    deleteReminder(state, { payload }: { payload: ReminderStateItem }) {
      return state.filter(
        (reminder) => reminder.createdAt !== payload.createdAt
      );
    },
  },
});

const selectAllReminders = (store: any) => store.reminders;

export const { addReminder, editReminder, deleteReminder } =
  remindersSlice.actions;
export { selectAllReminders };
export default remindersSlice.reducer;
