/* ==========================================================================
   Ô Cochonneries Tarnaises : barre de navigation + footer partagés.
   Ce fichier est le SEUL endroit à modifier pour changer le menu, le plan
   du site ou les infos de contact : toutes les pages l'utilisent.

   Dans chaque page HTML :
     <script src="static/js/layout.js"></script>   (dans le <head>)
     <site-header></site-header>                    (en haut du <body>)
     <site-footer></site-footer>                    (en bas du <body>)
   ========================================================================== */

/* ---------- 1. Les informations du site : à modifier ici ---------- */

const SITE = {
    nom: "Ô Cochonneries Tarnaises",
    accroche: "Charcuterie artisanale & traiteur, dans le Tarn depuis 1984.",
    adresse: "12 Rue de la République, 81000 Albi",
    horaires: "Mar - Sam : 8h30 - 19h30 | Dim : 8h30 - 13h00",
    telephone: "05 63 00 00 00",
    telephoneLien: "0563000000"
};

/* Menu du haut. "page" sert à repérer la page en cours (nom du fichier sans .html). */
const MENU = [
    { label: "Accueil",           href: "index.html#accueil" },
    { label: "Notre savoir-faire", href: "index.html#savoir-faire" },
    { label: "Origine",           href: "origine.html",  page: "origine" },
    { label: "Spécialités",       href: "index.html#produits" },
    { label: "Recettes",          href: "recettes.html", page: "recettes" },
    { label: "Nos marchés",       href: "index.html#marches" },
    { label: "Contact",           href: "index.html#contact" }
];

const BOUTON = { label: "Commander", href: "index.html#contact" };

/* Plan du site (colonnes du footer). */
const PLAN_DU_SITE = [
    {
        titre: "Découvrir",
        liens: [
            { label: "Accueil",                     href: "index.html#accueil" },
            { label: "Notre savoir-faire",          href: "index.html#savoir-faire" },
            { label: "D'où viennent nos cochons",   href: "origine.html" }
        ]
    },
    {
        titre: "Nos produits",
        liens: [
            { label: "Nos spécialités",  href: "index.html#produits" },
            { label: "Toutes les recettes", href: "recettes.html" }
        ]
    },
    {
        titre: "Nous trouver",
        liens: [
            { label: "Nos marchés",          href: "index.html#marches" },
            { label: "Contact et boutique",  href: "index.html#contact" }
        ]
    }
];

/* ---------- 2. Le code : pas besoin d'y toucher ---------- */

const PAGE_COURANTE = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "");

class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.style.display = "block";

        const liens = MENU.map(l => {
            const actif = l.page && l.page === PAGE_COURANTE;
            return actif
                ? `<a href="${l.href}" aria-current="page" class="text-charcu-accent font-semibold">${l.label}</a>`
                : `<a href="${l.href}" class="hover:text-charcu-accent transition-colors">${l.label}</a>`;
        }).join("");

        const liensMobile = MENU.map(l => {
            const actif = l.page && l.page === PAGE_COURANTE;
            return `<a href="${l.href}" ${actif ? 'aria-current="page"' : ""} class="px-4 py-3 rounded-2xl text-sm font-medium hover:bg-charcu-light ${actif ? "text-charcu-accent font-semibold" : "text-charcu-wood"}">${l.label}</a>`;
        }).join("");

        this.innerHTML = `
        <header class="fixed top-4 left-0 right-0 z-50 px-4">
            <nav class="mx-auto max-w-6xl bg-white/85 backdrop-blur-xl border border-charcu-wood/10 shadow-[0_10px_40px_rgba(42,26,23,0.08)] rounded-full px-5 md:px-7 py-3 flex items-center justify-between gap-3" aria-label="Navigation principale">
                <a href="index.html#accueil" class="font-serif text-lg md:text-xl font-semibold tracking-tight text-charcu-wood flex items-center gap-2">
                    ${SITE.nom}
                </a>

                <div class="hidden lg:flex items-center gap-6 text-sm font-medium text-charcu-wood/70">
                    ${liens}
                </div>

                <div class="flex items-center gap-2">
                    <a href="${BOUTON.href}" class="bg-charcu-wood hover:bg-charcu-accent text-white text-xs md:text-sm font-semibold px-4 md:px-5 py-2.5 rounded-full transition-all shadow-sm">
                        ${BOUTON.label}
                    </a>
                    <button type="button" id="menu-toggle" class="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-charcu-wood hover:bg-charcu-light transition-colors" aria-expanded="false" aria-controls="menu-mobile" aria-label="Ouvrir le menu">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
                    </button>
                </div>
            </nav>

            <div id="menu-mobile" class="hidden lg:hidden mx-auto max-w-6xl mt-2 bg-white/95 backdrop-blur-xl border border-charcu-wood/10 shadow-[0_10px_40px_rgba(42,26,23,0.08)] rounded-3xl p-3 flex flex-col">
                ${liensMobile}
            </div>
        </header>`;

        const bouton = this.querySelector("#menu-toggle");
        const menu = this.querySelector("#menu-mobile");
        const basculer = (ouvrir) => {
            menu.classList.toggle("hidden", !ouvrir);
            bouton.setAttribute("aria-expanded", String(ouvrir));
            bouton.setAttribute("aria-label", ouvrir ? "Fermer le menu" : "Ouvrir le menu");
        };
        bouton.addEventListener("click", () => basculer(menu.classList.contains("hidden")));
        menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => basculer(false)));
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.style.display = "block";

        const colonnes = PLAN_DU_SITE.map(col => `
            <div>
                <h2 class="font-serif text-lg font-semibold text-white">${col.titre}</h2>
                <ul class="mt-4 space-y-2.5 text-sm">
                    ${col.liens.map(l => `<li><a href="${l.href}" class="text-charcu-light/70 hover:text-charcu-gold transition-colors">${l.label}</a></li>`).join("")}
                </ul>
            </div>`).join("");

        this.innerHTML = `
        <footer class="bg-charcu-dark text-charcu-light/80">
            <div class="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr] gap-10">
                <div class="max-w-xs">
                    <a href="index.html#accueil" class="font-serif text-2xl font-semibold text-white">${SITE.nom}</a>
                    <p class="mt-4 text-sm leading-relaxed text-charcu-light/70">${SITE.accroche}</p>
                </div>

                ${colonnes}

                <div>
                    <h2 class="font-serif text-lg font-semibold text-white">La boutique</h2>
                    <ul class="mt-4 space-y-2.5 text-sm text-charcu-light/70">
                        <li>📍 ${SITE.adresse}</li>
                        <li>🕒 ${SITE.horaires}</li>
                        <li>📞 <a href="tel:${SITE.telephoneLien}" class="hover:text-charcu-gold transition-colors">${SITE.telephone}</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-white/10">
                <p class="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-6 text-xs text-charcu-light/50 text-center md:text-left">
                    © ${new Date().getFullYear()} ${SITE.nom} - Charcuterie Artisanale. Tous droits réservés.
                </p>
            </div>
        </footer>`;
    }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);