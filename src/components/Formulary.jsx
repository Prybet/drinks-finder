import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import useCategories from "../hooks/useCategories";
import useDrinks from "../hooks/useDrinks";

const Formulary = () => {

  const [searchName, setSearchName] = useState("");

  const [searchCategory, setSearchCategory] = useState("");

  const [alert, setAlert] = useState('');

  const { categories } = useCategories();
  const { getDrinks } = useDrinks();
  const handleNameSubmit = e => {
    e.preventDefault();
    if (searchName === "") {
      setAlert("Field name can't be empty!!");
      return;
    }
    setAlert('');
    getDrinks("s", searchName);
  }
  const handleCategorySubmit = e => {
    e.preventDefault();
    if (searchCategory === "") {
      setAlert("Select a Category First!!");
      return;
    }
    setAlert('');
    getDrinks("c", searchCategory);
  }

  return (
    <>
      <Form
        onSubmit={handleNameSubmit}
      >
        {alert && <Alert variant="danger" className="text-center">{alert}</Alert>}
        <Row className="align-items-end">
          <Col md={9}>
            <Form.Group>
              <Form.Label
                htmlFor="name"
              > Drink Name </Form.Label>
              <Form.Control
                id="name"
                type="text"
                name="name"
                placeholder="Tequila, Vodka, etc"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Button
              variant="danger"
              className="text-uppercase w-100"
              type="submit"
            >
              Search by Name
            </Button>
          </Col>
        </Row>
      </Form>
      <Form
        onSubmit={handleCategorySubmit}
      >
        <Row className="align-items-end">
          <Col md={9}>
            <Form.Group >
              <Form.Label
                htmlFor="category"
              > Drink Category </Form.Label>
              <Form.Select
                id="category"
                name="category"
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
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
          <Col md={3}>
            <Button
              variant="danger"
              className="text-uppercase w-100"
              type="submit"
            >
              Search by Category
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default Formulary;