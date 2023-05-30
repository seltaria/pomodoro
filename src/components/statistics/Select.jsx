import React from "react";
import { ArrowDownIcon } from "../../icons/ArrowDownIcon";

export function Select({ variant, setVariant, theme }) {

  const [isSelectOpened, setIsSelectOpened] = React.useState(false);

  function handleClick() {
    setIsSelectOpened(prev => !prev);
  }

  function chooseVariant(event) {
    setVariant(event.target.textContent);
    setIsSelectOpened(false);
  }

  return (
    <div className="select">
      <button onClick={handleClick} className={isSelectOpened ? "open" : null}>{variant} <ArrowDownIcon theme={theme} /></button>
      {isSelectOpened && <div className="select__options">
        {variant !== "Эта неделя" && <button onClick={chooseVariant}>Эта неделя</button>}
        {variant !== "Прошедшая неделя" && <button onClick={chooseVariant}>Прошедшая неделя</button>}
        {variant !== "Две недели назад" && <button onClick={chooseVariant}>Две недели назад</button>}
      </div>}
    </div>
  )
}