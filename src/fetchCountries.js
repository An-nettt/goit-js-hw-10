import Notiflix from 'notiflix';

export class FetchCountriesAPI {
  #BASE_URL = 'https://restcountries.com/v3.1';

  fetchCountries(name) {
    return fetch(
      `${this.#BASE_URL}/name/${
        this.name
      }?fields=name,capital,population,flags,languages`
    ).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }
}
