import { useEffect, useRef, useState } from 'react'
import './css/todo.css'
import Todoitem from './SampleComponent-TodoItem';

let count = 0;

const todo = () => {

    const [todo,setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        setTodos([...todo, {no:count++, text:inputRef.current.value, display:""}])
        inputRef.current.value = "";
        localStorage.setItem("todo_count", count)
    }

    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todo")));
        count = localStorage.getItem("todo_count")
    }, [])

    useEffect(() => {
        setTimeout(() => {
            console.log(todo);
            localStorage.setItem("todo", JSON.stringify(todo));
        },100)
    }, [todo])

  return (
    <div className='todo'>
      <div className="todo-header">To-do List</div>
      <div className="todo-add">
        <input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input' />
        <div onClick={() => {add()}} className="todo-add-btn">ADD</div>
      </div>
      <div className="todo-list">
        {todo.map((item, index)=> {
            return <Todoitem key={index} no={item.no} setTodos={setTodos} display={item.display} text={item.text}/>
        })}
      </div>
    </div>
  )
}

export default todo
