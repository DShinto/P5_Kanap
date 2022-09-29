// Récupération de la chaine de requete dans l'url
const requeteUrlId = window.location.search;

// Méthode URLSearchParams
const UrlCanape = new URLSearchParams(requeteUrlId);

//variable contenant l'Id
const canapeId = UrlCanape.get("id");

//Fonction asynchrone pour appeler l'api/products/id
async function getCanapesId() {
    const response = await fetch(
        "http://localhost:3000/api/products/" + canapeId
    );
    // Condition si on atteint bien l'API
    if (response.ok) {
        return await response.json();
    } else {
        console.error("retour du serveur : ", response.status);
    }
}

// Générer les éléments de la page produit
function genererProductId(data) {
    const imageProductId = document.querySelector(".item__img");
    imageProductId.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

    const titleId = document.querySelector("#title");
    titleId.innerHTML += `<h1 id="title">${data.name}</h1>`;

    const priceId = document.querySelector("#price");
    priceId.innerHTML += `<span id="price">${data.price}</span>`;

    const descriptionId = document.querySelector("#description");
    descriptionId.innerHTML += ` <p id="description">${data.description}</p>`;

    // Génération des couleurs à l'aidde d'une boucle pour récupérer toutes les couleurs
    const colorsId = document.querySelector("#colors");
    for (let i = 0; i < data.colors.length; i++)
        colorsId.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
}

// Appel de la promesse et génération de la fiche
getCanapesId().then((data) => genererProductId(data));

function addCart() {
    const id = canapeId;
    console.log(id);
    const color = document.querySelector("#colors").value;
    console.log(color);
    const quantity = document.querySelector("#quantity").value;
    console.log(quantity);
}

const buttonAddCart = document.querySelector("#addToCart");

buttonAddCart.addEventListener("click", addCart);
