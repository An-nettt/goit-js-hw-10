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

  clearMarkUp();

  if (fetchCountriesAPI.name !== '') {
    fetchCountriesAPI
      .fetchCountries()
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if ((data.length < 10) & (data.length > 2)) {
          markuplist(data);
        }
        if (data.length === 1) {
          markupInfo(data);
        }
      })
      .catch(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
}

function clearMarkUp() {
  refs.listEl.innerHTML = '';
  refs.infoEl.innerHTML = '';
}

function markuplist(el) {
  const countryList = el
    .map(
      element =>
        `<li class="list-item">
              <img src='${element.flags.svg}' class='country-img' />
               ${element.name.official} 
               </li>`
    )
    .join('');

  refs.listEl.innerHTML = countryList;
}

function markupInfo(el) {
  const countryInfo = el.map(
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

  refs.infoEl.innerHTML = countryInfo;
}
