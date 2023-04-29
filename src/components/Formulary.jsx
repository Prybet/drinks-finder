import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import useCategories from "../hooks/useCategories";
import useDrinks from "../hooks/useDrinks";

const Formulary = () => {

    const [search, setSearch] = useState({
        name: '',
        category: ''
    });

    const [alert, setAlert] = useState('');

    const { categories } = useCategories();
    const { getDrinks } = useDrinks();
    const handleSubmit = e => {
        e.preventDefault();
        if (Object.values(search).includes('')) {
            setAlert("All fields are required");
            return;
        }
        setAlert('');
        getDrinks(search);
    }

    return (
        <Form
            onSubmit={handleSubmit}
        >
            {alert && <Alert variant="danger" className="text-center">{alert}</Alert>}
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label
                            htmlFor="name"
                        > Drink Name </Form.Label>
                        <Form.Control
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Tequila, Vodka, etc"
                            value={search.name}
                            onChange={e => setSearch({
                                ...search,
                                [e.target.name]: [e.target.value]
                            })}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label
                            htmlFor="category"
                        > Drink Category </Form.Label>
                        <Form.Select
                            id="category"
                            name="category"
                            value={search.category}
                            onChange={e => setSearch({
                                ...search,
                                [e.target.name]: [e.target.value]
                            })}
                        >
                            <option value="">-- Choose Drink --</option>
                            {categories.map(category => (
                                <option
                                    key={category.strCategory}
                                    value={category.strCategory}
                                >
                                    {category.strCategory}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-end">
                <Col md={3}>
                    <Button
                        variant="danger"
                        className="text-uppercase w-100"
                        type="submit"
                    >
                        Search Drinks
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Formulary;