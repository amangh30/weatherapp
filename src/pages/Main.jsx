import { useEffect, useState } from "react";
import "../styles/main.css"
import axios from 'axios';
import temperature from "../images/temperature-quarter-svgrepo-com.svg"
import hm from "../images/humidity-svgrepo-com.svg"
import wind from "../images/wind-svgrepo-com.svg"
import uv from "../images/sun-alt-svgrepo-com.svg"

const getWeather = async(props)=>{
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {q: `${props.formData1},${props.formData2}`},
      headers: {
        'X-RapidAPI-Key': '63a3e78e63msh574226d117c629bp1a9c4bjsne2cd8dbad2a8',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    if(props.formData1=='22.56263'){
        options.params = {q: props.formData}
    }
    
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const getFutureWeather= async(props)=>{
    if(props.formData1=='22.56263'){
        props.formData1 = props.formData
    }
    try{
        const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=b1d60fc2dd874b87894161306242601&q=${props.formData1},${props.formData2}&days=7`)
        return res;
    }
    catch(e){
        console.log(e)
    }
}

const Main = ({props}) => {
    const [wthr,setWthr] = useState();
    const [cast,setCast] = useState();
    useEffect(()=>{
        const t = getFutureWeather(props)
        t.then((a)=>{
            setCast(a)
        })
    },[props.formData,props.formData1])
    useEffect(()=>{
        const temp = getWeather(props)
        temp.then((a)=>{
            setWthr(a)
        })
    },[props.formData,props.formData1])
    return (
        <div className="main">
            <div>
            <div>
                <div style={{display:"flex"}}>
                <div className="name">
                    {props.formData}
                </div>
                <div>
                    <img className="day" src={cast?.data.current.condition.icon} alt="" />
                </div>
                </div>
                <div className="rain">
                    Chances of rain: {cast?.data.forecast.forecastday[0].day.daily_chance_of_rain}%
                </div>
                <div className="temp">
                    {wthr?.current?.temp_c}°
                </div>
            </div>
                <a  className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 mt-6 ml-5 dark:border-gray-700 dark:hover:bg-gray-700" id="box">
                    <div className="text">TODAY'S FORECAST</div>
                    <div id="today">
                    <div className="daily"><p className="pin">6:00 AM</p><img className="img2" src={cast?.data.forecast.forecastday[0].hour[6].condition.icon} alt="" /><p style={{position:"relative",left:"10px"}}>{cast?.data.forecast.forecastday[0].hour[6].temp_c}</p></div>
                    <div style={{border:"1px solid #2e384b"}}></div>
                    <div className="daily"><p className="pin">9:00 AM</p><img className="img2" src={cast?.data.forecast.forecastday[0].hour[9].condition.icon} alt="" /><p style={{position:"relative",left:"10px"}}>{cast?.data.forecast.forecastday[0].hour[9].temp_c}</p></div>
                    <div style={{border:"1px solid #2e384b"}}></div>
                    <div className="daily"><p className="pin">12:00 PM</p><img className="img2" src={cast?.data.forecast.forecastday[0].hour[12].condition.icon} alt="" /><p style={{position:"relative",left:"10px"}}>{cast?.data.forecast.forecastday[0].hour[12].temp_c}</p></div>
                    <div style={{border:"1px solid #2e384b"}}></div>
                    <div className="daily"><p className="pin">3:00 PM</p><img className="img2" src={cast?.data.forecast.forecastday[0].hour[15].condition.icon} alt="" /><p style={{position:"relative",left:"10px"}}>{cast?.data.forecast.forecastday[0].hour[15].temp_c}</p></div>
                    <div style={{border:"1px solid #2e384b"}}></div>
                    <div className="daily"><p className="pin">6:00 PM</p><img className="img2" src={cast?.data.forecast.forecastday[0].hour[18].condition.icon} alt="" /><p style={{position:"relative",left:"10px"}}>{cast?.data.forecast.forecastday[0].hour[18].temp_c}</p></div>
                    <div style={{border:"1px solid #2e384b"}}></div>
                    <div className="daily"><p className="pin">9:00 PM</p><img className="img2" src={cast?.data.forecast.forecastday[0].hour[21].condition.icon} alt="" /><p style={{position:"relative",left:"10px"}}>{cast?.data.forecast.forecastday[0].hour[21].temp_c}</p></div>
                    </div>
                </a>
                <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 mt-6 ml-5 dark:border-gray-700 dark:hover:bg-gray-700" id="box2">
                    <div className="text">AIR CONDITIONS
                    <div>
                    <div className="heading">
                    <img className="img1" src={temperature} alt="" />Real Feel</div><div className="txt">{wthr?.current.feelslike_c}°</div>
                    <div className="heading">
                    <img className="img1" src={hm} alt="" />Humidity</div><div className="txt">{wthr?.current.humidity}%</div>
                    </div>
                    <div>
                    <div className="rightheading">
                    <img className="img1" src={wind} alt="" />Wind</div><div className="righttxt">{wthr?.current.wind_kph}km/h</div>
                    <div className="rightheading">
                    <img className="img1" src={uv} alt="" />UV Index</div><div className="righttxt">{wthr?.current.uv}</div>
                    </div>
                    </div>
                </a>
            </div>
            <div className="right">
                <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 mt-6 ml-5 dark:border-gray-700 dark:hover:bg-gray-700" id="right">
                    <div className="text" style={{display:"inline"}}>7-DAY FORECAST
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <div className="seven"><p className="sevenp1">{cast?.data.forecast.forecastday[0].date}</p><img className="image" src={cast?.data.forecast.forecastday[0].day.condition.icon} alt="" />{cast?.data.forecast.forecastday[0].day.condition.text=='Patchy rain nearby'?(<p className="text3">{cast?.data.forecast.forecastday[0].day.condition.text.slice(0,12)}</p>):(<p className="text3">{cast?.data.forecast.forecastday[0].day.condition.text}</p>)}<p className="sevenp2">{cast?.data.forecast.forecastday[0].day.maxtemp_c}<p className="text4">/{cast?.data.forecast.forecastday[0].day.mintemp_c}</p></p></div>
                    <hr />
                    <div className="seven"><p className="sevenp1">{cast?.data.forecast.forecastday[1].date}</p><img className="image" src={cast?.data.forecast.forecastday[1].day.condition.icon} alt="" />{cast?.data.forecast.forecastday[1].day.condition.text=='Patchy rain nearby'?(<p className="text3">{cast?.data.forecast.forecastday[1].day.condition.text.slice(0,12)}</p>):(<p className="text3">{cast?.data.forecast.forecastday[1].day.condition.text}</p>)}<p className="sevenp2">{cast?.data.forecast.forecastday[1].day.maxtemp_c}<p className="text4">/{cast?.data.forecast.forecastday[1].day.mintemp_c}</p></p></div>
                    <hr />
                    <div className="seven"><p className="sevenp1">{cast?.data.forecast.forecastday[4].date}</p><img className="image" src={cast?.data.forecast.forecastday[4].day.condition.icon} alt="" />{cast?.data.forecast.forecastday[2].day.condition.text=="Patchy rain nearby"?(<p className="text3">{cast?.data.forecast.forecastday[2].day.condition.text.slice(0,12)}</p>):(<p className="text3">{cast?.data.forecast.forecastday[2].day.condition.text}</p>)}<p className="sevenp2">{cast?.data.forecast.forecastday[4].day.maxtemp_c}<p className="text4">/{cast?.data.forecast.forecastday[2].day.mintemp_c}</p></p></div>
                    <hr />
                    <div className="seven"><p className="sevenp1">{cast?.data.forecast.forecastday[2].date}</p><img className="image" src={cast?.data.forecast.forecastday[2].day.condition.icon} alt="" />{cast?.data.forecast.forecastday[3].day.condition.text=="Patchy rain nearby"?(<p className="text3">{cast?.data.forecast.forecastday[3].day.condition.text.slice(0,12)}</p>):(<p className="text3">{cast?.data.forecast.forecastday[3].day.condition.text}</p>)}<p className="sevenp2">{cast?.data.forecast.forecastday[2].day.maxtemp_c}<p className="text4">/{cast?.data.forecast.forecastday[3].day.mintemp_c}</p></p></div>
                    <hr />
                    <div className="seven"><p className="sevenp1">{cast?.data.forecast.forecastday[3].date}</p><img className="image" src={cast?.data.forecast.forecastday[3].day.condition.icon} alt="" />{cast?.data.forecast.forecastday[4].day.condition.text=="Patchy rain nearby"?(<p className="text3">{cast?.data.forecast.forecastday[4].day.condition.text.slice(0,12)}</p>):(<p className="text3">{cast?.data.forecast.forecastday[4].day.condition.text}</p>)}<p className="sevenp2">{cast?.data.forecast.forecastday[3].day.maxtemp_c}<p className="text4">/{cast?.data.forecast.forecastday[4].day.mintemp_c}</p></p></div>
                    <hr />
                    <div className="seven"><p className="sevenp1">{cast?.data.forecast.forecastday[5].date}</p><img className="image" src={cast?.data.forecast.forecastday[5].day.condition.icon} alt="" />{cast?.data.forecast.forecastday[5].day.condition.text=="Patchy rain nearby"?(<p className="text3">{cast?.data.forecast.forecastday[5].day.condition.text.slice(0,12)}</p>):(<p className="text3">{cast?.data.forecast.forecastday[5].day.condition.text}</p>)}<p className="sevenp2">{cast?.data.forecast.forecastday[5].day.maxtemp_c}<p className="text4">/{cast?.data.forecast.forecastday[5].day.mintemp_c}</p></p></div>
                    <hr />
                    <div className="seven"><p className="sevenp1">{cast?.data.forecast.forecastday[6].date}</p><img className="image" src={cast?.data.forecast.forecastday[6].day.condition.icon} alt="" />{cast?.data.forecast.forecastday[6].day.condition.text=="Patchy rain nearby"?(<p className="text3">{cast?.data.forecast.forecastday[6].day.condition.text.slice(0,12)}</p>):(<p className="text3">{cast?.data.forecast.forecastday[6].day.condition.text}</p>)}<p className="sevenp2">{cast?.data.forecast.forecastday[6].day.maxtemp_c}<p className="text4">/{cast?.data.forecast.forecastday[6].day.mintemp_c}</p></p></div>
                    </div>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Main;
