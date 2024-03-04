//hardcode filters @TODO get from input
var sdataset = '';
var sversion = '';
var sformat = '';
var sprojection = '';
var hasItems = false;
var jsondata;


document.addEventListener('DOMContentLoaded', function(){
let pagelanguage = document.documentElement.lang;
let requestURL = 'https://opendata.fin.belgium.be/download/JSON/config_' + pagelanguage.toUpperCase() + '.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.onload = function() {
  jsondata = request.response;
  fillFilters(jsondata);
  hasItems = renderData(jsondata, sdataset,sversion,sformat, sprojection );
  if (hasItems) {makeLikeATree();}  
}
request.send();
});


function fillFilters(obj) 
{	
// process the json to discover all possible unique values for each filter and update the select fields.

var datasets = new Map();
var versions = new Map();
var formats = new Map();
var projections = new Map();
var datasets_versions = new Map();
var datasets_formats = new Map();
var datasets_projections = new Map();

for (let i = 0, ds; ds = obj[i]; i++) {
	if (!datasets.has(ds.UUID)) {		
		if(ds.EPSG=="NA") { // tags datasets as not having a projection
			datasets.set(ds.UUID + "_noEPSG", ds.Name);
		}
		else {
			datasets.set(ds.UUID, ds.Name);
		}
		
		}
	if (!versions.has(ds.versionID)) {
		versions.set(ds.versionID, ds.versionName);
		}
	if (!formats.has(ds.Format)) {
		formats.set(ds.Format, ds.NameFormat);
		}
	if (!projections.has(ds.EPSG)) {
		if(ds.EPSG!="NA") {
		projections.set(ds.EPSG, ds.ProjectionName);
		}
		}
	if (!datasets_versions.has(ds.UUID)) {	
		var versionsSet = new Set()
		versionsSet.add(ds.versionID)
		datasets_versions.set(ds.UUID, versionsSet);
		}
	else {
		datasets_versions.get(ds.UUID).add(ds.versionID)
	}
	if (!datasets_formats.has(ds.UUID)) {	
		var formatsSet = new Set()
		formatsSet.add(ds.Format)
		datasets_formats.set(ds.UUID, formatsSet);
		}
	else {
		datasets_formats.get(ds.UUID).add(ds.Format)
	}
	if (!datasets_projections.has(ds.UUID)) {	
		var projectionsSet = new Set()
		projectionsSet.add(ds.EPSG)
		datasets_projections.set(ds.UUID, projectionsSet);
		}
	else {
		datasets_projections.get(ds.UUID).add(ds.EPSG)
	}
}


let datasetSelect = document.getElementById('dataset-select');
if (datasetSelect != undefined) {
  fillOptions(datasetSelect, datasets);
  sdataset = datasetSelect.value;
  fillAvailableOptions(datasets_versions,versions,sdataset,'version-select');
  fillAvailableOptions(datasets_formats,formats,sdataset,'format-select');
  fillAvailableOptions(datasets_projections,projections,sdataset,'projection-select');
datasetSelect.addEventListener('change', (event) => {
	let datasetSelect = document.getElementById('dataset-select');
    sdataset = datasetSelect.value;	
  	fillAvailableOptions(datasets_versions,versions,sdataset,'version-select');
  	fillAvailableOptions(datasets_formats,formats,sdataset,'format-select');
  	fillAvailableOptions(datasets_projections,projections,sdataset,'projection-select');
  	hasItems = renderData(jsondata, sdataset,sversion,sformat, sprojection );
      if (hasItems) {makeLikeATree();} 
});
}

let versionSelect = document.getElementById('version-select');

if (versionSelect != undefined) {
versionSelect.addEventListener('change', (event) => {
	let versionSelect = document.getElementById('version-select');
    sversion = versionSelect.value;
	hasItems = renderData(jsondata, sdataset,sversion,sformat, sprojection );
    if (hasItems) {makeLikeATree();}  
});
}
let formatSelect = document.getElementById('format-select');

if (formatSelect != undefined) {
formatSelect.addEventListener('change', (event) => {
	let formatSelect = document.getElementById('format-select');
    sformat = formatSelect.value;
	hasItems = renderData(jsondata, sdataset,sversion,sformat, sprojection );
    if (hasItems) {makeLikeATree();}  
});
}
let projectionSelect = document.getElementById('projection-select');

if (projectionSelect != undefined) {
projectionSelect.addEventListener('change', (event) => {
	let projectionSelect = document.getElementById('projection-select');
    sprojection = projectionSelect.value;
	hasItems = renderData(jsondata, sdataset,sversion,sformat, sprojection );
    if (hasItems) {makeLikeATree();}  
});

}
}

function fillAvailableOptions(datasets_options,options,selectedDataset,optionId) {
	let available_options = datasets_options.get(selectedDataset.replace('_noEPSG',''));
	let available_options_map = new Map();
	for (let option of available_options) {
		available_options_map.set(option,options.get(option));
	}
	let optionSelect = document.getElementById(optionId);
	fillOptions(optionSelect, available_options_map);
}

