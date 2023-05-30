import { days } from "../../utils/dates";
import { countText } from "../../utils/stylesTexts";

export function DayTime(props) {

  const durationSec = props.store?.filter(day => days[new Date(day.date).getDay()] === props.day)[0]?.duration;
  const duration = durationSec >= 60 ? `${Math.floor(durationSec / 60)} ${countText(Math.floor(durationSec / 60), "минут", "минуты", "минут")}` : `${durationSec} ${countText(durationSec, "секунд", "секунды", "секунд")}`;

  return (
    <div className="daytime">
      <div className="daytime__day">{props.day}</div>
      {durationSec ?
        <div className="daytime__text">Вы работали над задачами в течение <span>{duration}</span></div> :
        <div>Нет данных</div>
      }
    </div>
  )
}