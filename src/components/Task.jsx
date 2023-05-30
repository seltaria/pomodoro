import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { DotsIcon } from "../icons/DotsIcon";
import { DropdownMenu } from './DropdownMenu';
import { PenListIcon } from '../icons/PenListIcon';
import { useDispatch } from 'react-redux';
import { rename } from '../store/store';

export function Task(props) {

  const menuButtonRef = React.useRef(null);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(props.name);

  React.useEffect(() => {
    window.addEventListener('click', (event) => {
      if (!event.target.closest(".task__button-menu") && !event.target.closest(".dropdown-menu")) {
        setIsMenuOpen(false);
      }
    })
  }, []);

  function handleChange(event) {
    setEditValue(event.target.value);
  }

  function handleClick() {
    setIsEditing(false);
    dispatch(rename({ id: props.id, newName: editValue }));
  }

  const [springs, api] = useSpring(() => ({
    from: { x: -30, opacity: 0.2 },
    to: { x: 0, opacity: 1 },
  }))

  const deleteTaskAnimation = () => {
    api.start({
      from: { x: 0, opacity: 1 },
      to: { x: -30, opacity: 0.5 },
    })
  }

  return (
    <>
      <animated.div className="task" style={{ ...springs }}>
        <div className="task__number">{props.count}</div>
        {!isEditing && <div>{editValue}</div>}
        {isEditing && <input value={editValue} onChange={handleChange} />}
        {isEditing && <button onClick={handleClick}><PenListIcon /></button>}
        <button className="task__button-menu" ref={menuButtonRef} onClick={() => setIsMenuOpen(prev => !prev)}>
          <DotsIcon />
        </button>
      </animated.div>
      {isMenuOpen &&
        <DropdownMenu
          menuButtonRef={menuButtonRef}
          id={props.id}
          setIsEditing={setIsEditing}
          deleteTaskAnimation={deleteTaskAnimation}
        />}
    </>
  )
}