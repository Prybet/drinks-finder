import axios from "axios";
import { useEffect } from "react";
import { useState, createContext } from "react";

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {

    const [result, setResult] = useState({
        meta: {},
        drinks: []
    });
    const [modal, setModal] = useState(false);
    const [drinkId, setDrinkId] = useState(null);
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(false)

    const getDrinks = async (key, value) => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/${key === "s" ? "search" : "filter"}.php?${key}=${value}`
            const { data } = await axios(url);
            setResult({
                meta: {
                    total: data?.drinks?.length || 0,
                    search: key === "s" ? `Name ${value}` : `Category ${value}`
                },
                drinks: data.drinks || []
            })
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
                result,
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