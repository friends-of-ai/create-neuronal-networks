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

        for (var i = 0; i < this.planes.length - 1; i++) {
            var weightMatrix = [];

            for (var j = 0; j < this.planes[i + 1]; j++) {
                weightMatrix[j] = [];
                for (var k = 0; k < this.planes[i]; k++) {
                    weightMatrix[j][k] = 1;
                }
            }

            this.weightMatrices.push(new Matrix(weightMatrix));
        }

        console.log(this.weightMatrices[0].multiply(new Vector([2, 2])).array);
        console.log(this.weightMatrices[0].multiply(new Vector([1, 1])).array);
    }
}