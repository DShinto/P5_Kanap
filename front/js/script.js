async function getCanapes() {
  const response = await fetch("http://localhost:3000/api/products");
  if (response.ok) {
    return await response.json();
  } else {
    console.error("retour du serveur : ", reponse.status);
  }
}

function genererFiches(data) {
  for (let i = 0; i < data.length; i++) {
    const items = document.querySelector(".items");
    const productItems = document.createElement("a");
    productItems.href = `product.html?id=${data[i]._id}`;

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
getCanapes().then((data) => genererFiches(data));
