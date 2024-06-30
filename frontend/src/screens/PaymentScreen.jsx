import { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from '../components/FormContainer';
import CheckOutSteps from "../components/CheckOutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = ()=> {
    const [paymentMethod,setPaymentMethod] = useState("Paypal");
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const Cart = useSelector((state) => state.cart);
    const {shippingAddress} = Cart;

    useEffect(()=>{
        if(!shippingAddress)
            {
                Navigate('/shipping');
            }
    },[shippingAddress,Navigate]);

    const SubmitHandler = (e)=> {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        Navigate('/placeorder')
    }
    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3/>
            <h1>Payment Method</h1>

            <Form onSubmit={SubmitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                    <Form.Check
                        type="radio"
                        className="my-2"
                        label="PayPal or credit card"
                        id="PayPal"
                        name="paymentMethod"
                        value={paymentMethod}
                        checked
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                    >     
                    </Form.Check>
                </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;