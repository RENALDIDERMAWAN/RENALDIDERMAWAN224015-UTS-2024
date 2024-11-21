// Ambil data keranjang dari localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartTableBody = document.querySelector("#cart-table tbody");
const totalPriceElement = document.getElementById("total-price");

// Fungsi untuk memperbarui tampilan keranjang
function renderCart() {
    cartTableBody.innerHTML = ""; // Kosongkan tabel
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        // Tambahkan baris ke tabel
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rp ${item.price.toLocaleString()}</td>
            <td>
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </td>
            <td>Rp ${itemTotal.toLocaleString()}</td>
            <td><button onclick="removeItem(${index})">Hapus</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    // Perbarui total harga
    totalPriceElement.textContent = totalPrice.toLocaleString();
}

// Fungsi untuk memperbarui jumlah produk
function updateQuantity(index, delta) {
    cart[index].quantity += delta;

    // Hapus produk jika jumlahnya 0
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
}

// Fungsi untuk menghapus produk
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Fungsi untuk menyimpan keranjang ke localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Fungsi untuk checkout
document.getElementById("checkout-button").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Keranjang Anda kosong. Tambahkan produk terlebih dahulu.");
        return;
    }
    alert("Terima kasih telah berbelanja!");
    cart = [];
    saveCart();
    renderCart();
    window.location.href = "checkout.html"; // Arahkan ke halaman checkout
});

// Render keranjang pada saat halaman dimuat
renderCart();
