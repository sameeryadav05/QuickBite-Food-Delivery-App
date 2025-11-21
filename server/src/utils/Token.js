import jwt from 'jsonwebtoken'

export function generateToken(userId){
    try {
        const token = jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn:'7d',
            issuer:'QuickBite.dev',
            audience:userId.toString()
        })
        return token;
    } catch (error) {
        console.log(error.message)
    }
}


export function verifyToken(token){
    const decoded = jwt.verify(token,process.env.JWT_SECRET,{
        issuer:'QuickBite.dev'
    })
}


