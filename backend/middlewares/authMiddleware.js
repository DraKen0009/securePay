import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: "You are not authorized to perform this action"
        })
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({
                msg: "You are not authorized to perform this action",
                error: err
            })
        }

        req.userId = decodedToken.id;
        req.username = decodedToken.username;

        next()
    })


}

export default authMiddleware;