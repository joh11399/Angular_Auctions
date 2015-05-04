package msse_auctions

import geb.spock.GebSpec
import grails.plugin.remotecontrol.RemoteControl
import msse_auctions.pages.ListingDetailPage
import msse_auctions.pages.ListingEditPage
import msse_auctions.pages.ListingsPage
import spock.lang.Stepwise

@Stepwise
class ListingFunctionalSpec extends GebSpec {

    def remote = new RemoteControl()

    def 'display listing details'(){
        when:
        to ListingsPage

        //TODO  finish this....

        then:
        1==1
    }

    def 'create listing'(){
        when:
        to ListingsPage


        loginBtn.click()
        loginUsername.value("me")
        loginPassword.value("abcd1234")
        loginSubmitBtn.click()


        then:
        waitFor{ createListingBtn.click() }
        at ListingEditPage

        when:
        listingName.value('newListingName')
        listingDescription.value('newListingDescription')

        def today = new Date()
        listingStartDate.value(today.format('MM/DD/YYYY'))
        listingDays.value('2')
        listingStartingPrice.value('25.00')
        listingDeliverOption.value('US Only')
        listingSaveBtn.click()

        then:
        at ListingsPage
        $('body').text().indexOf('newListingName')!=-1
    }

    def 'update listing'(){
        when:
        def listingId = remote {
            Listing.findByName('newListingName').id
        }

        then:
        waitFor{ $('#listingName'+listingId).click() }
        at ListingDetailPage
        waitFor { listingEditBtn.click() }

        when:
        at ListingEditPage
        listingDeliverOption.value('Worldwide')
        listingSaveBtn.click()

        then:
        at ListingsPage
        waitFor{ $('#listingName'+listingId).click() }

        at ListingDetailPage
        listingDeliverOption.text() == 'Worldwide'

    }

    def 'delete listing'(){


    }

/*

    TODO   remove these (after they've all been replaced)
       these are the GSP page functional tests
       they need to be replaced with angular tests


    def "listing index displays bid for OPEN listings and rate buyer/seller for COMPLETED listing"() {
    when:
    to ListingIndexPage, completedListingsCheckbox: 'on'

    then:
    int i=0
    listing_timeRemaining.each() {
        if (it.text() == 'completed') {
            $('.bidLink', i).css('display') == 'none'
            $('.rateSellerLink', i).css('display') == 'block'
            $('.rateBuyerLink', i).css('display') == 'block'
        }
        else{
            $('.bidLink', i).css('display') == 'block'
            $('.rateSellerLink', i).css('display') == 'none'
            $('.rateBuyerLink', i).css('display') == 'none'
        }
        i++
    }
    }

    def 'listing create page is not accessible to users who are not logged in' () {
    when:
    to ListingCreatePage

    then:
    $('body').text().toString().indexOf('Please Login')!=-1

    when:
    to LoginPage
    login('me', 'abcd1234')
    to ListingCreatePage

    then:
    $('body').text().toString().indexOf('Please Login')==-1
    }

    def 'listing create page sets the seller as the account logged in'() {
    when:
    to ListingCreatePage

    then:
    sellerLbl.text() == 'Me Test'
    seller.value() == '1'
    }
*/
}