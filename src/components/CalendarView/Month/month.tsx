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

const isCurrentDay = (i: number, month: number) => {
  const curr = new Date();
  return curr.getDate() === i && curr.getMonth() === month;
};

interface Props {
  month: number;
  year: number;
}

const fillPastMonth = (year: number, month: number) => {
  const startDayOfTheWeak = getFirstDayOfTheWeek(month, year);
  const pastMonthTotalDays = getMonthDays(
    month - 1 === -1 ? 0 : month - 1,
    year
  );

  const daysPastMonth: any[] = [];
  for (let i = startDayOfTheWeak - 1; i >= 1; i--) {
    daysPastMonth.push({
      date: new Date(year, month - 1, pastMonthTotalDays + 1 - i),
    });
  }
  return daysPastMonth;
};

const fillCurrentMonth = (year: number, month: number) => {
  const currentMonthTotaldays = getMonthDays(month, year);

  const daysCurrentMonth: any[] = [];
  for (let i = 1; i <= currentMonthTotaldays; i++) {
    daysCurrentMonth.push({
      date: new Date(year, month, i),
      current: isCurrentDay(i, month),
    });
  }
  return daysCurrentMonth;
};

const fillNextMonth = (year: number, month: number) => {
  const lastDayOfTheWeak = getLastDayOfTheWeek(month, year);

  const daysNextMonth: any[] = [];
  for (let i = 1; i <= 7 - lastDayOfTheWeak; i++) {
    daysNextMonth.push({ date: new Date(year, month + 1, i) });
  }

  return daysNextMonth;
};

const Month: FC<Props> = ({ month, year }) => {
  const [daysPastMonth, setDaysPastMonth] = useState<any[]>([]);
  const [daysCurrentMonth, setDaysCurrentMonth] = useState<any[]>([]);
  const [daysNextMonth, setDaysNextMonth] = useState<any[]>([]);

  useEffect(() => {
    console.log("mudei", { month });

    const past = fillPastMonth(year, month);
    console.log({ past });
    setDaysPastMonth((item) => [...past]);
    console.log({ daysPastMonth });

    const current = fillCurrentMonth(year, month);
    console.log({ current });
    setDaysCurrentMonth((item) => [...current]);
    console.log({ daysCurrentMonth });

    const next = fillNextMonth(year, month);
    console.log({ next });
    setDaysNextMonth((item) => [...next]);
    console.log({ daysNextMonth });

    return () => {
      console.log("morri", { month });
    };
  }, [month]);

  return (
    <>
      {daysPastMonth.map((item, idx) => (
        <Day key={"past" + idx} disable date={item.date} />
      ))}
      {daysCurrentMonth.map((item, idx) => (
        <Day key={"current" + idx} current={item.current} date={item.date} />
      ))}
      {daysNextMonth.map((item, idx) => (
        <Day key={"next" + idx} disable date={item.date} />
      ))}
    </>
  );
};

export default Month;
