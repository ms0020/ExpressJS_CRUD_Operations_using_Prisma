import jwt from 'jsonwebtoken';

function jwtTokens({ user_id, user_name, user_email }) {
    const user = { user_id, user_name, user_email };
    console.log(process.env.ACCESS_TOKEN_SECRET)
    const accessToken = jwt.sign(user, 'ver55nyt56gfeb4tn84', { expiresIn: '9m' });
    const refreshToken = jwt.sign(user, '61f84g4r3g65g16egr', { expiresIn: '9m' });
    console.log("access token = ", accessToken)
    console.log("refresh token = ", refreshToken)
    return ({ accessToken, refreshToken });


}

export { jwtTokens };