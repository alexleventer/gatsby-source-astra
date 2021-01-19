const fetch = require('node-fetch');
const { createClient } = require('@astrajs/collections');

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin");

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, getNodesByType}, options) => {
  const { createNode } = actions;
  if (!options.dbId) throw new Error('Missing required option, dbId');
  if (!options.dbUsername) throw new Error('Missing required option, dbUsername');
  if (!options.dbPassword) throw new Error('Missing required option, dbPassword');
  if (!options.dbRegion) throw new Error('Missing required option, dbRegion');
  if (!options.dbNamespace) throw new Error('Missing required option, dbNamespace');
  if (!options.dbCollection) throw new Error('Missing required option, dbCollection');

  const astraClient = await createClient({
    astraDatabaseId: options.dbId,
    astraDatabaseRegion: options.dbRegion,
    username: options.dbUsername,
    password: options.dbPassword,
  });
  const collection = await astraClient.namespace(options.dbNamespace).collection(options.dbCollection);
  const documents = await collection.find({id: {$exists: true}});

  return Object.keys(documents).forEach(documentId =>
    createNode({
      ...documents[documentId],
      id: createNodeId(`${options.dbCollection}-${documentId}`),
      parent: null,
      children: [],
      internal: {
        type: options.dbCollection,
        content: JSON.stringify(documents[documentId]),
        contentDigest: createContentDigest(documents[documentId]),
      },
    })
  )
}
