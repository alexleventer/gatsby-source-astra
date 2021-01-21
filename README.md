# Gatsby Source Astra
Pull data directly from your Astra database into Gatsby.

## Install
```shell
npm install --save gatsby-source-astra
```

In `gatsby-node.js`:
```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-astra',
      options: {
        dbId: '69369555-16d9-429f-a350-3614c0b4b555',
        dbUsername: 'test',
        dbPassword: 'test',
        dbRegion: 'us-east1',
        dbNamespace: 'test',
        dbCollection: 'test',
      },
    }
  ]
};

```
