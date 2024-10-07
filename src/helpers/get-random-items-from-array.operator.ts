import { map } from "rxjs"

export const getRandomItemsFromArray = <Item>(count: number) => map<Item[], Item[]>(arr => {
  if (count > arr.length) {
    count = arr.length
  }
  let selectedItems = new Set<Item>()
  while (selectedItems.size < count) {
    const index = Math.floor(Math.random() * arr.length)
    selectedItems.add(arr.at(index) as Item)
  }
  return [...selectedItems.values()]
})
