import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import cupImage from "../../assets/images/cup.jpg";
import cakeImage from "../../assets/images/cake.jpg";
import colaImage from "../../assets/images/cocacola.jpg";
import tshirtImage from "../../assets/images/tshirt.jpg";

import { apetizerData, drinkData, foodData } from "../../data";
import { styles } from "../../config";
import "./index.css";

const ModalConfirm = (props) => {
  const [step, setStep] = useState(1);
  const [update, setUpdate] = useState(0);
  const [cupCount, setCupCount] = useState(1);
  const [shirtCount, setShirtCount] = useState(1);
  const [selectedCourseMeals, setSelectedCourseMeals] = useState([
    {
      itemId: 0,
      count: 1,
      change: false,
    },
  ]);
  const [selectedApetizers, setSelectedApetizers] = useState([
    {
      itemId: 0,
      count: 1,
      change: false,
    },
  ]);
  const [selectedDrinks, setSelectedDrinks] = useState([
    {
      itemId: 0,
      count: 1,
      change: false,
    },
  ]);

  const { modalItemDivStyle, modalItemCountStyle } = styles;
  const { visibleModal, clickClose, data } = props;

  const onChangeCourseMeals = (indexOfItem) => {
    var newCourseMeals = selectedCourseMeals;

    newCourseMeals[indexOfItem].change = true;
    setSelectedCourseMeals(newCourseMeals);
    setUpdate(update + 1);
  };

  const selectNewCourseMeal = (indexOfItem, id) => {
    var newCourseMeals = selectedCourseMeals;

    newCourseMeals[indexOfItem].itemId = id;
    newCourseMeals[indexOfItem].count = 1;
    newCourseMeals[indexOfItem].change = false;
    setSelectedCourseMeals(newCourseMeals);
    setUpdate(update + 1);
  };

  const plusCourse = (indexOfItem) => {
    var newCourseMeals = selectedCourseMeals;
    newCourseMeals[indexOfItem].count = newCourseMeals[indexOfItem].count + 1;
    setSelectedCourseMeals(newCourseMeals);
    setUpdate(update + 1);
  };

  const minusCourse = (indexOfItem) => {
    var newCourseMeals = selectedCourseMeals;

    if (newCourseMeals[indexOfItem].count > 1)
      newCourseMeals[indexOfItem].count = newCourseMeals[indexOfItem].count - 1;

    setSelectedCourseMeals(newCourseMeals);
    setUpdate(update + 1);
  };

  const addCourseMeal = () => {
    var newCourseMeals = selectedCourseMeals;
    var newCourse = {
      itemId: 0,
      count: 1,
      change: false,
    };
    newCourseMeals.push(newCourse);

    setSelectedCourseMeals(newCourseMeals);
    setUpdate(update + 1);
  };

  const onChangeApetizers = (indexOfItem) => {
    var newApetizers = selectedApetizers;

    newApetizers[indexOfItem].change = true;
    setSelectedApetizers(newApetizers);
    setUpdate(update + 1);
  };

  const selectNewApetizers = (indexOfItem, id) => {
    var newApetizers = selectedApetizers;

    newApetizers[indexOfItem].itemId = id;
    newApetizers[indexOfItem].count = 1;
    newApetizers[indexOfItem].change = false;
    setSelectedApetizers(newApetizers);
    setUpdate(update + 1);
  };

  const plusApetizers = (indexOfItem) => {
    var newApetizers = selectedApetizers;
    newApetizers[indexOfItem].count = newApetizers[indexOfItem].count + 1;
    setSelectedApetizers(newApetizers);
    setUpdate(update + 1);
  };

  const minusApetizers = (indexOfItem) => {
    var newApetizers = selectedApetizers;

    if (newApetizers[indexOfItem].count > 1)
      newApetizers[indexOfItem].count = newApetizers[indexOfItem].count - 1;

    setSelectedApetizers(newApetizers);
    setUpdate(update + 1);
  };

  const addApetizers = () => {
    var newApetizers = selectedApetizers;

    var newCourse = {
      itemId: 0,
      count: 1,
      change: false,
    };
    newApetizers.push(newCourse);

    setSelectedApetizers(newApetizers);
    setUpdate(update + 1);
  };

  const onChangeDrinks = (indexOfItem) => {
    var newDrinks = selectedDrinks;

    newDrinks[indexOfItem].change = true;
    setSelectedDrinks(newDrinks);
    setUpdate(update + 1);
  };

  const selectNewDrinks = (indexOfItem, id) => {
    var newDrinks = selectedDrinks;

    newDrinks[indexOfItem].itemId = id;
    newDrinks[indexOfItem].count = 1;
    newDrinks[indexOfItem].change = false;
    setSelectedDrinks(newDrinks);
    setUpdate(update + 1);
  };

  const plusDrinks = (indexOfItem) => {
    var newDrinks = selectedDrinks;
    newDrinks[indexOfItem].count = newDrinks[indexOfItem].count + 1;
    setSelectedDrinks(newDrinks);
    setUpdate(update + 1);
  };

  const minusDrinks = (indexOfItem) => {
    var newDrinks = selectedDrinks;

    if (newDrinks[indexOfItem].count > 1)
      newDrinks[indexOfItem].count = newDrinks[indexOfItem].count - 1;

    setSelectedDrinks(newDrinks);
    setUpdate(update + 1);
  };

  const addDrinks = () => {
    var newDrinks = selectedDrinks;

    var newDrink = {
      itemId: 0,
      count: 1,
      change: false,
    };
    newDrinks.push(newDrink);

    setSelectedDrinks(newDrinks);
    setUpdate(update + 1);
  };

  const next = () => {
    setStep(step + 1);
  };

  const previous = () => {
    setStep(step - 1);
  };

  const cancel = () => {
    clickClose();
    setStep(1);
  };

  const goToStepOne = () => {
    setStep(1);
  };

  const plusShirts = () => {
    setShirtCount(shirtCount + 1);
    setUpdate(update + 1);
  };

  const minusShirts = () => {
    var newCount = shirtCount;

    if (newCount > 1) newCount = newCount - 1;

    setShirtCount(newCount);
    setUpdate(update + 1);
  };

  const plusCups = () => {
    setCupCount(cupCount + 1);
    setUpdate(update + 1);
  };

  const minusCups = () => {
    var newCount = cupCount;

    if (newCount > 1) newCount = newCount - 1;

    setCupCount(newCount);
    setUpdate(update + 1);
  };

  return (
    <Modal size="lg" show={visibleModal} onHide={clickClose} centered>
      {step === 1 && (
        <Modal.Body className="modalBody">
          <div className="title">Step 1: Choose Course Meal</div>
          <img src={data?.image} alt={data?.item} className="photo" />
          {selectedCourseMeals.map((item, index) => {
            var indexOfItem = index;
            return (
              <div>
                <div className="itemRow">
                  <div className="itemSelector">
                    <div style={modalItemDivStyle}>
                      {foodData[item.itemId].item}
                    </div>
                    <button
                      className="whiteButton"
                      onClick={() => onChangeCourseMeals(indexOfItem)}
                    >
                      change
                    </button>
                  </div>
                  <div className="itemCount">
                    <div style={modalItemCountStyle}>{item.count}</div>
                    <button
                      className="plusButton"
                      onClick={() => plusCourse(indexOfItem)}
                    >
                      +
                    </button>
                    <button
                      className="minusButton"
                      onClick={() => minusCourse(indexOfItem)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="dropdownFood">
                  {item.change &&
                    foodData.map((item) => {
                      return (
                        <div
                          className="itemSelectorFood"
                          style={modalItemDivStyle}
                          onClick={() =>
                            selectNewCourseMeal(indexOfItem, item.id)
                          }
                        >
                          {item.item}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
          <div className="addMore" onClick={() => addCourseMeal()}>
            + add more course meal
          </div>
          <div className="buttons">
            <button className="nextButton" onClick={() => next()}>
              next
            </button>
            <button className="cancelButton" onClick={() => cancel()}>
              cancel
            </button>
          </div>
        </Modal.Body>
      )}
      {step === 2 && (
        <Modal.Body className="modalBody">
          <div className="title">Step 2: Choose Apetizer</div>
          <img src={cakeImage} alt="cake" className="photo" />
          {selectedApetizers.map((item, index) => {
            var indexOfItem = index;
            return (
              <div>
                <div className="itemRow">
                  <div className="itemSelector">
                    <div style={modalItemDivStyle}>
                      {apetizerData[item.itemId].item}
                    </div>
                    <button
                      className="whiteButton"
                      onClick={() => onChangeApetizers(indexOfItem)}
                    >
                      change
                    </button>
                  </div>
                  <div className="itemCount">
                    <div style={modalItemCountStyle}>{item.count}</div>
                    <button
                      className="plusButton"
                      onClick={() => plusApetizers(indexOfItem)}
                    >
                      +
                    </button>
                    <button
                      className="minusButton"
                      onClick={() => minusApetizers(indexOfItem)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="dropdownFood">
                  {item.change &&
                    apetizerData.map((item) => {
                      return (
                        <div
                          className="itemSelectorFood"
                          style={modalItemDivStyle}
                          onClick={() =>
                            selectNewApetizers(indexOfItem, item.id)
                          }
                        >
                          {item.item}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
          <div className="addMore" onClick={() => addApetizers()}>
            + add more apetizer
          </div>
          <div className="buttons">
            <button className="nextButton" onClick={() => next()}>
              next
            </button>
            <button className="cancelButton" onClick={() => previous()}>
              previous
            </button>
            <button className="cancelButton" onClick={() => cancel()}>
              cancel
            </button>
          </div>
        </Modal.Body>
      )}
      {step === 3 && (
        <Modal.Body className="modalBody">
          <div className="title">Step 3: Choose Drinks</div>
          <img src={colaImage} alt="cola" className="photo" />
          {selectedDrinks.map((item, index) => {
            var indexOfItem = index;
            return (
              <div>
                <div className="itemRow">
                  <div className="itemSelector">
                    <div style={modalItemDivStyle}>
                      {drinkData[item.itemId].item}
                    </div>
                    <button
                      className="whiteButton"
                      onClick={() => onChangeDrinks(indexOfItem)}
                    >
                      change
                    </button>
                  </div>
                  <div className="itemCount">
                    <div style={modalItemCountStyle}>{item.count}</div>
                    <button
                      className="plusButton"
                      onClick={() => plusDrinks(indexOfItem)}
                    >
                      +
                    </button>
                    <button
                      className="minusButton"
                      onClick={() => minusDrinks(indexOfItem)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="dropdownFood">
                  {item.change &&
                    drinkData.map((item) => {
                      return (
                        <div
                          style={modalItemDivStyle}
                          className="itemSelectorFood"
                          onClick={() => selectNewDrinks(indexOfItem, item.id)}
                        >
                          {item.item}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
          <div className="addMore" onClick={() => addDrinks()}>
            + add more drinks
          </div>
          <div className="buttons">
            <button className="nextButton" onClick={() => next()}>
              next
            </button>
            <button className="cancelButton" onClick={() => previous()}>
              previous
            </button>
            <button className="cancelButton" onClick={() => cancel()}>
              cancel
            </button>
          </div>
        </Modal.Body>
      )}
      {step === 4 && (
        <Modal.Body className="modalBody">
          <div className="title">Step 4: Choose Suuveniers</div>
          <div className="suvRow">
            <img src={tshirtImage} alt="shirt" className="photomini" />
            <div>
              <div className="rowLabel">
                <div style={{ fontSize: "22px" }}>T-Shirt</div>
                <div style={{ fontSize: "25px" }}>25$</div>
              </div>
              <div className="rowLabel">
                <div className="addMore">+ add more t-shirts</div>
                <div className="itemCount">
                  <div style={modalItemCountStyle}>{shirtCount}</div>
                  <button className="plusButton" onClick={() => plusShirts()}>
                    +
                  </button>
                  <button className="minusButton" onClick={() => minusShirts()}>
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="suvRow">
            <img src={cupImage} alt="cup" className="photomini" />
            <div>
              <div className="rowLabel">
                <div style={{ fontSize: "22px" }}>
                  Lapland-Style Cup <n />
                  Homemade
                </div>
                <div style={{ fontSize: "25px" }}>18$</div>
              </div>
              <div className="rowLabel">
                <div className="addMore">+ add more cups</div>
                <div className="itemCount">
                  <div style={modalItemCountStyle}>{cupCount}</div>
                  <button className="plusButton" onClick={() => plusCups()}>
                    +
                  </button>
                  <button className="minusButton" onClick={() => minusCups()}>
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button className="nextButton" onClick={() => next()}>
              next
            </button>
            <button className="cancelButton" onClick={() => previous()}>
              previous
            </button>
            <button className="cancelButton" onClick={() => cancel()}>
              cancel
            </button>
          </div>
        </Modal.Body>
      )}
      {step === 5 && (
        <Modal.Body className="modalBody">
          <div className="title">Step 5: Final Steps</div>
          <div className="suvRow">
            <button className="payButton" onClick={() => cancel()}>
              Go to payment
            </button>
          </div>
          <div className="suvRow">
            <button className="payButton" onClick={() => goToStepOne()}>
              modify order
            </button>
          </div>
          <div className="buttons">
            <button className="nextButton" onClick={() => goToStepOne()}>
              keep ordering
            </button>
            <button className="cancelButton" onClick={() => previous()}>
              previous
            </button>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default ModalConfirm;
