function startNeuronalNetworkTest() {

    /* NN: init NeuronalNetwork with wrong parameter */
    new JsTest(
        NeuronalNetwork.ERROR_GIVEN_PARAMETER_IS_NO_ARRAY,
        function () {
            new NeuronalNetwork(1);
            return false;
        }
    );

    /* NN: init NeuronalNetwork with wrong parameter */
    new JsTest(
        NeuronalNetwork.ERROR_ARRAY_MUST_BE_LONGER_THAN_ONE,
        function () {
            new NeuronalNetwork([]);
            return false;
        }
    );

    /* NN: init NeuronalNetwork with wrong parameter */
    new JsTest(
        NeuronalNetwork.ERROR_ELEMENT_IS_NO_NUMBER,
        function () {
            new NeuronalNetwork(['a', 2]);
            return false;
        }
    );

    /* NN: init NeuronalNetwork with planes */
    new JsTest(
        NeuronalNetwork.SUCCESS_INITIALISE_NEURONAL_NETWORK_PLANES,
        function () {
            var planes = [2, 2, 2];

            var neuronalNetwork = new NeuronalNetwork(planes);

            return (
                JsTest.equalArrayValues(neuronalNetwork.planes, [2, 2, 2]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices, Array) &&
                JsTest.equalArrayLength(neuronalNetwork.weightMatrices, 2) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[0], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].size, [2, 2]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[1], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].size, [2, 2])
            );
        }
    );

    /* NN: init NeuronalNetwork with planes and bias */
    new JsTest(
        NeuronalNetwork.SUCCESS_INITIALISE_NEURONAL_NETWORK_PLANES_BIAS,
        function () {
            var planes = [2, 2, 2];

            var neuronalNetwork = new NeuronalNetwork(planes, true);

            return (
                JsTest.equalArrayValues(neuronalNetwork.planes, [2, 2, 2]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices, Array) &&
                JsTest.equalArrayLength(neuronalNetwork.weightMatrices, 2) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[0], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].size, [2, 3]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[1], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].size, [2, 3])
            );
        }
    );

    /* NN: init NeuronalNetwork with weight matrices */
    new JsTest(
        NeuronalNetwork.SUCCESS_INITIALISE_NEURONAL_NETWORK_WEIGHT_MATRICES,
        function () {
            var weightMatrices =  [
                new Matrix([[0.9, 0.3, 0.4], [0.2, 0.8, 0.2], [0.1, 0.5, 0.6]]),
                new Matrix([[0.3, 0.7, 0.5], [0.6, 0.5, 0.2], [0.8, 0.1, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices);

            return (
                JsTest.equalArrayValues(neuronalNetwork.planes, [3, 3, 3]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices, Array) &&
                JsTest.equalArrayLength(neuronalNetwork.weightMatrices, 2) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[0], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].size, [3, 3]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[1], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].size, [3, 3])
            );
        }
    );

    /* NN: init NeuronalNetwork with weight matrices and bias */
    new JsTest(
        NeuronalNetwork.SUCCESS_INITIALISE_NEURONAL_NETWORK_WEIGHT_MATRICES_BIAS,
        function () {
            var weightMatrices = [
                new Matrix([[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]),
                new Matrix([[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices, true);

            return (
                JsTest.equalArrayValues(neuronalNetwork.planes, [2, 2, 2]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices, Array) &&
                JsTest.equalArrayLength(neuronalNetwork.weightMatrices, 2) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[0], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].array, [[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].size, [2, 3]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[1], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].array, [[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]]) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].size, [2, 3])
            );
        }
    );

    /* NN: calculation test (without bias) */
    new JsTest(
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
    new JsTest(
        NeuronalNetwork.SUCCESS_CALCULATION,
        function () {
            var weightMatrices1 =  [
                new Matrix([[0.9, 0.3, 0.4], [0.2, 0.8, 0.2], [0.1, 0.5, 0.6]]),
                new Matrix([[0.3, 0.7, 0.5], [0.6, 0.5, 0.2], [0.8, 0.1, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices1);

            var output = neuronalNetwork.calculateOutput(new Vector([0.9, 0.1, 0.8]));

            return (
                JsTest.equalArrayValues(neuronalNetwork.planes, [3, 3, 3]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices, Array) &&
                JsTest.equalArrayLength(neuronalNetwork.weightMatrices, 2) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[0], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].size, [3, 3]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[1], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].size, [3, 3]) &&
                JsTest.equalNumber(output.getCell(0), 0.7263033450139793, 6) &&
                JsTest.equalNumber(output.getCell(1), 0.7085980724248232, 6) &&
                JsTest.equalNumber(output.getCell(2), 0.778097059561142, 6)
            );
        }
    );

    /* NN: calculation test (without bias) */
    new JsTest(
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
    new JsTest(
        NeuronalNetwork.SUCCESS_CALCULATION_BIAS,
        function () {
            var weightMatrices = [
                new Matrix([[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]),
                new Matrix([[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]])
            ];

            var neuronalNetwork = new NeuronalNetwork(weightMatrices, true);

            var output = neuronalNetwork.calculateOutput(new Vector([0.7, 0.6]));

            return (
                JsTest.equalArrayValues(neuronalNetwork.planes, [2, 2, 2]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices, Array) &&
                JsTest.equalArrayLength(neuronalNetwork.weightMatrices, 2) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[0], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].array, [[0.3, 0.8, 0.5], [-0.2, -0.6, 0.7]]) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].size, [2, 3]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[1], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].array, [[0.2, 0.4, 0.3], [0.1, -0.4, 0.9]]) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].size, [2, 3]) &&
                JsTest.equalNumber(output.getCell(0), 0.6546591654993577, 6) &&
                JsTest.equalNumber(output.getCell(1), 0.5499865411657244, 6)
            );
        }
    );

    /* NN: calculation test (with bias) */
    new JsTest(
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
                JsTest.equalArrayValues(neuronalNetwork.planes, [2, 2, 2]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices, Array) &&
                JsTest.equalArrayLength(neuronalNetwork.weightMatrices, 2) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[0], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].array, [[0.31032731958698523, 0.8072291237108897, 0.5061963917521911], [-0.2151776888223207, -0.6106243821756244, 0.6908933867066076]]) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[0].size, [2, 3]) &&
                JsTest.equalObjectInstance(neuronalNetwork.weightMatrices[1], Matrix) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].array, [[0.2554667889679425, 0.4422286810285825, 0.324969262671611], [0.013377860083794227, -0.4659482689479074, 0.8610056575296824]]) &&
                JsTest.equalArrayValues(neuronalNetwork.weightMatrices[1].size, [2, 3]) &&
                JsTest.equalObjectInstance(trainResult.backPropagation.delta, Array) &&
                JsTest.equalArrayLength(trainResult.backPropagation.delta, 2) &&
                JsTest.equalObjectInstance(trainResult.backPropagation.delta[0], Vector) &&
                JsTest.equalArrayValues(trainResult.backPropagation.delta[0].array, [0.010327319586985247, -0.015177688822320668]) &&
                JsTest.equalObjectInstance(trainResult.backPropagation.delta[1], Vector) &&
                JsTest.equalArrayValues(trainResult.backPropagation.delta[1].array, [0.05546678896794252, -0.08662213991620578]) &&
                JsTest.equalObjectInstance(trainResult.backPropagation.weightMatrixDelta, Array) &&
                JsTest.equalArrayLength(trainResult.backPropagation.weightMatrixDelta, 2) &&
                JsTest.equalObjectInstance(trainResult.backPropagation.weightMatrixDelta[0], Matrix) &&
                JsTest.equalArrayValues(trainResult.backPropagation.weightMatrixDelta[0].array, [[0.010327319586985247, 0.007229123710889672, 0.006196391752191148], [-0.015177688822320668, -0.010624382175624466, -0.0091066132933924]]) &&
                JsTest.equalObjectInstance(trainResult.backPropagation.weightMatrixDelta[1], Matrix) &&
                JsTest.equalArrayValues(trainResult.backPropagation.weightMatrixDelta[1].array, [[0.05546678896794252, 0.042228681028582474, 0.024969262671611037], [-0.08662213991620578, -0.06594826894790738, -0.03899434247031761]])
            );
        }
    );

    /* NN: test the learn method */
    new JsTest(
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
                JsTest.equalArrayValues(neuronalNetwork.planes, [2, 2, 2]) &&
                JsTest.equalObjectInstance(output, Vector) &&
                JsTest.equalInteger(output.size, 2) &&
                JsTest.equalNumber(output.getCell(0), expected.getCell(0), 1) &&
                JsTest.equalNumber(output.getCell(1), expected.getCell(1), 1)
            );
        }
    );
}