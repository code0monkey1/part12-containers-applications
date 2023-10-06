const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors())

const PORT = 3001

app.listen(PORT,()=>{
   console.log("Listening to port",PORT)
})

let id=2

const todos=[
   {
    id:1,
    content:"first content"
   },
    {
    id:2,
    content:"second content"
   }
]

app.get('/todo',(req,res)=>{
  res.json(todos)
})


app.post('/todo',(req,res)=>{

  console.log("The request body is ",req.body)

  const todo={id:++id,content:req.body.content}
   
   todos.push(todo)
    
   res.json(todo)
})