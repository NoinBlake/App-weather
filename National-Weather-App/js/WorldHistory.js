import { convertCelsius, saveLocalStorage } from "./main.js";

const containerHistory  = document.querySelector(".containerHistory");
const spanIconWorld = document.querySelector("#world");
const iconWorld = document.querySelector(".icon-world");
const iconUpdate = document.querySelector(".icon-update");
const searchTitle = document.querySelector(".search-title");
const warMsg = document.querySelector(".mensaje-advertencia");
const interfaz = document.querySelector(".interfaz");
const btnBack = document.querySelector(".back");
const card = document.querySelector(".card");
const Desarrollador = document.querySelector(".desarrollador");
// Guardamos el array de las ciudades
let cities = JSON.parse(localStorage.getItem('cities')) || [];

export const ShowHistory = ()=>{

    
    
    
    searchTitle.innerText = "Historial: "
    card.style.display = "none";
    Desarrollador.style.display = "none";
    containerHistory.classList.remove("invisible");
    containerHistory.style.display = "grid";
    btnBack.classList.remove("invisible")
    btnBack.style.display = "grid";
    iconWorld.style.display = "none";
    iconUpdate.removeAttribute("display")
    iconUpdate.style.display = "grid";
    spanIconWorld.addEventListener("click", updateActive)
    btnBack.addEventListener("click", backFunction);
    containerHistory.addEventListener("click", removeCardLocalStorage)


    cities = [...cities];
    
    let newListCity = cities.reduce((a,b)=>{
        if(!a.find(c => c.name == b.name)){
            a.push(b)
        }
        return a;
    },[]);

    renderhistory(newListCity)
}   

const renderhistory = citiesList =>{
    containerHistory.innerHTML = citiesList.map(historyCity=>renderHistoryCity(historyCity)).join("")
}

const renderHistoryCity = city =>{
    let img = city.weather[0].icon
    // const imgWeather = city.weather[0].icon;
    return `
    <div class="cardHistory">
        <div class="title">
            <div class="title-fecha">
                <p><span><i class="fa-solid fa-location-dot"></i> ${city.name}</span></p>
                <p class="fecha">Domingo 5 de Marzo</p>
            </div>
            <span class="icon-close" >
                <i class="fa-solid fa-xmark close" data-id="${city.id}"></i>
            </span>
        </div>

        <div class="historyImg">
            <img src="./src/${img}.png" alt="">
        </div>

        <div class="historyInformationContainer">
            <div class="historyInformation">
                <div class="feels-like">
                    <p>${convertCelsius(city.main.temp)}<span>°</span></p>
                    <p class="feels-like-climate">${city.weather[0].description}</p>
                </div>
                <div class="thermal-sensation">
                    <p><span>ST</span> ${convertCelsius(city.main.feels_like)}<span>°</span></p>
                </div>
            </div>
        </div>
    </div>
    `;

}   

const updateActive = ()=>{
    

    iconUpdate.style.animation = "updateIcon 5s infinite";
    warningMsg("ACTUALIZANDO...");

    let updateCity = JSON.parse(localStorage.getItem('cities'));
    const arrayUpdate = [...updateCity];
    setTimeout(()=>{
        iconUpdate.style.animation = "none";
    },1500)
    renderhistory(arrayUpdate);


}


const warningMsg = msg=>{
    interfaz.style.gridTemplateRows = "80px 20px 450px 100px";
    const data = `
        <p>${msg}</p>
    `;
    warMsg.innerHTML = data;
    setTimeout(()=>{
        interfaz.style.gridTemplateRows = "80px 0px 450px 100px";
        return warMsg.innerHTML = ""
    },2000)

}

const backFunction = ()=>{
    searchTitle.innerText = "El clima en: ";
    card.style.display = "grid";
    Desarrollador.style.display = "grid";
    containerHistory.style.display = "";
    containerHistory.classList.add("invisible");
    btnBack.classList.add("invisible")
    btnBack.style.display = "";
    iconWorld.style.display = "grid";
    iconUpdate.style.display = "none";
    warMsg.innerHTML = "";  
}

const removeCardLocalStorage = e=>{
    if(!e.target.classList.contains("close"))return;
    const filterID = Number(e.target.dataset.id);
    console.log(filterID)
    if(window.confirm('¿Estas seguro que quieres eliminar esta ciudad del historial? ')){
        
        cities = cities.filter(city => city.id !== filterID)
        let newListCity = cities.reduce((a,b)=>{
            if(!a.find(c => c.name == b.name)){
                a.push(b)
            }
            return a;
        },[]);
        renderhistory(newListCity);
        saveLocalStorage(newListCity)
        warningMsg("Ciudad Elimiada")
    }
}