// Get references to form elements
const countySelect = document.getElementById('county');
const subcountySelect = document.getElementById('subcounty');

// Define an object with subcounties for each county
const subcounties = {
    'nairobi': ['Westlands', 'Lang'ata', 'Embakasi', 'Kasarani'],
    'mombasa': ['Mvita', 'Kisauni', 'Nyali', 'Likoni']
    // Add more counties and subcounties as needed
};

// Function to populate subcounties based on selected county
function populateSubcounties() {
    const selectedCounty = countySelect.value;
    const subcountyOptions = subcounties[selectedCounty] || [];

    // Clear existing options
    subcountySelect.innerHTML = '';

    // Populate with new options
    subcountyOptions.forEach(subcounty => {
        const option = document.createElement('option');
        option.textContent = subcounty;
        option.value = subcounty;
        subcountySelect.appendChild(option);
    });
}

// Add event listener to county select to dynamically populate subcounties
countySelect.addEventListener('change', populateSubcounties);

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
