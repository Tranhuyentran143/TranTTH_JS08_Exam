const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/api/v1/todos", (req, res) => {
  const jsonString = fs.readFileSync((path.join(__dirname, "./data/dotos.json")));
  const jsonData = JSON.parse(jsonString);
  res.status(200).json(jsonData)
})

app.get("/api/v1/todos/:id", (req, res) => {
  const jsonString = fs.readFileSync((path.join(__dirname, "./data/dotos.json")));
  const jsonData = JSON.parse(jsonString);
  const userId = req.params.id;
  const todo = jsonData.find((user) => user.id == userId)
  res.status(200).json(todo)
})

app.post("/api/v1/todos", (req, res) => {
  const jsonString = fs.readFileSync((path.join(__dirname, "./data/dotos.json")));
  const jsonData = JSON.parse(jsonString);

  const { userId, title, completed } = req.body

  const dataCreate = {
    userId,
    title,
    completed,
    id: jsonData[jsonData.length - 1].id + 1
  }
  jsonData.push(dataCreate)

  fs.writeFileSync(path.join(__dirname, "./data/dotos.json"),
    JSON.stringify(jsonData, null, 2),
    { encoding: "utf-8" }
  );
  res.status(200).json(dataCreate)
})

app.put("/api/v1/todos/:id", (req, res) => {
  const jsonString = fs.readFileSync((path.join(__dirname, "./data/dotos.json")));
  const jsonData = JSON.parse(jsonString);

  const { userId, title, completed } = req.body

  const user = req.params.id;

  const listAfterUpdate = jsonData.map(data => {
    if (data.id == user) {
      data.userId = userId;1
      data.title = title;
      data.completed = completed;
    }
  })
  fs.writeFileSync(path.join(__dirname, "./data/dotos.json"),
    JSON.stringify(listAfterUpdate, null, 2),
    { encoding: "utf-8" }
  );
  res.status(200).json(req.body)
});





app.listen(8082, () => {
  console.log("server is running on port 8082");
})