/**
 * Own neuronal network exception.
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2018-06-02)
 */
function NeuronalNetworkException(code, message) {
    this.code = code;
    this.message = message;

    this.name = 'NeuronalNetworkException';
}

/**
 * toString method to create a nice readable message.
 *
 * @returns {string}
 */
NeuronalNetworkException.prototype.toString = function () {
    return this.name + ': "' + this.message + '"';
};