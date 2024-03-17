fetch('https://api.kris.dev/ke/counties')
  .then(response => response.json())
  .then(data => {
    // Populate the county select element
    const countySelect = document.getElementById('county');
    data.data.forEach(county => {
      const option = document.createElement('option');
      option.textContent = county.county;
      option.value = county.county;
      countySelect.appendChild(option);
    });

    // Populate the subcounty select element based on the selected county
    countySelect.addEventListener('change', () => {
      const selectedCounty = countySelect.value;
      const selectedCountyData = data.data.find(item => item.county === selectedCounty);
      const subcountySelect = document.getElementById('subcounty');
      subcountySelect.innerHTML = '';
      selectedCountyData.subcounties.forEach(subcounty => {
        const option = document.createElement('option');
        option.textContent = subcounty;
        option.value = subcounty;
        subcountySelect.appendChild(option);
      });
    });
  })
  .catch(error => console.error('Error fetching data:', error));
