import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, FormControl } from "react-bootstrap";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Container, Jumbotron, Button, Row } from "react-bootstrap";

import { mealClass } from "../data";
import { end_points, styles, colors } from "../config";
import { Count, Loader, MobileLayout } from "../Components";

import ModalConfirm from "../Components/modal";
import burgImage from "../assets/images/v290_52.png";

function FoodContent({ searchField }) {
  const breakPoint = 556;
  const { bright } = colors;
  const { getallItems, getAllOptions } = end_points;

  const [item, setItem] = useState({});
  const [options, setOptions] = useState([]);
  const [distance, setDistance] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const [myStyle, setMyStyle] = useState(false);
  const [textModal, setTextModal] = useState("");
  const [itemSelect, setItemSelect] = useState([]);
  const [modalBack, setModalBack] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  const [visibleModal, setVisibleModal] = useState(false);
  const [searchItemField, setSearchItemsField] = useState("");
  const [numberOfitemsShown, setNumberofItemsShown] = useState(4);

  const clickClose = () => {
    setTextModal("");
    setModalBack(false);
    setVisibleModal(false);
  };

  const onItemClick = (i) => {
    setItem(i);
    setVisibleModal(true);
  };

  const getOptions = async () => {
    try {
      const respond = await axios.get(getAllOptions);
      setOptions(respond.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAllItems = async () => {
    try {
      let arr = [];
      const respond = await axios.get(getallItems);
      for (let i = 0; i < respond.data.length; i++) {
        for (let j = 0; j < respond.data[i].menus.length; j++) {
          arr.push(respond.data[i].menus[j]);
        }
      }
      setAllItems(arr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOptions();
    getAllItems();
    window.addEventListener("resize", () => setSize(window.innerWidth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!isChecked]);

  const filterItems = allItems.filter((el) => {
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
    if (!isChecked && !el.length > 0 && !el) {
      return false;
    }
    return true;
  });

  const onNextPage = () => {
    setNumberofItemsShown(numberOfitemsShown + 2);
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

  const onMouseEnter = () => {
    setMyStyle(true);
  };

  const onMouseLeave = () => {
    setMyStyle(false);
  };

  const { desktopContainerCardStyle, desktopCardStyle, desktopCardTitleStyle } =
    styles;
  const { desktopRowContainerStyle, desktopCardImgOverlayStyle } = styles;
  const { desktopFadeStyleOff, fullWidthHeightStyle, desktopDivStyle } = styles;
  const { desktopButtonStyle, desktopRowDivStyle, desktopColDivStyle } = styles;
  const { desktopCardImgStyle, desktopContainerDivStyle, desktopFadeStyleOn } =
    styles;

  const fadeStyle = !myStyle ? desktopFadeStyleOff : desktopFadeStyleOn;

  return (
    <>
      {filterItems && filterItems.length > 0 ? (
        <>
          {" "}
          {size >= breakPoint ? (
            <div className="footContent m-5">
              <Container style={fullWidthHeightStyle}>
                <Jumbotron>
                  <Row>
                    <Col lg={3} md={6} sm={12}>
                      <Container className="" style={desktopDivStyle}>
                        <Card
                          className="ml-3 mr-3"
                          style={desktopContainerCardStyle}
                        >
                          <Card.Body>
                            <Count item={filterItems} label="result" />
                          </Card.Body>
                        </Card>
                      </Container>
                    </Col>
                    <Col lg={9} md={6} sm={6} className="mt-3">
                      <Container className="MealList m-0 mt-5">
                        {mealClass.map((item) => {
                          return (
                            <Button
                              variant="outline-secondary"
                              style={desktopButtonStyle}
                              className="m-2"
                              key={item.id}
                            >
                              {item.label}
                            </Button>
                          );
                        })}
                      </Container>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={3} md={5} sm={12}>
                      <Container>
                        <Card className="ml-3 mr-2" style={desktopRowDivStyle}>
                          <Card.Body>
                            <Card.Title className="text-secondary sidebarTitles">
                              Price
                            </Card.Title>
                            <Form.Group controlId="formBasicRange">
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip
                                    className="sidebarItems"
                                    style={{ color: "light" }}
                                  >
                                    {distance}
                                    {"   "}€
                                  </Tooltip>
                                }
                              >
                                <Form.Control
                                  type="range"
                                  placement="top"
                                  className="mt-3"
                                  defaultValue="{distance}"
                                  style={{ width: "12rem" }}
                                  onChange={(e) => setDistance(e.target.value)}
                                />
                              </OverlayTrigger>
                            </Form.Group>
                            <Card.Title className="text-secondary mt-3 sidebarTitles">
                              Sort
                            </Card.Title>
                            <>
                              <Form.Group
                                as={Row}
                                className="mt-4"
                                style={{ color: bright }}
                              >
                                <Col>
                                  <div
                                    className="sidebarItems"
                                    style={desktopColDivStyle}
                                  >
                                    <Form.Check
                                      className=""
                                      type="checkbox"
                                      isChecked={!isChecked}
                                      style={{ color: "gray" }}
                                    />
                                    <span>All items</span>
                                  </div>
                                  <div
                                    className="sidebarItems"
                                    style={desktopColDivStyle}
                                  >
                                    <Form.Check
                                      className=""
                                      type="checkbox"
                                      style={{ color: "gray" }}
                                    />
                                    <span>Best rated</span>
                                  </div>
                                  <div
                                    className="sidebarItems"
                                    style={desktopColDivStyle}
                                  >
                                    <Form.Check
                                      className=""
                                      type="checkbox"
                                      style={{ color: "gray" }}
                                      onClick={() => {
                                        setIsChecked(!isChecked);
                                      }}
                                    />
                                    <span>New items</span>
                                  </div>
                                </Col>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                className="mt-2"
                                controlId="formGridCity"
                              ></Form.Group>
                            </>
                            <Card.Title className="text-secondary mt-3 sidebarTitles">
                              Foot Choices
                            </Card.Title>
                            <>
                              <Form.Group
                                as={Row}
                                className="mt-4"
                                style={{ color: bright }}
                              >
                                <Col>
                                  {options &&
                                    options?.map((i) => {
                                      return (
                                        <div
                                          key={i.id}
                                          className="sidebarItems"
                                          style={desktopColDivStyle}
                                        >
                                          <Form.Check
                                            className=""
                                            type="checkbox"
                                            name={i.label}
                                            id={`default-${i.label}`}
                                            style={{ color: "gray" }}
                                            onChange={handleCheckCatagories}
                                          />
                                          <span>{i.label}</span>
                                        </div>
                                      );
                                    })}
                                </Col>
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                className="mt-2"
                                controlId="formGridCity"
                              >
                                <Form.Label style={{ color: "gray" }}>
                                  <Card.Title className="text-secondary mt-3 sidebarItems">
                                    Alergic?
                                  </Card.Title>
                                </Form.Label>
                                <FormControl
                                  className="sidebarTitles"
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
                      </Container>
                    </Col>

                    <Col lg={9} md={7} sm={12}>
                      <Container className="" style={desktopRowContainerStyle}>
                        {filterItems
                          .slice(0, numberOfitemsShown)
                          .map((i, index) => {
                            const { image, item, price, ingredient } = i;
                            return (
                              <Card
                                key={index}
                                className="ml-3 mr-2"
                                style={desktopCardStyle}
                                onClick={() => onItemClick(i)}
                              >
                                <Card.Body>
                                  <Card.ImgOverlay>
                                    <div style={desktopCardImgOverlayStyle}>
                                      <Card.Title>
                                        <span
                                          className="m-4 mb-0 mt-0 listFoodItem_1"
                                          style={desktopCardTitleStyle}
                                        >
                                          {item?.length <= 20
                                            ? item
                                            : `${item.substring(0, 20)}...`}
                                        </span>
                                      </Card.Title>
                                      <Card.Text>
                                        <h5
                                          className="m-4 mt-1 listFoodItem_2"
                                          style={{ lineHeight: "10px" }}
                                        >
                                          {ingredient}
                                        </h5>
                                        <h5
                                          className="m-4"
                                          style={{ lineHeight: "10px" }}
                                        >
                                          {price} € (INC. Vat)
                                        </h5>
                                      </Card.Text>
                                    </div>
                                  </Card.ImgOverlay>
                                  {image ? (
                                    <Card.Img
                                      src={image}
                                      variant="top"
                                      style={desktopCardImgStyle}
                                    />
                                  ) : (
                                    <Card.Img
                                      variant="top"
                                      src={burgImage}
                                      style={desktopCardImgStyle}
                                    />
                                  )}
                                </Card.Body>
                              </Card>
                            );
                          })}

                        <Container style={{ paddingRight: "10rem" }}>
                          <div style={desktopContainerDivStyle}>
                            <Button
                              onMouseOver={onMouseEnter}
                              onMouseOut={onMouseLeave}
                              onClick={onNextPage}
                              style={fadeStyle}
                            >
                              show more
                            </Button>
                          </div>
                        </Container>
                      </Container>
                    </Col>
                  </Row>
                </Jumbotron>
                <ModalConfirm
                  data={item}
                  itemList={allItems}
                  textModal={textModal}
                  modalBack={modalBack}
                  clickClose={clickClose}
                  visibleModal={visibleModal}
                />
              </Container>
            </div>
          ) : (
            <MobileLayout />
          )}{" "}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default FoodContent;
