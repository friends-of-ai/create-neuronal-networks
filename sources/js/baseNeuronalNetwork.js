/**
 * A class to create and calculates matrices
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-05-13)
 */
class BaseNeuronalNetwork {

    /**
     * The constructor of the BaseNeuronalNetwork class.
     *
     */
    constructor() {
        this.name = 'BaseNeuronalNetwork';
    }

    /**
     * Check the assertion and throw an exception if the assertion is not satisfied.
     *
     * @param assertion
     * @param functionName
     * @param errorCode
     * @param errorText
     */
    assert(assertion, functionName, errorType, replace) {
        if (!assertion) {
            var errorText = errorType[3];

            if (typeof replace === "object") {
                Object.keys(replace).map(function(key) { errorText = errorText.replace('%' + key, replace[key]); });
            }

            switch (this.name) {
                case 'NeuronalNetwork':
                    throw new JsTestException(
                        errorType[1],
                        String('%functionName: %errorText').replace(/%functionName/, functionName).replace(/%errorText/, errorText)
                    );
                    break;

                default:
                    throw new Error('Unknown class ' + this.name);
                    break;
            }
        }
    }

    /**
     * Check, if given value is a number.
     *
     * @param value
     * @returns {boolean}
     */
    isNumber(value) {
        if (Number(value) === value && value % 1 === 0) {
            return true;
        }

        if (Number(value) === value && value % 1 !== 0) {
            return true;
        }

        return false;
    }
}