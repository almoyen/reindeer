import { Card, CardDeck, Container } from "react-bootstrap";
import { EmojiHeartEyesFill } from "react-bootstrap-icons";
import { useHistory } from "react-router";

export default function FootItems({ data }) {
  const history = useHistory();

  return (
    <Container
    // style={{
    //   width: "100%",
    // }}
    >
      <CardDeck
        /*  className="w-40" */
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          // width: "100%",
        }}
      >
        {data.map((i, index) => {
          const { id, image, item, ingredient } = i;
          return (
            <Card key={index} style={{ width: "20rem", margin: "0.7rem" ,border:"none" }}>
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
