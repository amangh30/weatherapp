import { useEffect, useState } from "react";
import "../styles/main.css";
import axios from "axios";
import temperature from "../images/temperature-quarter-svgrepo-com.svg";
import hm from "../images/humidity-svgrepo-com.svg";
import wind from "../images/wind-svgrepo-com.svg";
import uv from "../images/sun-alt-svgrepo-com.svg";

const getWeather = async (props) => {
  const options = {
    method: "GET",
    url: "http://api.weatherapi.com/v1/current.json", // Remove the trailing slash here
    params: {
      key: "",
      q: `${props.formData1},${props.formData2}`,
    },
  };

  // Check if coordinates are being passed directly
  if (
    props.formData1 &&
    !isNaN(props.formData1) &&
    props.formData2 &&
    !isNaN(props.formData2)
  ) {
    // If both are numbers (latitude and longitude), pass them as coordinates
    options.params.q = `${props.formData1},${props.formData2}`;
  } else {
    // Else, assume it's a city name or location
    options.params.q = props.formData1;
  }

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null; // Return null if there's an error
  }
};

const getFutureWeather = async (props) => {
  if (props.formData1 === "22.56263") {
    props.formData1 = props.formData;
  }

  try {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=b1d60fc2dd874b87894161306242601&q=${props.formData1},${props.formData2}&days=7`
    );
    return res.data;
  } catch (e) {
    console.error("Error fetching future weather:", e);
    return null;
  }
};

const Main = ({ props }) => {
  const [wthr, setWthr] = useState();
  const [cast, setCast] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const forecast = await getFutureWeather(props);
      if (forecast) {
        setCast(forecast);
      }
    };
    fetchData();
  }, [props.formData, props.formData1]);

  useEffect(() => {
    const fetchData = async () => {
      const weather = await getWeather(props);
      if (weather) {
        setWthr(weather);
      }
    };
    fetchData();
  }, [props.formData, props.formData1]);

  // Extract forecast data early to avoid repeated optional chaining in JSX
  const forecastData = cast?.data?.forecast?.forecastday || [];
  const currentWeather = wthr?.current || {};

  return (
    <div className="main">
      <div>
        <div>
          <div style={{ display: "flex" }}>
            <div className="name">{props.formData}</div>
            <div>
              <img
                className="day"
                src={currentWeather?.condition?.icon || ""}
                alt=""
              />
            </div>
          </div>
          <div className="rain">
            Chances of rain: {forecastData[0]?.day?.daily_chance_of_rain || 0}%
          </div>
          <div className="temp">
            {currentWeather?.temp_c}°
          </div>
        </div>

        {/* TODAY'S FORECAST */}
        <a
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 mt-6 ml-5 dark:border-gray-700 dark:hover:bg-gray-700"
          id="box"
        >
          <div className="text">TODAY'S FORECAST</div>
          <div id="today">
            {forecastData[0]?.hour?.map((hour, index) => (
              <div key={index}>
                <div className="daily">
                  <p className="pin">{`${index * 3 + 6}:00 ${
                    index % 2 === 0 ? "AM" : "PM"
                  }`}</p>
                  <img className="img2" src={hour?.condition?.icon} alt="" />
                  <p style={{ position: "relative", left: "10px" }}>
                    {hour?.temp_c}
                  </p>
                </div>
                {index !== forecastData[0]?.hour.length - 1 && (
                  <div style={{ border: "1px solid #2e384b" }} />
                )}
              </div>
            ))}
          </div>
        </a>

        {/* AIR CONDITIONS */}
        <a
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 mt-6 ml-5 dark:border-gray-700 dark:hover:bg-gray-700"
          id="box2"
        >
          <div className="text">AIR CONDITIONS</div>
          <div>
            <div className="heading">
              <img className="img1" src={temperature} alt="" />Real Feel
            </div>
            <div className="txt">{currentWeather?.feelslike_c}°</div>
            <div className="heading">
              <img className="img1" src={hm} alt="" />Humidity
            </div>
            <div className="txt">{currentWeather?.humidity}%</div>
          </div>
          <div>
            <div className="rightheading">
              <img className="img1" src={wind} alt="" />Wind
            </div>
            <div className="righttxt">{currentWeather?.wind_kph}km/h</div>
            <div className="rightheading">
              <img className="img1" src={uv} alt="" />UV Index
            </div>
            <div className="righttxt">{currentWeather?.uv}</div>
          </div>
        </a>
      </div>

      {/* 7-DAY FORECAST */}
      <div className="right">
        <a
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 mt-6 ml-5 dark:border-gray-700 dark:hover:bg-gray-700"
          id="right"
        >
          <div className="text" style={{ display: "inline" }}>
            7-DAY FORECAST
            <div style={{ display: "flex", flexDirection: "column" }}>
              {forecastData.map((day, index) => (
                <div key={index} className="seven">
                  <p className="sevenp1">{day?.date}</p>
                  <img
                    className="image"
                    src={day?.day?.condition?.icon}
                    alt=""
                  />
                  <p className="text3">
                    {day?.day?.condition?.text === "Patchy rain nearby"
                      ? day?.day?.condition?.text.slice(0, 12)
                      : day?.day?.condition?.text}
                  </p>
                  <p className="sevenp2">
                    {day?.day?.maxtemp_c}
                    <p className="text4">/{day?.day?.mintemp_c}</p>
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Main;
