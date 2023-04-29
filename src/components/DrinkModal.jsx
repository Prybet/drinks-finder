import { Image, Modal } from "react-bootstrap";
import useDrinks from "../hooks/useDrinks";

const DrinkModal = () => {

    const { modal, handleModalClick, recipe, loading } = useDrinks();

    const showIngredients = () => {
        let ingredients = [];
        for (let i = 0; i < 16; i++) {
            if (recipe[`strIngredient${i}`]) {
                ingredients.push(
                    <li key={`strIngredient${i}`}>{recipe[`strIngredient${i}`]} - {recipe[`strMeasure${i}`]}</li>
                );
            }
        }

        return ingredients;
    }

    return (
        !loading && (
            <Modal show={modal} onHide={handleModalClick}>
                <Image
                    src={recipe.strDrinkThumb}
                    alt={`Image Recipe ${recipe.strDrink}`}
                />
                <Modal.Header>
                    <Modal.Title>
                        {recipe.strDrink}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-3">
                        <h2>Instructions</h2>
                        {recipe.strInstructionsES ? recipe.strInstructionsES : recipe.strInstructions}
                        <h3>Ingredients and Amount</h3>
                        {showIngredients()}
                    </div>
                </Modal.Body>
            </Modal>
        )
    )
}

export default DrinkModal;