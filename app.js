import {
  categories as defaultCategories,
  dishes as defaultDishes,
  tasteFilters,
  spiceFilters as defaultSpiceFilters,
  saltFilters as defaultSaltFilters
} from './src/data/dishes.js';

const STORAGE_KEY = 'tom-restaurant-data-v1';
const menuData = loadMenuData();
const categories = menuData.categories;
const dishes = menuData.dishes;

const categoryList = document.getElementById('categoryList');
const dishList = document.getElementById('dishList');
const heroGrid = document.getElementById('heroGrid');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const tasteFilterWrap = document.getElementById('tasteFilters');
const spiceFilterWrap = document.getElementById('spiceFilters');
const saltFilterWrap = document.getElementById('saltFilters');
const moodButton = document.getElementById('moodButton');
const dishTemplate = document.getElementById('dishTemplate');
const checkoutBtn = document.querySelector('.checkout-btn');
const toast = document.getElementById('toast');
const drinkListEl = document.getElementById('drinkList');
const drinkMeta = document.getElementById('drinkMeta');

const spiceFilters = defaultSpiceFilters;
const saltFilters = defaultSaltFilters;

const state = {
  categoryId: categories[0]?.id ?? 'featured',
  tasteFilter: 'all',
  spiceFilter: 'all',
  saltFilter: 'all',
  cart: {}
};

function init() {
  renderCategories();
  renderTasteFilters();
  renderSpiceFilters();
  renderSaltFilters();
  renderDrinks();
  renderHeroCards();
  renderDishes();
  updateCartSummary();
  attachGlobalEvents();
  registerServiceWorker();
}

function renderCategories() {
  categoryList.innerHTML = '';
  if (!categories.length) {
    categoryList.innerHTML = '<p>暂无分类</p>';
    return;
  }
  categories.forEach((category) => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    btn.textContent = `${category.emoji} ${category.name}`;
    if (category.id === state.categoryId) btn.classList.add('active');
    btn.addEventListener('click', () => {
      state.categoryId = category.id;
      document
        .querySelectorAll('.category-btn')
        .forEach((el) => el.classList.remove('active'));
      btn.classList.add('active');
      renderDishes();
    });
    categoryList.appendChild(btn);
  });
}

function renderTasteFilters() {
  renderFilterChips(tasteFilterWrap, tasteFilters, 'tasteFilter');
}

function renderSpiceFilters() {
  renderFilterChips(spiceFilterWrap, spiceFilters, 'spiceFilter');
}

function renderSaltFilters() {
  renderFilterChips(saltFilterWrap, saltFilters, 'saltFilter');
}

function renderFilterChips(target, options, stateKey) {
  if (!target) return;
  target.innerHTML = '';
  options.forEach((option) => {
    const chip = document.createElement('button');
    chip.className = 'filter-chip';
    chip.textContent = option.label;
    if (option.id === state[stateKey]) chip.classList.add('active');
    chip.addEventListener('click', () => {
      state[stateKey] = option.id;
      target.querySelectorAll('.filter-chip').forEach((el) => el.classList.remove('active'));
      chip.classList.add('active');
      renderDishes();
    });
    target.appendChild(chip);
  });
}

function renderHeroCards() {
  heroGrid.innerHTML = '';
  const heroDishes = dishes.filter((dish) => dish.hero);
  heroDishes.forEach((dish) => {
    const card = document.createElement('div');
    card.className = 'hero-card';
    card.innerHTML = `
      <span class="emoji">${dish.heat.includes('🌶') ? '🔥' : '💛'}</span>
      <p class="label">${getCategoryName(dish.categoryId)}</p>
      <h3>${dish.name}</h3>
      <p>${dish.description}</p>
      <button data-dish="${dish.id}">马上安排</button>
    `;
    card.querySelector('button').addEventListener('click', () => addToCart(dish.id));
    heroGrid.appendChild(card);
  });
}

function renderDishes() {
  dishList.innerHTML = '';
  getVisibleDishes().forEach((dish) => {
    const node = dishTemplate.content.cloneNode(true);
    node.querySelector('.dish-img').src = dish.image;
    node.querySelector('.dish-img').alt = dish.name;
    node.querySelector('h3').textContent = dish.name;
    node.querySelector('.price').textContent = `¥${dish.price}`;
    node.querySelector('.desc').textContent = dish.description;

    const meta = node.querySelector('.meta');
    meta.innerHTML = '';
    [
      getCategoryName(dish.categoryId),
      `${dish.heat}`,
      `${dish.calories} kcal`,
      `${dish.protein}g 蛋白`
    ]
      .concat(dish.tags)
      .forEach((item) => {
        const span = document.createElement('span');
        span.textContent = item;
        meta.appendChild(span);
      });

    const btn = node.querySelector('.add-btn');
    btn.addEventListener('click', () => addToCart(dish.id));
    dishList.appendChild(node);
  });
}

