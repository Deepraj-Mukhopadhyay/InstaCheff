// Global Profile Picture Manager
// This script manages profile picture updates across all pages

class GlobalProfileManager {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.updateHeaderProfilePicture();
        this.bindHeaderProfileClick();
        
        // Listen for profile picture changes from other pages
        window.addEventListener('storage', (e) => {
            if (e.key === 'profilePicture' || e.key === null) {
                // Update when profilePicture is changed or removed
                this.updateHeaderProfilePicture();
            }
        });

        // Listen for custom profile update events
        window.addEventListener('profilePictureUpdated', () => {
            this.updateHeaderProfilePicture();
        });
    }

    updateHeaderProfilePicture() {
        const headerProfileImg = document.querySelector('.profile-button img');
        
        if (headerProfileImg) {
            const savedPicture = localStorage.getItem('profilePicture');
            
            if (savedPicture) {
                headerProfileImg.src = savedPicture;
            } else {
                // Use default profile icon if no custom picture is set
                headerProfileImg.src = '../images/user-icon.png';
            }
            
            // Make header profile image circular and properly sized
            headerProfileImg.style.width = '32px';
            headerProfileImg.style.height = '32px';
            headerProfileImg.style.borderRadius = '50%';
            headerProfileImg.style.objectFit = 'cover';
            headerProfileImg.style.border = '2px solid #f0f0f0';
            headerProfileImg.style.transition = 'all 0.2s ease';
        }
    }

    bindHeaderProfileClick() {
        const profileButton = document.querySelector('.profile-button');
        if (profileButton) {
            profileButton.addEventListener('click', () => {
                // Navigate to profile page
                window.location.href = 'profile.html';
            });
        }
    }

    // Method to be called when profile picture is updated
    static notifyProfilePictureUpdated() {
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('profilePictureUpdated'));
        
        // Also trigger storage event manually for same-page updates
        const currentPicture = localStorage.getItem('profilePicture');
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'profilePicture',
            newValue: currentPicture,
            oldValue: null
        }));
    }
}

// Initialize global profile manager
const globalProfileManager = new GlobalProfileManager();

// Export for use in other scripts
window.GlobalProfileManager = GlobalProfileManager;