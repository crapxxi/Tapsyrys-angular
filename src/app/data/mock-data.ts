import { Category, Product, Supplier, Order } from '../models';

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Молочные продукты', icon: 'img/catalog/milkIcon.png' },
  { id: '2', name: 'Бакалея', icon: 'img/catalog/bakaleyaIcon.png'  },
  { id: '3', name: 'Напитки', icon: 'img/catalog/drinkIcon.png'  },
  { id: '4', name: 'Кондитерские изделия', icon: 'img/catalog/cakesIcon.png'  },
  { id: '5', name: 'Овощи и фрукты', icon: 'img/catalog/VeggieIcon.png'  },
  { id: '6', name: 'Мясо и птица', icon: 'img/catalog/meatIcon.png'  },
];

export const MOCK_SUPPLIER: Supplier = {
  id: '1',
  name: 'ТОО "Агро-Фуд"',
  rating: 4.8,
  description: 'Широкий ассортимент молочной продукции',
  logoUrl: 'img/catalog/complogo.png',
  phone: '+71233211223',
  email: 'agro-food@gmail.com',
  address: 'Абая 110А'
};

export const MOCK_SUPPLIERS: Supplier[] = [
  { ...MOCK_SUPPLIER },
  { id: '2', name: 'ИП "Свежесть"', rating: 4.5, description: 'Свежие овощи и фрукты', logoUrl: 'img/catalog/complogo.png', phone: '+73211233221', email: 'foodik@gmail.com', address: 'Розыбакиева 247А' },
  { id: '3', name: 'ТОО "МясоТорг"', rating: 4.9, description: 'Мясо и птица', logoUrl: 'img/catalog/complogo.png', phone: "+73211231223", email: 'meater@mail.ru', address: 'Рыскулова 45' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Молоко 3.2%', supplier: 'ТОО "Агро-Фуд"', price: 500, unit: 'шт', inStock: true, category: '1' },
  { id: '2', name: 'Молоко 2.8%', supplier: 'ТОО "Агро-Фуд"', price: 450, unit: 'шт', inStock: true, category: '1' },
  { id: '3', name: 'Молоко 3.4%', supplier: 'ТОО "Агро-Фуд"', price: 500, unit: 'шт', inStock: true, category: '1' },
  { id: '4', name: 'Молоко 3.8%', supplier: 'ТОО "Агро-Фуд"', price: 650, unit: 'шт', inStock: true, category: '1' },
  { id: '5', name: 'Яйца', supplier: 'ТОО "Агро-Фуд"', price: 50, unit: 'шт', inStock: true, category: '2' },
  { id: '6', name: 'Рыба', supplier: 'ТОО "Агро-Фуд"', price: 700, unit: 'шт', inStock: false, category: '6' },
  { id: '7', name: 'Курица', supplier: 'ТОО "Агро-Фуд"', price: 450, unit: 'шт', inStock: true, category: '6' },
  { id: '8', name: 'Мясо', supplier: 'ТОО "Агро-Фуд"', price: 500, unit: 'шт', inStock: true, category: '6' },
];

export const MOCK_ORDERS: Order[] = [
  { id: '12345', date: '25.01.2026', status: 'in_progress', amount: 150000, supplier: 'ТОО "Агро-Фуд"' },
  { id: '12344', date: '20.01.2026', status: 'delivered', amount: 85000, supplier: 'ТОО "Агро-Фуд"' },
  { id: '12343', date: '15.01.2026', status: 'cancelled', amount: 32000, supplier: 'ТОО "Агро-Фуд"' },
];
