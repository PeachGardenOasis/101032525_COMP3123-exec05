const express = require("express");
const app = express();
const router = express.Router();

const fs = require("fs");
const path = require("path");
/*
- Create new html file name home.html
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get("/home", (req, res) => {
  // Return home.html page to client
  res.sendFile("home.html", { root: __dirname });
});

/*
- Return all details from user.json file to client as JSON format
*/

let userDataRead = fs.readFileSync(path.resolve(__dirname, "user.json"));
let userDataReadJsonParse = JSON.parse(userDataRead);

router.get("/profile", (req, res) => {
  res.json(userDataReadJsonParse);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get("/login", (req, res) => {
  // valid login
  // /login?username=bret&password=bret@123

  let userPara = req.query.username;
  let passPara = req.query.password;

  let userDataRead = fs.readFileSync(path.resolve(__dirname, "user.json"));
  let userDataReadJsonParse = JSON.parse(userDataRead);

  let savedUserJson = userDataReadJsonParse.username;
  let savedPassJson = userDataReadJsonParse.password;

  if (savedUserJson === userPara && savedPassJson === passPara) {
    res.json({
      status: true,
      message: "Valid User",
    });
  } else if (savedUserJson !== userPara) {
    res.json({
      status: false,
      message: "Invalid Username",
    });
  } else if (savedPassJson !== passPara) {
    res.json({
      status: false,
      message: "Invalid Password",
    });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout/:username", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.send(`<b>${req.params.username} You Have Logged Out.<b>`);
});

app.use("/", router);

app.listen(process.env.port || 8081);

console.log(
  "The NodeJS server is working on port " + (process.env.port || 8081)
);
