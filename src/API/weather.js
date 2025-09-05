import axios from "axios";

export async function getWeather() {
    let result = null;
    let latitude;
    let longitude;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                console.log("Latitude:", latitude, "Longitude:", longitude);
                
                // Example: call weather API
                
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.log("Geolocation not available in this browser.");
    }
    
    console.log("Latitude:", latitude, "Longitude:", longitude);

let apiFreshHour = JSON.parse(localStorage.getItem("weatherHour"));
const now = new Date()
console.log(now.getHours());
let hour = now.getHours();
if(apiFreshHour && apiFreshHour.hour === hour){
    let data = apiFreshHour.data;
    return {tempF: data.weather[0].avgtempF, tempC: data.weather[0].avgtempC, status:data.current_condition[0].weatherDesc[0].value,humidity:data.weather[0].hourly[0].humidity, feelsLikeF: data.current_condition[0].FeelsLikeF,feelsLikeC: data.current_condition[0].FeelsLikeC, city:""};
}

return fetch(`https://wttr.in/${latitude},${longitude}?format=j1`)
.then(res => res.json())
.then((data) => {
    console.log(data);
    
            result = data;
            localStorage.setItem("weatherHour", JSON.stringify({hour: hour, data: data}));
            return {tempF: data.weather[0].avgtempF, tempC: data.weather[0].avgtempC, status:data.current_condition[0].weatherDesc[0].value,humidity:data.weather[0].hourly[0].humidity, feelsLikeF: data.current_condition[0].FeelsLikeF,feelsLikeC: data.current_condition[0].FeelsLikeC, city:""};
        });

// let result = "await axios('https://wttr.in/Chandigarh?format=j1')"
// result = await json.parse(result)
console.log(result);
return result
// here weather api code for weather
}