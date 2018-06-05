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

    /* NN: calculation test (without bias) */
    new Test(
        NeuronalNetwork.ERROR_WEIGHT_VECTOR_WRONG_SIZE,
        function () {
            var weightMatrices1 =  [
                new Matrix([[0.9, 0.3, 0.4], [0.2, 0.8, 0.2], [0.1, 0.5, 0.6]]),
                new Matrix([[0.3, 0.7, 0.5], [0.6, 0.5, 0.2], [0.8, 0.1, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices1);

            neuronalNetwork.calculateOutput(new Vector([0.9, 0.1, 0.8, 0.7]));

            return false;
        }
    );

    /* NN: calculation test (without bias) */
    new Test(
        NeuronalNetwork.SUCCESS_CALCULATION,
        function () {
            var weightMatrices1 =  [
                new Matrix([[0.9, 0.3, 0.4], [0.2, 0.8, 0.2], [0.1, 0.5, 0.6]]),
                new Matrix([[0.3, 0.7, 0.5], [0.6, 0.5, 0.2], [0.8, 0.1, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices1);

            var output = neuronalNetwork.calculateOutput(new Vector([0.9, 0.1, 0.8]));

            return (
                Test.equalArray(neuronalNetwork.planes, [3, 3, 3]) &&
                neuronalNetwork.weightMatrices instanceof Array &&
                neuronalNetwork.weightMatrices.length === 2 &&
                neuronalNetwork.weightMatrices[0] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].size, [3, 3]) &&
                neuronalNetwork.weightMatrices[1] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].size, [3, 3]) &&
                Test.equalNumber(output.getCell(0), 0.7263033450139793, 6) &&
                Test.equalNumber(output.getCell(1), 0.7085980724248232, 6) &&
                Test.equalNumber(output.getCell(2), 0.778097059561142, 6)
            );
        }
    );

    /* NN: calculation test (without bias) */
    new Test(
        NeuronalNetwork.ERROR_WEIGHT_VECTOR_WRONG_SIZE,
        function () {
            var weightMatrices = [
                new Matrix([[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]),
                new Matrix([[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices, true);

            neuronalNetwork.calculateOutput(new Vector([0.7]));

            return false;
        }
    );

    /* NN: calculation test (with bias) */
    new Test(
        NeuronalNetwork.SUCCESS_CALCULATION_BIAS,
        function () {
            var weightMatrices = [
                new Matrix([[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]),
                new Matrix([[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices, true);

            var output = neuronalNetwork.calculateOutput(new Vector([0.7, 0.6]));

            return (
                Test.equalArray(neuronalNetwork.planes, [2, 2, 2]) &&
                neuronalNetwork.weightMatrices instanceof Array &&
                neuronalNetwork.weightMatrices.length === 2 &&
                neuronalNetwork.weightMatrices[0] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].array, [[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]) &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].size, [2, 3]) &&
                neuronalNetwork.weightMatrices[1] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].array, [[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]]) &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].size, [2, 3]) &&
                Test.equalNumber(output.getCell(0), 0.6546591654993577, 6) &&
                Test.equalNumber(output.getCell(1), 0.5499865411657244, 6)
            );
        }
    );

    /* NN: calculation test (with bias) */
    new Test(
        NeuronalNetwork.SUCCESS_BACKWARD_PROPAGATION_BIAS,
        function () {
            var weightMatrices = [
                new Matrix([[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]),
                new Matrix([[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices, true);

            var input    = new Vector([0.7, 0.6]);
            var expected = new Vector([0.9, 0.2]);

            var trainResult = neuronalNetwork.train(input, expected);

            return (
                Test.equalArray(neuronalNetwork.planes, [2, 2, 2]) &&
                neuronalNetwork.weightMatrices instanceof Array &&
                neuronalNetwork.weightMatrices.length === 2 &&
                neuronalNetwork.weightMatrices[0] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].array, [[0.31032731958698523, 0.8072291237108897, 0.5061963917521911], [-0.2151776888223207, -0.6106243821756244, 0.6908933867066076]]) &&
                Test.equalArray(neuronalNetwork.weightMatrices[0].size, [2, 3]) &&
                neuronalNetwork.weightMatrices[1] instanceof Matrix &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].array, [[0.2554667889679425, 0.4422286810285825, 0.324969262671611], [0.013377860083794227, -0.4659482689479074, 0.8610056575296824]]) &&
                Test.equalArray(neuronalNetwork.weightMatrices[1].size, [2, 3]) &&
                trainResult.backPropagation.delta instanceof Array &&
                trainResult.backPropagation.delta.length == 2 &&
                trainResult.backPropagation.delta[0] instanceof Vector &&
                Test.equalArray(trainResult.backPropagation.delta[0].array, [0.010327319586985247, -0.015177688822320668]) &&
                trainResult.backPropagation.delta[1] instanceof Vector &&
                Test.equalArray(trainResult.backPropagation.delta[1].array, [0.05546678896794252, -0.08662213991620578])
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