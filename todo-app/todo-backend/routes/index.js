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



router.get('/statistics',async(req,res)=>{

   const stats = await redis.getAsync('stats')
   console.log("The stats are",stats)
   if(stats){
    res.json(JSON.parse(stats))
   }
   else{
    res.send("no new todos")
   }

})



module.exports = router;
