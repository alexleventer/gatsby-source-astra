const fetch = require('cross-fetch');

export const getAstraToken = async (credentials) => {
  const { username, password, region, id } = credentials;
  return await fetch(`https://${id}-${region}.apps.astra.datastax.com/api/rest/v1/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then(res => {
    if (res.status >= 400) {
      throw new Error('Could not generate Astra credentials');
    }
    return res.json()
  }).then(body => {
    if (!body || !body.authToken) {
      throw new Error('Could not generate Astra credentials');
    }
    return body.authToken;
  });
}

export const listNamespaces = async (id, region, token) => {
  return await fetch(`https://${id}-${region}.apps.astra.datastax.com/api/rest/v2/schemas/namespaces`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Cassandra-Token': token,
    },
  }).then(res => {
    return res.json()
  });
};
