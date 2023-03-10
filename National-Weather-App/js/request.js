const KEY = '8e99183ac22ab0aeb4e9bb4e89a4da31';
const keyTime = `90e0ba61eeb34583a89454a1b5565268`;

export const requestCity = async(city)=>{
    const URL = `https://api.openweathermap.org/data/2.5/weather`;
    const query = `?q=${city}&appid=${KEY}`;

    const response = await fetch(`${URL}${query}`);

    const data = await response.json();

    return data;
};

export const requestTime = async(city)=>{
    const URL = `https://timezone.abstractapi.com/v1/current_time/?`;
    const query = `api_key=${keyTime}&location=${city}`;
    const response = await fetch(`${URL}${query}`);
    const data = response.json();
    return data 

}

