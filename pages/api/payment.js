import axios from "axios";
import CryptoJS from "crypto-js";

export default async (req, res) => {
  try {
    const jazzCashAPIBaseURL =
      "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/";
    const {
      subtotal,
      description,
      time,
    } = req.body;

    //API CREDENTIALS
    const jazzCashAuthData = {
      UserName: `${process.env.MERCHANT_ID}`,
      Password: `${process.env.PASSWORD}`,
    };

    const expiryDate = String(Number(time) + 10000);
    const TxnRef = "T"+time

    // Calculating the secure hash by using data
    const pp_SecureHashData =  `${process.env.JAZZCASH_INTEGRITY_SALT}&
    ${subtotal}& 
    TBANK&
    billRef&
    ${description}&
    EN&
    ${process.env.MERCHANT_ID}&
    ${process.env.PASSWORD}&
    "RETL"&
    ${process.env.NEXT_PUBLIC_HOST}&
    PKR&
    ${time}&
    ${expiryDate}&
    ${TxnRef}&
    MWALLET&
    1.1&
    1&
    2&
    3&
    4&
    5`;

    const pp_SecureHash = CryptoJS.HmacSHA256(pp_SecureHashData,process.env.JAZZCASH_INTEGRITY_SALT).toString(CryptoJS.enc.Hex);

    console.log(pp_SecureHash);

    // Prepare card transaction data
    const cardTransactionData = {
      //This is a single transaction to authorize payment and transfer funds from payer's account to merchant’s account.
      pp_Version: "1.1",
      pp_TxnType: "MWALLET",
      pp_Language: "EN",
      pp_SubMechantID: "",
      pp_BankID: "TBANK",
      pp_ProductID: "RETL",
      pp_ReturnURL: `${process.env.NEXT_PUBLIC_HOST}`,
      pp_TxnRefNo: TxnRef,
      pp_MerchantID: `${process.env.MERCHANT_ID}`,
      pp_Password: `${process.env.PASSWORD}`,
      pp_Amount: subtotal,
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime: time,
      pp_TxnExpiryDateTime: expiryDate,
      pp_BillReference: "billRef",
      pp_Description: description,
      pp_SecureHash: pp_SecureHash,
      ppmpf_1: 1,
      ppmpf_1: 2,
      ppmpf_1: 3,
      ppmpf_1: 4,
      ppmpf_1: 5,
    };

    // Make a POST request to JazzCash API to process the card transaction
    const cardPaymentResponse = await axios.post(
      `${jazzCashAPIBaseURL}`,
      cardTransactionData
    );

    // Return the JazzCash response to the frontend
    res.json(cardPaymentResponse.data);
  } catch (error) {
    console.error("Error occurred during card payment:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};
