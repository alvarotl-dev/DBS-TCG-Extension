/*****************************************************************************************************************************************************************/
//**************************************************FUNCTIONS****************************************************************************************************/
/***************************************************************************************************************************************************************/


window.onload = function(){		//Open the extension with the text box already
	document.getElementById("searchBox").focus();
}


function parseInformation() {	//Parse the information on the checkbox to an alternate text of an HTML element

	var specialCharacters = [["æ", "ae"], ["â", "a"], ["á", "a"], ["à", "a"], ["é", "e"], ["ö", "o"], ["û", "u"], ["ú", "u"]];
	var searchText = document.getElementById("searchBox").value.toLowerCase();
	
	//Store card name in alt
	document.getElementById("searchBox").alt = searchText;

	//Replace special characters
	for(var i = 0; i < searchText.length; i++) {
		for(var n = 0; n < specialCharacters.length; n++) {
			if(searchText[i] == specialCharacters[n][0]) {
				searchText = searchText.replace(searchText[i], specialCharacters[n][1]);
			}
		}
	}
}

function displayButtons(isDisplayed){	//Display or hide the lower shop buttons
	switch(isDisplayed)
	{
		case true: //Show the shop buttons
			document.getElementById("CoolStuffButton").style.display = "inline-block";
			document.getElementById("TCGPlayerButton").style.display = "inline-block";
			document.getElementById("CardMarketButton").style.display = "inline-block";
			break;	

		case false: //Hide them if activated or do nothing
			document.getElementById("CoolStuffButton").style.display = "none";
			document.getElementById("TCGPlayerButton").style.display = "none";
			document.getElementById("CardMarketButton").style.display = "none";	
			break;	
	}
}

function checkTextBox(){	//Parse the information on the text box and then check if it's empty.
	parseInformation()
	return document.getElementById("searchBox").alt != "";
}


/*****************************************************************************************************************************************************************/
//**************************************************EVENT HANDLING***********************************************************************************************/
/***************************************************************************************************************************************************************/

//Redirect to DBS Decks Main Page
document.getElementById("dbsdecksButton").onclick = function() {
	chrome.tabs.create({ url: "https://www.dbs-decks.com/#!/home"});
};

document.getElementById("metaButton").onclick = function() {
	chrome.tabs.create({ url: "https://www.dbs-decks.com/#!/meta"});
};

//Redirect to TCGPlayer
document.getElementById("TCGPlayerButton").onclick = function() {
	parseInformation()
	if(document.getElementById("searchBox").alt != "")
		chrome.tabs.create({ url: "http://shop.tcgplayer.com/dragon-ball-super-ccg/product/show?ProductName=" + document.getElementById("searchBox").alt });
	else
		chrome.tabs.create({ url: "https://shop.tcgplayer.com/dragon-ball-super-ccg/product/show" + document.getElementById("searchBox").alt });
};

document.getElementById("cardListButton").onclick = function() {
	chrome.tabs.create({ url: "https://www.shenronslair.com/cards"});
}

function isTCGPlayer(){
	return (navigator.language == "en-US" || navigator.language == "en-CA" || navigator.language == "fr-CA" || navigator.language == "en-NZ" || navigator.language == "en-AU" )
}


document.getElementById("searchBox").onkeypress = function(key) {
	if(key.keyCode == 13 && checkTextBox()) {

		if(isTCGPlayer()) //If its an American/Canada player, it searches for TCGPLAYER
			chrome.tabs.create({ url: "http://shop.tcgplayer.com/dragon-ball-super-ccg/product/show?ProductName=" + document.getElementById("searchBox").alt });

		else //If its an European player, it searches for MKM
			chrome.tabs.create({ url: "https://www.cardmarket.com/en/DragonBallSuper/Products/Search?searchString=" + document.getElementById("searchBox").alt });

	}
};

