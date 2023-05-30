import React from "react";
import { useSelector } from "react-redux";

import { DayTime } from "../components/statistics/DayTime";
import { Graph } from "../components/statistics/Graph";
import { Stat } from "../components/statistics/Stat";
import { TomatoCount } from "../components/statistics/TomatoCount";
import { Select } from "../components/statistics/Select";
import { getLastWeekEnd, getLastWeekStart, getOldestEnd, getOldestStart } from "../utils/dates";

export function Activity() {

  const statStore = useSelector(state => state.main.history);
  const theme = useSelector(state => state.main.theme);

  let currentStore = [];

  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const [day, setDay] = React.useState(days[new Date().getDay()]);
  const [variant, setVariant] = React.useState("Эта неделя");

  const durationDict = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 0: 0 }; // Days of the week

  function fillWeekObject(store) {
    store.forEach(el => durationDict[new Date(el.date).getDay()] = el.duration);
  }

  if (variant === "Эта неделя") {
    currentStore = statStore.filter(el => new Date(el.date) > getLastWeekEnd(new Date()));
    fillWeekObject(currentStore);
  } else if (variant === "Прошедшая неделя") {
    currentStore = statStore.filter(el => new Date(el.date) >= getLastWeekStart(new Date()) && new Date(el.date) <= getLastWeekEnd(new Date()));
    fillWeekObject(currentStore);
  } else {
    currentStore = statStore.filter(el => new Date(el.date) >= getOldestStart(new Date()) && new Date(el.date) <= getOldestEnd(new Date()));
    fillWeekObject(currentStore);
  }
  const durationArray = [...Object.values(durationDict).slice(1, 7), ...Object.values(durationDict).slice(0, 1)];

  const currentDay = currentStore.filter(d => days[new Date(d.date).getDay()] === day)[0];
  const pauses = currentDay?.pause;
  const stopCount = currentDay?.stops;
  const focusPercent = Math.floor(currentDay?.tomatoDuration / currentDay?.duration * 100);

  return (
    <div className="activity container">
      <div className="activity__header">
        <h2>Ваша активность</h2>
        <Select variant={variant} setVariant={setVariant} theme={theme} />
      </div>
      <div className="activity__block">
        <DayTime day={day} store={currentStore} />
        <TomatoCount day={day} store={currentStore} />
        <Graph setDay={setDay} data={durationArray} />
        <Stat title="Фокус" value={focusPercent} theme={theme} />
        <Stat title="Время на паузе" value={pauses} theme={theme} />
        <Stat title="Остановки" value={stopCount} theme={theme} />
      </div>
    </div>
  )
}