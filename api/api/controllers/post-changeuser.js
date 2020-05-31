/* eslint-disable indent */
module.exports = {


    friendlyName: 'Change data of a user',


    description: 'Change the record of a specific user.',

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
            description: 'The givven name of the user to add.',
            type: 'string',
            required: true
        },
        UserFamilyName: {
            description: 'The family name of the user to add.',
            type: 'string',
            required: true
        },
        UserEmailAdress: {
            description: 'The email adress of the user to add.',
            type: 'string',
            required: true
        },
        Wachtwoord: {
            description: 'The pssword of the user to add.',
            type: 'string',
            required: true
        },
    },

    exits: {

        success: {
            description: 'User was changed.',
            responseType: ''
        },

        noSuccess: {
            description: 'User was NOT changed.',
            responseType: 'notFound'
        },

        notExecuted: {
            description: 'User was NOT changed.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var actionResult = await sails.sendNativeQuery('call ChangeUser($1, $2, $3, $4, $5, $6)', [
            inputs.UserID,
            inputs.UserName,
            inputs.UserGivvenName,
            inputs.UserFamilyName,
            inputs.UserEmailAdress,
            inputs.userWachtwoord
        ]);
        if (actionResult.rows[0].length === 0) {
            return exits.notExecuted({
                message: 'User was not changed',
            });
        } else {
            if (actionResult.rows[0][0].Result === 'NOK') {
                return exits.noSuccess({
                    message: 'User was NOT changed',
                    data: actionResult.rows[0]
                });
            } else {
                return exits.success({
                    message: 'User was changed ',
                    data: actionResult.rows[0]
                });
            }
        }
    }
};