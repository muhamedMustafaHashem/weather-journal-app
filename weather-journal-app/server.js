// Setup empty JS object to act as endpoint for all routes
const projectData = { temperature: "", date: "", userResponse: "" };
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
// Spin up the server
const port = 8000;
// Callback to debug
const server = app.listen(port, () => {
  console.log("server is running");
  console.log(`server is running locally hosted${port}`);
});

// Initialize all route with a callback function
app.get("/allData", (req, res) => {
  res.send(projectData);
});

// Post Route
app.post("/addData", (req, res) => {
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };
  projectData["temperature"] = newEntry.temperature;
  projectData["date"] = newEntry.date;
  projectData["userResponse"] = newEntry.userResponse;
  res.send(projectData);
});
