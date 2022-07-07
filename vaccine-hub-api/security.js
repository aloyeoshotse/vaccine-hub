const bcrypt = require('bcrypt');

const pw = 'goku12345'

bcrypt.hash(pw, 6, (err, hashPW) => {
    console.log(`Password is ${pw}`);
    console.log(`Hashed Password is ${hashPW}`)
})

