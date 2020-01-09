/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get familytree',


    description: 'Get  familytree (ancestors, children and facultatively also partners) for a certain person id.',


    inputs: {
        person: {
            description: 'The ID of the person for whome to get the familytree.',
            type: 'number',
            required: true
        },
        GenerationsToGoUp: {
            description: 'Number of (ancestor) generations to get.',
            type: 'number',
            required: true
        },
        GenerationsToGoDown: {
            description: 'Number of (child) generations to get.',
            type: 'number',
            required: true
        },
        IncludePartners: {
            description: 'Whether or not to include parners in the familytree.',
            type: 'boolean',
            required: true
        },

    },


    exits: {

        success: {
            description: 'Familytree was found',
            responseType: ''
        },

        notFound: {
            description: 'No familytree was found for the person with this ID.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var FamilyTree = await sails.sendNativeQuery('call GetFamilyTree($1, $2, $3, $4)', [inputs.person, inputs.GenerationsToGoUp, inputs.GenerationsToDown, inputs.IncludePartners]);
        if (FamilyTree.rows[0].length === 0) {
            return exits.notFound({
                message: 'Familytree was not found!'
            });
        } else {
            return exits.success({
                message: 'Familytree was found',
                data: FamilyTree.rows[0]
            });
        }
    }


};