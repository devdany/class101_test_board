const {GraphQLServer} = require('graphql-yoga/dist/index');
const dbConnector = require('./sequelize/connector');
const schema = require('./graphql/schema');
const logger = require('morgan');
const PORT = process.env.PORT || 3000;

dbConnector.authenticate()
    .then(() => {
        console.log('db Connection success');
    })
    .catch(err => {
        console.log(err);
    })

const User = require('./sequelize/model/User');
const Post = require('./sequelize/model/Post');
const Comment = require('./sequelize/model/Comment');
const Log = require('./sequelize/model/Log');

User.sync({force: false})
Post.sync({force: false})
Comment.sync({force: false})
Log.sync({force: false})


User.hasMany(Post, {foreignKey: 'writer', as: 'posts'})
Post.belongsTo(User, {foreignKey: 'writer', as: 'post_writer'})

User.hasMany(Comment, {foreignKey: 'writer', as: 'comments'})
Comment.belongsTo(User, {foreignKey: 'writer', as: 'comment_writer'})

Post.hasMany(Comment, {foreignKey: 'post', as:'comments'})
Comment.belongsTo(Post, {foreignKey: 'post', as: 'comment_post'})

const UserService = require('./sequelize/service/UserService');
const PostService = require('./sequelize/service/PostService');
const CommentService = require('./sequelize/service/CommentService');
const LogService = require('./sequelize/service/LogService');

const graphql_server = new GraphQLServer({
    schema,
    context: () => ({
        UserService,
        PostService,
        CommentService,
        LogService
    })
})

const userRouter = require('./express/router/user');
const postRouter = require('./express/router/post');
const commentRouter = require('./express/router/comment');

graphql_server.express.use('/user', userRouter);
graphql_server.express.use('/post', postRouter);
graphql_server.express.use('/comment', commentRouter);


graphql_server.express.use(logger('dev'))

graphql_server.start({
    port: PORT
}, () => {
    console.log(`graphql_server running on ${PORT}`)
})