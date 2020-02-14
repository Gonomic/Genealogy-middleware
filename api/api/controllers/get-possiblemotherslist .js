/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get list of possible mothers',


    description: 'Get list of possible mothers for a person of which PersonsId is givven.',


    inputs: {
        PersonId: {
            description: 'The id of the person to lookup possible mothers for.',
            type: 'number',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Possible mothers were found',
            responseType: ''
        },

        notFound: {
            description: 'No possible mothers were found.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var possibleMothersList = await sails.sendNativeQuery('call GetPossibleMothers($1)', [inputs.PersonId]);
        if (possibleMothersList.rows[0].length === 0) {
            return exits.notFound({
                message: 'Found no possible mothers for person with id:' + inputs.PersonId,
            });
        } else {
            return exits.success({
                message: 'Possible mothers were found for person with id: ' + inputs.PersonId,
                data: possibleMothersList.rows[0]
            });
        }
    }
};