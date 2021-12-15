/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//personal api key
const apiKey = "&appid=d737fc00d9a006fc03263a2ea75da96d&units=imperial";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", () => {
  const zipCode = document.getElementById("zip").value;
  const todayFeeling = document.getElementById("feelings").value;
  if (zipCode == "") {
    window.alert("please enter the zipcode");
  } else {
    getWeatherData(baseUrl, zipCode, apiKey).then((weatherData) => {
      postData("/addData", {
        temperature: weatherData.main.temp,
        date: newDate,
        userResponse: todayFeeling,
      });

      updateUI();
    });
  }
});

// async  callback function to GET data from the weather api
const getWeatherData = async (baseURL, zip, key) => {
  //await here tell to wait for the fetch promise to give result if fulfilled go to try if not go to catch.
  const res = await fetch(baseURL + zip + key);

  try {
    const weatherData = res.json();
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
};

//async callback function to make post request

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//async function to updateUI

const updateUI = async () => {
  const request = await fetch("/allData");
  try {
    const UINewData = await request.json();
    document.getElementById("date").innerHTML =
      " <h2>today date</h2>  <br>" + UINewData["date"];
    document.getElementById("temp").innerHTML =
      "<h2>temperature </h2> <br>" + UINewData["temperature"] + " F";
    document.getElementById("content").innerHTML =
      "<h2>feelings</h2> <br>" + UINewData["userResponse"];
  } catch (error) {
    console.error("error", error);
  }
};
