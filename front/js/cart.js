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

    if (productCartLocalStorage == null) {
    } else {
        // Boucle pour allé chercher les quantités et les concaténés avec +=
        for (let i = 0; i < productCartLocalStorage.length; i++) {
            totalQuantityCart += productCartLocalStorage[i].quantityCart;
            console.log(totalQuantityCart);
        }
    }
    // On implémente dans l'HTML la valeur
    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.innerHTML = totalQuantityCart;

    // Prix Total
    let totalPriceCart = 0;

    if (productCartLocalStorage == null) {
    } else {
        // Boucle pour allé chercher les prix et les concaténés avec +=
        for (let i = 0; i < productCartLocalStorage.length; i++) {
            totalPriceCart +=
                productCartLocalStorage[i].quantityCart *
                productCartLocalStorage[i].prixCart;
            console.log(totalPriceCart);
        }
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

//-------------------------------------------------------------------------------------
// /* Envoi du formulaire dans le LS et vérivication du formulaire
function sendFormLocalStorage() {
    // addEventListener
    const buttonCommand = document.getElementById("order");
    buttonCommand.addEventListener("click", (e) => {
        e.preventDefault();

        // Les valeurs du formulaire
        class Formulaire {
            constructor() {
                this.firstName = document.querySelector("#firstName").value;
                this.lastName = document.querySelector("#lastName").value;
                this.address = document.querySelector("#address").value;
                this.city = document.querySelector("#city").value;
                this.email = document.querySelector("#email").value;
            }
        }

        const formValues = new Formulaire();

        // /* vérification formulaire -------------------------------------------------

        // Déclaration des constantes REGEX
        const regExName = (value) => {
            return /^[A-Za-z\s]{2,40}$/.test(value);
        };
        const regExAddress = (value) => {
            return /^[0-9]{1,5}\s+[A-Za-zéèàïêç\-\s]{2,50}$/.test(value);
        };
        const regExCity = (value) => {
            return /^^([a-zA-Z\u0080-\u024F]{1}[a-zA-Z\u0080-\u024F\. |\-| |']*[a-zA-Z\u0080-\u024F\.']{1})$/.test(
                value
            );
        };
        const regExEmail = (value) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        };

        // fonction pour afficher texte error msg
        function errorMsgEmpty(idValue) {
            document.getElementById(`${idValue}`).textContent = "";
        }
        function errorMsgWrong(idValue) {
            document.getElementById(`${idValue}`).textContent =
                "Veuillez vérifier ce champ";
        }

        // /* Fonctions pour la vérification du formulaire----------------------------
        // contrôle de la validité du prénom
        function controlFirstName() {
            const verifyFirstName = formValues.firstName;
            if (regExName(verifyFirstName)) {
                console.log("prenom true");
                errorMsgEmpty("firstNameErrorMsg");
                return true;
            } else {
                console.log("prenom false");
                errorMsgWrong("firstNameErrorMsg");
                return false;
            }
        }

        // contrôle de la validité du nom
        function controlLastName() {
            const verifyLastName = formValues.lastName;
            if (regExName(verifyLastName)) {
                console.log("nom true");
                errorMsgEmpty("lastNameErrorMsg");
                return true;
            } else {
                console.log("nom false");
                errorMsgWrong("lastNameErrorMsg");
                return false;
            }
        }

        // contrôle de la validité de l'adresse
        function controlAddress() {
            const verifyAddress = formValues.address;
            if (regExAddress(verifyAddress)) {
                console.log("address true");
                errorMsgEmpty("addressErrorMsg");
                return true;
            } else {
                console.log("address false");
                errorMsgWrong("addressErrorMsg");
                return false;
            }
        }

        // contrôle de la validité de la ville
        function controlCity() {
            const verifyCity = formValues.city;
            if (regExCity(verifyCity)) {
                console.log("city true");
                errorMsgEmpty("cityErrorMsg");
                return true;
            } else {
                console.log("city false");
                errorMsgWrong("cityErrorMsg");
                return false;
            }
        }

        // contrôle de la validité du mail
        function controlEmail() {
            const verifyEmail = formValues.email;
            if (regExEmail(verifyEmail)) {
                console.log("email true");
                errorMsgEmpty("emailErrorMsg");
                return true;
            } else {
                console.log("email false");
                errorMsgWrong("emailErrorMsg");
                return false;
            }
        }

        if (
            controlFirstName() &&
            controlLastName() &&
            controlEmail() &&
            controlAddress() &&
            controlCity()
        ) {
            // Mettre formValues dans le LS
            console.log("form LS true");
            localStorage.setItem("formValues", JSON.stringify(formValues));
            postFetch();
        } else {
            console.log(false);
            alert("formulaire non valide");
        }

        // /* Envoi de order à l'API
        function postFetch() {
            // Création variable pour récupérer les id dans un tableau
            let productId = [];

            for (let i = 0; i < productCartLocalStorage.length; i++) {
                productId.push(productCartLocalStorage[i].idCart);
            }

            let orderUser = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products: productId,
            };

            console.log(orderUser);

            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderUser),
            }).then(async (response) => {
                console.log(response);
                try {
                    const dataCommand = await response.json();
                    console.log(dataCommand.orderId);
                    window.location.href = `confirmation.html?id=${dataCommand.orderId}`;
                    localStorage.clear();
                } catch (e) {
                    alert("Problème avec fetch : " + err.message);
                }
            });
        }
    });
}
sendFormLocalStorage();
