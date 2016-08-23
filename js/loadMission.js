function loadMission(nameMission){
  	// Create a connection to the file.
  	var Connect = new XMLHttpRequest();

	// Define which file to open and
	// send the request.
	Connect.open("GET", "mission/"+nameMission+".xml", false);
	Connect.setRequestHeader("Content-Type", "text/xml");
	Connect.send(null);

	// Place the response in an XML document.
	var TheDocument = Connect.responseXML;

	// Place the root node in an element.
	var Mission = TheDocument.childNodes[0];

	//Pegar uma variavel na raiz
	num_streets = Mission.getElementsByTagName('num_streets')[0].textContent;
	num_rooms = Mission.getElementsByTagName('num_rooms')[0].textContent; 
	num_gates = Mission.getElementsByTagName('num_gates')[0].textContent;  


	//Inicio pegar um conjunto de variaveis - RUA
	streetsXML = Mission.getElementsByTagName('streets')[0];
	streets = [];
	for (var i = 0 ; i < streetsXML.children.length; i++) {
		var street = streetsXML.children[i];

		var image = street.getElementsByTagName('img')[0].textContent;
		var x = street.getElementsByTagName('x')[0].textContent;
		var y = street.getElementsByTagName('y')[0].textContent;
		var rotation = street.getElementsByTagName('rotation')[0].textContent;
		var width = street.getElementsByTagName('width')[0].textContent;
		var heigth = street.getElementsByTagName('heigth')[0].textContent;
		var is_gate = street.getElementsByTagName('is_gate')[0].textContent;
		var is_start = street.getElementsByTagName('is_start')[0].textContent;
		var is_goal = street.getElementsByTagName('is_goal')[0].textContent;
		var has_manhole = street.getElementsByTagName('has_manhole')[0].textContent;

		var newStreet = {
			image: image,
		    x: x,
		    y: y,
		    rotation: rotation,
		    width: width,
		    heigth: heigth,
		    is_gate: is_gate,
		    is_start: is_start,
		    is_goal: is_goal,
		    has_manhole: has_manhole
		};

		streets.push(newStreet);
	};
	//Fim

	//Inicio pegar um conjunto de variaveis - Comodos
	roomsXML = Mission.getElementsByTagName('rooms')[0];
	rooms = [];
	for (var i = 0 ; i < roomsXML.children.length; i++) {
		var room = roomsXML.children[i];

		var image = room.getElementsByTagName('img')[0].textContent;
		var x = room.getElementsByTagName('x')[0].textContent;
		var y = room.getElementsByTagName('y')[0].textContent;
		var rotation = room.getElementsByTagName('rotation')[0].textContent;
		var width = room.getElementsByTagName('width')[0].textContent;
		var heigth = room.getElementsByTagName('heigth')[0].textContent;
		var door_up = room.getElementsByTagName('door_up')[0].textContent;
		var door_down = room.getElementsByTagName('door_down')[0].textContent;
		var door_left = room.getElementsByTagName('door_left')[0].textContent;
		var door_right = room.getElementsByTagName('door_right')[0].textContent;
		var is_start = room.getElementsByTagName('is_start')[0].textContent;
		var is_goal = street.getElementsByTagName('is_goal')[0].textContent;

		var newRoom = {
			image: image,
		    x: x,
		    y: y,
		    rotation: rotation,
		    width: width,
		    heigth: heigth,
		    door_up: door_up,
		    door_down: door_down,
		    door_left: door_left,
		    door_right: door_right,
		    is_start: is_start,
		    is_goal: is_goal
		};

		rooms.push(newRoom);
	};
	//Fim

	var objMission = {
		num_streets: num_streets,
		num_rooms: num_rooms,
		num_gates: num_gates,
		streets: streets,
		rooms: rooms
	};

	return objMission;

}