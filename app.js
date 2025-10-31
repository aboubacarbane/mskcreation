// Gestion du menu mobile
const boutonMenu = document.getElementById('boutonMenu');
const menuMobile = document.getElementById('menuMobile');

boutonMenu.addEventListener('click', () => {
    menuMobile.classList.toggle('actif');
    boutonMenu.classList.toggle('actif');
});

// Fermer le menu mobile lors du clic sur un lien
const liensMobile = document.querySelectorAll('.lien-mobile');
liensMobile.forEach(lien => {
    lien.addEventListener('click', () => {
        menuMobile.classList.remove('actif');
        boutonMenu.classList.remove('actif');
    });
});

// Données des réalisations
const realisations = [
    {
        badge: 'Expert Finance',
        nom: 'Andreas Maack',
        handle: '@andreasmaack_',
        abonnes: '22.9K',
        description: '💰 Expert en finance, guide pour épargner et investir intelligemment.',
        video: 'https://player.vimeo.com/video/1066106524?h=6d45c0f810&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player0&background=1&app_id=58479',
        couleur: ['#ff6b35', '#f7931e', '#ff4444'] // Rouge-orange pour Andreas
    },
    {
        badge: 'Coach Business',
        nom: 'Marie Dubois',
        handle: '@mariedubois.coach',
        abonnes: '18.5K',
        description: '📈 Accompagnement des entrepreneurs vers le succès et la croissance.',
        video: 'https://player.vimeo.com/video/1066109636?h=6f9a86b6d3&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player1&background=1&app_id=58479',
        couleur: ['#7c3aed', '#a855f7', '#c084fc'] // Violet pour Marie
    },
    {
        badge: 'Lifestyle',
        nom: 'Sophie Martin',
        handle: '@sophiemartin.life',
        abonnes: '35.2K',
        description: '✨ Partage de conseils lifestyle, bien-être et développement personnel.',
        video: 'https://player.vimeo.com/video/1066110013?h=07be361f94&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player2&background=1&app_id=58479',
        couleur: ['#ec4899', '#f472b6', '#fbbf24'] // Rose-jaune pour Sophie
    },
    {
        badge: 'Fitness',
        nom: 'Thomas Leroy',
        handle: '@thomasfit',
        abonnes: '42.8K',
        description: '💪 Coach sportif, programmes d\'entraînement et nutrition.',
        video: 'https://player.vimeo.com/video/1066107128?h=ab229066e0&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player3&background=1&app_id=58479',
        couleur: ['#10b981', '#34d399', '#22d3ee'] // Vert-cyan pour Thomas
    },
    {
        badge: 'Art & Créativité',
        nom: 'Lucas Moreau',
        handle: '@lucasmor.art',
        abonnes: '28.3K',
        description: '🎨 Artiste créatif, partage de techniques et d\'inspirations artistiques.',
        video: 'https://player.vimeo.com/video/1066109193?h=33811542f7&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player4&background=1&app_id=58479',
        couleur: ['#f59e0b', '#fbbf24', '#fcd34d'] // Jaune-orange pour Lucas
    }
];

// Gestion du carrousel
const flecheGauche = document.getElementById('flecheGauche');
const flecheDroite = document.getElementById('flecheDroite');
const indicateurs = document.querySelectorAll('.indicateur');
const carte = document.querySelector('.colonne-gauche .carte-realisation');
const cadre = document.querySelector('.cadre-video');
const titre = carte.querySelector('.nom-realisation');
const videoContainer = document.getElementById('vimeo-player-container');
let index = 0;
const players = [];

// Précharger toutes les vidéos
function initVideos() {
    realisations.forEach((r, i) => {
        const iframe = document.createElement('iframe');
        iframe.src = r.video;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 1.8rem;';
        if (i === 0) {
            iframe.style.opacity = '1';
            iframe.style.zIndex = '1';
        } else {
            iframe.style.opacity = '0';
            iframe.style.zIndex = '0';
            iframe.style.pointerEvents = 'none';
        }
        videoContainer.appendChild(iframe);
        
        // Initialiser le player Vimeo si disponible
        if (typeof Vimeo !== 'undefined') {
            const player = new Vimeo.Player(iframe);
            players.push(player);
        } else {
            players.push(null);
        }
    });
}

// Attendre que l'API Vimeo soit chargée
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideos);
} else {
    setTimeout(initVideos, 100);
}

function chargerVideo(idx) {
    players.forEach((player, i) => {
        const iframe = videoContainer.children[i];
        if (i === idx) {
            iframe.style.opacity = '1';
            iframe.style.zIndex = '1';
            iframe.style.pointerEvents = 'auto';
        } else {
            iframe.style.opacity = '0';
            iframe.style.zIndex = '0';
            iframe.style.pointerEvents = 'none';
        }
    });
}

function mettreAJour() {
    const r = realisations[index];
    
    // Mettre à jour le texte - récupérer les éléments à chaque fois pour éviter les problèmes de cache
    const badgeEl = carte.querySelector('.badge-realisation');
    const nomEl = carte.querySelector('.nom-realisation');
    const handleEl = carte.querySelector('.handle-realisation');
    const abonnesEl = carte.querySelector('.nombre-abonnes');
    const descriptionEl = carte.querySelector('.description-realisation');
    
    if (badgeEl) badgeEl.textContent = r.badge;
    if (nomEl) {
        nomEl.textContent = r.nom;
    }
    if (handleEl) handleEl.textContent = r.handle;
    if (abonnesEl) abonnesEl.textContent = r.abonnes;
    if (descriptionEl) descriptionEl.textContent = r.description;
    
    // Mettre à jour les couleurs
    const [c1, c2, c3] = r.couleur;
    const rgb = hexToRgb(c1);
    if (cadre) {
        cadre.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
        cadre.style.boxShadow = `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6), inset 0 0 25px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25), 0 10px 40px rgba(0, 0, 0, 0.3)`;
    }
    if (nomEl) {
        nomEl.style.color = c1;
    }
    
    // Afficher la vidéo
    chargerVideo(index);
    
    // Mettre à jour les indicateurs
    indicateurs.forEach((ind, i) => {
        ind.classList.toggle('actif', i === index);
    });
    
    // Désactiver les flèches
    flecheGauche.disabled = index === 0;
    flecheDroite.disabled = index === realisations.length - 1;
}

