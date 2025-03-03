// DOM Elements
const playerSection = document.getElementById('player-section');
const contentSection = document.getElementById('content-section');
const videoPlayer = document.getElementById('video-player');
const mediaTitle = document.getElementById('media-title');
const mediaYear = document.getElementById('media-year');
const mediaRating = document.getElementById('media-rating');
const mediaDuration = document.getElementById('media-duration');
const mediaDescription = document.getElementById('media-description');
const episodeSelector = document.getElementById('episode-selector');
const seasonSelect = document.getElementById('season-select');
const episodesGrid = document.getElementById('episodes-grid');
const backBtn = document.getElementById('back-btn');
const navLinks = document.querySelectorAll('nav ul li a');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

// Content Grids
const moviesGrid = document.getElementById('movies-grid');
const tvshowsGrid = document.getElementById('tvshows-grid');
const animeGrid = document.getElementById('anime-grid');
const localGrid = document.getElementById('local-grid');

// Section Elements
const moviesSection = document.getElementById('movies-section');
const tvshowsSection = document.getElementById('tvshows-section');
const animeSection = document.getElementById('anime-section');
const localSection = document.getElementById('local-section');

// Current Media State
let currentMedia = null;
let currentSeason = 1;
let currentEpisode = 1;

// Local videos data
let localVideos = [];

// Initialize the Application
document.addEventListener('DOMContentLoaded', function() {
    // Load content for each section
    loadMoviesContent();
    loadTVShowsContent();
    loadAnimeContent();
    loadLocalVideosContent();
    
    // Set up event listeners
    setupEventListeners();
    
    // Make Movies tab active by default
    moviesSection.style.display = 'block';
});

// Event Listeners Setup
function setupEventListeners() {
    // Navigation menu clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            hideAllSections();
            
            switch(category) {
                case 'movies':
                    moviesSection.style.display = 'block';
                    break;
                case 'tvshows':
                    tvshowsSection.style.display = 'block';
                    break;
                case 'anime':
                    animeSection.style.display = 'block';
                    break;
                case 'local':
                    localSection.style.display = 'block';
                    // Refresh local videos when tab is clicked
                    loadLocalVideosContent();
                    break;
            }
        });
    });
    
    // Back button click
    backBtn.addEventListener('click', function() {
        // Stop the video
        if (videoPlayer.src.includes('youtube.com')) {
            // If it's a YouTube iframe
            const iframe = document.querySelector('.video-container iframe');
            if (iframe) {
                // Replace iframe src to stop video
                iframe.src = iframe.src;
            }
        } else if (document.querySelector('.video-container iframe')) {
            // For Google Drive iframe or any other iframe
            const iframe = document.querySelector('.video-container iframe');
            if (iframe) {
                iframe.src = iframe.src;
            }
        } else {
            // For regular video player
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
            videoPlayer.src = '';
        }
        
        // Hide player, show content
        playerSection.style.display = 'none';
        contentSection.style.display = 'block';
        
        // Reset current media
        currentMedia = null;
    });
    
    // Season select change
    seasonSelect.addEventListener('change', function() {
        currentSeason = parseInt(this.value);
        loadEpisodes(currentMedia, currentSeason);
    });
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Load Movies Content
function loadMoviesContent() {
    moviesGrid.innerHTML = '';
    
    mediaData.movies.forEach(movie => {
        createMediaCard(moviesGrid, movie, 'movie');
    });
}

// Load TV Shows Content
function loadTVShowsContent() {
    tvshowsGrid.innerHTML = '';
    
    mediaData.tvshows.forEach(show => {
        createMediaCard(tvshowsGrid, show, 'tvshow');
    });
}

// Load Anime Content
function loadAnimeContent() {
    animeGrid.innerHTML = '';
    
    mediaData.anime.forEach(anime => {
        createMediaCard(animeGrid, anime, 'anime');
    });
}

