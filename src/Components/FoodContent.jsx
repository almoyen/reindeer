import useSWR from 'swr'
import axios from 'axios'
import { useHistory } from 'react-router'
import { Count, Loader } from './index'
import { end_points } from '../utils/BACKEND_URL'
import React, { useEffect, useState } from 'react'
//import FootItems from "./Reusable-components/foodItem";
import { Card, Col, FormControl } from 'react-bootstrap'
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Container, Jumbotron, Button, Row } from 'react-bootstrap'
import burgImage from '../Images/v290_52.png'

function FoodContent({ searchField }) {
  const history = useHistory()
  const { getallItems, getAllOptions } = end_points

  const [options, setOptions] = useState([])
  const [distance, setDistance] = useState(0)
  const [itemSelect, setItemSelect] = useState([])
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [searchItemField, setSearchItemsField] = useState('')
  const [numberOfitemsShown, setNumberofItemsShown] = useState(4)

  const [items, setItems] = useState([])

  async function fetcher(url) {
    return await axios.get(url)
  }
  const { data } = useSWR(getallItems, fetcher)

  const getOptions = async () => {
    try {
      const respond = await axios.get(getAllOptions)
      setOptions(respond.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getAllLists = async () => {
    try {
      const respond = await axios.get(getallItems)
      setItems(respond.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  console.log('items', items)
  console.log(selectedMeal)

  useEffect(() => {
    getOptions()
    getAllLists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data) {
    return <Loader />
  }

  const foodData = data.data
  console.log('data', data)

  const filterItems = foodData.filter((el) => {
    if (
      searchField &&
      !el.item.toLowerCase().includes(searchField.toLowerCase())
    ) {
      return false
    }
    if (
      itemSelect.length > 0 &&
      !itemSelect.some((catagory) => el.foodChoices.includes(catagory))
    ) {
      return false
    }
    if (
      searchItemField &&
      el.ingredient.toLowerCase().includes(searchItemField.toLowerCase())
    ) {
      return false
    }
    if (searchField && !el.slice(-3)) {
      return false
    }
    return true
  })

  const onNextPage = () => {
    setNumberofItemsShown(numberOfitemsShown + 2)
  }

  const onItemSelect = (ml) => {
    setSelectedMeal(ml)
  }

  const handleCheckCatagories = (e) => {
    if (e.target.checked) {
      setItemSelect(itemSelect.concat(e.target.name))
    } else {
      setItemSelect(itemSelect.filter((catagory) => e.target.name !== catagory))
    }
  }

  //const paginatedItem = paginate(filterItems, currentPage, itemSize);

  const mealClass = [
    { id: 1, label: 'full meal' },
    { id: 2, label: 'course meal' },
    { id: 3, label: 'apetizer' },
    { id: 4, label: 'drink' },
    { id: 5, label: "children's" },
  ]

  /* const sortItem = [
    {
      id: 1,
      label: 'all Items',
    },
    {
      id: 2,
      label: 'best Rates',
    },
    {
      id: 3,
      label: 'new Items',
    },
  ] */
  /*   const handleSort = (e) => {
    if (e.target.checked) {
      setItems(items.concat(e.target.name))
    } else {
      setItems(items.map((catagory) => catagory))
      //console.log('catagory', catagory)
    }
  }
 */
  const sorting = (e) => {
    console.log('console', e.target.checked)
    if (e.target.checked) {
      setItems(items)
    } else {
      setItems()
    }
  }
  return (
    <>
      <div className="footContent m-5">
        <Container style={{ height: '100%', width: '100%' }}>
          <Jumbotron>
            <Row>
              <Col lg={3} md={6} sm={12}>
                <Container
                  className=""
                  style={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <Card
                    className="ml-3 mr-3"
                    style={{
                      background: 'none',
                      border: 'none',
                    }}
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
                        className="m-2"
                        key={item.id}
                        onClick={() => {
                          onItemSelect(item.label)
                        }}
                        style={{ width: '8.5rem', margin: '3rem' }}
                      >
                        {item.label}
                      </Button>
                    )
                  })}
                </Container>
              </Col>
            </Row>

            <Row>
              <Col lg={3} md={5} sm={12}>
                <Container>
                  <Card
                    className="ml-3 mr-2"
                    style={{
                      backgroundColor: 'black',
                      borderRadius: '15px',
                      height: '100%',
                    }}
                  >
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
                              style={{ color: 'light' }}
                            >
                              {distance}
                              {'   '}€
                            </Tooltip>
                          }
                        >
                          <Form.Control
                            style={{ width: '12rem' }}
                            type="range"
                            className="mt-3"
                            placement="top"
                            defaultValue="{distance}"
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
                          style={{ color: '#fff' }}
                        >
                          <Col>
                            {/*   {sortItem &&
                              sortItem?.map((i) => {
                                return ( */}

                            <div
                              className="sidebarItems"
                              /*   key={i.id} */
                              style={{
                                display: 'flex',
                                overflow: 'auto',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                              }}
                            >
                              <Form.Check
                                className=""
                                style={{ color: 'gray' }}
                                /*   onClick={handleSort} */
                                type="checkbox"
                              />
                              <span>All items</span>
                            </div>
                            <div
                              className="sidebarItems"
                              style={{
                                display: 'flex',
                                overflow: 'auto',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                              }}
                            >
                              <Form.Check
                                className=""
                                style={{ color: 'gray' }}
                                type="checkbox"
                              />
                              <span>Best rated</span>
                            </div>
                            <div
                              className="sidebarItems"
                              style={{
                                display: 'flex',
                                overflow: 'auto',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                              }}
                            >
                              <Form.Check
                                className=""
                                style={{ color: 'gray' }}
                                //name={items}
                                onClick={sorting}
                                type="checkbox"
                              />
                              <span>New items</span>
                            </div>

                            {/*    )
                              })} */}
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          controlId="formGridCity"
                          className="mt-2"
                        ></Form.Group>
                      </>
                      <Card.Title className="text-secondary mt-3 sidebarTitles">
                        Foot Choices
                      </Card.Title>
                      <>
                        <Form.Group
                          as={Row}
                          className="mt-4"
                          style={{ color: '#fff' }}
                        >
                          <Col>
                            {options &&
                              options?.map((i) => {
                                return (
                                  <div
                                    className="sidebarItems"
                                    key={i.id}
                                    style={{
                                      display: 'flex',
                                      overflow: 'auto',
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'flex-start',
                                    }}
                                  >
                                    <Form.Check
                                      className=""
                                      style={{ color: 'gray' }}
                                      type="radio"
                                      name={i.label}
                                      id={`default-${i.label}`}
                                      onChange={handleCheckCatagories}
                                    />
                                    <span>{i.label}</span>
                                  </div>
                                )
                              })}
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          controlId="formGridCity"
                          className="mt-2"
                        >
                          <Form.Label style={{ color: 'gray' }}>
                            <Card.Title className="text-secondary mt-3 sidebarItems">
                              Alergic?
                            </Card.Title>
                          </Form.Label>
                          <FormControl
                            className="sidebarTitles"
                            value={searchItemField || ''}
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
                <Container
                  className=""
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    margin: '0rem',
                  }}
                >
                  {filterItems.slice(0, numberOfitemsShown).map((i, index) => {
                    const { id, /*  image, */ item, price, ingredient } = i
                    return (
                      <Card
                        key={index}
                        className="ml-3 mr-2"
                        style={{
                          width: '24rem',
                          border: 'none',
                        }}
                      >
                        <Card.Body>
                          <Card.Img
                            variant="top"
                            src={burgImage}
                            style={{
                              cursor: 'pointer',
                              objectFit: 'cover',
                              margin: '.05rem',
                              height: '15rem',
                              borderRadius: '12px',
                              position: 'relative',
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

                          <Card.ImgOverlay
                            style={{
                              color: '#fff',
                              opacity: '0.8',
                              display: 'flex',
                              flexWrap: 'wrap',
                              flexDirection: 'row',
                              margin: '0rem',
                            }}
                          >
                            <div
                              style={{
                                height: '7rem',
                                marginLeft: '0.05rem',
                                width: '22rem',
                                marginTop: '8rem',
                                borderBottomLeftRadius: '15px',
                                borderBottomRightRadius: '15px',
                                backgroundColor: 'black',
                              }}
                            >
                              <Card.Title>
                                <span
                                  className="m-4 mb-0 mt-0 listFoodItem_1"
                                  style={{
                                    textTransform: 'uppercase',
                                    lineHeight: '2rem',
                                  }}
                                >
                                  {item}
                                </span>
                              </Card.Title>
                              <Card.Text>
                                <h5
                                  className="m-4 mt-1 listFoodItem_2"
                                  style={{ lineHeight: '10px' }}
                                >
                                  {ingredient}
                                </h5>
                                <h5
                                  className="m-4"
                                  style={{ lineHeight: '10px' }}
                                >
                                  {price} € (INC. Vat)
                                </h5>
                              </Card.Text>
                            </div>
                          </Card.ImgOverlay>
                        </Card.Body>
                      </Card>
                    )
                  })}
                  <div
                    style={{
                      paddingLeft: '20.5rem',
                    }}
                  >
                    <Button
                      style={{
                        width: '7rem',
                        height: '3rem',
                        backgroundColor: 'grey',
                        border: 'none',
                      }}
                      onClick={onNextPage}
                    >
                      show more
                    </Button>
                  </div>
                </Container>
              </Col>
            </Row>
          </Jumbotron>
        </Container>
      </div>
    </>
  )
}

export default FoodContent

/*   {itemsToShow.length ? itemsToShow : "loading...."} */

/*   <FootItems data={filterItems} numberofItemsShown={4} /> */
/* const getAllData = async () => {
  try {
    const respond = await axios.get(getallItems);
    setAllData(respond.data.foodData);
  } catch (error) {
    console.log(error.message);
  } */

/*


    <div className="footContent">
      <Container style={{ height: "100%", width: "100%" }}>
        <Jumbotron>
          <Row>
            <Col lg={4} md={6} sm={12}>
              <Container
                className=""
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Card
                  className="ml-3 mr-3"
                  style={{
                    background: "none",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    <Count item={filterItems} label="result" />
                  </Card.Body>
                </Card>
              </Container>
            </Col>
            <Col lg={8} md={6} sm={6} className="mt-3">
              <Container className="topMealList m-5">
                {mealClass.map((item) => {
                  return (
                    <Button
                      variant="outline-secondary"
                      className="m-2"
                      key={item.id}
                      onClick={() => {
                        onItemSelect(item.label);
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Container>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={5} sm={12}>
              <Container>
                <Card
                  className="ml-3 mr-2"
                  style={{
                    backgroundColor: "black",
                    borderRadius: "15px",
                    height: "100%",
                  }}
                >
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
                          style={{ width: "12rem" }}
                          type="range"
                          className="mt-3"
                          placement="top"
                          defaultValue="{distance}"
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
                        style={{ color: "#fff" }}
                      >
                        <Col>
                          {sortItem &&
                            sortItem?.map((i) => {
                              return (
                                <div
                                  className="sidebarItems"
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
                    <Card.Title className="text-secondary mt-3 sidebarTitles">
                      Foot Choices
                    </Card.Title>
                    <>
                      <Form.Group
                        as={Row}
                        className="mt-4"
                        style={{ color: "#fff" }}
                      >
                        <Col>
                          {options &&
                            options?.map((i) => {
                              return (
                                <div
                                  className="sidebarItems"
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
                          <Card.Title className="text-secondary mt-3 sidebarItems">
                            Alergic?
                          </Card.Title>
                        </Form.Label>
                        <FormControl
                          className="sidebarTitles"
                          value={searchItemField || ""}
                          placeholder="type anything"
                          onChange={(e) => setSearchItemsField(e.target.value)}
                        />
                      </Form.Group>
                    </>
                  </Card.Body>
                </Card>
              </Container>
            </Col>

            <Col lg={8} md={7} sm={12}>
              <Container
                className="sidebar_elem"
                style={{
                  background: "none",
                  border: "none",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1rem",
                }}
              >
                {filterItems.slice(0, numberOfitemsShown).map((i, index) => {
                  const { id, image, item, price, ingredient } = i;
                  return (
                    <>
                      <Card
                        key={index}
                        style={{
                          background: "none",
                          width: "25rem",
                          border: "none",
                          margin: "0rem",
                        }}
                      >
                        <Card.Body>
                          <>
                            {image ? (
                              <Card.Img
                                variant="top"
                                src={burgImage}
                                style={{
                                  cursor: "pointer",
                                  borderRadius: "18px",
                                  height: "18rem",
                                  width: "25rem",
                                  margin: "0.6rem",

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
                              height: "18rem",
                              width: "20rem",
                              margin: "0.6rem",

                              objectFit: "cover",
                            }}
                            onClick={() => history.push(`/item/${id}`)}
                          />
                        )}
                        <Card.ImgOverlay
                          style={{
                            color: "#fff",
                            width: "27rem",
                            margin: "0.6rem",

                            opacity: "0.8",
                          }}
                        >
                          <div
                            className=""
                            style={{
                              height: "7rem",
                              marginTop: "11rem",
                              borderBottomLeftRadius: "18px",
                              borderBottomRightRadius: "18px",
                              position: "relative",
                              backgroundColor: "black",
                            }}
                          >
                            <Card.Title>
                              <h4
                                className="m-4 mb-2 mt-5 listFoodItem_1"
                                style={{
                                  textTransform: "uppercase",
                                }}
                              >
                                {item}
                              </h4>
                            </Card.Title>
                            <Card.Text>
                              <h5
                                className=" m-2 mt-1 listFoodItem_2"
                                style={{
                                  textTransform: "full-width",
                                }}
                              >
                                {ingredient}
                              </h5>
                              <h5>{price} € (INC. Vat)</h5>
                            </Card.Text>
                          </div>
                        </Card.ImgOverlay>
                      </>
                    </Card.Body>
                  </Card>
                </>
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
                  backgroundColor: "#808080",
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
</div>*/
