import { Rating } from "./rating.model"

export type Product = {
  id: number,
  name: string,
  price: number,
  description: string,
  rating: Rating,
}