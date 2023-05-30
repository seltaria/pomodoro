import { useDispatch, useSelector } from "react-redux";
import { startButtonText } from "../../utils/stylesTexts";
import { pause, resume, setStarted, setTimerActive, setTimerNotActive } from "../../store/timer";
import { addStops } from "../../store/tomato";

export function StartTimerButton() {

  const dispatch = useDispatch();
  const { isTimerActive, isAlreadyStarted, isRestTime } = useSelector(state => state.timer);

  function handleStart() {
    if (!isAlreadyStarted) {
      dispatch(setStarted());
    }
    if (isTimerActive) {
      dispatch(setTimerNotActive());
      if (!isRestTime) {
        dispatch(addStops());
        dispatch(pause());
      }
    } else {
      dispatch(setTimerActive());
      dispatch(resume());
    }
  }

  return (
    <button onClick={handleStart}>{startButtonText(isAlreadyStarted, isTimerActive)}</button>
  )
}