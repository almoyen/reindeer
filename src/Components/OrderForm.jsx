import axios from "axios";
import { FormControl, Image, InputGroup } from "react-bootstrap";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { end_points } from "../utils";
import { Loader } from ".";
import { ArrowLeftRight } from "react-bootstrap-icons";
import OrdPic from "../Images/background_picture.png";

function OrderForm({ searchField }) {
  const history = useHistory();
  const { getAllCities, getAllTrainModels, s } = end_points;
  const [whereCities, setWhereCities] = useState([]);
  const [trainModels, setTrainModels] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);

  const getCities = () => {
    axios
      .get(getAllCities)
      .then(async (response) => {
        const wc = [];
        for (let i = 0; i < response.data.length; i++) {
          let obj = {};
          obj.city = response.data[i].city;
          obj.country = response.data[i].country;
          obj.iso = response.data[i].iso;
          wc.push(obj);
        }
        const dc = [];
        for (let i = 0; i < response.data.length; i++) {
          let obj = {};
          obj.city = response.data[i].city;
          obj.country = response.data[i].country;
          obj.iso = response.data[i].iso;
          dc.push(obj);
        }
        setWhereCities(wc);
        setDestinationCities(dc.reverse());
      })
      .catch((e) => console.log(e.message));
  };

  const getTrainModels = async () => {
    try {
      const respond = await axios.get(getAllTrainModels);
      setTrainModels(respond.data);
      return respond;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCities();
    getTrainModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routeToNextPage = () => {
    history.push("/orders");
  };

  const switchToOther = () => {
    const dc = whereCities;
    const cd = destinationCities;
    setDestinationCities(dc);
    setWhereCities(cd);
    console.log("whereCities", whereCities);
    console.log("destinationCities", destinationCities);
  };

  return (
    <>
      {whereCities.length > 0 ? (
        <div>
          <div style={{ position: "relative", zIndex: "-1" }}>
            <Image
              src={OrdPic}
              style={{
                height: "60rem",
                objectFit: "cover",
                width: "100%",
                position: "relative",
                backgroundSize: "cover",
              }}
            />
          </div>

          <Container>
            <div
              style={{
                zIndex: "2",
                width: "100%",
                height: "10rem",
                marginTop: "-55.5rem",
              }}
            >
              <Badge className="m-2 mt-5 text-left">
                <p
                  className="title_1"
                  style={{
                    fontSize: "1.6rem",
                    marginLeft: "-2rem",
                    lineHeight: "1.8px",
                  }}
                >
                  check out our
                </p>
                <p
                  className="h3 title_2"
                  style={{
                    fontSize: "2.5rem",
                    marginLeft: "2rem",
                  }}
                >
                  Best Cousine
                </p>
              </Badge>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Container
                    style={{
                      margin: "auto",
                      width: "100%",
                      fontSize: "1.7rem",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#0000",
                    }}
                  >
                    <Card
                      style={{
                        width: "80rem",
                        backgroundColor: "#000009DF",
                        opacity: "0.88",
                        borderRadius: "15px",
                      }}
                    >
                      <Card.Body>
                        <Form>
                          <Row>
                            <Col xs="" lg={6} className="m-0">
                              <Form.Label
                                className="m-4 mb-1 mt-2 p-2 pt-3 tableoflist"
                                htmlFor="inlineFormInputGroup"
                                style={{ color: "#fff" }}
                              >
                                where
                              </Form.Label>
                              <InputGroup className="mb-2 m-3">
                                <FormControl
                                  required
                                  as="select"
                                  id="inlineFormInputGroup1"
                                  size="lg"
                                  type="text"
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                  }}
                                  style={{ background: "grey", color: "#fff" }}
                                >
                                  {searchField === ""
                                    ? whereCities.map((city, index) => {
                                        return (
                                          <option
                                            className="tableoflist"
                                            defaultValue={city.city}
                                            value={city.city}
                                            key={index}
                                          >
                                            {city.city}
                                          </option>
                                        );
                                      })
                                    : null}
                                </FormControl>
                                <InputGroup.Text
                                  style={{
                                    marginLeft: "1.5rem",
                                    width: "50px",
                                    height: "50px",
                                    backgroundColor: "#0000",
                                    opacity: "0.88",
                                    border: "none",
                                  }}
                                >
                                  <ArrowLeftRight
                                    style={{
                                      marginLeft: "0px",
                                      backgroundColor: "none",
                                      fontSize: "40px",
                                      cursor: "pointer",
                                      color: "#fff",
                                    }}
                                    onClick={switchToOther}
                                  />
                                </InputGroup.Text>{" "}
                              </InputGroup>
                            </Col>
                            <Col lg={6}>
                              <Form.Label
                                className="m-4 mb-1 mt-2 p-2 pt-3 tableoflist"
                                htmlFor="inlineFormInputGroup"
                                style={{ color: "#fff" }}
                              >
                                destination
                              </Form.Label>
                              <InputGroup className="mb-2 m-3">
                                <FormControl
                                  required
                                  as="select"
                                  id="inlineFormInputGroup2"
                                  size="lg"
                                  type="text"
                                  style={{
                                    marginRight: "4rem",
                                    width: "20px",
                                    color: "#fff",
                                    background: "grey",
                                  }}
                                  onChange={(e) => console.log(e.target.value)}
                                >
                                  {searchField === ""
                                    ? destinationCities.map((city, index) => {
                                        return (
                                          <option
                                            className="tableoflist"
                                            defaultValue={city.city}
                                            value={city.city}
                                            key={index}
                                          >
                                            {city.city}
                                          </option>
                                        );
                                      })
                                    : null}
                                </FormControl>
                              </InputGroup>
                            </Col>
                          </Row>
                          <Row className="">
                            <Col xs="" lg={6}>
                              <Form.Label
                                className="m-4 mb-1 mt-2 p-2 pt-3 tableoflist"
                                htmlFor="inlineFormInputGroup"
                                style={{ color: "#fff" }}
                              >
                                departure date & time
                              </Form.Label>
                              <InputGroup className="mb-2 m-3 tableoflist">
                                <FormControl
                                  className=""
                                  id="inlineFormInputGroup"
                                  size="lg"
                                  type="datetime-local"
                                  style={{ background: "grey", color: "#fff" }}
                                />
                                <InputGroup.Text
                                  className=""
                                  style={{
                                    marginLeft: "1.5rem",
                                    width: "50px",
                                    height: "50px",
                                    background: "none",
                                    border: "none",
                                  }}
                                ></InputGroup.Text>
                              </InputGroup>
                            </Col>
                            <Col xs="" lg={6}>
                              <Form.Label
                                className="m-4 mb-1 mt-2 p-2 pt-3 tableoflist"
                                htmlFor="inlineFormInputGroup"
                                style={{ color: "#fff" }}
                              >
                                train model
                              </Form.Label>
                              <InputGroup className="mb-2 m-3 pb-4">
                                <FormControl
                                  required
                                  as="select"
                                  id="inlineFormInputGroup"
                                  size="lg"
                                  style={{
                                    marginRight: "4rem",
                                    width: "20px",
                                    color: "#fff",
                                    background: "grey",
                                  }}
                                >
                                  {searchField === ""
                                    ? trainModels &&
                                      trainModels.map((trainModel, index) => {
                                        return (
                                          <option
                                            className="tableoflist"
                                            key={index}
                                          >
                                            {trainModel.trainType +
                                              trainModel.trainNumber}
                                          </option>
                                        );
                                      })
                                    : null}
                                </FormControl>
                              </InputGroup>
                            </Col>
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Container>
                </Col>
              </Row>
              <Row>
                <Col className="m-0 mb-2 text-center">
                  <Container
                    className=""
                    style={{ paddingRight: "4rem", paddingBottom: "15px" }}
                  >
                    <Button
                      style={{
                        width: "7rem",
                        height: "3rem",
                        backgroundColor: "grey",
                        border: "none",
                      }}
                      type="submit"
                      className="mt-3"
                      onClick={routeToNextPage}
                    >
                      Search
                    </Button>
                  </Container>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default OrderForm;

/* const filterCity = finlandCity.filter((allC) => {
    if (
      searchInput &&
      !allC.city.toLowerCase().includes(searchInput?.toLowerCase())
    ) {
      return false;
    }
    return true;
  }); */

/* const OnlyCity = () => {
    return filterCity.map((i) => ({
      label: i.city,
      value: i.country,
    }));
  }; */

/* 
  
  
     <div className="image_div" style={{ height: "100vh" }}>
      <Container
        className=""
        style={{
          display: "flex",
        }}
      >
        <Jumbotron className="mb-5 m-5" style={{ width: "70rem" }}>
          <div className="m-3 title_1" style={{ color: "#FFFFFF" }}>
            check out our
            <br />
            <p className="h3 title_2">Best Cousine</p>
          </div>
          <div className="tableoflist" style={{ backgroundColor: "#0000009D" }}>
            <Row>
              <Form noValidate>
                <Row>
                  <Col className="mt-3" style={{ flexBasis: "15rem" }}>
                    <Form.Label
                      className="p-2"
                      style={{ color: "#fff", zIndex: 2 }}
                    >
                      where
                    </Form.Label>

                    <Form.Group>
                      <Form.Control as="select" placeholder="search city">
                        {searchInput === ""
                          ? city.map((m) => {
                              return (
                                <option placeholder="search city" key={m.city}>
                                  {m.city}
                                </option>
                              );
                            })
                          : null}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="mt-3" style={{ flexBasis: "15rem" }}>
                    <Form.Label
                      className="p-2"
                      style={{ color: "#fff", zIndex: 2 }}
                    >
                      destination
                    </Form.Label>
                    <Form.Group>
                      <Form.Control as="select">
                        {searchInput === ""
                          ? city.map((m) => {
                              return <option key={m.city}>{m.city}</option>;
                            })
                          : null}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <br />
                <Row>
                  <Col className="mt-3" style={{ flexBasis: "15rem" }}>
                    <Form.Label
                      className="p-2"
                      style={{ color: "#fff" }}
                      onChange={() => console("text here")}
                    >
                      departure date & time
                    </Form.Label>
                    <Form.Control
                      className="p-2"
                      type="datetime-local"
                      placeholder="choose time"
                      style={{ marginTop: "0rem" }}
                    />
                  </Col>

                  <Col className="mt-3" style={{ flexBasis: "15rem" }}>
                    <Form.Label
                      className="p-2"
                      style={{ color: "#fff" }}
                      onChange={() => console("text here")}
                    >
                      train model
                    </Form.Label>
                    <Form.Group>
                      <Form.Control as="select">
                        {searchInput === ""
                          ? trains &&
                            trains.map((i) => {
                              return (
                                <option key={i.trainNumber}>
                                  {i.trainType + i.trainNumber}
                                </option>
                              );
                            })
                          : null}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="m-1 text-center">
                    <Button
                      type="submit"
                      className="mt-3"
                      style={{ width: "7rem", height: "3rem" }}
                      variant="secondary"
                      onClick={routeToNextPage}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          </div>
        </Jumbotron>
      </Container>
    </div>

  
  */
