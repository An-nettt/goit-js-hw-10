import { FetchCountriesAPI } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
  infoEl: document.querySelector('.country-info'),
};
const fetchCountriesAPI = new FetchCountriesAPI();

refs.inputEl.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch() {
  fetchCountriesAPI.name = refs.inputEl.value.trim();

  if (fetchCountriesAPI.name !== '') {
    refs.listEl.innerHTML = '';
    refs.infoEl.innerHTML = '';
    fetchCountriesAPI.fetchCountries().then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if ((data.length < 10) & (data.length > 2)) {
        const markuplist = data
          .map(
            element =>
              `<li class="list-item">
              <img src='${element.flags.svg}' class='country-img' />
               ${element.name.official} 
               </li>`
          )
          .join('');
        refs.infoEl.innerHTML = '';
        refs.listEl.innerHTML = markuplist;
      }
      if (data.length === 1) {
        const markupInfo = data.map(
          element =>
            `<div class="country"><img src='${element.flags.svg}' alt='${
              element.flags.svg
            }' class='country-img' />
            <h2>${element.name.official}</h2></div>
            <div class="headers">Capital:<span class='value'>${
              element.capital
            }</span></div>
            <div class="headers">Population:<span class='value'>${
              element.population
            }</span></div>
            <div class="headers">Languages: <span class='value'>${Object.values(
              element.languages
            )}</span></div>`
        );

        refs.listEl.innerHTML = '';
        refs.infoEl.innerHTML = markupInfo;
      }
    });
  }
}
