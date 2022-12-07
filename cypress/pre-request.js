const crypto = require('crypto');

function generateRequestAuthHeaders(requestAPI, apiAuth, versions) {
  let postBodyJson = '{}';
  if (requestAPI.method === 'POST' || requestAPI.method === 'PUT') {
    postBodyJson = JSON.stringify(requestAPI.body);
  } else {
    return {};
  }

  const timestamp = new Date().getTime().toString();
  const headers = {};

  let requestPath = requestAPI.url;

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
