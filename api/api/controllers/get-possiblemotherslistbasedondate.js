module.exports = {


    friendlyName: 'Get list of possible mothers based on date',


    description: 'Get list of possible mothers based on a specific date.',


    inputs: {
        DateIn: {
            description: 'The date to use to search for possible mothers.',
            type: 'Date',
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
        var possibleMothersList = await sails.sendNativeQuery('call GetPossibleMothersBasedOnDate($1)', [inputs.DateIn]);
        if (possibleMothersList.rows[0].length === 0) {
            return exits.notFound({
                message: 'Found no possible mothers for date:' + inputs.DateIn,
            });
        } else {
            return exits.success({
                message: 'Possible mothers were found for date: ' + inputs.DateIn,
                data: possibleMothersList.rows[0]
            });
        }
    }
};