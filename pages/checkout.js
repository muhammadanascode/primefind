import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Checkout = ({subtotal}) => {
  const [pp_Amount, setPp_Amount] = useState(subtotal);
  const [pp_BillReference, setPp_BillReference] = useState('billRef');
  const [pp_Description, setPp_Description] = useState('A product purchased by a user');
  const [pp_Language, setPp_Language] = useState('EN');
  const [pp_MerchantID] = useState('MC58705');
  const [pp_Password] = useState('v49yw9v36v');
  const [pp_ReturnURL] = useState('https://stackoverflow.com/');
  const [pp_SubMerchantID, setPp_SubMerchantID] = useState('');
  const [pp_TxnCurrency] = useState('PKR');
  const [pp_TxnDateTime, setPp_TxnDateTime] = useState('20230807210620');
  const [pp_TxnExpiryDateTime, setPp_TxnExpiryDateTime] = useState('20230808210620');
  const [pp_TxnRefNo, setPp_TxnRefNo] = useState('T20230807210620');
  const [pp_TxnType, setPp_TxnType] = useState('');
  const [pp_Version] = useState('1.1');
  const [ppmpf_1] = useState('1');
  const [ppmpf_2] = useState('2');
  const [ppmpf_3] = useState('3');
  const [ppmpf_4] = useState('4');
  const [ppmpf_5] = useState('5');
  const [salt] = useState('txwd00vx86');
  const [pp_SecureHash, setPp_SecureHash] = useState('0123456789');
  const [hashValuesString, setHashValuesString] = useState('');

  const CalculateHash = () => {
    let hashString = '';

    hashString += salt + '&';
    if (pp_Amount !== '') {
      hashString += pp_Amount + '&';
    }
    if (pp_BillReference !== '') {
      hashString += pp_BillReference + '&';
    }
    if (pp_Description !== '') {
      hashString += pp_Description + '&';
    }
    if (pp_Language !== '') {
      hashString += pp_Language + '&';
    }
    if (pp_MerchantID !== '') {
      hashString += pp_MerchantID + '&';
    }
    if (pp_Password !== '') {
      hashString += pp_Password + '&';
    }
    if (pp_ReturnURL !== '') {
      hashString += pp_ReturnURL + '&';
    }
    if (pp_SubMerchantID !== '') {
      hashString += pp_SubMerchantID + '&';
    }
    if (pp_TxnCurrency !== '') {
      hashString += pp_TxnCurrency + '&';
    }
    if (pp_TxnDateTime !== '') {
      hashString += pp_TxnDateTime + '&';
    }
    if (pp_TxnExpiryDateTime !== '') {
      hashString += pp_TxnExpiryDateTime + '&';
    }
    if (pp_TxnRefNo !== '') {
      hashString += pp_TxnRefNo + '&';
    }
    if (pp_TxnType !== '') {
      hashString += pp_TxnType + '&';
    }
    if (pp_Version !== '') {
      hashString += pp_Version + '&';
    }
    if (ppmpf_1 !== '') {
      hashString += ppmpf_1 + '&';
    }
    if (ppmpf_2 !== '') {
      hashString += ppmpf_2 + '&';
    }
    if (ppmpf_3 !== '') {
      hashString += ppmpf_3 + '&';
    }
    if (ppmpf_4 !== '') {
      hashString += ppmpf_4 + '&';
    }
    if (ppmpf_5 !== '') {
      hashString += ppmpf_5 + '&';
    }

    hashString = hashString.slice(0, -1);
    setHashValuesString(hashString);

    const hash = CryptoJS.HmacSHA256(hashString, salt).toString();
    setPp_SecureHash(hash);
    console.log('string: ' + hashString);
    console.log('hash: ' + hash);
  };

  const submitForm = () => {
    CalculateHash();
    document.jsform.submit();
  };

  return (
    <>
      <h3>JazzCash HTTP POST (Page Redirection) Testing</h3>
      <div className="jsformWrapper">
        <form name="jsform" method="post" action="https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/">
          <div className="formFielWrapper">
            <label className="active">pp_Version: </label>
            <input type="text" name="pp_Version" value="1.1" readOnly={true} />
          </div>

          <div className="formFielWrapper">
            <label className="">pp_TxnType: </label>
            <input type="text" name="pp_TxnType" value={pp_TxnType} onChange={(e) => setPp_TxnType(e.target.value)} />
          </div>

          {/* Additional form fields can be added here */}
          {/* For Card Tokenization Version should be 2.0 */}

          <div className="formFielWrapper">
            <label className="active">pp_MerchantID: </label>
            <input type="text" name="pp_MerchantID" value={pp_MerchantID} readOnly={true} />
          </div>

          {/* Rest of the form fields go here */}

          <div className="formFielWrapper">
            <label className="active">pp_SecureHash: </label>
            <input type="text" name="pp_SecureHash" value={pp_SecureHash} />
          </div>

          <div className="formFielWrapper">
            <label className="active">ppmpf 1: </label>
            <input type="text" name="ppmpf_1" value={ppmpf_1} readOnly={true} />
          </div>

          {/* Rest of the ppmpf fields go here */}

          <button type="button" onClick={submitForm}>Submit</button>
        </form>

        <input type="hidden" name="salt" value={salt} />
        <br />
        <br />
        <div className="formFielWrapper" style={{ marginBottom: '2rem' }}>
          <label className="">Hash values string: </label>
          <input type="text" id="hashValuesString" value={hashValuesString} readOnly={true} />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Checkout;
