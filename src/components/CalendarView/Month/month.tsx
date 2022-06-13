import { FC, useEffect, useState } from "react";
import {
  getFirstDayOfTheWeek,
  getMonthDays,
  getLastDayOfTheWeek,
} from "utils/utils";
import Day from "../Day";

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
  const isCurrentDay = (dayToEvaluate: number) => {
    const day = new Date(year, month, dayToEvaluate);
    return day.toDateString() === new Date().toDateString();
  };

  const currentMonthTotaldays = getMonthDays(month, year);

  const daysCurrentMonth: any[] = [];
  for (let i = 1; i <= currentMonthTotaldays; i++) {
    daysCurrentMonth.push(
      <Day
        key={"current" + i}
        current={isCurrentDay(i)}
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
