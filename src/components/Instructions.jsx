import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeDuration, changeLongRestDuration, changeLongRestFrequency, changeShortRestDuration, createTask } from "../store/store";
import { countText } from "../utils/stylesTexts";
import { resetTomatoNumber } from "../store/timer";

export function Instructions() {

  const dispatch = useDispatch();
  const { options, tomatoes } = useSelector(state => state.main);
  const [value, setValue] = React.useState("");

  const addRef = React.useRef(null);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleClick() {
    if (value !== "") {
      dispatch(createTask({
        id: Date.now(),
        name: value,
        count: 1,
        duration: { active: options.duration, others: 0 },
      }))
      setValue("");
    }
  }

  React.useEffect(() => {
    window.addEventListener("keypress", (event) => {
      if (event.key === "Enter")
        addRef.current.click();
    })
  }, []);

  React.useEffect(() => {
    if (tomatoes.length === 0) {
      dispatch(resetTomatoNumber());
    }
  }, [dispatch, tomatoes])

  function switchRestMinutes() {
    dispatch(changeShortRestDuration());
  }

  function switchLongRestMinutes() {
    dispatch(changeLongRestDuration());
  }

  function switchLongRestFrequency() {
    dispatch(changeLongRestFrequency());
  }

  function switchTaskDuration() {
    dispatch(changeDuration());
  }

  return (
    <div className="instructions">
      <h2>Ура! Теперь можно начать работать:</h2>
      <ul>
        <li>Напишите название текущей задачи</li>
        <li>Запустите таймер («помидор») на
          <button className="instructions__button" onClick={switchTaskDuration}>{options.duration} минут</button>
        </li>
        <li>Работайте пока «помидор» не прозвонит</li>
        <li>Сделайте короткий перерыв
          <button className="instructions__button" onClick={switchRestMinutes}>({options.shortRestDuration} {countText(options.shortRestDuration, "минут", "минуту", "минуты")})</button>
        </li>
        <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые
          <button className="instructions__button" onClick={switchLongRestFrequency}>{options.longRestFrequency} «{countText(options.longRestFrequency, "помидоров", "помидор", "помидора")}»</button>
          делайте длинный перерыв
          <button className="instructions__button" onClick={switchLongRestMinutes}>({options.longRestDuration} минут)</button>.</li>
      </ul>
      <input placeholder="Название задачи" onChange={handleChange} value={value} />
      <button className="instructions__main-button" onClick={handleClick} ref={addRef}>Добавить</button>
    </div>
  )
}