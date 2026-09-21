import { from, of, range, Subject, takeWhile } from 'rxjs'
// 1. Napisz operator filtrujący null i undefined z wartości w strumieniu
// Test:
// from([0,'',null,1,'a',{},undefined,[]]).pipe(filterNullUndefined()).subscribe()

// 2. Napisz operator htmlOutput który wyświetli w html-u wartość ze strumienia.
// Test:
// of('hello world').pipe(htmlOutput('#container')).subscribe()

// 3. Napisz operator tapIf wykonujący efekt uboczny tylko dla wartości spełniających podany warunek.
// Test:
// of(5, 15, 20, 3).pipe(tapIf(v => v > 10, v => console.log('Większe niż 10:', v))).subscribe()

// 4. Napisz operator debug debugujący wartości, błędy i zakończenie strumienia. W parametrze przyjmuje etykietę do późniejszego logu
// Efekt działania w konsoli:
// [numbers] next: 1
// [numbers] completed
// [numbers] error: err
// Test:
// const subject = new Subject()
// subject.pipe(debug('numbers')).subscribe()
// subject.next(1)
// subject.next(2)
// // subject.error('błąd dla testu operatora debug')
// subject.complete()

// 5. Napisz operator bufferUntil buforujący wartości i emitujący bufor, gdy wartość spełni podany warunek.
// Jeśli źródło robi complete - zrób complete, wcześniej wyemituj bufor (nawet niepełny)
// Test:
// range(1, 20).pipe(
//  takeWhile(v => v < 18),
//  bufferUntil(v => v % 3 === 0),
//  tap(v => console.log('[buffer] val: ', v)),
// ).subscribe()
