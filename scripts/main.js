// scripts/main.js
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

    // Product data (replace with dynamic data if needed)
    const products = {
        1: { title: 'Cereal Products', description: 'Delicious cereal products made from authentic Nepali grains.', image: 'images/cereal-products.jpg' },
        2: { title: 'Traditional Grains', description: 'High-quality traditional grains exported worldwide.', image: 'images/traditional-grains.jpg' },
        3: { title: 'Puffed Rice', description: 'Light and crispy puffed rice, a Nepali delicacy.', image: 'images/product3.jpg' },
        // Add 7-17 more products with unique IDs, titles, descriptions, and images
    };

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-product-id');
            const product = products[productId];

            if (product) {
                modalTitle.textContent = product.title;
                modalDescription.textContent = product.description;
                modalImage.src = product.image;
                modal.style.display = 'block';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});