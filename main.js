const weatherdisplay = document.getElementById('Weatherdisplay');
const change = document.getElementById('change');
let iscelsius = false;
let temps = 0;
let info;
function updatedisplay(){
      if(iscelsius == true){
      info.textContent = `The Celsius is ${fahrenheitToCelsius(temps).toFixed(2)} C`;
        change.textContent = 'Change to Fahrenheit';
      }
      else{
        info.textContent = `The Fahrenheit is ${temps} F`;
        change.textContent = 'Change to Celsius';
      }
    }

async function getData(location) {
  try {
    info = document.createElement('textarea');
    const title = document.createElement('h1');
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=VZM8A95BRVWLUGE6BMFMF2J65&contentType=json`,
      { mode: 'cors' }
    );
    const data = await response.json();
    console.log(data);
    temps = data.currentConditions.temp;
    info.textContent = `The Fahrenheit is ${temps} F`;
    
    title.textContent = data.resolvedAddress;
    weatherdisplay.appendChild(title);
    weatherdisplay.appendChild(info);

  } catch (error) {
    alert("Error fetching weather: " + error);
  }
}
 change.addEventListener('click', function(){
      iscelsius =!iscelsius;
      updatedisplay();
    });

getData('queens');

const button = document.getElementById('submit');

button.addEventListener('click', function(){
  clearscreen();
  const input = document.getElementById('userinput')
  getData(input.value)
  input.value = '';
})

function fahrenheitToCelsius(f) {
  return (f - 32) * 5 / 9;
}

function clearscreen(){
  while(weatherdisplay.firstChild){
    weatherdisplay.removeChild(weatherdisplay.firstChild);
  }
}