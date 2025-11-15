/**
 * IpFinder - IP Address Detection & Geolocation
 * By Mohana Krishna Padda
 * Year: 2013 - 2025
 */

// State Management
const state = {
    ipData: null,
    loading: false,
    error: null
};

// DOM Elements
const elements = {
    loading: document.getElementById('loading'),
    ipInfo: document.getElementById('ip-info'),
    error: document.getElementById('error'),
    ipAddress: document.getElementById('ip-address'),
    ipType: document.getElementById('ip-type'),
    location: document.getElementById('location'),
    isp: document.getElementById('isp'),
    country: document.getElementById('country'),
    city: document.getElementById('city'),
    region: document.getElementById('region'),
    postal: document.getElementById('postal'),
    timezone: document.getElementById('timezone'),
    coordinates: document.getElementById('coordinates'),
    copyBtn: document.getElementById('copy-btn'),
    refreshBtn: document.getElementById('refresh-btn'),
    retryBtn: document.getElementById('retry-btn'),
    errorMessage: document.getElementById('error-message')
};

// API Configuration - Multiple fallback options
const API_ENDPOINTS = [
    {
        name: 'ipapi.co',
        url: 'https://ipapi.co/json/',
        parser: (data) => ({
            ip: data.ip,
            type: data.version === 'IPv4' ? 'IPv4' : 'IPv6',
            city: data.city,
            region: data.region,
            country: data.country_name,
            postal: data.postal,
            timezone: data.timezone,
            latitude: data.latitude,
            longitude: data.longitude,
            isp: data.org
        })
    },
    {
        name: 'ip-api.com',
        url: 'http://ip-api.com/json/',
        parser: (data) => ({
            ip: data.query,
            type: data.query.includes(':') ? 'IPv6' : 'IPv4',
            city: data.city,
            region: data.regionName,
            country: data.country,
            postal: data.zip,
            timezone: data.timezone,
            latitude: data.lat,
            longitude: data.lon,
            isp: data.isp
        })
    },
    {
        name: 'ipwhois.app',
        url: 'https://ipwhois.app/json/',
        parser: (data) => ({
            ip: data.ip,
            type: data.type,
            city: data.city,
            region: data.region,
            country: data.country,
            postal: data.postal,
            timezone: data.timezone,
            latitude: data.latitude,
            longitude: data.longitude,
            isp: data.isp
        })
    }
];

/**
 * Fetch IP information from API with fallback support
 */
async function fetchIPInfo() {
    for (const endpoint of API_ENDPOINTS) {
        try {
            console.log(`Trying ${endpoint.name}...`);
            const response = await fetch(endpoint.url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Check if we got valid data
            if (!data.ip && !data.query) {
                throw new Error('Invalid response from API');
            }

            return endpoint.parser(data);
        } catch (error) {
            console.error(`Failed to fetch from ${endpoint.name}:`, error);
            // Continue to next endpoint
        }
    }

    // If all endpoints fail, throw error
    throw new Error('All IP detection services are unavailable. Please try again later.');
}

/**
 * Display IP information
 */
function displayIPInfo(data) {
    // Main IP display
    elements.ipAddress.textContent = data.ip;
    elements.ipType.textContent = data.type || 'IPv4';

    // Information cards
    elements.location.textContent = `${data.city || 'Unknown'}, ${data.country || 'Unknown'}`;
    elements.isp.textContent = data.isp || 'Unknown';
    elements.country.textContent = data.country || 'Unknown';
    elements.city.textContent = data.city || 'Unknown';
    elements.region.textContent = data.region || 'Unknown';
    elements.postal.textContent = data.postal || 'Unknown';
    elements.timezone.textContent = data.timezone || 'Unknown';

    // Coordinates
    if (data.latitude && data.longitude) {
        elements.coordinates.textContent = `${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`;
    } else {
        elements.coordinates.textContent = 'Unknown';
    }
}

/**
 * Show loading state
 */
function showLoading() {
    elements.loading.classList.remove('hidden');
    elements.ipInfo.classList.add('hidden');
    elements.error.classList.add('hidden');
}

/**
 * Show IP information
 */
function showIPInfo() {
    elements.loading.classList.add('hidden');
    elements.ipInfo.classList.remove('hidden');
    elements.error.classList.add('hidden');
}

/**
 * Show error state
 */
function showError(message) {
    elements.loading.classList.add('hidden');
    elements.ipInfo.classList.add('hidden');
    elements.error.classList.remove('hidden');
    elements.errorMessage.textContent = message;
}

/**
 * Copy IP to clipboard
 */
async function copyIPToClipboard() {
    try {
        await navigator.clipboard.writeText(state.ipData.ip);

        // Visual feedback
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = '<span>✓</span> Copied!';
        elements.copyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
            elements.copyBtn.style.background = '';
        }, 2000);
    } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy IP address. Please copy manually: ' + state.ipData.ip);
    }
}

/**
 * Load IP information
 */
async function loadIPInfo() {
    try {
        showLoading();
        state.loading = true;
        state.error = null;

        const data = await fetchIPInfo();
        state.ipData = data;

        displayIPInfo(data);
        showIPInfo();
    } catch (error) {
        console.error('Error loading IP info:', error);
        state.error = error.message;
        showError(error.message);
    } finally {
        state.loading = false;
    }
}

/**
 * Initialize the application
 */
function init() {
    // Event listeners
    elements.copyBtn.addEventListener('click', copyIPToClipboard);
    elements.refreshBtn.addEventListener('click', loadIPInfo);
    elements.retryBtn.addEventListener('click', loadIPInfo);

    // Load IP info on page load
    loadIPInfo();
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + C to copy IP
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && state.ipData) {
        e.preventDefault();
        copyIPToClipboard();
    }

    // F5 or Ctrl/Cmd + R to refresh
    if (e.key === 'F5' || ((e.ctrlKey || e.metaKey) && e.key === 'r')) {
        e.preventDefault();
        loadIPInfo();
    }
});
