/**
 * A class to create and calculates matrices
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-21)
 */
class NeuronalNetwork {
    /**
     * The constructor of the NeuronalNetwork.
     */
    constructor(planes, bias) {
        this.planes    = planes;
        this.bias      = bias ? true : false;
        this.learnRate = 1;

        this.weightMatrices = [];

        // for (var i = 0; i < this.planes.length - 1; i++) {
        //     var weightMatrix = [];
        //
        //     for (var j = 0; j < this.planes[i + 1]; j++) {
        //         weightMatrix[j] = [];
        //         for (var k = 0; k < this.planes[i]; k++) {
        //             weightMatrix[j][k] = 1;
        //         }
        //     }
        //
        //     this.weightMatrices.push(new Matrix(weightMatrix));
        // }
        //this.weightMatrices.push(new Matrix([[0.9, 0.3, 0.4], [0.2, 0.8, 0.2], [0.1, 0.5, 0.6]]));
        //this.weightMatrices.push(new Matrix([[0.3, 0.7, 0.5], [0.6, 0.5, 0.2], [0.8, 0.1, 0.9]]));

        this.weightMatrices.push(new Matrix([[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]));
        this.weightMatrices.push(new Matrix([[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]]));
    }

    /**
     * Trains the
     *
     * @param {Vector} inputVector
     * @param {Vector} expectedVector
     * @return {Array}
     */
    train(inputVector, expectedVector) {
        var forwardPropagation = this.forwardPropagation(inputVector);

        var backPropagation = this.backPropagation(forwardPropagation, expectedVector);

        console.log(backPropagation);

        forwardPropagation.inputs.map(function(vector, index) {
            console.log('input ' + index, JSON.stringify(vector.array));
        });

        forwardPropagation.outputs.map(function(vector, index) {
            console.log('output ' + index, JSON.stringify(vector.array));
        });

        forwardPropagation.weightMatrices.map(function(matrix, index) {
            console.log('weightMatrix ' + index, JSON.stringify(matrix.array));
        });

        return forwardPropagation.weightMatrices;
    }

    /**
     * Calculate the output of given input.
     *
     * @param vector
     * @returns {Vector}
     */
    calculateOutput(vector) {
        var forwardPropagation = this.forwardPropagation(vector);

        forwardPropagation.inputs.map(function(vector, index) {
            console.log('input ' + index, JSON.stringify(vector.array));
        });

        forwardPropagation.outputs.map(function(vector, index) {
            console.log('output ' + index, JSON.stringify(vector.array));
        });

        forwardPropagation.weightMatrices.map(function(matrix, index) {
            console.log('weightMatrix ' + index, JSON.stringify(matrix.array));
        });

        return forwardPropagation.outputs[forwardPropagation.outputs.length - 1];
    }

    /**
     * Do a forward propagation.
     *
     * @param {Vector} vector
     * @return {Object}
     */
    forwardPropagation(vector) {
        var inputs  = [];
        var outputs = [];

        inputs.push(new Vector(vector.array));
        outputs.push(new Vector(vector.array));

        for (var i = 0; i < this.planes.length; i++) {
            var weightMatrix = this.weightMatrices[i];

            var input = weightMatrix.multiply(true, this.bias ? outputs[i].unshift(1) : outputs[i]);

            inputs.push(input);

            var output = inputs[i + 1].callback(this.constructor.activationFunctionSigmoid);

            outputs.push(output);
        }

        return {
            inputs: inputs,
            outputs: outputs,
            weightMatrices: this.weightMatrices
        };
    }

    /**
     * Do a back propagation.
     *
     * @param forwardPropagation
     * @param expectedVector
     */
    backPropagation(forwardPropagation, expectedVector) {
        var deltaOutput = forwardPropagation.outputs[2].
            callback(true, this.constructor.derivationFunctionSigmoidCalculated).
            rowMultiply(
                true,
                new Vector([
                    expectedVector.array[0] - forwardPropagation.outputs[2].array[0],
                    expectedVector.array[1] - forwardPropagation.outputs[2].array[1]
                ])
            );

        console.log(JSON.stringify(deltaOutput.array));

        return {
            deltaOutput: deltaOutput
        };
    }

    /**
     * The sigmoid activation function.
     *
     * @param {number} value
     * @returns {number}
     */
    static activationFunctionSigmoid(value) {
        return 1 / (1 + Math.exp(-value));
    }

    /**
     * The derivation of the sigmoid activation function (activation function sigmoid already calculated).
     * For usage of derivationFunctionSigmoid method: apply the method activationFunctionSigmoid to value before.
     *
     * @param value
     * @returns {number}
     */
    static derivationFunctionSigmoidCalculated(value) {
        return value * (1 - value);
    }
}