import {
  categories as defaultCategories,
  dishes as defaultDishes,
  tasteFilters
} from './src/data/dishes.js';

const STORAGE_KEY = 'tom-restaurant-data-v1';
const SERVER_KEY_STORAGE = 'tom-serverchan-key';

const menuData = loadMenuData();
const categories = menuData.categories;
const dishes = menuData.dishes;

const categoryList = document.getElementById('categoryList');
const dishList = document.getElementById('dishList');
const heroGrid = document.getElementById('heroGrid');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const tasteFilterWrap = document.getElementById('tasteFilters');
const moodButton = document.getElementById('moodButton');
const dishTemplate = document.getElementById('dishTemplate');
const checkoutBtn = document.querySelector('.checkout-btn');
const toast = document.getElementById('toast');
const weeklyChart = document.getElementById('weeklyChart');
const insightSummary = document.getElementById('insightSummary');
const weeklyBadges = document.getElementById('weeklyBadges');
const logTodayBtn = document.getElementById('logTodayBtn');
const spiceModal = document.getElementById('spiceModal');
const spiceDishName = document.getElementById('spiceDishName');
const spiceDishDesc = document.getElementById('spiceDishDesc');
const spiceOptionsWrap = document.getElementById('spiceOptions');
const spiceConfirmBtn = document.getElementById('spiceConfirmBtn');
const checkoutModal = document.getElementById('checkoutModal');
const orderList = document.getElementById('orderList');
const orderTotalEl = document.getElementById('orderSummaryTotal');
const orderNote = document.getElementById('orderNote');
const orderSubmitBtn = document.getElementById('orderSubmitBtn');
const orderCancelBtn = document.getElementById('orderCancelBtn');
const serverKeyInput = document.getElementById('serverKeyInput');
const moodModal = document.getElementById('moodModal');
const moodOptionsWrap = document.getElementById('moodOptions');
const moodConfirmBtn = document.getElementById('moodConfirmBtn');
const moodCancelBtn = document.getElementById('moodCancelBtn');
const omakaseBtn = document.getElementById('omakaseBtn');

const state = {
  categoryId: categories[0]?.id ?? 'featured',
  tasteFilter: 'all',
  cart: {}
};

const spicePresets = [
  { id: 'none', label: '不要辣', emoji: '🙂' },
  { id: 'mild', label: '微辣', emoji: '🌶' },
  { id: 'spicy', label: '香辣', emoji: '🌶🌶' },
  { id: 'extreme', label: '特辣', emoji: '🔥' }
];

let pendingDish = null;
let selectedSpiceLabel = '';