// Load Local Videos Content
// Replace the existing loadLocalVideosContent function with this updated version
// Update loadLocalVideosContent function to include .osr files
function loadLocalVideosContent() {
    localGrid.innerHTML = `
        <div class="folder-selector">
            <p>Select a folder containing your videos and osu replays</p>
            <button id="select-folder-btn" class="folder-btn">
                <i class="fas fa-folder-open"></i> Select Folder
            </button>
        </div>
    `;

    // Add event listener to the select folder button
    document.getElementById('select-folder-btn').addEventListener('click', async () => {
        try {
            // Check if the File System Access API is supported
            if (!('showDirectoryPicker' in window)) {
                localGrid.innerHTML = `
                    <p class="no-results">Your browser doesn't support the File System Access API. 
                    Please use Chrome, Edge, or Opera for this feature.</p>
                `;
                return;
            }

            localGrid.innerHTML = '<p class="loading">Scanning folder...</p>';
            
            // Ask the user to select a directory
            const dirHandle = await window.showDirectoryPicker();
            const mediaFiles = [];
            
            // Function to process files in the directory
            async function processFiles(handle, path = '') {
                for await (const entry of handle.values()) {
                    const entryPath = path ? `${path}/${entry.name}` : entry.name;
                    
                    if (entry.kind === 'directory') {
                        // Recursively process subdirectories
                        await processFiles(entry, entryPath);
                    } else if (entry.kind === 'file') {
                        // Check if the file is a video or osu replay
                        const fileName = entry.name.toLowerCase();
                        if (fileName.endsWith('.mp4') || 
                            fileName.endsWith('.webm') || 
                            fileName.endsWith('.mov') || 
                            fileName.endsWith('.mkv') || 
                            fileName.endsWith('.avi') ||
                            fileName.endsWith('.osr')) { // Added .osr extension
                            
                            // Get file metadata
                            const file = await entry.getFile();
                            
                            // Determine file type and create appropriate object
                            const isOsuReplay = fileName.endsWith('.osr');
                            
                            // Create a media object
                            mediaFiles.push({
                                id: `local-${mediaFiles.length}`,
                                title: entry.name.replace(/\.[^/.]+$/, "").replace(/_/g, ' '),
                                path: entryPath,
                                file: file, // Store the file object for later use
                                src: URL.createObjectURL(file), // Create a blob URL for the file
                                year: new Date(file.lastModified).getFullYear(),
                                duration: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                                rating: 'Local',
                                description: `Local ${isOsuReplay ? 'osu! replay' : 'video'} from: ${entryPath}`,
                                type: isOsuReplay ? 'osr' : 'video'
                            });
                        }
                    }
                }
            }
            
            // Process the selected directory
            await processFiles(dirHandle);
            
            // Update localVideos array
            localVideos = mediaFiles;
            
            // Display the files
            localGrid.innerHTML = '';
            
            if (mediaFiles.length === 0) {
                localGrid.innerHTML = '<p class="no-results">No video or osu replay files found in the selected directory.</p>';
                return;
            }
            
            mediaFiles.forEach(media => {
                createLocalMediaCard(localGrid, media);
            });
            
        } catch (error) {
            console.error('Error accessing files:', error);
            
            // Check if the error was due to user cancelling the dialog
            if (error.name !== 'AbortError') {
                localGrid.innerHTML = `<p class="no-results">Error accessing files: ${error.message}</p>`;
            } else {
                localGrid.innerHTML = `
                    <div class="folder-selector">
                        <p>Select a folder containing your videos and osu replays</p>
                        <button id="select-folder-btn" class="folder-btn">
                            <i class="fas fa-folder-open"></i> Select Folder
                        </button>
                    </div>
                `;
                // Re-add the event listener since we recreated the button
                document.getElementById('select-folder-btn').addEventListener('click', loadLocalVideosContent);
            }
        }
    });
}

