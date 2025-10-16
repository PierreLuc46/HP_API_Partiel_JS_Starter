const API_URL = 'https://hp-api.onrender.com/api/characters';
let allCharactersData = [];
const MAX_CHARACTERS = 12;

const charactersContainer = document.querySelector('.characters-container');
const houseFilters = document.querySelectorAll('.house-card');

async function fetchCharacters() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
       
        allCharactersData = data.slice(0, MAX_CHARACTERS); 
    
        displayCharacters(allCharactersData);
    } catch (error) {
        console.error("Erreur de chargement des personnages:", error);
        charactersContainer.innerHTML = `<p style="text-align: center; color: red;">Impossible de charger les données de l'API. (Vérifiez la connexion)</p>`;
    }
}

function displayCharacters(charactersToDisplay) {
    charactersContainer.innerHTML = ''; 

    charactersToDisplay.forEach(character => {
        const charIdentifier = character.id || character.name.toLowerCase().replace(/\s/g, '-');
        const houseName = character.house || 'None';

        const card = document.createElement('div');
        card.className = 'character-card';
        card.setAttribute('data-house', houseName);
        
        card.addEventListener('click', () => {
             
             window.location.href = `details.html?id=${charIdentifier}`;
        });

        
        card.innerHTML = `
            <div class="character-circle">
                <img src="${character.image || './images/placeholder.jpg'}" alt="${character.name}">
            </div>
            <p class="character-name">${character.name}</p>
        `;
        charactersContainer.appendChild(card);
    });
}

function filterAndSortCharacters(house) {
    let filteredCharacters = allCharactersData;
    if (house && house !== 'All') {
        filteredCharacters = filteredCharacters.filter(char => char.house === house);
    }
    filteredCharacters.sort((a, b) => a.name.localeCompare(b.name));
    displayCharacters(filteredCharacters);
}



document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters(); 

    houseFilters.forEach(card => {
        card.addEventListener('click', (event) => {
            const clickedCard = event.currentTarget;
            houseFilters.forEach(c => c.classList.remove('active'));
            clickedCard.classList.add('active');
            
            const selectedHouse = clickedCard.getAttribute('data-house');
            filterAndSortCharacters(selectedHouse);
        });
    });
});