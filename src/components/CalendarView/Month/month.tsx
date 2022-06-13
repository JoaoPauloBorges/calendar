import { FC, useEffect, useState } from "react";
import Day from "../Day";

const getMonthDays = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};
const getFirstDayOfTheWeek = (month: number, year: number) => {
  return new Date(year, month, 1).getDay() + 1;
};

const getLastDayOfTheWeek = (month: number, year: number) => {
  return new Date(year, month, getMonthDays(month, year)).getDay() + 1;
};

const isCurrentDay = (i: number, month: number, year:number) => {
  const curr = new Date();
  const day = new Date(year, month, i);
  return day.toDateString() === curr.toDateString();
};

const fillPastMonth = (year: number, month: number) => {
  const startDayOfTheWeak = getFirstDayOfTheWeek(month, year);
  const pastMonthTotalDays = getMonthDays(
    month - 1 === -1 ? 0 : month - 1,
    year
  );

  const daysPastMonth: any[] = [];
  for (let i = startDayOfTheWeak - 1; i >= 1; i--) {
    daysPastMonth.push(
      <Day
        key={"past" + i}
        disable
        date={new Date(year, month - 1, pastMonthTotalDays + 1 - i)}
      />
    );
  }
  return daysPastMonth;
};

const fillCurrentMonth = (year: number, month: number) => {
  const currentMonthTotaldays = getMonthDays(month, year);

  const daysCurrentMonth: any[] = [];
  for (let i = 1; i <= currentMonthTotaldays; i++) {
    daysCurrentMonth.push(
      <Day
        key={"current" + i}
        current={isCurrentDay(i, month, year)}
        date={new Date(year, month, i)}
      />
    );
  }
  return daysCurrentMonth;
};

const fillNextMonth = (year: number, month: number) => {
  const lastDayOfTheWeak = getLastDayOfTheWeek(month, year);

  const daysNextMonth: any[] = [];
  for (let i = 1; i <= 7 - lastDayOfTheWeak; i++) {
    daysNextMonth.push(
      <Day key={"next" + i} disable date={new Date(year, month + 1, i)} />
    );
  }

  return daysNextMonth;
};

interface Props {
  month: number;
  year: number;
}

const Month: FC<Props> = ({ month, year }) => {
  const [daysPastMonth, setDaysPastMonth] = useState<any[]>([]);
  const [daysCurrentMonth, setDaysCurrentMonth] = useState<any[]>([]);
  const [daysNextMonth, setDaysNextMonth] = useState<any[]>([]);

  useEffect(() => {
    setDaysPastMonth(fillPastMonth(year, month));
    setDaysCurrentMonth(fillCurrentMonth(year, month));
    setDaysNextMonth(fillNextMonth(year, month));
  }, [month, year]);

  return (
    <>
      {daysPastMonth}
      {daysCurrentMonth}
      {daysNextMonth}
    </>
  );
};

export default Month;
