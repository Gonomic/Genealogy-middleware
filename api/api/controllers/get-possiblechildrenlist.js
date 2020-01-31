/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get list of possible children',


    description: 'Get list of children who could ne the children of the person which PersonsId is givven.',


    inputs: {
        ParentId: {
            description: 'The id of the person to lookup possible children for.',
            type: 'number',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Possible children were found',
            responseType: ''
        },

        notFound: {
            description: 'No possible children were found.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var possibleChildrenList = await sails.sendNativeQuery('call GetPossibleChildren($1)', [inputs.ParentId]);
        if (possibleChildrenList.rows[0].length === 0) {
            return exits.notFound({
                message: 'Found no possible children for person with id:' + inputs.ParentId,
            });
        } else {
            return exits.success({
                message: 'Possible children were found for person with id: ' + inputs.ParentId,
                data: possibleChildrenList.rows[0]
            });
        }
    }
};