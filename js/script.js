const API_URL = 'https://hp-api.onrender.com/api/characters';
let allCharactersData = [];
const MAX_CHARACTERS = 12;

// ----------------------------------------------------------------------
// 2.1 : Intégrer dynamiquement les 12 premiers personnages
// ----------------------------------------------------------------------

async function fetchCharacters() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        
        allCharactersData = data.slice(0, MAX_CHARACTERS); 
        
        displayCharacters(allCharactersData);
    } catch (error) {
        console.error("Erreur lors de la récupération des personnages:", error);
        document.querySelector('.characters-container').innerHTML = 
            `<p style="text-align: center; color: red;">Impossible de charger les données de l'API. (Vérifiez votre connexion ou l'API).</p>`;
    }
}

function displayCharacters(charactersToDisplay) {
    const charactersContainer = document.querySelector('.characters-container');
    charactersContainer.innerHTML = ''; 
    
    charactersToDisplay.forEach(character => {
    
        const charIdentifier = character.id || character.name.toLowerCase().replace(/\s/g, '-');
        const houseName = character.house || '';

        const characterCardHTML = `
            <div class="character-card" 
                 data-house="${houseName}" 
                 onclick="navigateToDetails('${charIdentifier}')"> 
                <div class="character-circle">
                    <img src="${character.image || './images/placeholder.jpg'}" alt="${character.name}">
                </div>
                <p class="character-name">${character.name}</p>
            </div>
        `;
        charactersContainer.innerHTML += characterCardHTML;
    });
}