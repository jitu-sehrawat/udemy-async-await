// USD, CAD, 20
// 20 USD is worth 26 CAD. You can speend them in following countries: Canada

// http://data.fixer.io/api/latest?access_key=dc750cab6331c1d1c55875eceac5bdcd
// https://restcountries.eu/rest/v2/currency/inr

const axios = require('axios');

// const getExchangeRate = (from, to) => {
//   return axios.get('http://data.fixer.io/api/latest?access_key=dc750cab6331c1d1c55875eceac5bdcd')
//     .then((response) => {
//       const euro = 1 / response.data.rates[from];
//       const rate = euro * response.data.rates[to];

//       return rate;
//     });
// }

// const getCountries = (currencyCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
//     .then((response) => {
//       return response.data.map((country) => country.name);
//     });
// }

// const convertCurrenct = (from, to , amount) => {
//   let convertedAmount;

//   return getExchangeRate(from, to).then((rate) => {
//    convertedAmount = (rate*amount).toFixed(2);
//     return getCountries(to);
//   }).then((countries) => {
//     return `${amount} ${from} is worth ${convertedAmount} ${to}. You can speend them in following countries: ${countries.join(', ')}`;
//   });
// }

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=dc750cab6331c1d1c55875eceac5bdcd');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }
    return rate;
  } catch (e) {
    throw new Error(`Unable to get Exchange rate for ${from} and ${to}`);
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);  
  } catch (e) {
    throw new Error(`Unable to get Countries that use : ${currencyCode}`);
  }

}

const convertCurrenct = async (from, to , amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (rate*amount).toFixed(2); 
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can speend them in following countries: ${countries.join(', ')}`;
}

convertCurrenct('USD', 'INR', 20).then((result) => {
  console.log(result)
}).catch((e) => {
  console.log(e.message);
});