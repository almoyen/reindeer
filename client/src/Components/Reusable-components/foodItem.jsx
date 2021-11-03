import { Card, CardDeck, Container } from "react-bootstrap";
import { EmojiHeartEyesFill } from "react-bootstrap-icons";
import { useHistory } from "react-router";

export default function FootItems({ data }) {
  const history = useHistory();

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
            <Card
              key={index}
              style={{
                width: "19rem",
                margin: "0.5rem",
                border: "none",
              }}
            >
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
    </Container>
  );
}
