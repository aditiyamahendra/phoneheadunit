import { initMap } from './components/navigation.js';
import { initMusicPlayer } from './components/music-player.js';
import { startLocationTracking } from './utils/location.js';

// Global state variables
window.currentPage = 'dashboard';
window.speedUnit = 'kmh';
window.wakeLock = null;
window.isSimulating = false;

// UI Event Handlers
window.switchPage = function(pageId) {
    window.currentPage = pageId;
    document.querySelectorAll('.car-page').forEach(page => page.classList.add('hidden'));
    const activePage = document.getElementById('page-' + pageId);
    if (activePage) activePage.classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('border-iosBlue', 'bg-white/20'));
    const activeBtn = document.getElementById('nav-btn-' + pageId);
    if (activeBtn) activeBtn.classList.add('border-iosBlue', 'bg-white/20');
};

window.toggleFullscreen = function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
        document.exitFullscreen();
    }
};

window.toggleWakeLock = async function() {
    if ('wakeLock' in navigator) {
        if (!window.wakeLock) {
            try {
                window.wakeLock = await navigator.wakeLock.request('screen');
                console.log('Wake Lock active');
            } catch (err) { console.error(err); }
        } else {
            await window.wakeLock.release();
            window.wakeLock = null;
        }
    }
};

window.openQuickDial = () => document.getElementById('quick-dial-modal').classList.remove('hidden');
window.closeQuickDial = () => document.getElementById('quick-dial-modal').classList.add('hidden');

document.addEventListener('DOMContentLoaded', () => {
    initMap('map-dashboard');
    initMusicPlayer();
    startLocationTracking();
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
    }
});
