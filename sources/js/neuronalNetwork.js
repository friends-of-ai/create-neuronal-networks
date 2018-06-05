/**
 * A class to create and calculates matrices
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-21)
 */
class NeuronalNetwork extends BaseNeuronalNetwork {

    static get ERROR_GIVEN_PARAMETER_IS_NO_ARRAY() {
        return [this, 101, 'Given parameter is not an array', 'The given parameter must be an instance of array.'];
    }

    static get ERROR_GIVEN_PARAMETER_IS_NO_MATRIX() {
        return [this, 102, 'Given parameter is not a matrix', 'The given parameter must be an instance of matrix.'];
    }

    static get ERROR_ARRAY_MUST_BE_LONGER_THAN_ONE() {
        return [this, 103, 'Array must be longer than one', 'The array must be longer than one.'];
    }

    static get ERROR_WEIGHT_MATRIX_WRONG_SIZE() {
        return [this, 103, 'The current weight matrix does not fit to the last one', 'The current weight matrix does not fit to the last one.'];
    }

    static get ERROR_WEIGHT_VECTOR_WRONG_SIZE() {
        return [this, 103, 'The current vector does not fit as input value', 'The current vector does not fit as input value.'];
    }

    static get ERROR_ELEMENT_IS_NO_NUMBER() {
        return [this, 104, 'The given element is no number', 'The given element is no number.'];
    }

    static get SUCCESS_INITIALISE_NEURONAL_NETWORK_PLANES() {
        return [this, 201, 'Init neuronal network with planes.'];
    }

    static get SUCCESS_INITIALISE_NEURONAL_NETWORK_PLANES_BIAS() {
        return [this, 202, 'Init neuronal network with planes and bias.'];
    }

    static get SUCCESS_INITIALISE_NEURONAL_NETWORK_WEIGHT_MATRICES() {
        return [this, 203, 'Init neuronal network with weight matrices.'];
    }

    static get SUCCESS_INITIALISE_NEURONAL_NETWORK_WEIGHT_MATRICES_BIAS() {
        return [this, 204, 'Init neuronal network with weight matrices and bias.'];
    }

    static get SUCCESS_CALCULATION() {
        return [this, 205, 'Calculation test (forward propagation).'];
    }

    static get SUCCESS_CALCULATION_BIAS() {
        return [this, 206, 'Calculation test with bias (forward propagation).'];
    }

    static get SUCCESS_BACKWARD_PROPAGATION() {
        return [this, 207, 'Backward propagation test.'];
    }

    static get SUCCESS_BACKWARD_PROPAGATION_BIAS() {
        return [this, 208, 'Backward propagation test with bias (forward propagation).'];
    }

    static get SUCCESS_LEARN_TEST() {
        return [this, 209, 'Test the learn method.'];
    }

    static get CLASS_NAME() {
        return 'NeuronalNetwork';
    }

    /**
     * The constructor of the NeuronalNetwork.
     */
    constructor(planes, bias) {
        super();

        this.bias      = bias ? true : false;
        this.learnRate = 1;
        this.name      = this.constructor.CLASS_NAME;

        this.assert(planes instanceof Array, 'NeuronalNetwork.constructor', this.constructor.ERROR_GIVEN_PARAMETER_IS_NO_ARRAY);
        this.assert(planes.length > 0, 'NeuronalNetwork.constructor', this.constructor.ERROR_ARRAY_MUST_BE_LONGER_THAN_ONE);

        this.weightMatrices = [];

        /* matrix array given */
        if (planes[0] instanceof Matrix) {
            this.saveWeightMatrices(planes);
        } else {
            this.buildWeightMatrices(planes);
        }
    }

    /**
     * Returns the current matrix.
     *
     * @returns {Array|*}
     */
    get weightMatrixArray() {
        return this.weightMatrices.map(function (matrix) { return matrix.array; });
    }

    /**
     * Calculate the weight matrices.
     *
     * @param planes
     */
    buildWeightMatrices(planes) {
        this.planes = planes;

        for (var i = 0; i < this.planes.length - 1; i++) {
            this.assert(this.isNumber(this.planes[i]), 'NeuronalNetwork.buildWeightMatrices', this.constructor.ERROR_ELEMENT_IS_NO_NUMBER);

            var weightMatrix = [];

            for (var j = 0; j < this.planes[i + 1]; j++) {
                weightMatrix[j] = [];
                for (var k = 0; k < this.planes[i] + (this.bias ? 1 : 0); k++) {
                    weightMatrix[j][k] = this.getRandomNumber();
                }
            }

            this.weightMatrices.push(new Matrix(weightMatrix));
        }
    }

