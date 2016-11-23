var groups = [];
var currentGroup;
var currentIndex;

window.onload = function() {
	if(!localStorage.groups) {
		localStorage.groups = "[]";
	} else {
		groups = JSON.parse(localStorage.groups);
		for(var i=0; i<groups.length; i++) {
			addGroup(groups[i].title, groups[i].description);
		}
	}
	
	var hash = window.location.hash;
	var hashInterval = setInterval(function(){
		if (window.location.hash != hash) {
			if(window.location.hash == "#groups") {
				document.getElementById("header_title").innerText = "Decide For Me";
				document.getElementById("choose_randomly").style.display = "none";
				document.getElementById("back_button").style.display = "none";
				document.getElementById("groups").classList.add("is-active");
				document.getElementById("items").classList.remove("is-active");
				document.getElementById("random_item").classList.remove("is-active");
			} else if(window.location.hash == "#items") {
				document.getElementById("back_button").onclick = function() {window.location.hash = "#groups";};
				document.getElementById("choose_randomly").style.display = "block";
				document.getElementById("back_button").style.display = "flex";
				document.getElementById("groups").classList.remove("is-active");
				document.getElementById("items").classList.add("is-active");
				document.getElementById("random_item").classList.remove("is-active");
			} else if(window.location.hash == "#random_item") {
				document.getElementById("back_button").onclick = function() {window.location.hash = "#items";};
				document.getElementById("choose_randomly").style.display = "none";
				document.getElementById("groups").classList.remove("is-active");
				document.getElementById("items").classList.remove("is-active");
				document.getElementById("random_item").classList.add("is-active");
			}
			hash = window.hash;
		}
	}, 100);
	
	window.onresize = function() {
		var groupModal = document.getElementById("createGroupDialog");
		var itemModal = document.getElementById("createItemDialog");
		
		groupModal.style.top = ((window.innerHeight - groupModal.offsetHeight) / 2)+'px';
		itemModal.style.top = ((window.innerHeight - itemModal.offsetHeight) / 2)+'px';
	};
}

function showModal(modalID) {
	document.getElementById(modalID).showModal();
}

function addGroupDialog() {
	var titleText = document.getElementById("groupTitle").value;
	document.getElementById("groupTitle").value = "";
	var descriptionText = document.getElementById("groupDescription").value;
	document.getElementById("groupDescription").value = "";
	
	var groupToAdd = new Object();
	groupToAdd.title = titleText;
	groupToAdd.description = descriptionText;
	groupToAdd.items = [];
	
	groups.push(groupToAdd);
	localStorage.groups = JSON.stringify(groups);
	
	addGroup(titleText, descriptionText);
	
	document.getElementById("createGroupDialog").close();
}

function addGroup(title, description) {
	var list = document.getElementById("groupsList");
	
	var item = document.createElement("li");
	item.className = "mdl-list__item mdl-list__item--three-line";
	
	item.innerHTML = "<span class=\"mdl-list__item-primary-content\" onclick=\"loadGroup(this.parentNode);\"><span>"+title+"</span><span class=\"mdl-list__item-text-body\">"+description+"</span></span><span class=\"mdl-list__item-secondary-content center_vertical\" onclick=\"deleteGroupClicked(this.parentNode);\"><a class=\"mdl-list__item-secondary-action\"><i class=\"material-icons\">delete</i></a></span>";
	
	list.appendChild(item);
}

function removeGroup(listItem, index) {
	groups.splice(index, 1);
	localStorage.groups = JSON.stringify(groups);
	
	listItem.remove();
}

