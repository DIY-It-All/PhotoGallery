console.log('hello ¬_¬');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
const fileupload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
app.get('/', (req,res)=>{
    res.render('home');
});
app.post('/add', fileupload({createParentPath: true}), (req,res)=>{
    const files = req.files
    console.log(files)

    Object.keys(files).forEach(key => {
        let filesThatExist = fs.readdirSync('public');
        let toBeFileName = files[key].name;
        while(filesThatExist.includes(toBeFileName)){
            toBeFileName = "(1)" + toBeFileName;
        }
        const filepath = path.join(__dirname, 'public', toBeFileName)
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
    })
    res.redirect('/');
})
app.listen(3000, ()=>{
    console.log('listening at port 3000');
});