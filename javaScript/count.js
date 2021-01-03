let retour = JSON.parse(localStorage.getItem('ours'));
const fact = document.getElementById("table-p");
const droop = document.getElementById("dropdown");
const prixFinal = document.getElementById("prix-final");
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const panier = document.getElementById("lien-panier"); 

var prixTotal = [];
var products = [];

function generateLineUp (p){
    return  `
    <tr>
        <td class="border" scope="row"><a class="mr-0" href="produits.html?produit=${p["id"]}"><img width="60" height="auto" src="${p["img"]}"> </a>${p["name"]}</td>
        <td class="border">${p["price"].toFixed(2)}€</td>
        <td class="border">${p["color"]}</td>
        <td class="border">${p["quantity"]}</td>
        <td class""prix>${((p["price"])*(p["quantity"])).toFixed(2)}€</td>
    </tr>`
}

function notGenerate (){
    return `
    <div>
        <br><p class="text-center">:(</p>
        <br><h5 class="text-center">Votre Panier vide</h5>
    </div>`
}

if (localStorage.getItem("ours") != null) {
    for (let i = 0; i < retour.length; i++) {
        let p = retour[i];
        fact.innerHTML += generateLineUp (p);
        prixGlobal = (p["price"]) * (p["quantity"]);
        prixTotal.push(prixGlobal);
        products.push(p["id"]);
    }
    let prixFinaladd = prixTotal.reduce(reducer);

    prixFinal.innerHTML +=
        `${(prixFinaladd).toFixed(2)}€`

} else {
    droop.innerHTML = notGenerate ();
}

function verifPanier (){
    if (localStorage.getItem("ours") === null) {            
        window.location = `panierVide.html`                 // redirection sur panier vide en cas de valeur null sur l'item ours du local-storage
    } else {
        window.location = `panier.html`                     // sinon envoi du lien panier.html
    }
}

panier.addEventListener("click", event => {                 // verification du panier 
    verifPanier ()
})