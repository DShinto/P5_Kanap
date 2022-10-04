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

// Bouton supprimer

function deleteProduct() {
    const buttonsDelete = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < buttonsDelete.length; i++) {
        buttonsDelete[i].addEventListener("click", (e) => {
            e.preventDefault();

            // Sélection du produit à supprimer
            let idDelete = productCartLocalStorage[i].idCart;
            let colorDelete = productCartLocalStorage[i].colorCart;
            console.log(idDelete);
            console.log(colorDelete);

            // Suppression des produits par filter
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
