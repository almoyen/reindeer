import axios from "axios";
import Select from "react-select";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { finlandCity } from "../utils/data";
import React, { useEffect, useState } from "react";
import { Col, Container, Jumbotron, Row, Button } from "react-bootstrap";

function OrderForm({ searchInput, setSearchInput }) {
  const history = useHistory();
  const [trains, setTrains] = useState([]);

  const getTrainModel = () => {
    try {
      axios
        .get("https://rata.digitraffic.fi/api/v1/live-trains?version=0")
        .then((res) => res.data)

        .then((res) => {
          setTrains(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrainModel();
  }, []);

  const filterCity = finlandCity.filter((allC) => {
    if (
      searchInput &&
      !allC.city.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Container
        className="p-5 mt-5 mr-5"
        style={{
          height: "100vh",
          display: "flex",
        }}
      >
        <Jumbotron className="p-5 mt-0" style={{ width: "70rem" }}>
          <div className="m-3" style={{ color: "#FFFFFF" }}>
            checkout our
            <br />
            <h3>Best Cousine</h3>
          </div>
          <div style={{ backgroundColor: "#0000009D" }}>
            <Row>
              <Form>
                <Row>
                  <Col className="mt-3" style={{ flexBasis: "15rem" }}>
                    <Form.Label
                      className="p-2"
                      style={{ color: "#fff", zIndex: 2 }}
                    >
                      where
                    </Form.Label>

                    <Select
                      isMulti
                      name="cities"
                      onMenuOpen={filterCity}
                      options={filterCity.map((i) => ({
                        label: i.city,
                        value: i.country,
                      }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </Col>
                  <Col className="mt-3" style={{ flexBasis: "15rem" }}>
                    <Form.Label
                      className="p-2"
                      style={{ color: "#fff", zIndex: 2 }}
                    >
                      destination
                    </Form.Label>
                    <Select
                      style={{ backgroundColor: "#fff" }}
                      isMulti
                      name="cities"
                      onMenuOpen={filterCity}
                      options={filterCity.map((i) => ({
                        label: i.city,
                        value: i.country,
                      }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
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
                    <Select
                      isMulti
                      name="cities"
                      /* onMenuOpen={filterCity} */
                      options={trains.map((i) => ({
                        label: i.trainType + i.trainNumber,
                        value: i.trainType + i.trainNumber,
                      }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    {/* <Form.Control placeholder="type here" /> */}
                  </Col>
                </Row>
                <Row>
                  <Col className="m-1 text-center">
                    <Button
                      className="mt-3"
                      style={{ width: "7rem", height: "3rem" }}
                      variant="secondary"
                      bsSize="large"
                      onClick={() => history.push("/orders")}
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
    </>
  );
}

export default OrderForm;
/** 
 *  <Container
        className="p-5 mt-5 mr-5"
        style={{ height: "100vh", display: "flex" }}
      >
       
        <Jumbotron className="p-5 mt-0">
          <div style={{ backgroundColor: "#0000009D" }}>
            <Row>
              <Col
                md={6}
                sm={6}
                xs={8}
                lg={6}
                className="mt-3"
                style={{ flexBasis: "25rem" }}
              >
                <div
                  style={{
                    paddingRight: "70%",
                    borderRadius: "0.3rem",
                  }}
                >
                  <h6 style={{ color: "#ffffff", textAlign: "center" }}>
                    Where:
                  </h6>
                </div>
                <Card className="" style={{ width: "26rem", height: "12rem" }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col
                md={6}
                sm={6}
                xs={8}
                lg={6}
                className="mt-3"
                style={{ flexBasis: "25rem" }}
              >
                <div
                  style={{
                    paddingRight: "60%",
                    borderRadius: "0.3rem",
                  }}
                >
                  <h6
                    className="mr-3"
                    style={{ color: "#ffffff", textAlign: "center" }}
                  >
                    Destination:
                  </h6>
                </div>
                <Card style={{ width: "25rem", height: "12rem" }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          <Button>Search</Button>
        </Jumbotron>
        
      </Container>
 */
