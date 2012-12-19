var markers = [];
var latLngs = new Array();
// var neighborhoods = [
//   new google.maps.LatLng(52.511467, 13.447179),
//   new google.maps.LatLng(52.549061, 13.422975),
//   new google.maps.LatLng(52.497622, 13.396110),
//   new google.maps.LatLng(52.517683, 13.394393)
// ];
var iterator = 0;
function createXmlHttp(){
	if (window.XMLHttpRequest)
	{
		xmlHttp=new XMLHttpRequest();
	}else{
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHttp;
}
function getJsonObj(pos){
	var xmlHttp = createXmlHttp();
	var URL = "https://maps.googleapis.com/maps/api/geocode/json?address="+pos+"&sensor=true";
	
	//document.getElementById("content").innerHTML = URL;
	xmlHttp.open("GET",URL,true);
	xmlHttp.setRequestHeader("Accept", "application/json");
	xmlHttp.onreadystatechange=function(){
			if (xmlHttp.readyState==4 && xmlHttp.status==200){

				var content = xmlHttp.responseText;
				//alert(content)
				eval("var obj = " + content);
				//document.getElementById("content").innerHTML = content;
				// alert(typeof(obj))
				// if(obj.status)
				 // alert(obj);
				var objData = getPosition(obj);
				if(objData!=null&&objData.length > 0)
					addTreeData(getPosition(obj));
				
			}
	};

	xmlHttp.send();
	
}

var initLatLng;

function getPosition(objData){
	// var str = "["
	var neighborhoods = new Array();
	if(objData.status=="OK"){
		for(i=0;i<objData.results.length;i++){
			address=objData.results[i].formatted_address;
			locan=objData.results[i].geometry["location"];
			lat=locan.lat
			lng=locan.lng
			//addNeighborhoods(lat,lng);
			// str = str + (i==0)?'':',' + '{"address":address,"lat":lat,"lng":lng}';
			str = '{"address":'+'"'+address+'"'+',"position":'+'{"lat":'+lat+',"lng":'+lng+'}}';
			//alert(str)
			eval('var obj = ' + str);
			//alert(obj.position);
			//neighborhoods.push(obj)
			neighborhoods[i]=obj;
			//alert(neighborhoods[i])
		}
		// var str = "]"
	}
	
	return neighborhoods;
}
function addTreeData(neighborhoods){
	/*
	console.log("1111111");
	var $ul = $("#tree");
	for(i=0; i< [1, 3, 5].length; i++){
		$("<li>").attr("lat", "1")
			.attr("lng", "2").appendTo($ul)
	}
	console.log($ul.html());
	alert(document.getElementById("#tree").innerHTML)
	*/
	var tree = document.getElementById("tree");
	var ul =tree.appendChild(document.createElement("ul"));
	for(i=0;i<neighborhoods.length;i++){
		var position = neighborhoods[i]["position"];
		var li = document.createElement("li");
		li.setAttribute("id","list_"+i);
		li.setAttribute("onclick","drop('list_"+i+"')");
		li.setAttribute("lat",position.lat);
		li.setAttribute("lng",position.lng);
		li.setAttribute("address",neighborhoods[i]["address"]);
		//li.text = (i+1) + neighborhoods[i]["address"]
		//str = "<a onclick='drop()' lat="+lat+" lng="+lng+"'>"+(i+1)+". "+formatted_address+"</a>";
		//var li = document.createElement(str);
		li.innerHTML = "<a>"+(i+1)+". "+neighborhoods[i]["address"]+"</a>"
		ul.appendChild(li);
		if(i<neighborhoods.length-1){
			var li_divider = document.createElement("li");
			li_divider.setAttribute("class","divider");
			ul.appendChild(li_divider);
		}
		// addMarker(position.lat, position.lng);
	}
	ul.setAttribute("class","dropdown-menu");
	tree.setAttribute("class","btn-group open");
	// alert(tree.innerHTML)
	

	// alert(objData.status=="OK")
	// alert(objData.results[0].geometry.location.lat);
	//var li = document.createElement("li");
	//alert(document.getElementById("tree").innerHTML);
	//div.innerHTML=123123;
	
	
}


// function addNeighborhoods(lat,lng){
// 	neighborhoods.push(new google.maps.LatLng(lat, lng));
// }
function drop(id) {
	//var position = new google.maps.LatLng(52.511467, 13.447179),
	var obj = document.getElementById(id);

	var lat = obj.getAttribute("lat");
	var lng = obj.getAttribute("lng");
	document.getElementById("i_search").value=obj.getAttribute("address");
	addMarker(lat,lng);
	addLatLngs(lat,lng);
	toggle();
}

function toggle(){
      if($("#tree").hasClass("open"))
        $("#tree").removeClass("open");
      else
        $("#tree").addClass("open");
}

function visibleChange(){
	toggle();
}

function addLatLngs(lat,lng){
	latLngs.push(new google.maps.LatLng(lat,lng));
}
function addMarker(lat,lng) {
	var maps_LatLng = new google.maps.LatLng(lat,lng);
	map.setCenter(maps_LatLng);
	//alert(maps_LatLng);
	markers.push(new google.maps.Marker({
		position: maps_LatLng,
		map: map,
		draggable: false,
		animation: google.maps.Animation.DROP
		})
	);
  // iterator++;
}
var map;
function initialize() {
	google.maps.event.addDomListener(window, 'load', initialize);
	initLatLng = new google.maps.LatLng(22.5430990,114.0578680);
	var mapOptions = {
	zoom: 12,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	center: initLatLng
	};

	map = new google.maps.Map(document.getElementById('googlemap'),
	      mapOptions);
	//requestJSONData();
	google.maps.event.addListener(map, 'click', function(e) {
	  placeMarker((e.latLng), map);
	});
}

function search(id){
	// alert(document.getElementById(id).value)
	obj = document.getElementById(id);
	//obj.removeChild()
	getJsonObj(obj.value);
	tree = document.getElementById("tree");
	tree.innerHTML="";
	// alert(tree.innerHTML)
	// for(node in (tree.childNodes){
	// 	alert(node)
	// }
}

function drawLine(){
	// var latLngs = [
	//     new google.maps.LatLng(37.772323, -122.214897),
	//     new google.maps.LatLng(21.291982, -157.821856),
	//     new google.maps.LatLng(-18.142599, 178.431),
	//     new google.maps.LatLng(-27.46758, 153.027892)
	// ];
	var poly_line = new google.maps.Polyline({
	  path: latLngs,
	  strokeColor: '#FF0000',
	  strokeOpacity: 1.0,
	  strokeWeight: 2
	});
	poly_line.setMap(map);
}
// $(function(){
// 	console.log("1111111");
// 	addTreeData();
// });
function enterKeyPress(event){
	if(event.keyCode==13)
		search('i_search');
}
function placeMarker(position, map) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  map.panTo(position);
  addLatLngs(position.Za,position.$a);
}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize";
  document.body.appendChild(script);
}
window.onload=loadScript;


// google.maps.event.addDomListener(window, 'load', loadScript);
// google.maps.event.addDomListener(window, 'load', initialize);