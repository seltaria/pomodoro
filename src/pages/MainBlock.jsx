import { useSelector } from "react-redux";
import { Instructions } from "../components/Instructions";
import { Tasks } from "../components/Tasks";
import { Tomato } from "../components/Tomato/Tomato";

export function MainBlock() {

  const tomatoData = useSelector((state) => state.main.tomatoes);

  return (
    <div className='main-block container'>
      <div>
        <Instructions />
        <Tasks />
      </div>
      {tomatoData?.length > 0 && <Tomato />}
    </div>
  )
}