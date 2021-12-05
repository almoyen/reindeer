import { Card, CardDeck, Container } from "react-bootstrap";
import { EmojiHeartEyesFill } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import React, { useState } from 'react';
import ModalConfirm from "../Modal/index";

export default function FootItems({ data }) {
  const history = useHistory();

  const [textModal, setTextModal] = useState('');
  const [modalBack, setModalBack] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [item, setItem] = useState({});

  const clickClose = () => {
    setTextModal('');
    setModalBack(false);
    setVisibleModal(false);
  }

  const clickConfirm = () => {
    console.log("CONMFIRMED")
  }

  const onItemClick = (i) => {
    console.log(i)
    setItem(i)
    setVisibleModal(true);
  }

  return (
    <Container>
      <CardDeck

        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",

        }}
      >
        {data.map((i, index) => {
          const { id, image, item, ingredient } = i;
          return (
            <Card key={index} style={{ width: "20rem", margin: "0.7rem", border: "none" }} onClick={() => onItemClick(i)} >
              {image === "" ? (
                <EmojiHeartEyesFill
                  style={{ color: "#000", cursor: "pointer" }}
                  width={100}
                  height="17.5rem"
                  onClick={() => history.push(`/item/${id}`)}
                />
              ) : (
                <Card.Img
                  variant="top"
                  src={image}
                  style={{
                    cursor: "pointer",
                    borderRadius: "26px",
                    height: "17.5rem",
                    // width:"10rem",
                    objectFit: "cover",
                  }}
                  onClick={() => history.push(`/item/${id}`)}
                ></Card.Img>
              )}
              <Card.ImgOverlay style={{ color: "#fff" }}>
                <Card.Title>
                  {" "}
                  <h4>{item}</h4>
                </Card.Title>
                <Card.Text>
                  <h5>{ingredient}</h5>
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          );
        })}
      </CardDeck>
      <ModalConfirm
        textModal={textModal}
        modalBack={modalBack}
        visibleModal={visibleModal}
        data={item}
        itemList={data}
        clickClose={clickClose}
        clickConfirm={clickConfirm}
      />
    </Container>

  );
}
