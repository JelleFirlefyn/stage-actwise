$=jQuery;

/* Add UTM info in specific location */
$( document ).ready(function() {

    //UTM tracking code to minfin button
    if($("#navigation .myminfin").length > 0){
    $("#navigation .myminfin").attr("href",$(".myminfin").attr("href")+"?utm_source="+document.title+"&utm_medium=Button_MMF");
    }
    
    // #INC0426923 UTM tracking code to JOBS header link
    if($('a[href^="https://www.jobfin.be"]').length > 0){
	
	target_groups = "undefined";
	/* 
	// only if we need to take the active target group in the drop down header menu
	if($('div.region-navigation div.item-list a.link-item.active-trail.active').length > 0){
		target_groups = $('div.region-navigation div.item-list a.link-item.active-trail.active').text().trim();
	}
        // clean up space and ?& character
	target_groups = target_groups.replace(/\s/g,"-");
        target_groups = target_groups.replace(/\?/g,"");
	target_groups = target_groups.replace(/\&/g,"");
        */
	// Else we do like the Minfin button
	target_groups = document.title
	
	$('a[href^="https://www.jobfin.be"]').attr("href",$('a[href^="https://www.jobfin.be"]').attr("href")+"?utm_source="+target_groups+"&utm_medium=jobs");
    }
});

/* #INC0328128 GA accordeon anchor custom event */
/*$( document ).ready(function() {
	// OnClick on all accordeon items
	$("div.field-name-field-qa div.field-name-field-question > a").click(function() {
		// check it is well an anchor
        if($(this).attr("href").split("#q").length > 1){
			
            var link_title = $(this).text().trim();
            link_title = link_title.replace(/\s/g,"-");
            link_title = link_title.replace(/\?/g,"");
            //link_title = encodeURIComponent(link_title);
			
			var str_shortlink=$("head link[rel=shortlink]").attr("href");
			var pathname = window.location.pathname;
			var nid= "???";

			// get nodeid
			if(str_shortlink){
				var t_shortlink = str_shortlink.split("/");
				if(t_shortlink && t_shortlink.length > 3){
					nid = t_shortlink[t_shortlink.length-1];
				}
			}
			
			//ga('send', 'event', 'Accordion-FAQ', 'click', link_title+' ('+nid+')', pathname);
                        ga('send', 'event', 'Accordion-FAQ', 'click', link_title+' ('+nid+')');
                        console.log("accordion"+link_title+" ("+nid+")"+pathname);			
        }
	});

});*/


/* #INC0334629 Add Emolytics in target pages (Tax-on-web) !!! CODE COMMENTED

var current_url=location.href;

var addTo_subNl="nl/E-services/Tax-on-web";
var addTo_subFr="fr/E-services/Tax-on-web";

var addTo_subNl2="nl/particulieren/belastingaangifte/aangifte";
var addTo_subFr2="fr/particuliers/declaration_impot/declaration";

var getsmily_id=null;

// Check if the path of target pages are part of current url
if (current_url && (current_url.indexOf(addTo_subNl) !== -1 || current_url.indexOf(addTo_subNl2) !== -1 )) {
	// We can set Emolytics for NL
	getsmily_id="3t7m8ppjhrn3k0q";

}else if (current_url && (current_url.indexOf(addTo_subFr) !== -1 || current_url.indexOf(addTo_subFr2) !== -1 ) ){
	// We can set Emolytics for FR
	getsmily_id="i3fjb1j6q554vi4";
}

if(getsmily_id != null){
	var gs=document.createElement("script");
	var gsf=document.getElementsByTagName("script")[0];
	gs.async=1;
	gs.src="https://cdn.emolytics.com/script/emolytics-widget.js";
	gsf.parentNode.insertBefore(gs,gsf);
}
*/

/*********** #INC0375436 *****************************/
$( document ).ready(function() {

$( "div.content_3_col_services_wrapper > h3" ).click(function() {
  $(this).toggleClass("reduce");
  $(this).next().toggle( "fast", function() {
    // Animation complete.
  });
});

/*
$( "div.content_3_col_left div.map_wrapper > h3" ).click(function() {
  $(this).toggleClass("reduce");
  $(this).next().toggle( "fast", function() {
    // Animation complete.
  });
});
*/

});

