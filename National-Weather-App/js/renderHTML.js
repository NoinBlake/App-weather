import { convertCelsius } from "./main.js"

// Funcion para renderizar HTMl
export const renderCity = (city, data )=>{

    const imgWeather = city.weather[0].icon;
    // HORA
    const timeCity = data.datetime.split(" ")[1].split(":");
    const containerHistory = document.querySelector(".containerHistory");
    timeCity.splice(2);

    // DIA
    let img;
    const week = ["Enero","Febrero", "Marzo","Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Nomviembre", "Diciembre"];
    const day = ["Lunes", "Martes", "Miercoles", "Jueves","Viernes", "Sabado", "Domingo"];
    const dayCity = data.datetime.split(" ")[0].split("-")

    let newdayCity=dayCity.map(items => Number(items));

    if(timeCity[0] >= "06" && timeCity[0] <= "20"  ){
        img="01d";
        
        
    }

    if(timeCity[0] >= "20" || timeCity <= "06"){
        img="01n";
    }

    
    return `
    <div class="titulo-ciudad">
        <h1 class="title">${city.name}</h1>
        <p class="mes">${day[newdayCity[2]]}, ${newdayCity[2]} de ${week[newdayCity[1]-1]} de ${newdayCity[0]}  </p>
    </div>
    <div class="horario-ciudad">
        <div class="contenedor-hora">
            <p class="hora">${timeCity.join(":")} <span><img class="isDayCity" src="./src/${img}.png"></img></span></p>
        </div>
    </div>
    <div class="clima">
        <h1 class="title-clima">${city.weather[0].description}</h1>
        <div class="contenedor-img">
            <img src="./src/${imgWeather}.png" alt="">
        </div>
        <div class="humedad">
            <p>${city.main.humidity}% Humedad </p>
        </div>
    </div>
    <div class="informacion-temperatura">
        <div class="presicion">
            <p>${city.main.pressure}<span>Hpa</span></p>
        </div>
        <div class="temperatura">
            <p>${convertCelsius(city.main.temp)}°<span><i class="fa-solid fa-temperature-half"></i></span></p>
        </div>
        <div class="sensacion-termica">
            <p>ST <span class="st">${convertCelsius(city.main.feels_like)}°</span></p>
        </div>
        <div class="temperatura-maxima">
            <p class="maxima">${convertCelsius(city.main.temp_max)}°<span>Max</span></p>
            <p class="maxima">${convertCelsius(city.main.temp_min)}°<span>Min</span></p>
        </div>

        <div class="velocidad-viento">
            <p><span><i class="fa-solid fa-wind"></i></span> ${city.wind.speed} <span>km/h</span></p>
        </div>
    </div>
    `
}