/* eslint-disable indent */
/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': { view: 'pages/homepage' },
    'get /getFather': 'get-father',
    'get /getFamilyTree': 'get-familytree',
    'get /getPlainListOfPersons': 'get-plainlistofpersons',
    'get /getPersonDetails': 'get-persondetails',
    'get /getAllChildrenWithPartnerFromOneParent': 'get-children',
    'get /getPossibleChildren': 'get-possiblechildrenlist',
    'get /getPossibleFathers': 'get-possiblefatherslist',
    'get /getPossibleFathersBasedOnDate': 'get-possiblefatherslistbasedondate',
    'get /getPossibleMothers': 'get-possiblemotherslist',
    'get /getPossibleMothersBasedOnDate': 'get-possiblemotherslistbasedondate',
    'get /getPossiblePartners': 'get-possiblepartnerslist',
    'get /getPossiblePartnersBasedOnDate': 'get-possiblepartnerslistbasedondate',
    'post /postAddChildToParent': 'post-addChildToParent',
    'delete /deleteChildFromParent': 'delete-childfromparent',
    'delete /deletePerson': 'delete-person',
    'post /postAddPerson': 'post-addperson',
    'post /postChangePerson': 'post-changeperson'


    /***************************************************************************
     *                                                                          *
     * More custom routes here...                                               *
     * (See https://sailsjs.com/config/routes for examples.)                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the routes in this file, it   *
     * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
     * not match any of those, it is matched against static assets.             *
     *                                                                          *
     ***************************************************************************/


};