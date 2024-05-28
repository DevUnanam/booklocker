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

    document.addEventListener("DOMContentLoaded", function () {
        // Toggle password visibility
        function togglePasswordVisibility(id) {
            var passwordField = document.getElementById(id);
            var passwordToggle = passwordField.nextElementSibling.firstChild;
            if (passwordField.type === "password") {
                passwordField.type = "text";
                passwordToggle.classList.remove("fa-eye-slash");
                passwordToggle.classList.add("fa-eye");
            } else {
                passwordField.type = "password";
                passwordToggle.classList.remove("fa-eye");
                passwordToggle.classList.add("fa-eye-slash");
            }
        }
    
        document.getElementById('password-toggle').addEventListener('click', function () {
            togglePasswordVisibility('password');
        });
    
        if (document.getElementById('confirm-password-toggle')) {
            document.getElementById('confirm-password-toggle').addEventListener('click', function () {
                togglePasswordVisibility('confirm_password');
            });
        }
    
        // Validate login form
        function validateLogin(event) {
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
    
            if (!email || !password) {
                event.preventDefault();
                document.getElementById('login-error-message').textContent = "Please enter both email and password.";
            }
        }
    
        // Validate sign-up form
        function validateSignUp(event) {
            var username = document.getElementById('username').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirm_password').value;
    
            if (!username || !email || !password || !confirmPassword) {
                event.preventDefault();
                document.getElementById('signup-error-message').textContent = "Please fill out all fields.";
            } else if (password !== confirmPassword) {
                event.preventDefault();
                document.getElementById('signup-error-message').textContent = "Passwords do not match.";
            }
        }
    
        // Handle password retrieval form submission
        function handlePasswordRetrieval(event) {
            event.preventDefault();
            var email = document.getElementById('retrieval-email').value;
    
            if (!email) {
                document.getElementById('retrieval-error-message').textContent = "Please enter your email.";
            } else {
                document.getElementById('retrieval-error-message').textContent = "";
                document.getElementById('retrieval-success-message').textContent = "If an account with that email exists, you will receive password reset instructions.";
            }
        }
    
        document.getElementById('login-form').addEventListener('submit', validateLogin);
        document.getElementById('signup-form').addEventListener('submit', validateSignUp);
        document.getElementById('passwordRetrievalForm').addEventListener('submit', handlePasswordRetrieval);
    });
    




});
