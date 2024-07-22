import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    if (req.url.includes('login')) {
        next()
    } else {

        console.log("Inside  Authenticate  Token")
        const authHeader = req.headers['authorization']; //Bearer Token
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.status(401).json({ error: "NULL token" });
        jwt.verify(token, 'ver55nyt56gfeb4tn84', (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            req.user = user;
            next();
        });
    };
};

export default authenticateToken;