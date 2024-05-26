document.addEventListener('DOMContentLoaded', function() {

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(newsletterForm);
            const email = formData.get('email');

            try {
                const response = await fetch('/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email })
                });

                if (response.ok) {
                    newsletterMessage.innerText = "Thank you for subscribing!";
                    newsletterMessage.style.color = "green";
                    newsletterForm.reset();
                } else {
                    throw new Error('Subscription failed');
                }
            } catch (error) {
                newsletterMessage.innerText = "Subscription failed. Please try again.";
                newsletterMessage.style.color = "red";
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sign-up form validation
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;

            if (password !== confirmPassword) {
                document.getElementById('signup-error-message').innerText = "Passwords do not match";
                event.preventDefault();
            }
        });
    }

    // Password visibility toggle function
    window.togglePasswordVisibility = function(inputId) {
        const passwordInput = document.getElementById(inputId);
        const passwordToggleIcon = document.getElementById(inputId + "-toggle");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordToggleIcon.classList.remove("fa-eye-slash");
            passwordToggleIcon.classList.add("fa-eye");
        } else {
            passwordInput.type = "password";
            passwordToggleIcon.classList.remove("fa-eye");
            passwordToggleIcon.classList.add("fa-eye-slash");
        }
    };

    // Sign-up form submission validation
    window.validateSignup = function(event) {
        event.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;

        if (password !== confirmPassword) {
            document.getElementById('signup-error-message').innerText = "Passwords do not match";
            return;
        }
        document.getElementById('signup-form').submit();
    };

    // Login form submission validation
    window.validateLogin = function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            console.log("Username:", username);
            console.log("Password:", password);
            // Perform login logic here
        } else {
            document.getElementById('login-error-message').textContent = "Please enter both username and password.";
        }
    };

    // Password retrieval form submission validation
    window.handlePasswordRetrieval = function(event) {
        event.preventDefault();
        const retrievalEmail = document.getElementById('retrieval-email').value;
        const retrievalErrorMessage = document.getElementById('retrieval-error-message');
        const retrievalSuccessMessage = document.getElementById('retrieval-success-message');

        retrievalErrorMessage.textContent = "";
        retrievalSuccessMessage.textContent = "";

        if (retrievalEmail) {
            console.log("Password retrieval email:", retrievalEmail);
            retrievalSuccessMessage.textContent = "Password retrieval instructions have been sent to your email.";
        } else {
            retrievalErrorMessage.textContent = "Please enter a valid email address.";
        }
    };

    // Book search and autocomplete functionality
    const searchInput = document.getElementById('search-input');
    const autocompleteResults = document.getElementById('autocomplete-results');
    const searchResults = document.getElementById('search-results');

    if (searchInput) {
        searchInput.addEventListener('input', async () => {
            const query = searchInput.value.trim();
            if (query) {
                try {
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`);
                    const data = await response.json();
                    displayAutocompleteResults(data.items);
                } catch (error) {
                    console.error('Error fetching autocomplete data:', error);
                }
            } else {
                autocompleteResults.innerHTML = '';
            }
        });

        document.getElementById('search-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                searchResults.innerHTML = '<p>Loading...</p>';
                try {
                    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
                    const data = await response.json();
                    displayResults(data.items);
                } catch (error) {
                    searchResults.innerHTML = '<p>Failed to fetch data</p>';
                    console.error('Error fetching data:', error);
                }
            }
        });

        function displayAutocompleteResults(items) {
            if (items && items.length > 0) {
                const autocompleteSuggestions = items.map(item => `<div class="autocomplete-item" data-title="${item.volumeInfo.title}">${item.volumeInfo.title}</div>`);
                autocompleteResults.innerHTML = autocompleteSuggestions.join('');
                addAutocompleteItemClickListeners();
            } else {
                autocompleteResults.innerHTML = '';
            }
        }

        function addAutocompleteItemClickListeners() {
            const autocompleteItems = document.querySelectorAll('.autocomplete-item');
            autocompleteItems.forEach(item => {
                item.addEventListener('click', async (e) => {
                    const title = e.target.getAttribute('data-title');
                    searchInput.value = title;
                    autocompleteResults.innerHTML = '';
                    searchResults.innerHTML = '<p>Loading...</p>';
                    try {
                        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`);
                        const data = await response.json();
                        displayResults(data.items);
                    } catch (error) {
                        searchResults.innerHTML = '<p>Failed to fetch data</p>';
                        console.error('Error fetching data:', error);
                    }
                });
            });
        }

        function displayResults(books) {
            searchResults.innerHTML = '';
            if (books && books.length > 0) {
                books.forEach(book => {
                    const bookInfo = book.volumeInfo;
                    const bookItem = document.createElement('div');
                    bookItem.classList.add('book-item');
                    bookItem.innerHTML = `
                        <h3>${bookInfo.title}</h3>
                        <p>${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author'}</p>
                        <p>${bookInfo.publisher ? bookInfo.publisher : 'Unknown Publisher'}</p>
                    `;
                    searchResults.appendChild(bookItem);
                });
            } else {
                searchResults.innerHTML = '<p>No results found</p>';
            }
        }
    }
      HERRRRRRRRR

      document.addEventListener('DOMContentLoaded', function() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        const cartTableBody = document.getElementById('cart-tbody');
        const addToCartButtons = document.querySelectorAll('.btn.add-to-cart');
    
        // Function to render the cart items in the cart table
        function renderCart() {
            if (cartTableBody) {
                cartTableBody.innerHTML = '';
                cartItems.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><button class="remove-item" data-index="${index}">Remove</button></td>
                        <td><img src="${item.image}" alt="${item.product}" /></td>
                        <td>${item.product}</td>
                        <td>$${item.price}</td>
                        <td>${item.size}</td>
                        <td><input type="number" class="item-quantity" data-index="${index}" value="${item.quantity}" min="1" /></td>
                        <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    `;
                    cartTableBody.appendChild(row);
                });
    
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', removeItem);
                });
    
                document.querySelectorAll('.item-quantity').forEach(input => {
                    input.addEventListener('change', updateQuantity);
                });
    
                calculateTotals();
            }
        }
    
        // Function to add an item to the cart
        function addItem(item) {
            cartItems.push(item);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        }
    
        // Function to remove an item from the cart
        function removeItem(event) {
            const index = event.target.dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        }
    
        // Function to update item quantity
        function updateQuantity(event) {
            const index = event.target.dataset.index;
            cartItems[index].quantity = parseInt(event.target.value);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
        }
    
        // Function to calculate and display the totals
        function calculateTotals() {
            let subtotal = 0;
            cartItems.forEach(item => {
                subtotal += item.price * item.quantity;
            });
    
            const tax = subtotal * 0.08;
            const shipping = subtotal > 0 ? 5.00 : 0;
            const total = subtotal + tax + shipping;
    
            if (document.querySelector('.totalRow .value')) {
                document.querySelector('.totalRow .value').innerText = `$${total.toFixed(2)}`;
            }
            if (document.querySelector('.subtotal .value')) {
                document.querySelector('.subtotal .value').innerText = `$${subtotal.toFixed(2)}`;
            }
            if (document.querySelector('.totalRow:nth-child(2) .value')) {
                document.querySelector('.totalRow:nth-child(2) .value').innerText = `$${shipping.toFixed(2)}`;
            }
            if (document.querySelector('.totalRow:nth-child(3) .value')) {
                document.querySelector('.totalRow:nth-child(3) .value').innerText = `$${tax.toFixed(2)}`;
            }
        }
    
        // Function to apply promo code
        function applyPromoCode() {
            const promoCode = document.getElementById('promo-code').value.trim();
            let discount = 0;
    
            if (promoCode === 'DISCOUNT10') {
                discount = 0.10;
            } else {
                alert('Invalid promo code');
                return;
            }
    
            const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            const discountAmount = subtotal * discount;
            const newSubtotal = subtotal - discountAmount;
    
            document.querySelector('.subtotal .value').innerText = `$${newSubtotal.toFixed(2)}`;
            calculateTotals();
        }
    
        // Event listener for apply promo button
        if (document.getElementById('apply-promo')) {
            document.getElementById('apply-promo').addEventListener('click', applyPromoCode);
        }
    
        // Event listener for add to cart buttons
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const item = {
                    image: button.closest('.box').querySelector('img').src,
                    product: button.closest('.box').querySelector('h3').textContent,
                    price: parseFloat(button.closest('.box').querySelector('.price').textContent.replace('N', '')),
                    size: 'M', // You can change this as needed
                    quantity: 1
                };
                addItem(item);
            });
        });
    
        // Render the cart on page load if on cart page
        if (cartTableBody) {
            renderCart();
        }
    });
    

});
