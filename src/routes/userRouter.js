const express=require('express');
const router = express.Router();
const session=require('express-session');
const cookieParser=require('cookie-parser');
const app=express();
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


app.use(session({
    secret:"15432",
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:30000
    }
}))

app.get('/login',(req,res)=>{
    if(req.session.username) return res.send("You are already loged")
    let {nombre}=req.query;
    req.session.username=nombre;
    res.send("Welcome "+nombre);
})

app.get('/logout',(req,res)=>{
req.logOut();
res.redirect('/')
})

module.exports=router;