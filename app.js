const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;


app.set("view engine", "ejs");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const home1 = ["Luxury homes", 3050, "4bhk residential",'images/lux1.jpeg', 'images/lux2.jpeg','images/lux3.jpeg', 'images/lux4.jpeg'];
const home2 = ["Modern homes", 2750, "3bhk residential",'images/mod1.jpeg', 'images/mod2.jpeg','images/mod3.jpeg', 'images/mod4.jpeg'];
const home3 = ["Pakka homes", 2270, "2bhk residential", 'images/ren1.jpeg', 'images/ren2.jpeg','images/ren3.jpeg', 'images/ren4.jpeg'];
const home4 = ['Empty Plots', 0, 'Empty Plots', 'images/plot1.jpeg', 'images/plot1.jpeg','images/plot1.jpeg','images/plot1.jpeg']
const format1 = {};
format1.home1 = home1;
format1.home2 = home2;
format1.home3 = home3;
format1.home4 = home4;


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/lux", (req, res) => {
    res.render("ind", { data: format1.home1 });
});

app.get("/mod", (req, res) => {
    res.render("ind", { data: format1.home2 });
});

app.get("/ren", (req, res) => {
    res.render("ind", { data: format1.home3 });
});

app.get("/plots", (req, res) => {
    res.render("ind", { data: format1.home4 });
});


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