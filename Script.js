document.addEventListener('DOMContentLoaded', () => {

    // --- REQUIREMENT 1: DYNAMIC LIST (Add & Remove Tacos) ---
    const tacoInput = document.getElementById('taco-input');
    const addTacoBtn = document.getElementById('add-taco-btn');
    const tacoList = document.getElementById('taco-list');

    // Remove existing list items
    tacoList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            tacoList.removeChild(e.target.parentElement);
        });
    });

    // Add new taco items using createElement and appendChild
    addTacoBtn.addEventListener('click', () => {
        const tacoValue = tacoInput.value.trim();
        if (tacoValue === '') return;

        const listItem = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = `Taco ${tacoList.children.length + 1}: ${tacoValue}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        deleteBtn.addEventListener('click', () => {
            tacoList.removeChild(listItem);
        });

        listItem.appendChild(textSpan);
        listItem.appendChild(deleteBtn);
        tacoList.appendChild(listItem);
        tacoInput.value = '';
    });

    // --- REQUIREMENT 2: STYLE CHANGES ON INPUT ---
    const formCard = document.getElementById('form-card');
    const nameInput = document.getElementById('full-name');

    nameInput.addEventListener('input', (e) => {
        if (e.target.value.trim().length > 0) {
            formCard.classList.add('active-input');
        } else {
            formCard.classList.remove('active-input');
        }
    });

    // --- REQUIREMENT 3: FORM VALIDATION (4 Fields, Empty + Format + Auto-Clear) ---
    const contactForm = document.getElementById('contact-form');
    const requiredInputs = contactForm.querySelectorAll('input[required], textarea[required]');

    // Auto-clear error as user types
    requiredInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.setAttribute('aria-invalid', 'false');
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        requiredInputs.forEach(input => {
            const val = input.value.trim();

            // Empty field validation
            if (val === '') {
                input.setAttribute('aria-invalid', 'true');
                isFormValid = false;
            }
            // Format validation for email (must contain '@')
            else if (input.type === 'email' && !val.includes('@')) {
                input.setAttribute('aria-invalid', 'true');
                isFormValid = false;
            }
            else {
                input.setAttribute('aria-invalid', 'false');
            }
        });

        if (isFormValid) {
            alert('Thank you! Your taco message has been submitted.');
            contactForm.reset();
            formCard.classList.remove('active-input');
        }
    });

    // --- BONUS REQUIREMENT: PUBLIC API FETCH WITH ERROR HANDLING ---
    const fetchFactBtn = document.getElementById('fetch-fact-btn');
    const apiFact = document.getElementById('api-fact');

    fetchFactBtn.addEventListener('click', () => {
        apiFact.textContent = 'Fetching inspiration...';

        fetch('https://dummyjson.com/quotes/random')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                apiFact.textContent = `"${data.quote}" — ${data.author}`;
                apiFact.style.color = '#092f90';
                apiFact.style.fontWeight = 'bold';
            })
            .catch(error => {
                apiFact.textContent = 'Failed to load data from server. Please try again later.';
                apiFact.style.color = '#dc2626';
                console.error('API Fetch Error:', error);
            });
    });

});