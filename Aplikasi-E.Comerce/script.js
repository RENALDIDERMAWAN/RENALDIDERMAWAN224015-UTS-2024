let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} telah ditambahkan ke keranjang!`);
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>Rp ${item.price.toLocaleString()}</td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>Rp ${itemTotal.toLocaleString()}</td>
                <td><button onclick="removeItem(${index})">Hapus</button></td>
            </tr>
        `;
    });

    totalAmount.textContent = `Rp ${total.toLocaleString()}`;
}

function updateQuantity(index, delta) {
    if (cart[index].quantity + delta > 0) {
        cart[index].quantity += delta;
    } else {
        removeItem(index);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart-items")) renderCart();
});
