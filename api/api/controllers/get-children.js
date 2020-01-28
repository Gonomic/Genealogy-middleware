/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get children',


    description: 'Get all children with their partner from one parent.',


    inputs: {
        ParentIn: {
            description: 'The id of the parrent whos children to find.',
            type: 'number',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Children were found from this parrent',
            responseType: ''
        },

        notFound: {
            description: 'No children were found from this parrent.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var ListOfChildren = await sails.sendNativeQuery('call GetAllChildrenWithPartnerFromOneParent($1)', [inputs.ParentIn]);
        if (ListOfChildren.rows[0].length === 0) {
            return exits.notFound({
                message: 'Found no children from person with id:' + inputs.ParentIn,
            });
        } else {
            return exits.success({
                message: 'Found children from person with id: ' + inputs.ParentIn,
                data: ListOfChildren.rows[0]
            });
        }
    }
};