import jwt from 'jsonwebtoken';
const auth = (request,response,next) => {
    try {
        const token = request.cookies.accessToken || request.headers.authorization?.split(" ")[1] // Bearer token
        // console.log("Token:", token);
        if(!token){
            return response.status(401).json({
                message: "Unauthorized: No token provided",
            });
        }
        // next(); // Proceed to the next middleware or route handler
        
        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
        if (!decode) {
            return response.status(401).json({
                message: "Unauthorized: Invalid token",
            });
        }
        request.userId = decode.id; // Attach user ID to request object
        next(); // Proceed to the next middleware or route handler
         console.log('decoded :',decode);
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

export default auth;