// Fonction pour convertir hex en RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 107, b: 53 };
}

flecheGauche.addEventListener('click', () => {
    if (index > 0) {
        index--;
        mettreAJour();
    }
});

flecheDroite.addEventListener('click', () => {
    if (index < realisations.length - 1) {
        index++;
        mettreAJour();
    }
});

indicateurs.forEach((ind, i) => {
    ind.addEventListener('click', () => {
        index = i;
        mettreAJour();
    });
});

mettreAJour();

// Navigation au scroll - effet de transparence
const navigation = document.querySelector('.navigation');
let dernierScroll = 0;

window.addEventListener('scroll', () => {
    const scrollActuel = window.pageYOffset;
    
    if (scrollActuel > 100) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }
    
    dernierScroll = scrollActuel;
});

// Gestion de la FAQ
const boutonsFaq = document.querySelectorAll('.bouton-faq');

boutonsFaq.forEach(bouton => {
    bouton.addEventListener('click', () => {
        const itemFaq = bouton.parentElement;
        const estActif = itemFaq.classList.contains('actif');
        
        // Fermer tous les autres items
        document.querySelectorAll('.item-faq').forEach(item => {
            item.classList.remove('actif');
        });
        
        // Ouvrir l'item cliqué si ce n'était pas déjà actif
        if (!estActif) {
            itemFaq.classList.add('actif');
        }
    });
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observateur = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
        if (entree.isIntersecting) {
            entree.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer les cartes d'expertise
const cartesExpertise = document.querySelectorAll('.carte-expertise');
cartesExpertise.forEach((carte, index) => {
    carte.classList.add('anime-scroll');
    carte.style.transitionDelay = `${index * 0.1}s`;
    observateur.observe(carte);
});

// Observer les cartes de réalisation
const cartesRealisation = document.querySelectorAll('.carte-realisation');
cartesRealisation.forEach((carte, index) => {
    carte.classList.add('anime-scroll');
    carte.style.transitionDelay = `${index * 0.1}s`;
    observateur.observe(carte);
});

// Observer les items FAQ
// const itemsFaq = document.querySelectorAll('.item-faq');
// itemsFaq.forEach((item, index) => {
//     item.classList.add('anime-scroll');
//     item.style.transitionDelay = `${index * 0.05}s`;
//     observateur.observe(item);
// });

// Effet de particules subtil (simplifié)
const sectionHero = document.querySelector('.section-hero');
const nombreParticules = 15;

for (let i = 0; i < nombreParticules; i++) {
    const particule = document.createElement('div');
    particule.className = 'particule';
    particule.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(124, 58, 237, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: flotteParticule ${Math.random() * 15 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
    `;
    sectionHero.appendChild(particule);
}

// Animation CSS pour les particules
const styleParticules = document.createElement('style');
styleParticules.textContent = `
    @keyframes flotteParticule {
        0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 50 - 25}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleParticules);

// Smooth scroll pour tous les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(lien => {
    lien.addEventListener('click', function(e) {
        e.preventDefault();
        const cibleId = this.getAttribute('href');
        
        if (cibleId === '#') return;
        
        const elementCible = document.querySelector(cibleId);
        if (elementCible) {
            const offsetTop = elementCible.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation des nombres dans les statistiques
function animeCompteur(element, cible, duree) {
    let debut = 0;
    const increment = cible / (duree / 16);
    
    const timer = setInterval(() => {
        debut += increment;
        if (debut >= cible) {
            element.textContent = cible + (element.dataset.suffixe || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(debut) + (element.dataset.suffixe || '');
        }
    }, 16);
}

// Observer pour lancer l'animation des compteurs
const observateurStats = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
        if (entree.isIntersecting && !entree.target.dataset.anime) {
            entree.target.dataset.anime = 'true';
            const nombresStats = entree.target.querySelectorAll('.nombre-stat');
            
            nombresStats.forEach(nombre => {
                const texte = nombre.textContent;
                const valeur = parseInt(texte);
                const suffixe = texte.replace(/[0-9]/g, '');
                nombre.dataset.suffixe = suffixe;
                nombre.textContent = '0';
                
                setTimeout(() => {
                    animeCompteur(nombre, valeur, 2000);
                }, 300);
            });
        }
    });
}, { threshold: 0.5 });

const grilleStats = document.querySelector('.grille-stats');
if (grilleStats) {
    observateurStats.observe(grilleStats);
}

// Préchargement terminé
window.addEventListener('load', () => {
    document.body.classList.add('charge');
});

// Gestion du redimensionnement de la fenêtre pour le carrousel
let timeoutRedimensionnement;
window.addEventListener('resize', () => {
    clearTimeout(timeoutRedimensionnement);
    timeoutRedimensionnement = setTimeout(() => {
        mettreAJourCarrousel();
    }, 250);
});

// Log pour confirmer que le script est chargé
console.log('MSK Création - Site Web chargé avec succès');

