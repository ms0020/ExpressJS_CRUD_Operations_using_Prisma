import prisma from "../DB/db.config.js";

export const createLikeComment = async (req, res) => {
    const { user_id, comment_id, } = req.body;


    // Increase the like count for the comment
    await prisma.comment.update({
        where: {
            id: (comment_id)
        },
        data: {
            likeComment_count: {
                increment: 1   // Increase the like counter
            }
        }
    });

    const newLikeComment = await prisma.likeComment.create({
        data: {
            user_id: Number(user_id),
            comment_id: (comment_id)
        }
    });
    return res.json({ status: 200, data: newLikeComment, message: "Like done." });
};
// Fetch all Likes
// export const fetchLike = async (req, res) => {
//     const like = await prisma.like.findMany({
//         include: {
//             user: true,
//             post: {
//                 include: {
//                     user: true
//                 }
//             }
//         }
//     });

//     return res.json({ status: 200, data: like, "Here we get": "All Comments." })
// };

// // Fetch Comment likes by Post ID
export const fetchCommentLikesById = async (req, res) => {
    const comment_id = req.body.comment_id;
    const likesComment = await prisma.comment.findMany({
        where: {
            id: comment_id
            
        },
        include: {
            user: {
                include: {
                    post: {
                        select: {
                            title: true
                        }
                    }
                }
            }
        }
        
    });
    return res.json({ status: 200, data: likesComment, "Here we get": "The Comment likes." })

};



// // Delete Comment Like
export const deleteCommentLike = async (req, res) => {
    const { user_id, comment_id } = req.body;

    await prisma.comment.update({
        where: {
            id: (comment_id)
        },
        data: {
            likeComment_count: {
                decrement: 1
            },
        },
    });

    await prisma.likeComment.deleteMany({
        where: {
            comment_id: (comment_id),
            user_id: Number(user_id)
        }
    });
    return res.json({ status: 200, message: "Like deleted successfully." })
};