    /**
     * Saves the given weight matrices to this object.
     *
     * @param weightMatrices
     */
    saveWeightMatrices(weightMatrices) {
        this.planes = [];

        this.planes.push(weightMatrices[0].cols - (this.bias ? 1 : 0));

        weightMatrices.map(function(weightMatrix) {
            this.assert(weightMatrix instanceof Matrix, 'NeuronalNetwork.saveWeightMatrices', this.constructor.ERROR_GIVEN_PARAMETER_IS_NO_MATRIX);

            if (this.weightMatrices.length > 0) {
                this.assert(
                    (this.weightMatrices[this.weightMatrices.length - 1].rows + (this.bias ? 1 : 0)) === weightMatrix.cols,
                    'NeuronalNetwork.saveWeightMatrices',
                    this.constructor.ERROR_WEIGHT_MATRIX_WRONG_SIZE
                );
            }

            this.weightMatrices.push(new Matrix(weightMatrix.array));

            this.planes.push(this.weightMatrices[this.weightMatrices.length - 1].rows);
        }.bind(this));
    }

    /**
     * Trains the
     *
     * @param {Vector} inputVector
     * @param {Vector} expectedVector
     * @return {Object}
     */
    train(inputVector, expectedVector) {
        var forwardPropagation = this.doForwardPropagation(inputVector);

        var backPropagation = this.doBackPropagation(forwardPropagation, expectedVector);

        for (var i = 0; i < backPropagation.weightMatrixDelta.length; i++) {
            this.weightMatrices[i].add(backPropagation.weightMatrixDelta[i]);
        }

        return {
            forwardPropagation: forwardPropagation,
            backPropagation: backPropagation
        };
    }

    /**
     * Calculate the output of given input.
     *
     * @param vector
     * @returns {Vector}
     */
    calculateOutput(vector) {
        this.assert(this.planes[0] === vector.size, 'NeuronalNetwork.calculateOutput', this.constructor.ERROR_WEIGHT_VECTOR_WRONG_SIZE);

        var forwardPropagation = this.doForwardPropagation(vector);

        return forwardPropagation.outputs[forwardPropagation.outputs.length - 1];
    }

    /**
     * Do a forward propagation.
     *
     * @param {Vector} vector
     * @return {Object}
     */
    doForwardPropagation(vector) {
        var inputs  = [];
        var outputs = [];

        /* the input layer: input === output */
        inputs.push(new Vector(vector.array));
        outputs.push(new Vector(vector.array));

        if (this.bias) {
            outputs[outputs.length - 1].unshift(1)
        }

        for (var i = 0; i < this.weightMatrices.length; i++) {
            var weightMatrix = this.weightMatrices[i];

            var input = weightMatrix.multiply(true, outputs[i]);
            inputs.push(input);

            var output = inputs[i + 1].callback(true, this.constructor.activationFunctionSigmoid);
            outputs.push(output);

            if (this.bias && i + 1 < this.weightMatrices.length) {
                outputs[outputs.length - 1].unshift(1)
            }
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
    doBackPropagation(forwardPropagation, expectedVector) {

        /* calculate the delta's */
        var delta = [];
        for (var i = 0; i < this.weightMatrices.length; i++) {
            if (i === 0) {
                var vector = expectedVector.subtract(true, forwardPropagation.outputs[forwardPropagation.outputs.length - 1 - i]);
                var output = forwardPropagation.outputs[forwardPropagation.outputs.length - 1 - i];
            } else {
                var weightMatrix = forwardPropagation.weightMatrices[forwardPropagation.weightMatrices.length - i].shiftCol(true).transpose();
                var vector = weightMatrix.multiply(true, delta[delta.length - 1]);
                var output = forwardPropagation.outputs[forwardPropagation.outputs.length - 1 - i].shift(true);
            }

            /* add delta from the output layer to the beginning of delta array */
            delta.unshift(
                output.callback(true, this.constructor.derivationFunctionSigmoidCalculated).rowMultiply(true, vector)
            );
        }

        /* calculate the weight matrix delta values */
        var weightMatrixDelta = [];
        for (var i = 0; i < delta.length; i++) {
            weightMatrixDelta.unshift(delta[delta.length - 1 - i].multiplyDyadic(true, forwardPropagation.outputs[forwardPropagation.outputs.length - 2 - i]));
        }

        return {
            delta: delta,
            weightMatrixDelta: weightMatrixDelta
        };
    }

    /**
     * Calculates a random number depending on the plane level.
     *
     * @returns {number}
     */
    getRandomNumber() {
        return Math.random() / 3;
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