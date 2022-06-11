import classNames from "classnames";
import { FC, useEffect, useState } from "react";

import "./day.less";

interface Props {
  date: Date;
  current?: boolean;
  disable?: boolean;
}
const Day: FC<Props> = ({ date, disable = false, current = false }) => {
  let [day, setDay] = useState(0);

  useEffect(() => {
    setDay(date.getDate());
  }, [date]);

  return (
    <div
      className={classNames("Day", {
        "Day--disable": disable,
        "Day--current": current,
      })}
    >
      {day}
    </div>
  );
};

export default Day;
