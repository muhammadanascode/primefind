import axios from "axios";
import CryptoJS from "crypto-js";

export default async (req, res) => {
  try {
    const jazzCashAPIBaseURL =
      "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Purchase";
    const {
      cardDetails,
      subtotal,
      orderID,
      description,
      email,
      mobileNumber,
      time,
    } = req.body;

    // Authenticating with JazzCash API using credentials
    // Need to obtain and use actual JazzCash API credentials (Merchant ID, Secret Key)
    const jazzCashAuthData = {
      UserName: `${process.env.MERCHANT_ID}`,
      Password: `${process.env.PASSWORD}`,
    };
    // const authResponse = await axios.post(
    //   `${jazzCashAPIBaseURL}/InitiateAuthentication`,
    //   jazzCashAuthData
    // );
    // const accessToken = authResponse.data.access_token;

    // Calculate the pp_SecureHash
    const pp_SecureHashData = `${subtotal}&billRef&${cardDetails.cardNumber}&01/39&${cardDetails.cvc}&${description}&RECURRING&EN&${process.env.MERCHANT_ID}&${mobileNumber}&${process.env.NEXT_PUBLIC_HOST}&PKR&${time}&=20230920161116&${orderID}&1.1`;

    const app = process.env.PASSWORD + pp_SecureHashData
    const pp_SecureHash = CryptoJS.HmacSHA256(app, process.env.PASSWORD).toString(CryptoJS.enc.Hex);

    console.log(pp_SecureHash);

    // Prepare card transaction data
    const cardTransactionData = {
      //This is a single transaction to authorize payment and transfer funds from payer's account to merchant’s account.
      pp_Version: "1.1",
      pp_TxnType: "MPAY",
      pp_Language: "EN",
      pp_ReturnURL: `${process.env.NEXT_PUBLIC_HOST}`,
      pp_TxnRefNo: orderID,
      pp_MerchantID: `${process.env.MERCHANT_ID}`,
      pp_Password: `${process.env.PASSWORD}`,
      pp_Amount: subtotal,
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime: time,
      pp_TxnExpiryDateTime: "20230920161116",
      pp_BillReference: "billRef",
      pp_Description: description,
      pp_CustomerCardNumber: cardDetails.cardNumber,
      pp_CustomerCardExpiry: "01/39",
      pp_CustomerCardCvv: cardDetails.cvc,
      pp_SecureHash: "D6679851DFD198079CE4D70E7B7964D2715883E3E1AB57857682C785B6B67182", // Use the calculated pp_SecureHash here
      ppmpf_1: mobileNumber,
      pp_Frequency: "RECURRING",
    };

    // Make a POST request to JazzCash API to process the card transaction
    const cardPaymentResponse = await axios.post(
      `${jazzCashAPIBaseURL}/PAY`,
      cardTransactionData
      // {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // }
    );

    // Return the JazzCash response to the frontend
    res.json(cardPaymentResponse.data);
  } catch (error) {
    console.error("Error occurred during card payment:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};