// Update the createLocalMediaCard function to handle different file types
function createLocalMediaCard(container, media) {
    const card = document.createElement('div');
    card.className = 'media-card';
    card.setAttribute('data-id', media.id);
    card.setAttribute('data-type', 'local');
    
    // Use different icon and styling based on file type
    let iconClass = media.type === 'osr' ? 'fa-gamepad' : 'fa-file-video';
    let cardColor = media.type === 'osr' ? '#f06292' : '#333'; // Pink for osu, dark gray for videos
    
    card.innerHTML = `
        <div class="local-media-thumbnail" style="background-color: ${cardColor}; height: 300px; display: flex; align-items: center; justify-content: center;">
            <i class="fas ${iconClass}" style="font-size: 48px; color: #fff;"></i>
        </div>
        <div class="media-info-overlay">
            <h3>${media.title}</h3>
            <p>${media.year} | ${media.type === 'osr' ? 'osu! replay' : media.duration}</p>
        </div>
    `;
    
    card.addEventListener('click', function() {
        const mediaId = this.getAttribute('data-id');
        playLocalMedia(mediaId);
    });
    
    container.appendChild(card);
    
    // For video files, try to generate thumbnails (same as before)
    if (media.type === 'video' && media.file && media.file.type.startsWith('video/')) {
        const tempVideo = document.createElement('video');
        tempVideo.src = media.src;
        tempVideo.muted = true;
        tempVideo.preload = 'metadata';
        
        // Try to capture a frame when metadata is loaded
        tempVideo.addEventListener('loadedmetadata', function() {
            // Seek to 25% of the video
            tempVideo.currentTime = tempVideo.duration * 0.25;
        });
        
        // When we have a frame, capture it as a thumbnail
        tempVideo.addEventListener('seeked', function() {
            // Create a canvas to capture the frame
            const canvas = document.createElement('canvas');
            canvas.width = tempVideo.videoWidth;
            canvas.height = tempVideo.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
            
            // Use the canvas as the thumbnail
            try {
                const thumbnailUrl = canvas.toDataURL('image/jpeg');
                card.querySelector('.local-media-thumbnail').innerHTML = `<img src="${thumbnailUrl}" alt="${media.title}">`;
                
                // Update duration to show actual video duration
                const durationMinutes = Math.floor(tempVideo.duration / 60);
                const durationSeconds = Math.floor(tempVideo.duration % 60);
                const formattedDuration = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
                
                card.querySelector('.media-info-overlay p').innerHTML = `${media.year} | ${formattedDuration}`;
                
                // Update the media object
                media.duration = formattedDuration;
            } catch (e) {
                console.warn('Could not generate thumbnail:', e);
            }
            
            // Clean up
            URL.revokeObjectURL(tempVideo.src);
        });
        
        // Handle errors
        tempVideo.addEventListener('error', function() {
            console.warn('Error generating thumbnail for', media.title);
        });
    }
}

