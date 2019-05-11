module.exports = {
    Mutation: {
        writePost: (_, args, {UserService, PostService, LogService}) => {
            const {userId, title, content} = args;

            return UserService.findByUserId(userId)
                .then(user => {
                    if(!user){
                        throw Error('해당 유저가 존재하지 않습니다.')
                    }

                    return PostService.writePost({
                        writer: user.dataValues.id,
                        title: title,
                        content: content
                    })
                        .then(() => {
                            return true;
                        })
                        .catch(err => {
                            LogService.createLog({
                                model: 'Post',
                                detail: JSON.stringify(err)
                            })

                            throw Error('포스트 저장에 에러가 있습니다.')
                        })

                })
                .catch(err => {

                    LogService.createLog({
                        model: 'User',
                        detail: JSON.stringify(err)
                    })

                    throw Error('유저정보 조회에 실패했습니다.')
                })


        }
    }
}