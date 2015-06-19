var curGroup = null;

function setUpElements() {
	if(localStorage.getItem("groups") != null) {
		var groups = JSON.parse(localStorage.getItem("groups")).groups;
		document.getElementById("groups").innerHTML = "";
		for(var x = 0; x<groups.length; x++) {
			var tempItem = document.getElementById("baseItem").cloneNode(true);
			var tempDivider = document.getElementById("divider").cloneNode(true);
			tempItem.style.display = "flex";
			tempDivider.style.display = "block";
			tempItem.children[0].innerHTML = groups[x].name + "<br>" + groups[x].description;
			document.getElementById("groups").appendChild(tempDivider);
			document.getElementById("groups").appendChild(tempItem);
		}
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
	var curItem = e.srcElement || e.target;
    curItem = curItem.parentNode;
	for (var index=0,index=curItem; index = index.previousSibling; ++index);
	
}

function addGroup() {
	var groups = JSON.parse(localStorage.getItem("groups"));
	groups.groups.push({"name": document.getElementById("groupNameInput").value, "description": document.getElementById("groupDescriptionInput").value, "items": []});
	localStorage.setItem("groups", JSON.stringify(groups));
	document.getElementById("groups").innerHTML = "";
	
	groups = JSON.parse(localStorage.getItem("groups")).groups;
	for(var x = 0; x<groups.length; x++) {
		var tempItem = document.getElementById("baseItem").cloneNode(true);
		var tempDivider = document.getElementById("divider").cloneNode(true);
		tempItem.style.display = "flex";
		tempDivider.style.display = "block";
		tempItem.children[0].innerHTML = groups[x].name + "<br>" + groups[x].description;
		document.getElementById("groups").appendChild(tempDivider);
		document.getElementById("groups").appendChild(tempItem);
	}
	document.getElementById('pager').select("0");
}

function addItem(){
	var items = JSON.parse(localStorage.getItem("groups"));
	items.groups[curGroup].items.push({"name": document.getElementById("itemNameInput").value, "description": document.getElementById("itemDescriptionInput").value});
	localStorage.setItem("groups", JSON.stringify(items));
	document.getElementById("groups").innerHTML = "";
	
	groups = JSON.parse(localStorage.getItem("groups")).groups[curGroup].items;
	for(var x = 0; x<groups.length; x++) {
		var tempItem = document.getElementById("baseItem").cloneNode(true);
		var tempDivider = document.getElementById("divider").cloneNode(true);
		tempItem.style.display = "flex";
		tempDivider.style.display = "block";
		tempItem.children[0].innerHTML = groups[x].name + "<br>" + groups[x].description;
		document.getElementById("groups").appendChild(tempDivider);
		document.getElementById("groups").appendChild(tempItem);
	}
	document.getElementById('pager').select("1");
}

function deleteCurrentItem(e) {
	if (!e)
        e = window.event;
	var deleteThis = e.srcElement || e.target;
	deleteThis = deleteThis.parentNode;
	for (var index=0,index=deleteThis; index = index.previousSibling; ++index);
	if(index != -1) {
		index = ((index + 1) / 2)-1;
		var groups = JSON.parse(localStorage.groups);
		groups.groups.splice(index, 1);
		localStorage.groups = JSON.stringify(groups);
		
		groups = groups.groups;
		document.getElementById("groups").innerHTML = "";
		for(var x = 0; x<groups.length; x++) {
			var tempItem = document.getElementById("baseItem").cloneNode(true);
			var tempDivider = document.getElementById("divider").cloneNode(true);
			tempItem.style.display = "block";
			tempDivider.style.display = "block";
			tempItem.children[0].innerHTML = groups[x].name + "<br>" + groups[x].description;
			document.getElementById("groups").appendChild(tempDivider);
			document.getElementById("groups").appendChild(tempItem);
		}
	}
}