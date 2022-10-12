// /* Variable pour récupérer le local storage
let productCartLocalStorage = [];
productCartLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(productCartLocalStorage);

// Affichage des produits dans le panier
const ficheProduitPanier = document.getElementById("cart__items");

// /* Si le panier est vide afficher le panier est vide
if (productCartLocalStorage === null || productCartLocalStorage == 0) {
    ficheProduitPanier.innerHTML += `<p>Le panier est vide</p>`;
} else {
    //  Si le panier n'est pas vide afficher les élémnts du local storage et de l'api
    function getFetchData() {
        let qtyTotal = 0;
        let priceTotal = 0;
        for (i = 0; i < productCartLocalStorage.length; i++) {
            let id = productCartLocalStorage[i].idCart;
            let color = productCartLocalStorage[i].colorCart;
            let qty = productCartLocalStorage[i].quantityCart;
            qtyTotal += productCartLocalStorage[i].quantityCart;

            fetch("http://localhost:3000/api/products/" + id).then((response) =>
                response.json().then((data) => {
                    ficheProduitPanier.innerHTML += `<article class="cart__ item" data-id="${id}" data-color="${color}">
    <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${color}</p>
            <p>${data.price} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${qty}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
    </article>`;
                    document.getElementById("totalQuantity").innerHTML =
                        qtyTotal;
                    priceTotal += data.price * qty;
                    document.getElementById("totalPrice").innerHTML =
                        priceTotal;

                    deleteProduct();
                    modifyQuantity();
                })
            );
        }
    }
    getFetchData();
}

//---------------------------------------------------------------
// /* Bouton supprimer
function deleteProduct() {
    // On sélectionne tous les boutons supprimer
    const buttonsDelete = document.querySelectorAll(".deleteItem");

    // On crée une boucle pour rechercher le bouton supprimer cliqué
    for (let i = 0; i < buttonsDelete.length; i++) {
        // Création de l'évènement au click
        buttonsDelete[i].addEventListener("click", (e) => {
            e.preventDefault();

            // Sélection du produit à supprimer grâce à l'id et la couleur
            let idDelete = productCartLocalStorage[i].idCart;
            let colorDelete = productCartLocalStorage[i].colorCart;

            // Suppression des produits par la méthode filter : on sélectionne les éléments à garder et on supprime l'élément où le bouton supprimer à été cliqué
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
            return /^([a-zA-Z\u0080-\u024F]{1}[a-zA-Z\u0080-\u024F\. |\-| |']*[a-zA-Z\u0080-\u024F\.']{1})$/.test(
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
                "Veuillez vérifier ce champ !";
        }

        // /* Fonctions pour la vérification du formulaire----------------------------
        // contrôle de la validité du prénom
        function controlFirstName() {
            const verifyFirstName = formValues.firstName;
            if (regExName(verifyFirstName)) {
                errorMsgEmpty("firstNameErrorMsg");
                return true;
            } else {
                errorMsgWrong("firstNameErrorMsg");
                return false;
            }
        }

        // contrôle de la validité du nom
        function controlLastName() {
            const verifyLastName = formValues.lastName;
            if (regExName(verifyLastName)) {
                errorMsgEmpty("lastNameErrorMsg");
                return true;
            } else {
                errorMsgWrong("lastNameErrorMsg");
                return false;
            }
        }

        // contrôle de la validité de l'adresse
        function controlAddress() {
            const verifyAddress = formValues.address;
            if (regExAddress(verifyAddress)) {
                errorMsgEmpty("addressErrorMsg");
                return true;
            } else {
                errorMsgWrong("addressErrorMsg");
                return false;
            }
        }

        // contrôle de la validité de la ville
        function controlCity() {
            const verifyCity = formValues.city;
            if (regExCity(verifyCity)) {
                errorMsgEmpty("cityErrorMsg");
                return true;
            } else {
                errorMsgWrong("cityErrorMsg");
                return false;
            }
        }

        // contrôle de la validité du mail
        function controlEmail() {
            const verifyEmail = formValues.email;
            if (regExEmail(verifyEmail)) {
                errorMsgEmpty("emailErrorMsg");
                return true;
            } else {
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
            localStorage.setItem("formValues", JSON.stringify(formValues));
            postFetch();
        } else {
            alert("formulaire non valide !");
        }
        //------------------------------------------------------------
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
