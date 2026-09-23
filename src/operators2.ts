import {
  combineLatest,
  combineLatestWith,
  concatMap,
  defer,
  delay,
  distinctUntilChanged,
  first,
  from,
  fromEvent,
  interval,
  map,
  merge,
  Observable,
  of,
  scan,
  share,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import { User } from './models/user.model';
import { Order } from './models/order.model';
import { pictures } from './pictures';
import { $ } from './helpers/dom';
import { writeToHtml } from './helpers/pipes';

// 1. Głosowanie.
// Są trzy osoby uprawnione do głosowania 'za'/'przeciw'.
// Piewsza oddaje głos po 2s, druga po 3s, trzeci po 1s.
// Wyniki głosowania zaprezentuj gdy wszystkie głosy zostaną oddane.
// BONUS: Zmodyfikuj kod by głosy były losowe (pamiętaj by nie duplikować kodu).
// BONUS2: Wypisz w konsoli/na  ekranie: Głosowanie rozpoczęte -> Głosowanie zakończone (przez 2s) -> Wyniki głosowania: ''

const vote1$ = timer(1_000).pipe(map(() => 'za'));
const vote2$ = of('za').pipe(delay(2_000));

const votes$ = of('Przygotowanie do głosowania...')
  .pipe(writeToHtml('#voting-state'))
  .subscribe();

// 2. Stwórz strumień emitujący koordynaty myszy, emisja co 1s - również gdy kursor nie zmienia położenia
// Zastanów się jak zrobić to ćwiczenie jeśli:
// a) emisja powinna się zacząć z pierwszym ruchem myszy
// b) emisja jest co 1s, niezależna od wcześniejszego ruchu myszy

// 3. Korzystając z getUsers() oraz getOrder(orderId: number) pokaż zamówienia użytkowników.
// Pokaż na stronie nazwę użytkownika oraz jego zamówienie.
const api = {
  users: [
    { name: 'Jaś', orderId: 3 },
    { name: 'Marysia', orderId: 1 },
    { name: 'Kasia', orderId: 2 },
  ],
  orders: [
    { id: 1, products: ['Jabłka', 'Banany'] },
    { id: 2, products: ['Pomarańcze', 'Cytryny'] },
    { id: 3, products: ['Gruszki', 'Melony'] },
  ],
};
function getUsers() {
  return from(api.users).pipe(delay(500));
}
function getOrder(id: number) {
  const order = api.orders.find((o) => o.id === id);
  return of(order).pipe(delay(2_000));
}
// zamówienia użytkowników:
const orders$ = of('brak')
  .pipe(
    writeToHtml('#orders', {
      customValueFn: (order) => JSON.stringify(order),
      add: 'beforeend',
    }),
  )
  .subscribe();

// 4. Kantor. Klienci proszą o wymianę pln na eur. Kwoty są w pln$.
// Zamień pln na kwoty w EUR wg aktualnego kursu (wartość z eurRate$).
// Wypisz wynik w formacie: 'PLN: 100 -> EUR: 23, RATE: 4.3'
const plns = [100, 200, 300, 400, 500];
const eurRates = [4.3, 4.4, 4.5, 4.4];
const pln$ = interval(1_200).pipe(
  take(plns.length),
  map((i) => plns[i]),
);
const eurRate$ = interval(1_400).pipe(
  take(eurRates.length),
  map((i) => eurRates[i]),
  share(),
);

// odpalamy rynek walut:
eurRate$.subscribe((eurRate) => console.log('Kurs EUR:', eurRate));

// przelicz PLN na EUR:
const eur$ = of('centuś zaprasza!');
eur$.pipe(writeToHtml('#transactions')).subscribe(console.log);

// 5. Media player
// Stwórz media player - trzy przyciski "toggle audio", "toggle video".
// W konsoli wypisz które media są aktualnie używane.
// Strumień powinien emitować 'wyłączony' | 'audio' | 'video' | 'audio-video' (domyślnie: 'wyłączony')
// BONUS: "toggle all" - wyłącz/włącz wszystko.
const btnAudio = $('#btn-audio')!;
const btnVideo = $('#btn-video')!;
const btnOnOff = $('#btn-player-on-off')!;

// zamień strumień na właściwy:
const media$ = of('wyłączony')
  .pipe(writeToHtml('#media-player-state'))
  .subscribe();
