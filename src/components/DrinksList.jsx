import { Row } from "react-bootstrap";
import useDrinks from "../hooks/useDrinks";
import Drink from "./Drink";

const DrinksList = () => {

    const { result } = useDrinks();
    const { meta, drinks } = {} = result;
    return (
        <Row className="mt-5 text-center">
            {meta.search && <h2 className="pb-4">{meta.total || 0} Drinks found, searched by {meta.search || ""}</h2>}
            {drinks.map(drink =>
                <Drink key={drink.idDrink} drink={drink} />
            )}
        </Row>
    )
}

export default DrinksList;