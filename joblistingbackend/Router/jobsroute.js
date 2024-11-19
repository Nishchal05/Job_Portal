const express=require('express');
const auth = require('../Middleware/jwttoken');
const jobcontroler =require('../controller/jobscontroler');
const router=express.Router();
router.post('/create-job',auth,jobcontroler.jobController)
router.get('/search-jobs', jobcontroler.SearchJob);
router.post('/jobapplication', jobcontroler.jobapplication);
router.put('/updataJob/:id', jobcontroler.updateJob)
router.delete('/DeleteJob/:id', jobcontroler.Jobdelete)
router.get('/FilterJob',auth, jobcontroler.jobfilter)
module.exports=router;