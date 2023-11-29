const devSDK = require('./generate&get');
const apiToken = require('./utils')

console.log(apiToken)

devSDK.generatePaylink(apiToken, 100, 'Test note', 'http://example.com/pms/service/', {}, 'se janet', 'sejanet@example.com')
    .then(response => console.log('Generated Paylink:', response))
    .catch(error => console.error(error.message));

devSDK.getPaylinks(apiToken)
    .then(response => console.log('Paylinks:', response))
    .catch(error => console.error(error.message));