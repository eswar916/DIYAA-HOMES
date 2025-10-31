const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;


app.set("view engine", "ejs");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.render('i')
})

app.post('/submit', (req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const phn = req.body.phone

    console.log(name,email,phn)

    res.json({ status: 'success', data: { name, email, phn } });
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});