/* fix documents migration from gcloudbelgium to eservices #INC0407445 */
$( document ).ready(function() {  
	$(".region-content a[href*='gcloudbelgium.sharepoint.com']").each(function(){ 
	 aHref = this.href; 
	 newHref = "https://eservices.minfin.fgov.be/myminfin-web/pages/fisconet#!/document/"; 
	 splitHref = aHref.split('/') 
	 docRef= splitHref[splitHref.length-1]; 
	 this.href = newHref + docRef; 
	});

         
        /* #INC0477182 fix link to eservices with "#!" and or with badly inserted GA tag */
	/* fix documents migration from gcloudbelgium to eservices #INC0407445 */
        $(".region-content a[href*='eservices.minfin.fgov.be/myminfin-web/pages']").each(function(){
         aHref_eservices = this.href;
		 aHref_eservices_out = "https://eservices.minfin.fgov.be/myminfin-web/pages/fisconet";
         // Get token part that should begin with #! still the end of url
		 token_pattern = aHref_eservices.indexOf("#!");
		 if(token_pattern != -1){
			 token_str = aHref_eservices.substr(token_pattern+2);
			 //aHref_eservices_out = aHref_eservices.substr(0, token_pattern);
			 ga_pattern = aHref_eservices.indexOf("?_ga=");
			 ga_str="";
			 if(ga_pattern != -1){
				 // ga only, so remove token pattern that should be afterward				 
				 if(ga_pattern < token_pattern){
					ga_str = aHref_eservices.substr(ga_pattern,(token_pattern-ga_pattern));
					//aHref_eservices_out = aHref_eservices.substr(0, ga_str);
				 }
			 } 
			 aHref_eservices_out += token_str + ga_str
			 //console.log("link found :"+ aHref_eservices+"\n Token part (idx :"+token_pattern+") :"+token_str+"\n GA part (idx :"+ga_pattern+"-"+token_pattern+") :"+ga_str+" \n final result :"+aHref_eservices_out);
			 this.href = aHref_eservices_out;	 
		 }

        });

        /* #INC0578106 fix link to eservices FROM /myminfin-rest/finform/ TO myminfin-rest/finform/public/ */
        $(".region-content a[href*='eservices.minfin.fgov.be/myminfin-rest/finform']").each(function(){
            aHref_eservices2 = this.href;
			/* #INC0602783 don't fix correct url */
			if(aHref_eservices2.indexOf("finform/public") == -1 ){
				aHref_eservices2_out = aHref_eservices2.replace("finform", "finform/public");
				//console.log("from "+aHref_eservices2+" to "+aHref_eservices2_out);
				this.href = aHref_eservices2_out;
			}			
        });
});

/***** Injecting Matomo Cloud *****/ 
var matomoSiteId = '34'; 
var matomoConsent = ""; 
var matomoScript = document.createElement("script"); 

if (document.cookie.includes('\"matomo\":true') == true) {
  matomoConsent='_paq.push([\'setCookieConsentGiven\']);'
}

matomoScript.setAttribute("type","text/javascript"); 
matomoScript.innerHTML = 'var _paq = window._paq = window._paq || [];'+ 
'_paq.push([\'trackPageView\']);'+ 
'_paq.push([\'enableLinkTracking\']);'+ 
'_paq.push([\'requireCookieConsent\']);'+ 
matomoConsent + 
'(function() {'+ 
'var u="https://matomo.bosa.be/";'+ 
'_paq.push([\'setTrackerUrl\', u+\'matomo.php\']);'+ 
'_paq.push([\'setSiteId\', \''+matomoSiteId+'\']);'+ 
'var d=document, g=d.createElement(\'script\'), s=d.getElementsByTagName(\'script\')[0];'+ 
'g.type=\'text/javascript\'; g.async=true; g.src=\'//matomo.bosa.be/matomo.js\'; s.parentNode.insertBefore(g,s);'+ 
'})();';
document.head.appendChild(matomoScript); 

/***** Injecting Matomo Tag Manager *****/ 
var matomotagmanagerScript = document.createElement("script");
var matomotagmanagerContainer = "container_z2IHP0p5.js";

matomotagmanagerScript.setAttribute("type","text/javascript"); 
matomotagmanagerScript.innerHTML = "var _mtm = window._mtm = window._mtm || []; "+
"_mtm.push({\'mtm.startTime\': (new Date().getTime()), \'event\': \'mtm.Start\'});"+
"var d=document, g=d.createElement(\'script\'), s=d.getElementsByTagName(\'script\')[0];"+
"g.async=true; g.src=\'https://matomo.bosa.be/js/"+matomotagmanagerContainer+"\'; s.parentNode.insertBefore(g,s);";
document.head.appendChild(matomotagmanagerScript);

//injecting call to orejime popup 
$(document).ready(function(){											  
if(document.getElementById("manageConsent")){console.log("manageConsent btn found");document.getElementById("manageConsent").addEventListener("click", function() {  window.orejime.show();});}
});
 
