/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get list of possible partners',


    description: 'Get list of possible partners for the person whos PersonsId is givven.',


    inputs: {
        PersonId: {
            description: 'The id of the person to lookup possible partners for.',
            type: 'number',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Possible partners were found',
            responseType: ''
        },

        notFound: {
            description: 'No possible partners were found.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var possiblePartnersList = await sails.sendNativeQuery('call GetPossiblePartners($1)', [inputs.PersonId]);
        if (possiblePartnersList.rows[0].length === 0) {
            return exits.notFound({
                message: 'Found no possible partners for person with id:' + inputs.PersonId,
            });
        } else {
            return exits.success({
                message: 'Possible partners were found for person with id: ' + inputs.PersonId,
                data: possiblePartnersList.rows[0]
            });
        }
    }
};