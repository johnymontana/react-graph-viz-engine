# react-graph-viz-engine
React component for visualizing graph data

[Play with the live example here](https://react-graph-viz-engine.s3.us-west-1.amazonaws.com/index.html)

## Embedded visualization libraries
* cytoscape.js

## Data input
This library provides for two scenarios :
* **Static data**: the data is provided as a JSON object
* **Fetch data**: the data can also be fetched from a **GraphQL** endpoint

The React component expects either :
* A **data** argument, containing the input data
* Two arguments, **graphqlUrl** and **graphqlQuery** to pass the information to call the GraphQL endpoint

### Static data - Expected data format
The data format expected by the component is a JSON object and is based on the GraphQL response format sent by the Neo4j GraphQL library.

Example
```json
{
   "data": {
      "actors": [
         {
            "__typename": "Actor",
            "ID": 1,
            "name": "François Lallement",
            "acted_in": [
               ...nested list of objects
            ]
         }
      ]
   }
}
```

### Fetch data
To fetch data from a GraphQL endpoint, the component expects the following arguments :
* **graphqlUrl**: the URL of the GraphQL endpoint
* **graphqlQuery**: the GraphQL query to execute

Example :
```json
graphqlUrl: "https://movies.neo4j-graphql.com/",
graphqlQuery:
    {
        actors(options: {limit: 20}) {
        __typename
        name
        acted_in {
            __typename
            title
            genres {
            __typename
            name
            }
        }
    }
}
```

## Style configuration
The React component can take a style configuration object - JSON in the following format :

Format :
```json
style: {
    configPropertyKey1:{
        nodeLabel1: "propertyValue1"
        nodeLabel2: "propertyValue2"
    }
}
```

Example :
```json
style: {
    nodeCaption:{
        Movie: "title",
        Actor: "name"
    },
    nodeColor:{
        Movie: "red",
        Actor: "blue"
    },
    nodeSize:{
        Movie: 40,
        Actor: 20
    },
    nodeCaptionSize:{
        Movie: 15,
        Actor: 15
    }
   }
```

## Interactions / event handling
The React component can take an interactions configuration object - JSON in the following format :

Format:
```json
interactions: {
    eventName: (e) => callback method
}
```

Example:
```json
interactions: {
    onNodeClick: (e) => alert(e.name)
}
```