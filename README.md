# Create neuronal networks

This framework creates some neuronal networks. It shows and provides you a collection of algorithms how to use the framework.

## 0. Introduction

This framework uses needs an analysis library like this: [js-analysis](https://github.com/bjoern-hempel/js-analysis)

Coming soon..

## 1. The elements

### 1.1 Predictors

Coming soon..

### 1.2 Perceptron

Coming soon..

### 1.3 The network (neuronal network)

#### 1.3.1 With given weight matrices

```javascript
var weightMatrices =  [
    new Matrix([[0.9, 0.3, 0.4], [0.2, 0.8, 0.2], [0.1, 0.5, 0.6]]),
    new Matrix([[0.3, 0.7, 0.5], [0.6, 0.5, 0.2], [0.8, 0.1, 0.9]])
];

var neuronalNetwork = new NeuronalNetwork(weightMatrices);

var input  = new Vector([0.9, 0.1, 0.8]);
var output = neuronalNetwork.calculateOutput(input);

console.log(JSON.stringify(output.array)); // prints [0.7263033450139793,0.7085980724248232,0.778097059561142]
```

#### 1.3.2 Let the neuronal network calculate the weight matrices

```javascript
var planes = [3, 3, 3];

var neuronalNetwork = new NeuronalNetwork(planes);

var input  = new Vector([0.9, 0.1, 0.8]);
var output = neuronalNetwork.calculateOutput(input);

console.log(JSON.stringify(output.array)); // prints (example) [0.5601474395121488,0.6247316906773285,0.6346952211353676]
```

#### 1.3.3 Train the network

```javascript
var planes = [2, 2, 2];

var neuronalNetwork = new NeuronalNetwork(planes, true);

var input    = new Vector([0.7, 0.6]);
var expected = new Vector([0.9, 0.2]);

/* train the network */
for (var i = 0; i < 100; i++) {
    neuronalNetwork.train(input, expected);
}

/* test the network (the output should be the expected value */
var output = neuronalNetwork.calculateOutput(input);

console.log(Math.round(output.array[0] * 10) / 10, Math.round(output.array[1] * 10) / 10); // prints 0.9 0.2
```
            

## 2. Test the libraries

Coming soon..

## A. Other Tutorials

* Coming soon..

## B. Literature

Recommended for practical use:

* Coming soon..

## C. Sources

* Coming soon..

## D. Authors

* Björn Hempel <bjoern@hempel.li> - _Initial work_ - [https://github.com/bjoern-hempel](https://github.com/bjoern-hempel)

## E. Licence

This tutorial is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details
