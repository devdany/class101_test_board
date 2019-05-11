module.exports = {
    Query: {
        postDetail: async (_, args, {PostService}) => {
            const {post_id} = args;
            const post = await Promise.resolve(PostService.findOne(post_id));

            if(!post){
                throw Error('해당 포스트는 존재하지 않습니다.')
            }

            return post;
        }
    }
}