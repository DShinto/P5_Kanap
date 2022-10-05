// /* Variable pour récupérer le local storage
let productCartLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(productCartLocalStorage);

// Affichage des produits dans le panier
const ficheProduitPanier = document.querySelector("#cart__items");

// /* Si le panier est vide afficher le panier est vide
if (productCartLocalStorage === null || productCartLocalStorage == 0) {
    ficheProduitPanier.innerHTML += `<p>Le panier est vide</p>`;
} else {
    // /+ Si le panier n'est pas vide afficher les élémnts du local storage
    let detailFicheProduitPanier = [];
    for (i = 0; i < productCartLocalStorage.length; i++) {
        detailFicheProduitPanier =
            detailFicheProduitPanier +
            `<article class="cart__ item" data-id="${productCartLocalStorage[i].idCart}" data-color="${productCartLocalStorage[i].colorCart}">
    <div class="cart__item__img">
        <img src="${productCartLocalStorage[i].imgCart}" alt="${productCartLocalStorage[i].altTxtCart}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${productCartLocalStorage[i].nomCart}</h2>
            <p>${productCartLocalStorage[i].colorCart}</p>
            <p>${productCartLocalStorage[i].prixCart} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productCartLocalStorage[i].quantityCart}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
    </article>`;
    }
    if (i === productCartLocalStorage.length) {
        ficheProduitPanier.innerHTML = detailFicheProduitPanier;
    }
}

//--------------------------------------------------------------------------
// /* Affichage du prix total et du nombre d'articles
// Fonction prix et quantité total
function totalPriceQuantity() {
    // Quantité Total
    let totalQuantityCart = 0;

    // Boucle pour allé chercher les quantités et les concaténés avec +=
    for (let i = 0; i < productCartLocalStorage.length; i++) {
        totalQuantityCart += productCartLocalStorage[i].quantityCart;
        console.log(totalQuantityCart);
    }

    // On implémente dans l'HTML la valeur
    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.innerHTML = totalQuantityCart;

    // Prix Total
    let totalPriceCart = 0;

    // Boucle pour allé chercher les prix et les concaténés avec +=
    for (let i = 0; i < productCartLocalStorage.length; i++) {
        totalPriceCart +=
            productCartLocalStorage[i].quantityCart *
            productCartLocalStorage[i].prixCart;
        console.log(totalPriceCart);
    }

    // On implémente dans l'HTML la valeur
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = totalPriceCart;
}
totalPriceQuantity();
//------------------------------------------------------------------------
// /* Bouton supprimer
function deleteProduct() {
    // On sélectionne tous les boutons supprimer
    const buttonsDelete = document.querySelectorAll(".deleteItem");

    // On crée une boucle pour rechercher le bouton suppromer cliqué
    for (let i = 0; i < buttonsDelete.length; i++) {
        // Création de l'évènement au click
        buttonsDelete[i].addEventListener("click", (e) => {
            e.preventDefault();

            // Sélection du produit à supprimer grâce à l'id et la couleur
            let idDelete = productCartLocalStorage[i].idCart;
            let colorDelete = productCartLocalStorage[i].colorCart;

            // Suppression des produits par la méthode filter
            productCartLocalStorage = productCartLocalStorage.filter(
                (el) => el.idCart !== idDelete || el.colorCart !== colorDelete
            );

            // On envoie dans le LS
            // Transformation au format JSON
            localStorage.setItem(
                "produit",
                JSON.stringify(productCartLocalStorage)
            );
            alert("Ce produit est supprimé du panier");
            location.reload();
        });
    }
}
deleteProduct();

//--------------------------------------------------------------------------
// /* Modification des quantités
function modifyQuantity() {
    // On sélectionne les inputs
    const changeQuantity = document.querySelectorAll(".itemQuantity");

    // On crée une boucle pour savoir l'input utilisé
    for (let i = 0; i < changeQuantity.length; i++) {
        // Création de l'évènement en changeant la valeur
        changeQuantity[i].addEventListener("change", (e) => {
            e.preventDefault();

            // varaiables pour trouver le bon produit par l'id et la couleur et la quantité à changer
            let idModify = productCartLocalStorage[i].idCart;
            let colorModify = productCartLocalStorage[i].colorCart;
            let quantityUnchanged = productCartLocalStorage[i].quantityCart;
            let quantityModifyValue = changeQuantity[i].valueAsNumber;

            // Utilisation de la méthode find pour sélectionner le bon produit grâce à la quantité, l'id et la couleur
            const resultProduct = productCartLocalStorage.find(
                (el) =>
                    el.quantityModifyValue !== quantityUnchanged &&
                    el.idCart == idModify &&
                    el.colorCart == colorModify
            );
            // Modification de la quantité et assignation au tableau
            resultProduct.quantityCart = quantityModifyValue;
            productCartLocalStorage[i].quantityCart =
                resultProduct.quantityCart;

            // On envoie dans le LS
            // Transformation au format JSON
            localStorage.setItem(
                "produit",
                JSON.stringify(productCartLocalStorage)
            );
            console.table(productCartLocalStorage);
            location.reload();
        });
    }
}
modifyQuantity();
