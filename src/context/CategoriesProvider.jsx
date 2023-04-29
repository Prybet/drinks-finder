import axios from "axios";
import { useEffect, useState, createContext } from "react";

const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
            const { data } = await axios(url);
            setCategories(data.drinks)
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        getCategories();
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                categories
            }}
        >
            {children}
        </CategoriesContext.Provider>
    )
}

export { CategoriesProvider }

export default CategoriesContext;