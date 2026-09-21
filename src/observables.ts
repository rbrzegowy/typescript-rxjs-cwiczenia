import { BehaviorSubject, from, generate, Observable, of, ReplaySubject, Subject } from "rxjs"
import { pictures } from "./pictures"

// Zadeklaruj strumień:

// który emituje typ number[]. Jeśli przed subskrypcją nie było emisji, powinien zwrócić pustą tablicę. 
const numbers$ = null

// który wyemituje typ string. Subskrybenci dostają tylko wartości emitowane po zapisie.
const string$ = null

// który emituje typ number. Przy subskrypcji powinien zwrócić trzy ostatnie wyemitowane wartości (jeśli emisja już nastąpiła)
const number$ = null

// który wyemituje po zapisie wszystkie obiekty z tablicy pictures po kolei (import z pliku pictures.ts)
const pictures$ = null

// który po zapisie wyemituje 10 liczb losowych