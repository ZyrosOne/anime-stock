document.addEventListener('DOMContentLoaded', () => {  
    // Charge le thème sauvegardé  
    const savedTheme = localStorage.getItem('theme') || 'dark';  
    document.body.setAttribute('data-theme', savedTheme);  
    document.getElementById('themeIcon').textContent = savedTheme === 'light' ? '☀️' : '🌙';  
  
    // Récupère l'ID dans l'URL  
    const urlParams = new URLSearchParams(window.location.search);  
    const animeId = parseInt(urlParams.get('id'));  
  
    // Trouve l'anime correspondant  
    const anime = animeData.find(a => a.id === animeId);  
  
    if (anime) {  
        renderDetails(anime);  
        renderRecommendations(anime);  
    } else {  
        document.getElementById('animeDetails').innerHTML = '<h2 style="text-align:center">Anime introuvable 😢</h2>';  
    }  
});  
  
// Fonction pour changer le thème (copiée pour simplifier)  
function toggleTheme() {  
    const body = document.body;  
    const currentTheme = body.getAttribute('data-theme');  
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';  
    body.setAttribute('data-theme', newTheme);  
    document.getElementById('themeIcon').textContent = newTheme === 'light' ? '☀️' : '🌙';  
    localStorage.setItem('theme', newTheme);  
}  
  
function renderDetails(anime) {  
    const container = document.getElementById('animeDetails');  
    container.innerHTML = `  
        <div class="details-container">  
            <div class="details-poster" style="background-image: url('${anime.poster}')"></div>  
            <div class="details-info">  
                <h1 class="details-title">${anime.title}</h1>  
                <div class="anime-meta" style="margin-bottom: 1rem; font-size: 1rem;">  
                    <span style="margin-right: 15px">📅 ${anime.year}</span>  
                    <span style="margin-right: 15px">📺 ${anime.episodes} épisodes</span>  
                    <span style="margin-right: 15px">⭐ ${anime.rating}/5</span>  
                    <span style="color: var(--accent); font-weight: bold;">${anime.status}</span>  
                </div>  
                  
                <p class="details-synopsis">${anime.synopsis}</p>  
                  
                <div style="margin-top: 2rem;">  
                    <a href="#" class="btn">▶ Regarder l'épisode 1</a>  
                    <button class="btn btn-secondary">✚ Ajouter à ma liste</button>  
                </div>  
  
                <div style="margin-top: 2rem;">  
                    <h4>Genres :</h4>  
                    <span class="category-btn" style="cursor: default; display: inline-block; margin-top: 0.5rem; background: var(--accent); border: none;">${anime.category.toUpperCase()}</span>  
                    <span class="category-btn" style="cursor: default; display: inline-block; margin-top: 0.5rem;">${anime.type}</span>  
                </div>  
            </div>  
        </div>  
    `;  
}  
  
function renderRecommendations(currentAnime) {  
    const grid = document.getElementById('recommendationsGrid');  
      
    // Logique de recommandation : même catégorie, exclure l'actuel, max 4 items  
    const recommendations = animeData  
        .filter(a => a.category === currentAnime.category && a.id !== currentAnime.id)  
        .slice(0, 4);  
  
    if (recommendations.length === 0) {  
        grid.innerHTML = '<p style="color: var(--text-muted)">Aucune recommandation pour le moment.</p>';  
        return;  
    }  
  
    recommendations.forEach(anime => {  
        const card = document.createElement('a');  
        card.href = `anime.html?id=${anime.id}`;  
        card.className = 'anime-card';  
        card.innerHTML = `  
            <div class="anime-poster" style="background-image: url('${anime.poster}')">  
                <span class="anime-badge">${anime.type}</span>  
            </div>  
            <div class="anime-info">  
                <div class="anime-title">${anime.title}</div>  
            </div>  
        `;  
        grid.appendChild(card);  
    });  
}