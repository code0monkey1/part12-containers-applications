const express = require('express');
const router = express.Router();
const redis = require('../redis')
const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});



router.get('/statistics',async(req,res,next)=>{

   const stats = await getAsync('stats')

   if(stats){
    res.json(stats)
   }
   else{
    res.send("no new todos")
   }
   next()
})

module.exports = router;
