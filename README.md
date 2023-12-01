# BM-Payments-SDK
This SDK provides a set of functions to interact with the DevFundMe API. This documentation outlines the available functions and their usage.

## Installation

Install the SDK in your project using npm:

npm install bm-payments-sdk

Usage

Initialize the SDK
const devSDK = require('bm-payments-sdk');
const apiToken = 'YOUR_API_TOKEN';

Function

generatePaylink(apiToken, amount, note, returnUrl, metaData, payorName, payorEmail)
Generates a paylink for a transaction.

    Parameters:
        apiToken: the token of the api
        amount (Number): The transaction amount.
        note (String): Information about the transaction.
        return_Url [String(url formatted)]: The URL to redirect to after the transaction.
        meta_Data (text/json): Additional metadata for the transaction.
        payor_Name (String): Name of the payer.
        payor_Email [String(email formatted)]: Email of the payer.

    Example:

    try {
        const generate = devSDK.generatePaylink(apiToken, 100, 'Transaction note', 'https://example.com/return', {}, 'John Doe', 'john@example.com');
        console.log('Generated Paylink:', paylink);
    } catch (error) {
        console.error('Error generating Paylink:', error.message);
    }

##getPaylinks()
Retrieves a list of all generated paylinks.

    Example:

    try {
        const paylinks = devSDK.getPaylinks();
        console.log('Paylinks:', paylinks);
    } catch (error) {
        console.error('Error getting Paylinks:', error.message);
    }

Error Handling
The SDK throws errors in case of unsuccessful API requests and invalid parameters in the function. 
