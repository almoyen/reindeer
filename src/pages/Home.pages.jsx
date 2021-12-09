import axios from "axios";
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowLeftRight } from "react-bootstrap-icons";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { FormControl, Image, InputGroup } from "react-bootstrap";

import { Loader } from "../Components";
import { end_points, styles, colors } from "../config";
import OrdPic from "../assets/images/background_picture.png";

export default function LandingPage({ searchField, setSearchField }) {
  const { bright } = colors;
  const history = useHistory();
  const { getAllCities, getAllTrainModels } = end_points;

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
      .catch((e) => console.error(e.message));
  };

  const getTrainModels = async () => {
    try {
      const respond = await axios.get(getAllTrainModels);
      setTrainModels(respond.data);
      return respond;
    } catch (error) {
      console.error(error.message);
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
  };

  const { homeSearchButtonStyle } = styles;
  const { homeFormInputLabelStyle, homeRowContainerStyle } = styles;
  const { homeControlArrowStyle, homeFormInputControlStyle } = styles;
  const { homeInputFromControlStyle, homeInputGroupTextStyle } = styles;
  const { homeBadgeStyle, homeFontBasicStyle, homeRowColStyle } = styles;
  const { homeWhereCityFieldStyle, homeImageStyle, homeConDivStyle } = styles;
  const { homeFormControlStyle, homeRowColCardStyle, homeInputContolStyle } =
    styles;

  return (
    <>
      {whereCities.length > 0 ? (
        <div>
          <div style={homeWhereCityFieldStyle}>
            <Image src={OrdPic} style={homeImageStyle} />
          </div>

          <Container>
            <div style={homeConDivStyle}>
              <Badge className="m-2 mt-5 text-left">
                <p className="title_1" style={homeBadgeStyle}>
                  check out our
                </p>
                <p className="h3 title_2" style={homeFontBasicStyle}>
                  Best Cousine
                </p>
              </Badge>

              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Container style={homeRowColStyle}>
                    <Card style={homeRowColCardStyle}>
                      <Card.Body>
                        <Form>
                          <Row>
                            <Col xs="" lg={6} className="m-0">
                              <Form.Label
                                className="m-4 mb-1 mt-2 p-2 pt-3 tableoflist"
                                htmlFor="inlineFormInputGroup"
                                style={{ color: bright }}
                              >
                                where
                              </Form.Label>
                              <InputGroup className="mb-2 m-3">
                                <FormControl
                                  required
                                  size="lg"
                                  type="text"
                                  as="select"
                                  id="inlineFormInputGroup1"
                                  style={homeFormControlStyle}
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
                                <InputGroup.Text style={homeInputContolStyle}>
                                  <ArrowLeftRight
                                    style={homeControlArrowStyle}
                                    onClick={switchToOther}
                                  />
                                </InputGroup.Text>{" "}
                              </InputGroup>
                            </Col>
                            <Col lg={6}>
                              <Form.Label
                                className="m-4 mb-1 mt-2 p-2 pt-3 tableoflist"
                                htmlFor="inlineFormInputGroup"
                                style={{ color: bright }}
                              >
                                destination
                              </Form.Label>
                              <InputGroup className="mb-2 m-3">
                                <FormControl
                                  required
                                  size="lg"
                                  type="text"
                                  as="select"
                                  id="inlineFormInputGroup2"
                                  style={homeFormInputControlStyle}
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
                                style={{ color: bright }}
                              >
                                departure date & time
                              </Form.Label>
                              <InputGroup className="mb-2 m-3 tableoflist">
                                <FormControl
                                  className=""
                                  id="inlineFormInputGroup"
                                  size="lg"
                                  type="datetime-local"
                                  style={homeInputFromControlStyle}
                                />
                                <InputGroup.Text
                                  className=""
                                  style={homeInputGroupTextStyle}
                                ></InputGroup.Text>
                              </InputGroup>
                            </Col>
                            <Col xs="" lg={6}>
                              <Form.Label
                                className="m-4 mb-1 mt-2 p-2 pt-3 tableoflist"
                                htmlFor="inlineFormInputGroup"
                                style={{ color: bright }}
                              >
                                train model
                              </Form.Label>
                              <InputGroup className="mb-2 m-3 pb-4">
                                <FormControl
                                  required
                                  size="lg"
                                  as="select"
                                  id="inlineFormInputGroup"
                                  style={homeFormInputLabelStyle}
                                >
                                  {searchField === ""
                                    ? trainModels &&
                                      trainModels.map((trainModel, index) => {
                                        return (
                                          <option
                                            key={index}
                                            className="tableoflist"
                                          >
                                            {trainModel.model}
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
                  <Container className="" style={homeRowContainerStyle}>
                    <Button
                      type="submit"
                      className="mt-3"
                      onClick={routeToNextPage}
                      style={homeSearchButtonStyle}
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
