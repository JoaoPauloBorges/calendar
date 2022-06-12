import classNames from "classnames";

export function getWeekNames(locale = "en-US") {
  var baseDate = new Date(Date.UTC(2017, 0, 2));
  var weekDays: any[] = [];
  for (let i = 1; i <= 7; i++) {
    const weekName = baseDate.toLocaleDateString(locale, { weekday: "short" });
    weekDays.push(weekName);
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}

export const getMonthName = (month: number) => {
  const date = new Date();
  date.setMonth(month);
  return date.toLocaleDateString("default", { month: "long" });
};

export function generateClassNamesWithBaseClass(baseClass: string) {
  return function (...args: any[]) {
    return classNames(baseClass, ...args);
  };
}
