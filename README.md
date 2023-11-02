# minimal-footlight-search-widget

Instructions for adding the HTML to display this search widget:

Add script and CSS to head
```
<script defer="defer" src="https://minimal-footlight-search-widget.s3.ca-central-1.amazonaws.com/v2/dist/index.js"></script>
<link href="https://minimal-footlight-search-widget.s3.ca-central-1.amazonaws.com/v2/dist/index.css" rel="stylesheet">
```

Add this div to your webpage body
```
<div id="minimal-footlight-search-widget" 
     data-api="api.footlight.io" 
     data-calendar="" 
     data-locale="fr"
     data-event-url="" 
     data-org-url="" 
     data-search-events-url="" 
     data-search-orgs-url=""
     >
</div>
```
### Parameters
- **data-calendar** is the id of your calendar. 
- **data-locale** is the language of "fr" or "en".
- **data-event-url** is the url on your website for event details. The UUID of the event is added to the end of this URL.   
- **data-org-url** is the url on your website for organization details. The UUID of the organization is added to the end of this URL. If this parameter is not present then the widget UI will not display the Organization tab.     
- **data-search-events-url** is the url to display event seach results. The search query is added to the end of this URL. 
- **data-search-orgs-url** is the url to display organization search results.  The search query is added to the end of this URL.
  
  
