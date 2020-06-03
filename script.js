const form =  document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const endPoint = "https://api.covid19api.com/summary";
const countries = [];

fetch('https://api.covid19api.com/summary')
.then(response => response.json())
.then(data => countries.push(...data.Countries));

function findCountry(wordTomatch, cities){
    return countries.filter(place => {
        const regex = new RegExp(wordTomatch, 'gi');
        return place.Country.match(regex);
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  function displayCountry(){
      const matchArray = findCountry(this.value, countries);
      const html = matchArray.map(place => {
          return `  
          <span class="name">${place.Country}</span>
          <span>New Deaths:<em>${numberWithCommas(place.NewDeaths)}</em></span>
          <span>Total Deaths:<em>${numberWithCommas(place.TotalDeaths)}</em></span>
          <span>New Confirmed:<em>${numberWithCommas(place.NewConfirmed)}</em></span>
          <span>Total Confirmed:<em>${numberWithCommas(place.TotalConfirmed)}</em></span>
          <span>New Recovered:<em>${numberWithCommas(place.NewRecovered)}</em></span>
          <span>Total Recovered:<em>${numberWithCommas(place.TotalRecovered)}</em></span>
          <span class="population"></span>
          `
      }).join('');
      suggestions.innerHTML = html;
  }

form.addEventListener('change', displayCountry);
form.addEventListener('keyup', displayCountry);

