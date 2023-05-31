import ReactDOM from 'react-dom';

import { PlusListIcon } from "../icons/PlusListIcon.jsx"
import { MinusListIcon } from "../icons/MinusListIcon.jsx"
import { PenListIcon } from "../icons/PenListIcon.jsx"
import { DeleteListIcon } from "../icons/DeleteListIcon.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, lessTomatoes, moreTomatoes } from '../store/store.js';

export function DropdownMenu(props) {

  const tomatoData = useSelector((state) => state.main.tomatoes).filter(tomato => tomato.id === props.id)[0];
  const tomatoDuration = useSelector(state => state.main.options.duration);
  const dispatch = useDispatch();

  const node = document.querySelector("#dropdown-root");
  if (!node) return null;

  function handleDelete() {
    props.deleteTaskAnimation();
    setTimeout(() => {
      dispatch(deleteTask(props.id));
    }, 300);
  }

  function increaseTomatoes() {
    dispatch(moreTomatoes({ id: props.id, duration: tomatoDuration }));
  }

  function decreaseTomatoes() {
    dispatch(lessTomatoes(props.id))
  }

  function editTaskName() {
    props.setIsEditing(true);
  }

  const isLastTomato = tomatoData.count === 1 ? true : false;

  return ReactDOM.createPortal((
    <ul className="dropdown-menu"
      style={{
        top: (props.menuButtonRef.current?.getBoundingClientRect().y || 0) + window.scrollY + 30,
        left: (props.menuButtonRef.current?.getBoundingClientRect().right || 0) - 90,
      }}
    >
      <li><button onClick={increaseTomatoes}><PlusListIcon /> Увеличить</button></li>
      <li><button onClick={decreaseTomatoes}><MinusListIcon isLastTomato={isLastTomato} /> Уменьшить</button></li>
      <li><button onClick={editTaskName}><PenListIcon /> Редактировать</button></li>
      <li><button onClick={handleDelete}><DeleteListIcon /> Удалить</button></li>
    </ul>
  ), node);
}