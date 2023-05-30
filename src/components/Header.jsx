import { Link } from "react-router-dom";
import { StatisticsIcon } from "../icons/StatisticsIcon";
import { TomatoIcon } from "../icons/TomatoIcon";
import { ThemeButton } from "./ThemeButton";

export function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo"><TomatoIcon />pomodoro_box</Link>
        <ThemeButton />
        <Link to="/stats" className="header__stat"><StatisticsIcon />Статистика</Link>
      </div>
    </header>
  )
}