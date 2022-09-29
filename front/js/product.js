// Récupération de la chaine de requete dans l'url
const requeteUrlId = window.location.search;

// Méthode URLSearchParams
const UrlCanape = new URLSearchParams(requeteUrlId);

//variable contenant l'Id
const canapeId = UrlCanape.get("id");
console.log(canapeId);

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

//! eventlistenner pour ecouter le bouton "Ajouter au panier"
const buttonAddCart = document.querySelector("#addToCart");

buttonAddCart.addEventListener("click", (event) => {
    event.preventDefault();

    // Récupération des valeurs pour le panier
    let productCart = {
        id: canapeId,
        color: document.querySelector("#colors").value,
        quantity: document.querySelector("#quantity").value,
    };
    console.log(productCart);

    //! stocker la récupération des valeurs dans le local storage

    //* Variable pour implémenter le local storage
    let productCartLocalStorage = JSON.parse(localStorage.getItem("produit"));
    console.log(productCartLocalStorage);

    //* Fonction ajouter un produit dans LS
    const addProductLocaltorage = () => {
        productCartLocalStorage.push(productCart);
        localStorage.setItem(
            "produit",
            JSON.stringify(productCartLocalStorage)
        );
    };

    //! Si il y a déjà des produits dans le LS
    if (productCartLocalStorage) {
        addProductLocaltorage();
        console.log(productCartLocalStorage);
    } else {
        productCartLocalStorage = [];
        addProductLocaltorage();
    }
    console.log(productCartLocalStorage);
});
