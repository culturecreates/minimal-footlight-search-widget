# minimal-footlight-search-widget

Instructions for adding the HTML to display this search widget:

Add script and CSS to head
```
<script defer="defer" src="https://minimal-footlight-search-widget.s3.ca-central-1.amazonaws.com/v3/dist/index.js"></script>
<link href="https://minimal-footlight-search-widget.s3.ca-central-1.amazonaws.com/v3/dist/index.css" rel="stylesheet">
```

Add this div to your webpage body
```
<div id="minimal-footlight-search-widget" 
     data-api="api.footlight.io" 
     data-calendar="" 
     data-locale="fr"
     data-event-url="" 
     data-search-events-url="" 
     >
</div>
```
### Parameters
- **data-api** is the api domain to call.
- **data-calendar** is the id of your calendar. 
- **data-locale** is the language of "fr" or "en".
- **data-event-url** is the url on your website for event details. The UUID of the event is added to the end of this URL.   
- **data-search-events-url** is the url to display event seach results. The search query is added to the end of this URL. 

### Optional Parameters
- **data-org-url** is the url on your website for organization details. The UUID of the organization is added to the end of this URL. If this parameter is not present then the widget UI will not display the Organization tab.
- **data-search-orgs-url** is the url to display organization search results.  The search query is added to the end of this URL.
- **data-search-panel** is to control how the search panel is displayed. Options are "inline" or "float". The default is "float".
- **data-search-events-filter** is the name value pair(s) for filtering ALL events. Example: "&region=1234&concept=4567&price-type=free"
  
  
## Steps to create new version
- Change S3 path in all workflows
- Update readme example to use the latest version
