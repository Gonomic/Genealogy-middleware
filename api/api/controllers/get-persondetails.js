/* eslint-disable linebreak-style */
/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get details of Person',


    description: 'Get details for a certain person id.',


    inputs: {
        person: {
            description: 'The ID of the person for whome to get the details for.',
            type: 'number',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Person was found',
            responseType: ''
        },

        notFound: {
            description: 'No details were found for the person with this ID.',
            responseType: 'notFound'
        }

    },


    //fn: async function({ id: personId }) {
    fn: async function(inputs, exits) {
        var person = await sails.sendNativeQuery('call GetPersonDetails($1)', [inputs.person]);
        if (person.rows[0].length === 0) {
            return exits.notFound({
                message: 'Person not found!'
            });
        } else {
            return exits.success({
                message: 'Person was found',
                data: person.rows[0][0]
            });
        }
    }


};