import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";

export function Layout() {

  const theme = useSelector(state => state.main.theme);
  document.body.className = theme;

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}