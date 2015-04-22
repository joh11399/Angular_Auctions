package msse_auctions

import grails.plugin.springsecurity.annotation.Secured

class LoginRestController {

    def springSecurityService

    static allowedMethods = [index: 'GET']

    @SuppressWarnings("GroovyUnusedDeclaration")
    static responseFormats = ['json', 'xml']

    @Secured('permitAll')
    def index() {
        def username = ""
        def account = springSecurityService.currentUser as Account
        try {
            username = account.username
        }catch(ex){}

        response.status = 201;

        //when using  .query()  in angular, it expects an array to be returned...
        render(contentType: 'text/json') {
            [
            [
                'username': username
            ]
            ]
        }
    }
}