// Update the playLocalMedia function to handle osu replay files
function playLocalMedia(id) {
    // Find the media
    const media = localVideos.find(video => video.id === id);
    
    if (!media) return;
    
    // Set current media
    currentMedia = media;
    
    // Update media info
    mediaTitle.textContent = media.title;
    mediaYear.textContent = media.year;
    mediaRating.textContent = media.rating;
    mediaDuration.textContent = media.type === 'osr' ? 'osu! replay' : media.duration;
    mediaDescription.textContent = media.description;
    
    // Set up for file playback
    episodeSelector.style.display = 'none';
    
    // Create or get the video container
    const videoContainer = document.querySelector('.video-container');
    
    // Handle based on file type
    if (media.type === 'osr') {
        // Special handling for osu replay files
        videoContainer.innerHTML = `
            <div class="osu-replay-viewer">
                <div class="osu-icon">
                    <i class="fas fa-gamepad" style="font-size: 64px; color: #f06292;"></i>
                </div>
                <h3>osu! replay file</h3>
                <p>Filename: ${media.path}</p>
                <p>Size: ${media.duration}</p>
                <div class="osu-actions">
                    <button id="download-osr" class="osu-button">
                        <i class="fas fa-download"></i> Download Replay
                    </button>
                    <p class="osu-note">Open this file with osu! to view the replay</p>
                </div>
            </div>
        `;
        
        // Add download functionality
        document.getElementById('download-osr').addEventListener('click', function() {
            const a = document.createElement('a');
            a.href = media.src;
            a.download = media.title + '.osr';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
        
    } else {
        // For regular video files, use the same code as before
        videoContainer.innerHTML = `
            <video id="video-player" controls>
                <source src="${media.src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="file-path-note">
                <p>File: ${media.path}</p>
            </div>
        `;
        
        // Get the video player again after recreating it
        const videoPlayer = document.getElementById('video-player');
        videoPlayer.load();
        videoPlayer.play().catch(error => {
            console.error('Error playing video:', error);
            videoContainer.innerHTML += `
                <div class="error-message">
                    <p>Error playing video. Some video formats may not be supported by your browser.</p>
                </div>
            `;
        });
    }
    
    // Hide content, show player
    contentSection.style.display = 'none';
    playerSection.style.display = 'block';
}

// Update the playLocalMedia function to handle the local file
function playLocalMedia(id) {
    // Find the media
    const media = localVideos.find(video => video.id === id);
    
    if (!media) return;
    
    // Set current media
    currentMedia = media;
    
    // Update media info
    mediaTitle.textContent = media.title;
    mediaYear.textContent = media.year;
    mediaRating.textContent = media.rating;
    mediaDuration.textContent = media.duration;
    mediaDescription.textContent = media.description;
    
    // Set up for local file playback
    episodeSelector.style.display = 'none';
    
    // Create or get the video container
    const videoContainer = document.querySelector('.video-container');
    
    // For local files, use the Blob URL we created
    videoContainer.innerHTML = `
        <video id="video-player" controls>
            <source src="${media.src}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="file-path-note">
            <p>File: ${media.path}</p>
        </div>
    `;
    
    // Get the video player again after recreating it
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.load();
    videoPlayer.play().catch(error => {
        console.error('Error playing video:', error);
        videoContainer.innerHTML += `
            <div class="error-message">
                <p>Error playing video. Some video formats may not be supported by your browser.</p>
            </div>
        `;
    });
    
    // Hide content, show player
    contentSection.style.display = 'none';
    playerSection.style.display = 'block';
}

// Update the createLocalMediaCard function to generate thumbnails
function createLocalMediaCard(container, media) {
    const card = document.createElement('div');
    card.className = 'media-card';
    card.setAttribute('data-id', media.id);
    card.setAttribute('data-type', 'local');
    
    // Try to generate a thumbnail using a temporary video element
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'local-media-thumbnail';
    thumbnailContainer.innerHTML = `<i class="fas fa-file-video" style="font-size: 48px; color: #666;"></i>`;
    
    // Create the info overlay
    const infoOverlay = document.createElement('div');
    infoOverlay.className = 'media-info-overlay';
    infoOverlay.innerHTML = `
        <h3>${media.title}</h3>
        <p>${media.year} | ${media.duration}</p>
    `;
    
    // Add elements to the card
    card.appendChild(thumbnailContainer);
    card.appendChild(infoOverlay);
    
    // Add click event listener
    card.addEventListener('click', function() {
        const mediaId = this.getAttribute('data-id');
        playLocalMedia(mediaId);
    });
    
    container.appendChild(card);
    
    // Try to generate a thumbnail asynchronously
    if (media.file && media.file.type.startsWith('video/')) {
        const tempVideo = document.createElement('video');
        tempVideo.src = media.src;
        tempVideo.muted = true;
        tempVideo.preload = 'metadata';
        
        // Try to capture a frame when metadata is loaded
        tempVideo.addEventListener('loadedmetadata', function() {
            // Seek to 25% of the video
            tempVideo.currentTime = tempVideo.duration * 0.25;
        });
        
        // When we have a frame, capture it as a thumbnail
        tempVideo.addEventListener('seeked', function() {
            // Create a canvas to capture the frame
            const canvas = document.createElement('canvas');
            canvas.width = tempVideo.videoWidth;
            canvas.height = tempVideo.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
            
            // Use the canvas as the thumbnail
            try {
                const thumbnailUrl = canvas.toDataURL('image/jpeg');
                thumbnailContainer.innerHTML = `<img src="${thumbnailUrl}" alt="${media.title}">`;
                
                // Update duration to show actual video duration
                const durationMinutes = Math.floor(tempVideo.duration / 60);
                const durationSeconds = Math.floor(tempVideo.duration % 60);
                const formattedDuration = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
                
                infoOverlay.innerHTML = `
                    <h3>${media.title}</h3>
                    <p>${media.year} | ${formattedDuration}</p>
                `;
                
                // Update the media object
                media.duration = formattedDuration;
            } catch (e) {
                console.warn('Could not generate thumbnail:', e);
            }
            
            // Clean up
            URL.revokeObjectURL(tempVideo.src);
        });
        
        // Handle errors
        tempVideo.addEventListener('error', function() {
            console.warn('Error generating thumbnail for', media.title);
        });
    }
}

// Create Local Media Card
function createLocalMediaCard(container, media) {
    const card = document.createElement('div');
    card.className = 'media-card';
    card.setAttribute('data-id', media.id);
    card.setAttribute('data-type', 'local');
    
    // Create default poster or placeholder
    let posterImg = '/api/placeholder/200/300';
    
    card.innerHTML = `
        <div class="local-media-thumbnail" style="background-color: #333; height: 300px; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-file-video" style="font-size: 48px; color: #666;"></i>
        </div>
        <div class="media-info-overlay">
            <h3>${media.title}</h3>
            <p>${media.year} | ${media.duration}</p>
        </div>
    `;
    
    card.addEventListener('click', function() {
        const mediaId = this.getAttribute('data-id');
        playLocalMedia(mediaId);
    });
    
    container.appendChild(card);
    
    // Try to generate a thumbnail from the video if possible (not directly possible due to browser security)
    // In a real app, the server would handle thumbnail generation
}

// Play Local Media Function
function playLocalMedia(id) {
    // Find the media
    const media = localVideos.find(video => video.id === id);
    
    if (!media) return;
    
    // Set current media
    currentMedia = media;
    
    // Update media info
    mediaTitle.textContent = media.title;
    mediaYear.textContent = media.year;
    mediaRating.textContent = media.rating;
    mediaDuration.textContent = media.duration;
    mediaDescription.textContent = media.description;
    
    // Set up for local file playback
    episodeSelector.style.display = 'none';
    
    // Create or get the video container
    const videoContainer = document.querySelector('.video-container');
    
    // Note: Due to security restrictions, browsers won't allow direct file:// URLs
    // For a full implementation, you would need to serve the files through your server
    videoContainer.innerHTML = `
        <video id="video-player" controls>
            <source src="${media.src}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="file-path-note">
            <p>File path: ${media.path}</p>
            <p class="notice">Note: Due to browser security restrictions, playing local files directly may not work. 
            Consider using a server to stream the files.</p>
        </div>
    `;
    
    // Hide content, show player
    contentSection.style.display = 'none';
    playerSection.style.display = 'block';
}

// Create Media Card
function createMediaCard(container, media, type) {
    const card = document.createElement('div');
    card.className = 'media-card';
    card.setAttribute('data-id', media.id);
    card.setAttribute('data-type', type);
    
    card.innerHTML = `
        <img src="${media.poster}" alt="${media.title}">
        <div class="media-info-overlay">
            <h3>${media.title}</h3>
            <p>${media.year} | ${media.rating}</p>
        </div>
    `;
    
    card.addEventListener('click', function() {
        const mediaId = this.getAttribute('data-id');
        const mediaType = this.getAttribute('data-type');
        
        playMedia(mediaId, mediaType);
    });
    
    container.appendChild(card);
}

// Function to check if URL is a YouTube link
function isYouTubeLink(url) {
    return url && (
        url.includes('youtube.com/watch') || 
        url.includes('youtu.be/') ||
        url.includes('youtube.com/embed/')
    );
}

// Function to check if URL is a Google Drive link
function isGoogleDriveLink(url) {
    return url && (
        url.includes('drive.google.com/file') ||
        url.includes('drive.google.com/open') ||
        url.includes('archive.org/embed')
    );
}

// Function to extract YouTube video ID
function getYouTubeVideoId(url) {
    if (!url) return null;
    
    // Handle youtu.be format
    if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split('?')[0];
    }
    
    // Handle youtube.com/watch format
    if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get('v');
    }
    
    // Handle youtube.com/embed format
    if (url.includes('youtube.com/embed/')) {
        return url.split('youtube.com/embed/')[1].split('?')[0];
    }
    
    return null;
}

