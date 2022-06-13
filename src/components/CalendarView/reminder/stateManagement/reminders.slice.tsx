import { createSlice } from "@reduxjs/toolkit";

export enum Colors {
  COLOR1 = "#f1522e",
  COLOR2 = "#C70039",
  COLOR3 = "#efb800",
  COLOR4 = "#5473ff",
  COLOR5 = "#6600ff",
  COLOR6 = "#581845",
  COLOR7 = "violet",
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
    when: new Date().getTime(),
    createdAt: new Date(2022, 6, i).getTime(),
    color: Object.values(Colors)[i],
    description: `example ${i} asdasdhasd asdh asdjhasd asdjha sdasdhasd`,
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
      return state.map((reminder) => {
        if (reminder.createdAt !== payload.createdAt) {
          return reminder;
        }
        return { ...payload, createdAt: reminder.createdAt };
      });
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
