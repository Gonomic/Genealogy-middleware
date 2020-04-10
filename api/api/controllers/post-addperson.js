/* eslint-disable indent */
module.exports = {


    friendlyName: 'Post to add a person',


    description: 'Post a record to the person table and, if required, also records to the relations table for father, mother and partner of the person.',


    inputs: {
        PersonID: {
            description: 'The Id of the person to add.',
            type: 'number',
            required: false,
            allowNull: true
        },
        PersonGivvenName: {
            description: 'The given name of the person to add.',
            type: 'string',
            required: true
        },
        PersonFamilyName: {
            description: 'The family name of the person to add.',
            type: 'string',
            required: true
        },
        PersonDateOfBirth: {
            description: 'The date of birth of the person to add.',
            type: 'string',
            required: true
        },
        PersonPlaceOfBirth: {
            description: 'The birth place of the person to add.',
            type: 'string',
            required: true
        },
        PersonDateOfDeath: {
            description: 'The death date of the person to add.',
            type: 'string',
            required: false,
            allowNull: true
        },
        PersonPlaceOfDeath: {
            description: 'The place of death of the person to add.',
            type: 'string',
            required: false,
            allowNull: true
        },
        PersonIsMale: {
            description: 'The gender of the person to add.',
            type: 'boolean',
            required: true
        },
        MotherID: {
            description: 'The ID for the person-s Mother.',
            type: 'string',
            required: false,
            allowNull: true
        },
        FatherID: {
            description: 'The ID for the person-s Father.',
            type: 'string',
            required: false,
            allowNull: true
        },
        PartnerID: {
            description: 'The ID for the person-s Partner.',
            type: 'string',
            required: false,
            allowNull: true
        },
    },


    exits: {

        success: {
            description: 'Person was added.',
            responseType: ''
        },

        noSuccess: {
            description: 'Person was NOT added.',
            responseType: 'notFound'
        },

        notExecuted: {
            description: 'Person was NOT added.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var actionResult = await sails.sendNativeQuery('call AddPerson($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
            inputs.PersonID,
            inputs.PersonGivvenName,
            inputs.PersonFamilyName,
            inputs.PersonDateOfBirth,
            inputs.PersonPlaceOfBirth,
            inputs.PersonDateOfDeath,
            inputs.PersonPlaceOfDeath,
            inputs.PersonIsMale,
            inputs.MotherID,
            inputs.FatherID,
            inputs.PartnerID
        ]);
        if (actionResult.rows[0].length === 0) {
            console.log('Sending transaction to DB server: no value returned (server not reacheable?');
            return exits.notExecuted({
                message: 'Person was not added',
            });
        } else {
            if (actionResult.rows[0][0].Result === 'NOK') {
                console.log('Sending transaction to DB server: value returned (NOK)');
                return exits.noSuccess({
                    message: 'Person was NOT added',
                    data: actionResult.rows[0]
                });
            } else {
                console.log('Sending transaction to DB server: value returned (success)');
                return exits.success({
                    message: 'Person was added ',
                    data: actionResult.rows[0]
                });
            }
        }
    }
};