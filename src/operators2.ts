import { delay, from, fromEvent, interval, map, Observable, of, Subject, timer } from "rxjs"
import { User } from "./models/user.model"
import { Order } from "./models/order.model"
import { pictures } from "./pictures"

function getUser(): Observable<User> {
  return of({ name: 'John', orderId: 1 }).pipe(delay(1_000))
}
function getOrder(id: number): Observable<Order> {
  return of({ id, products: ['Apple', 'Banana'] }).pipe(delay(2_000))
}