function fillOptions(selectElement, map) {
  if (selectElement != undefined) { 
  	while (selectElement.firstChild && (selectElement.firstChild != selectElement.lastChild)) {
  	    selectElement.removeChild(selectElement.lastChild);
  	  }
  	map.forEach(function(value, key) {	
  		const selectOpt = new Option(value, key);
  			selectElement.appendChild(selectOpt);	
  	})
  }
}

function renderData(obj, dataset, versionID, format, projection) 
{
	// If the dataset has no projection make sure to remove the tag from the UUID, to set projection to NA and to hide the projection filter
	let projectionSelect = document.getElementById('projection-select');
if (projectionSelect != undefined) {
	let projectionSelectLabel = projectionSelect.previousElementSibling;

	if (dataset.includes("_noEPSG")) { 
		dataset = dataset.replace("_noEPSG","");
		projection = "NA";
		projectionSelect.setAttribute("style","display:none;");
		projectionSelectLabel.setAttribute("style","display:none;");
	}
	else // make sure the "display:none" is removed for datasets that do have projections
	{
		projectionSelect.removeAttribute("style");
		projectionSelectLabel.removeAttribute("style");
		}
}		
	//build treeview html
	const tree = document.getElementById('kadplan');
  if ( tree != undefined ) {
	tree.innerHTML = '';
	//apply the filters blindly (assume always a single match?)	
	for (let i = 0, ds; ds = obj[i]; i++) {		
		if ((ds.UUID == dataset || dataset == '' ) & (ds.versionID == versionID || versionID == '') & (ds.Format == format || format == '') & (ds.EPSG == projection || projection == ''))  {
			for (let j = 0, dl; dl = ds.DistributionLinks[j]; j++) {
				const metaDataURL = ds.MetadataURL;
			    const key = Object.keys(dl)[0];				
				// if we don't have an existing masterLi with the right nis-code, create one
				let masterLi = document.getElementById('nis_'+dl[key].NISCode);				
				if (masterLi == null) {
					masterLi = document.createElement('li')
					const masterLiSpan = document.createElement('span');
					masterLi.setAttribute('role','treeitem');
					masterLi.setAttribute('aria-expanded','false');
					masterLi.setAttribute('id','nis_' + dl[key].NISCode);
					masterLiSpan.textContent = dl[key].PlaceName;
					masterLi.appendChild(masterLiSpan);				
					};		
				tree.appendChild(masterLi);	
				// now we need to add the subtree 
							
				for (let x = 0, ll; ll = dl[key].Links[x]; x++) {				
					const lkey = Object.keys(ll)[0];
					//check if we already have LI with matching nis code
					let secLi = document.getElementById('nis_'+ll[lkey].NISCode);
					if (secLi == null) {
						secLi = document.createElement('li');
						secLi.setAttribute('id','nis_'+ ll[lkey].NISCode);
						secLi.setAttribute('role','treeitem');
						secLi.setAttribute('aria-expanded','false');
						let secSpan = document.createElement('span');
						secSpan.textContent=ll[lkey].PlaceName
						secLi.appendChild(secSpan);
						var secUl = document.createElement('ul');						
						secUl.appendChild(secLi);
						masterLi.appendChild(secUl);
						
						var thirdUl = document.createElement('ul');
						secLi.appendChild(thirdUl);
					    }
						else {
						if (masterLi == secLi) {
						var thirdUl = document.createElement('ul');
						secLi.appendChild(thirdUl);
						}
						else 
						{
						var thirdUl = secLi.querySelector('ul');							
						}
						}
						 

					let thirdLi = document.createElement('li');
					thirdLi.setAttribute('role','none');
					const thirdA = document.createElement('a');
					thirdA.textContent = ds.Name + " | " + ds.versionName + " | " + ds.NameFormat + " | " + ds.ProjectionName;
					thirdA.href=ll[lkey].URL;
					thirdA.setAttribute('role','treeitem');
					thirdLi.appendChild(thirdA);
					const metaA = document.createElement('a');
          const metaSpan = document.createElement('span');
					metaSpan.textContent = "(i)";
					metaA.setAttribute('aria-label','metadata');
					metaA.setAttribute('class','metadata');
          metaA.appendChild(metaSpan);
					metaA.href= metaDataURL ;
					thirdLi.appendChild(metaA);
					thirdUl.appendChild(thirdLi);
									
					}					
				//tree.appendChild(masterLi);				
			 }		
			};
	  }
  }
	if (tree == undefined || tree.innerHTML == '')  {return false;} else {return true;}
	
}


function makeLikeATree() {
	// After rendering, run the treeification routine

  var trees = document.querySelectorAll("[role='tree']");

  for (var i = 0; i < trees.length; i++) {
    var t = new TreeLinks(trees[i]);
    t.init();
  }
  
  var treeitems = document.querySelectorAll("[role='treeitem']");

  for (var i = 0; i < treeitems.length; i++) {
    treeitems[i].addEventListener('click', function (event) {
      var treeitem = event.currentTarget;
      var label = treeitem.getAttribute('aria-label');
      if (!label) {
        var child = treeitem.firstElementChild;
        label = child ? child.innerText : treeitem.innerText;
      }

     // document.getElementById('last_action').value = label.trim();

      event.stopPropagation();
     // event.preventDefault();
    });
  }
}
