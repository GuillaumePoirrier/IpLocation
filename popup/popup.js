var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);

        var loc = {
            "ip": data.ip,
            "latitude": data.latitude,
            "longitude": data.longitude,
            "country": data.country,
            "city": data.city,
            "country_name": data.country_name
        };
        var path = '../img/flag/' + loc.country + '.png'
        chrome.browserAction.setIcon({ path: path });

        document.getElementById("info").hidden = false;
        document.getElementById("loading").hidden = true;


        var info = document.getElementById('info');

        var ip = document.createElement('h2');
        ip.textContent = "IP : " + loc.ip;

        var table = document.createElement('table');

        var trhead = document.createElement('tr');
        var heads = ["Lat", "Long", "City", "Country"];
        for (let i = 0; i < heads.length; i++) {
            var th = document.createElement('th');
            th.textContent = heads[i];
            trhead.appendChild(th);
        }

        var trcontent = document.createElement('tr');
        var content = [loc.latitude, loc.longitude, loc.city, loc.country_name];
        for (let i = 0; i < content.length; i++) {
            var td = document.createElement('td');
            td.textContent = content[i];
            trcontent.appendChild(td);
        }

        table.appendChild(trhead);
        table.appendChild(trcontent);
        info.appendChild(ip);
        info.appendChild(table);

        if (loc.latitude == null && loc.longitude == null) {
            var map = document.getElementById("map");
            var unavailable = document.createElement('p');
            unavailable.textContent = "Exact location unavailable";
            map.appendChild(unavailable);
            map.style.height = "100px";
        } else {
            var map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([parseInt(loc.longitude), parseInt(loc.latitude)]),
                    zoom: 5
                }),
                interactions: ol.interaction.defaults({
                    doubleClickZoom: false,
                    dragAndDrop: false,
                    dragPan: false,
                    keyboardPan: false,
                    keyboardZoom: false,
                    mouseWheelZoom: false,
                    pointer: false,
                    select: false
                }),
                controls: []
            });
            var marker = new ol.Feature({
                geometry: new ol.geom.Point(
                    ol.proj.fromLonLat([parseInt(loc.longitude), parseInt(loc.latitude)])
                )
            });
            var vectorSource = new ol.source.Vector({
                features: [marker]
            });
            var markerVectorLayer = new ol.layer.Vector({
                source: vectorSource,
            });
            map.addLayer(markerVectorLayer);
        }


    }
}

xmlhttp.open("GET", "https://ipapi.co/json", true);
xmlhttp.send();