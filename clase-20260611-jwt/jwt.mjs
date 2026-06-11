import jwt from 'jsonwebtoken'

//sign  -- firmar
//verify --- verificar la firma

jwt.sign({usuario:'erika'}, 'largaysecreta', {algorithm:'RS256'}, (error, token) => {
    console.log(token)
}) 

