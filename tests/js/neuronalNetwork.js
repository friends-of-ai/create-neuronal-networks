function startNeuronalNetworkTest() {

    /* NN: init NeuronalNetwork with wrong parameter */
    new Test(
        NeuronalNetwork.ERROR_GIVEN_PARAMETER_IS_NO_ARRAY,
        function () {
            new NeuronalNetwork(1);
            return false;
        }
    );

    /* NN: init NeuronalNetwork with wrong parameter */
    new Test(
        NeuronalNetwork.ERROR_ARRAY_MUST_BE_LONGER_THAN_ONE,
        function () {
            new NeuronalNetwork([]);
            return false;
        }
    );

    /* NN: init NeuronalNetwork with wrong parameter */
    new Test(
        NeuronalNetwork.ERROR_ELEMENT_IS_NO_NUMBER,
        function () {
            new NeuronalNetwork(['a', 2]);
            return false;
        }
    );

    /* NN: init NeuronalNetwork with planes */
    new Test(
        NeuronalNetwork.SUCCESS_INITIALISE_NEURONAL_NETWORK_PLANES,
        function () {
            var planes = [2, 2, 2];

            var neuronalNetwork = new NeuronalNetwork(planes);

            return (
                Test.equalArray(neuronalNetwork.planes, [2, 2, 2]) &&
                neuronalNetwork.weightMatrices instanceof Array &&
                neuronalNetwork.weightMatrices.length === 2 &&
                neuronalNetwork.weightMatrices[0] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].size, [2, 2]) &&
                neuronalNetwork.weightMatrices[1] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].size, [2, 2])
            );
        }
    );

    /* NN: init NeuronalNetwork with planes and bias */
    new Test(
        NeuronalNetwork.SUCCESS_INITIALISE_NEURONAL_NETWORK_PLANES_BIAS,
        function () {
            var planes = [2, 2, 2];

            var neuronalNetwork = new NeuronalNetwork(planes, true);

            return (
                Test.equalArray(neuronalNetwork.planes, [2, 2, 2]) &&
                neuronalNetwork.weightMatrices instanceof Array &&
                neuronalNetwork.weightMatrices.length === 2 &&
                neuronalNetwork.weightMatrices[0] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].size, [2, 3]) &&
                neuronalNetwork.weightMatrices[1] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].size, [2, 3])
            );
        }
    );

    /* NN: init NeuronalNetwork with weight matrices */
    new Test(
        NeuronalNetwork.SUCCESS_INITIALISE_NEURONAL_NETWORK_WEIGHT_MATRICES,
        function () {
            var weightMatrices =  [
                new Matrix([[0.9, 0.3, 0.4], [0.2, 0.8, 0.2], [0.1, 0.5, 0.6]]),
                new Matrix([[0.3, 0.7, 0.5], [0.6, 0.5, 0.2], [0.8, 0.1, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices);

            return (
                Test.equalArray(neuronalNetwork.planes, [3, 3, 3]) &&
                neuronalNetwork.weightMatrices instanceof Array &&
                neuronalNetwork.weightMatrices.length === 2 &&
                neuronalNetwork.weightMatrices[0] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].size, [3, 3]) &&
                neuronalNetwork.weightMatrices[1] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].size, [3, 3])
            );
        }
    );

    /* NN: init NeuronalNetwork with weight matrices and bias */
    new Test(
        NeuronalNetwork.SUCCESS_INITIALISE_NEURONAL_NETWORK_WEIGHT_MATRICES_BIAS,
        function () {
            var weightMatrices = [
                new Matrix([[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]),
                new Matrix([[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices, true);

            return (
                Test.equalArray(neuronalNetwork.planes, [2, 2, 2]) &&
                neuronalNetwork.weightMatrices instanceof Array &&
                neuronalNetwork.weightMatrices.length === 2 &&
                neuronalNetwork.weightMatrices[0] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].array, [[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]) &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].size, [2, 3]) &&
                neuronalNetwork.weightMatrices[1] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].array, [[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]]) &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].size, [2, 3])
            );
        }
    );

    /* NN: test the learn method */
    new Test(
        NeuronalNetwork.SUCCESS_LEARN_TEST,
        function () {
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

            return (
                Test.equalArray(neuronalNetwork.planes, [2, 2, 2]) &&
                Test.equalObjectInstance(output, Vector) &&
                Test.equalInteger(output.size, 2) &&
                Test.equalNumber(output.getCell(0), expected.getCell(0), 1) &&
                Test.equalNumber(output.getCell(1), expected.getCell(1), 1)
            );
        }
    );
}