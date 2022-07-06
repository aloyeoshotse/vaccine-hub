const express = require('express');
const router = express.Router()

router.post('/login', async(req,res, next) => {
    try{
        //take email and passwords and attempt to authenticate

    }
    catch(err) {
        next(err)
    }
})

router.post('/register', async(req,res, next) => {
    try{
        /*take user email, password, rsvp status, and number of guests 
            and creat a new user in database */
    }
    catch(err) {
        next(err)
    }
})

module.exports = router;