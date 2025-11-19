export const categories = [
  { id: 'featured', name: '今日特选', emoji: '✨', description: '随便挑一个惊喜' },
  { id: 'hunan', name: '湘菜', emoji: '🌶', description: '重口味、够辣爽' },
  { id: 'sichuan', name: '川菜', emoji: '🍃', description: '待老公开发' },
  { id: 'cantonese', name: '粤菜', emoji: '🥢', description: '清淡鲜甜' },
  { id: 'airfryer', name: '空气炸锅', emoji: '⚡️', description: '10 分钟就能开吃' },
  { id: 'fit', name: '健身餐', emoji: '💪', description: '高蛋白低油盐' },
  { id: 'fastfood', name: '快餐', emoji: '🍜', description: '等不了一点儿' },
  { id: 'drinks', name: '饮品', emoji: '🥤', description: '今日饮料/无糖' }
];

export const tasteFilters = [
  { id: 'all', label: '随便吃即可' },
  { id: 'mild', label: '少辣顺口' },
  { id: 'spicy', label: '香辣冒汗' },
  { id: 'comfort', label: '今晚下饭' },
  { id: 'fitness', label: '健身友好' },
  { id: 'quick', label: '空气炸锅快手' }
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
    spiceLevel: 'spicy',
    saltLevel: 'bold',
    tags: ['香辣', '下饭'],
    image:
      'https://images.unsplash.com/photo-1608039829574-1d5132e3f760?auto=format&fit=crop&w=900&q=60',
    hero: true
  },
  {
    id: 'duojiao-fish-head',
    categoryId: 'hunan',
    name: '酸菜鱼',
    description: '酸菜比鱼好吃！',
    price: 48,
    heat: '🌶🌶🌶',
    calories: 430,
    protein: 44,
    spiceLevel: 'extreme',
    saltLevel: 'bold',
    tags: ['香辣'],
    image: 'https://imgs.699pic.com/images/603/633/389.jpg!seo.v1'
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
    spiceLevel: 'mild',
    saltLevel: 'bold',
    tags: ['少辣', '招牌'],
    image:
      'https://images.unsplash.com/photo-1608039829574-1d5132e3f760?auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'qingzheng-yuji',
    categoryId: 'cantonese',
    name: '葱油手撕鸡',
    description: '姜丝酱油，超嫩多汁',
    price: 58,
    heat: '不辣',
    calories: 360,
    protein: 40,
    spiceLevel: 'none',
    saltLevel: 'balanced',
    tags: ['少辣', '健身友好'],
    image: 'https://imgs.699pic.com/images/350/056/060.jpg!seo.v1',
    hero: true
  },
  {
    id: 'airfryer-wings',
    categoryId: 'airfryer',
    name: '空气炸锅鸡翅',
    description: '15 分钟完成，0 油烟',
    price: 26,
    heat: '微辣',
    calories: 420,
    protein: 28,
    spiceLevel: 'mild',
    saltLevel: 'balanced',
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
    spiceLevel: 'spicy',
    saltLevel: 'bold',
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
    spiceLevel: 'none',
    saltLevel: 'light',
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
    spiceLevel: 'mild',
    saltLevel: 'balanced',
    tags: ['下饭', '健身友好'],
    image:
      'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'zero-coke',
    categoryId: 'drinks',
    name: '无糖可乐',
    description: '冰爽 0 卡，配辣菜刚刚好',
    price: 6,
    heat: '不辣',
    calories: 0,
    protein: 0,
    spiceLevel: 'none',
    saltLevel: 'light',
    tags: ['无糖', '冰镇'],
    image:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'sprite-zero',
    categoryId: 'drinks',
    name: '雪碧纤维+',
    description: '0 糖 0 脂，气泡拉满',
    price: 7,
    heat: '不辣',
    calories: 0,
    protein: 0,
    spiceLevel: 'none',
    saltLevel: 'light',
    tags: ['无糖', '今日推荐'],
    image:
      'https://images.unsplash.com/photo-1514361892635-6e122620eaff?auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'soy-milk',
    categoryId: 'drinks',
    name: '冰豆浆',
    description: '低糖豆浆，早餐或加餐都适合',
    price: 8,
    heat: '不辣',
    calories: 120,
    protein: 7,
    spiceLevel: 'none',
    saltLevel: 'light',
    tags: ['低糖', '蛋白质'],
    image:
      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15f?auto=format&fit=crop&w=900&q=60'
  },
  {
    id: 'dish-1763528781376-1376',
    categoryId: 'cantonese',
    name: '可乐鸡翅',
    description: '零糖鸡翅，ada最爱',
    price: 38,
    heat: '不辣',
    calories: 380,
    protein: 30,
    tags: ['健康，美味'],
    image: 'https://imgs.699pic.com/images/500/945/803.jpg!seo.v1',
    hero: true,
    spiceLevel: 'none',
    saltLevel: 'balanced'
  },
  {
    id: 'dish-1763551363898-3898',
    categoryId: 'sichuan',
    name: '火锅',
    description: '在寒冷的冬天用热热的火锅温暖你～',
    price: 1,
    heat: '微辣',
    calories: 'n',
    protein: 'n',
    tags: ['暖胃'],
    image: 'https://imgs.699pic.com/images/507/180/335.jpg!seo.v1',
    hero: false,
    spiceLevel: 'mild',
    saltLevel: 'balanced'
  }
];
