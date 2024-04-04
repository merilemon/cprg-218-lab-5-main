// TheCatAPI
const apiKey = 'live_q2PTKRwMo6QoWVovbJXib2KAtSKT19lQeWzzvP0o55TSlbLW5mYah9ydrP1eAIIM';
// endpoint for breeds
const apiUrl = "https://api.thecatapi.com/v1/breeds";

// Fetch all breeds 
fetch(apiUrl , {
    headers: {
      'x-api-key': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds');
      }
      return response.json();
    })
    .then(data => {
      const dropdown = document.getElementById('dropdown');
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        dropdown.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching data:', error));


    
// submit button
document.getElementById('submit-button').addEventListener('click', function() {
    const selectedBreedId = document.getElementById('dropdown').value;
    fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_id=${selectedBreedId}`, {
      headers: {
        'x-api-key': apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        const cardContainer = document.getElementById('option-1-results');
        cardContainer.innerHTML = ''; // Clear previous images
        data.forEach(image => {
          const imageUrl = image.url;
          const card = document.createElement('li');
          card.classList.add('card');
          card.innerHTML = `<img src="${imageUrl}" alt="Cat">`;
          cardContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching images:', error));
  });
  