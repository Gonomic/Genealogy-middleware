module.exports = {


    friendlyName: 'Change data of a person',


    description: 'Change the record of the person and, if required, also change records in the relations table for father, mother and partner of the person.',

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
            description: 'Person was changed.',
            responseType: ''
        },

        noSuccess: {
            description: 'Person was NOT changed.',
            responseType: 'notFound'
        },

        notExecuted: {
            description: 'Person was NOT changed.',
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
            return exits.notExecuted({
                message: 'Person was not changed',
            });
        } else {
            if (actionResult.rows[0][0].Result === 'NOK') {
                return exits.noSuccess({
                    message: 'Person was NOT changed',
                    data: actionResult.rows[0]
                });
            } else {
                return exits.success({
                    message: 'Person was changed ',
                    data: actionResult.rows[0]
                });
            }
        }
    }
};