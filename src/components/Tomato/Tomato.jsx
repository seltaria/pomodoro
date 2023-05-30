import React from "react"
import { animated, useSpring } from "@react-spring/web";
import { PlusIcon } from "../../icons/PlusIcon.jsx"
import { useDispatch, useSelector } from "react-redux";
import { plusFiveDuration } from "../../store/store.js";
import { headerStyle } from "../../utils/stylesTexts.js";
import { useTimer } from "../../utils/tomatoFunctions.js";
import { StartTimerButton } from "./StartTimerButton.jsx";
import { FinishTimerButton } from "./FinishTimerButton.jsx";
import { neverStarted, plusFiveMinutes, resume, setMinutes, setNotRestTime, setSeconds, setTimerNotActive } from "../../store/timer.js";

export function Tomato() {

  const dispatch = useDispatch();
  const { tomatoes, theme } = useSelector(state => state.main);
  const { minutes, seconds, isAlreadyStarted, isRestTime, tomatoNumber } = useSelector(state => state.timer);

  function handlePlus() {
    dispatch(plusFiveMinutes());
    dispatch(plusFiveDuration(tomatoes[0].id));
  }

  useTimer();

  React.useEffect(() => {
    dispatch(setMinutes(tomatoes[0].duration.active));
    dispatch(setSeconds(0));
    dispatch(neverStarted());
    dispatch(setNotRestTime());
    dispatch(resume());
    dispatch(setTimerNotActive());
  }, []);

  const springs = useSpring({
    from: { y: -50, opacity: 0 },
    to: { y: 0, opacity: 1 },
  })

  return (
    <animated.div className="tomato" style={{ ...springs }}>
      <div className="tomato__header" style={headerStyle(isAlreadyStarted, isRestTime, theme)}>
        <h2>{tomatoes[0]?.name}</h2>
        {!isRestTime && <div>Помидор {tomatoNumber}</div>}
        {isRestTime && <div>Перерыв {tomatoNumber}</div>}
      </div>
      <div className="tomato__main">
        <div className="tomato__time-block">
          <animated.div className="tomato__timer" style={{ ...springs }}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</animated.div>
          <button className="tomato__plus" onClick={handlePlus}><PlusIcon /></button>
        </div>
        <div className="tomato__task"><span>Задача 1</span>{tomatoes[0]?.name}</div>
        <div className="tomato__buttons">
          <StartTimerButton />
          <FinishTimerButton />
        </div>
      </div>
    </animated.div>
  )
}