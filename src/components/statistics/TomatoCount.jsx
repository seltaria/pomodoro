import { TomatoIcon } from "../../icons/TomatoIcon.jsx"
import { TomatoBigIcon } from "../../icons/TomatoBigIcon.jsx"
import { days } from "../../utils/dates.js";
import { countText } from "../../utils/stylesTexts.js";

export function TomatoCount(props) {

  const count = props.store?.filter(day => days[new Date(day.date).getDay()] === props.day)[0]?.tomatoCount;

  return (
    <div className="tomato-count">

      {count ? <>
        <div className="tomato-count__count"><TomatoIcon /> x {count}</div>
        <div className="tomato-count__footer">{count} {countText(count, "помидоров", "помидор", "помидора")}</div>
      </> : <div className="tomato-count__count"><TomatoBigIcon /></div>}
    </div>
  )
}