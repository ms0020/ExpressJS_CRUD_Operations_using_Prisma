import prisma from "../DB/db.config.js";

export const createLike = async (req, res) => {
    const { user_id, post_id, like } = req.body;

    if (like === true) {
        // Increase the like count for the post
        await prisma.post.update({
            where: {
                id: Number(post_id)
            },
            data: {
                like_count: {
                    increment: 1   // Increase the like counter
                }
            }
        });
    }

    let like_count
    if (like) {
        like_count = 1
    } else {
        like_count = 0
    }
    // Create a new like
    const newLike = await prisma.like.create({
        data: {
            user_id: Number(user_id),
            post_id: Number(post_id),
            like: like_count
        }
    });
    return res.json({ status: 200, data: newLike, message: "Like done." });
};

// Fetch all Likes
export const fetchLike = async (req, res) => {
    const like = await prisma.like.findMany({
        include: {
            user: true,
            post: {
                include: {
                    user: true
                }
            }
        }
    });

    return res.json({ status: 200, data: like, "Here we get": "All Comments." })
};

// Fetch likes by Post ID
export const fetchLikeById = async (req, res) => {
    const post_id = req.body.post_id;
    const likes = await prisma.like.findMany({
        where: {
            post_id: Number(post_id)
        },

    });
    return res.json({ status: 200, data: likes, "Here we get": "The likes." })

};



// Delete Like
export const deleteLike = async (req, res) => {
    const { post_id, user_id } = req.body;

    await prisma.post.update({
        where: {
            id: Number(post_id)
        },
        data: {
            like_count: {
                decrement: 1
            },
        },
    });

    await prisma.like.deleteMany({
        where: {
            post_id: Number(post_id),
            user_id: Number(user_id)
        }
    });
    return res.json({ status: 200, message: "Like deleted successfully." })
};