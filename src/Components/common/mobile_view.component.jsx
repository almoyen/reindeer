import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Jumbotron, Row } from "react-bootstrap";

import ModalConfirm from "../modal";
import { mealClass } from "../../data";
import { end_points, styles } from "../../config";

export default function MobileLayout({ searchField, searchItemField }) {
  const { getallItems } = end_points;
  const { mobileRowContainerStyle, mobileCardTitleStyle } = styles;
  const { mobileCardStyle, mobileCardImgStyle, showMoreButtonStyle } = styles;
  const { mobileButtonStyle, fullWidthHeightStyle, mobileFadeStyleOn } = styles;
  const { mobileCardImgOverlayStyle, mobileFadeStyleOff, mobileDivStyle } =
    styles;

  const [isChecked] = useState(false);
  const [item, setItem] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [myStyle, setMyStyle] = useState(false);
  const [textModal, setTextModal] = useState("");
  const [modalBack, setModalBack] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [numberOfitemsShown, setNumberofItemsShown] = useState(3);

  const clickClose = () => {
    setTextModal("");
    setModalBack(false);
    setVisibleModal(false);
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
    getAllItems();
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
  const onMouseEnter = () => {
    setMyStyle(true);
  };

  const onMouseLeave = () => {
    setMyStyle(false);
  };

  const onNextPage = () => {
    setNumberofItemsShown(numberOfitemsShown + 2);
  };

  const fadeStyle = !myStyle ? mobileFadeStyleOff : mobileFadeStyleOn;

  const onItemClick = (i) => {
    setItem(i);
    setVisibleModal(true);
  };

  return (
    <div className="footContent m-4">
      <Container style={fullWidthHeightStyle}>
        <Jumbotron>
          <Row>
            <Col lg={12} md={12} sm={12} className="mt-3">
              <Container className="MealList m-0 mt-1">
                {mealClass.map(({ id, label }) => {
                  return (
                    <div style={mobileDivStyle}>
                      <Button
                        key={id}
                        className="m-2"
                        style={mobileButtonStyle}
                        variant="outline-secondary"
                      >
                        {label}
                      </Button>
                    </div>
                  );
                })}
              </Container>
            </Col>
          </Row>
          <Row>
            <Col lg={9} md={7} sm={12}>
              <Container className="" style={mobileRowContainerStyle}>
                {filterItems.slice(0, numberOfitemsShown).map((i, index) => {
                  const { item, price, ingredient, image } = i;
                  return (
                    <Card
                      key={index}
                      className="ml-3 mr-2"
                      style={mobileCardStyle}
                      onClick={() => onItemClick(i)}
                    >
                      <Card.Body>
                        <Card.ImgOverlay>
                          <div style={mobileCardImgOverlayStyle}>
                            <Card.Title>
                              <span
                                className="m-4 mb-0 mt-0 listFoodItem_1"
                                style={mobileCardTitleStyle}
                              >
                                {item}
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
                        <Card.Img
                          src={image}
                          variant="top"
                          alt="food item"
                          style={mobileCardImgStyle}
                        />
                      </Card.Body>
                    </Card>
                  );
                })}
                <Container>
                  {" "}
                  <div style={showMoreButtonStyle}>
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
      </Container>
      <ModalConfirm
        data={item}
        itemList={allItems}
        textModal={textModal}
        modalBack={modalBack}
        clickClose={clickClose}
        visibleModal={visibleModal}
      />
    </div>
  );
}
