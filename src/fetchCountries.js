import Notiflix from 'notiflix';

export class FetchCountriesAPI {
  #BASE_URL = 'https://restcountries.com/v3.1';

  name = null;

  fetchCountries(name) {
    return fetch(
      `${this.#BASE_URL}/name/${
        this.name
      }?fields=name,capital,population,flags,languages`
    ).then(res => {
      if (!res.ok) {
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
      return res.json();
    });
  }
}
