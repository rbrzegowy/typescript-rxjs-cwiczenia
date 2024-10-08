import { from, of } from "rxjs"
import { apiProducts } from "./data/api-products"
import { Product } from "./models/product.model"
import { $ } from "./helpers/dom"
import { writeToHtml } from "./helpers/pipes"


// Tworzymy mini sklepik internetowy

// 1. Zaimplementuj wyświetlanie produktów. 
// Pełną listę produktów znajdziesz w apiData$

// 2. Zaimplementuj funkcjonalność filtrowania
// Produkty powinny być filtrowane po 1s od zakończenia wpisywania szukanego ciągu znaków.
// Filtruj po polach nazwa i opis produktu

// 3. Zaimplementuj paginację (+-10, wyświetlanie numeru strony)

// 4. Zaimplementuj średnią ocen dostawy z przefiltrowanych produktów

// 5. Zaimplementuj "polecane" produkty.
// Polecane to cztery losowo wybrane produkty z pełnej listy produktów
// Losowanie odbywa się jednorazowo przy starcie strony
// BONUS: Losowanie odbywa się co 30 sekund

// 6. Do wyświetlanych produktów dodaj przycisk "dodaj do koszyka"
// Kliknięcie w przycisk dodaje produkty do koszyka

// 7. Zaimplementuj koszyk - wyświetlaj id-ki produktów
// BONUS: zaimplementuj możliwość dodania więcej niż jednej sztuki produkti.
// Wyświetlaj nazwy produktów i dodaną ilość
// BONUS2: zaimplementuj możliwość usunięcia produktu z koszyka



// źródło danych - nasze api
const apiData$ = of<Product[]>(apiProducts.products)


// elementy z html-a
const searchProductInput = $('#searchProduct')!
const paginatePrevBtn = $('#paginatePrev')!
const paginateNextBtn = $('#paginateNext')!
const addToCartBtn = $('#addToCart')!

const createProductCardHtml = (product: Product) =>
  `<div class="product">
    <h4>${product.name}</h4>
    <div class="description" > ${product.description}</div>
    <div class="price" > Cena: ${product.price} </div>
    <div class="rating" > Ocena: ${product.rating.product} /10</div >
    <div>
        <button class="add-to-cart" data-id = "${product.id}" >
          Dodaj do koszyka
        </button>
    </div>
  </div>`


// założenie: każda emisja to TABLICA produktów
const productList$ = of([])
  .pipe(
    writeToHtml('#product-list', {
      customValueFn: (products: Product[]) =>
        products.map(createProductCardHtml).join('')
    })
  )
productList$.subscribe()

