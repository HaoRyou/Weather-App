const weatherdisplay = document.getElementById('Weatherdisplay');
let iscelsius = false;

async function getData(location) {
  try {
    const info = document.createElement('textarea');
    const title = document.createElement('h1');
    const change = document.getElementById('change');
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=VZM8A95BRVWLUGE6BMFMF2J65&contentType=json`,
      { mode: 'cors' }
    );
    const data = await response.json();
    console.log(data);
    info.textContent = `The Fahrenheit is ${data.currentConditions.temp} F`;
    change.addEventListener('click', function(){
      iscelsius =!iscelsius;
      updatedisplay();
    });

    function updatedisplay(){
      if(iscelsius == true){
      info.textContent = `The Celsius is ${fahrenheitToCelsius(data.currentConditions.temp).toFixed(2)} C`;
        change.textContent = 'Change to Fahrenheit';
      }
      else{
        info.textContent = `The Fahrenheit is ${data.currentConditions.temp} F`;
        change.textContent = 'Change to Celsius';
      }
    }
    
    title.textContent = data.resolvedAddress;
    weatherdisplay.appendChild(title);
    weatherdisplay.appendChild(info);

  } catch (error) {
    alert("Error fetching weather: " + error);
  }
}

// Call it
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

function celsiusToFahrenheit(c) {
  return (c * 9 / 5) + 32;
}

function clearscreen(){
  while(weatherdisplay.firstChild){
    weatherdisplay.removeChild(weatherdisplay.firstChild);
  }
}