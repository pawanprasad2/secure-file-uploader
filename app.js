const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db.config");
const cookieparser = require("cookie-parser");
const homerouter = require("./routes/index.routes");
const session = require("express-session");
const flash = require("connect-flash");
const upload = require("./config/multer.config");
const app = express();

const userRouter = require("./routes/user.routes");
const port = process.env.PORT;
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "process.env.JWT_SECRET",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use("/user", userRouter);
app.use("/", homerouter);

app.listen(port, () => {
  console.log(`the server is running on http://localhost:${port}`);
});
