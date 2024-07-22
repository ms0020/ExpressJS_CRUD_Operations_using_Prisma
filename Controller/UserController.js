import prisma from "../DB/db.config.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtTokens } from '../utils/jwt-helpers.js';
// import { authenticateToken } from '../middleware/authorization.js';




export const createUser = async (req, res) => {
    const { name, email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (findUser) {
        return res.json({ status: 400, message: "Email already exist. Please use another one." })
    }

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    });
    return res.json({ status: 200, data: newUser, msg: "User created." })
};



// Fetch all users
export const fetchUsers = async (req, res) => {
    const users = await prisma.user.findMany({

        include: {
            post: {
                select: {
                    title: true,
                    comment_count: true,
                    like_count: true
                },
            },
        },
    });

    // select: {
    //     _count: {
    //         select: {
    //             post: true,
    //             comment: true,
    //         }
    //     }
    // },

    return res.json({ status: 200, data: users, "Here we get": "All Users." })
};

// Fetch by ID
export const fetchById = async (req, res) => {
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id: Number(userId)
        },
    });
    return res.json({ status: 200, data: user, "Here we get": "The User." })

};




// Update the User
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: {
            name,
            email,
            password
        }
    });

    return res.json({ status: 200, message: "User updated successfully." })
};

// Delete User
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    await prisma.user.deleteMany({
        where: {
            id: Number(userId)
        }
    });
    return res.json({ status: 200, message: "User deleted successfully." })
};