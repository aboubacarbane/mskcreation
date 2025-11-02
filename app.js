// Gestion du menu mobile
const boutonMenu = document.getElementById('boutonMenu');
const menuMobile = document.getElementById('menuMobile');

boutonMenu.addEventListener('click', () => {
    menuMobile.classList.toggle('actif');
    boutonMenu.classList.toggle('actif');
});

// Fermeture du menu mobile lors du clic sur un lien
const liensMobile = document.querySelectorAll('.lien-mobile');
liensMobile.forEach(lien => {
    lien.addEventListener('click', () => {
        // Ajout de la classe active au lien cliqué
        liensMobile.forEach(l => l.classList.remove('active'));
        lien.classList.add('active');
        
        menuMobile.classList.remove('actif');
        boutonMenu.classList.remove('actif');
    });
});

// Fermeture du menu mobile lors du clic sur le bouton contact mobile
const boutonContactMobile = document.querySelector('.bouton-contact-mobile');
if (boutonContactMobile) {
    boutonContactMobile.addEventListener('click', () => {
        menuMobile.classList.remove('actif');
        boutonMenu.classList.remove('actif');
    });
}

// Données des réalisations
const realisations = [
    {
        badge: 'Expert Finance',
        nom: 'Andreas Maack',
        handle: '@andreasmaack_',
        abonnes: '22.9K',
        description: '💰 Expert en finance, guide pour épargner et investir intelligemment.',
        video: 'https://player.vimeo.com/video/1066106524?h=6d45c0f810&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player0&background=1&app_id=58479',
        couleur: ['#ef4444', '#dc2626']
    },
    {
        badge: 'Gestionnaire patrimonial',
        nom: 'Gerald Lapointe',
        handle: '@geraldimmopatrimoine',
        abonnes: '17.7K',
        description: '💸 Expert en gestion de patrimoine ayant réalisé plus de 200 projets immobiliers avec succès.',
        video: 'https://player.vimeo.com/video/1066109636?h=6f9a86b6d3&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player1&background=1&app_id=58479',
        couleur: ['#a855f7', '#7e22ce']
    },
    {
        badge: 'Podcasteur',
        nom: 'Nico - Osez By Nico',
        handle: '@osezbynico',
        abonnes: '17.4K',
        description: '🎙️ Podcasteur et journaliste produisant du contenu vidéo et audio sur divers sujets.',
        video: 'https://player.vimeo.com/video/1066110013?h=07be361f94&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player2&background=1&app_id=58479',
        couleur: ['#eab308', '#d97706']
    },
    {
        badge: 'Entrepreneur',
        nom: 'Tom Adrien',
        handle: '@tomadrien',
        abonnes: '6.6K',
        description: '🎥 Entrepreneur ayant créé orsay.ai, une plateforme innovante pour la gestion de projets et la collaboration en ligne.',
        video: 'https://player.vimeo.com/video/1066107128?h=ab229066e0&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player3&background=1&app_id=58479',
        couleur: ['#3b82f6', '#1d4ed8']
    },
    {
        badge: 'Entrepreneur',
        nom: 'Romain Reverchon',
        handle: '@romain_reverchon',
        abonnes: '1.3K',
        description: '💶 Entrepreneur aidant les clients à optimiser la rentabilité de leurs marques.',
        video: 'https://player.vimeo.com/video/1066109193?h=33811542f7&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=player4&background=1&app_id=58479',
        couleur: ['#22c55e', '#059669']
    }
];

// Gestion du carrousel
const flecheGauche = document.getElementById('flecheGauche');
const flecheDroite = document.getElementById('flecheDroite');
const indicateurs = document.querySelectorAll('.indicateur');
const carte = document.querySelector('.colonne-gauche .carte-realisation');
const cadre = document.querySelector('.cadre-video');
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
        iframe.allow = 'autoplay; fullscreen; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;';
        if (i === 0) {
            iframe.style.opacity = '1';
            iframe.style.zIndex = '1';
        } else {
            iframe.style.opacity = '0';
            iframe.style.zIndex = '0';
            iframe.style.pointerEvents = 'none';
        }
        videoContainer.appendChild(iframe);
        
        // Initialisation du player Vimeo
        if (typeof Vimeo !== 'undefined') {
            const player = new Vimeo.Player(iframe);
            players.push(player);
        } else {
            players.push(null);
        }
    });
}

// Fonction d'initialisation complète
function initialiser() {
    initVideos();
    mettreAJour();
}

// Attendre que l'API Vimeo soit chargée et initialiser tout
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiser);
} else {
    setTimeout(initialiser, 100);
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
    
    // Mise à jour du texte - récupération des éléments à chaque fois
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
    
    // Mise à jour des couleurs
    const [c1, c2] = r.couleur;
    const rgb = hexToRgb(c1);
    
    // Appliquer la couleur au badge
    if (badgeEl) {
        badgeEl.style.background = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
    }
    
    // Appliquer la couleur au cadre vidéo
    if (cadre) {
        cadre.style.background = `linear-gradient(to right, ${c1} 0%, ${c2} 100%)`;
        cadre.style.boxShadow = `0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`;
    }
    
    // Nom en noir
    if (nomEl) {
        nomEl.style.color = '#000000';
    }
    
    // Affichage de la vidéo
    chargerVideo(index);
    
    // Mise à jour des indicateurs
    indicateurs.forEach((ind, i) => {
        ind.classList.toggle('actif', i === index);
    });

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
    index--;
    if (index < 0) {
        index = realisations.length - 1;
    }
    mettreAJour();
});

flecheDroite.addEventListener('click', () => {
    index++;
    if (index >= realisations.length) {
        index = 0;
    }
    mettreAJour();
});

indicateurs.forEach((ind, i) => {
    ind.addEventListener('click', () => {
        index = i;
        mettreAJour();
    });
});

// Navigation au scroll
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
        
        // Fermeture de tous les autres items
        document.querySelectorAll('.item-faq').forEach(item => {
            item.classList.remove('actif');
        });
        
        // Ouverture de l'item cliqué si ce n'était pas déjà actif
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

// Observation des cartes d'expertise
const cartesExpertise = document.querySelectorAll('.carte-expertise');
cartesExpertise.forEach((carte, index) => {
    carte.classList.add('anime-scroll');
    carte.style.transitionDelay = `${index * 0.1}s`;
    observateur.observe(carte);
});

// Observation des cartes de réalisation
const cartesRealisation = document.querySelectorAll('.carte-realisation');
cartesRealisation.forEach((carte, index) => {
    carte.classList.add('anime-scroll');
    carte.style.transitionDelay = `${index * 0.1}s`;
    observateur.observe(carte);
});


// Effet de particules
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

// Animation CSS des particules
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

// Smooth scroll des liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(lien => {
    lien.addEventListener('click', function(e) {
        e.preventDefault();
        const cibleId = this.getAttribute('href');
        
        if (cibleId === '#') return;
        
        // Fermeture du menu mobile si ouvert
        if (menuMobile && menuMobile.classList.contains('actif')) {
            menuMobile.classList.remove('actif');
            if (boutonMenu) boutonMenu.classList.remove('actif');
        }
        
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

// Préchargement terminé - ajout de la classe charge
window.addEventListener('load', () => {
    document.body.classList.add('charge');
});

// Gestion du redimensionnement de la fenêtre
let timeoutRedimensionnement;
window.addEventListener('resize', () => {
    clearTimeout(timeoutRedimensionnement);
    timeoutRedimensionnement = setTimeout(() => {
        mettreAJourCarrousel();
    }, 250);
});


