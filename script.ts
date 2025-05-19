// Інтерфейси для структури JSON-даних
interface Category {
  id: number;
  name: string;
  shortname: string;
  notes: string;
}

interface Product {
  id: string; 
  name: string;
  shortname: string;
  description: string;
  price: number | string;
  image: string;
}

interface CategoryData {
  categoryName: string;
  items: Product[];
}

document.addEventListener('DOMContentLoaded', () => {
  // Типізація DOM-елементів
  const homeLink = document.getElementById('home-link') as HTMLAnchorElement | null;
  const catalogLink = document.getElementById('catalog-link') as HTMLAnchorElement | null;
  const categoriesDiv = document.getElementById('categories') as HTMLDivElement | null;
  const productsDiv = document.getElementById('products') as HTMLDivElement | null;

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

  async function loadCategories(): Promise<void> {
    try {
      const response = await fetch('data/categories.json');
      const categories: Category[] = await response.json();
      displayCategories(categories);
    } catch (error: unknown) {
      console.error('Error loading categories:', error);
    }
  }

  function displayCategories(categories: Category[]): void {
    categoriesDiv!.innerHTML = '';
    productsDiv!.innerHTML = '';

    categories.forEach((category: Category) => {
      const categoryLink = document.createElement('a') as HTMLAnchorElement;
      categoryLink.href = '#';
      categoryLink.textContent = category.name;
      categoryLink.addEventListener('click', () => {
        loadProducts(category.shortname);
      });
      categoriesDiv!.appendChild(categoryLink);
      categoriesDiv!.appendChild(document.createElement('br'));
    });

    const specialsLink = document.createElement('a') as HTMLAnchorElement;
    specialsLink.href = '#';
    specialsLink.textContent = 'Specials';
    specialsLink.addEventListener('click', () => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      loadProducts(randomCategory.shortname);
    });
    categoriesDiv!.appendChild(specialsLink);
  }

  async function loadProducts(categoryShortname: string): Promise<void> {
    try {
      const response = await fetch(`data/${categoryShortname}.json`);
      const categoryData: CategoryData = await response.json();
      displayProducts(categoryData);
    } catch (error: unknown) {
      console.error('Error loading products:', error);
    }
  }

  function displayProducts(categoryData: CategoryData): void {
    productsDiv!.innerHTML = `<h2>${categoryData.categoryName}</h2>`;
    categoryData.items.forEach((product: Product) => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: ${product.price}</p>
      `;
      productsDiv!.appendChild(productDiv);
    });
  }
});