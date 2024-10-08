import { writeToHtml } from './helpers/pipes'
// AUTOSAVE
// 2. Zamockuj autozapis.W trakcie zapisu pokaż komunikat "Zapisywanie", 
// następnie przez 2s "Zapisano", następnie datę/czas ostatniego zapisu.
// UWAGA: dopuszczamy równoległe zapisy!

import { fromEvent, debounceTime, map, filter, distinctUntilChanged, scan, timer, Subject, pipe, tap, mergeMap, delay, Subscription, switchMap, of, concat, defer, merge, switchAll, Observable, share, shareReplay } from "rxjs"
import { $ } from "./helpers/dom"
import { unsubscribeAll } from './helpers/unsubscribe-all'


type SearchData = { history: string[], current: string }
const genericSub = new Subscription()

const searchInput$ = getSearchInput()
const onlyLastValue$ = searchInput$.pipe(map(data => data.current))
let searchSaveStatus$ = autosaveWithFlatObservables(onlyLastValue$)
// let searchSaveStatus$ = autosaveWithHigherOrderObservables(onlyLastValue$)
const statusSub = searchSaveStatus$.pipe(writeToHtml('#autosave-status')).subscribe()
genericSub.add(statusSub)


// gdybym potrzebował historii niezależnie od emisji ostatniej wartości
const onlyHistory$ = searchInput$.pipe(map(data => data.history))

const formattedHistory$ = onlyHistory$.pipe(map(data => data.join(', ')))
const historySub = formattedHistory$.pipe(writeToHtml('#autosave-history')).subscribe()
genericSub.add(historySub)


unsubscribeAll(genericSub)


function autosaveWithFlatObservables(searchData$: Observable<string>) {
  // const history = []

  // AUTOSAVE
  // observable zapisu - mock np. fetch, axios, httpClient etc
  const saveProcess$ = timer(2000).pipe(
    map(() => '[200] ok - server response'),
    // catchError(() => {})
  )

  // aktualny status procesu zapisu
  const status$ = new Subject<string>()

  let savesCounter = 0
  const saveProcess = pipe(
    tap(() => status$.next('Trwa zapisywanie')),
    tap(() => savesCounter++),
    // tap(() => console.log('savesCounter', savesCounter)),
    mergeMap(value => saveProcess$),
    tap(() => savesCounter--),
    // tap(() => console.log('savesCounter', savesCounter)),
  )
  const showSavedMessage = pipe(
    filter(() => savesCounter === 0),
    tap(() => status$.next('Zapisano')),
    delay(2000),
  )
  const showSavedDateMessage = pipe(
    filter(() => savesCounter === 0),
    tap(() => {
      const date = new Date().toLocaleString()
      status$.next(date)
    })
  )
  const autosave$ = searchData$.pipe(
    saveProcess,
    showSavedMessage,
    showSavedDateMessage
  )
  const autosaveSub = autosave$.subscribe()
  // bez custom pipe
  // const autosave$ = searchData$.pipe(
  //   tap(() => status$.next('Trwa zapisywanie')),
  //   tap(() => savesCounter++),
  //   tap(() => savesCounter--),
  //   filter(() => savesCounter === 0),
  //   tap(() => status$.next('Zapisano')),
  //   switchMap(() => timer(2000)),
  //   filter(() => savesCounter === 0),
  //   tap(() => {
  //     const date = new Date().toLocaleString()
  //     status$.next(date)
  //   }),
  //   mergeMap(() => saveProcess$),
  // )
  const sub2 = autosave$.subscribe()
  genericSub.add(sub2)

  genericSub.add(autosaveSub)

  // wypychamy sam Observable na zewnątrz
  return status$.asObservable()
}


// SPOSÓB 2
//na podstawie przykładu z learnrxjs.io

function autosaveWithHigherOrderObservables(inputToSave$: Observable<string>) {
  // licznik uruchomionych zapisów
  let savesInProgress = 0
  // observable zapisu - mock np. fetch, axios, httpClient etc
  const saveChanges = (value: string) => {
    return of(value).pipe(delay(1500))
  }

  // observable zapamiętujący że zaczął się zapis
  // uwaga na typ! savesInProgress$: Observable<Observable<string>>
  const savesInProgress$ = inputToSave$.pipe(
    map(() => of('Zapisuję')),
    tap(() => savesInProgress++)
  )

  // główny observable procesu zapisu, typ j/w
  const savesCompleted$ = inputToSave$.pipe(
    mergeMap(saveChanges),
    tap(() => savesInProgress--),
    // czy user wyzwolił w międzyczasie kolejny save?
    filter(() => savesInProgress === 0),
    map(() =>
      concat(
        // pokaż komunikat zapisu
        of('Zapisane!'),
        // poczekaj 2s
        of('').pipe(delay(2000), tap(() => console.log(new Date().toLocaleString()))),
        // zmień komunikat na datę ostatniego zapisu
        // of(`Last updated: ${new Date().toLocaleString()}`)
        defer(() => of(`Last updated: ${new Date().toLocaleString()}`))
      )
    )
  )

  const saveStatus$ = merge(savesInProgress$, savesCompleted$)
    .pipe(
      switchAll()
    )
  return saveStatus$
}
function getSearchInput() {
  const searchData$ = fromEvent($('#search-box')!, 'input')
    .pipe(
      debounceTime(300),
      map(ev => (ev.target as HTMLInputElement).value),
      filter(val => val !== ''),
      distinctUntilChanged(),
      // historia trzymana w osobnym pojemniku
      // tap(searchString => history.push(searchString)),
      scan((acc: SearchData, val: string) => ({
        history: [...acc.history, val],
        current: val
      }), { history: [], current: '' }),
    )
  return searchData$

}