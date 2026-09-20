import { Subject, interval, map, timer, of, from, fromEvent, count, scan } from "rxjs"
import { pictures } from "./pictures"
import { $ } from "./helpers/dom"

const timer$ = new Subject<number>()

interval(86400).pipe(map(() => 'x')).subscribe(console.log)
timer(0, 1_000).pipe(map(() => 'x')).subscribe(console.log)

// Zamień strumień z kwotami w PLN na kwoty w EUR(map) - kurs euro: const eurRate = 4.4
// map
const pln$ = of(100, 200, 300, 400, 500)
const eurRate = 4.4

// Wybierz ze strumienia pictures wszystkie zdjęcia których szerokość jest większa od 3000px
// filter
const picture$ = from(pictures)

// Zwróć autora zdjęcia o id = 699
// find, map

// Stwórz sekundnik(powinien emitować cokolwiek przez10 sekund)
// interval, map

// Stwórz strumień emitujący koordynaty myszy na stronie (przy kliknięciu)
// fromEvent, wykorzystaj właściwość ev.clientX
const mouseClick$ = null

// Licznik kliknięć: emituj kolejną liczbę po kliknięciu w przycisk na document.
// fromEvent, scan
const mouseClickCounter$ = null

// Stwórz strumień emitujący co 1s koordynaty myszy na stronie(nie obsługujemy przypadku gdy użytkownik przestał ruszać kursorem myszy)
// fromEvent, sampleTime, throttleTime
const mouseMove$ = null

// SearchBox Zapisz się na zdarzenie input pola tekstowego (roboczo - jest to wyszukiwarka). 
// Emituj wpisane wartości gdy użytkownik przerwał wpisywanie na min. 300ms i wartość nie jest pusta.
// fromEvent, filter, debounceTime
const searchBoxValue$ = fromEvent($('#searchBox')!, 'input')

// Zsumuj wszystkie wartości ze strumienia EUR
// scan, reduce