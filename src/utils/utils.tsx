export function getWeekNames(locale = "en-US") {
  var baseDate = new Date(Date.UTC(2017, 0, 2));
  var weekDays: any[] = [];
  for (let i = 1; i <= 7; i++) {
    const weekName = baseDate.toLocaleDateString(locale, { weekday: "short" });
    weekDays.push(
      <div className="DaysOfWeek" key={i}>
        {weekName}
      </div>
    );
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}
