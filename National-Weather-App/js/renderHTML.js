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
    const dayCity = data.datetime.split(" ")[0].split("-")
    
    // DAY
    let newdayCity=dayCity.map(items => Number(items));
    let dateConcat = dayCity.join("-");

    

    if(timeCity[0] >= "06" && timeCity[0] <= "20"  ){
        img="01d";
        
        
    }

    if(timeCity[0] >= "20" || timeCity <= "06"){
        img="01n";
    }

    
    return `
    <div class="titulo-ciudad">
        <h1 class="title">${city.name}</h1>
        <p class="mes">${Day(dateConcat)}, ${newdayCity[2]} de ${Week(dateConcat)} de ${newdayCity[0]}  </p>
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


const Day = DateDay => {
    let date = new Date(DateDay);
    let day = date.getDay()+1;

    switch(day){
        case 1:
            return "Domingo";
        case 2:
            return "Lunes";
        case 3:
            return "Martes";
        case 4:
            return "Miercoles";
        case 5:
            return "Jueves";
        case 6:
            return "Viernes";
        case 7:
            return "Sabado";
        default:
            return "Ese dia no existe";
    }
}

const Week = DateWeek =>{
    let date = new Date(DateWeek);
    let week = date.getMonth();
    const weekList = ["Enero","Febrero", "Marzo","Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Nomviembre", "Diciembre"];
    return weekList[week];
}
