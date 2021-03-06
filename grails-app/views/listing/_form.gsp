<%@ page import="msse_auctions.Account; msse_auctions.Listing" %>



<div class="fieldcontain ${hasErrors(bean: listingInstance, field: 'seller', 'error')} required">
    <label for="seller">
        <g:message code="listing.seller.label" default="Seller" />
    </label>
    <label id="sellerLbl" style="text-align: left; cursor: default;">${listingInstance?.seller?.name}</label>
    <input type="hidden" id="seller" name="seller.id" value="${listingInstance?.seller?.id}" />
</div>

<div class="fieldcontain ${hasErrors(bean: listingInstance, field: 'name', 'error')} required">
    <label for="name">
        <g:message code="listing.name.label" default="Name" />
        <span class="required-indicator">*</span>
    </label>
    <g:textField name="name" required="" value="${listingInstance?.name}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: listingInstance, field: 'description', 'error')} required">
    <label for="description">
        <g:message code="listing.description.label" default="Description" />
        <span class="required-indicator">*</span>
    </label>
    <g:textField name="description" required="" value="${listingInstance?.description}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: listingInstance, field: 'startDate', 'error')} required">
    <label for="startDate">
        <g:message code="listing.startDate.label" default="Start Date" />
        <span class="required-indicator">*</span>
    </label>
    <g:datePicker name="startDate" precision="day"  value="${listingInstance?.startDate}"  />

</div>

<div class="fieldcontain ${hasErrors(bean: listingInstance, field: 'days', 'error')} required">
    <label for="days">
        <g:message code="listing.days.label" default="Days" />
        <span class="required-indicator">*</span>
    </label>
    <g:textField name="days" precision="day"  value="${listingInstance?.days}"  />

</div>

<div class="fieldcontain ${hasErrors(bean: listingInstance, field: 'startingPrice', 'error')} required">
    <label for="startingPrice">
        <g:message code="listing.startingPrice.label" default="Starting Price" />
        <span class="required-indicator">*</span>
    </label>
    <g:textField name="startingPrice" required="" value="${listingInstance?.startingPrice}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: listingInstance, field: 'deliverOption', 'error')} required">
    <label for="deliverOption">
        <g:message code="listing.deliverOption.label" default="Deliver Option" />
        <span class="required-indicator">*</span>
    </label>
    <g:select name="deliverOption" from="${listingInstance.constraints.deliverOption.inList}" required="" value="${listingInstance?.deliverOption}" valueMessagePrefix="listing.deliverOption"/>
</div>


