const axios = require('axios');

function generatePaylink(apiToken, amount, note, returnUrl, metaData = {}, payorName, payorEmail) {
    const url = 'https://devfundme.com/api/pms/generate_paylink/';
    const headers = {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
    };

    if (metaData === null) {
        throw new Error('metaData cannot be null.');
    }

    if (!payorName || payorName.trim() === '') {
        throw new Error('payorName cannot be blank.');
    }

    if (!payorEmail || payorEmail.trim() === '') {
        throw new Error('payorEmail cannot be blank.');
    }

    const data = {
        amount: String(amount),
        note: note || '',
        return_url: returnUrl || '',
        meta_data: metaData,
        payor_name: payorName,
        payor_email: payorEmail,
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
        console.error(`Request failed with status ${error.response.status}`);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
        throw new Error(`Request failed with status ${error.response.status} - ${error.response.data.message || 'No error message available'}`);
    } else if (error.request) {
        console.error('Request made but no response received');
        console.error('Request data:', error.request);
        throw new Error('Request made but no response received');
    } else {
        console.error(`Error: ${error.message}`);
        throw new Error(`Error: ${error.message}`);
    }
}

// pati sa se pati pou teste metod nou gen anle yo, gen 
// token: 022e13ff53db887c2e515ec266768e4e305e34b7
const apiToken = '022e13ff53db887c2e515ec266768e4e305e34b7';


generatePaylink(apiToken, 100, 'Test note', 'http://example.com/pms/service/', {}, 'ti mamoun', 'janwobe@example.com')
    .then(response => console.log('Generated Paylink:', response))
    .catch(error => console.error(error.message));

// getPaylinks(apiToken)
//     .then(response => console.log('Paylinks:', response))
//     .catch(error => console.error(error.message));
