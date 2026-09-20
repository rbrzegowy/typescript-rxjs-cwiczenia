import { combineLatest, combineLatestWith, concatMap, defer, delay, distinctUntilChanged, first, from, fromEvent, interval, map, merge, Observable, of, scan, share, shareReplay, startWith, Subject, switchMap, take, tap, timer } from "rxjs"
import { User } from "./models/user.model"
import { Order } from "./models/order.model"
import { pictures } from "./pictures"
import { $ } from "./helpers/dom"
import { writeToHtml } from "./helpers/pipes"

// 1. Uploads
// Tworzymy wiele procesów upload - wiele api chce być informowanych o zmianach
// ZmieNapisz pipeline który zrobi log z urla i odebranych danych.
// Do mockowania uploadu użyj funkcji uploadIt
// Sprawdź czy rozwiązanie obsługuje również asynchroniczne dodawanie uploads (setTimeout - na etapie pisania kodu nie wiemy gdzie i kiedy nastąpi kolejny upload)
function uploadIt(url: string, data: {}) {
  return of(Math.random() > 0.5 ? `OK  ${JSON.stringify(data)}` : `Bad request ${JSON.stringify(data)}`).pipe(
    delay(Math.random() * 2_000)
  )
}

const endpoints = [
  {url: 'end1', data: 'val for end1'},
  {url: 'end2', data: 'val for end2'},
  {url: 'end3', data: 'val for end3'},
  {url: 'end4', data: 'val for end4'},
  {url: 'end5', data: 'val for end5'}
]

setTimeout(() => {
  endpoints.push({ url: 'async end6', data: 'val for end6' })
}, 2_000)

// 2. Zdjęcia
// Wyświetl wpisy pogrupowane wg autora (użyj groupBy) w formacie: autor/nazwa pliku
// BONUS:
// Wyświetl wpisy wg schematu:
//  Autor 1
//    nazwa pliku 1
//    nazwa pliku 2
//  Autor 2
//    nazwa pliku 1
//    nazwa pliku 2
// tip: groupBy zwraca obiekt GroupedObservable - strumień który ma dodatkowo właściwość .key (u nas - autor:))

const pictures$ = from(pictures)

// 3. Autosave
// Zamockuj autozapis. W trakcie zapisu pokaż komunikat "Zapisywanie", 
// następnie przez 2s "Zapisano", następnie datę/czas ostatniego zapisu.
// UWAGA: dopuszczamy równoległe zapisy!