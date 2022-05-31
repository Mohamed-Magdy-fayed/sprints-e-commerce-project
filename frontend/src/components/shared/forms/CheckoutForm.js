import { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../../../paymentsAPI";
import StoreContext from "../../../context/store/StoreContext";
import { addItemToUser, addOrderAction, deleteItemFromUser } from "../../../context/store/StoreActions";

export default function CheckoutForm({ total, curr, coupon, products, orderTotal }) {

  const { showToast, store, hideModal } = useContext(StoreContext)

  const [orderID, setOrderID] = useState(0);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState('null');
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Step 1: Fetch product details such as amount and currency from
    // API to make sure it can't be tampered with in the client.
    setAmount(total);
    setCurrency(curr);

    // Step 2: Create PaymentIntent over Stripe API
    api
      .createPaymentIntent({
        payment_method_types: ["card"],
        amount: parseInt(total),
        currency: curr,
      })
      .then(clientSecret => {
        setClientSecret(clientSecret);
        console.log(clientSecret);
      })
      .catch(err => {
        showToast(err.message, false);
      });
  }, []);

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const data = {
      userID: store.auth.user._id,
      paymentMethod: 'credit',
      transactionID: null,
      coupon: coupon && coupon._id,
      status: 'pending',
      products,
      totalValue: orderTotal
    }

    addOrderAction(data).then((res) => {
      if (res) {
        setOrderID(res._id)
        addItemToUser(data.userID, 'orders', res._id)
        products.map(id => deleteItemFromUser(data.userID, 'cartItems', id.productID))
        showToast(`thanks for your purchase your order status is currently ${res.status}`, true)
      } else {
        setSucceeded(false)
        showToast(`an error occured please try again later`)
        return
      }
    })

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value
        }
      }
    });

    if (payload.error) {
      showToast(`Payment failed: ${payload.error.message}`, false);
      setProcessing(false);
    } else {
      setSucceeded(true)
      setMetadata(payload.paymentIntent);
      showToast(`your transaction id: ${payload.paymentIntent.id}`, true)
      hideModal()
      setProcessing(false);
    }
  };

  const renderSuccess = () => {
    return (
      <div className="text-center p-5 text-green-600 bg-slate-100 rounded-md mt-4">
        <h1>Your test payment of {metadata.amount} {metadata.currency.toLocaleUpperCase()} has succeeded</h1>
        <h1>Your order is submitted with the ID {orderID}</h1>
      </div>
    );
  };

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      }
    };

    return (
      <form className="p-3 flex flex-col gap-3" onSubmit={handleSubmit}>
        <h1 className="text-yellow-700 text-3xl font-medium">
          {currency && currency.toLocaleUpperCase()}{" "}
          {amount && amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2
          })}{" "}
        </h1>
        <h4 className="text-sm font-medium text-red-700">Please don't submit any real cards data</h4>

        <div className="flex flex-col gap-5">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name on card"
              autoComplete="cardholder"
              className="!ring-0 rounded-md border-2 border-slate-400 w-full p-3 focus:border-slate-400"
            />
          </div>

          <div>
            <CardElement
              className="rounded-md border-2 border-slate-400 w-full p-3"
              options={options}
            />
          </div>
        </div>
        <button
          className="flex justify-center items-center w-full px-10 py-3  font-medium text-white bg-[rgb(253,128,36)] border-2 border-[rgb(253,128,36)] rounded-full outline-none transition-all duration-[350ms] ease-in-out hover:bg-white hover:text-black  
          focus:bg-white focus:text-black uppercase  shadow item-center  focus:outline-none"
          disabled={processing || !clientSecret || !stripe}
        >
          {processing ? "Processing…" : "Pay"}
        </button>
      </form>
    );
  };

  return (
    <div>
      {succeeded ? renderSuccess() : renderForm()}
    </div>
  );
}
