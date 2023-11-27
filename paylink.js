const axios = require('axios');

function generatePaylink(apiToken, amount, note, returnUrl, metaData, payorName, payorEmail) {
    const url = 'https://devfundme.com/api/pms/generate_paylink/';
    const headers = {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
    };
    const data = {
        amount: String(amount),
        note: note || '',
        return_url: returnUrl || '',
        meta_data: metaData || null,
        payor_name: payorName || '',
        payor_email: payorEmail || '',
    };

    return axios.post(url, data, { headers })
        .then(response => response.data)
        .catch(error => handleRequestError(error));
}

function getPaylinks(apiToken) {
    const url = 'https://devfundme.com/api/pms/paylink/';
    const headers = {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
    };

    return axios.get(url, { headers })
        .then(response => response.data)
        .catch(error => handleRequestError(error));
}

function handleRequestError(error) {
    if (error.response) {
        throw new Error(`Request failed with status ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
        throw new Error('Request made but no response received');
    } else {
        throw new Error(`Error: ${error.message}`);
    }
}

// pati sa se pati pou teste metod nou gen anle yo, gen 
// token: 022e13ff53db887c2e515ec266768e4e305e34b7
const apiToken = 'YOUR_API_TOKEN';


generatePaylink(apiToken, 100, 'Information about the transaction', 'http://example.com/pms/service/')
    .then(response => console.log('Generated Paylink:', response))
    .catch(error => console.error(error.message));

getPaylinks(apiToken)
    .then(response => console.log('Paylinks:', response))
    .catch(error => console.error(error.message));
