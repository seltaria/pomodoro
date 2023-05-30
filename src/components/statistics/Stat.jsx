import { TargetIcon } from "../../icons/TargetIcon.jsx";
import { ClockIcon } from "../../icons/ClockIcon.jsx";
import { StopIcon } from "../../icons/StopIcon.jsx";
import { useSpring, animated } from "@react-spring/web";

export function Stat(props) {

  let icon;
  let statClass;
  let bgColor;
  let value;
  let textValue;

  switch (props.title) {
    case "Фокус":
      icon = <TargetIcon isActive={!isNaN(props.value)} />;
      statClass = "stat target";
      if (props.theme === "light") {
        bgColor = isNaN(props.value) ? "#F4F4F4" : "#FFDDA9"
      }
      if (props.theme === "dark") {
        bgColor = isNaN(props.value) ? "#928484" : "rgb(158 135 101)"
      }
      value = props.value;
      textValue = "%";
      break;
    case "Время на паузе":
      icon = <ClockIcon isActive={props.value} />;
      statClass = "stat pause";
      if (props.theme === "light") {
        bgColor = props.value ? "#DFDCFE" : "#F4F4F4";
      }
      if (props.theme === "dark") {
        bgColor = props.value ? "rgb(128 124 167)" : "#928484";
      }
      if (props.value >= 60) {
        value = Math.floor(props.value / 60);
        textValue = "мин";
      } else {
        value = props.value;
        textValue = "c";
      }
      break;
    case "Остановки":
      icon = <StopIcon isActive={props.value} />;
      statClass = "stat stops";
      if (props.theme === "light") {
        bgColor = props.value ? "#C5F1FF" : "#F4F4F4";
      }
      if (props.theme === "dark") {
        bgColor = props.value ? "rgb(106 136 146)" : "#928484";
      }
      value = props.value;
      textValue = "";
      break;
    default:
      break;
  }

  function AnimatedNumber({ n }) {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 150,
      config: { mass: 1, tension: 30, friction: 10 },
    })
    return <animated.div style={{ display: "inline-block" }}>{number.to((n) => n.toFixed(0))}</animated.div>
  }

  return (
    <div className={statClass} style={{ backgroundColor: `${bgColor}` }}>
      <div>
        <h3>{props.title}</h3>
        <div className="stat__pers">{isNaN(props.value) ? "" : <AnimatedNumber n={value} />}{isNaN(props.value) ? "" : textValue}</div>
      </div>
      {icon}
    </div>
  )
}