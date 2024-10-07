import { Subscription } from "rxjs"

export const unsubscribeAll = (genericSub: Subscription) => {
  window.addEventListener('beforeunload', () => {
    genericSub.unsubscribe()
  })
}