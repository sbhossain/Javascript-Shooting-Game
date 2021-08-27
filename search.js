var heroName;
var heroImg;

function mySearch(myform) {
  document.activeElement.blur();
  var searchItem = myform.inputbox.value;
  var strQuery = searchItem.replace(/ /g, "%20");
  searchALA(strQuery);
}


//
function back() {
  window.location.href = "index.html";
  // document.getElementById("titlebar1").style.display = "none";
  // document.getElementById("search").style.display = "inline";
  // document.getElementById("results").style.display = "none";
}

function searchALA(searchItem) {
  // var url = 'https://bie.ala.org.au/ws/search.json?q=' + searchItem;
  // var url = 'https://www.superheroapi.com/api.php/10227861844198099/search/batman'
  var url = 'https://www.superheroapi.com/api.php/10227861844198099/search/' + searchItem;
  window.myxhr = new XMLHttpRequest();
  window.myxhr.open('GET', url, true);

  // If you get cross domain errors, then use a proxy website. Do this by
  // defining the proxy url and using it as a prefix to the ALA url 
  // in the .open call. Remember to comment out the previous .open if 
  // you use the following lines.
  //  var proxy = 'https://cors-anywhere.herokuapp.com/';
  //  window.myxhr.open('GET', proxy + url, true);

  window.myxhr.addEventListener("progress", updateProgress);
  window.myxhr.addEventListener("load", transferComplete);
  window.myxhr.addEventListener("error", transferFailed);
  window.myxhr.addEventListener("abort", transferCanceled);

  window.myxhr.send();
}

function transferComplete(evt) {
  var text = window.myxhr.responseText;
  window.myobj = JSON.parse(text);
  formatResponse();
}

function updateProgress(oEvent) {
  var prog = document.getElementById("progress").innerHTML;
  if (prog === '+') // === means equal value AND same type
  {
    document.getElementById("progress").innerHTML = 'x';
  }
  else {
    document.getElementById("progress").innerHTML = '+';
  }
}

function transferFailed(evt) {
  alert("An error occurred while transferring the file.");
}
function transferCanceled(evt) {
  alert("The transfer has been cancelled by the user.");
}

function formatResponse() {
  // var aryResults = window.myobj.searchResults.results;
  var aryResults = window.myobj.results;
  var myitems = aryResults.length;
  var strHTML = "";

  // for (var ndx = 0; ndx < myitems; ndx++) 
  // {
  //   var strType = window.myobj.searchResults.results[ndx].idxtype;
  //   if (strType === "TAXON") 
  //   {
  //     var comName = aryResults[ndx].commonName;
  //     var urlThumb = aryResults[ndx].thumbnailUrl;
  //     if (comName.length > 0) 
  //     {
  //      strHTML += '<div class="flex-container" onclick="onSelect(' + ndx + ')">';
  //       strHTML += '<div style="flex-grow: 8">';
  //       strHTML += comName + '</div>';
  //       strHTML += '<div style="flex-grow: 1"><img style="width:50%" src="';
  //       strHTML += urlThumb + '"></div></div><br />';
  //     }
  //   }
  // }

  for (var ndx = 0; ndx < myitems; ndx++) {
    var comName = aryResults[ndx].biography["full-name"];
    var urlThumb = aryResults[ndx].image.url;
    if (comName.length > 0) {
      strHTML += '<div class="flex-container" onclick="onSelect(' + ndx + ')">';
      strHTML += '<div style="flex-grow: 8">';
      strHTML += comName + '</div>';
      strHTML += '<div style="flex-grow: 1"><img style="width:50%" src="';
      strHTML += urlThumb + '"></div></div><br />';
    }
  }




  strHTML += '<button id=btn style="margin-left:120px; width: 200px; height:50px; border-radius:5px;" type="button" onclick="back()">Back</button>';

  document.getElementById("search").style.display = "none";
  document.getElementById("results").style.display = "inline";
  document.getElementById("titlebar1").style.display = "inline";

  // document.getElementById("titlebarResult").innerHTML = "Results";
  document.getElementById("results").innerHTML = strHTML;

}

function onSelect(ndx) {
  var currObj = window.myobj.results[ndx];
  var strHTML = '<div class="ctext">';
  heroName = currObj.name;
  heroImg = currObj.image.url;
  strHTML += '<p style="font-family:Papyrus, Fantasy; font-size:30px;">' + currObj.name + '</p>';
  strHTML += '<img style="border-radius:10px; display:block; max-width:250px; max-height:250px; width:auto; height:auto; margin-left:120px;" src="' + currObj.image.url + '">';
  strHTML += '<p>Full Name: ' + currObj.biography["full-name"] + '</p>';
  strHTML += '<p>Intelligence: ' + currObj.powerstats.intelligence + '</p>';
  strHTML += '<p>Strength: ' + currObj.powerstats.strength + '</p>';
  strHTML += '<p>Speed: ' + currObj.powerstats.speed + '</p>';
  strHTML += '<p>Durability: ' + currObj.powerstats.durability + '</p>';
  strHTML += '<p>Power: ' + currObj.powerstats.power + '</p>';
  strHTML += '<p>Combat: ' + currObj.powerstats.combat + '</p>';
  strHTML += '</div>';
  strHTML += '<div><button id=btn style="float: left; margin:0; width:213px; height:50px; border-radius:5px;" type="button" onclick="formatResponse()">Back</button></div>';
  strHTML += '<div><button id=btn style="float: right; margin:0; width:213px; height:50px; border-radius:5px;" type="button" onclick="startGame()">Select</button></div>';

  document.getElementById("search").style.display = "none";
  document.getElementById("results").style.display = "inline";
  document.getElementById("titlebar1").style.display = "none";
  // document.getElementById("titlebar1").innerHTML = "Details";
  document.getElementById("results").innerHTML = strHTML;
}

function startGame() {
  // localStorage.setItem("myValue",heroName)
  localStorage.setItem("myValue", heroImg);
  window.location.href = "game.html";
}



