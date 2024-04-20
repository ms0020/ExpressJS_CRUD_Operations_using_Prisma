import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
    const { user_id, post_id, comment } = req.body;

    // Increase the comment counter
    await prisma.post.update({
        where: {
            id: Number(post_id)
        },
        data: {
            comment_count: {
                increment: 1
            }
        }
    })

    const newComment = await prisma.comment.create({
        data: {
            user_id: Number(user_id),
            post_id: Number(post_id),
            comment,
        }
    });
    return res.json({ status: 200, data: newComment, comment: "Comment created." })
};

// Fetch all Comments
export const fetchComments = async (req, res) => {
    const comments = await prisma.comment.findMany({
        include: {
            user: true,
            post: {
                include: {
                    user: true
                }
            }
        }
    });

    return res.json({ status: 200, data: comments, "Here we get": "All Comments." })
};

// Fetch Comment by ID
export const fetchBycomment = async (req, res) => {
    const commentId = req.body;
    const comment = await prisma.comment.findFirst({
        // where: {
        //     id: Number(commentId)
        // },
    });
    return res.json({ status: 200, data: comment, "Here we get": "The Comment." })

};


// Update the Comment
export const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const { user_id, post_id, comment } = req.body;

    await prisma.comment.update({
        where: {
            id: Number(commentId)
        },
        data: {
            user_id,
            post_id,
            comment,
        }
    });

    return res.json({ status: 200, message: "Comment updated successfully." })
};

// Delete Post
export const deleteComment = async (req, res) => {
    const commentId = req.params.id;

    // Increase the comment counter
    await prisma.post.update({
        where: {
            id: Number(commentId)
        },
        data: {
            comment_count: {
                decrement: 1
            },
        },
    });

    await prisma.comment.deleteMany({
        where: {
            id: Number(commentId)
        }
    });
    return res.json({ status: 200, message: "Comment deleted successfully." })
};