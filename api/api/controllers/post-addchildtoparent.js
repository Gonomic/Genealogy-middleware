/* eslint-disable indent */
module.exports = {


    friendlyName: 'Post to add a child to a parrent',


    description: 'Post a record to the relations table in the humans schema in order to add a child to a parent.',


    inputs: {
        childId: {
            description: 'The Id of the child added to the parent.',
            type: 'number',
            required: true
        },
        parentId: {
            description: 'The object holding the childId, parentId and parentGender.',
            type: 'number',
            required: true
        }
    },


    exits: {

        success: {
            description: 'Child was added to parent',
            responseType: ''
        },

        noSuccess: {
            description: 'Chils was NOT added to parent.',
            responseType: 'notFound'
        },

        notExecuted: {
            description: 'Chils was NOT added to parent.',
            responseType: 'notFound'
        }


    },


    fn: async function(inputs, exits) {
        var actionResult = await sails.sendNativeQuery('call AddChildToParent($1, $2)', [inputs.childId, inputs.parentId]);
        if (actionResult.rows[0].length === 0) {
            return exits.notExecuted({
                message: 'Child ' + inputs.childId + ' was not added to parent ' + inputs.parentId,
            });
        } else {
            if (actionResult.rows[0][0].Result === 'NOK') {
                return exits.noSuccess({
                    message: 'Child ' + inputs.childId + ' was NOT added to parent ' + inputs.parentId,
                    data: actionResult.rows[0]
                });
            } else {
                return exits.success({
                    message: 'Child ' + inputs.childId + ' was added to parent ' + inputs.parentId,
                    data: actionResult.rows[0]
                });
            }
        }
    }
};