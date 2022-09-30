//* Variable pour implémenter le local storage
let productCartLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(productCartLocalStorage);

// Affichage des produits dans le panier
const ficheProduitPanier = document.querySelector("#cart__items");
/*

// Si le panier est vide afficher le panier est vide
if (productCartLocalStorage === null) {
    ficheProduitPanier.innerHTML += `<p>Le panier est vide</p>`;
    console.log(ficheProduitPanier);
} else {
    // Si le panier n'est pas vide afficher les élémnts du local storage
    let detailFicheProduitPanier = [];
    for (i = 0; i < productCartLocalStorage.length; i++) {
        detailFicheProduitPanier =
            detailFicheProduitPanier +
            `<article class="cart__ item" data-id="${productCartLocalStorage[i].id}" data-color="${productCartLocalStorage[i].color}">
      <div class="cart__item__img">
        <img src="${productCartLocalStorage[i].imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>Nom du produit</h2>
          <p>Vert</p>
          <p>42,00 €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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
*/
