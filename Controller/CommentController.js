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

// Fetch Comment by Comment
export const fetchBycomment = async (req, res) => {
    const commentId = req.body.user_comment;
    const findComment = await prisma.comment.findFirst({
        where: {
            comment: commentId
        },
    });
    console.log(commentId);
    return res.json({ status: 200, data: findComment, "Here we get": "The Comment." })

};


// Update the Comment
export const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const { user_id, post_id, comment } = req.body;

    await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            user_id,
            post_id,
            comment
        }
    });

    return res.json({ status: 200, message: "Comment updated successfully." })
};

// Delete Comment
export const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const post_id = req.body.post_id

    // Increase the comment counter
    await prisma.post.update({
        where: {
            id: Number(post_id)
        },
        data: {
            comment_count: {
                decrement: 1
            },
        },
    });

    await prisma.comment.delete({
        where: {
            id: String(commentId)
        }
    });
    return res.json({ status: 200, message: "Comment deleted successfully." })
};