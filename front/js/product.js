// Récupération de la chaine de requete dans l'url
const requeteUrlId = window.location.search;

// Méthode URLSearchParams
const UrlCanape = new URLSearchParams(requeteUrlId);

//variable contenant l'Id
const canapeId = UrlCanape.get("id");
console.log(canapeId);

let data = "";
//Fonction asynchrone pour appeler l'api/products/id
async function getCanapesId() {
    const response = await fetch(
        "http://localhost:3000/api/products/" + canapeId
    );
    // Condition si on atteint bien l'API
    if (response.ok) {
        data = await response.json();
        return data;
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

///! eventlistenner pour ecouter le bouton "Ajouter au panier"
const buttonAddCart = document.querySelector("#addToCart");

buttonAddCart.addEventListener("click", (event) => {
    event.preventDefault();

    // Variable couleur et quantité qu'on récupère

    let colorEvent = document.querySelector("#colors").value;
    let quantityEvent = document.querySelector("#quantity").value;

    console.log(colorEvent);

    if (
        quantityEvent > 0 &&
        quantityEvent <= 100 &&
        quantityEvent != 0 &&
        colorEvent != ""
    ) {
        // Récupération du produit à ajouter dans le panier
        let productCart = {
            idCart: canapeId,
            colorCart: colorEvent,
            quantityCart: Number(quantityEvent),
            nomCart: data.name,
            prixCart: data.price,
            descriptionCart: data.description,
            imgCart: data.imageUrl,
            altTxtCart: data.altTxt,
        };

        ///! stocker la récupération des valeurs dans le local storage

        ///* Variable pour implémenter le local storage
        let productCartLocalStorage = JSON.parse(
            localStorage.getItem("produit")
        );

        ///* Fonction ajouter un produit dans LS
        const addProductLocaltorage = () => {
            productCartLocalStorage.push(productCart);
            localStorage.setItem(
                "produit",
                JSON.stringify(productCartLocalStorage)
            );
        };

        ///! Importation dans le LS

        // Si le panier à déjà un produit
        if (productCartLocalStorage) {
            let foundProduct = productCartLocalStorage.find(
                (p) => p.idCart == canapeId && p.colorCart == colorEvent
            );

            //Si le produit commandé est déjà dans le panier
            if (foundProduct) {
                let newQuantityCart =
                    parseInt(productCart.quantityCart) +
                    parseInt(foundProduct.quantityCart);
                foundProduct.quantityCart = newQuantityCart;
                localStorage.setItem(
                    "produit",
                    JSON.stringify(productCartLocalStorage)
                );

                // Si le produit commandé n'est pas dans le panier
            } else {
                addProductLocaltorage();
            }

            // Si le panier est vide
        } else {
            productCartLocalStorage = [];
            addProductLocaltorage();
        }
        console.table(productCartLocalStorage);
    }
});
