/*
class cart {
  constructor() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
      this.cart = [];
    } else {
      this.cart = JSON.parse(cart);
    }
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  add(product) {
    let foundProduct = this.cart.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
      foundProduct.quantity++;
    } else foundProduct = 1;
    this.cart.push(product);
    this.save();
  }

  remove(product) {
    this.cart = this.cart.filter((p) => p.id != product.id);
    this.save();
  }

  changeQuantity(product, quantity) {
    let foundProduct = this.cart.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;
      if (foundProduct.quantity <= 0) {
        this.remove(foundProduct);
      } else {
        this.save();
      }
    }
  }

  getNumberProduct() {
    let number = 0;
    for (let product of this.cart) {
      number += product.quantity;
    }
    return number;
  }

  getTotalPrice() {
    let total = 0;
    for (let product of this.cart) {
      total += product.quantity * product.price;
    }
    return total;
  }
}

//fin class

*/

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

function addCart(product) {
    let cart = getCart();
    let foundProduct = cart.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity++;
    } else foundProduct = 1;
    cart.push(product);
    saveCart(cart);
}

function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter((p) => p.id != product.id);
    saveCart(cart);
}

function changeQuantity(product, quantity) {
    let cart = getCart();
    let foundProduct = cart.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromCart(foundProduct);
        } else {
            saveCart(cart);
        }
    }
}

function getNumberProduct() {
    let cart = getCart();
    let number = 0;
    for (let product of cart) {
        number += product.quantity;
    }
    return number;
}

function getTotalPrice() {
    let cart = getCart();
    let total = 0;
    for (let product of cart) {
        total += product.quantity * product.price;
    }
    return total;
}