// Function to format Google Drive URL for embedding
function formatGoogleDriveUrl(url) {
    // If the URL is already in the correct format for embedding
    if (url.includes('drive.google.com/file') && url.includes('/preview')) {
        return url;
    }
    
    // Extract the file ID from different Google Drive URL formats
    let fileId = null;
    
    if (url.includes('drive.google.com/file/d/')) {
        // Format: https://drive.google.com/file/d/FILE_ID/view
        fileId = url.split('drive.google.com/file/d/')[1].split('/')[0];
    } else if (url.includes('drive.google.com/open?id=')) {
        // Format: https://drive.google.com/open?id=FILE_ID
        fileId = url.split('drive.google.com/open?id=')[1].split('&')[0];
    }
    
    if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    
    // Return original URL if we couldn't process it
    return url;
}

// Play Media Function
function playMedia(id, type) {
    // Find the media
    let media;
    
    switch(type) {
        case 'movie':
            media = mediaData.movies.find(movie => movie.id === id);
            break;
        case 'tvshow':
            media = mediaData.tvshows.find(show => show.id === id);
            break;
        case 'anime':
            media = mediaData.anime.find(anime => anime.id === id);
            break;
    }
    
    if (!media) return;
    
    // Set current media
    currentMedia = media;
    
    // Update media info
    mediaTitle.textContent = media.title;
    mediaYear.textContent = media.year;
    mediaRating.textContent = media.rating;
    mediaDuration.textContent = media.duration;
    mediaDescription.textContent = media.description;
    
    // Create or get the video container
    const videoContainer = document.querySelector('.video-container');
    
    // Check if it's a movie or series
    if (type === 'movie') {
        // Set up for movie playback
        episodeSelector.style.display = 'none';
        
        if (isYouTubeLink(media.src)) {
            // Handle YouTube video
            const videoId = getYouTubeVideoId(media.src);
            if (videoId) {
                // Replace video player with YouTube iframe
                videoContainer.innerHTML = `
                    <iframe 
                        id="youtube-player" 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
            }
        } else if (isGoogleDriveLink(media.src)) {
            // Handle Google Drive video
            const embedUrl = formatGoogleDriveUrl(media.src);
            // Replace video player with Google Drive iframe
            videoContainer.innerHTML = `
                <iframe 
                    id="drive-player" 
                    width="100%" 
                    height="100%" 
                    src="${embedUrl}" 
                    frameborder="0" 
                    allow="autoplay"
                    allowfullscreen>
                </iframe>
            `;
        } else {
            // Standard video player for direct video files
            videoContainer.innerHTML = `
                <video id="video-player" controls>
                    <source src="${media.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            // Get the video player again after recreating it
            const videoPlayer = document.getElementById('video-player');
            videoPlayer.load();
            videoPlayer.play();
        }
    } else {
        // For TV shows and anime, set up episode selector
        episodeSelector.style.display = 'block';
        
        // Set up seasons dropdown
        setupSeasonSelect(media);
        
        // Load episodes for the first season
        currentSeason = 1;
        loadEpisodes(media, currentSeason);
        
        // Set video source to first episode
        if (media.seasons && media.seasons.length > 0 && 
            media.seasons[0].episodes && media.seasons[0].episodes.length > 0) {
            
            currentEpisode = 1;
            const firstEpisodeSrc = media.seasons[0].episodes[0].src;
            
            if (isYouTubeLink(firstEpisodeSrc)) {
                // Handle YouTube video for TV episode
                const videoId = getYouTubeVideoId(firstEpisodeSrc);
                if (videoId) {
                    // Replace video player with YouTube iframe
                    videoContainer.innerHTML = `
                        <iframe 
                            id="youtube-player" 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    `;
                }
            } else if (isGoogleDriveLink(firstEpisodeSrc)) {
                // Handle Google Drive video for TV episode
                const embedUrl = formatGoogleDriveUrl(firstEpisodeSrc);
                // Replace video player with Google Drive iframe
                videoContainer.innerHTML = `
                    <iframe 
                        id="drive-player" 
                        width="100%" 
                        height="100%" 
                        src="${embedUrl}" 
                        frameborder="0" 
                        allow="autoplay"
                        allowfullscreen>
                    </iframe>
                `;
            } else {
                // Standard video player for direct video files
                videoContainer.innerHTML = `
                    <video id="video-player" controls>
                        <source src="${firstEpisodeSrc}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
                // Get the video player again after recreating it
                const videoPlayer = document.getElementById('video-player');
                videoPlayer.load();
                videoPlayer.play();
            }
        }
    }
    
    // Hide content, show player
    contentSection.style.display = 'none';
    playerSection.style.display = 'block';
}

// Setup Season Select
function setupSeasonSelect(media) {
    seasonSelect.innerHTML = '';
    
    if (media.seasons && media.seasons.length > 0) {
        media.seasons.forEach(season => {
            const option = document.createElement('option');
            option.value = season.season;
            option.textContent = `Season ${season.season}`;
            seasonSelect.appendChild(option);
        });
    }
}

// Load Episodes for a Season
function loadEpisodes(media, seasonNum) {
    episodesGrid.innerHTML = '';
    
    if (media.seasons && media.seasons.length > 0) {
        const season = media.seasons.find(s => s.season === seasonNum);
        
        if (season && season.episodes && season.episodes.length > 0) {
            season.episodes.forEach(episode => {
                const episodeBtn = document.createElement('button');
                episodeBtn.className = 'episode-button';
                episodeBtn.setAttribute('data-episode', episode.episode);
                episodeBtn.innerHTML = `<span>${episode.episode}</span><small>${episode.title}</small>`;
                
                if (episode.episode === currentEpisode) {
                    episodeBtn.classList.add('active');
                }
                
                episodeBtn.addEventListener('click', function() {
                    const epNumber = parseInt(this.getAttribute('data-episode'));
                    
                    // Update active episode
                    document.querySelectorAll('.episode-button').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Update current episode
                    currentEpisode = epNumber;
                    
                    // Get the video container
                    const videoContainer = document.querySelector('.video-container');
                    
                    // Update video source
                    if (isYouTubeLink(episode.src)) {
                        // Handle YouTube video
                        const videoId = getYouTubeVideoId(episode.src);
                        if (videoId) {
                            // Replace video player with YouTube iframe
                            videoContainer.innerHTML = `
                                <iframe 
                                    id="youtube-player" 
                                    width="100%" 
                                    height="100%" 
                                    src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                                </iframe>
                            `;
                        }
                    } else if (isGoogleDriveLink(episode.src)) {
                        // Handle Google Drive video
                        const embedUrl = formatGoogleDriveUrl(episode.src);
                        // Replace video player with Google Drive iframe
                        videoContainer.innerHTML = `
                            <iframe 
                                id="drive-player" 
                                width="100%" 
                                height="100%" 
                                src="${embedUrl}" 
                                frameborder="0" 
                                allow="autoplay"
                                allowfullscreen>
                            </iframe>
                        `;
                    } else {
                        // Standard video player for direct video files
                        videoContainer.innerHTML = `
                            <video id="video-player" controls>
                                <source src="${episode.src}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        `;
                        // Get the video player again after recreating it
                        const videoPlayer = document.getElementById('video-player');
                        videoPlayer.load();
                        videoPlayer.play();
                    }
                });
                
                episodesGrid.appendChild(episodeBtn);
            });
        }
    }
}