function init() {
  renderCategories();
  renderTasteFilters();
  renderHeroCards();
  renderDishes();
  renderWeeklyInsights();
  updateCartSummary();
  attachGlobalEvents();
  registerServiceWorker();
  hydrateServerKeyInput();
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
    card.querySelector('button').addEventListener('click', () => handleAddDish(dish));
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
    btn.addEventListener('click', () => handleAddDish(dish));
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
    return matchCategory && matchTaste;
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

function handleAddDish(dish) {
  if (dish.categoryId === 'drinks') {
    addToCart(dish.id, { spice: '冰爽' });
    showToast(`饮品已加入：${dish.name}`);
    logDishToWeekly(dish);
    return;
  }
  openSpiceModal(dish);
}

function addToCart(id, options = {}) {
  const { spice = '主厨推荐' } = options;
  const key = `${id}|${spice}`;
  if (!state.cart[key]) {
    state.cart[key] = { id, spice, count: 0 };
  }
  state.cart[key].count += 1;
  updateCartSummary();
}

function updateCartSummary() {
  const entries = Object.values(state.cart);
  const totalCount = entries.reduce((sum, entry) => sum + entry.count, 0);
  const totalPrice = entries.reduce((sum, entry) => {
    const dish = dishes.find((item) => item.id === entry.id);
    return sum + (dish?.price ?? 0) * entry.count;
  }, 0);
  cartCount.textContent = totalCount;
  cartTotal.textContent = totalPrice.toFixed(0);
}

function attachGlobalEvents() {
  moodButton.addEventListener('click', openMoodModal);

  checkoutBtn.addEventListener('click', openCheckoutModal);
  logTodayBtn?.addEventListener('click', () => {
    logTodayIntake();
    renderWeeklyInsights();
  });
  logTodayBtn?.addEventListener('click', () => {
    logTodayIntake();
    renderWeeklyInsights();
  });

  spiceConfirmBtn?.addEventListener('click', handleSpiceConfirm);
  spiceModal?.addEventListener('click', (event) => {
    if (event.target === spiceModal || event.target.dataset.close !== undefined) {
      closeModal(spiceModal);
    }
  });

  checkoutModal?.addEventListener('click', (event) => {
    if (event.target === checkoutModal || event.target.dataset.close !== undefined) {
      closeModal(checkoutModal);
    }
  });
  orderCancelBtn?.addEventListener('click', () => closeModal(checkoutModal));
  orderSubmitBtn?.addEventListener('click', submitOrder);
  moodModal?.addEventListener('click', (event) => {
    if (event.target === moodModal || event.target.dataset.close !== undefined) {
      closeModal(moodModal);
    }
  });
  moodCancelBtn?.addEventListener('click', () => closeModal(moodModal));
  moodConfirmBtn?.addEventListener('click', confirmMoodChoice);
  omakaseBtn?.addEventListener('click', () => {
    closeModal(moodModal);
    serveOmakase();
  });
}

const WEEKLY_STORAGE_KEY = 'tom-weekly-intake-v1';

function getWeeklyData() {
  const today = new Date();
  const currentWeek = `${today.getFullYear()}-${getWeekNumber(today)}`;
  try {
    const saved = JSON.parse(localStorage.getItem(WEEKLY_STORAGE_KEY) || '{}');
    if (saved.week !== currentWeek) {
      return { week: currentWeek, days: defaultWeek() };
    }
    return saved;
  } catch (e) {
    return { week: currentWeek, days: defaultWeek() };
  }
}

function defaultWeek() {
  return ['一', '二', '三', '四', '五', '六', '日'].map((label) => ({ label, value: 0 }));
}

function getWeekNumber(date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const millisecsInDay = 86400000;
  return Math.ceil(((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7);
}

function renderWeeklyInsights() {
  if (!weeklyChart || !weeklyBadges) return;
  const data = getWeeklyData();
  weeklyChart.innerHTML = '';
  data.days.forEach((day) => {
    const bar = document.createElement('div');
    bar.className = 'insight-bar';
    bar.innerHTML = `
      <div class="bar">
        <div class="bar-fill" style="height:${Math.min(day.value, 100)}%"></div>
      </div>
      <span>${day.label}</span>
    `;
    weeklyChart.appendChild(bar);
  });
  const avg = Math.round(data.days.reduce((sum, d) => sum + d.value, 0) / data.days.length);
  insightSummary.textContent = avg > 70 ? '这周吃得很满足，记得多喝水 💧' : '还有空间尝试新口味 ✨';
  weeklyBadges.innerHTML = '';
  const badges = [];
  if (avg < 40) badges.push('少油少盐周');
  if (avg > 80) badges.push('重口味冒险周');
  if (data.days.filter((d) => d.value > 60).length >= 5) badges.push('连续好胃口');
  if (!badges.length) badges.push('记录你的每一餐');
  badges.forEach((badge) => {
    const span = document.createElement('span');
    span.textContent = badge;
    weeklyBadges.appendChild(span);
  });
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

function openSpiceModal(dish) {
  pendingDish = dish;
  selectedSpiceLabel = getSpiceLabel(dish.spiceLevel);
  spiceDishName.textContent = dish.name;
  spiceDishDesc.textContent = dish.description;
  renderSpiceOptions(selectedSpiceLabel);
  showModal(spiceModal);
}

const moodOptions = [
  { id: 'hunan', label: '湘菜下饭', emoji: '🌶' },
  { id: 'sichuan', label: '川菜冒汗', emoji: '🔥' },
  { id: 'cantonese', label: '粤菜清淡', emoji: '🥢' },
  { id: 'airfryer', label: '空气炸锅快手', emoji: '⚡️' },
  { id: 'fit', label: '健身友好', emoji: '💪' }
];
let selectedMood = null;

function openMoodModal() {
  selectedMood = null;
  renderMoodOptions();
  showModal(moodModal);
}

function renderMoodOptions() {
  if (!moodOptionsWrap) return;
  moodOptionsWrap.innerHTML = '';
  moodOptions.forEach((option) => {
    const btn = document.createElement('button');
    btn.className = 'option-chip';
    btn.type = 'button';
    btn.innerHTML = `<span>${option.emoji}</span> <span>${option.label}</span>`;
    btn.addEventListener('click', () => {
      selectedMood = option.id;
      moodOptionsWrap.querySelectorAll('.option-chip').forEach((el) => el.classList.remove('active'));
      btn.classList.add('active');
    });
    moodOptionsWrap.appendChild(btn);
  });
}

function confirmMoodChoice() {
  if (!selectedMood) {
    showToast('先选一个主题吧');
    return;
  }
  closeModal(moodModal);
  const candidates = dishes.filter((dish) => dish.categoryId === selectedMood);
  const choice = candidates[Math.floor(Math.random() * candidates.length)];
  if (!choice) {
    showToast('该主题暂无菜品，换一个吧');
    return;
  }
  state.categoryId = choice.categoryId;
  state.tasteFilter = 'all';
  renderCategories();
  renderTasteFilters();
  renderDishes();
  addToCart(choice.id, { spice: getSpiceLabel(choice.spiceLevel) });
  logDishToWeekly(choice);
  showToast(`安排 ${choice.name}`);
}

function serveOmakase() {
  closeModal(moodModal);
  const weakSpots = getWeeklyData().days
    .map((day, idx) => ({ idx, value: day.value }))
    .sort((a, b) => a.value - b.value);
  const categoryPool = ['hunan', 'sichuan', 'cantonese', 'airfryer', 'fit'];
  const nextCategory = categoryPool[weakSpots[0].idx % categoryPool.length];
  const candidates = dishes.filter((dish) => dish.categoryId === nextCategory);
  const choice = candidates[Math.floor(Math.random() * candidates.length)] || dishes[0];
  addToCart(choice.id, { spice: getSpiceLabel(choice.spiceLevel) });
  logDishToWeekly(choice);
  showToast(`Omakase：${choice.name}`);
}

function renderSpiceOptions(activeLabel) {
  if (!spiceOptionsWrap) return;
  spiceOptionsWrap.innerHTML = '';
  spicePresets.forEach((preset) => {
    const btn = document.createElement('button');
    btn.className = 'option-chip';
    btn.type = 'button';
    btn.innerHTML = `<span>${preset.emoji}</span> <span>${preset.label}</span>`;
    if (preset.label === activeLabel) btn.classList.add('active');
    btn.addEventListener('click', () => {
      selectedSpiceLabel = preset.label;
      spiceOptionsWrap.querySelectorAll('.option-chip').forEach((el) => el.classList.remove('active'));
      btn.classList.add('active');
    });
    spiceOptionsWrap.appendChild(btn);
  });
}

function handleSpiceConfirm() {
  if (!pendingDish) {
    closeModal(spiceModal);
    return;
  }
  addToCart(pendingDish.id, { spice: selectedSpiceLabel });
  logDishToWeekly(pendingDish);
  showToast(`${pendingDish.name} · ${selectedSpiceLabel}`);
  pendingDish = null;
  closeModal(spiceModal);
}

function openCheckoutModal() {
  const entries = Object.values(state.cart);
  if (!entries.length) {
    showToast('先随便挑两道菜吧～');
    return;
  }
  renderOrderSummary(entries);
  orderNote.value = '';
  showModal(checkoutModal);
}

function renderOrderSummary(entries) {
  orderList.innerHTML = '';
  const fragments = document.createDocumentFragment();
  entries.forEach((entry) => {
    const dish = dishes.find((item) => item.id === entry.id);
    const item = document.createElement('div');
    item.className = 'order-item';
    item.innerHTML = `
      <div>
        <p>${dish?.name ?? '未命名'} × ${entry.count}</p>
        <p class="order-spice">${entry.spice}</p>
      </div>
      <strong>¥${(dish?.price ?? 0) * entry.count}</strong>
    `;
    fragments.appendChild(item);
  });
  orderList.appendChild(fragments);
  const totalPrice = entries.reduce((sum, entry) => {
    const dish = dishes.find((item) => item.id === entry.id);
    return sum + (dish?.price ?? 0) * entry.count;
  }, 0);
  orderTotalEl.textContent = totalPrice.toFixed(0);
}

async function submitOrder() {
  const entries = Object.values(state.cart);
  if (!entries.length) {
    showToast('篮子里还没有菜');
    return;
  }
  const order = {
    items: entries.map((entry) => {
      const dish = dishes.find((item) => item.id === entry.id);
      return {
        name: dish?.name ?? entry.id,
        count: entry.count,
        spice: entry.spice,
        price: dish?.price ?? 0
      };
    }),
    total: Number(orderTotalEl.textContent),
    note: orderNote.value.trim()
  };
  const notifyResult = await sendWeChatNotification(order);
  showToast(notifyResult.success ? '已发送给 Tom ❤️' : '订单已记录，稍后告诉 Tom');
  state.cart = {};
  updateCartSummary();
  renderWeeklyInsights();
  closeModal(checkoutModal);
}

async function sendWeChatNotification(order) {
  const key = serverKeyInput?.value.trim();
  if (!key) return { success: false, reason: 'NO_KEY' };
  localStorage.setItem(SERVER_KEY_STORAGE, key);
  try {
    const title = `ada 下单 ${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    const lines = order.items
      .map((item) => `- ${item.name} × ${item.count}（${item.spice}） ¥${item.price * item.count}`)
      .join('\n');
    const body = `${lines}\n\n合计：¥${order.total}\n备注：${order.note || '无'}`;
    const params = new URLSearchParams();
    params.append('title', title);
    params.append('desp', body);
    const response = await fetch(`https://sctapi.ftqq.com/${key}.send`, {
      method: 'POST',
      body: params
    });
    const data = await response.json();
    if (data?.code === 0) return { success: true };
    console.warn('Server酱返回异常', data);
    return { success: false, reason: data?.message };
  } catch (error) {
    console.warn('Server酱发送失败', error);
    return { success: false, reason: error.message };
  }
}

function showModal(modal) {
  modal?.classList.add('show');
}

function closeModal(modal) {
  modal?.classList.remove('show');
}

function hydrateServerKeyInput() {
  if (!serverKeyInput) return;
  const saved = localStorage.getItem(SERVER_KEY_STORAGE);
  if (saved) serverKeyInput.value = saved;
  serverKeyInput.addEventListener('change', () => {
    const value = serverKeyInput.value.trim();
    if (value) {
      localStorage.setItem(SERVER_KEY_STORAGE, value);
    } else {
      localStorage.removeItem(SERVER_KEY_STORAGE);
    }
  });
}

function getSpiceLabel(level) {
  if (!level) return '主厨推荐';
  const found = spicePresets.find((preset) => preset.id === level);
  return found?.label ?? '主厨推荐';
}

function logDishToWeekly(dish) {
  const weekly = getWeeklyData();
  const index = getTodayIndex();
  weekly.days[index].value = Math.min(100, weekly.days[index].value + 20);
  localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify(weekly));
  renderWeeklyInsights();
}

function logTodayIntake() {
  const weekly = getWeeklyData();
  const index = getTodayIndex();
  weekly.days[index].value = Math.min(100, weekly.days[index].value + 10);
  localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify(weekly));
  showToast('今天的饮食已登记');
}

function getTodayIndex() {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
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
