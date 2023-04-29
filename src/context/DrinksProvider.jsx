import axios from "axios";
import { useEffect } from "react";
import { useState, createContext } from "react";

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {

    const [drinks, setDrinks] = useState([]);
    const [modal, setModal] = useState(false);
    const [drinkId, setDrinkId] = useState(null);
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(false)

    const getDrinks = async search => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?s=${search.name}&c=${search.category}`
            const { data } = await axios(url);
            setDrinks(data.drinks)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setLoading(true);
        const getRecipe = async () => {
            if (!drinkId) return;
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
                const { data } = await axios(url);
                setRecipe(data?.drinks[0]);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        getRecipe();
    }, [drinkId])


    const handleModalClick = () => {
        setModal(!modal);
    }

    const handleDrinkIdClick = id => {
        setDrinkId(id);
    }

    return (
        <DrinksContext.Provider
            value={{
                drinks,
                getDrinks,
                modal,
                handleModalClick,
                handleDrinkIdClick,
                recipe,
                loading
            }}
        >
            {children}
        </DrinksContext.Provider>
    )
}

export { DrinksProvider }

export default DrinksContext;