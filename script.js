const weatherform = document.querySelector(".weatherform");
const cityinput =  document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "f699f0bb7fa9526c616d75e692fa95c2";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityinput.value;

    if(city){
        try {
                const weatherdata = await getweatherdata(city);
                displayWeatherInfo(weatherdata);
        } catch (error) {
            console.log(error);
            displayerror(error);
        }
    }
    else{
        displayerror("please enter the city");
    }
}   
)


async function getweatherdata(city){
    const apicall  =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apicall);

    if(!response.ok){
        displayerror("could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
     const {name: city,
        main: {temp, humidity},
        weather: [{description, id}]
    } = data;

    card.textContent="";
    card.style.display = "flex";

    const displaycity = document.createElement("p");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const displaydesc = document.createElement("p");
    const emojidisplay = document.createElement("p");


    displaycity.textContent = city;
    tempdisplay.textContent = `${(temp -273.15).toFixed(1)}°c`;
    humiditydisplay.textContent = `Humidity: ${humidity}`;
    displaydesc.textContent =  description;
    emojidisplay.textContent = getWeatherEmoji(id);
    
    displaycity.classList.add("displaycity");
    tempdisplay.classList.add("displaytemp");
    humiditydisplay.classList.add("displayhumidity");
    displaydesc.classList.add("displayDesc");
    emojidisplay.classList.add("displayemoji");
 

    card.appendChild(displaycity);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(displaydesc);
    card.appendChild(emojidisplay);


}

function getWeatherEmoji(weatherID){


    switch(true){
        case(weatherID >= 200 && weatherID < 300):
            return "⛈️"
        case(weatherID >= 300 && weatherID < 400):
            return "🌩️"
        case(weatherID >= 500 && weatherID < 600):
            return "🌧️"
        case(weatherID >= 600 && weatherID < 700):
            return "❄️"
        case(weatherID >= 700 && weatherID < 800):
            return "🌫️"
        case(weatherID === 800):
            return "☀️"
        case(weatherID >= 800 && weatherID < 810):
            return "⛅"
        default:
            return "???";
    }
}


function displayerror(message){
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("displayerror");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
