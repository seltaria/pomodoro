import { useDispatch, useSelector } from "react-redux"
import { switchTheme } from "../store/store";

export function ThemeButton() {

  const theme = useSelector(state => state.main.theme);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(switchTheme());
    if (theme !== "dark") {
      document.body.className = "dark";
    } else {
      document.body.className = "light";
    }
  }

  return (
    <button className={`theme-button ${theme === "dark" ? "theme-button--dark" : null}`} onClick={handleClick}>
      <div className="theme-button__circle"></div>
    </button>
  )
}