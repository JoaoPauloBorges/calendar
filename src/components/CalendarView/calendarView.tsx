import { notification } from "antd";
import {
  Directions,
  selectTouchEvent,
} from "hooks/touchEvents/touchEvent.slice";
import { useTouchEvents } from "hooks/touchEvents/touchEvents.hook";
import { FC, useEffect } from "react";
import { generateClassNamesWithBaseClass, getWeekNames } from "utils/utils";
import Month from "./Month";
import {
  decreaseMonth,
  increaseMonth,
  selectCurrentDate,
} from "./stateManagement/current-date.slice";
import "./calendarView.less";
import { useSelector, useDispatch } from "react-redux";
import { throttle } from "lodash";

const CalendarView: FC = () => {
  const PrefixBaseClass = "CalendarView";
  const classes = generateClassNamesWithBaseClass(PrefixBaseClass);

  const dispatch = useDispatch();
  const currentDate = useSelector(selectCurrentDate);
  const touchEvent = useSelector(selectTouchEvent);

  const { isTouchDevice, isMobileDevice } = useTouchEvents();

  const weekNames = getWeekNames().map((weekName, idx) => (
    <h4 className={classes("DaysOfWeek")} key={idx}>
      {weekName}
    </h4>
  ));

  const showTipChangeMonth = () => {
    const isSwipeable = isTouchDevice() || isMobileDevice();
    const message = isSwipeable
      ? "You can Swipt Left or Right to change Month"
      : "You can scroll to change Month";
    notification.open({
      key: "changeMonthTip",
      placement: "bottom",
      bottom: !isSwipeable ? 300 : undefined,
      message,
      duration: 1.5,
      closeIcon: <></>,
      maxCount: 1,
      style: {
        borderRadius: "10px",
        backgroundColor: isSwipeable ? "#efefef88" : "white",
        textAlign: "center",
      },
      onClick: () => {
        notification.close("changeMonthTip");
      },
    });
  };

  const handleSwipe = (direction: Directions) => {
    if (direction === Directions.INITIAL) return;
    if (direction === Directions.LEFT) {
      return dispatch(decreaseMonth());
    }
    dispatch(increaseMonth());
  };

  const handleWheel = throttle((event: WheelEvent) => {
    if (
      event.ctrlKey === true ||
      event.shiftKey === true ||
      event.view?.scrollY !== 0 ||
      (!(event as any).target?.classList.value.includes("Layout") &&
        !(event as any).target?.classList.value.includes("Day"))
    ) {
      return;
    }

    if (event.deltaY > 0) {
      return dispatch(increaseMonth());
    }
    dispatch(decreaseMonth());
  }, 500);

  useEffect(() => {
    showTipChangeMonth();
    document.addEventListener("wheel", handleWheel, false);
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    handleSwipe(touchEvent);
  }, [touchEvent]);

  return (
    <section className={classes("Section")}>
      <div className={classes("Grid")}>
        {weekNames}
        <Month
          month={new Date(currentDate).getMonth()}
          year={new Date(currentDate).getFullYear()}
        />
      </div>
    </section>
  );
};

export default CalendarView;
