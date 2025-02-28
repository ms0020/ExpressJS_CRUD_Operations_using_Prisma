import prisma from "../DB/db.config.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtTokens } from '../utils/jwt-helpers.js';


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!findEmail) {
            return res.status(400).json({ message: "Email is incorrect." });
        }

        // Password Check
        const validPassword = await bcrypt.compare(password, findEmail.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // JWT 
        let tokens = jwtTokens(findEmail);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.json(tokens);

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};




export const refToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken === null) return res.status(401), json({ error: 'Null refresh token.' });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            let token = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            res.json(tokens);
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};





export const deleteToken = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ message: 'refresh token deleted.' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};