// Hide All Sections
function hideAllSections() {
    moviesSection.style.display = 'none';
    tvshowsSection.style.display = 'none';
    animeSection.style.display = 'none';
    localSection.style.display = 'none';
}

// Perform Search
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') return;
    
    // Show all sections to search across everything
    hideAllSections();
    
    // Clear all grids
    moviesGrid.innerHTML = '';
    tvshowsGrid.innerHTML = '';
    animeGrid.innerHTML = '';
    localGrid.innerHTML = '';
    
    // Search movies
    const matchedMovies = mediaData.movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) || 
        movie.description.toLowerCase().includes(searchTerm)
    );
    
    // Search TV shows
    const matchedTVShows = mediaData.tvshows.filter(show => 
        show.title.toLowerCase().includes(searchTerm) || 
        show.description.toLowerCase().includes(searchTerm)
    );
    
    // Search anime
    const matchedAnime = mediaData.anime.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm) || 
        anime.description.toLowerCase().includes(searchTerm)
    );
    
    // Search local videos
    const matchedLocalVideos = localVideos.filter(video => 
        video.title.toLowerCase().includes(searchTerm)
    );
    
    // Display results
    if (matchedMovies.length > 0) {
        moviesSection.style.display = 'block';
        matchedMovies.forEach(movie => createMediaCard(moviesGrid, movie, 'movie'));
    }
    
    if (matchedTVShows.length > 0) {
        tvshowsSection.style.display = 'block';
        matchedTVShows.forEach(show => createMediaCard(tvshowsGrid, show, 'tvshow'));
    }
    
    if (matchedAnime.length > 0) {
        animeSection.style.display = 'block';
        matchedAnime.forEach(anime => createMediaCard(animeGrid, anime, 'anime'));
    }
    
    if (matchedLocalVideos.length > 0) {
        localSection.style.display = 'block';
        matchedLocalVideos.forEach(video => createLocalMediaCard(localGrid, video));
    }
    
    // If no results, show message
    if (matchedMovies.length === 0 && matchedTVShows.length === 0 && 
        matchedAnime.length === 0 && matchedLocalVideos.length === 0) {
        moviesSection.style.display = 'block';
        moviesGrid.innerHTML = `<p class="no-results">No results found for "${searchTerm}".</p>`;
    }
}