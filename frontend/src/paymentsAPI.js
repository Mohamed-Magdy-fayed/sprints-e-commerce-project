const token = `Bearer ${JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token}`

const createPaymentIntent = async options => {
    return window
        .fetch(`/payments/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
            },
            body: JSON.stringify(options)
            // make sure to add amount and currency
        })
        .then(async res => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        })
        .then(data => {
            if (!data || data.error) {
                console.log("API error:", { data });
                throw new Error("PaymentIntent API Error");
            } else {
                return data.client_secret;
            }
        });
};

const getPublicStripeKey = async options => {
    return window
        .fetch(`/payments/public-key`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
            }
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        })
        .then(data => {
            if (!data || data.error) {
                console.log("API error:", { data });
                throw Error("API Error");
            } else {
                return data.publishableKey;
            }
        });
};

const api = {
    createPaymentIntent,
    getPublicStripeKey: getPublicStripeKey,
};

export default api;
