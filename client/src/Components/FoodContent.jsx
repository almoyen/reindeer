import useSWR from "swr";
import axios from "axios";
//import { paginate } from "../utils";
import Count from "./Reusable-components/count";
import React, { useEffect, useState } from "react";
import FootItems from "./Reusable-components/foodItem";
//import Pagination from "./Reusable-components/Pagination";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Card, Col, FormControl } from "react-bootstrap";
import { Container, Jumbotron, Button, Row } from "react-bootstrap";
import { end_points } from "../utils/BACKEND_URL";
import { EmojiHeartEyesFill } from "react-bootstrap-icons";
//import SwitchButton from "./Reusable-components/SwitchButton";
import { useHistory } from "react-router";

function FoodContent({ searchField }) {
  //const [pageSize] = useState(4);
  const [options, setOptions] = useState([]);
  const [distance, setDistance] = useState(0);
  const [itemSelect, setItemSelect] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchItemField, setSearchItemsField] = useState("");
  const [numberOfitemsShown, setNumberofItemsShown] = useState(4);
  const [itemShowmore, setItemShowMore] = useState([]);
  const history = useHistory();

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

  /*   const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
*/
  const onNextPage = () => {
    setNumberofItemsShown(numberOfitemsShown + 2);
  };

  const onItemSelect = (ml) => {
    setSelectedMeal(ml);
    /* setCurrentPage(1); */
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

  //const paginatedItem = paginate(filterItems, currentPage, itemSize);

  const mealClass = [
    { id: 1, label: "full meal" },
    { id: 2, label: "course meal" },
    { id: 3, label: "apetizer" },
    { id: 4, label: "drink" },
    { id: 5, label: "children's" },
  ];

  const sortItem = [
    {
      id: 1,
      label: "all Items",
    },
    {
      id: 2,
      label: "best Rates",
    },
    {
      id: 3,
      label: "new Items",
    },
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
                  <Card.Title className="text-secondary mt-3">Sort</Card.Title>
                  <>
                    <Form.Group
                      as={Row}
                      className="mt-4"
                      style={{ color: "#fff" }}
                    >
                      <Col>
                        {sortItem &&
                          sortItem?.map((i) => {
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
                    ></Form.Group>
                  </>
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
              <Container
                style={{
                  background: "none",
                  border: "none",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {filterItems.slice(0, numberOfitemsShown).map((i, index) => {
                  const { id, image, item, price, ingredient } = i;
                  return (
                    <Card
                      className="ml-0 mr-0"
                      style={{
                        background: "none",
                        width: "19rem",
                        border: "none",
                      }}
                    >
                      <Card.Body>
                        <>
                          {image === "" ? (
                            <EmojiHeartEyesFill
                              style={{
                                color: "#000",
                                cursor: "pointer",
                              }}
                              width={100}
                              height="17rem"
                              onClick={() => history.push(`/item/${id}`)}
                            />
                          ) : (
                            <Card.Img
                              variant="top"
                              src={image}
                              style={{
                                cursor: "pointer",
                                borderRadius: "26px",
                                height: "19.5rem",
                                objectFit: "cover",
                              }}
                              onClick={() => history.push(`/item/${id}`)}
                            ></Card.Img>
                          )}
                          <Card.ImgOverlay
                            style={{ color: "#fff", width: "100%" }}
                          >
                            <div
                              className=""
                              style={{
                                width: "",
                                marginTop: "10rem",
                                position: "relative",
                                backgroundColor: "black",
                              }}
                            >
                              <Card.Title>
                                {" "}
                                <h4>{item}</h4>
                              </Card.Title>
                              <Card.Text>
                                <h5>{ingredient}</h5>
                                <h5>{price} € (INC. Vat)</h5>
                              </Card.Text>
                            </div>
                          </Card.ImgOverlay>
                        </>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Container>
              <Container
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    height: "4rem",
                    width: "9rem",
                  }}
                  onClick={onNextPage}
                >
                  show more
                </Button>
              </Container>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default FoodContent;

/*   {itemsToShow.length ? itemsToShow : "loading...."} */

/*   <FootItems data={filterItems} numberofItemsShown={4} /> */
