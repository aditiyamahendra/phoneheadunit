export function updateSpeedometer(speedKmh) {
    const el = document.getElementById('speedometer');
    el.innerText = `${Math.round(speedKmh)} km/h`;
}

export function startLocationTracking() {
    if ('geolocation' in navigator) {
        navigator.geolocation.watchPosition((position) => {
            const speedKmh = (position.coords.speed || 0) * 3.6;
            updateSpeedometer(speedKmh);
        }, (err) => console.error(err), { enableHighAccuracy: true });
    }
}
