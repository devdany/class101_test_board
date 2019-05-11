const {getArrayPages} = require('../../../lib/pagination');

//한페이지에서 화면 아래에 보여줄 페이지 개수
//예를들어 5페이지씩 보여준다면 현재 3페이지에 있는 경우 1, 2, 3, 4, 5 / 현재 8페이지 라면 6, 7, 8, 9, 10
const page_amount = 5

module.exports = {
    Query: {
        postDetail: async (_, args, {PostService, CommentService}) => {
            const {post_id, current_page, limit} = args;

            const start = (current_page-1)*limit;

            const [post, comment_count] = await Promise.all([
                PostService.findOne(post_id, start, limit),
                CommentService.count()
            ]);

            if(!post){
                throw Error('해당 포스트는 존재하지 않습니다.')
            }

            //총 페이지 개수
            const pageCount = Math.ceil(comment_count / limit);

            let pages = getArrayPages(current_page, page_amount);

            return {
                post: post,
                page_count: pageCount,
                pages: pages
            };
        }
    }
}