import { FC, useEffect, useState } from "react";

interface Props {
  date: Date;
  disable?: boolean;
}
const Day: FC<Props> = ({ date, disable = false }) => {
  let [day, setDay] = useState(0);

  useEffect(() => {
    setDay(date.getDate());
  }, [date]);

  return (
    <div
      style={
        disable ? { pointerEvents: "none", backgroundColor: "#959494" } : {}
      }
    >
      {day}
    </div>
  );
};

export default Day;
