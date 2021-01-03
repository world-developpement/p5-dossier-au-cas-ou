const container = document.getElementById("products");

function generateLine (teddy){                          // creation des div pour les differents teddies
    return `
    <div class="col-md-5 text-center mt-5 border">
        <h1>${teddy.name}</h1>
        <img class="img-fluid img-accueil" src="${teddy.imageUrl}"></img>
        <div>${(teddy.price/100).toFixed(2)} €</div>
        <a type="button" class="btn btn-danger my-2" href="produits.html?produit=${teddy._id}">Description produit</a>
    </div>` 
}

fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(teddies => {
            for (const teddy of teddies) { // création du le HTML pour chaque teddies present 
                container.innerHTML += generateLine (teddy);   
            }
    })
     