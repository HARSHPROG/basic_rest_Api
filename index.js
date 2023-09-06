const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())       // use method allows you to add middleware

// mimic the db using an array 
let blogsList = [];

app.get('/blogs', (req, res) => {
    return res.json({
        data: blogsList,
        success: true,
        code: 200,
    });
})

app.post('/blogs', (req, res) => {
    blogsList.push({title: req.body.title, content: req.body.content, id: blogsList.length + 1});
    return res.status(201).json({
        success: true,
    })
})

app.get('/blogs/:id', (req, res) => {
    const result = blogsList.filter((blog) => blog.id == req.params.id);
    return res.status(200).json({
        data: result,
        success: true
    })
})

app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
});

