// Carrinho

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// abrir carrinho
cartIcon.onclick = () => {
    cart.classList.add("active");
    user.classList.remove("active");
    search.classList.remove("active");
};

// fechar carrinho
closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}

// remover itens do carrinho

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    // Alterando a quantidade
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Adicionar o total ao carrinho
    var addCart =  document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    //Botão de comprar
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

// Botão de comprar alerta

function buyButtonClicked(){
    alert("Seu pedido foi enviado com sucesso!");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodas()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal1();
}


// remove itens do carrinho

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal1();
}

    // Alterando a quantidade total

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal1();
}

// Adicionando itens ao carrinho
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal1();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var carItens = document.getElementsByClassName("cart-content")[0];
    var carItensNames = carItens.getElementsByClassName("cart-product-title");
    for (var i = 0; i < carItensNames.length; i++) {
       if (carItensNames[i].innerText == title) {
        alert("Você já adicionou esse item ao carrinho");
        return;
       }
    }

    var cartBoxContent = `  
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--Remover do carrinho-->
                        <i class='bx bxs-trash-alt cart-remove'></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    carItens.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}



// Atualizar total de compras

function updateTotal1() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i =0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerHTML.replace("R$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // Se o preço tiver ponto flutuante
        total = Math.round(total * 100) / 100;



        document.getElementsByClassName("total-price")[0].innerText = "R$" + total;
    
}



// Botões header

let search = document.querySelector(".search-box");

document.querySelector("#search-icon").onclick = () =>{
    search.classList.toggle("active");
    cart.classList.remove("active");
    user.classList.remove("active");
}

let user = document.querySelector(".user");

document.querySelector("#user-icon").onclick = () =>{
    user.classList.toggle("active");
    cart.classList.remove("active");
    search.classList.remove("active");
}