// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "./style.css";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAiRWaFry3LAB5E6iz8yE63Q8BuQZ6CxY",
  authDomain: "weather-app-2108a.firebaseapp.com",
  projectId: "weather-app-2108a",
  storageBucket: "weather-app-2108a.appspot.com",
  messagingSenderId: "260801625098",
  appId: "1:260801625098:web:23479e0779df1f63d473f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const container = document.querySelector(".container");
const search = document.querySelector(".search-box");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "45a0571571ed59c529857cf3a2242930";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  ).then((response) =>
    response.json().then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      const IMAGES_PATH = "assets/images/";

      switch (json.weather[0].main) {
        case "Clear":
          image.src = `${IMAGES_PATH}clear.png`;
          break;

        case "Rain":
          image.src = `${IMAGES_PATH}rain.png`;
          break;

        case "Snow":
          image.src = `${IMAGES_PATH}snow.png`;
          break;

        case "Clouds":
          image.src = `${IMAGES_PATH}cloud.png`;
          break;

        case "Mist":
          image.src = `${IMAGES_PATH}mist.png`;
          break;

        default:
          image.src = "";
          break;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "550px";
    })
  );
});
