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

    /* NN: init NeuronalNetwork with wrong parameter */
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
}