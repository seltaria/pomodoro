import { useDispatch, useSelector } from "react-redux";
import { addToHistory, addTomatoToHistory, lessTomatoes, removeFinished } from "../../store/store";
import { finishButtonText } from "../../utils/stylesTexts";
import { addLongRestCount, addTomatoNumber, resetLongRestCount, resume, setMinutes, setNotRestTime, setRestTime, setSeconds, setTimerNotActive } from "../../store/timer";
import { resetAll, resetStops, resetTomatoDuration } from "../../store/tomato";

export function FinishTimerButton() {

  const dispatch = useDispatch();
  const { options, tomatoes } = useSelector(state => state.main);
  const { isAlreadyStarted, isRestTime, longRestCounter } = useSelector(state => state.timer);
  const { duration, tomatoDuration, pause, stops } = useSelector(state => state.tomato);

  function setWorkTime() {
    dispatch(setMinutes(options.duration));
    dispatch(setSeconds(0));
  }

  function setShortRestTime() {
    dispatch(setMinutes(options.shortRestDuration));
    dispatch(setSeconds(0));
  }

  function setLongRestTime() {
    dispatch(setMinutes(options.longRestDuration));
    dispatch(setSeconds(0));
  }

  function handleFinish() {
    dispatch(setTimerNotActive());
    dispatch(resume());
    if (!isRestTime) {
      dispatch(setRestTime());
      dispatch(addLongRestCount());
      if (longRestCounter === options.longRestFrequency) {
        setLongRestTime();
        dispatch(resetLongRestCount());
      } else {
        setShortRestTime();
      }
      if (stops === 0) {
        dispatch(addTomatoToHistory(new Date().toDateString()));
      } else {
        dispatch(resetTomatoDuration());
      }
      if (tomatoes[0].count === 1) {
        dispatch(removeFinished(tomatoes[0].id));
      } else {
        dispatch(lessTomatoes(tomatoes[0].id));
      }

    } else {
      dispatch(resetStops());
      dispatch(setNotRestTime());
      dispatch(addTomatoNumber());
      setWorkTime();
    }

    dispatch(addToHistory({
      date: new Date().toDateString(), object: {
        date: new Date().toDateString(),
        duration,
        tomatoDuration,
        pause,
        stops,
      }
    }))
    dispatch(resetAll());
  }

  return (
    <button
      onClick={handleFinish}
      disabled={isAlreadyStarted ? false : true}>
      {finishButtonText(isRestTime)}
    </button>
  )
}