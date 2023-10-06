import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  
  const [todos,setTodos] = useState([])
  const [todo,setTodo] = useState('')
  
  const api = process.env.REACT_APP_BACKEND_API
   useEffect(()=>{
      
    const loadTodos=async()=>{

        console.log("BACKEND_API",api)
        const {data} = await axios.get(api+'/todo')
       console.log("The result is",data)
        setTodos(data)
    }

    loadTodos()

   },[])
   console.log('todos',JSON.stringify(todos,null,2))

   const submitTodo=async(event)=>{
      event.preventDefault();
      
      console.log("todo is ",todo)

      const {data} = await axios.post(api+'/todo',{content:todo})
      console.log("The data retrieved is ",data)
      setTodos( prev =>  prev.concat(data) )

   }
  return (
    <div className="App">
      <form>
        <input  type='text' value={todo}  onChange={(e)=>setTodo(e.target.value)}/>
      
         <button type='submit' onClick={submitTodo} >
          Submit
          </button>
      </form>
      <ul>
       {todos.map( t => <li key={t.id}>{t.content}</li>)}
      </ul>
    </div>
  );
}

export default App;
