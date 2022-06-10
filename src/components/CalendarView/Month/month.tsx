import { FC } from "react";
import Day from "../Day";

const getMonthDays = (month: number, year:number) => {
  return new Date(year, month + 1, 0).getDate();
};
const getFirstDayOfTheWeek = (
  month: number,
  year: number
) => {
  return new Date(year, month, 1).getDay() + 1;
};

const getLastDayOfTheWeek = (
  month: number,
  year: number
) => {
  return new Date(year, month, getMonthDays(month, year)).getDay() + 1;
};

interface Props {
  month: number;
  year: number;
}

const Month: FC<Props> = ({ month, year }) => {
  const days = [];

  const daysCurrentMonth = getMonthDays(month, year);
  const daysPastMonth = getMonthDays(month - 1 === -1 ? 0 : month - 1, year);

  const startDayOfTheWeak = getFirstDayOfTheWeek(month, year);
  const lastDayOfTheWeak = getLastDayOfTheWeek(month, year);

  for (let i = startDayOfTheWeak - 1; i >= 1; i--) {
    days.push(
      <Day
        disable
        key={"last" + i}
        date={new Date(year, month - 1, daysPastMonth + 1 - i)}
      />
    );
  }

  for (let i = 1; i <= daysCurrentMonth; i++) {
    days.push(<Day key={"current" + i} date={new Date(year, month, i)} />);
  }

  for (let i = 1; i <= 7 - lastDayOfTheWeak; i++) {
    days.push(
      <Day key={"next" + i} disable date={new Date(year, month + 1, i)} />
    );
  }

  return <>{days}</>;
};

export default Month;
