import jwt from 'jsonwebtoken';
const generateAccessToken = async(userId) => {
    const token = await jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, {
        expiresIn: '5h' // Token will expire in 5 hours
    });

    return token;

}

export default generateAccessToken;