/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get father',


    description: 'Get father id and name for a certain person id.',


    inputs: {
        person: {
            description: 'The ID of the person for whome to get the father for.',
            type: 'number',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Father was found',
            responseType: ''
        },

        notFound: {
            description: 'No father was found for the person with this ID.',
            responseType: 'notFound'
        }

    },


    //fn: async function({ id: personId }) {
    fn: async function(inputs, exits) {
        var father = await sails.sendNativeQuery('call GetFather($1)', [inputs.person]);
        if (father.rows[0].length === 0) {
            return exits.notFound({
                message: 'Father not found!'
            });
        } else {
            return exits.success({
                message: 'Father was found',
                data: father.rows[0][0]
            });
        }
    }


};