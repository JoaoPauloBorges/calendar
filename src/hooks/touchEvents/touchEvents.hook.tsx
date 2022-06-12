import { createContext, FC, useContext, useEffect } from "react";
import { dispatchLeft, dispatchRight, resetTouchState } from "./touchEvent.slice";
import { useDispatch } from "react-redux";

let xDown = 0;
let yDown = 0;

let decrease: boolean | null = null;

export function handleTouchMove(evt: any) {
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

const isTouchDevice = () => window.matchMedia("(pointer: coarse)").matches;
const isMobileDevice = () => {
  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;
  let isMobile = regexp.test(details);
  return isMobile;
};

interface TouchEventReturn {
  isTouchDevice: () => boolean;
  isMobileDevice: () => boolean;
}

const contextValue = { isTouchDevice, isMobileDevice };
const TouchEventContext = createContext<TouchEventReturn>(contextValue);

interface Props {
  children: React.ReactNode;
}
const TouchEventsProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const handleTouchEnd = (evt: any) => {
    if (decrease === null) return;
    if (decrease) {
      dispatch(dispatchLeft());
    } else {
      dispatch(dispatchRight());
    }
    setTimeout(() => dispatch(resetTouchState()), 70);
  };

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
    document.addEventListener("touchend", handleTouchEnd, false);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <TouchEventContext.Provider value={contextValue}>
      {children}
    </TouchEventContext.Provider>
  );
};

function useTouchEvents() {
  const context = useContext(TouchEventContext);
  return context;
}

export { useTouchEvents, TouchEventsProvider };
