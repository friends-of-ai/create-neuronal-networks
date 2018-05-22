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
    constructor(planes) {
        this.planes = planes;

        this.weightMatrices = [];
        this.inputs = [];
        this.outputs = [];

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
        this.weightMatrices.push(new Matrix([[0.9, 0.3, 0.4], [0.2, 0.8, 0.2], [0.1, 0.5, 0.6]]));
        this.weightMatrices.push(new Matrix([[0.3, 0.7, 0.5], [0.6, 0.5, 0.2], [0.8, 0.1, 0.9]]));
    }

    /**
     * Calculate the output.
     *
     * @param vector {Vector}
     */
    calculateOutput(vector) {
        this.inputs.push(vector);
        this.outputs.push(this.inputs[0]);

        for (var i = 0; i < this.planes.length; i++) {
            this.inputs.push(this.weightMatrices[i].multiply(this.outputs[i]));

            var output = this.inputs[i + 1].callback(function (element) {
                return 1 / (1 + Math.exp(-element));
            });

            this.outputs.push(output);
        }

        return this.outputs[this.outputs.length - 1];
    }
}