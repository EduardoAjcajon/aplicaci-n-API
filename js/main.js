document.getElementById('search-button').addEventListener('click', function() {
    const countryName = document.getElementById('country-input').value.trim();
    if (countryName) {
        fetchCountryData(countryName);
    } else {
        alert('Please enter a country name');
    }
});

function fetchCountryData(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            displayCountryInfo(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayCountryInfo(countries) {
    const countryInfoDiv = document.getElementById('country-info');
    countryInfoDiv.innerHTML = ''; // Clear previous results

    countries.forEach(country => {
        const countryItem = document.createElement('div');
        countryItem.className = 'country-item';

        countryItem.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><b>Capital:</b> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
            <p><b>Area:</b> ${country.area.toLocaleString()} km²</p>
            <p><b>Currency:</b> ${Object.values(country.currencies || {}).map(c => c.name).join(', ') || 'N/A'}</p>
            <p><b>Language:</b> ${Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
        `;

        countryInfoDiv.appendChild(countryItem);
    });
}
