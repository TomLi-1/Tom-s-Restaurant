import {
  categories as defaultCategories,
  dishes as defaultDishes
} from './src/data/dishes.js';

const STORAGE_KEY = 'tom-restaurant-data-v1';
const editor = document.getElementById('dataEditor');
const statusEl = document.getElementById('status');
const statsEl = document.getElementById('stats');
const quickAddForm = document.getElementById('quickAddForm');

const defaultData = getDefaultData();
const initialData = loadStoredData() ?? defaultData;
editor.value = stringify(initialData);
updateStats(initialData);

document.getElementById('saveBtn').addEventListener('click', handleSave);
document.getElementById('resetBtn').addEventListener('click', handleReset);
document.getElementById('copyBtn').addEventListener('click', handleCopy);
quickAddForm.addEventListener('submit', handleQuickAdd);

function handleSave() {
  try {
    const parsed = parseEditor();
    validateStructure(parsed);
    persist(parsed);
    updateStats(parsed);
    setStatus('✅ 已保存到浏览器');
  } catch (error) {
    setStatus(`❌ 保存失败：${error.message}`);
  }
}

function handleReset() {
  if (!supportsLocalStorage()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  editor.value = stringify(defaultData);
  updateStats(defaultData);
  setStatus('已恢复默认菜单');
}

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(editor.value);
    setStatus('已复制 JSON');
  } catch (error) {
    setStatus('复制失败，浏览器未授权');
  }
}

function handleQuickAdd(event) {
  event.preventDefault();
  try {
    const data = parseEditor();
    validateStructure(data);
    const payload = buildDishFromForm(new FormData(quickAddForm));
    data.dishes.push(payload);
    editor.value = stringify(data);
    updateStats(data);
    quickAddForm.reset();
    setStatus(`已插入 ${payload.name}，记得点击“保存到浏览器”`);
  } catch (error) {
    setStatus(`新增失败：${error.message}`);
  }
}

function buildDishFromForm(formData) {
  const name = formData.get('name')?.trim();
  const categoryId = formData.get('categoryId')?.trim();
  if (!name || !categoryId) throw new Error('菜名和分类 ID 必填');
  const description = formData.get('description')?.trim() || '这道菜由你亲手安排';
  const price = Number(formData.get('price')) || 0;
  const heat = formData.get('heat')?.trim() || '不辣';
  const image =
    formData.get('image')?.trim() ||
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=60';
  const tags = (formData.get('tags') || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
  const calories = Number(formData.get('calories')) || 0;
  const protein = Number(formData.get('protein')) || 0;
  const hero = formData.get('hero') === 'on';

  return {
    id: `${slugify(name)}-${Date.now().toString().slice(-4)}`,
    categoryId,
    name,
    description,
    price,
    heat,
    calories,
    protein,
    tags,
    image,
    hero
  };
}

function parseEditor() {
  try {
    return JSON.parse(editor.value);
  } catch (error) {
    throw new Error('JSON 语法错误，请检查逗号或引号');
  }
}

function validateStructure(data) {
  if (!data || typeof data !== 'object') throw new Error('数据结构需为对象');
  if (!Array.isArray(data.categories) || !data.categories.length)
    throw new Error('categories 必须是非空数组');
  if (!Array.isArray(data.dishes) || !data.dishes.length)
    throw new Error('dishes 必须是非空数组');
}

function persist(data) {
  if (!supportsLocalStorage()) throw new Error('当前环境无法写入 localStorage');
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadStoredData() {
  if (!supportsLocalStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    validateStructure(parsed);
    return parsed;
  } catch (error) {
    console.warn('Failed to parse stored menu', error);
    return null;
  }
}

function stringify(data) {
  return JSON.stringify(data, null, 2);
}

function getDefaultData() {
  return { categories: defaultCategories, dishes: defaultDishes };
}

function supportsLocalStorage() {
  try {
    return typeof window !== 'undefined' && 'localStorage' in window;
  } catch (error) {
    return false;
  }
}

function slugify(text) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `dish-${Date.now()}`
  );
}

function updateStats(data) {
  statsEl.textContent = `${data.categories.length} 个分类 · ${data.dishes.length} 道菜`;
}

function setStatus(message) {
  statusEl.textContent = message;
}
