import { Unsubscribe } from "@reduxjs/toolkit";
import { notification } from "antd";
import { FC, useEffect, useState } from "react";
import store from "store";
import { Grid } from "./grid";
import Month from "./Month";
import {
  decreaseMonth,
  increaseMonth,
} from "./stateManagement/current-date.reducer";

let xDown = 0;
let yDown = 0;
let decrease: boolean | null = null;

function handleTouchMove(evt: any) {
  if (!xDown || !yDown) {
    return;
  }
  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) decrease = true;
    else decrease = false;
  } else {
    decrease = null;
  }
  xDown = 0;
  yDown = 0;
}

function handleTouchStart(evt: any) {
  const firstTouch = evt.touches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

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

const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches;

const isMobileDevice = () => {
  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;
  let isMobile = regexp.test(details);
  return isMobile;
};

const daysOfTheWeek = [
  <div key={1}>Sun</div>,
  <div key={2}>Mon</div>,
  <div key={3}>Tue</div>,
  <div key={4}>Wed</div>,
  <div key={5}>Thu</div>,
  <div key={6}>Fri</div>,
  <div key={7}>Sat</div>,
];

const CalendarView: FC = () => {
  const [currentDate, setCurrentDate] = useState(
    store.getState().currentDate
  );
  let unsub: Unsubscribe;

  const handleTouchEnd = (evt: any) => {
    if (decrease === null) return;
    if (decrease) {
      return store.dispatch(decreaseMonth());
    }
    store.dispatch(increaseMonth());
  };

  const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      return store.dispatch(increaseMonth());
    }
    store.dispatch(decreaseMonth());
  };

  useEffect(() => {
    console.log("calendarView onMount");
    document.addEventListener("wheel", handleScroll, false);
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
    document.addEventListener("touchend", handleTouchEnd, false);
    return () => {
      document.removeEventListener("wheel", handleScroll);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsub = store.subscribe(() => {
      setCurrentDate(store.getState().currentDate);
    });
    showTipChangeMonth();
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <Grid>
        {daysOfTheWeek}
        <Month
          month={currentDate.getMonth()}
          year={currentDate.getFullYear()}
        />
      </Grid>
    </>
  );
};

export default CalendarView;
