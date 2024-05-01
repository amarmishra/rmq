import {config} from 'dotenv'
config()
import PostController from './controllers/post.controller';
import App from "./app";

const port=3000
const app= new App([new PostController()],port)
app.listen();