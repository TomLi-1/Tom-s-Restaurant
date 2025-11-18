export const categories = [
  { id: 'featured', name: '今日特选', emoji: '✨', description: '随便挑一个惊喜' },
  { id: 'hunan', name: '湘菜', emoji: '🌶', description: '重口味、够辣爽' },
  { id: 'cantonese', name: '粤菜', emoji: '🥢', description: '清淡鲜甜' },
  { id: 'airfryer', name: '空气炸锅', emoji: '⚡️', description: '10 分钟就能开吃' },
  { id: 'fit', name: '健身餐', emoji: '💪', description: '高蛋白低油盐' }
];

export const tasteFilters = [
  { id: 'all', label: '全部口味' },
  { id: 'mild', label: '少辣' },
  { id: 'spicy', label: '香辣' },
  { id: 'comfort', label: '下饭' },
  { id: 'fitness', label: '健身友好' }
];

export const dishes = [
  {
    id: 'sour-beef',
    categoryId: 'hunan',
    name: '酸汤肥牛',
    description: '酸香开胃 + 脆爽金针菇',
    price: 36,
    heat: '🌶🌶',
    calories: 520,
    protein: 32,
    tags: ['香辣', '下饭'],
    image:
      'https://images.unsplash.com/photo-1608039829574-1d5132e3f760?auto=format&fit=crop&w=900&q=60',
    hero: true
  },
  {
    id: 'duojiao-fish-head',
    categoryId: 'hunan',
    name: '剁椒鱼头',
    description: '蒸汽锁鲜，糯米椒辣度可调',
    price: 48,
    heat: '🌶🌶🌶',
    calories: 430,
    protein: 44,
    tags: ['香辣'],
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'hongshaorou',
    categoryId: 'cantonese',
    name: '蜜汁红烧肉',
    description: '慢火卤制，入口即化',
    price: 42,
    heat: '微辣',
    calories: 610,
    protein: 23,
    tags: ['少辣', '招牌'],
    image:
      'https://images.unsplash.com/photo-1608039829574-1d5132e3f760?auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'qingzheng-yuji',
    categoryId: 'cantonese',
    name: '清蒸鲈鱼',
    description: '姜丝酱油，超嫩多汁',
    price: 58,
    heat: '不辣',
    calories: 360,
    protein: 40,
    tags: ['少辣', '健身友好'],
    image:
      'https://images.unsplash.com/photo-1589985270826-2e4c9e90a04e?auto=format&fit=crop&w=900&q=60',
    hero: true
  },
  {
    id: 'airfryer-wings',
    categoryId: 'airfryer',
    name: '空气炸锅蜜汁鸡翅',
    description: '15 分钟完成，0 油烟',
    price: 26,
    heat: '微辣',
    calories: 420,
    protein: 28,
    tags: ['香辣', '快手'],
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'airfryer-veggies',
    categoryId: 'airfryer',
    name: '孜然空气炸锅土豆块',
    description: '粗粮饱腹，孜然超香',
    price: 18,
    heat: '🌶',
    calories: 290,
    protein: 8,
    tags: ['下饭', '快手'],
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'fit-bowl',
    categoryId: 'fit',
    name: '高蛋白彩虹碗',
    description: '鸡胸、牛油果、彩椒和糙米',
    price: 38,
    heat: '不辣',
    calories: 420,
    protein: 45,
    tags: ['健身友好'],
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=60',
    hero: true
  },
  {
    id: 'fit-soup',
    categoryId: 'fit',
    name: '番茄牛腩汤',
    description: '慢炖 2 小时，暖胃又有饱腹感',
    price: 32,
    heat: '少辣',
    calories: 380,
    protein: 35,
    tags: ['下饭', '健身友好'],
    image:
      'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=60'
  }
];
