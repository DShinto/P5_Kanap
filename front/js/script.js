// /* Récupération des données de l'API
async function getCanapes() {
    const response = await fetch("http://localhost:3000/api/products");
    // Condition si on atteint bien l'API
    if (response.ok) {
        return await response.json();
    } else {
        console.error("retour du serveur : ", response.status);
    }
}

// Création des fiches canapés selon le code HTML
function genererFiches(data) {
    // Récupération des articles de l'API
    for (let i = 0; i < data.length; i++) {
        // Création des cartes produits
        const items = document.querySelector(".items");

        //Création de la balise <a> pour faire le lien avec la page produit
        const productItems = document.createElement("a");
        productItems.href = `product.html?id=${data[i]._id}`;

        // Création de l'article et des différentes balises
        const productArticle = document.createElement("article");
        productItems.appendChild(productArticle);

        const productImage = document.createElement("img");
        productImage.src = data[i].imageUrl;
        productImage.alt = data[i].altTxt;
        productArticle.appendChild(productImage);

        const productName = document.createElement("h3");
        productName.innerText = data[i].name;
        productArticle.appendChild(productName);

        const productDescription = document.createElement("p");
        productDescription.innerText = data[i].description;
        productArticle.appendChild(productDescription);

        items.appendChild(productItems);
    }
}

// Appel des fiches
getCanapes().then((data) => genererFiches(data));
