const axios = require('axios');

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

function isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generatePaylink(apiToken, amount, note, returnUrl, metaData = {}, payorName, payorEmail) {
    const url = 'https://devfundme.com/api/pms/generate_paylink/';
    const headers = {
        'Authorization': `Token ${apiToken}`,
        'Content-Type': 'application/json',
    };

    if (metaData === null) {
        throw new Error('metaData cannot be null.');
    }

    if (!isValidUrl(returnUrl)) {
        throw new Error('returnUrl must be a valid URL.');
    }

    if (typeof metaData !== 'object') {
        throw new Error('metaData must be an object.');
    }

    try {
        JSON.stringify(metaData);
    } catch (error) {
        throw new Error('metaData must be a valid JSON object.');
    }

    if (!isValidNumber(amount)) {
        throw new Error('amount must be a number.');
    }

    if (typeof payorName !== 'string') {
        throw new Error('payorName must be a string.');
    }

    if (!isValidEmail(payorEmail)) {
        throw new Error('payorEmail must be a valid email address.');
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
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw handleRequestError(error);
        });
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

module.exports={
    generatePaylink,
    getPaylinks,
}