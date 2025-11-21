export const categories = [
  {
    "id": "featured",
    "name": "今日特选",
    "emoji": "✨",
    "description": "随便挑一个惊喜"
  },
  {
    "id": "hunan",
    "name": "湘菜",
    "emoji": "🌶",
    "description": "重口味、够辣爽"
  },
  {
    "id": "sichuan",
    "name": "川菜",
    "emoji": "🍃",
    "description": "待老公开发"
  },
  {
    "id": "cantonese",
    "name": "粤菜",
    "emoji": "🥢",
    "description": "清淡鲜甜"
  },
  {
    "id": "dongbei",
    "name": "东北菜",
    "emoji": "🥩",
    "description": "待老公开发"
  },
  {
    "id": "airfryer",
    "name": "空气炸锅",
    "emoji": "⚡️",
    "description": "10 分钟就能开吃"
  },
  {
    "id": "fit",
    "name": "健身餐",
    "emoji": "💪",
    "description": "高蛋白低油盐"
  },
  {
    "id": "fastfood",
    "name": "快餐",
    "emoji": "🍜",
    "description": "等不了一点儿"
  },
  {
    "id": "drinks",
    "name": "饮品",
    "emoji": "🥤",
    "description": "今日饮料/无糖"
  }
]

export const tasteFilters = [
  {
    "id": "all",
    "label": "随便吃即可"
  },
  {
    "id": "mild",
    "label": "少辣顺口"
  },
  {
    "id": "spicy",
    "label": "香辣冒汗"
  },
  {
    "id": "comfort",
    "label": "今晚下饭"
  },
  {
    "id": "fitness",
    "label": "健身友好"
  },
  {
    "id": "quick",
    "label": "空气炸锅快手"
  }
]

