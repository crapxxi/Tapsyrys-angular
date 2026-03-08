import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpComponent {
  searchQuery = '';
  faqOpen: Record<number, boolean> = {};

  toggleFaq(i: number): void {
    this.faqOpen[i] = !this.faqOpen[i];
  }
  topicClick(url: string) {
    if(url === "1") this.toggleFaq(0);
    else if(url === "2") this.toggleFaq(1);
    else if(url === "3") this.toggleFaq(2);
    else window.location.href = url;
  }

  topics = [
    { icon: '💳', title: 'Заказы и Оплата', url: '1' },
    { icon: '🚚', title: 'Доставка и Отслеживание', url: '2' },
    { icon: '🔄', title: 'Возврат и Обмен', url: '3' },
    { icon: '🖥️', title: 'Работа с сайтом', url: 'https://youtube.com' },
    { icon: '🤝', title: 'Для поставщиков', url: 'https://tapsyrys.com' },
  ];

  faqs = [
    { q: 'Как заказать и оплатить товары?', a: 'Выберите товары, добавьте в корзину и оформите заказ. Оплата доступна по счёту или картой.' },
    { q: 'Как работает доставка?', a: 'Доставка осуществляется по графику поставщика. Трек-номер придёт на email после отправки.' },
    { q: 'Как сделать возврат товара?', a: 'Напишите в поддержку или поставщику в течение 14 дней с момента получения.' },
    { q: 'Есть ли сайт для поставщиков?', a: 'Да, поставщики могут зарегистрироваться и управлять каталогом и заказами отдельно.' },
  ];
}
