/* eslint-disable indent */
module.exports = {


    friendlyName: 'Post to add a user',


    description: 'Post a record to the users table.',


    inputs: {
        UserID: {
            description: 'The Id of the user to add.',
            type: 'number',
            required: false,
            allowNull: true
        },
        UserName: {
            description: 'The user name of the user to add.',
            type: 'string',
            required: true
        },
        UserGivvenName: {
            description: 'The given name of the user to add.',
            type: 'string',
            required: true
        },
        UserFamilyName: {
            description: 'The family name of the user to add.',
            type: 'string',
            required: true
        },
        Wachtwoord: {
            description: 'The password of the user to add.',
            type: 'string',
            required: true
        }
    },


    exits: {

        success: {
            description: 'User was added.',
            responseType: ''
        },

        noSuccess: {
            description: 'User was NOT added.',
            responseType: 'notFound'
        },

        notExecuted: {
            description: 'User was NOT added.',
            responseType: 'notFound'
        }
    },


    fn: async function(inputs, exits) {
        var actionResult = await sails.sendNativeQuery('call AddUser($1, $2, $3, $4, $5)', [
            inputs.UserID,
            inputs.UserName,
            inputs.UserGivvenName,
            inputs.UserFamilyName,
            inputs.Wachtwoord
        ]);
        if (actionResult.rows[0].length === 0) {
            console.log('Sending transaction to DB server: no value returned (server not reacheable?');
            return exits.notExecuted({
                message: 'User was not added',
            });
        } else {
            if (actionResult.rows[0][0].Result === 'NOK') {
                console.log('Sending transaction to DB server: value returned (NOK)');
                return exits.noSuccess({
                    message: 'User was NOT added',
                    data: actionResult.rows[0]
                });
            } else {
                console.log('Sending transaction to DB server: value returned (success)');
                return exits.success({
                    message: 'User was added ',
                    data: actionResult.rows[0]
                });
            }
        }
    }
};