function deleteGroupClicked(listItem) {
	var snackbarContainer = document.getElementById("undoDeleteGroupSnackbar");
	
	var index = findIndexInItems(listItem);
	
	listItem.style.display = "none";
	
	var removeGroupTimeout = setTimeout((function(){removeGroup(listItem, index);}), 5000);
	
	var undo = function() {
		clearTimeout(removeGroupTimeout);
		listItem.style.display = "flex";
		snackbarContainer.classList.remove("mdl-snackbar--active");
		snackbarContainer['aria-hidden'] = true;
	}
	var data = {
		message: "Deleted group \""+listItem.children[0].children[0].innerText+"\".",
		timeout: 5000,
		actionHandler: undo,
		actionText: 'Undo'
	};
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
}




// Load items into items view

function loadGroup(groupItem) {
	document.getElementById("itemsList").innerHTML="";
	var child = groupItem;
	var i = -1;
	while( (child = child.previousSibling) != null ) 
		i++;
	
	currentIndex = i;
	for(var x=0; x<groups[i].items.length; x++) {
		addItem(groups[i].items[x].title, groups[i].items[x].description);
	}
	
	window.location.hash = "#items";
	document.getElementById("header_title").innerText = groups[currentIndex].title;
}


// Items commands

function addItemDialog() {
	var titleText = document.getElementById("itemTitle").value;
	document.getElementById("itemTitle").value = "";
	var descriptionText = document.getElementById("itemDescription").value;
	document.getElementById("itemDescription").value = "";
	
	var itemToAdd = new Object();
	itemToAdd.title = titleText;
	itemToAdd.description = descriptionText;
	itemToAdd.items = [];
	
	groups[currentIndex].items.push(itemToAdd);
	localStorage.groups = JSON.stringify(groups);
	
	addItem(titleText, descriptionText);
	
	document.getElementById("createItemDialog").close();
}

function addItem(title, description) {
	var list = document.getElementById("itemsList");
	
	var item = document.createElement("li");
	item.className = "mdl-list__item mdl-list__item--three-line";
	
	item.innerHTML = "<span class=\"mdl-list__item-primary-content\"><span>"+title+"</span><span class=\"mdl-list__item-text-body\">"+description+"</span></span><span class=\"mdl-list__item-secondary-content center_vertical\" onclick=\"deleteItemClicked(this.parentNode);\"><a class=\"mdl-list__item-secondary-action\"><i class=\"material-icons\">delete</i></a></span>";
	
	list.appendChild(item);
}

function removeItem(listItem, index) {
	groups[currentIndex].items.splice(index, 1);
	localStorage.groups = JSON.stringify(groups);
	
	listItem.remove();
}


function deleteItemClicked(listItem) {
	var snackbarContainer = document.getElementById("undoDeleteItemSnackbar");
	var child = listItem;
	var i = -1;
	while( (child = child.previousSibling) != null ) 
		i++;
	
	listItem.style.display = "none";
	
	var removeItemTimeout = setTimeout((function(){removeItem(listItem, i);}), 3000);
	
	var undo = function() {
		clearTimeout(removeItemTimeout);
		listItem.style.display = "flex";
		snackbarContainer.classList.remove("mdl-snackbar--active");
		snackbarContainer['aria-hidden'] = true;
	}
	var data = {
		message: "Deleted item \""+listItem.children[0].children[0].innerText+"\".",
		timeout: 3000,
		actionHandler: undo,
		actionText: 'Undo'
	};
	snackbarContainer.MaterialSnackbar.showSnackbar(data);
}


function chooseItemRandom() {
	var randomLength = groups[currentIndex].items.length;
	if(randomLength>1) {
		var randomIndex = Math.floor(Math.random() * randomLength);
		var randomItem = groups[currentIndex].items[randomIndex];
		document.getElementById("random_title").innerText = randomItem.title;
		document.getElementById("random_description").innerText = randomItem.description;
		window.location.hash = "#random_item";
	} else {
		document.getElementById("undoDeleteItemSnackbar").MaterialSnackbar.showSnackbar({message: "You must add more than 2 items!"});
	}
}



function findIndexInItems(item) {
	var child = item;
	var i = -1;
	while( (child = child.previousSibling) != null ) 
		i++;
	
	return i;
}
