import React, { useEffect, useState } from "react";
import { Options } from "../utils/Options";
import { paginate } from "../utils/paginate";
import { FoodData } from "../utils/foodData";
import Count from "./Reusable-components/count";
import {
  /*  Button, */ Card,
  Col,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import FootItems from "./Reusable-components/foodItem";
import { Container, Jumbotron, Button, Row } from "react-bootstrap";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Pagination from "../Components/Reusable-components/Pagination";

function FoodContent({ searchField }) {
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [distance, setDistance] = useState(0);
  const [allData, setAllData] = useState([]);
  const [select, setSelect] = useState([]);
  const [itemSelect, setItemSelect] = useState([]);
  const [searchItemField, setSearchItemsField] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);

  const getOptions = () => {
    setSelect(Options);
  };

  const getFoodData = () => {
    setAllData(FoodData);
  };
  useEffect(() => {
    getOptions();
    getFoodData();
  }, []);

  const filterItems = allData.filter((el) => {
    if (
      searchField &&
      !el.item.toLowerCase().includes(searchField.toLowerCase())
    ) {
      return false;
    }
    if (
      itemSelect.length > 0 &&
      !itemSelect.some((catagory) => el.foodChoices.includes(catagory))
    ) {
      return false;
    }
    if (
      searchItemField &&
      el.ingredient.toLowerCase().includes(searchItemField.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const onItemSelect = (ml) => {
    setSelectedMeal(ml);
    setCurrentPage(1);
  };

  const handleCheckCatagories = (e) => {
    if (e.target.checked) {
      setItemSelect(itemSelect.concat(e.target.name));
    } else {
      setItemSelect(
        itemSelect.filter((catagory) => e.target.name !== catagory)
      );
    }
  };

  const paginatedItem = paginate(filterItems, currentPage, pageSize);

  const mealClass = [
    { id: 1, label: "full meal" },
    { id: 2, label: "course meal" },
    { id: 3, label: "apetizer" },
    { id: 4, label: "drink" },
    { id: 4, label: "children's" },
  ];

  console.log("select", select);
  return (
    <>
      <div className="m-2" style={{ height: "100vh", width: "100%" }}>
        <Container
          style={{
            backgroundColor: "#fff",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            // height: "100vh",
          }}
        >
          <Jumbotron>
            <Container className="m-4 pt-5">
              <>
                <Container>
                  <Row>
                    <Col sm={12} md={10} lg={3} /* my={1} */>
                      <Count item={filterItems} label="result" />
                    </Col>
                    <Col sm={12} md={10} lg={9}>
                      
                      <ListGroup horizontal>
                        {mealClass.map((item) => {
                          return (
                            
                            <Button
                              key={item.id}
                              /* variant="secondary" */
                              onClick={() => {
                                onItemSelect(item.label);
                              }}
                              style={
                                item.label === selectedMeal
                                  ? {
                                      color: "#ffffff",
                                      cursor: "pointer",
                                      backgroundColor: "#808080",
                                      margin: "1.1rem",
                                      width: "100%",
                                    }
                                  : {
                                      color: "#000000",
                                      cursor: "pointer",
                                      backgroundColor: "#ffffff",
                                      margin: "1.1rem",
                                      width: "100%",
                                    }
                              }
                              /*   style={{
                                margin: "0.9rem",
                                width: "100%",
                                backgroundColor: "none",
                              }} */
                            >
                              {" "}
                              {item.label}
                            </Button>
                          );
                        })}
                      </ListGroup>
                    </Col>
                  </Row>
                </Container>
                <Container /* style={{ width: "100%" }} */>
                  <Row>
                    <Col sm={12} md={10} lg={3}>
                      <Card
                        style={{
                          height: "50rem",
                          backgroundColor: "black",
                          borderRadius: "26px",
                          width: "100%",
                        }}
                      >
                        <Card.Body className="text-right m-3">
                          <>
                            <h5 className="m-1 mt-4" style={{ color: "gray" }}>
                              Price
                            </h5>
                            <Form.Group controlId="formBasicRange">
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip>
                                    {distance}
                                    {"   "}€
                                  </Tooltip>
                                }
                              >
                                <Form.Control
                                  style={{ width: "12rem" }}
                                  type="range"
                                  className="mt-3"
                                  placement="top"
                                  defaultValue="{distance}"
                                  onChange={(e) => setDistance(e.target.value)}
                                />
                              </OverlayTrigger>
                            </Form.Group>
                          </>
                          <h4 className="m-1 mt-5" style={{ color: "gray" }}>
                            Foot Choices
                          </h4>
                          <>
                            <Form.Group
                              as={Row}
                              className="mt-4"
                              style={{ color: "#fff" }}
                            >
                              <Col /*sm={10}*/>
                                {select.foodChoices &&
                                  select.foodChoices?.map((i) => {
                                    return (
                                      <div
                                        key={i.id}
                                        style={{
                                          display: "flex",
                                          overflow: "auto",
                                          alignItems: "center",
                                          flexDirection: "row",
                                          justifyContent: "flex-start",
                                        }}
                                      >
                                        <Form.Check
                                          className=""
                                          style={{ color: "gray" }}
                                          type="checkbox"
                                          name={i.label}
                                          id={`default-${i.label}`}
                                          onClick={handleCheckCatagories}
                                        />
                                        <span>{i.label}</span>
                                      </div>
                                    );
                                  })}
                              </Col>
                            </Form.Group>
                          </>
                          <>
                            <Form.Group
                              as={Col}
                              controlId="formGridCity"
                              className="mt-2"
                            >
                              <Form.Label style={{ color: "gray" }}>
                                <h4
                                  className="m-1 mt-5"
                                  style={{ color: "gray" }}
                                >
                                  {" "}
                                  Alergic?
                                </h4>
                              </Form.Label>
                              <FormControl
                                value={searchItemField || ""}
                                placeholder="type anything"
                                onChange={(e) =>
                                  setSearchItemsField(e.target.value)
                                }
                              />
                            </Form.Group>
                          </>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col sm={12} md={10} lg={9}>
                      <Container style={{}}>
                        <FootItems data={paginatedItem} />
                        <Pagination
                          pageSize={pageSize}
                          onNextPage={onNextPage}
                          currentPage={currentPage}
                          onPageChange={handlePageChange}
                          onPreviousPage={onPreviousPage}
                          itemsCount={filterItems?.length}
                        />
                      </Container>
                      
                    </Col>
                  </Row>
                </Container>
              </>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    </>
  );
}

export default FoodContent;

