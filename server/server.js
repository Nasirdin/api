const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8090;
const {readFile, writeFile, unLink} = require('fs').promises;
const e = require('express');

app.use(bodyParser.json({limit: '50mb'}))

app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to my API')
    
});

const rFile = () => {
    return readFile(`${__dirname}/post.json`, {encoding: 'utf8'})
        .then((text) => JSON.parse(text))
        .catch(() => {
            axios('https://jsonplaceholder.typicode.com/posts')
                .then(({data}) => {
                    wFile(data)
                })
        })
}

const wFile = (users) => {
    writeFile(`${__dirname}/post.json`, JSON.stringify(users), { encoding: "utf8" });  
}

app.get('/api/posts', async (req, res) => {
    const post = await rFile()
    await res.json(post)
});

app.post('/api/add/post', async (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const posts = await rFile();
    const newArr = posts.map((el) => {
        return el.id
    })
    console.log(posts);
    const id = Math.max(...newArr) + 1;
    const newPost = [...posts, {
        title: title,
        body: body,
        id:id,
    }];

    wFile(newPost)
    await res.json({ satatus: 'success', id})
})

app.delete('/api/del', async (req, res) => {
    const id = req.body.id;
    const posts = await rFile();
    const newPosts = await posts.filter((el) => el.id !== +id);
    await wFile(newPosts);
    await console.log(posts);
    await res.json({status: '200', id: id})
})

app.patch('/api/update/:id', async (req, res) => {
    const {id} = req.params;
    const obj = req.body;
    const posts = await rFile();
    const newPost = await posts.map((el) => el.id === +id ? {...el, ...obj} : el);
    await wFile(newPost);
    await res.json({status: 'success', id: id})
})

app.listen(port, () => {
    console.log(`Exaple app listening att http://localhost:${port}`);
});
