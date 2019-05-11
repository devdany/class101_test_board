module.exports = {
    Mutation: {
        writePost: async (_, args, {UserService, PostService, LogService}) => {
            const {userId, title, content} = args;

            if (!title || !content || !userId) {
                throw Error('작성자, 제목, 내용을 모두 입력해주세요.')
            }

            const writer = await Promise.resolve(UserService.findByUserId(userId));

            if (!writer) {
                throw Error('해당 유저가 존재하지 않습니다.')
            }

            return PostService.writePost({
                writer: writer.dataValues.id,
                title: title,
                content: content,
                is_delete: false
            }).then(() => {
                return true;
            }).catch(err => {
                LogService.createLog({
                    model: 'Post',
                    detail: JSON.stringify(err)
                })

                throw Error('포스트 저장에 에러가 있습니다.')
            })


        }
    }
}