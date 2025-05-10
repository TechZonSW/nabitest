document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'iPhone 15 Pro', price: 14990, image: 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=iPhone+15+Pro' },
        { id: 2, name: 'MacBook Air M2', price: 16490, image: 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=MacBook+Air+M2' },
        { id: 3, name: 'iPad Air', price: 8490, image: 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=iPad+Air' },
        { id: 4, name: 'Apple Watch Ultra 2', price: 10990, image: 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=Watch+Ultra+2' }
    ];

    const productGrid = document.querySelector('.product-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = [];

    // Funktion för att rendera produkter på sidan
    function renderProducts() {
        productGrid.innerHTML = ''; // Rensa befintliga produkter
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price} kr</p>
                <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Lägg i varukorg</button>
            `;
            productGrid.appendChild(productCard);
        });

        // Lägg till event listeners på de nya knapparna
        addEventListenersToButtons();
    }

    // Funktion för att lägga till produkt i varukorgen
    function addToCart(productId) {
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            // Förenkling: lägg bara till produkten. I en riktig butik hanterar man kvantitet.
            cart.push(productToAdd);
            updateCart();
        }
    }

    // Funktion för att uppdatera varukorgens visning
    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Rensa varukorgen
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Varukorgen är tom.</p>';
            checkoutBtn.disabled = true;
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('p');
                // I en mer avancerad varukorg skulle man visa mer info, kanske en ta-bort knapp
                cartItemElement.textContent = `${item.name} - ${item.price} kr`;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price;
            });
            checkoutBtn.disabled = false;
        }

        cartCountElement.textContent = cart.length;
        totalPriceElement.textContent = total;
    }
    
    // Lägg till event listeners för "Lägg i varukorg"-knappar
    function addEventListenersToButtons() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.id);
                addToCart(productId);
            });
        });
    }

    // Event listener för "Till Kassan"-knappen (simulerad)
    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                alert(`Tack för din beställning! Totalsumma: ${totalPriceElement.textContent} kr. (Detta är en demo)`);
                cart = []; // Töm varukorgen efter "beställning"
                updateCart();
            }
        });
    }


    // Initialisera sidan
    renderProducts();
    updateCart(); // Visa tom varukorg initialt
});
