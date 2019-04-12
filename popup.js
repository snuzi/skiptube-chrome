	var storage = chrome.storage.sync;
	var storedSitesArray;
	var siteStorageKey = "sites";
 

  function removeUrl(url){
        storage.get(siteStorageKey,function(result){
        storedSitesArray = result[siteStorageKey]?result[siteStorageKey]:[];
        var newUrlsArray = [];
          for(var i = 0; i<storedSitesArray.length; i++){
              var currArray = storedSitesArray[i];
              if(currArray[1] != url){
                 newUrlsArray.push(currArray.slice());
              }
          }
            var jsonObj = {};
            jsonObj[siteStorageKey] = newUrlsArray;
            storage.set(jsonObj, function() {
               alert("Video unblocked");
            });
        });
      
    }

	$(function (){
	   
		storage.get(siteStorageKey,function(result){
			storedSitesArray = result[siteStorageKey] ? result[siteStorageKey]:[];
			for(var i = 0; i<storedSitesArray.length; i++){
			  var row = "<tr><td>"+(i+1)+"</td><td>" + storedSitesArray[i][0] + "</td><td>  <button type='butto'n data-id='" + storedSitesArray[i][1] + "' class='btn btn-danger removeFromList'>X</button> </td> </tr>";
				$('#blockedlinks > tbody:last-child').append(row);
			
			}
			
		});
	  
	  
		$("#blockedlinks").on('click','.removeFromList',(function (e) {
			removeUrl( $(this).data('id') );	
		}));

		
	   $("#myInput").on('keyup', function() {
			// Declare variables 
			var input, filter, table, tr, td, i;
			input = document.getElementById("myInput");
			filter = input.value.toUpperCase();
			table = document.getElementById("blockedlinks");
			tr = table.getElementsByTagName("tr");

			// Loop through all table rows, and hide those who don't match the search query
			for (i = 0; i < tr.length; i++) {
				td = tr[i].getElementsByTagName("td")[1];
				if (td) {
					if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = "";
					} else {
						tr[i].style.display = "none";
					}
				} 
			}
		});

		
	});



	document.addEventListener('DOMContentLoaded', function() {
	  
	  var storage = chrome.storage.sync;
	  
	   
	  var storedSitesArray;
	  var siteStorageKey = "sites";
	 
	  storage.get(siteStorageKey,function(result){
		
		storedSitesArray = result[siteStorageKey] ? result[siteStorageKey]:[];
		
	  });
	  
	  
	  
	  var blockButton = document.getElementById('blockUrl');
		 
	  blockButton.addEventListener('click', function() {
		   
		  chrome.tabs.query({'currentWindow': true, 'active': true}, function(tab) {
		   
			var tab_id = tab[0].id;   
			
			var url = tab[0].url;
			
			if(url.indexOf("youtube.com")>0){
				
			  let title = tab[0].title;
			  title = title.replace("- YouTube","");
			  let urlAray = [title, url];
			  
			  storedSitesArray.push(urlAray.slice())

			  let jsonObj = {};
			  jsonObj[siteStorageKey] = storedSitesArray;
			  storage.set(jsonObj, function() {
				 alert("Blocked: " + title);
			  });
			  
			} else {
				alert("This works only on Youtube website!");
			}
			
		  });
		  

	  }, false);
	  
	  
	  
	}, false);