function getVisibleDishes() {
  return dishes.filter((dish) => {
    const isDrink = dish.categoryId === 'drinks';
    const matchCategory =
      state.categoryId === 'featured'
        ? !isDrink
        : dish.categoryId === state.categoryId;
    const matchTaste = matchTasteFilter(dish, state.tasteFilter);
    const matchSpiceLevel = matchSpice(dish, state.spiceFilter);
    const matchSaltLevel = matchSalt(dish, state.saltFilter);
    return matchCategory && matchTaste && matchSpiceLevel && matchSaltLevel;
  });
}

function matchTasteFilter(dish, filter) {
  if (filter === 'all') return true;
  if (filter === 'mild') return dish.tags.includes('少辣') || dish.heat === '不辣';
  if (filter === 'spicy') return dish.tags.includes('香辣') || dish.heat.includes('🌶');
  if (filter === 'comfort') return dish.tags.includes('下饭');
  if (filter === 'fitness') return dish.tags.includes('健身友好');
  if (filter === 'quick') return dish.tags.includes('快手') || dish.categoryId === 'airfryer';
  return true;
}

function matchSpice(dish, filter) {
  if (filter === 'all') return true;
  return dish.spiceLevel === filter;
}

function matchSalt(dish, filter) {
  if (filter === 'all') return true;
  return dish.saltLevel === filter;
}

function addToCart(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  updateCartSummary();
  const button = document.querySelector(`button[data-dish="${id}"]`);
  if (button) {
    button.textContent = '已安排✓';
    setTimeout(() => (button.textContent = '马上安排'), 1500);
  }
}

function updateCartSummary() {
  const entries = Object.entries(state.cart);
  const totalCount = entries.reduce((sum, [, count]) => sum + count, 0);
  const totalPrice = entries.reduce((sum, [id, count]) => {
    const dish = dishes.find((item) => item.id === id);
    return sum + (dish?.price ?? 0) * count;
  }, 0);
  cartCount.textContent = totalCount;
  cartTotal.textContent = totalPrice.toFixed(0);
}

function attachGlobalEvents() {
  moodButton.addEventListener('click', () => {
    if (!dishes.length) return;
    const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
    state.categoryId = randomDish.categoryId;
    state.tasteFilter = 'all';
    renderCategories();
    renderTasteFilters();
    renderDishes();
    addToCart(randomDish.id);
  });

  checkoutBtn.addEventListener('click', () => {
    const total = Number(cartTotal.textContent);
    if (total === 0) {
      showToast('先随便挑两道菜吧～');
      return;
    }
    showToast('收到！马上安排给 adaaa❤️tom');
    state.cart = {};
    updateCartSummary();
  });
}

function renderDrinks() {
  if (!drinkListEl) return;
  const drinks = dishes.filter((dish) => dish.categoryId === 'drinks');
  drinkListEl.innerHTML = '';
  drinks.forEach((drink) => {
    const card = document.createElement('article');
    card.className = 'drink-card';
    card.innerHTML = `
      <img src=\"${drink.image}\" alt=\"${drink.name}\" />
      <h3>${drink.name}</h3>
      <p>${drink.description}</p>
      <div class=\"tags\">
        ${drink.tags.map((tag) => `<span>${tag}</span>`).join('')}
      </div>
    `;
    const btn = document.createElement('button');
    btn.textContent = `安排 ¥${drink.price}`;
    btn.addEventListener('click', () => addToCart(drink.id));
    card.appendChild(btn);
    drinkListEl.appendChild(card);
  });
  if (drinkMeta) {
    const lowSugarCount = drinks.filter((d) => d.tags.includes('无糖') || d.tags.includes('低糖')).length;
    drinkMeta.textContent = `${drinks.length} 款饮品 · ${lowSugarCount} 款无糖/低糖`;
  }
}

function getCategoryName(id) {
  return categories.find((cat) => cat.id === id)?.name ?? '';
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('SW registration failed', err);
    });
  }
}

function loadMenuData() {
  if (!supportsLocalStorage()) return getDefaultMenu();
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultMenu();
    const parsed = JSON.parse(stored);
    const customCategories =
      Array.isArray(parsed.categories) && parsed.categories.length
        ? parsed.categories
        : defaultCategories;
    const customDishes =
      Array.isArray(parsed.dishes) && parsed.dishes.length ? parsed.dishes : defaultDishes;
    return { categories: customCategories, dishes: customDishes };
  } catch (error) {
    console.warn('加载自定义菜单失败，已使用默认菜单', error);
    return getDefaultMenu();
  }
}

function getDefaultMenu() {
  return { categories: defaultCategories, dishes: defaultDishes };
}

function supportsLocalStorage() {
  try {
    return typeof window !== 'undefined' && 'localStorage' in window;
  } catch (error) {
    return false;
  }
}

let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

init();
