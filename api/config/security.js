/* eslint-disable indent */
/**
 * Security Settings
 * (sails.config.security)
 *
 * These settings affect aspects of your app's security, such
 * as how it deals with cross-origin requests (CORS) and which
 * routes require a CSRF token to be included with the request.
 *
 * For an overview of how Sails handles security, see:
 * https://sailsjs.com/documentation/concepts/security
 *
 * For additional options and more information, see:
 * https://sailsjs.com/config/security
 */

module.exports.security = {

    /***************************************************************************
     *                                                                          *
     * CORS is like a more modern version of JSONP-- it allows your application *
     * to circumvent browsers' same-origin policy, so that the responses from   *
     * your Sails app hosted on one domain (e.g. example.com) can be received   *
     * in the client-side JavaScript code from a page you trust hosted on _some *
     * other_ domain (e.g. trustedsite.net).                                    *
     *                                                                          *
     * For additional options and more information, see:                        *
     * https://sailsjs.com/docs/concepts/security/cors                          *
     *                                                                          *
     ***************************************************************************/

    // cors: {
    //     allRoutes: true,
    //     // allowOrigins: '*',
    //     allowOrigins: [
    //         'https://dekknet.com',
    //         'https://localhost',
    //         'https://192.168.1.11',
    //         'https://dekknet.com:1001',
    //         'https://localhost:1001',
    //         'https://192.168.1.11:1001',
    //         'https://dekknet.com:1002',
    //         'https://localhost:1002',
    //         'https://192.168.1.11:1002',
    //         'https://dekknet.com:1337',
    //         'https://localhost:1337',
    //         'https://192.168.1.11:1337',
    //         'http://dekknet.com',
    //         'http://Localhost',
    //         'http://192.168.1.11',
    //         'http://dekknet.com:1001',
    //         'http://localhost:1001',
    //         'http://192.168.1.11:1001',
    //         'http://dekknet.com:1002',
    //         'http://Localhost:1002',
    //         'http://192.168.1.11:1002',
    //         'http://dekknet.com:1337',
    //         'http://localhost:1337',
    //         'http://192.168.1.11:1337'
    //     ],
    //     allowRequestMethods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    //     allowCredentials: true,
    //     allowRequestHeaders: 'content-type'
    // },


    /****************************************************************************
     *                                                                           *
     * By default, Sails' built-in CSRF protection is disabled to facilitate     *
     * rapid development.  But be warned!  If your Sails app will be accessed by *
     * web browsers, you should _always_ enable CSRF protection before deploying *
     * to production.                                                            *
     *                                                                           *
     * To enable CSRF protection, set this to `true`.                            *
     *                                                                           *
     * For more information, see:                                                *
     * https://sailsjs.com/docs/concepts/security/csrf                           *
     *                                                                           *
     ****************************************************************************/

    csrf: false

};