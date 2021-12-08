import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Col, Container, Jumbotron, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import burgImage from "../../Images/v290_52.png";
import { end_points } from "../../utils";

export default function MobileLayout({ searchField, searchItemField }) {
  const history = useHistory();
  const { getallItems } = end_points;
  const [allItems, setAllItems] = useState([]);
  //const [forceUpdate, setForceUpdate] = useState()
  const [isChecked] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [numberOfitemsShown, setNumberofItemsShown] = useState(3);
  const [myStyle, setMyStyle] = useState(false);

  const getAllItems = async () => {
    try {
      let arr = [];
      const respond = await axios.get(getallItems);
      for (let i = 0; i < respond.data.length; i++) {
        for (let j = 0; j < respond.data[i].menus.length; j++) {
          arr.push(respond.data[i].menus[j]);
        }
      }
      // console.log('arr', arr)
      setAllItems(arr);
      /*  const respond = await axios.get(getallItems)
      if (isChecked) {
        setAllItems(respond.data.slice(-3))
      } else if (!isChecked) {
        setAllItems(respond.data)
        setForceUpdate(!forceUpdate)
      } else {
        setAllItems(respond.data)
      } */
    } catch (error) {
      console.error(error);
    }
  };

  console.error(selectedMeal);

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

  const onItemSelect = (ml) => {
    setSelectedMeal(ml);
  };

  /*   const handleCheckCatagories = (e) => {
    if (e.target.checked) {
      setItemSelect(itemSelect.concat(e.target.name))
    } else {
      setItemSelect(itemSelect.filter((catagory) => e.target.name !== catagory))
    }
  } */

  const mealClass = [
    { id: 1, label: "Alkuoalat" },
    { id: 2, label: "Pääruoat" },
    { id: 3, label: "Jälkiruoka" },
    { id: 4, label: "Juoma" },
    { id: 5, label: "Lahjat" },
  ];

  const fadeStyle = !myStyle
    ? {
        width: "12rem",
        height: "3rem",
        backgroundColor: "#949494",
        border: "none",
        fontSize: "1.3rem",
        outline: "none",
      }
    : {
        width: "12rem",
        height: "3rem",
        backgroundColor: "#BAB6B6",
        border: "none",
        fontSize: "1.3rem",
        outline: "none",
      };
  return (
    <div className="footContent m-4">
      <Container style={{ height: "100%", width: "100%" }}>
        <Jumbotron>
          <Row>
            <Col lg={12} md={12} sm={12} className="mt-3">
              <Container className="MealList m-0 mt-1">
                {mealClass.map((item) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="outline-secondary"
                        className="m-2"
                        key={item.id}
                        onClick={() => {
                          onItemSelect(item.label);
                        }}
                        style={{
                          width: "12.5rem",
                          margin: "3rem",
                          flexShrink: "2",
                        }}
                      >
                        {item.label}
                      </Button>
                    </div>
                  );
                })}
              </Container>
            </Col>
          </Row>

          <Row>
            <Col lg={9} md={7} sm={12}>
              <Container
                className=""
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  margin: "0rem",
                }}
              >
                {filterItems.slice(0, numberOfitemsShown).map((i, index) => {
                  const { id, /*  image, */ item, price, ingredient } = i;
                  return (
                    <Card
                      key={index}
                      className="ml-3 mr-2"
                      style={{
                        width: "24rem",
                        border: "none",
                      }}
                    >
                      <Card.Body>
                        <Card.ImgOverlay>
                          <div
                            style={{
                              height: "7rem",
                              marginLeft: "0.05rem",
                              /*                               width: '22rem',
                               */ color: "#fff",
                              opacity: "0.8",
                              marginTop: "8rem",
                              borderBottomLeftRadius: "15px",
                              borderBottomRightRadius: "15px",
                              backgroundColor: "black",
                              position: "relative",
                              zIndex: "2",
                            }}
                          >
                            <Card.Title>
                              <span
                                className="m-4 mb-0 mt-0 listFoodItem_1"
                                style={{
                                  textTransform: "uppercase",
                                  lineHeight: "2rem",
                                }}
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
                          variant="top"
                          src={burgImage}
                          style={{
                            cursor: "pointer",
                            objectFit: "cover",
                            margin: ".05rem",
                            height: "15rem",
                            borderRadius: "12px",
                            zIndex: "1",
                            position: "relative",
                          }}
                          onClick={() => history.push(`/item/${id}`)}
                        />
                        {/*   {image ? (
<Card.Img
 variant="top"
 src={burgImage}
 style={{
   cursor: "pointer",
   borderRadius: "18px",
   height: "20rem",
   width: "26rem",
   objectFit: "cover",
 }}
 onClick={() => history.push(`/item/${id}`)}
/>
) : (
<Card.Img
 variant="top"
 src={burgImage}
 style={{
   cursor: "pointer",
   borderRadius: "18px",
   height: "20rem",
   width: "23rem",
   margin: "0.6rem",

   objectFit: "cover",
 }}
 onClick={() => history.push(`/item/${id}`)}
/>
)} */}
                      </Card.Body>
                    </Card>
                  );
                })}
                <Container>
                  {" "}
                  <div
                    style={{
                      paddingRight: "1rem",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onMouseOver={onMouseEnter}
                      onMouseOut={onMouseLeave}
                      style={fadeStyle}
                      onClick={onNextPage}
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
    </div>
  );
}
