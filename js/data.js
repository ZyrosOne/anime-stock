// Données des animes (Base de données simulée)  
// IMPORTANT : Les images doivent être dans le dossier "images/"  
  
const animeData = [  
    {  
        id: 1,  
        title: "One Piece",  
        episodes: "1100+",  
        type: "VF/VOSTFR",  
        category: "action",  
        rating: 4.9,  
        year: 1999,  
        status: "En cours",  
        synopsis: "Luffy, un jeune garçon, rêve de devenir le Roi des Pirates en trouvant le One Piece, le trésor ultime laissé par Gol D. Roger.",  
        poster: "images/one-piece.jpg"   
    },  
    {  
        id: 2,  
        title: "Demon Slayer",  
        episodes: "55",  
        type: "VF/VOSTFR",  
        category: "action",  
        rating: 4.8,  
        year: 2019,  
        status: "En cours",  
        synopsis: "Tanjirō cherche un moyen de rendre à sa petite sœur Nezuko son humanité après qu'elle a été transformée en démon.",  
        poster: "images/demon-slayer.jpg"  
    },  
    {  
        id: 3,  
        title: "Spy x Family",  
        episodes: "37",  
        type: "VF/VOSTFR",  
        category: "comedie",  
        rating: 4.7,  
        year: 2022,  
        status: "En cours",  
        synopsis: "Un espion, un assassin et une télépathe forment une fausse famille pour maintenir la paix entre deux nations.",  
        poster: "images/spy-x-family.jpg"  
    },  
    {  
        id: 4,  
        title: "L'Attaque des Titans",  
        episodes: "89",  
        type: "VF/VOSTFR",  
        category: "drame",  
        rating: 5.0,  
        year: 2013,  
        status: "Terminé",  
        synopsis: "L'humanité vit entourée d'immenses murs pour se protéger de créatures gigantesques, les Titans.",  
        poster: "images/snk.jpg"  
    },  
    {  
        id: 5,  
        title: "Jujutsu Kaisen",  
        episodes: "47",  
        type: "VF/VOSTFR",  
        category: "action",  
        rating: 4.8,  
        year: 2020,  
        status: "En cours",  
        synopsis: "Yuji Itadori avale un doigt maudit pour sauver ses amis et devient l'hôte du puissant fléau Ryomen Sukuna.",  
        poster: "images/jujutsu-kaisen.jpg"  
    },  
    {  
        id: 6,  
        title: "Blue Lock",  
        episodes: "24",  
        type: "VF/VOSTFR",  
        category: "shonen",  
        rating: 4.6,  
        year: 2022,  
        status: "En cours",  
        synopsis: "Le Japon lance le projet Blue Lock pour créer l'attaquant ultime capable de mener le pays à la victoire en Coupe du Monde.",  
        poster: "images/blue-lock.jpg"  
    },  
    // --- Génération automatique de faux animes pour tester la pagination ---  
    ...Array.from({ length: 30 }, (_, i) => ({  
        id: 100 + i,  
        title: `Anime Test ${i + 1}`,  
        episodes: "12",  
        type: i % 3 === 0 ? "VOSTFR" : "VF",  
        category: i % 2 === 0 ? "aventure" : "fantasy",  
        rating: (Math.random() * 2 + 3).toFixed(1),  
        year: 2023,  
        status: "Terminé",  
        synopsis: "Ceci est un anime généré automatiquement pour tester la pagination et les filtres du site.",  
        // Utilise une image par défaut ou répète les précédentes si tu n'as pas 40 images  
        poster: "images/demon-slayer.jpg"   
    }))  
];