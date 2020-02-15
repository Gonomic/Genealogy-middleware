module.exports = {


    friendlyName: 'Get list of possible fathers based on date',


    description: 'Get list of possible fathers taking as starting point a specific date.',


    inputs: {
        DateIn: {
            description: 'The date based on which to search for possible fathers.',
            type: 'string',
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
        var possibleFathersList = await sails.sendNativeQuery('call GetPossibleFathersBasedOnDate($1)', [inputs.DateIn]);
        if (possibleFathersList.rows[0].length === 0) {
            return exits.notFound({
                message: 'Found no possible fathers for date: ' + inputs.DateIn,
            });
        } else {
            return exits.success({
                message: 'Possible fathers were found for date: ' + inputs.DateIn,
                data: possibleFathersList.rows[0]
            });
        }
    }
};