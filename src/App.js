import React, { useState } from 'react'
import { PiPencilLight } from "react-icons/pi";
import { TiPencil } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import './App.css'

const getListItems = () => {
  let list = localStorage.getItems("todos")
  console.log(list)
  if (list) {
    return JSON.parse(list)
  }
  else {
    return []
  }
}

const App = () => {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  const [add, setAdd] = useState(true)
  const [currentId, setCurrentId] = useState()

  console.log(todos)

  const onClickAddTodo =  () => {
    let value = 1
    let  statement=""
    const inputs = input.split(" ")
    for (let i = 0; i < inputs.length; i++) {
      if (!isNaN(parseInt(inputs[i]))) {
        value = parseInt(inputs[i])
      }
      else{
        statement=statement+inputs[i]+" "
      }
    }
    console.log(value)
    for (let j = 0; j < value; j++) {
      if (input.length > 0) {
        const id1 = Math.floor(Math.random() * 100)
        const id2 = Math.floor(Math.random() * 100)

        setTodos((prevTodos) => [
          ...prevTodos,
          {
            id: input+id1+id2,
            "name": statement,
            updated: 0,
          },
        ]);
      
        // setTodos([...todos, { "name": input, updated: 0, id: input + id1 + id2 }])

        setInput("")
      }
    }

  }

  const onClickUpdate = (i, name) => {
    setInput(name)
    setAdd(false)
    setCurrentId(i)
  }
  const onClickUpdateTodo = () => {

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === currentId ? { ...todo, "name": input, updated: todo.updated + 1 } : todo)
    )


    setAdd(true)
    setInput("")
  }

  const onClickDelete = (id) => {
    const sorted = todos.filter(each => each.id !== id)
    setTodos(sorted)
  }

  return (
    <div className='container'>
      <div className='todo-container'>
        <h1>Day Goals!</h1>
        <input type="text" className='input' placeholder='Enter todo here' value={input} onChange={(e) => setInput(e.target.value)} />
        {add ? <button className='button' onClick={onClickAddTodo}>Add Todo</button> : <button className='button' onClick={onClickUpdateTodo}>Update Todo</button>}
        <ul>
          {todos?.map((each, index) => (
            <li className='listitems' key={index}>
              <p className='item'>{`${each.name} (updated ${each.updated} times)`}</p>
              <div className='icons'>
                <TiPencil className='pencil' onClick={() => onClickUpdate(each.id, each.name)} />
                <ImCross className='cross' onClick={() => onClickDelete(each.id)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App