const dotenv = require('dotenv')
dotenv.config()
const  express = require('express')
const connectDB=require("./config/db.config")
const cookieparser =require("cookie-parser")
const homerouter=require("./routes/index.routes")
const upload =require('./config/multer.config')
const app =express()

const userRouter =require('./routes/user.routes')
const port= process.env.PORT
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use('/user',userRouter)
app.use('/',homerouter)


app.listen(port,(()=>{
    console.log(`the server is running on http://localhost:${port}`)
}))