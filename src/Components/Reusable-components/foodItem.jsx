import { Button, Card, CardDeck, Jumbotron } from "react-bootstrap";
import { EmojiHeartEyesFill } from "react-bootstrap-icons";
import { useHistory } from "react-router";

export default function FootItems({ data }) {
  const history = useHistory();

  return (
    <>
      <div>
        <CardDeck
          className="w-40"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {data.map((i, index) => {
            const { id, image, item } = i;
            return (
              <Card key={index} style={{ width: "18rem", margin: "0.5rem" }}>
                {image === "" ? (
                  <Jumbotron
                    height="17.5rem"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                    }}
                    variant="top"
                  >
                    <EmojiHeartEyesFill
                      style={{ color: "#000", cursor: "pointer" }}
                      width={100}
                      height="17.5rem"
                      onClick={() => history.push(`/item/${id}`)}
                    />
                  </Jumbotron>
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
      </div>
    </>
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
