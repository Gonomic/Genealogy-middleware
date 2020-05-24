/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get familytree downwards',


    description: 'Get  familytree downwards (children and facultatively also partners) for a certain person id.',


    inputs: {
        PersonIdIn: {
            description: 'The ID of the person for whome to get the familytree.',
            type: 'number',
            required: true
        },
        GenerationsToGoDown: {
            description: 'Number of (child) generations to get.',
            type: 'number',
            required: true
        },
        LogingOn: {
            description: 'Whether or not to have the backend log the backend actions.',
            type: 'boolean',
            required: false
        },

    },


    exits: {

        success: {
            description: 'Familytree downwards persons were found',
            responseType: ''
        },

        notFound: {
            description: 'No familytree downwards was found for the person with this ID.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        if (inputs.LogingOn === undefined) {
            inputs.LogingOn = false;
        }
        var FamilyTree = await sails.sendNativeQuery('call GetFamilyTreeDownwards($1, $2, $3)', [inputs.PersonIdIn, inputs.GenerationsToGoDown, inputs.LogingOn]);
        // console.log('ReturnVal= ' + JSON.stringify(FamilyTree));
        if (FamilyTree.rows[0].length === 0) {
            return exits.notFound({
                message: 'Familytree NO persons were found downwards!'
            });
        } else {
            return exits.success({
                message: 'Familytree persons were found downwards!',
                data: FamilyTree.rows
            });
        }
    }


};