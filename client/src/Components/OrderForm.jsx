import axios from "axios";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
//import { finlandCity } from "../utils/data";
import React from "react";
import { Col, Container, Jumbotron, Row, Button } from "react-bootstrap";
import { end_points } from "../utils";
import useSWR from "swr";
import { Loader } from ".";

function OrderForm({ searchInput }) {
  const history = useHistory();
  //const [trains, setTrains] = useState([]);
  //const [city, setCities] = useState([]);
  //const [loader, setLoader] = useState(false);

  const { getAllCities, getAllTrainModels } = end_points;

  async function fetcher(url) {
    return await axios.get(url);
  }

  const { data } = useSWR(getAllCities, fetcher);
  const { data: trainModels } = useSWR(getAllTrainModels, fetcher);

  /*  const getFinlandCities = async () => {
    try {
      const respond = await axios.get(getAllCities);
      setCities(respond.data.finlandCity);
      setLoader(true);
    } catch (error) {
      console.log(error.message);
    }
  }; */

  if (!data) {
    return <Loader />;
  }
  const city = data.data.finlandCity;
  const trains = trainModels && trainModels.data.trainModel;
  console.log(trains);
  const routeToNextPage = () => {
    history.push("/orders");
  };

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
            <p className="h3">Best Cousine</p>
          </div>
          <div style={{ backgroundColor: "#0000009D" }}>
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
