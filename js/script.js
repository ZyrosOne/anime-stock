// --- CONFIGURATION ---  
let currentPage = 1;  
const itemsPerPage = 12; // Nombre d'animes par page  
let currentFilter = 'all';  
let currentSearch = '';  
let filteredData = [];  
  
// --- INITIALISATION ---  
document.addEventListener('DOMContentLoaded', () => {  
    loadTheme();  
    filterData(); // Charge les données au démarrage  
    setupMobileMenu();  
});  
  
// --- GESTION DU THÈME ---  
function toggleTheme() {  
    const body = document.body;  
    const currentTheme = body.getAttribute('data-theme');  
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';  
      
    body.setAttribute('data-theme', newTheme);  
    document.getElementById('themeIcon').textContent = newTheme === 'light' ? '☀️' : '🌙';  
    localStorage.setItem('theme', newTheme);  
}  
  
function loadTheme() {  
    const savedTheme = localStorage.getItem('theme') || 'dark';  
    document.body.setAttribute('data-theme', savedTheme);  
    document.getElementById('themeIcon').textContent = savedTheme === 'light' ? '☀️' : '🌙';  
}  
  
// --- MENU MOBILE ---  
function toggleMenu() {  
    document.getElementById('navLinks').classList.toggle('active');  
}  
  
function setupMobileMenu() {  
    document.querySelectorAll('.nav-links a').forEach(link => {  
        link.addEventListener('click', () => {  
            document.getElementById('navLinks').classList.remove('active');  
        });  
    });  
}  
  
// --- RECHERCHE ET FILTRES ---  
document.getElementById('searchInput').addEventListener('input', (e) => {  
    currentSearch = e.target.value.toLowerCase();  
    currentPage = 1;   
    filterData();  
});  
  
function filterCategory(category, btnElement) {  
    currentFilter = category;  
    currentPage = 1;  
  
    // Mise à jour visuelle des boutons  
    if (btnElement) {  
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));  
        // Vérifie si le bouton cliqué est un bouton de catégorie (et non du menu)  
        if (btnElement.classList.contains('category-btn')) {  
            btnElement.classList.add('active');  
        }  
    }  
      
    filterData();  
}  
  
// Logique de filtrage principale  
function filterData() {  
    filteredData = animeData.filter(anime => {  
        const matchesSearch = anime.title.toLowerCase().includes(currentSearch);  
        let matchesCategory = true;  
  
        if (currentFilter === 'vf') {  
            matchesCategory = anime.type.includes('VF');  
        } else if (currentFilter === 'nouveaute') {  
            matchesCategory = anime.year >= 2023;  
        } else if (currentFilter !== 'all') {  
            matchesCategory = anime.category === currentFilter;  
        }  
  
        return matchesSearch && matchesCategory;  
    });  
  
    renderGrid();  
    updatePaginationControls();  
}  
  
// --- RENDU GRAPHIQUE ---  
function renderGrid() {  
    const grid = document.getElementById('animeGrid');  
    grid.innerHTML = '';  
  
    const start = (currentPage - 1) * itemsPerPage;  
    const end = start + itemsPerPage;  
    const pageItems = filteredData.slice(start, end);  
  
    if (pageItems.length === 0) {  
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">Aucun anime trouvé pour cette recherche.</p>';  
        return;  
    }  
  
    pageItems.forEach(anime => {  
        // Création de la carte  
        const card = document.createElement('a');  
        card.href = `anime.html?id=${anime.id}`;  
        card.className = 'anime-card';  
        card.innerHTML = `  
            <div class="anime-poster" style="background-image: url('${anime.poster}')">  
                <span class="anime-badge">${anime.type}</span>  
            </div>  
            <div class="anime-info">  
                <div class="anime-title">${anime.title}</div>  
                <div class="anime-meta">  
                    <span>${anime.episodes} ép.</span>  
                    <span style="color: #ffb142">★ ${anime.rating}</span>  
                </div>  
            </div>  
        `;  
        grid.appendChild(card);  
    });  
}  
  
// --- PAGINATION ---  
function changePage(direction) {  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);  
    const nextPage = currentPage + direction;  
  
    if (nextPage >= 1 && nextPage <= totalPages) {  
        currentPage = nextPage;  
        renderGrid();  
        updatePaginationControls();  
        // Remonte en haut de la grille doucement  
        document.querySelector('.anime-grid').scrollIntoView({ behavior: 'smooth' });  
    }  
}  
  
function updatePaginationControls() {  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);  
    const prevBtn = document.getElementById('prevBtn');  
    const nextBtn = document.getElementById('nextBtn');  
    const indicator = document.getElementById('pageIndicator');  
  
    if (totalPages <= 1) {  
        prevBtn.style.display = 'none';  
        nextBtn.style.display = 'none';  
        indicator.style.display = 'none';  
        return;  
    }  
  
    prevBtn.style.display = 'inline-block';  
    nextBtn.style.display = 'inline-block';  
    indicator.style.display = 'inline';  
  
    prevBtn.disabled = currentPage === 1;  
    nextBtn.disabled = currentPage === totalPages;  
    indicator.textContent = `Page ${currentPage} / ${totalPages}`;  
}