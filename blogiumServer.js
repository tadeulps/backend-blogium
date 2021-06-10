import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
let idPostCounter=0;
let idCommentsCounter=0;

const posts=[{
    id: 0,
    title: 'Hello World',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    contentPreview: 'Esta é a estrutura de um post esperado pelo froooooooooooont-end',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página da post...',
    commentCount: 1
  }];

const comments = [{
       id: 0,
       postId: 0,
       author: 'João',
       content: 'Muito bom esse post! Tá de parabéns'
     }];

app.get("/posts",(req,res)=>{
    res.send(posts);
});

app.get("/posts/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    res.send(posts.find((r)=>r.id===id))
})

app.post("/posts",(req,res)=>{
    const post=req.body;
    idPostCounter++
    post.id=idPostCounter
    post.contentPreview=post.content.replace("</p>",'80').substr(3,80)+"..."
    post.commentCount=0
    posts.push(post)
    res.send(post)
    console.log(idPostCounter)
});

app.get("/posts/:id/comments",(req,res)=>{
    const id=parseInt(req.params.id);
    res.send(comments.filter((e)=>e.postId===id))
});

app.post("/posts/:id/comments",(req,res)=>{
    const id=parseInt(req.params.id);
    const comment=req.body;
    idCommentsCounter++
    comment.id=idCommentsCounter
    comments.push(comment)
    posts[id].commentCount++
    res.send(comment)
    console.log(idCommentsCounter)
    
})

app.listen(4000)