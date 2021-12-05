import React, { isValidElement, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import "./index.css";
import burgImage from '../../Images/v290_52.png';
import cakeImage from '../../Images/cake.jpg';
import colaImage from '../../Images/cocacola.jpg';
import tshirtImage from '../../Images/tshirt.jpg';
import cupImage from '../../Images/cup.jpg';

const ModalConfirm = (props) => {

    const [step, setStep] = useState(1); //1, 2, 3, 4 and 5
    const [update, setUpdate] = useState(0);
    const [count, setCount] = useState(1);
    const [change, setChange] = useState(false);
    const [selectedFoodItem, setSelectedFoodItem] = useState(0);
    const [selectedFoodItemCount, setSelectedFoodItemCount] = useState(1);
    const [reRend, setReRend] = useState(true);
    const [selectedCourseMeals, setSelectedCourseMeals] = useState([{
        itemId: 1,
        count: 1,
        change: false,
    }]);

    const foodData = [
        {
            "id": "0",
            "item": "Turkish Kebab",
            "ingredient": "Rankalainen,Kana, Salati",
            "available": true,
            "country": "Finland",
            "discount": false,
            "price": "30",
            "image": "/api/attachment/foods/1.jpg",
            "foodChoices": ["Non-Veg"]
        },
        {
            "id": "1",
            "item": "Kerrosateria",
            "ingredient": "Hampurilainen,Raskalaiset perunat",
            "available": true,
            "country": "Finland",
            "discount": false,
            "price": "32",

            "image": "/api/attachment/foods/2.jpg",

            "foodChoices": ["Non-Veg"]
        },
        {
            "id": "2",
            "item": "Kana-ateria",
            "ingredient": "Hamprilainen, Ranskalaiset perunat",
            "available": true,
            "country": "Finland",
            "discount": false,
            "price": "32",

            "image": "/api/attachment/foods/3.jpg",
            "foodChoices": ["Veg"]
        },
        {
            "id": "3",
            "item": "item04",
            "ingredient": "garlic, salad, Chicken, Chilli",
            "available": true,
            "country": "Finland",
            "discount": false,
            "price": "32",

            "image": "/api/attachment/foods/4.jpg",
            "foodChoices": ["Lacto Veg"]
        },
        {
            "id": "4",
            "item": "item05",
            "ingredient": "garlic, salad, Chicken,Chilli",
            "available": true,
            "country": "Finland",
            "discount": false,
            "price": "32",

            "image": "/api/attachment/foods/5.jpg",
            "foodChoices": ["Non-Veg"]
        },
        {
            "id": "5",
            "item": "item06",
            "ingredient": "garlic, salad, Chicken, Chilli",
            "available": true,
            "country": "Finland",
            "discount": false,
            "price": "12",

            "image": "/api/attachment/foods/6.jpg",
            "foodChoices": ["Lactose Free"]
        },
        {
            "id": "6",
            "item": "item07",
            "ingredient": "garlic, salad, Chicken, Chilli",
            "available": true,
            "country": "Finland",
            "discount": false,
            "image": "",
            "price": "22",

            "foodChoices": ["Gluton free"]
        },
        {
            "id": "7",
            "item": "item08",
            "ingredient": "garlic, salad, Chicken, Chilli",
            "available": true,
            "country": "Finland",
            "discount": false,
            "image": "",
            "foodChoices": ["Gluton free"]
        }
    ]

    const {
        textModal,
        data,
        modalBack,
        visibleModal,
        clickClose,
        clickConfirm,
        itemList
    } = props;

    const onChange = (indexOfItem) => {
        var newCourseMeals = selectedCourseMeals;

        newCourseMeals[indexOfItem].change = true;
        setSelectedCourseMeals(newCourseMeals)
        setUpdate(update + 1);

    }

    const selectNewFood = (indexOfItem, id) => {
        var newCourseMeals = selectedCourseMeals;

        newCourseMeals[indexOfItem].itemId = id;
        newCourseMeals[indexOfItem].count = 1;
        newCourseMeals[indexOfItem].change = false;
        setSelectedCourseMeals(newCourseMeals)
        setUpdate(update + 1);
    }

    const plus = (indexOfItem) => {
        var newCourseMeals = selectedCourseMeals;
        newCourseMeals[indexOfItem].count = newCourseMeals[indexOfItem].count + 1
        setSelectedCourseMeals(newCourseMeals);
        setUpdate(update + 1);
    }

    const minus = (indexOfItem) => {
        var newCourseMeals = selectedCourseMeals;

        if (newCourseMeals[indexOfItem].count > 1) newCourseMeals[indexOfItem].count = newCourseMeals[indexOfItem].count - 1;

        setSelectedCourseMeals(newCourseMeals);
        setUpdate(update + 1);
    }

    const next = () => {
        setStep(step + 1);
    }

    const previous = () => {
        setStep(step - 1);
    }

    const cancel = () => {
        clickClose();
        setStep(1);
    }

    const addCourseMeal = () => {
        var newCourseMeals = selectedCourseMeals;
        var newCourse = {
            itemId: 1,
            count: 1,
            change: false,
        }
        newCourseMeals.push(newCourse)

        setSelectedCourseMeals(newCourseMeals)
        setUpdate(update + 1);
    }

    const { id, image, item, ingredient } = data;

    return (
        <Modal size="lg" show={visibleModal} onHide={clickClose} centered >
            {step == 1 && <Modal.Body className="modalBody">
                <div className="title">
                    Step 1: Choose Course Meal
                </div>
                <img src={burgImage} className="photo" />
                {
                    selectedCourseMeals.map((item, index) => {
                        var indexOfItem = index
                        return <div>
                            <div className="itemRow">
                                <div className="itemSelector">
                                    <div style={{ fontSize: "20px", paddingLeft: "20px" }}>
                                        {foodData[item.itemId].item}
                                    </div>
                                    <button className="whiteButton" onClick={() => onChange(indexOfItem)}>
                                        change
                                    </button>
                                </div>
                                <div className="itemCount">
                                    <div style={{ fontSize: "20px", paddingRight: "20px", paddingLeft: "20px" }}>{item.count}</div>
                                    <button className="plusButton" onClick={() => plus(indexOfItem)}>
                                        +
                                    </button>
                                    <button className="minusButton" onClick={() => minus(indexOfItem)}>
                                        -
                                    </button>
                                </div>
                            </div>
                            <div className="dropdownFood">
                                {item.change && foodData.map(item => {
                                    return <div
                                        className="itemSelectorFood"
                                        style={{ fontSize: "20px", paddingLeft: "20px" }}
                                        onClick={() => selectNewFood(indexOfItem, item.id)}
                                    >
                                        {item.item}
                                    </div>
                                })}
                            </div>
                        </div>
                    })
                }

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
            </Modal.Body>}
            {step == 2 && <Modal.Body className="modalBody">
                <div className="title">
                    Step 2: Choose Apetizer
                </div>
                <img src={cakeImage} className="photo" />
                <div className="itemRow">
                    <div className="itemSelector">
                        <div style={{ fontSize: "20px", paddingLeft: "20px" }}>
                            {item}
                        </div>
                        <button className="whiteButton" onClick={() => onChange()}>
                            change
                        </button>
                    </div>
                    <div className="itemCount">
                        <div style={{ fontSize: "20px", paddingRight: "20px", paddingLeft: "20px" }}>{count}</div>
                        <button className="plusButton" onClick={() => plus()}>
                            +
                        </button>
                        <button className="minusButton" onClick={() => minus()}>
                            -
                        </button>
                    </div>
                </div>
                <div className="addMore">
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
            </Modal.Body>}
            {step == 3 && <Modal.Body className="modalBody">
                <div className="title">
                    Step 3: Choose Drinks
                </div>
                <img src={colaImage} className="photo" />
                <div className="itemRow">
                    <div className="itemSelector">
                        <div style={{ fontSize: "20px", paddingLeft: "20px" }}>
                            {item}
                        </div>
                        <button className="whiteButton" onClick={() => onChange()}>
                            change
                        </button>
                    </div>
                    <div className="itemCount">
                        <div style={{ fontSize: "20px", paddingRight: "20px", paddingLeft: "20px" }}>{count}</div>
                        <button className="plusButton" onClick={() => plus()}>
                            +
                        </button>
                        <button className="minusButton" onClick={() => minus()}>
                            -
                        </button>
                    </div>
                </div>
                <div className="addMore">
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
            </Modal.Body>}
            {step == 4 && <Modal.Body className="modalBody">
                <div className="title">
                    Step 4: Choose Suuveniers
                </div>
                <div className="suvRow">
                    <img src={tshirtImage} className="photomini" />
                    <div>
                        <div className="rowLabel">
                            <div style={{ fontSize: "22px" }}>
                                T-Shirt
                            </div>
                            <div style={{ fontSize: "25px" }}>
                                25$
                            </div>
                        </div>
                        <div className="rowLabel">
                            <div className="addMore">
                                + add more t-shirts
                            </div>
                            <div className="itemCount">
                                <div style={{ fontSize: "20px", paddingRight: "20px", paddingLeft: "20px" }}>{count}</div>
                                <button className="plusButton" onClick={() => plus()}>
                                    +
                                </button>
                                <button className="minusButton" onClick={() => minus()}>
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="suvRow">
                    <img src={cupImage} className="photomini" />
                    <div>
                        <div className="rowLabel">
                            <div style={{ fontSize: "22px" }}>
                                Lapland-Style Cup <n />
                                Homemade
                            </div>
                            <div style={{ fontSize: "25px" }}>
                                18$
                            </div>
                        </div>
                        <div className="rowLabel">
                            <div className="addMore">
                                + add more cups
                            </div>
                            <div className="itemCount">
                                <div style={{ fontSize: "20px", paddingRight: "20px", paddingLeft: "20px" }}>{count}</div>
                                <button className="plusButton" onClick={() => plus()}>
                                    +
                                </button>
                                <button className="minusButton" onClick={() => minus()}>
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
            </Modal.Body>}
            {step == 5 && <Modal.Body className="modalBody">
                <div className="title">
                    Step 5: Final Steps
                </div>
                <div className="suvRow">
                    <button className="payButton" onClick={() => cancel()}>
                        Go to payment
                    </button>
                </div>
                <div className="suvRow">
                    <button className="payButton" onClick={() => cancel()}>
                        modify order
                    </button>
                </div>
                <div className="buttons">
                    <button className="nextButton" onClick={() => cancel()}>
                        keep ordering
                    </button>
                    <button className="cancelButton" onClick={() => previous()}>
                        previous
                    </button>
                </div>
            </Modal.Body>}
        </Modal>
    )
}

export default ModalConfirm;