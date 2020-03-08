/* eslint-disable indent */
module.exports = {


    friendlyName: 'Remove a Person',


    description: 'Based on a givven PersonID, MotherID, FatherID and PartnerID remove a person and his/her parents and partner form the database.',


    inputs: {
        PersonID: {
            description: 'The Id of the Person to be removed from the parent.',
            type: 'number',
            required: true
        },
        MotherID: {
            description: 'The id of the Mother to be removed from the Person.',
            type: 'number',
            required: false,
            allowNull: true
        },
        FatherID: {
            description: 'The id of the Father to be removed from the Person.',
            type: 'number',
            required: false,
            allowNull: true
        },
        PartnerID: {
            description: 'The id of the Partner to be removed from the Person.',
            type: 'number',
            required: false,
            allowNull: true
        },
        Timestamp: {
            description: 'The timestamp of when the record in the database was added or last changed.',
            type: 'string',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Person was removed',
            responseType: ''
        },

        noSuccess: {
            description: 'Person was NOT removed from parent.',
            responseType: ''
        },

        notExecuted: {
            description: 'Person was NOT removed from parent.',
            responseType: 'notFound'
        }


    },


    fn: async function(inputs, exits) {
        var actionResult = await sails.sendNativeQuery('call deletePerson($1, $2, $3, $4, $5)', [inputs.PersonID, inputs.MotherID, inputs.FatherID, inputs.ParentID, inputs.Timestamp]);
        if (actionResult.rows[0].length === 0) {
            return exits.notExecuted({
                message: 'Person' + inputs.PersonID + ' was not deleted'
            });
        } else {
            switch (actionResult.rows[0][0].Result) {
                case 'Person does not exist':
                    return exits.noSuccess({
                        message: 'Person ' + inputs.PersonID + ' was not deleted',
                        data: actionResult.rows[0]
                    });
                case 'Relation removed':
                    return exits.success({
                        message: 'Person' + inputs.PersonID + ' was deleted',
                        data: actionResult.rows[0]
                    });
            }
        }
    }
};