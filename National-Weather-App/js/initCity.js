import { requestCity, requestTime } from "./request.js";
import { renderCitiesList, saveLocalStorage } from "./main.js";


export const InitCity = async city =>{
    const fetchedCity = await requestCity("cordoba");
    const fetchTime = await requestTime("Cordoba");
    city = [fetchedCity, ...city];
    let newListCity = city.reduce((a,b)=>{
        if(!a.find(c => c.name == b.name)){
            a.push(b)
        }

        return a;
    },[]);

    

    

    renderCitiesList(newListCity, fetchedCity, fetchTime);
    saveLocalStorage(newListCity);

    
}