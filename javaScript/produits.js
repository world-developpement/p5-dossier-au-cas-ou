const urlRecupId = window.location.search;   // recuperation de l'url de la page 
const container = document.getElementById("fiche-article");
const titleSecondary = document.getElementById("title-secondary");
const choix = document.getElementById("couleur-choix");
const addArticle = document.getElementById("add-article");
const retourCouleurs = document.getElementById("retouCouleurs");

function recuperationUrl() {                
    let searchParams = new URLSearchParams(urlRecupId);
    const urlRecup = searchParams.getAll("produit");
    api = "http://localhost:3000/api/teddies/" + urlRecup;
}
recuperationUrl();

function generateLine (teddy){                                  // creation des div pour le teddy selectionné
    return `
    <h1 class="text-center">${teddy.name}</h1>
    <img class="col-md-8 img-fluid" width="auto" height="300" src="${teddy.imageUrl}">
    <p class="font-weight-bold h3">${(teddy.price/100).toFixed(2)} €</p>
    <p class="h6">${teddy.description}</p>`
}

fetch(api)
    .then(response => response.json())
    .then(teddy => {
        
        container.innerHTML += generateLine (teddy);                // mise en place de la partie HTML dynamique

        titleSecondary.innerHTML += `${teddy.name}` // fin de la mise en page HTML dynamique

        const listOurs = teddy.colors;

        for (let i = 0; i < listOurs.length; i++) {                     // generation d'une option pour chaque couleur presente sur le seveur
            let retour = listOurs[0 + i];
            choix.innerHTML += `<option value="${retour}">${retour}</option>`
        }
        
        let oursTab = [];                                   // tableau ours 

        let oursId = {                                      // object oursId qui sera push dans le oursTab 
            name: teddy.name,
            img: teddy.imageUrl,
            price: teddy.price / 100,
            id: teddy._id,
        };

        function changeValeur(monObjet) {                      // changement de la valeur de la quantité selectionné
            select = document.getElementById("quantité");
            choice = select.selectedIndex                       // Récupération de l'index du <option> choisi
            valeur_choisie = select.options[choice].value;
            oursId.quantity = parseInt(valeur_choisie);
        }
        
        function changeCouleur(monObjet) {                  // changement de la valeur de la couleur selectionné 
            select = document.getElementById("couleur-choix");
            choice = select.selectedIndex // Récupération de l'index du <option> choisi
            valeur_choisie = select.options[choice].value;
            oursId.color = valeur_choisie;
        }

        function add() {                                    // ajout au panier 
            newOursId = true;
            if (localStorage.getItem("ours") === null) {            // si panier vide 
                oursTab.push(oursId);
                localStorage.setItem("ours", JSON.stringify(oursTab));         // stock l'article dans le localStorage
            } else {                                                        // sinon crée un nouvelle article si couleur ou Id different 
                oursTab = JSON.parse(localStorage.getItem('ours'));
                const selectColor = document.getElementById("couleur-choix").value;
                oursTab.forEach((newOursTab) => {
                    if (teddy._id === newOursTab.id && newOursTab.color === selectColor) {
                        const quantité = parseInt(document.getElementById("quantité").value);
                        newOursTab.quantity += quantité;
                        newOursId = false;
                    }
                })
                if (newOursId) oursTab.push(oursId);
                localStorage.setItem('ours', JSON.stringify(oursTab))               // stock le nouvelle article dans le localStorage
            }
        }

        window.alert = function (titre) {                                           // fonction alert a l'ajout dans le panier 
            document.getElementById('alertPanel').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }

        retourCouleurs.setAttribute("href", "produits.html" + urlRecupId)          

        addArticle.addEventListener('click', event => {                             // activation des fonctions au click d'ajout au panier
            changeCouleur(oursId);
            changeValeur(oursId);
            add();
            alert();
        })
    })