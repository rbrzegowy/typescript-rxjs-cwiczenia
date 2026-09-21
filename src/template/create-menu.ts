import { $ } from '../helpers/dom'

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
          <a href="custom-operators.html">Własne operatory</a>
        </card>
        <card>
          <a href="operators2.html">Łączenie strumieni</a>
        </card>
        <card>
          <a href="operators3.html">Strumienie w strumieniach</a>
        </card>
        <card>
          <a href="shop.html">Sklepik</a>
        </card>`
}
