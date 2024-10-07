// Zadeklaruj strumień:

import { BehaviorSubject, from, generate, Observable, of, ReplaySubject, Subject } from "rxjs"
import { pictures } from "./pictures"

// który wyemituje wartości 1…10 
const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const oneToTen$ = of(1, 2, 3, 4, 5) // from(oneToTen)

// który emituje typ number[].Jeśli przed subskrypcją nie było emisji, powinien zwrócić pustą tablicę. 
const numbers$ = new BehaviorSubject<number[]>([])

// który wyemituje typ string.Subskrybenci dostają tylko wartości emitowane po zapisie.
const string$ = new Subject<string>()

// który emituje typ number.Przy subskrypcji powinien zwrócić trzy ostatnie wyemitowane wartości(jeśli emisja już nastąpiła)
const number$ = new ReplaySubject<string>(3)

// który wyemituje wszystkie obiekty z tablicy pictures(import z pliku pictures.ts)
const pictures$ = from(pictures) // of(...pictures)

// który wyemituje 10 liczb losowych
const random$ = new Observable(sub => {
  for (let i = 0; i < 10; i++) {
    sub.next(Math.random())
  }
  sub.complete()
})
//
const random2$ = generate(1, x => x < 10, x => x + 1, () => Math.random())
random2$.subscribe(console.log)

//BONUS liczby emitowane co 500ms
const randomEvery500ms$ = new Observable(sub => {
  let counter = 1
  let handle = setInterval(() => {
    sub.next(Math.random())
    counter++
    if (counter === 10) {
      clearInterval(handle)
      sub.complete()
    }
  }, 500)
})