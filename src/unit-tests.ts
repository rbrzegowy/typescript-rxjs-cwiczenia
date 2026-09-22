import {
  Observable,
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  defer,
  delay,
  distinctUntilChanged,
  filter,
  from,
  map,
  merge,
  of,
  scan,
  switchMap,
  take,
  throwError,
  timer,
} from 'rxjs';

// Przygotuj unit testy w pliku unit-tests.spec.ts dla poniższych funkcji

// 1. Strumień synchroniczny: mapowanie i filtrowanie wartości.
export function createEvenNumbers$(values: number[]): Observable<number> {
  return from(values).pipe(
    filter((value) => value % 2 === 0),
    map((value) => value * 2),
  );
}

// 2. Strumień asynchroniczny: opóźnij każdą wartość o podany czas.
export function createDelayedValues$<T>(
  values: T[],
  delayMs: number,
): Observable<T> {
  return from(values).pipe(delay(delayMs));
}

// 3. Timer: odliczaj od 1 do wskazanej liczby, emitując co określony czas.
export function createCountdown$(
  seconds: number,
  intervalMs = 1_000,
): Observable<number> {
  return timer(0, intervalMs).pipe(
    map((index) => seconds - index),
    take(seconds + 1),
  );
}

// 4. Agregacja: emituj sumę po każdej kolejnej wartości.
export function createRunningTotal$(values: number[]): Observable<number> {
  return from(values).pipe(scan((total, value) => total + value, 0));
}

// 5. Debounce: emituj wyszukiwanie dopiero po przerwie w pisaniu.
export function createSearchStream$(
  queries$: Observable<string>,
  debounceMs = 300,
): Observable<string> {
  return queries$.pipe(
    map((query) => query.trim()),
    filter((query) => query.length > 0),
    debounceTime(debounceMs),
    distinctUntilChanged(),
  );
}

// 6. Łączenie równoległe: każda wartość jest opatrzona nazwą źródła.
export function createMergedEvents$<T>(
  first$: Observable<T>,
  second$: Observable<T>,
): Observable<{ source: 'first' | 'second'; value: T }> {
  return merge(
    first$.pipe(map((value) => ({ source: 'first' as const, value }))),
    second$.pipe(map((value) => ({ source: 'second' as const, value }))),
  );
}

// 7. combineLatest: emituj aktualny stan formularza po zmianie dowolnego pola.
export function createFormState$<T, U>(
  name$: Observable<T>,
  age$: Observable<U>,
): Observable<{ name: T; age: U }> {
  return combineLatest({ name: name$, age: age$ });
}

// 8. concatMap: realizuj zadania sekwencyjnie, zachowując ich kolejność.
export function createSequentialTasks$<T, R>(
  tasks$: Observable<T>,
  runTask: (task: T) => Observable<R>,
): Observable<R> {
  return tasks$.pipe(concatMap((task) => runTask(task)));
}

// 9. switchMap: anuluj poprzednie wyszukiwanie, gdy pojawi się nowe zapytanie.
export function createLatestRequest$<T, R>(
  requests$: Observable<T>,
  request: (value: T) => Observable<R>,
): Observable<R> {
  return requests$.pipe(switchMap((value) => request(value)));
}

// 10. defer i catchError: błąd jest tworzony dopiero przy subskrypcji,
// a strumień zwraca wartość zastępczą zamiast kończyć się błędem.
export function createSafeRequest$<T>(
  request: () => T,
  fallback: T,
): Observable<T> {
  return defer(() => {
    try {
      return of(request());
    } catch (error) {
      return throwError(() => error);
    }
  }).pipe(catchError(() => of(fallback)));
}
