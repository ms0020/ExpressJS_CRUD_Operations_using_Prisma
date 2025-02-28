import prisma from "../DB/db.config.js";

export const createPost = async (req, res) => {
    const { user_id, title, description } = req.body;

    const newPost = await prisma.post.create({
        data: {
            user_id: Number(user_id),
            title,
            description,
        }
    });
    return res.json({ status: 200, data: newPost, msg: "Post created." })
};

// Fetch all Posts // Nested Relationship
export const fetchPosts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    if (page <= 0) {
        page = 1;
    }
    if (limit <= 0 || limit > 100) {
        limit = 10;
    }
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
        skip: skip,
        take: limit,
        include: {
            comment: {
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            id: "desc",
        },
        where: {

            NOT: {
                title: {
                    endsWith: "Tutorial"
                }
            }
            // OR:[      // AND we can also use
            //     {
            //         title:{
            //             startsWith: "Next"
            //         }
            //     }, {
            //         title:{
            //             endsWith: "Prisma"
            //         }

            //     }
            // ]
        }
        // where: {
        //     comment_count: {
        //         gt: 0    // gt -> Greater than & gte -> Greater than equal to
        //     }
        // }
        
    });
    // To get the Total Post count
    const totalPosts = await prisma.post.count()
    const totalpages = Math.ceil(totalPosts / limit)

    console.log(posts[0]['comment'][0]['created_at']);
    return res.json({
        status: 200, data: posts, meta: {
            totalpages,
            currentPage: page,
            limit: limit,
        }, "Here we get": "All Posts."
    })
};

// Fetch Post by ID
export const fetchByPost = async (req, res) => {
    const postId = req.params.id;
    const post = await prisma.post.findFirst({
        where: {
            id: Number(postId)
        },
    });
    return res.json({ status: 200, data: post, "Here we get": "The Post." })

};


// Update the Post
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { user_id, title, description } = req.body;

    await prisma.post.update({
        where: {
            id: Number(postId)
        },
        data: {
            user_id,
            title,
            description
        }
    });

    return res.json({ status: 200, message: "Post updated successfully." })
};

// Delete Post
export const deletePost = async (req, res) => {
    const postId = req.params.id;
    await prisma.post.deleteMany({
        where: {
            id: Number(postId)
        }
    });
    return res.json({ status: 200, message: "Post deleted successfully." })
};


// To search the Post
export const searchPost = async (req, res) => {
    const query = req.query.q;
    const posts = await prisma.post.findMany({
        where: {
            description: {
                search: query  // We can also use "contains" but
            }                  // its not a sufficient method.
        }
    })

    return res.json({ status: 200, data: posts })
};

// Fetch Post of a particular user by Name
export const fetchPostByName = async (req, res) => {
    const userName = req.body.userName;
    //const userComment = await prisma.comment.findFirst({})
    const userPosts = await prisma.user.findMany({
        where: {
            name: userName
        },
        include: {
            post: {
                include: {
                    comment: {
                        select:{
                            comment: true
                        }
                    }
                }
            }
        }
    }
)
    //console.log(userPosts[0]['post'][0]['description']);
     console.log(userPosts[0]['post'][0]['comment'][0]['comment'])
    return res.json({ status: 200, data: userPosts, message: "All user Post." })
};





