"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    // Типізація DOM-елементів
    const homeLink = document.getElementById('home-link');
    const catalogLink = document.getElementById('catalog-link');
    const categoriesDiv = document.getElementById('categories');
    const productsDiv = document.getElementById('products');
    // Перевірка наявності елементів
    if (!homeLink || !catalogLink || !categoriesDiv || !productsDiv) {
        console.error('One or more DOM elements not found');
        return;
    }
    homeLink.addEventListener('click', () => {
        location.reload();
    });
    catalogLink.addEventListener('click', () => {
        loadCategories();
    });
    function loadCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('data/categories.json');
                const categories = yield response.json();
                displayCategories(categories);
            }
            catch (error) {
                console.error('Error loading categories:', error);
            }
        });
    }
    function displayCategories(categories) {
        categoriesDiv.innerHTML = '';
        productsDiv.innerHTML = '';
        categories.forEach((category) => {
            const categoryLink = document.createElement('a');
            categoryLink.href = '#';
            categoryLink.textContent = category.name;
            categoryLink.addEventListener('click', () => {
                loadProducts(category.shortname);
            });
            categoriesDiv.appendChild(categoryLink);
            categoriesDiv.appendChild(document.createElement('br'));
        });
        const specialsLink = document.createElement('a');
        specialsLink.href = '#';
        specialsLink.textContent = 'Specials';
        specialsLink.addEventListener('click', () => {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            loadProducts(randomCategory.shortname);
        });
        categoriesDiv.appendChild(specialsLink);
    }
    function loadProducts(categoryShortname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`data/${categoryShortname}.json`);
                const categoryData = yield response.json();
                displayProducts(categoryData);
            }
            catch (error) {
                console.error('Error loading products:', error);
            }
        });
    }
    function displayProducts(categoryData) {
        productsDiv.innerHTML = `<h2>${categoryData.categoryName}</h2>`;
        categoryData.items.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: ${product.price}</p>
      `;
            productsDiv.appendChild(productDiv);
        });
    }
});
