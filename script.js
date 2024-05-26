document.addEventListener('DOMContentLoaded', function() {
  // Newsletter form 
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
                  newsletterForm.reset(); // Clear the form
              } else {
                  throw new Error('Subscription failed');
              }
          } catch (error) {
              newsletterMessage.innerText = "Subscription failed. Please try again.";
              newsletterMessage.style.color = "red";
          }
      });
  }

  // Smooth scrolling functionality
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
              event.preventDefault(); // Prevent form submission
          }
      });
  }

  // Password visibility toggle
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
          return; // Exit the function if there's an error
      }

      // If all validations pass, submit the form
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

  const searchInput = document.getElementById('search-input');
  const autocompleteResults = document.getElementById('autocomplete-results');
  const searchResults = document.getElementById('search-results');
  const genreDropdown = document.getElementById('genre-dropdown');
  const resetFiltersBtn = document.getElementById('reset-filters');

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
              autocompleteResults.innerHTML = ''; // Clear autocomplete results if input is empty
          }
      });

      document.getElementById('search-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const query = searchInput.value.trim();
          if (query) {
              searchResults.innerHTML = '<p>Loading...</p>'; // Display loading message
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
                  autocompleteResults.innerHTML = ''; // Clear autocomplete results
                  searchResults.innerHTML = '<p>Loading...</p>'; // Display loading message
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
          searchResults.innerHTML = ''; // Clear previous results
          if (books && books.length > 0) {
              books.forEach(book => {
                  const bookInfo = book.volumeInfo;
                  const bookItem = document.createElement('div');
                  bookItem.classList.add('book-item');
                  // Construct book item HTML here...
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
  
});
