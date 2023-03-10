import {requestCity, requestTime} from  "./request.js";
import { renderCity } from "./renderHTML.js";
import { InitCity } from "./initCity.js";
import { ShowHistory } from "./WorldHistory.js";


const form = document.getElementById("form");
const cityInput = document.querySelector(".search-input");
const interfaz = document.querySelector(".interfaz");
const warMsg = document.querySelector(".mensaje-advertencia");
const card = document.querySelector(".card");
const IconWorld = document.querySelector(".icon-world")

// Guardamos el array de las ciudades
let cities = JSON.parse(localStorage.getItem('cities')) || [];


// Funcion para transformar Kelvin a Celsius
export const convertCelsius = kelvin=>{
    let celsius = Math.round(kelvin-273);
    return celsius; 
}

// Funcion para la logica de renderizar
export const renderCitiesList = (citiesList, fetch, time) =>{
    
    let index = citiesList.indexOf(fetch);
    card.innerHTML = renderCity(citiesList[index], time);

}


// Funcion mensaje de advertencia
const warningMsg = msg=>{
    interfaz.style.gridTemplateRows = "80px 20px 450px 100px";
    const data = `
        <p>${msg}</p>
    `;
    warMsg.innerHTML = data;
    form.reset();
    setTimeout(()=>{
        interfaz.style.gridTemplateRows = "80px 0px 450px 100px";
        return warMsg.innerHTML = ""
    },2000)

}


// Funcion para guardar array en el localStorage
export const saveLocalStorage = (citiesList) =>{
    localStorage.setItem('cities', JSON.stringify(citiesList));
}


// Funcion buscar ciudad
const SearchCity = async  e=>{
    e.preventDefault();
    const searchedCity = cityInput.value.trim();
    if(searchedCity === ""){
        warningMsg("Es necesario que ingreses un valor");
        return;
    }
    // Pasamos valor input a nuestra funcion requesCity
    const fetchedCity = await requestCity(searchedCity);
    // Sacamos el valor de los horarios 
    const fetchTime = await requestTime(searchedCity);
    
    // NO EXISTE: Msg si no existe la ciudad
    if(fetchedCity.message === "city not found"){
        warningMsg("Lo sentimos esa ciudad no fue encontrada");
        return;
    }
    

    // Array para que no se repitan las ciudades
    cities = [fetchedCity, ...cities];
    let newListCity = cities.reduce((a,b)=>{
        if(!a.find(c => c.name == b.name)){
            a.push(b)
        }
        return a;
    },[]);

    renderCitiesList(newListCity, fetchedCity,fetchTime);
    saveLocalStorage(newListCity);
    form.reset();
    
    
}

// Funcion general
const init = ()=>{
    InitCity(cities);
    form.addEventListener("submit", SearchCity);
    IconWorld.addEventListener("click", ShowHistory);
    
}

init();