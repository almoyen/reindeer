import React, { useState } from "react";
//import Burg from "../Images/image.jpg";
//import { useHistory } from "react-router";
import { FoodData } from "../utils/foodData";
import Count from "./Reusable-components/count";
import { Button, Card, Col, FormControl } from "react-bootstrap";
import { Container, Jumbotron, Row } from "react-bootstrap";
import FootItems from "./Reusable-components/foodItem";
import { paginate } from "../utils/paginate";
import Pagination from "../Components/Reusable-components/Pagination";
//import FoodCard from "./Reusable-components/foodItem";

function FoodContent() {
  //const history = useHistory();
  /*   const [footItems, setFootItems] = useState("");
   */ const [searchField, setSearchField] = useState("");
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  /*  const footItem = FoodData.map((i) => {
    return <p key={i.id}>{i}</p>;
  }); */

  const filterItems = FoodData.filter((m) => {
    if (
      searchField &&
      !m.item.toLowerCase().includes(searchField.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const paginatedItem = paginate(filterItems, currentPage, pageSize);
  console.log(paginatedItem);
  console.log(filterItems);
  return (
    <>
      <div className="m-5">
        <Container
          style={{
            backgroundColor: "#fff",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            height: "50rem",
          }}
        >
          <Jumbotron>
            <Container className="m-4 pt-5">
              <>
                <Row>
                  <Col sm={12} md={6} lg={3} my={1}>
                    <Count
                      /* item={FoodData.map((item) => item.id)} */
                      item={filterItems}
                      label="result"
                    />
                  </Col>
                  <Col>
                    <Button variant="dark" size="m" style={{ width: "100px" }}>
                      full-meal
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      size="m"
                      style={{ width: "115px", textAlign: "center" }}
                    >
                      course-meal
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="dark" size="m" style={{ width: "100px" }}>
                      apetizer
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="dark" size="m" style={{ width: "100px" }}>
                      drinks
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="dark" size="m" style={{ width: "100px" }}>
                      children's
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={10} lg={3}>
                    <Card style={{ height: "22rem" }}>
                      <Card.Body>
                        <FormControl
                          aria-label="search"
                          placeholder="burger only"
                          aria-describedby="basic-addon2"
                          className="ml-1 mr-1 mb-2 mt-1"
                        />
                        <FormControl
                          aria-label="search"
                          placeholder="pizza only"
                          aria-describedby="basic-addon2"
                          className="ml-1 mr-1 mb-2 mt-1"
                        />
                        <FormControl
                          aria-label="search"
                          placeholder="burger only"
                          aria-describedby="basic-addon2"
                          className="ml-1 mr-1 mb-2 mt-1"
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={12} md={10} lg={9}>
                    {/*   <Container> */}
                    <FootItems data={paginatedItem} />
                    <Container className="justify-content-center mt-2">
                      <Pagination
                        pageSize={pageSize}
                        onNextPage={onNextPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onPreviousPage={onPreviousPage}
                        itemsCount={filterItems?.length}
                      />
                    </Container>
                    {/*    </Container> */}

                    {/* <Container className="text-align center mt-2">
                      <Pagination
                        pageSize={pageSize}
                        onNextPage={onNextPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onPreviousPage={onPreviousPage}
                        itemsCount={filterItems?.length}
                      />
                    </Container> */}
                  </Col>
                </Row>
              </>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    </>
  );
}

export default FoodContent;
