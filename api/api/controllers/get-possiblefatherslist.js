/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get list of possible fathers',


    description: 'Get list of possible fathers for a person of which PersonsId is givven.',


    inputs: {
        PersonId: {
            description: 'The id of the person to lookup possible fathers for.',
            type: 'number',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Possible fathers were found',
            responseType: ''
        },

        notFound: {
            description: 'No possible fathers were found.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var possibleFathersList = await sails.sendNativeQuery('call GetPossibleFathers($1)', [inputs.PersonId]);
        if (possibleFathersList.rows[0].length === 0) {
            return exits.notFound({
                message: 'Found no possible fathers for person with id:' + inputs.PersonId,
            });
        } else {
            return exits.success({
                message: 'Possible fathers were found for person with id: ' + inputs.PersonId,
                data: possibleFathersList.rows[0]
            });
        }
    }
};