export const dishes = [
  {
    "id": "sour-beef",
    "categoryId": "hunan",
    "name": "酸汤肥牛",
    "description": "酸香开胃 + 脆爽金针菇",
    "price": 1,
    "heat": "🌶🌶",
    "calories": 520,
    "protein": 32,
    "spiceLevel": "spicy",
    "saltLevel": "bold",
    "tags": [
      "香辣",
      "下饭"
    ],
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-yIl90uPn7EiUQnM7n7a_Wx7PMG1EVm4YWA&s",
    "hero": true
  },
  {
    "id": "xiaochaorou",
    "categoryId": "hunan",
    "name": "农家小炒肉",
    "description": "老公招牌",
    "price": 1,
    "heat": "🌶🌶🌶",
    "calories": 520,
    "protein": 44,
    "spiceLevel": "extreme",
    "saltLevel": "bold",
    "tags": [
      "香辣"
    ],
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREvB4-oqu3KGZKLiUC4qlcq6_PDpAoBVSm_g&s"
  },
  {
    "id": "duojiao-fish-head",
    "categoryId": "hunan",
    "name": "酸菜鱼",
    "description": "酸菜比鱼好吃！",
    "price": 1,
    "heat": "🌶🌶🌶",
    "calories": 430,
    "protein": 44,
    "spiceLevel": "extreme",
    "saltLevel": "bold",
    "tags": [
      "香辣"
    ],
    "image": "https://imgs.699pic.com/images/603/633/389.jpg!seo.v1"
  },
  {
    "id": "xiaochaobeef",
    "categoryId": "hunan",
    "name": "小炒香菜黄牛肉",
    "description": "老公招牌",
    "price": 1,
    "heat": "🌶🌶🌶",
    "calories": 430,
    "protein": 44,
    "spiceLevel": "extreme",
    "saltLevel": "bold",
    "tags": [
      "香辣"
    ],
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIKZivSb_zxS3lb7W5BI6NZULxwx31h2h3Nw&s"
  },
  {
    "id": "luroufan",
    "categoryId": "cantonese",
    "name": "Tom招牌卤肉饭",
    "description": "慢火卤制，入口即化",
    "price": 1,
    "heat": "微辣",
    "calories": 610,
    "protein": 23,
    "spiceLevel": "mild",
    "saltLevel": "bold",
    "tags": [
      "少辣",
      "招牌"
    ],
    "image": "https://p6.itc.cn/images01/20230531/ceb6a1ef2d5344a59898d4efd151afb9.png"
  },
  {
    "id": "qingzheng-yuji",
    "categoryId": "cantonese",
    "name": "葱油手撕鸡",
    "description": "姜丝酱油，超嫩多汁",
    "price": 1,
    "heat": "不辣",
    "calories": 360,
    "protein": 40,
    "spiceLevel": "none",
    "saltLevel": "balanced",
    "tags": [
      "少辣",
      "健身友好"
    ],
    "image": "https://imgs.699pic.com/images/350/056/060.jpg!seo.v1",
    "hero": true
  },
  {
    "id": "qingzheng-yuji",
    "categoryId": "cantonese",
    "name": "葱油手撕鸡",
    "description": "姜丝酱油，超嫩多汁",
    "price": 1,
    "heat": "不辣",
    "calories": 360,
    "protein": 40,
    "spiceLevel": "none",
    "saltLevel": "balanced",
    "tags": [
      "少辣",
      "健身友好"
    ],
    "image": "https://imgs.699pic.com/images/350/056/060.jpg!seo.v1",
    "hero": true
  },
  {
    "id": "suancaipaigu",
    "categoryId": "dongbei",
    "name": "酸菜排骨",
    "description": "暴杀ada的广东老公拿下正宗东北菜",
    "price": 1,
    "heat": "不辣",
    "calories": 420,
    "protein": 28,
    "spiceLevel": "mild",
    "saltLevel": "balanced",
    "tags": [
      "酸爽",
      "清淡",
      "tom秘制酱料锦上添花"
    ],
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7_2tP9eqMl9V_MzGJRjQOt5wZfiAl57gMDQ&s"
  },
  {
    "id": "airfryer-veggies",
    "categoryId": "airfryer",
    "name": "空气炸锅狼牙土豆条",
    "description": "粗粮饱腹，孜然超香",
    "price": 1,
    "heat": "🌶",
    "calories": 290,
    "protein": 8,
    "spiceLevel": "spicy",
    "saltLevel": "bold",
    "tags": [
      "下饭",
      "快手"
    ],
    "image": "https://i.ytimg.com/vi/65OxMLUIEVk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAydd3LyVmsKSCNoN3PLWHBgDQTaw"
  },
  {
    "id": "fit-bowl",
    "categoryId": "fit",
    "name": "高蛋白彩虹碗",
    "description": "鸡胸、彩椒和番薯",
    "price": 1,
    "heat": "不辣",
    "calories": 420,
    "protein": 45,
    "spiceLevel": "none",
    "saltLevel": "light",
    "tags": [
      "健身友好"
    ],
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=60",
    "hero": true
  },
  {
    "id": "Instantnoodle",
    "categoryId": "fastfood",
    "name": "辣牛肉🇰🇷泡面",
    "description": "有氧之后的紧急补充",
    "price": 1,
    "heat": "🌶",
    "calories": 430,
    "protein": 8,
    "spiceLevel": "spicy",
    "saltLevel": "bold",
    "tags": [
      "下饭",
      "快手"
    ],
    "image": "https://img06.weeecdn.com/product/image/659/709/49E858D9E253CF6E.png"
  },
  {
    "id": "Instantnoodlesf",
    "categoryId": "fastfood",
    "name": "海鲜乌冬面",
    "description": "夜宵首选",
    "price": 1,
    "heat": "🌶",
    "calories": 450,
    "protein": 8,
    "spiceLevel": "spicy",
    "saltLevel": "bold",
    "tags": [
      "下饭",
      "快手"
    ],
    "image": "https://img08.weeecdn.net/item/image/384/690/70DFA8E0E6511B17.png!c750x0_q80_t1.auto"
  },
  {
    "id": "fit-soup",
    "categoryId": "cantonese",
    "name": "番茄牛腩--遇见宝",
    "description": "慢炖 2 小时，暖胃又有饱腹感",
    "price": 1,
    "heat": "少辣",
    "calories": 380,
    "protein": 35,
    "spiceLevel": "mild",
    "saltLevel": "balanced",
    "tags": [
      "下饭",
      "健身友好"
    ],
    "image": "https://i.ytimg.com/vi/Vl0bVTl0o-4/maxresdefault.jpg"
  },
  {
    "id": "zero-coke",
    "categoryId": "drinks",
    "name": "无糖可乐",
    "description": "coke after sex",
    "price": 1,
    "heat": "不辣",
    "calories": 0,
    "protein": 0,
    "spiceLevel": "none",
    "saltLevel": "light",
    "tags": [
      "无糖",
      "冰镇"
    ],
    "image": "https://springhillrecovery.com/wp-content/uploads/Cocaine-Tray.jpg.webp"
  },
  {
    "id": "sprite-zero",
    "categoryId": "drinks",
    "name": "无糖雪碧+tea",
    "description": "怎么都买不到很气",
    "price": 1,
    "heat": "不辣",
    "calories": 0,
    "protein": 0,
    "spiceLevel": "none",
    "saltLevel": "light",
    "tags": [
      "无糖",
      "今日推荐"
    ],
    "image": "https://www.foodandwine.com/thmb/RGYnY3xBvfWvmEKM8r7xHM-l--M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Sprite-Tea-FT-BLOG0525-d97b78a344ea4e30bb812117d85ecec8.jpg"
  },
  {
    "id": "Heytea",
    "categoryId": "drinks",
    "name": "喜茶",
    "description": "免费，但是需要陪老公出门",
    "price": 1,
    "heat": "不辣",
    "calories": 120,
    "protein": 7,
    "spiceLevel": "none",
    "saltLevel": "light",
    "tags": [
      "低糖",
      "蛋白质"
    ],
    "image": "https://substackcdn.com/image/fetch/$s_!s9Xg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F80ac26da-f4f6-4f7a-af33-8994b0e4bb83_512x320.jpeg"
  },
  {
    "id": "Chagee",
    "categoryId": "drinks",
    "name": "霸王茶姬",
    "description": "秋天的第一杯～",
    "price": 1,
    "heat": "不辣",
    "calories": 0,
    "protein": 0,
    "spiceLevel": "none",
    "saltLevel": "light",
    "tags": [
      "多巴胺",
      "茶香四溢"
    ],
    "image": "https://gw.alicdn.com/imgextra/i1/1921451619/O1CN01h6WLSg1NpY8vaq24M_!!1921451619.jpg_Q75.jpg_.webp"
  },
  {
    "id": "dish-1763528781376-1376",
    "categoryId": "cantonese",
    "name": "可乐鸡翅",
    "description": "零糖鸡翅，ada最爱",
    "price": 1,
    "heat": "不辣",
    "calories": 380,
    "protein": 30,
    "tags": [
      "健康，美味"
    ],
    "image": "https://imgs.699pic.com/images/500/945/803.jpg!seo.v1",
    "hero": true,
    "spiceLevel": "none",
    "saltLevel": "balanced"
  },
  {
    "id": "dish-1763551363898-3898",
    "categoryId": "sichuan",
    "name": "火锅",
    "description": "在寒冷的冬天用热热的火锅温暖你～",
    "price": 1,
    "heat": "微辣",
    "calories": "n",
    "protein": "n",
    "tags": [
      "暖胃"
    ],
    "image": "https://imgs.699pic.com/images/507/180/335.jpg!seo.v1",
    "hero": false,
    "spiceLevel": "mild",
    "saltLevel": "balanced"
  }
]
