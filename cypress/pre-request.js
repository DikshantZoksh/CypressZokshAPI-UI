const crypto = require('crypto');

function generateRequestAuthHeaders(requestapi, apiAuth, versions) {
  let postBodyJson = '{}';
  if (requestapi.method === 'POST' || requestapi.method === 'PUT') {
    postBodyJson = JSON.stringify(requestapi.body);
  } else {
    return {};
  }

  const timestamp = new Date().getTime().toString();
  const headers = {};

  let requestPath = requestapi.url;

  // requestPath = requestPath.replace('{{', '').replace('}}', '').replace('/api', '').trim();

  const toSignBody = `${timestamp}${requestPath}${postBodyJson}`;
  const hmac = crypto.createHmac('sha256', apiAuth.secret);
  const signature = hmac.update(toSignBody).digest('hex');

  headers['zoksh-key'] = apiAuth.key;
  headers['zoksh-ts'] = timestamp;
  headers['zoksh-sign'] = signature;

  return headers;
}

module.exports.generateRequestAuthHeaders = generateRequestAuthHeaders;
