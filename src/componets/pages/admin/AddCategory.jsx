import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { addCategory } from "../../../services/product.services";

const AddCategory = () => {
  const [category, setCategory] = useState({
    title: "",
    description: "",
    coverImage: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (event, property) => {
    setCategory((oldCategoryObj) => {
      return {
        ...oldCategoryObj,
        [property]: event.target.value,
      };
    });
  };

  const clearData = () => {
    setCategory(() => {
      return {
        title: "",
        description: "",
        coverImage: "",
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (category.title === undefined || category.title.trim() === "") {
      toast.error("title is empty!!");
      return;
    }

    if (
      category.description === undefined ||
      category.description.trim() === ""
    ) {
      toast.error("description is empty!!");
      return;
    }

    if (
      category.coverImage === undefined ||
      category.coverImage.trim() === ""
    ) {
      toast.error("Category Cover Image Url empty!!");
      return;
    }

    // call server
    setIsLoading(() => true);
    addCategory(addCategory)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.dir(error);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  };

  return (
    <>
      <Container fluid>
        <Card className="shadow border-0">
          <Card.Body>
            <h5>Add Category</h5>

            <Form onSubmit={handleSubmit}>
              {/* title */}
              <FormGroup className="mt-3">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  onChange={(event) => handleFieldChange(event, "title")}
                  value={category.title}
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  row={6}
                  as={"textarea"}
                  placeholder={"Enter here"}
                  onChange={(event) => handleFieldChange(event, "description")}
                  value={category.description}
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <Form.Label>Category Cover Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  onChange={(event) => handleFieldChange(event, "coverImage")}
                  value={category.coverImage}
                />
              </FormGroup>

              <Container className="text-center mt-2">
                <Button
                  variant="success"
                  size="lg"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="lg" />

                      <span>Wait...</span>
                    </>
                  ) : (
                    <span>Add Category</span>
                  )}
                </Button>
                <Button
                  variant="danger"
                  className="ms-2"
                  size="lg"
                  onClick={clearData}
                >
                  Clear
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddCategory;
