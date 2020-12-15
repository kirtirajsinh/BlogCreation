const express = require('express');
const articleRouter = require('./routes/articles');
const app = express();
const mongoose = require('mongoose');
const Article = require('./models/article')
const methodOverride = require('method-override') 


mongoose.connect('mongodb://localhost/blogs', { useNewUrlParser: true,useUnifiedTopology: true,UseCreateIndex:true })
app.set('view engine','ejs');
app.use(methodOverride('_method'))


// To get access to the form fields like title,description,markdown.
app.use(express.urlencoded({extended:false}))

app.get('/',async (req,res) =>{
    const articles = await Article.find().sort({createdAt:'desc'})
        
    res.render('articles/index',{articles: articles});
})
app.use('/articles',articleRouter);

app.listen(5000);