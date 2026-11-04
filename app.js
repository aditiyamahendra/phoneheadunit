import { initMap } from './components/navigation.js';
import { initMusicPlayer } from './components/music-player.js';
import { startLocationTracking } from './utils/location.js';

export function requestWakeLock() {
    if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen').catch((err) => console.error(`${err.name}, ${err.message}`));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('content');
    mainContent.innerHTML = `
        <div class="grid grid-cols-5 gap-4 p-4 h-full">
            <div id="map" class="col-span-3 h-full rounded-3xl overflow-hidden bg-gray-800"></div>
            <div class="col-span-2 flex flex-col gap-4">
                <div id="speedometer" class="h-1/2 rounded-3xl bg-gray-800 flex items-center justify-center text-4xl font-bold">0 km/h</div>
                <div id="music-widget" class="h-1/2 rounded-3xl bg-gray-800 p-4"></div>
            </div>
        </div>
    `;

    initMap('map');
    initMusicPlayer();
    startLocationTracking();
    requestWakeLock();
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
});
