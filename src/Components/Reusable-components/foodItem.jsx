import { Button, Card, CardDeck, Container, Jumbotron } from "react-bootstrap";
import { EmojiHeartEyesFill } from "react-bootstrap-icons";
import { useHistory } from "react-router";

export default function FootItems({ data }) {
  const history = useHistory();

  return (
    <Container
      style={{
        width: "100%",
      }}
    >
      <CardDeck
        /*  className="w-40" */
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {data.map((i, index) => {
          const { id, image, item } = i;
          return (
            <Card
              key={index}
              style={{ /*  width: "23.5rem", */ margin: "0.5rem" }}
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
                    height: "17.5rem",
                    objectFit: "cover",
                  }}
                  onClick={() => history.push(`/item/${id}`)}
                />
              )}

              <Card.Body>
                <Card.Title>{item}</Card.Title>
                {/*  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text> */}
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardDeck>
    </Container>
  );
}
/*** 
              <Card key={index}>
                <Card.Img
                  variant="top"
                  src={image}
                  width={20}
                  height={20}
                  alt="image"
                  style={{
                    cursor: "pointer",
                    height: "17.5rem",
                    objectFit: "cover",
                  }}
                  onClick={() => history.push(`/next-action/${id}`)}
                />
                {item}
              </Card>

    */
