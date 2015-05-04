package msse_auctions

import geb.spock.GebSpec
import grails.plugin.remotecontrol.RemoteControl
import spock.lang.Ignore
import spock.lang.Stepwise

@Ignore
@Stepwise
class ReviewFunctionalSpec extends GebSpec {

    def remote = new RemoteControl()


    /*

    TODO   remove these (after they've all been replaced)
           these are the GSP page functional tests
           they need to be replaced with angular tests

    def "displays review Edit fields with listing, reviewer, reviewee, and reviewOf populated"() {
        given:
        to LoginPage
        login('me', 'abcd1234')

        when:
        to ReviewCreatePage, listingID: 1

        then:
        //the following fields should not be changed once the Edit page is opened
        listingLbl.text() == 'testCompleted'
        listing.value() == '1'
        reviewerLbl.text() == 'Me Test'
        reviewer.value() == '1'
        revieweeLbl.text() == 'Test 2'
        reviewee.value() == '2'
        reviewOfLbl.text() == 'Buyer'
        reviewOf.value() == 'Buyer'

        $('body').text().toString().indexOf("Not authorized to submit a review for Listing ID 1") == -1
    }


    def "does not display the review Edit page for unauthorized users"() {
        when:
        to ReviewCreatePage, listingID: 3

        then:
        $('body').text().toString().indexOf("Not authorized to submit a review for Listing ID 3") != -1
    }
*/
}