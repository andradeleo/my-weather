const apiKey = "a598f1bdf807f884c0d6664018971c7e"; // minha key da api
const apiCountryURL = "https://countryflagsapi.com/png/"; // mostrar bandeira do pais 

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funções

const getWeatherData = async(city) => { // async pois temos que esperar a resposta da API
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL); // await espera a consulta na API
    const data = await res.json();
    
    return data;
} 

const showWeatherData = async (city) => {

    const data = await getWeatherData(city);  
  
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
  
  
    weatherContainer.classList.remove("hide");
}

// Eventos 

cityInput.addEventListener("keyup", (e) => { // funcionar a pesquisa com tecla enter
    if (e.code === "Enter") {
      const city = e.target.value;
  
      showWeatherData(city);
    }
  });



searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city);
})