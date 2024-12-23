// Initialize map
function initializeMap() {
    var map = L.map('map').setView([20.0, 0.0], 2); // World view

    // Base layers
    var baseLayers = {
        "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        "Satellite": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
        }),
        "Dark": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
        })
    };

    // Add default layer to map
    baseLayers["OpenStreetMap"].addTo(map);

    // Add layer control to map
    L.control.layers(baseLayers).addTo(map);

    return map;
}

// Add markers to the map
function addMarkers(map) {
    var bases = [
        { name: 'Fremont Factory', coords: [37.4860, -121.9256], specialty: 'Electric Vehicles', timezone: 'America/Los_Angeles', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' },
        { name: 'Gigafactory Shanghai', coords: [30.9187, 121.4737], specialty: 'Model 3 and Model Y', timezone: 'Asia/Shanghai', flag: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_China.png' },
        { name: 'Gigafactory Berlin', coords: [52.4050, 13.1355], specialty: 'Model Y', timezone: 'Europe/Berlin', flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg' },
        { name: 'Gigafactory Texas', coords: [30.2222, -97.6174], specialty: 'Model Y and Cybertruck', timezone: 'America/Chicago', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg' },
        { name: 'Gigafactory Nevada', coords: [39.5336, -119.7674], specialty: 'Batteries and Powerwalls', timezone: 'America/Los_Angeles', flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Flag_of_Nevada.svg' },
        { name: 'NVIDIA Headquarters', coords: [37.3706, -122.0363], specialty: 'Graphics Processing Units', timezone: 'America/Los_Angeles', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' },
        { name: 'NVIDIA Israel', coords: [32.0853, 34.7818], specialty: 'AI and Deep Learning', timezone: 'Asia/Jerusalem', flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg' }
    ];

    var teslaIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
    });

    var nvidiaIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
    });

    let zoomTimeout;
    let originalZoom = map.getZoom();

    bases.forEach(function(base) {
        var icon = base.name.includes('NVIDIA') ? nvidiaIcon : teslaIcon;
        var marker = L.marker(base.coords, { icon: icon }).addTo(map);
        marker.bindTooltip('<img src="' + base.flag + '" class="flag">' + base.name + '<br>' + base.specialty + '<br>' + base.timezone, {
            permanent: false,
            direction: 'top'
        });

        marker.on('mouseover', function() {
            zoomTimeout = setTimeout(() => {
                originalZoom = map.getZoom();
                map.flyTo(base.coords, 10, { animate: true, duration: 2 }); // Smoothly fly to the marker's location and zoom in to level 10
            }, 1000); // 1 second
        });

        marker.on('mouseout', function() {
            clearTimeout(zoomTimeout);
            map.flyTo(map.getCenter(), originalZoom, { animate: true, duration: 2 }); // Smoothly fly back to the original zoom level
        });
    });
}

// Show tooltip and handle profile redirect
function handleProfileRedirects() {
    const xLogo = document.getElementById('x-logo');
    const githubLogo = document.getElementById('github-logo');
    const tooltip = document.getElementById('tooltip');
    let profileTimeout;

    xLogo.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
        document.getElementById('profile-image').src = 'https://avatars.githubusercontent.com/u/125604915?v=4';
        document.getElementById('name').textContent = 'Niladri Das';
        document.getElementById('username').textContent = '@bniladridas';
        document.getElementById('description').textContent = 'Software Engineer';

        profileTimeout = setTimeout(() => {
            window.location.href = 'https://x.com/bniladridas';
        }, 3000); // 3 seconds
    });

    xLogo.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
        clearTimeout(profileTimeout);
    });

    githubLogo.addEventListener('mouseover', () => {
        profileTimeout = setTimeout(() => {
            window.location.href = 'https://github.com/bniladridas';
        }, 3000); // 3 seconds
    });

    githubLogo.addEventListener('mouseout', () => {
        clearTimeout(profileTimeout);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    const map = initializeMap();
    addMarkers(map);
    handleProfileRedirects();
});
