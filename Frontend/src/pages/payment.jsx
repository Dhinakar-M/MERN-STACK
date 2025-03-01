import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Payment = () => {
    const { orderId } = useParams(); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false); 
    useEffect(() => {
        if (!orderId) {
            alert("No Order ID found, redirecting...");
            navigate("/");
        }
    }, [orderId, navigate]);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:4000/api/order/pay", { orderId });

            if (response.data.success) {
                setPaymentSuccess(true); 
                alert("Payment Successful! Your order has been placed.");
            } else {
                alert("Payment Failed: " + response.data.message);
            }
        } catch (error) {
            console.log("Error making payment:", error);
            alert("Error processing payment.");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Payment Page</h2>
            <p>Order ID: {orderId}</p>
            
            {paymentSuccess ? (
                <h1>Your order is placed and it will be delivered soon</h1> 
            ) : (
                <>
                    <input type="email" placeholder="Email" required /><br></br>
                    <input type="text" placeholder="Card Number" required /><br></br>
                    <input type="password" placeholder="PIN" required /><br></br>
                    <button onClick={handlePayment} disabled={loading}>
                        {loading ? "Processing..." : "Pay"}
                    </button>
                </>
            )}
        </div>
    );
};

export default Payment;
