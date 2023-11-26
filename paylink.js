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

    axios.post(url, data, { headers })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
            } else {
                console.error(`Error: ${error.message}`);
            }
        });
}

const apiToken = 'YOUR_API_TOKEN';
const amount = 100;
const note = 'Information about the transaction';
const returnUrl = 'https://your_website_redirect_url/';
const metaData = null;
const payorName = ''; 
const payorEmail = ''; 

generatePaylink(apiToken, amount, note, returnUrl, metaData, payorName, payorEmail);
