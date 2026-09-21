import { map, pipe, scan, tap } from 'rxjs'
import { $ } from './dom.ts'

type WriteToHtmlConfig = {
  add?: InsertPosition
  customValueFn?: (d: any) => void
}
export const writeToHtml = <T>(selector: string, config?: WriteToHtmlConfig) => {
  const element = $(selector) as HTMLElement
  return tap<T>(value => {
    if (!element) {
      return
    }
    const valueToWrite = String(config?.customValueFn?.(value) || value)
    if (config?.add) {
      element.insertAdjacentHTML(config.add, valueToWrite)
    } else {
      element.innerHTML = valueToWrite
    }
  })
}
export const sumWithLabel = (label: string) =>
  pipe(
    scan((acc: number, val: number) => (acc += val)),
    map(v => label + '-' + v),
  )

export const counter = scan(i => i++, 1)
