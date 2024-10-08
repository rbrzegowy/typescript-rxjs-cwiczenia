import { $ } from "../helpers/dom"

export const createMenu = () => {
  const nav = $('nav')!
  nav.innerHTML = `
        <card>
          <a href="observables.html">Strumienie bazowe</a>
        </card>
        <card>
          <a href="operators1.html">Podstawowe operatory</a>
        </card>
        <card>
          <a href="operators2.html">Łączenie strumieni</a>
        </card>
        <card>
          <a href="higher-order-operators.html">Strumienie w strumieniach</a>
        </card>
        <card>
          <a href="shop.html">Sklepik</a>
        </card>`
}