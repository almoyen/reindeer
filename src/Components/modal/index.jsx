import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import "./index.css";
//import burgImage from '../../Images/v290_52.png';
//import cakeImage from '../../Images/cake.jpg';
//import colaImage from '../../Images/cocacola.jpg';
//import tshirtImage from '../../Images/tshirt.jpg';
//import cupImage from '../../Images/cup.jpg';

const ModalConfirm = (props) => {

    const [step, setStep] = useState(1); //1, 2, 3, 4 and 5
    const [title, setTitle] = useState();
    const [count, setCount] = useState(1);
    const [change, setChange] = useState(false);

    const {
        textModal,
        data,
        modalBack,
        visibleModal,
        clickClose,
        clickConfirm,
        itemList
    } = props;

    const onChange = () => {
        setChange(!change)
        console.log(itemList)
    }

    const plus = () => {
        var newCount = count + 1;
        setCount(newCount)
    }

    const minus = () => {
        var newCount

        if (count > 1) newCount = count - 1;
        else newCount = count;

        setCount(newCount)
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

    const { id, image, item, ingredient } = data;

    return (
        <Modal size="lg" show={visibleModal} onHide={clickClose} centered >
            {step == 1 && <Modal.Body className="modalBody">
                <div className="title">
                    Step 1: Choose Course Meal
                </div>
                <img src={burgImage} className="photo" />
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