import useSWR from "swr";
import axios from "axios";
import { paginate } from "../utils";
import Count from "./Reusable-components/count";
import React, { useEffect, useState } from "react";
import FootItems from "./Reusable-components/foodItem";
import Pagination from "./Reusable-components/Pagination";
import { Form, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Card, Col, FormControl, ListGroup } from "react-bootstrap";
import { Container, Jumbotron, Button, Row } from "react-bootstrap";
import { end_points } from "../utils/BACKEND_URL";

function FoodContent({ searchField }) {
  const [pageSize] = useState(4);
  const [options, setOptions] = useState([]);
  const [distance, setDistance] = useState(0);
  const [itemSelect, setItemSelect] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchItemField, setSearchItemsField] = useState("");

  async function fetcher(url) {
    return await axios.get(url);
  }
  const { getallItems, getAllOptions } = end_points;
  const { data } = useSWR(getallItems, fetcher);

  /* const getAllData = async () => {
    try {
      const respond = await axios.get(getallItems);
      setAllData(respond.data.foodData);
    } catch (error) {
      console.log(error.message);
    } */

  const getOptions = async () => {
    try {
      const respond = await axios.get(getAllOptions);
      setOptions(respond.data.Options);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOptions();
    // getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return <p>Loading</p>;
  }

  const foodData = data.data.foodData;
  
  const filterItems = foodData.filter((el) => {
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
    { id: 5, label: "children's" },
  ];
  return (
    <div>
      <Container className="mt-4">
        <Jumbotron style={{ background: "grey", border: "none" }}>
          <Row>
            <Col lg={4} sm={4}>
              <Card
                className="ml-3 mr-3"
                style={{ background: "none", border: "none" }}
              >
                <Card.Body>
                  <Count item={filterItems} label="result" />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8} sm={10}>
              <Card
                className="ml-3 mr-3"
                style={{ background: "none", border: "none" }}
              >
                <Card.Body>
                  {mealClass.map((item) => {
                    return (
                      <Button
                        key={item.id}
                        onClick={() => {
                          onItemSelect(item.label);
                        }}
                        style={
                          item.label === selectedMeal
                            ? {
                                color: "#ffffff",
                                cursor: "pointer",
                                backgroundColor: "#808080",
                                margin: "0.5rem",
                                width: "17%",
                              }
                            : {
                                color: "#000000",
                                cursor: "pointer",
                                backgroundColor: "#ffffff",
                                margin: "0.5rem",
                                width: "17%",
                              }
                        }
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/*           <br />
           */}{" "}
          <Row>
            <Col lg={4} sm={4}>
              <Card
                className="ml-3 mr-3"
                style={{
                  backgroundColor: "black",
                  borderRadius: "26px",
                }}
              >
                <Card.Body>
                  <Card.Title className="text-secondary">Price</Card.Title>{" "}
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
                  <Card.Title className="text-secondary mt-3">
                    Foot Choices
                  </Card.Title>
                  <>
                    <Form.Group
                      as={Row}
                      className="mt-4"
                      style={{ color: "#fff" }}
                    >
                      <Col>
                        {options.foodChoices &&
                          options.foodChoices?.map((i) => {
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
                    <Form.Group
                      as={Col}
                      controlId="formGridCity"
                      className="mt-2"
                    >
                      <Form.Label style={{ color: "gray" }}>
                        <Card.Title className="text-secondary mt-3">
                          Alergic?
                        </Card.Title>
                      </Form.Label>
                      <FormControl
                        value={searchItemField || ""}
                        placeholder="type anything"
                        onChange={(e) => setSearchItemsField(e.target.value)}
                      />
                    </Form.Group>
                  </>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8} sm={10}>
              <Card
                className="ml-3 mr-3"
                style={{ background: "none", border: "none" }}
              >
                <Card.Body>
                  <FootItems data={paginatedItem} />
                  {/*  <Card.Text>
                    <Button className="">load more</Button>
                  </Card.Text> */}
                  {/* <Pagination
                    pageSize={pageSize}
                    onNextPage={onNextPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onPreviousPage={onPreviousPage}
                    itemsCount={filterItems?.length}
                  /> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default FoodContent;

/*
  <Jumbotron>
            <Container className="m-4 pt-5">
              <>
                <Container>
                  <Row>
                    <Col sm={12} md={10} lg={3}>
                    <Count item={filterItems} label="result" />
                    </Col>
                    <Col sm={12} md={10} lg={9}>
                      <ListGroup horizontal>
                        {mealClass.map((item) => {
                          return (
                            <Button
                              key={item.id}
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
                <Container >
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
                          <Card.Title className="text-secondary">
                            Price
                          </Card.Title>
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
                          <Card.Title className="text-secondary mt-3">
                            Foot Choices
                          </Card.Title>
                          <>
                            <Form.Group
                              as={Row}
                              className="mt-4"
                              style={{ color: "#fff" }}
                            >
                              <Col >
                                {options.foodChoices &&
                                  options.foodChoices?.map((i) => {
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
                                <Card.Title className="text-secondary mt-3">
                                  Alergic?
                                </Card.Title>
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
                      <Container>
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

*/

/*  const getFoodData = () => {
    setAllData(FoodData);
  }; */

/*  useEffect(() => {

    getFoodData();
  }, []); */

/*
import React, { useEffect, useState } from "react";
import { Options } from "../utils/Options";
import { paginate } from "../utils/paginate";
import { FoodData } from "../utils/foodData";
import Count from "./Reusable-components/count";
import { Button, Card, Col, FormControl } from "react-bootstrap";
import FootItems from "./Reusable-components/foodItem";
import { Container, Jumbotron, Row } from "react-bootstrap";
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

  const filterItems = allData.filter((m) => {
    if (
      searchField &&
      !m.item.toLowerCase().includes(searchField.toLowerCase())
    ) {
      return false;
    }
    if (
      itemSelect.length > 0 &&
      !itemSelect.some((catagory) => m.foodChoices.includes(catagory))
    ) {
      return false;
    }
    if (
      searchItemField &&
      m.ingredient.toLowerCase().includes(searchItemField.toLowerCase())
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

  console.log("select", select);
  return (
    <>
      <div className="m-2">
        <Container
          style={{
            backgroundColor: "#fff",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100vh",
          }}
        >
          <Jumbotron>
            <Container className="m-4 pt-5">
              <>
                <Row>
                  <Col sm={12} md={6} lg={3} my={1}>
                    <Count item={filterItems} label="result" />
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      size="m"
                      style={
                        {
                           width: "100px"
                        }
                      }
                    >
                      full-meal
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                        size="m"
                      style={{  width: "115px", textAlign: "center" }}
                    >
                      course-meal
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      size="m"
                      style={
                        {
                          width: "100px"
                        }
                      }
                    >
                      apetizer
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      size="m"
                      style={
                        {
                          width: "100px"
                        }
                      }
                    >
                      drinks
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      size="m"
                      style={
                        {
                          width: "100px"
                        }
                      }
                    >
                      children's
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <>
                    <Col sm={12} md={10} lg={3}>
                      <Card
                        style={{
                          height: "50rem",
                          backgroundColor: "black",
                          borderRadius: "26px",
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
                              <Col sm={10}>
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
                  </>
                  <Col sm={12} md={10} lg={9}>

                    <FootItems data={paginatedItem} />
                    <Container className="justify-content-center mt-2">
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
              </>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    </>
  );
}

export default FoodContent;


*/
