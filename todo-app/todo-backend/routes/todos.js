const express = require('express');
const { Todo } = require('../mongo')
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
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  
  try{

    console.log("The params id is :" ,req.params.id)
  
     req.todo=await Todo.findById(req.params.id)
  
     if(!req.todo) return res.sendStatus(404)
  }
  catch(e){
    console.error(e.message)
    next(e)

  }


}


/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(res.todo).status(200)

});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
