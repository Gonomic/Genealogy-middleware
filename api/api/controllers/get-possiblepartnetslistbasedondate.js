module.exports = {


    friendlyName: 'Get list of possible partners based on date',


    description: 'Get list of possible partners based on a specific date.',


    inputs: {
        DateIn: {
            description: 'The date used to find possible partners.',
            type: 'Date',
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
        var possiblePartnersList = await sails.sendNativeQuery('call GetPossiblePartnersBasedOnDate($1)', [inputs.DateIn]);
        if (possiblePartnersList.rows[0].length === 0) {
            return exits.notFound({
                message: 'Found no possible partners based on date: ' + inputs.DateIn,
            });
        } else {
            return exits.success({
                message: 'Possible partners were found based on date: ' + inputs.PersonId,
                data: possiblePartnersList.rows[0]
            });
        }
    }
};