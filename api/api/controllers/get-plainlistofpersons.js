/* eslint-disable indent */
module.exports = {


    friendlyName: 'Get Plain list of Persons',


    description: 'Get  PlanListOfPersons (get list of persons with basic data based on a -Like- statement.',


    inputs: {
        NameInLike: {
            description: 'The string to use a base for searching people with an likewise sounding name.',
            type: 'string',
            required: true
        },
    },


    exits: {

        success: {
            description: 'Person(s) with an alike sounding name was (were) found',
            responseType: ''
        },

        notFound: {
            description: 'No person(s) with an alike sounding name was (were) found.',
            responseType: 'notFound'
        }

    },


    fn: async function(inputs, exits) {
        var PersonsToChooseFrom = await sails.sendNativeQuery('call GetPlainListOfPersons($1)', [inputs.NameInLike]);
        console.log('Name to look for: ' + inputs.NameInLike);
        if (PersonsToChooseFrom.rows[0].length === 0) {
            return exits.notFound({
                message: 'Found no alike sounding person(s) for searchstring:' + inputs.NameInLike,
            });
        } else {
            return exits.success({
                message: 'Alike sounding person(s) was (were) found for search string: ' + inputs.NameInLike,
                data: PersonsToChooseFrom.rows[1]
            });
        }
    }
};