import { useDispatch, useSelector } from "react-redux";
import { addLongRestCount, addTomatoNumber, minusOneMinute, minusOneSecond, plusFiveMinutes, resetLongRestCount, setMinutes, setNotRestTime, setRestTime, setSeconds } from "../store/timer";
import { addDuration, addPause, addTomatoDuration, resetAll, resetStops, resetTomatoDuration } from "../store/tomato";
import { addToHistory, addTomatoToHistory, lessTomatoes, minusOneDuration, plusFiveDuration, removeFinished } from "../store/store";
import React from "react";

export function showNotification() {
  const audioNotification = new Audio();
  audioNotification.src = "/notification.mp3";
  audioNotification.play();
}

export function useHandlePlus() {
  const dispatch = useDispatch();
  const tomatoes = useSelector(state => state.main.tomatoes);
  dispatch(plusFiveMinutes());
  dispatch(plusFiveDuration(tomatoes[0].id));
}

export function useTimer() {
  const dispatch = useDispatch();
  const { tomatoes, options } = useSelector(state => state.main);
  const { duration, tomatoDuration, pause, stops, tomatoCount } = useSelector(state => state.tomato);
  const { minutes, seconds, isTimerActive, isRestTime, isOnPause, longRestCounter } = useSelector(state => state.timer);

  const result = {
    date: new Date().toDateString(),
    duration,
    tomatoDuration,
    pause,
    stops,
    tomatoCount,
  };

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

  React.useEffect(() => {
    let timeout;
    if (isTimerActive) {
      if (minutes === 0 && seconds === 0) {
        showNotification();

        console.log(isRestTime)
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

          dispatch(addToHistory({ date: new Date().toDateString(), object: result }))
          dispatch(resetAll());

        } else {
          dispatch(resetStops());
          dispatch(addTomatoNumber());
          dispatch(setNotRestTime());
          setWorkTime();
        }

      } else {
        if (seconds <= 0) {
          dispatch(setSeconds(59));
          dispatch(minusOneMinute());
          dispatch(minusOneDuration(tomatoes[0].id))
        }
        if (!isRestTime) {
          timeout = window.setTimeout(() => {
            dispatch(minusOneSecond());
            dispatch(addDuration());
            if (stops === 0) {
              dispatch(addTomatoDuration());
            }
          }, 1000);
        } else {
          timeout = window.setTimeout(() => {
            dispatch(minusOneSecond());
          }, 1000);
        }
      }
    }
    if (isOnPause) {
      timeout = window.setTimeout(() => {
        dispatch(addPause());
      }, 1000);
    }

    return () => {
      window.clearTimeout(timeout);
    }
  }, [minutes, seconds, isTimerActive, stops, isOnPause, isRestTime, pause]);
}