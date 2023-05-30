import { useSelector } from "react-redux";
import { Task } from "./Task";

export function Tasks() {

  const tomatoData = useSelector((state) => state.main.tomatoes);

  const taskElements = tomatoData?.map(task =>
    <Task
      key={task.id}
      id={task.id}
      name={task.name}
      count={task.count}
    />)
  const time = tomatoData?.reduce((acc, task) => acc + task.duration.active + task.duration.others, 0);

  return (
    <>
      <ul className="tasks">
        {taskElements}
      </ul>
      {time !== 0 && <div className="task__time">{time} мин</div>}
    </>

  )
}