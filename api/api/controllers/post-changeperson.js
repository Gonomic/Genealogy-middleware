module.exports = {


    friendlyName: 'Change data of a person',


    description: 'Change the record of the person and, if required, also change records in the relations table for father, mother and partner of the person.',


    inputs: {
        PersonID: {
            description: 'The Id of the person to change.',
            type: 'number',
            required: true
        },
        PersonGivenName: {
            description: 'The given name of the person to change.',
            type: 'string',
            required: true
        },
        PersonFamilyName: {
            description: 'The family name of the person to change.',
            type: 'string',
            required: true
        },
        PersonDateOfBirth: {
            description: 'The date of birth of the person to change.',
            type: 'string',
            required: true
        },
        PersonPlaceOfBirth: {
            description: 'The birth place of the person to change.',
            type: 'string',
            required: true
        },
        PersonDateOfDeath: {
            description: 'The death date of the person to change.',
            type: 'string',
            required: true
        },
        PersonPlaceOfDeath: {
            description: 'The place of death of the person to change.',
            type: 'string',
            required: true
        },
        PersonIsMale: {
            description: 'The gender of the person to change.',
            type: 'boolean',
            required: true
        },
        MotherID: {
            description: 'The ID for the person-s Mother.',
            type: 'string',
            required: true
        },
        FatherID: {
            description: 'The ID for the person-s Father.',
            type: 'string',
            required: true
        },
        PartnerID: {
            description: 'The ID for the person-s Partner.',
            type: 'string',
            required: true
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
        var actionResult = await sails.sendNativeQuery('call ChangePerson($1, $2, $3, $4, $5, $6, $7, $8)', [
            inputs.PersonID,
            inputs.PersonGivenName,
            inputs.PersonFamilyName,
            inputs, PersonDateOfBirth,
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
                message: 'Person ' + inputs.PersonID + ' was not changed',
            });
        } else {
            if (actionResult.rows[0][0].Result === 'NOK') {
                return exits.noSuccess({
                    message: 'Person ' + inputs.PersonID + ' was NOT changed',
                    data: actionResult.rows[0]
                });
            } else {
                return exits.success({
                    message: 'Person ' + inputs.PersonID + ' was changed ',
                    data: actionResult.rows[0]
                });
            }
        }
    }
};