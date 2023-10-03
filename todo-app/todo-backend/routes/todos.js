const express = require('express');
const { Todo } = require('../mongo');
const { update } = require('../mongo/models/Todo');
const { setAsync, getAsync } = require('../redis');
const router = express.Router();



/* GET todos listing. */
router.get('/', async (_, res,next) => {
  try{
   console.log("Get todos")
    const todos = await Todo.find({})
    console.log("The todos are ",JSON.stringify(todos,null,2))
    res.json(todos);
  }catch(e){
    next(e)
  }
});

/* POST todo to listing. */
/* POST todo to listing. */
router.post('/', async (req, res,next) => {

  try{
   console.log("Post todos")

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  //redis
   const stats= await JSON.parse( getAsync('stats'))

   console.log("stats are ",JSON.stringify(stats,null,2))

      if(stats){
          await  setAsync('stats',JSON.stringify({
              "added_todos": stats.added_todos+1
               }))
      }
      else{
      await setAsync('stats',JSON.stringify({
            "added_todos": 0
           }))

  }

  res.send(todo);
}catch(e){
  console.error(e.message)
  next(e)
}
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  
  try{

     console.log("The params id is :" ,req.params.id)
  
     const todo=await Todo.findById(req.params.id)

     console.log('Found todo',JSON.stringify(todo,null,2))
      
     req.todo=todo;
     
  }
  catch(e){
    console.error(e)
    next(e)
  }


  next()
}


/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */       
singleRouter.get('/', async (req, res) => {

     if(!req.todo){
      return req.send("No todo found with given id")
     }
       res.json(req.todo)

});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
   
     if(!req.todo){
      return req.send("No todo found with given id")
     }

   
try {
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, req.body, { new: true });
  
  console.log("Updated Todo",JSON.stringify(updatedTodo,null,2));

  res.json(updatedTodo).status(200)

} catch (err) {
  console.error(err);
}
   
})

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
