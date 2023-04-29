import { Container } from "react-bootstrap"
import DrinkModal from "./components/DrinkModal"
import DrinksList from "./components/DrinksLIst"
import Formulary from "./components/Formulary"
import { CategoriesProvider } from "./context/CategoriesProvider"
import { DrinksProvider } from "./context/DrinksProvider"

function App() {

  return (
    <CategoriesProvider>
      <DrinksProvider>
        <header className="py-5">
          <h1>Drinks Finder</h1>
        </header>

        <Container className="mt-5">
          <Formulary />
          <DrinksList />
          <DrinkModal />
        </Container>
      </DrinksProvider>
    </CategoriesProvider>
  )
}

export default App
