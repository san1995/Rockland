import './css/todoitem.css'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import cross from '../assets/cross.png'

const todoitem = ({no, display, text, setTodos}) => {

    const deleteitem = (no) => {
        let data = JSON.parse(localStorage.getItem("todo"));
        data = data.filter((todo) => todo.no !== no);
        setTodos(data);
    }

    const toggle = (no) => {
        let data = JSON.parse(localStorage.getItem("todo"));
        for(let i = 0; i < data.length; i++)
        {
            if (data[i].no === no)
            {
                if (data[i].display ==="")
                {
                    data[i].display = "line-through";
                }
                else 
                {
                    data[i].display = "";
                }
                break;
            }
        }
        setTodos(data);
    } 

  return (
    <div className='todoitem'>
      <div className={`todoitem-container ${display}`} onClick={() => {toggle(no)}}>
        {display===""? <img src={not_tick}></img> : <img src={tick}></img>}
        <div className="todoitem-text">{text}</div>
      </div>
      <img className='todoitem-cross-icon' onClick={() => deleteitem(no)} src={cross} alt="" />
    </div>
  )
}

export default todoitem
