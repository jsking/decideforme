var curGroup = null;

function setUpElements() {
	if(localStorage.groups != null) {
		updateGroups();
	} else {
		var groups = JSON.stringify({groups: []});
		localStorage.groups = groups;
	}
}

function goToAddGroup() {
	document.getElementById('pager').select("2");
}


function goToAddItem() {
	document.getElementById('pager').select("3");
}

function goToTappedItem(e) {
	if (!e)
    	e = window.event;
	e.stopPropagation();
	
	var curItem = e.srcElement || e.target;
    //curItem = curItem.parentNode;
	
	curGroup = Array.prototype.indexOf.call(curItem.parentNode.children, curItem);
	
	curGroup = ((curGroup + 1) / 2) - 1;
	
	updateItems();
	
	document.getElementById('pager').select("1");
}

function backToGroups() {
	document.getElementById('pager').select("0");
}

function backToItems() {
	document.getElementById('pager').select("1");
}

function addGroup() {
	var groups = JSON.parse(localStorage.groups);
	groups.groups.push({"name": document.getElementById("groupNameInput").value, "description": document.getElementById("groupDescriptionInput").value, "items": []});
	localStorage.groups = JSON.stringify(groups);
	document.getElementById("groups").innerHTML = "";
	
	updateGroups();
	
	document.getElementById('pager').select("0");
}

function addItem(){
	var items = JSON.parse(localStorage.groups);
	items.groups[curGroup].items.push({"name": document.getElementById("itemNameInput").value, "description": document.getElementById("itemDescriptionInput").value});
	localStorage.groups = JSON.stringify(items);
	document.getElementById("groups").innerHTML = "";
	
	updateItems();
	
	document.getElementById('pager').select("1");
}

function deleteCurrentItem(e) {
	if (!e)
        e = window.event;
	var deleteThis = e.srcElement || e.target;
	
	deleteThis = deleteThis.parent;
	
	var index = Array.prototype.indexOf.call(deleteThis.parent.children, deleteThis);
	
	index = ((index + 1) / 2) - 1;
	
	if(deleteThis.parent.id == "groups") {
		var groups = JSON.parse(localStorage.groups);
		groups.groups.splice(index, 1);
		localStorage.groups = JSON.stringify(groups);
		
		updateGroups();
	} else {
		var groups = JSON.parse(localStorage.groups);
		groups.groups[curGroup].items.splice(index, 1);
		localStorage.groups = JSON.stringify(groups);
		
		updateItems();
	}
	
	document.getElementById('pager').select("1");
}

//Randomly choose an item

function chooseRandom() {
	
}

//Update functions

function updateGroups() {
	var groups = JSON.parse(localStorage.groups).groups;
	document.getElementById("groups").innerHTML = "";
	for(var x = 0; x<groups.length; x++) {
		var tempItem = document.getElementById("baseItem").cloneNode(true);
		var tempDivider = document.getElementById("divider").cloneNode(true);
		tempItem.style.display = "block";
		tempDivider.style.display = "block";
		tempItem.children[0].children[0].innerHTML = groups[x].name;
		tempItem.children[0].children[1].innerHTML = groups[x].description;
		document.getElementById("groups").appendChild(tempDivider);
		document.getElementById("groups").appendChild(tempItem);
	}
}

function updateItems() {
	var groups = JSON.parse(localStorage.groups).groups[curGroup].items;
	document.getElementById("items").innerHTML = "";
	for(var x = 0; x<groups.length; x++) {
		var tempItem = document.getElementById("baseItem").cloneNode(true);
		var tempDivider = document.getElementById("divider").cloneNode(true);
		tempItem.style.display = "flex";
		tempDivider.style.display = "block";
		tempItem.children[0].children[0].innerHTML = groups[x].name;
		tempItem.children[0].children[1].innerHTML = groups[x].description;
		document.getElementById("items").appendChild(tempDivider);
		document.getElementById("items").appendChild(tempItem);
	}
}