/* eslint-disable indent */
module.exports = {


    friendlyName: 'Remove a child from a parent',


    description: 'Delete the right recor from the relations table in the humans schema in order to remove a child from a parent.',


    inputs: {
        childId: {
            description: 'The Id of the child to be removed from the parent.',
            type: 'number',
            required: true
        },
        parentId: {
            description: 'The id of the parent to remove the child from.',
            type: 'number',
            required: true
        }
    },


    exits: {

        success: {
            description: 'Child was removed from parent',
            responseType: ''
        },

        noSuccess: {
            description: 'Chils was NOT removed from parent.',
            responseType: ''
        },

        notExecuted: {
            description: 'Chils was NOT removed from parent.',
            responseType: 'notFound'
        }


    },


    fn: async function(inputs, exits) {
        var actionResult = await sails.sendNativeQuery('call RemoveChildFromParent($1, $2)', [inputs.childId, inputs.parentId]);
        if (actionResult.rows[0].length === 0) {
            return exits.notExecuted({
                message: 'Child ' + inputs.childId + ' was not removed from parent ' + inputs.parentId,
            });
        } else {
            switch (actionResult.rows[0][0].Result) {
                case 'Parent does not exist':
                    return exits.noSuccess({
                        message: 'Child ' + inputs.childId + ' was NOT removed from parent ' + inputs.parentId,
                        data: actionResult.rows[0]
                    });
                case 'No existing relation':
                    return exits.noSuccess({
                        message: 'Child ' + inputs.childId + ' was NOT removed from parent ' + inputs.parentId,
                        data: actionResult.rows[0]
                    });
                case 'Relation not removed':
                    return exits.noSuccess({
                        message: 'Child ' + inputs.childId + ' was NOT removed from parent ' + inputs.parentId,
                        data: actionResult.rows[0]
                    });
                case 'Relation removed':
                    return exits.success({
                        message: 'Child ' + inputs.childId + ' was removd from parent ' + inputs.parentId,
                        data: actionResult.rows[0]
                    });
            }
        }
    }
};