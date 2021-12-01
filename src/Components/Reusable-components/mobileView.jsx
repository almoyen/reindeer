import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Jumbotron,
  Row,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Count } from '..'
import burgImage from '../../Images/v290_52.png'
import { end_points } from '../../utils'

export default function MobileLayout({ searchField }) {
  const history = useHistory()

  const { getallItems, getAllOptions, s } = end_points
  const [size, setSize] = useState(window.innerWidth)

  const [options, setOptions] = useState([])
  const [distance, setDistance] = useState(0)
  const [allItems, setAllItems] = useState([])
  const [itemSelect, setItemSelect] = useState([])
  const [forceUpdate, setForceUpdate] = useState()
  const [isChecked, setIsChecked] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [searchItemField, setSearchItemsField] = useState('')
  const [numberOfitemsShown, setNumberofItemsShown] = useState(4)
  const [myStyle, setMyStyle] = useState(false)

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
      const respond = await axios.get(getallItems)
      if (isChecked) {
        setAllItems(respond.data.slice(-3))
      } else if (!isChecked) {
        setAllItems(respond.data)
        setForceUpdate(!forceUpdate)
      } else {
        setAllItems(respond.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(selectedMeal)

  useEffect(() => {
    getOptions()
    getAllItems()

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
  const onMouseEnter = () => {
    setMyStyle(true)
  }

  const onMouseLeave = () => {
    setMyStyle(false)
  }

  const onNextPage = () => {
    setNumberofItemsShown(numberOfitemsShown + 2)
  }

  const onItemSelect = (ml) => {
    setSelectedMeal(ml)
  }

  /*   const handleCheckCatagories = (e) => {
    if (e.target.checked) {
      setItemSelect(itemSelect.concat(e.target.name))
    } else {
      setItemSelect(itemSelect.filter((catagory) => e.target.name !== catagory))
    }
  } */

  const mealClass = [
    { id: 1, label: 'full meal' },
    { id: 2, label: 'course meal' },
    { id: 3, label: 'apetizer' },
    { id: 4, label: 'drink' },
    { id: 5, label: "children's" },
  ]

  const fadeStyle = !myStyle
    ? {
        width: '8rem',
        height: '3rem',
        backgroundColor: '#949494',
        border: 'none',
        fontSize: '1.3rem',
        outline: 'none',
      }
    : {
        width: '8rem',
        height: '3rem',
        backgroundColor: '#BAB6B6',
        border: 'none',
        fontSize: '1.3rem',
        outline: 'none',
      }
  return (
    <div className="footContent m-5">
      <Container style={{ height: '100%', width: '100%' }}>
        <Jumbotron>
          <Row>
            <Col lg={12} sm={12} className="mt-3">
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
                <Container>
                  {' '}
                  <div
                    style={{
                      paddingRight: '1rem',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
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
  )
}
