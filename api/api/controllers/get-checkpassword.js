/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get CheckPassword',


    description: 'Check is password is correct.',


    inputs: {
        userId: {
            description: 'The Id of the person for whome to do the password check for.',
            type: 'number',
            required: true
        },
        Wachtwoord: {
            description: 'The pssword of the user to check for.',
            type: 'string',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Password checked',
            responseType: ''
        },

        notFound: {
            description: 'No person was found to check the password for.',
            responseType: 'notFound'
        }

    },


    //fn: async function({ id: personId }) {
    fn: async function(inputs, exits) {
        var father = await sails.sendNativeQuery('call CheckPassword($1, $2)', [inputs.userId, inputs.Wachtwoord]);
        if (father.rows[0].length === 0) {
            return exits.notFound({
                message: 'No person found to check the password for!'
            });
        } else {
            return exits.success({
                message: 'Pasword was checked',
                data: father.rows[0][0]
            });
        }
    }
};