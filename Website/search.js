document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('autocomplete-results');
    const searchIcon = document.getElementById('searchIcon');
    
    let currentFocus = -1;

    // Fetch all h2 elements on the page
    const products = Array.from(document.querySelectorAll('h2')).map(h2 => ({
        name: h2.innerText,
        element: h2.closest('.product')
    }));

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        resultsContainer.innerHTML = '';
        currentFocus = -1;

        if (query.length > 0) {
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));

            filteredProducts.forEach((product, index) => {
                const resultItem = document.createElement('li');
                resultItem.textContent = product.name;
                resultItem.addEventListener('click', () => {
                    product.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    searchInput.value = product.name;
                    resultsContainer.innerHTML = '';
                });
                resultsContainer.appendChild(resultItem);
            });
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        let items = resultsContainer.getElementsByTagName('li');
        if (items.length > 0) {
            if (e.key === 'ArrowDown') {
                // User pressed "Arrow Down" key
                currentFocus++;
                addActive(items);
            } else if (e.key === 'ArrowUp') {
                // User pressed "Arrow Up" key
                currentFocus--;
                addActive(items);
            } else if (e.key === 'Enter') {
                // User pressed "Enter" key
                e.preventDefault();
                if (currentFocus > -1) {
                    if (items[currentFocus]) {
                        items[currentFocus].click();
                    }
                }
            }
        }
    });

    searchIcon.addEventListener('click', () => {
        // Simulate Enter key press behavior
        const event = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        });
        searchInput.dispatchEvent(event);
    });

    function addActive(items) {
        if (!items) return false;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add('autocomplete-active');
        items[currentFocus].scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Scroll to ensure visibility
    }

    function removeActive(items) {
        for (let item of items) {
            item.classList.remove('autocomplete-active');
        }
    }
});
