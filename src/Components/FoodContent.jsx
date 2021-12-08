import axios from 'axios'
import { useHistory } from 'react-router'
import { Count, Loader } from './index'
import { end_points } from '../utils/BACKEND_URL'
import React, { useEffect, useState } from 'react'
import { Card, Col, FormControl } from 'react-bootstrap'
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Container, Jumbotron, Button, Row } from 'react-bootstrap'
import burgImage from '../Images/v290_52.png'
import MobileLayout from './Reusable-components/mobileView'

function FoodContent({ searchField }) {
  const history = useHistory()
  const { getallItems, getAllOptions } = end_points
  const [size, setSize] = useState(window.innerWidth)

  const breakPoint = 556
  const [options, setOptions] = useState([])
  const [distance, setDistance] = useState(0)
  const [allItems, setAllItems] = useState([])
  const [itemSelect, setItemSelect] = useState([])
  //const [forceUpdate, setForceUpdate] = useState()
  const [isChecked, setIsChecked] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [searchItemField, setSearchItemsField] = useState('')
  const [numberOfitemsShown, setNumberofItemsShown] = useState(4)
  const [myStyle, setMyStyle] = useState(false)

  /*   const updateDimensions = () => {
    setSize({ width: size })
  } */

  //return size

  const getOptions = async () => {
    try {
      const respond = await axios.get(getAllOptions)
      setOptions(respond.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getAllItems = async () => {
    try {
      let arr = []
      const respond = await axios.get(getallItems)
      for (let i = 0; i < respond.data.length; i++) {
        for (let j = 0; j < respond.data[i].menus.length; j++) {
          arr.push(respond.data[i].menus[j])
        }
      }
      console.log('arr', arr)
      setAllItems(arr)
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
      console.log(error)
    }
  }

  console.log(selectedMeal)

  useEffect(() => {
    getOptions()
    getAllItems()
    window.addEventListener('resize', () => setSize(window.innerWidth))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!isChecked])

  const filterItems = allItems.filter((el) => {
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
    if (!isChecked && !el.length > 0 && !el) {
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

  const mealClass = [
    { id: 1, label: 'Alkuoalat' },
    { id: 2, label: 'Pääruoat' },
    { id: 3, label: 'Jälkiruoka' },
    { id: 4, label: 'Juoma' },
    { id: 5, label: 'Lahjat' },
  ]

  const onMouseEnter = () => {
    setMyStyle(true)
  }

  const onMouseLeave = () => {
    setMyStyle(false)
  }

  const fadeStyle = !myStyle
    ? {
        width: '8rem',
        height: '3rem',
        backgroundColor: '#949494',
        border: 'none',
        fontSize: '1.3rem',
        outline: 'none',
        position: 'absolute',
      }
    : {
        width: '8rem',
        height: '3rem',
        backgroundColor: '#BAB6B6',
        border: 'none',
        fontSize: '1.3rem',
        outline: 'none',
        position: 'absolute',
      }

  // const resizeAll = (!size.innerWidth )
  console.log('allitems', allItems)
  return (
    <>
      {filterItems && filterItems.length > 0 ? (
        <>
          {' '}
          {size >= breakPoint ? (
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
                            flexShrink: '1',
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
                              style={{
                                width: '8.5rem',
                                margin: '3rem',
                                flexShrink: '2',
                              }}
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
                                      isChecked={!isChecked}
                                      /*  onClick={() => setIsChecked(!isChecked)} */
                                      /*  onClick={forceUpdate} */
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
                                      onClick={() => {
                                        setIsChecked(!isChecked)
                                      }}
                                      type="checkbox"
                                    />
                                    <span>New items</span>
                                  </div>
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
                                            type="checkbox"
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
                        {filterItems
                          .slice(0, numberOfitemsShown)
                          .map((i, index) => {
                            const { id, image, item, price, ingredient } = i
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
                                  <Card.ImgOverlay>
                                    <div
                                      style={{
                                        height: '7rem',
                                        marginLeft: '0.05rem',
                                        /*                               width: '22rem',
                                         */ color: '#fff',
                                        opacity: '0.8',
                                        marginTop: '8rem',
                                        borderBottomLeftRadius: '15px',
                                        borderBottomRightRadius: '15px',
                                        backgroundColor: 'black',
                                        position: 'relative',
                                        zIndex: '2',
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
                                  {image ? (
                                    <Card.Img
                                      variant="top"
                                      src={image}
                                      style={{
                                        cursor: 'pointer',
                                        objectFit: 'cover',
                                        margin: '.05rem',
                                        height: '15rem',
                                        borderRadius: '12px',
                                        zIndex: '1',
                                        position: 'relative',
                                      }}
                                      onClick={() =>
                                        history.push(`/item/${id}`)
                                      }
                                    />
                                  ) : (
                                    <Card.Img
                                      variant="top"
                                      src={burgImage}
                                      style={{
                                        cursor: 'pointer',
                                        objectFit: 'cover',
                                        margin: '.05rem',
                                        height: '15rem',
                                        borderRadius: '12px',
                                        zIndex: '1',
                                        position: 'relative',
                                      }}
                                      onClick={() =>
                                        history.push(`/item/${id}`)
                                      }
                                    />
                                  )}
                                </Card.Body>
                              </Card>
                            )
                          })}

                        <Container style={{ paddingRight: '10rem' }}>
                          <div
                            style={{
                              padding: '1.5rem',
                              paddingLeft: '19rem',
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
          ) : (
            <MobileLayout />
          )}{' '}
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default FoodContent
