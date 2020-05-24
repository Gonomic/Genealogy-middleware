/* eslint-disable indent */
module.exports = {


    friendlyName: 'Tester',


    description: 'Tester.',


    inputs: {},


    exits: {

        success: {
            description: 'Tester: persons were found',
            responseType: ''
        },

        notFound: {
            description: 'Tester: no persons were found.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var TesterTree = await sails.sendNativeQuery('call tester()', []);
        console.log('ReturnVal= ' + JSON.stringify(TesterTree));
        if (TesterTree.rows[0].length === 0) {
            return exits.notFound({
                message: 'TesterTree NO persons were found downwards!'
            });
        } else {
            return exits.success({
                message: 'TesterTree persons were found downwards!',
                data: TesterTree.rows
            });
        }
    }


};