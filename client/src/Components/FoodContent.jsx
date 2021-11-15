import useSWR from "swr";
import axios from "axios";
import { useHistory } from "react-router";
import Count from "./Reusable-components/count";
import { end_points } from "../utils/BACKEND_URL";
import React, { useEffect, useState } from "react";
//import FootItems from "./Reusable-components/foodItem";
import { Card, Col, FormControl } from "react-bootstrap";
import { EmojiHeartEyesFill } from "react-bootstrap-icons";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Container, Jumbotron, Button, Row } from "react-bootstrap";

function FoodContent({ searchField }) {
  const [options, setOptions] = useState([]);
  const [distance, setDistance] = useState(0);
  const [itemSelect, setItemSelect] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchItemField, setSearchItemsField] = useState("");
  const [numberOfitemsShown, setNumberofItemsShown] = useState(4);
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
        <Jumbotron
          style={{ background: "white", border: "none", opacity: "1" }}
        >
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
                      key={index}
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
                            style={{
                              color: "#fff",
                              width: "100%",
                              opacity: "0.8",
                            }}
                          >
                            <div
                              className=""
                              style={{
                                height: "7rem",
                                marginTop: "12.5rem",
                                borderRadius: "20px",
                                position: "relative",
                                backgroundColor: "black",
                              }}
                            >
                              <Card.Title style={{ margin: "12px" }}>
                                {" "}
                                <h4>{item}</h4>
                              </Card.Title>
                              <Card.Text style={{ margin: "12px" }}>
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
                <br />
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
