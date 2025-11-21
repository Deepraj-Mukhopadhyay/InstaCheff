// Profile Picture Management
class ProfilePictureManager {
    constructor() {
        this.modal = null;
        this.profileAvatar = null;
        this.currentPictureImg = null;
        this.fileInput = null;
        this.defaultAvatarPath = '../images/user-icon.png';
        this.setup();
    }

    setup() {
        this.modal = document.getElementById('profilePictureModal');
        this.profileAvatar = document.querySelector('#profile-image');
        this.currentPictureImg = document.querySelector('#currentPictureImg');
        
        // Create hidden file input
        this.createFileInput();
        
        // Bind events
        this.bindEvents();
        
        // Load saved profile picture
        this.loadSavedPicture();
        
        // Load saved profile data
        this.loadProfileData();
        
        // Bind edit profile and settings buttons
        this.bindActionButtons();
    }

    createFileInput() {
        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.accept = 'image/*';
        this.fileInput.style.display = 'none';
        document.body.appendChild(this.fileInput);
        
        this.fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });
    }

    bindEvents() {
        // Profile image and edit button clicks
        const profileImage = document.querySelector('#profile-image');
        const editAvatarBtn = document.querySelector('#edit-avatar-button');
        
        if (profileImage) {
            profileImage.style.cursor = 'pointer';
            profileImage.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showQuickActions(e);
            });
        }
        
        if (editAvatarBtn) {
            editAvatarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showQuickActions(e);
            });
        }

        // Modal close events
        const closeBtn = document.querySelector('.modal-close');
        const overlay = document.querySelector('.modal-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this.closeModal());
        }

        // Modal buttons (if modal exists)
        const cancelBtn = document.querySelector('#cancelBtn');
        const saveBtn = document.querySelector('#saveBtn');

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.savePicture());
        }

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        if (this.modal) {
            // Update current picture in modal to show actual current image
            if (this.currentPictureImg && this.profileAvatar) {
                this.currentPictureImg.src = this.profileAvatar.src;
            }
            
            this.modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    // Quick action menu (WhatsApp-style)
    showQuickActions(event) {
        event.stopPropagation();
        
        // Remove existing quick menu
        const existingMenu = document.querySelector('.quick-actions-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menu = document.createElement('div');
        menu.className = 'quick-actions-menu';
        menu.innerHTML = `
            <div class="quick-action" data-action="upload">
                <i class="fas fa-upload"></i>
                <span>Upload Photo</span>
            </div>
            <div class="quick-action" data-action="camera">
                <i class="fas fa-camera"></i>
                <span>Take Photo</span>
            </div>
            <div class="quick-action" data-action="view">
                <i class="fas fa-eye"></i>
                <span>View Photo</span>
            </div>
            <div class="quick-action" data-action="remove">
                <i class="fas fa-trash"></i>
                <span>Remove Photo</span>
            </div>
        `;

        // Position menu
        const rect = this.profileAvatar.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = (rect.bottom + window.scrollY + 10) + 'px';
        menu.style.left = (rect.left + rect.width/2) + 'px';
        menu.style.transform = 'translateX(-50%)';
        menu.style.zIndex = '1002';

        document.body.appendChild(menu);

        // Add event listeners
        menu.querySelectorAll('.quick-action').forEach(action => {
            action.addEventListener('click', (e) => {
                const actionType = e.currentTarget.dataset.action;
                this.handleQuickAction(actionType);
                menu.remove();
            });
        });

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', () => {
                if (menu.parentNode) {
                    menu.remove();
                }
            }, { once: true });
        }, 100);
    }

    handleQuickAction(action) {
        switch(action) {
            case 'upload':
                this.openFileSelector();
                break;
            case 'camera':
                this.openCamera();
                break;
            case 'view':
                this.viewFullImage();
                break;
            case 'remove':
                this.confirmRemovePicture();
                break;
        }
    }

    viewFullImage() {
        const fullImageModal = document.createElement('div');
        fullImageModal.className = 'full-image-modal';
        const currentSrc = this.profileAvatar ? this.profileAvatar.src : this.defaultAvatarPath;
        fullImageModal.innerHTML = `
            <div class="full-image-overlay"></div>
            <div class="full-image-content">
                <img src="${currentSrc}" alt="Profile Picture">
                <button class="close-full-image">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(fullImageModal);

        // Close handlers
        const closeBtn = fullImageModal.querySelector('.close-full-image');
        const overlay = fullImageModal.querySelector('.full-image-overlay');

        [closeBtn, overlay].forEach(element => {
            element.addEventListener('click', () => {
                fullImageModal.remove();
            });
        });

        // Add styles
        if (!document.querySelector('#full-image-styles')) {
            const style = document.createElement('style');
            style.id = 'full-image-styles';
            style.textContent = `
                .full-image-modal {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    z-index: 1003;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .full-image-overlay {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    cursor: pointer;
                }
                .full-image-content {
                    position: relative;
                    max-width: 90vw;
                    max-height: 90vh;
                }
                .full-image-content img {
                    max-width: 100%;
                    max-height: 100%;
                    border-radius: 12px;
                }
                .close-full-image {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    confirmRemovePicture() {
        
        // Create modal with unique IDs to avoid conflicts
        const modalId = 'confirm-modal-' + Date.now();
        const confirmModal = document.createElement('div');
        confirmModal.id = modalId;
        confirmModal.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(2px);
        `;
        
        confirmModal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 16px;
                text-align: center;
                max-width: 350px;
                width: 90%;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                position: relative;
                z-index: 10001;
            ">
                <div style="margin-bottom: 20px;">
                    <i class="fas fa-exclamation-triangle" style="
                        font-size: 48px;
                        color: #ffc107;
                        margin-bottom: 16px;
                        display: block;
                    "></i>
                    <h3 style="
                        margin: 0 0 12px 0;
                        color: #333;
                        font-size: 20px;
                        font-weight: 600;
                    ">Remove Profile Picture?</h3>
                    <p style="
                        margin: 0;
                        color: #666;
                        font-size: 14px;
                        line-height: 1.4;
                    ">Are you sure you want to remove your profile picture? This action cannot be undone.</p>
                </div>
                <div style="
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                ">
                    <button id="btn-cancel-${modalId}" style="
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: 500;
                        cursor: pointer;
                        border: 2px solid #6c757d;
                        background: white;
                        color: #6c757d;
                        font-size: 14px;
                        min-width: 90px;
                        transition: all 0.2s ease;
                    ">Cancel</button>
                    <button id="btn-confirm-${modalId}" style="
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: 500;
                        cursor: pointer;
                        border: 2px solid #dc3545;
                        background: #dc3545;
                        color: white;
                        font-size: 14px;
                        min-width: 90px;
                        transition: all 0.2s ease;
                    ">Remove</button>
                </div>
            </div>
        `;

        // Add to document
        document.body.appendChild(confirmModal);
        document.body.style.overflow = 'hidden';

        // Get buttons with unique IDs
        const cancelBtn = document.getElementById(`btn-cancel-${modalId}`);
        const confirmBtn = document.getElementById(`btn-confirm-${modalId}`);



        // Remove modal function
        const removeModal = () => {
            if (confirmModal.parentNode) {
                confirmModal.parentNode.removeChild(confirmModal);
            }
            document.body.style.overflow = '';
        };

        // Cancel button
        if (cancelBtn) {
            cancelBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeModal();
            });
            
            // Add hover effect
            cancelBtn.addEventListener('mouseover', () => {
                cancelBtn.style.background = '#6c757d';
                cancelBtn.style.color = 'white';
                cancelBtn.style.transform = 'translateY(-1px)';
            });
            cancelBtn.addEventListener('mouseout', () => {
                cancelBtn.style.background = 'white';
                cancelBtn.style.color = '#6c757d';
                cancelBtn.style.transform = 'translateY(0)';
            });
        }

        // Confirm button
        if (confirmBtn) {
            confirmBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeModal();
                this.removePicture();
            });
            
            // Add hover effect
            confirmBtn.addEventListener('mouseover', () => {
                confirmBtn.style.background = '#c82333';
                confirmBtn.style.borderColor = '#c82333';
                confirmBtn.style.transform = 'translateY(-1px)';
            });
            confirmBtn.addEventListener('mouseout', () => {
                confirmBtn.style.background = '#dc3545';
                confirmBtn.style.borderColor = '#dc3545';
                confirmBtn.style.transform = 'translateY(0)';
            });
        }

        // Click outside to close
        confirmModal.addEventListener('click', (e) => {
            if (e.target === confirmModal) {
                removeModal();
            }
        });

        // ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                removeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    bindActionButtons() {
        // Edit Profile button
        const editProfileBtn = document.querySelector('#edit-profile-button');
        const settingsBtn = document.querySelector('#settings-button');

        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => this.openEditProfileModal());
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettingsModal());
        }
    }

    openEditProfileModal() {
        const editModal = document.createElement('div');
        editModal.className = 'edit-profile-modal';
        editModal.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(2px);
        `;

        // Get current profile data
        const savedData = localStorage.getItem('profileData');
        let currentName = '';
        let currentUsername = '';
        let currentBio = '';
        
        if (savedData) {
            const data = JSON.parse(savedData);
            currentName = data.name || '';
            currentUsername = data.username || '';
            currentBio = data.bio || '';
        }

        editModal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 16px;
                width: 90%;
                max-width: 450px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                position: relative;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <h2 style="margin: 0; color: #333; font-size: 24px; font-weight: 600;">
                        <i class="fas fa-edit" style="margin-right: 8px; color: #f37b20;"></i>
                        Edit Profile
                    </h2>
                    <button id="close-edit-modal" style="
                        background: none; border: none; font-size: 24px; 
                        cursor: pointer; color: #666; padding: 5px;
                        border-radius: 50%; width: 35px; height: 35px;
                        display: flex; align-items: center; justify-content: center;
                    ">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <form id="edit-profile-form" style="display: flex; flex-direction: column; gap: 20px;">
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
                            Full Name *
                        </label>
                        <input type="text" id="edit-name" value="${currentName}" placeholder="Enter your full name" style="
                            width: 100%; padding: 12px; border: 2px solid #e0e0e0;
                            border-radius: 8px; font-size: 16px; transition: border-color 0.2s;
                        ">
                    </div>
                    
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
                            Username *
                        </label>
                        <input type="text" id="edit-username" value="${currentUsername}" placeholder="Choose a unique username" style="
                            width: 100%; padding: 12px; border: 2px solid #e0e0e0;
                            border-radius: 8px; font-size: 16px; transition: border-color 0.2s;
                        ">
                    </div>
                    
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
                            Bio
                        </label>
                        <textarea id="edit-bio" rows="3" placeholder="Tell others about your cooking journey..." style="
                            width: 100%; padding: 12px; border: 2px solid #e0e0e0;
                            border-radius: 8px; font-size: 16px; resize: vertical;
                            transition: border-color 0.2s;
                        ">${currentBio}</textarea>
                    </div>
                    
                    <div style="display: flex; gap: 12px; margin-top: 10px;">
                        <button type="button" id="cancel-edit" style="
                            flex: 1; padding: 12px; border: 2px solid #6c757d;
                            background: white; color: #6c757d; border-radius: 8px;
                            font-weight: 500; cursor: pointer; transition: all 0.2s;
                        ">Cancel</button>
                        <button type="submit" style="
                            flex: 2; padding: 12px; border: none;
                            background: #f37b20; color: white; border-radius: 8px;
                            font-weight: 500; cursor: pointer; transition: all 0.2s;
                        ">Save Changes</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(editModal);
        document.body.style.overflow = 'hidden';

        // Add input focus styles
        const inputs = editModal.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.borderColor = '#f37b20';
                input.style.outline = 'none';
            });
            input.addEventListener('blur', () => {
                input.style.borderColor = '#e0e0e0';
            });
        });

        // Event handlers
        const closeModal = () => {
            if (editModal.parentNode) {
                editModal.parentNode.removeChild(editModal);
            }
            document.body.style.overflow = '';
        };

        const closeBtn = editModal.querySelector('#close-edit-modal');
        const cancelBtn = editModal.querySelector('#cancel-edit');
        const form = editModal.querySelector('#edit-profile-form');

        [closeBtn, cancelBtn].forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        // Close on outside click
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) closeModal();
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfileData(editModal);
            closeModal();
        });
    }

    saveProfileData(modal) {
        const name = modal.querySelector('#edit-name').value.trim();
        const username = modal.querySelector('#edit-username').value.trim();
        const bio = modal.querySelector('#edit-bio').value.trim();

        // Validation
        if (!name || !username) {
            this.showError('Name and username are required!');
            return;
        }

        // Update DOM elements
        const nameElement = document.querySelector('#profile-name');
        const usernameElement = document.querySelector('#profile-username');
        const bioElement = document.querySelector('#profile-bio');

        if (nameElement) nameElement.textContent = name;
        if (usernameElement) usernameElement.textContent = '@' + username;
        if (bioElement) bioElement.textContent = bio || 'Tap "Edit Profile" to add your bio and tell others about your cooking journey!';

        // Save to localStorage
        const profileData = { 
            name, 
            username, 
            bio: bio || '',
            recipesCount: 0,
            followersCount: 0,
            followingCount: 0
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));

        // Remove completion prompts since profile is now saved
        this.removeProfileCompletionPrompts();

        this.showSuccess('Profile updated successfully!');
    }

    loadProfileData() {
        const savedData = localStorage.getItem('profileData');
        const savedPicture = localStorage.getItem('profilePicture');
        
        const nameElement = document.querySelector('#profile-name');
        const usernameElement = document.querySelector('#profile-username');
        const bioElement = document.querySelector('#profile-bio');
        const profileImage = document.querySelector('#profile-image');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            if (nameElement && data.name) nameElement.textContent = data.name;
            if (usernameElement && data.username) usernameElement.textContent = '@' + data.username;
            if (bioElement && data.bio) bioElement.textContent = data.bio;
            
            // Update stats if available
            const recipesCountElement = document.querySelector('#recipes-count');
            const followersCountElement = document.querySelector('#followers-count');
            const followingCountElement = document.querySelector('#following-count');
            
            if (recipesCountElement) recipesCountElement.textContent = data.recipesCount || '0';
            if (followersCountElement) followersCountElement.textContent = data.followersCount || '0';
            if (followingCountElement) followingCountElement.textContent = data.followingCount || '0';
        } else {
            // No profile data found - show welcome message
            this.showWelcomePrompt();
        }
        
        // Load profile picture
        if (savedPicture && profileImage) {
            profileImage.src = savedPicture;
        } else if (profileImage) {
            profileImage.src = '../images/user-icon.png';
        }
        
        // Check if profile is incomplete and show subtle prompt
        this.checkProfileCompleteness();
    }

    showWelcomePrompt() {
        // Show a subtle welcome message for new users
        setTimeout(() => {
            this.showSuccess('Welcome to InstaChef! 👋 Complete your profile to get started.');
        }, 1000);
    }

    checkProfileCompleteness() {
        const savedData = localStorage.getItem('profileData');
        const savedPicture = localStorage.getItem('profilePicture');
        
        if (!savedData || !savedPicture) {
            // Profile is incomplete - add visual indicators
            this.addProfileCompletionPrompts();
        }
    }

    addProfileCompletionPrompts() {
        const savedData = localStorage.getItem('profileData');
        const savedPicture = localStorage.getItem('profilePicture');
        
        // Add subtle animations/indicators to incomplete elements
        if (!savedPicture) {
            const avatarButton = document.getElementById('edit-avatar-button');
            if (avatarButton) {
                avatarButton.classList.add('pulse-animation');
                avatarButton.title = 'Add your profile picture';
            }
        }
        
        if (!savedData) {
            const editButton = document.getElementById('edit-profile-button');
            if (editButton) {
                editButton.classList.add('highlight-button');
                editButton.title = 'Complete your profile';
                
                // Add a subtle notification badge
                if (!editButton.querySelector('.notification-badge')) {
                    const badge = document.createElement('span');
                    badge.className = 'notification-badge';
                    badge.style.cssText = `
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        background: #ff4757;
                        color: white;
                        border-radius: 50%;
                        width: 12px;
                        height: 12px;
                        font-size: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        animation: pulse 2s infinite;
                    `;
                    badge.textContent = '!';
                    editButton.style.position = 'relative';
                    editButton.appendChild(badge);
                }
            }
        }
        
        // Add CSS animations if not already present
        if (!document.getElementById('profile-completion-styles')) {
            const style = document.createElement('style');
            style.id = 'profile-completion-styles';
            style.textContent = `
                .pulse-animation {
                    animation: profilePulse 2s ease-in-out infinite;
                }
                
                .highlight-button {
                    animation: buttonGlow 3s ease-in-out infinite;
                }
                
                @keyframes profilePulse {
                    0%, 100% { 
                        transform: scale(1); 
                        box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.4);
                    }
                    50% { 
                        transform: scale(1.05); 
                        box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
                    }
                }
                
                @keyframes buttonGlow {
                    0%, 100% { 
                        box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
                    }
                    50% { 
                        box-shadow: 0 4px 16px rgba(74, 144, 226, 0.6);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    removeProfileCompletionPrompts() {
        // Remove visual indicators when profile is complete
        const avatarButton = document.getElementById('edit-avatar-button');
        const editButton = document.getElementById('edit-profile-button');
        
        if (avatarButton) {
            avatarButton.classList.remove('pulse-animation');
        }
        
        if (editButton) {
            editButton.classList.remove('highlight-button');
            const badge = editButton.querySelector('.notification-badge');
            if (badge) {
                badge.remove();
            }
        }
    }

    openSettingsModal() {
        const settingsModal = document.createElement('div');
        settingsModal.className = 'settings-modal';
        settingsModal.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(2px);
        `;

        settingsModal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 16px;
                width: 90%;
                max-width: 400px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                position: relative;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                    <h2 style="margin: 0; color: #333; font-size: 24px; font-weight: 600;">
                        <i class="fas fa-cog" style="margin-right: 8px; color: #6c757d;"></i>
                        Settings
                    </h2>
                    <button id="close-settings-modal" style="
                        background: none; border: none; font-size: 24px; 
                        cursor: pointer; color: #666; padding: 5px;
                        border-radius: 50%; width: 35px; height: 35px;
                        display: flex; align-items: center; justify-content: center;
                    ">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="settings-item" data-action="notifications" style="
                        display: flex; align-items: center; gap: 15px; padding: 15px;
                        border-radius: 10px; cursor: pointer; transition: background 0.2s;
                    ">
                        <i class="fas fa-bell" style="color: #28a745; font-size: 18px; width: 20px;"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 500; color: #333;">Notifications</div>
                            <div style="font-size: 13px; color: #666;">Manage notification preferences</div>
                        </div>
                        <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                    </div>
                    
                    <div class="settings-item" data-action="privacy" style="
                        display: flex; align-items: center; gap: 15px; padding: 15px;
                        border-radius: 10px; cursor: pointer; transition: background 0.2s;
                    ">
                        <i class="fas fa-shield-alt" style="color: #007bff; font-size: 18px; width: 20px;"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 500; color: #333;">Privacy</div>
                            <div style="font-size: 13px; color: #666;">Control who can see your profile</div>
                        </div>
                        <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                    </div>
                    
                    <div class="settings-item" data-action="account" style="
                        display: flex; align-items: center; gap: 15px; padding: 15px;
                        border-radius: 10px; cursor: pointer; transition: background 0.2s;
                    ">
                        <i class="fas fa-user-cog" style="color: #6f42c1; font-size: 18px; width: 20px;"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 500; color: #333;">Account</div>
                            <div style="font-size: 13px; color: #666;">Manage account settings</div>
                        </div>
                        <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                    </div>
                    
                    <div class="settings-item" data-action="help" style="
                        display: flex; align-items: center; gap: 15px; padding: 15px;
                        border-radius: 10px; cursor: pointer; transition: background 0.2s;
                    ">
                        <i class="fas fa-question-circle" style="color: #ffc107; font-size: 18px; width: 20px;"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 500; color: #333;">Help & Support</div>
                            <div style="font-size: 13px; color: #666;">Get help and contact support</div>
                        </div>
                        <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                    </div>
                    
                    <div class="settings-item" data-action="about" style="
                        display: flex; align-items: center; gap: 15px; padding: 15px;
                        border-radius: 10px; cursor: pointer; transition: background 0.2s;
                    ">
                        <i class="fas fa-info-circle" style="color: #17a2b8; font-size: 18px; width: 20px;"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 500; color: #333;">About</div>
                            <div style="font-size: 13px; color: #666;">App version and information</div>
                        </div>
                        <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(settingsModal);
        document.body.style.overflow = 'hidden';

        // Add hover effects
        const settingsItems = settingsModal.querySelectorAll('.settings-item');
        settingsItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = '#f8f9fa';
            });
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'transparent';
            });
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                this.handleSettingsAction(action);
            });
        });

        // Event handlers
        const closeModal = () => {
            if (settingsModal.parentNode) {
                settingsModal.parentNode.removeChild(settingsModal);
            }
            document.body.style.overflow = '';
        };

        const closeBtn = settingsModal.querySelector('#close-settings-modal');
        closeBtn.addEventListener('click', closeModal);

        // Close on outside click
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) closeModal();
        });
    }

    handleSettingsAction(action) {
        // Close current settings modal first
        const currentModal = document.querySelector('.settings-modal');
        if (currentModal) {
            currentModal.remove();
            document.body.style.overflow = '';
        }

        switch(action) {
            case 'notifications':
                this.openNotificationSettings();
                break;
            case 'privacy':
                this.openPrivacySettings();
                break;
            case 'account':
                this.openAccountSettings();
                break;
            case 'help':
                this.openHelpSupport();
                break;
            case 'about':
                this.openAboutPage();
                break;
            default:
                this.showSuccess('Feature coming soon!');
        }
    }

    openNotificationSettings() {
        const modal = this.createSettingsModal('Notifications', 'bell', '#28a745');
        
        // Get current settings
        const settings = JSON.parse(localStorage.getItem('notificationSettings') || '{}');
        const defaults = {
            pushNotifications: true,
            emailNotifications: false,
            recipeUpdates: true,
            newFollowers: true,
            likes: false,
            comments: true
        };
        const currentSettings = { ...defaults, ...settings };

        modal.querySelector('.modal-body').innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <h4 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">
                        <i class="fas fa-info-circle" style="color: #17a2b8; margin-right: 8px;"></i>
                        Notification Preferences
                    </h4>
                    <p style="margin: 0; color: #666; font-size: 14px;">Choose how you want to be notified about activities</p>
                </div>

                ${this.createToggleSetting('pushNotifications', 'Push Notifications', 'Get notifications on your device', 'mobile-alt', currentSettings.pushNotifications)}
                ${this.createToggleSetting('emailNotifications', 'Email Notifications', 'Get notifications via email', 'envelope', currentSettings.emailNotifications)}
                ${this.createToggleSetting('recipeUpdates', 'Recipe Updates', 'New recipes and cooking tips', 'utensils', currentSettings.recipeUpdates)}
                ${this.createToggleSetting('newFollowers', 'New Followers', 'When someone follows you', 'user-plus', currentSettings.newFollowers)}
                ${this.createToggleSetting('likes', 'Likes & Reactions', 'When someone likes your recipes', 'heart', currentSettings.likes)}
                ${this.createToggleSetting('comments', 'Comments', 'When someone comments on your recipes', 'comment', currentSettings.comments)}
            </div>
        `;

        this.bindToggleSettings(modal, 'notificationSettings');
    }

    openPrivacySettings() {
        const modal = this.createSettingsModal('Privacy', 'shield-alt', '#007bff');
        
        const settings = JSON.parse(localStorage.getItem('privacySettings') || '{}');
        const defaults = {
            profileVisibility: 'public',
            showRecipes: true,
            showFollowers: true,
            allowMessages: 'followers',
            showActivity: false
        };
        const currentSettings = { ...defaults, ...settings };

        modal.querySelector('.modal-body').innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <h4 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">
                        <i class="fas fa-lock" style="color: #007bff; margin-right: 8px;"></i>
                        Privacy Controls
                    </h4>
                    <p style="margin: 0; color: #666; font-size: 14px;">Control who can see your content and activity</p>
                </div>

                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
                        <i class="fas fa-eye" style="margin-right: 8px; color: #6c757d;"></i>
                        Profile Visibility
                    </label>
                    <select id="profileVisibility" style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 6px;">
                        <option value="public" ${currentSettings.profileVisibility === 'public' ? 'selected' : ''}>Public - Anyone can see</option>
                        <option value="followers" ${currentSettings.profileVisibility === 'followers' ? 'selected' : ''}>Followers only</option>
                        <option value="private" ${currentSettings.profileVisibility === 'private' ? 'selected' : ''}>Private - Only you</option>
                    </select>
                </div>

                ${this.createToggleSetting('showRecipes', 'Show My Recipes', 'Display your recipes on your profile', 'utensils', currentSettings.showRecipes)}
                ${this.createToggleSetting('showFollowers', 'Show Followers Count', 'Display follower and following counts', 'users', currentSettings.showFollowers)}
                
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
                        <i class="fas fa-envelope" style="margin-right: 8px; color: #6c757d;"></i>
                        Who can message you
                    </label>
                    <select id="allowMessages" style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 6px;">
                        <option value="everyone" ${currentSettings.allowMessages === 'everyone' ? 'selected' : ''}>Everyone</option>
                        <option value="followers" ${currentSettings.allowMessages === 'followers' ? 'selected' : ''}>Followers only</option>
                        <option value="none" ${currentSettings.allowMessages === 'none' ? 'selected' : ''}>No one</option>
                    </select>
                </div>

                ${this.createToggleSetting('showActivity', 'Show Activity Status', 'Let others see when you\'re active', 'circle', currentSettings.showActivity)}
            </div>
        `;

        this.bindPrivacySettings(modal);
    }

    openAccountSettings() {
        const modal = this.createSettingsModal('Account', 'user-cog', '#6f42c1');
        
        modal.querySelector('.modal-body').innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <h4 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">
                        <i class="fas fa-user-cog" style="color: #6f42c1; margin-right: 8px;"></i>
                        Account Management
                    </h4>
                    <p style="margin: 0; color: #666; font-size: 14px;">Manage your account settings and preferences</p>
                </div>

                <div class="account-option" data-action="change-password" style="
                    display: flex; align-items: center; gap: 15px; padding: 15px;
                    border: 2px solid #e9ecef; border-radius: 10px; cursor: pointer;
                    transition: all 0.2s;
                ">
                    <i class="fas fa-key" style="color: #ffc107; font-size: 18px; width: 20px;"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: #333;">Change Password</div>
                        <div style="font-size: 13px; color: #666;">Update your account password</div>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>

                <div class="account-option" data-action="export-data" style="
                    display: flex; align-items: center; gap: 15px; padding: 15px;
                    border: 2px solid #e9ecef; border-radius: 10px; cursor: pointer;
                    transition: all 0.2s;
                ">
                    <i class="fas fa-download" style="color: #17a2b8; font-size: 18px; width: 20px;"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: #333;">Export My Data</div>
                        <div style="font-size: 13px; color: #666;">Download your recipes and profile data</div>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>

                <div class="account-option" data-action="clear-cache" style="
                    display: flex; align-items: center; gap: 15px; padding: 15px;
                    border: 2px solid #e9ecef; border-radius: 10px; cursor: pointer;
                    transition: all 0.2s;
                ">
                    <i class="fas fa-broom" style="color: #28a745; font-size: 18px; width: 20px;"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: #333;">Clear Cache</div>
                        <div style="font-size: 13px; color: #666;">Clear app cache and temporary data</div>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>

                <div class="account-option" data-action="delete-account" style="
                    display: flex; align-items: center; gap: 15px; padding: 15px;
                    border: 2px solid #fff5f5; border-radius: 10px; cursor: pointer;
                    transition: all 0.2s; background: #fff5f5;
                ">
                    <i class="fas fa-trash-alt" style="color: #dc3545; font-size: 18px; width: 20px;"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: #dc3545;">Delete Account</div>
                        <div style="font-size: 13px; color: #dc3545;">Permanently delete your account</div>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #dc3545;"></i>
                </div>
            </div>
        `;

        this.bindAccountSettings(modal);
    }

    openHelpSupport() {
        const modal = this.createSettingsModal('Help & Support', 'question-circle', '#ffc107');
        
        modal.querySelector('.modal-body').innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <h4 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">
                        <i class="fas fa-life-ring" style="color: #ffc107; margin-right: 8px;"></i>
                        Get Help
                    </h4>
                    <p style="margin: 0; color: #666; font-size: 14px;">Find answers and get support for InstaChef</p>
                </div>

                <div class="help-option" data-action="faq" style="
                    display: flex; align-items: center; gap: 15px; padding: 15px;
                    border: 2px solid #e9ecef; border-radius: 10px; cursor: pointer;
                    transition: all 0.2s;
                ">
                    <i class="fas fa-question" style="color: #007bff; font-size: 18px; width: 20px;"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: #333;">FAQ</div>
                        <div style="font-size: 13px; color: #666;">Frequently asked questions</div>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>

                <div class="help-option" data-action="contact" style="
                    display: flex; align-items: center; gap: 15px; padding: 15px;
                    border: 2px solid #e9ecef; border-radius: 10px; cursor: pointer;
                    transition: all 0.2s;
                ">
                    <i class="fas fa-envelope" style="color: #28a745; font-size: 18px; width: 20px;"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: #333;">Contact Support</div>
                        <div style="font-size: 13px; color: #666;">Get in touch with our support team</div>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>

                <div class="help-option" data-action="tutorials" style="
                    display: flex; align-items: center; gap: 15px; padding: 15px;
                    border: 2px solid #e9ecef; border-radius: 10px; cursor: pointer;
                    transition: all 0.2s;
                ">
                    <i class="fas fa-play-circle" style="color: #6f42c1; font-size: 18px; width: 20px;"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: #333;">Video Tutorials</div>
                        <div style="font-size: 13px; color: #666;">Learn how to use InstaChef features</div>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>

                <div class="help-option" data-action="report-bug" style="
                    display: flex; align-items: center; gap: 15px; padding: 15px;
                    border: 2px solid #e9ecef; border-radius: 10px; cursor: pointer;
                    transition: all 0.2s;
                ">
                    <i class="fas fa-bug" style="color: #dc3545; font-size: 18px; width: 20px;"></i>
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: #333;">Report a Bug</div>
                        <div style="font-size: 13px; color: #666;">Let us know about any issues you find</div>
                    </div>
                    <i class="fas fa-chevron-right" style="color: #ccc;"></i>
                </div>
            </div>
        `;

        this.bindHelpSettings(modal);
    }

    openAboutPage() {
        const modal = this.createSettingsModal('About InstaChef', 'info-circle', '#17a2b8');
        
        modal.querySelector('.modal-body').innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px; text-align: center;">
                <div style="padding: 20px;">
                    <img src="../images/logo (2).webp" alt="InstaChef" style="width: 80px; height: 80px; border-radius: 16px; margin-bottom: 15px;">
                    <h3 style="margin: 0 0 5px 0; color: #333; font-size: 24px; font-weight: 600;">InstaChef</h3>
                    <p style="margin: 0; color: #666; font-size: 16px;">Version 1.0.0</p>
                </div>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; text-align: left;">
                    <h4 style="margin: 0 0 10px 0; color: #333;">Features</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #666; line-height: 1.6;">
                        <li>📸 Smart food scanning and recognition</li>
                        <li>🍳 Detailed recipe instructions</li>
                        <li>💾 Save your favorite recipes</li>
                        <li>👤 Personalized profile management</li>
                        <li>🔍 Explore new dishes and cuisines</li>
                    </ul>
                </div>

                <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                    <p style="margin: 0; color: #856404; font-size: 14px;">
                        <i class="fas fa-heart" style="color: #dc3545; margin-right: 5px;"></i>
                        Made with love for food enthusiasts
                    </p>
                </div>

                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
                    <div style="text-align: center;">
                        <div style="font-weight: 600; color: #333; font-size: 18px;">42+</div>
                        <div style="color: #666; font-size: 12px;">Recipes</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-weight: 600; color: #333; font-size: 18px;">10+</div>
                        <div style="color: #666; font-size: 12px;">Cuisines</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-weight: 600; color: #333; font-size: 18px;">∞</div>
                        <div style="color: #666; font-size: 12px;">Possibilities</div>
                    </div>
                </div>

                <div style="padding: 15px; background: #e8f5e8; border-radius: 8px; color: #155724; font-size: 14px;">
                    <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                    Thank you for using InstaChef!
                </div>
            </div>
        `;
    }

    createSettingsModal(title, icon, color) {
        const modal = document.createElement('div');
        modal.className = 'settings-detail-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(2px);
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 0;
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                position: relative;
            ">
                <div class="modal-header" style="
                    display: flex; justify-content: space-between; align-items: center; 
                    padding: 25px 30px; background: ${color}10; border-bottom: 1px solid #eee;
                ">
                    <h2 style="margin: 0; color: #333; font-size: 22px; font-weight: 600;">
                        <i class="fas fa-${icon}" style="margin-right: 10px; color: ${color};"></i>
                        ${title}
                    </h2>
                    <button class="close-modal" style="
                        background: none; border: none; font-size: 24px; 
                        cursor: pointer; color: #666; padding: 5px;
                        border-radius: 50%; width: 35px; height: 35px;
                        display: flex; align-items: center; justify-content: center;
                        transition: all 0.2s;
                    ">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="
                    padding: 30px; 
                    max-height: calc(90vh - 120px); 
                    overflow-y: auto;
                ">
                    <!-- Content will be inserted here -->
                </div>
                <div class="modal-footer" style="
                    padding: 20px 30px; 
                    border-top: 1px solid #eee; 
                    background: #f8f9fa;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                ">
                    <button class="save-settings" style="
                        padding: 10px 24px; border: none;
                        background: ${color}; color: white; border-radius: 8px;
                        font-weight: 500; cursor: pointer; transition: all 0.2s;
                    ">Save Changes</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Event handlers
        const closeBtn = modal.querySelector('.close-modal');
        const saveBtn = modal.querySelector('.save-settings');

        closeBtn.addEventListener('click', () => this.closeSettingsModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeSettingsModal(modal);
        });

        // Add hover effects
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.backgroundColor = '#f0f0f0';
        });
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.backgroundColor = 'transparent';
        });

        return modal;
    }

    closeSettingsModal(modal) {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        document.body.style.overflow = '';
    }

    createToggleSetting(id, title, description, icon, checked) {
        return `
            <div style="
                display: flex; align-items: center; gap: 15px; padding: 15px;
                border: 2px solid #e9ecef; border-radius: 10px;
            ">
                <i class="fas fa-${icon}" style="color: #6c757d; font-size: 18px; width: 20px;"></i>
                <div style="flex: 1;">
                    <div style="font-weight: 500; color: #333; margin-bottom: 2px;">${title}</div>
                    <div style="font-size: 13px; color: #666;">${description}</div>
                </div>
                <label class="toggle-switch" style="position: relative; display: inline-block; width: 50px; height: 24px;">
                    <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
                    <span class="slider" style="
                        position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
                        background-color: ${checked ? '#28a745' : '#ccc'}; transition: 0.3s;
                        border-radius: 24px;
                    ">
                        <span style="
                            position: absolute; content: ''; height: 18px; width: 18px;
                            left: ${checked ? '29px' : '3px'}; bottom: 3px; background-color: white;
                            transition: 0.3s; border-radius: 50%;
                        "></span>
                    </span>
                </label>
            </div>
        `;
    }

    bindToggleSettings(modal, settingsKey) {
        const toggles = modal.querySelectorAll('input[type="checkbox"]');
        const saveBtn = modal.querySelector('.save-settings');

        // Update toggle appearance
        toggles.forEach(toggle => {
            const updateToggle = () => {
                const slider = toggle.nextElementSibling;
                const handle = slider.querySelector('span');
                if (toggle.checked) {
                    slider.style.backgroundColor = '#28a745';
                    handle.style.left = '29px';
                } else {
                    slider.style.backgroundColor = '#ccc';
                    handle.style.left = '3px';
                }
            };

            toggle.addEventListener('change', updateToggle);
            updateToggle(); // Initial state
        });

        saveBtn.addEventListener('click', () => {
            const settings = {};
            toggles.forEach(toggle => {
                settings[toggle.id] = toggle.checked;
            });
            localStorage.setItem(settingsKey, JSON.stringify(settings));
            this.showSuccess('Settings saved successfully!');
            this.closeSettingsModal(modal);
        });
    }

    bindPrivacySettings(modal) {
        const toggles = modal.querySelectorAll('input[type="checkbox"]');
        const selects = modal.querySelectorAll('select');
        const saveBtn = modal.querySelector('.save-settings');

        // Update toggle appearance
        this.bindToggleSettings(modal, 'privacySettings');

        // Override save to include select values
        saveBtn.addEventListener('click', () => {
            const settings = {};
            toggles.forEach(toggle => {
                settings[toggle.id] = toggle.checked;
            });
            selects.forEach(select => {
                settings[select.id] = select.value;
            });
            localStorage.setItem('privacySettings', JSON.stringify(settings));
            this.showSuccess('Privacy settings saved successfully!');
            this.closeSettingsModal(modal);
        });
    }

    bindAccountSettings(modal) {
        const options = modal.querySelectorAll('.account-option');

        options.forEach(option => {
            option.addEventListener('mouseenter', () => {
                if (option.dataset.action !== 'delete-account') {
                    option.style.backgroundColor = '#f8f9fa';
                    option.style.borderColor = '#dee2e6';
                } else {
                    option.style.backgroundColor = '#fff0f0';
                    option.style.borderColor = '#ffc9c9';
                }
            });

            option.addEventListener('mouseleave', () => {
                if (option.dataset.action !== 'delete-account') {
                    option.style.backgroundColor = 'transparent';
                    option.style.borderColor = '#e9ecef';
                } else {
                    option.style.backgroundColor = '#fff5f5';
                    option.style.borderColor = '#fff5f5';
                }
            });

            option.addEventListener('click', () => {
                this.handleAccountAction(option.dataset.action, modal);
            });
        });
    }

    bindHelpSettings(modal) {
        const options = modal.querySelectorAll('.help-option');

        options.forEach(option => {
            option.addEventListener('mouseenter', () => {
                option.style.backgroundColor = '#f8f9fa';
                option.style.borderColor = '#dee2e6';
            });

            option.addEventListener('mouseleave', () => {
                option.style.backgroundColor = 'transparent';
                option.style.borderColor = '#e9ecef';
            });

            option.addEventListener('click', () => {
                this.handleHelpAction(option.dataset.action);
            });
        });
    }

    handleAccountAction(action, modal) {
        switch(action) {
            case 'change-password':
                this.showSuccess('Password change feature - Coming soon!');
                break;
            case 'export-data':
                this.exportUserData();
                break;
            case 'clear-cache':
                this.clearAppCache();
                break;
            case 'delete-account':
                this.confirmDeleteAccount(modal);
                break;
        }
    }

    handleHelpAction(action) {
        switch(action) {
            case 'faq':
                this.showFAQ();
                break;
            case 'contact':
                this.openContactForm();
                break;
            case 'tutorials':
                this.showSuccess('Video tutorials - Coming soon!');
                break;
            case 'report-bug':
                this.openBugReport();
                break;
        }
    }

    exportUserData() {
        const profileData = localStorage.getItem('profileData');
        const savedRecipes = localStorage.getItem('savedRecipes');
        const settings = {
            notifications: localStorage.getItem('notificationSettings'),
            privacy: localStorage.getItem('privacySettings')
        };

        const exportData = {
            profile: profileData ? JSON.parse(profileData) : null,
            savedRecipes: savedRecipes ? JSON.parse(savedRecipes) : [],
            settings: settings,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'instachef-data-export.json';
        a.click();
        URL.revokeObjectURL(url);

        this.showSuccess('Data exported successfully!');
    }

    clearAppCache() {
        // Clear non-essential cache but keep user data
        const keysToKeep = ['profileData', 'profilePicture', 'savedRecipes', 'notificationSettings', 'privacySettings'];
        const keysToRemove = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!keysToKeep.includes(key)) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach(key => localStorage.removeItem(key));
        this.showSuccess('Cache cleared successfully!');
    }

    confirmDeleteAccount(modal) {
        const confirmHtml = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #dc3545; margin-bottom: 20px;"></i>
                <h3 style="color: #dc3545; margin-bottom: 15px;">Delete Account?</h3>
                <p style="color: #666; margin-bottom: 20px;">This action cannot be undone. All your data will be permanently deleted.</p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button id="cancel-delete" style="
                        padding: 10px 20px; background: white; color: #6c757d;
                        border: 2px solid #6c757d; border-radius: 6px; cursor: pointer;
                    ">Cancel</button>
                    <button id="confirm-delete" style="
                        padding: 10px 20px; background: #dc3545; color: white;
                        border: 2px solid #dc3545; border-radius: 6px; cursor: pointer;
                    ">Delete Forever</button>
                </div>
            </div>
        `;

        modal.querySelector('.modal-body').innerHTML = confirmHtml;
        modal.querySelector('.modal-footer').style.display = 'none';

        const cancelBtn = modal.querySelector('#cancel-delete');
        const confirmBtn = modal.querySelector('#confirm-delete');

        cancelBtn.addEventListener('click', () => this.closeSettingsModal(modal));
        confirmBtn.addEventListener('click', () => {
            localStorage.clear();
            this.showSuccess('Account deleted. Redirecting...');
            setTimeout(() => window.location.href = 'login.html', 2000);
        });
    }

    showFAQ() {
        const faqModal = this.createSettingsModal('Frequently Asked Questions', 'question', '#007bff');
        faqModal.querySelector('.modal-footer').style.display = 'none';

        faqModal.querySelector('.modal-body').innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                ${this.createFAQItem('How do I scan food?', 'Go to the Scan page and point your camera at the food. The app will recognize it and suggest recipes.')}
                ${this.createFAQItem('How do I save recipes?', 'Click the bookmark icon on any recipe card to add it to your saved recipes.')}
                ${this.createFAQItem('Can I edit my profile?', 'Yes! Click the "Edit Profile" button on your profile page to update your information.')}
                ${this.createFAQItem('How do I change my profile picture?', 'Click on your profile picture and choose from upload, camera, or remove options.')}
                ${this.createFAQItem('Is my data secure?', 'Yes, all your data is stored locally on your device and protected by privacy settings.')}
            </div>
        `;
    }

    createFAQItem(question, answer) {
        return `
            <details style="border: 2px solid #e9ecef; border-radius: 8px; padding: 15px;">
                <summary style="font-weight: 500; color: #333; cursor: pointer; margin-bottom: 10px;">
                    ${question}
                </summary>
                <p style="margin: 0; color: #666; line-height: 1.5;">${answer}</p>
            </details>
        `;
    }

    openContactForm() {
        const contactModal = this.createSettingsModal('Contact Support', 'envelope', '#28a745');
        
        contactModal.querySelector('.modal-body').innerHTML = `
            <form id="contact-form" style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Subject</label>
                    <select style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px;">
                        <option>General Question</option>
                        <option>Technical Issue</option>
                        <option>Feature Request</option>
                        <option>Bug Report</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Message</label>
                    <textarea rows="5" placeholder="Describe your question or issue..." style="
                        width: 100%; padding: 12px; border: 2px solid #e0e0e0;
                        border-radius: 8px; resize: vertical;
                    "></textarea>
                </div>
            </form>
        `;

        const saveBtn = contactModal.querySelector('.save-settings');
        saveBtn.textContent = 'Send Message';
        saveBtn.addEventListener('click', () => {
            this.showSuccess('Message sent! We\'ll get back to you soon.');
            this.closeSettingsModal(contactModal);
        });
    }

    openBugReport() {
        const bugModal = this.createSettingsModal('Report a Bug', 'bug', '#dc3545');
        
        bugModal.querySelector('.modal-body').innerHTML = `
            <form id="bug-form" style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Bug Type</label>
                    <select style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px;">
                        <option>App Crash</option>
                        <option>Feature Not Working</option>
                        <option>Display Issue</option>
                        <option>Performance Problem</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">Steps to Reproduce</label>
                    <textarea rows="4" placeholder="1. Go to...\n2. Click on...\n3. See error..." style="
                        width: 100%; padding: 12px; border: 2px solid #e0e0e0;
                        border-radius: 8px; resize: vertical;
                    "></textarea>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">What happened?</label>
                    <textarea rows="3" placeholder="Describe what went wrong..." style="
                        width: 100%; padding: 12px; border: 2px solid #e0e0e0;
                        border-radius: 8px; resize: vertical;
                    "></textarea>
                </div>
            </form>
        `;

        const saveBtn = bugModal.querySelector('.save-settings');
        saveBtn.textContent = 'Submit Bug Report';
        saveBtn.addEventListener('click', () => {
            this.showSuccess('Bug report submitted! Thank you for helping us improve.');
            this.closeSettingsModal(bugModal);
        });
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('show');
            document.body.style.overflow = '';
            
            // Reset any temporary changes
            this.resetTempChanges();
        }
    }

    openFileSelector() {
        if (this.fileInput) {
            this.fileInput.click();
        }
    }

    async openCamera() {
        try {
            // Check if camera is available
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                this.showError('Camera not available on this device');
                return;
            }

            // Create camera modal
            const cameraModal = this.createCameraModal();
            document.body.appendChild(cameraModal);

            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 640 },
                    height: { ideal: 640 },
                    facingMode: 'user'
                } 
            });

            const video = cameraModal.querySelector('#cameraVideo');
            video.srcObject = stream;

            // Handle camera controls
            const captureBtn = cameraModal.querySelector('#captureBtn');
            const closeCameraBtn = cameraModal.querySelector('#closeCameraBtn');

            captureBtn.addEventListener('click', () => {
                this.capturePhoto(video, stream);
                this.closeCameraModal(cameraModal, stream);
            });

            closeCameraBtn.addEventListener('click', () => {
                this.closeCameraModal(cameraModal, stream);
            });

        } catch (error) {
            console.error('Camera error:', error);
            this.showError('Unable to access camera. Please check permissions.');
        }
    }

    createCameraModal() {
        const modal = document.createElement('div');
        modal.className = 'camera-modal';
        modal.innerHTML = `
            <div class="camera-overlay"></div>
            <div class="camera-content">
                <div class="camera-header">
                    <h3>Take Photo</h3>
                    <button class="camera-close" id="closeCameraBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="camera-body">
                    <video id="cameraVideo" autoplay playsinline></video>
                    <button class="capture-btn" id="captureBtn">
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
            </div>
        `;

        // Add camera modal styles
        const style = document.createElement('style');
        style.textContent = `
            .camera-modal {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                z-index: 1001;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .camera-overlay {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.8);
            }
            .camera-content {
                position: relative;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                max-width: 90vw;
                max-height: 90vh;
            }
            .camera-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                border-bottom: 1px solid #eee;
            }
            .camera-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
            }
            .camera-body {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            #cameraVideo {
                width: 320px;
                height: 320px;
                object-fit: cover;
                border-radius: 50%;
                border: 4px solid #f0f0f0;
            }
            .capture-btn {
                margin-top: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: #007bff;
                color: white;
                border: none;
                cursor: pointer;
                font-size: 20px;
                transition: background 0.2s;
            }
            .capture-btn:hover {
                background: #0056b3;
            }
        `;
        document.head.appendChild(style);

        return modal;
    }

    capturePhoto(video, stream) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = 320;
        canvas.height = 320;
        
        context.drawImage(video, 0, 0, 320, 320);
        
        const dataURL = canvas.toDataURL('image/jpeg', 0.8);
        
        // Open cropping modal for camera captures too
        this.openCropModal(dataURL);
    }

    closeCameraModal(modal, stream) {
        // Stop camera stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        // Remove modal
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('Please select a valid image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.showError('Image size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            // Open cropping modal instead of immediately applying
            this.openCropModal(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    updatePicturePreview(imageSrc) {
        if (this.currentPictureImg) {
            this.currentPictureImg.src = imageSrc;
            this.currentPictureImg.dataset.changed = 'true';
        }
    }

    removePicture() {
        // Immediately update profile picture to default
        if (this.profileAvatar) {
            this.profileAvatar.src = this.defaultAvatarPath;
        }
        
        // Remove custom picture from localStorage
        localStorage.removeItem('profilePicture');
        
        // Notify global profile manager to update header
        if (window.GlobalProfileManager) {
            window.GlobalProfileManager.notifyProfilePictureUpdated();
        }
        
        this.showSuccess('Profile picture removed successfully!');
    }

    savePicture() {
        if (this.currentPictureImg && this.currentPictureImg.dataset.changed) {
            const newImageSrc = this.currentPictureImg.src;
            
            // Update profile avatar
            if (this.profileAvatar) {
                this.profileAvatar.src = newImageSrc;
            }
            
            // Save to localStorage
            localStorage.setItem('profilePicture', newImageSrc);
            
            // Remove completion prompts since profile picture is now set
            this.removeProfileCompletionPrompts();
            
            this.showSuccess('Profile picture updated successfully!');
        }
        
        this.closeModal();
    }

    loadSavedPicture() {
        const savedPicture = localStorage.getItem('profilePicture');
        if (this.profileAvatar) {
            if (savedPicture) {
                this.profileAvatar.src = savedPicture;
            } else {
                // Set default user icon if no saved picture
                this.profileAvatar.src = this.defaultAvatarPath;
            }
        }
    }

    resetTempChanges() {
        if (this.currentPictureImg && this.profileAvatar) {
            this.currentPictureImg.src = this.profileAvatar.src;
            this.currentPictureImg.dataset.changed = 'false';
        }
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    openCropModal(imageSrc) {
        const cropModal = document.createElement('div');
        cropModal.className = 'crop-modal';
        cropModal.innerHTML = `
            <div class="crop-overlay"></div>
            <div class="crop-content">
                <div class="crop-header">
                    <button class="crop-back" id="backToCrop">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h3>Move and Scale</h3>
                    <button class="crop-done" id="applyCrop">Done</button>
                </div>
                <div class="crop-body">
                    <div class="crop-container">
                        <img id="cropImage" src="${imageSrc}" alt="Crop Image">
                        <div class="crop-circle-overlay" id="cropCircle">
                            <div class="crop-circle">
                                <div class="crop-handle crop-handle-move">
                                    <i class="fas fa-arrows-alt"></i>
                                </div>
                            </div>
                            <div class="crop-grid">
                                <div class="grid-line grid-line-v1"></div>
                                <div class="grid-line grid-line-v2"></div>
                                <div class="grid-line grid-line-h1"></div>
                                <div class="grid-line grid-line-h2"></div>
                            </div>
                        </div>
                    </div>
                    <div class="crop-preview-container">
                        <div class="crop-preview">
                            <canvas id="cropPreview" width="80" height="80"></canvas>
                        </div>
                        <span class="preview-label">Preview</span>
                    </div>
                </div>
                <div class="crop-footer">
                    <div class="crop-instructions">
                        <p>📱 Pinch to zoom • 🖱️ Scroll to zoom • ✋ Drag circle to crop</p>
                    </div>
                </div>
            </div>
        `;

        // Add WhatsApp-style crop modal styles
        this.addWhatsAppCropStyles();

        document.body.appendChild(cropModal);
        document.body.style.overflow = 'hidden';

        // Initialize WhatsApp-style cropper
        this.initializeWhatsAppCropper(cropModal, imageSrc);
    }

    addWhatsAppCropStyles() {
        if (document.querySelector('#whatsapp-crop-styles')) return;

        const style = document.createElement('style');
        style.id = 'whatsapp-crop-styles';
        style.textContent = `
            .crop-modal {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                z-index: 1004;
                display: flex;
                flex-direction: column;
                background: #000;
            }

            .crop-overlay {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: #000;
            }

            .crop-content {
                position: relative;
                display: flex;
                flex-direction: column;
                height: 100vh;
                background: #000;
            }

            .crop-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                z-index: 1005;
            }

            .crop-back {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: background-color 0.2s;
            }

            .crop-back:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            .crop-header h3 {
                margin: 0;
                color: white;
                font-size: 18px;
                font-weight: 500;
            }

            .crop-done {
                background: none;
                border: none;
                color: #25d366;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                padding: 8px 12px;
                border-radius: 6px;
                transition: background-color 0.2s;
            }

            .crop-done:hover {
                background: rgba(37, 211, 102, 0.1);
            }

            .crop-body {
                flex: 1;
                display: flex;
                flex-direction: column;
                position: relative;
                overflow: hidden;
            }

            .crop-container {
                flex: 1;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                touch-action: manipulation;
                user-select: none;
            }

            #cropImage {
                max-width: 100vw;
                max-height: 100vh;
                width: auto;
                height: auto;
                display: block;
                user-select: none;
                pointer-events: none;
                -webkit-user-drag: none;
            }

            .crop-circle-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 280px;
                height: 280px;
                transform: translate(-50%, -50%);
                cursor: move;
                z-index: 1003;
                touch-action: none;
            }

            .crop-circle {
                width: 100%;
                height: 100%;
                border: 3px solid rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                box-shadow: 
                    0 0 0 9999px rgba(0, 0, 0, 0.6),
                    inset 0 0 0 2px rgba(255, 255, 255, 0.3);
                position: relative;
            }

            .crop-handle {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #333;
                font-size: 16px;
                cursor: move;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                opacity: 0.8;
                transition: opacity 0.2s;
            }

            .crop-handle:hover {
                opacity: 1;
            }

            .crop-grid {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;
            }

            .grid-line {
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                opacity: 0;
                transition: opacity 0.2s;
            }

            .crop-image-wrapper:active ~ .crop-circle-overlay .grid-line {
                opacity: 1;
            }

            .grid-line-v1, .grid-line-v2 {
                width: 1px;
                height: 100%;
                top: 0;
            }

            .grid-line-h1, .grid-line-h2 {
                height: 1px;
                width: 100%;
                left: 0;
            }

            .grid-line-v1 { left: 33.33%; }
            .grid-line-v2 { left: 66.66%; }
            .grid-line-h1 { top: 33.33%; }
            .grid-line-h2 { top: 66.66%; }

            .crop-preview-container {
                position: absolute;
                top: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                z-index: 1004;
            }

            .crop-preview {
                width: 60px;
                height: 60px;
                border: 2px solid rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                overflow: hidden;
                background: #000;
            }

            #cropPreview {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }

            .preview-label {
                color: rgba(255, 255, 255, 0.8);
                font-size: 12px;
                margin-top: 5px;
            }

            .crop-footer {
                padding: 20px;
                background: rgba(0, 0, 0, 0.8);
                z-index: 1005;
            }

            .crop-instructions {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .crop-instructions p {
                color: rgba(255, 255, 255, 0.9);
                font-size: 13px;
                margin: 0;
                text-align: center;
                font-weight: 400;
                line-height: 1.4;
            }
        `;
        document.head.appendChild(style);
    }

    initializeWhatsAppCropper(modal, imageSrc) {
        const img = modal.querySelector('#cropImage');
        const canvas = modal.querySelector('#cropPreview');
        const ctx = canvas.getContext('2d');
        const cropCircle = modal.querySelector('#cropCircle');
        const backBtn = modal.querySelector('#backToCrop');
        const applyBtn = modal.querySelector('#applyCrop');

        let cropPosition = {
            x: 0, // Offset from center
            y: 0,
            scale: 1
        };

        let isDragging = false;
        let dragStart = { x: 0, y: 0 };
        let initialPosition = { x: 0, y: 0 };

        // Pinch zoom variables
        let isPinching = false;
        let initialDistance = 0;
        let initialScale = 1;

        // Initialize image and crop
        const initializeCrop = () => {
            // Set initial image scale to fit screen
            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight - 200;
            
            // Calculate base size that fits well in container
            const scaleX = containerWidth / img.naturalWidth;
            const scaleY = containerHeight / img.naturalHeight;
            const baseScale = Math.min(scaleX, scaleY) * 0.8; // 80% of available space
            
            // Set base image size (this is our 1x scale reference)
            const baseWidth = img.naturalWidth * baseScale;
            const baseHeight = img.naturalHeight * baseScale;
            
            img.style.width = baseWidth + 'px';
            img.style.height = baseHeight + 'px';
            img.style.transformOrigin = 'center center';
            
            // Apply current zoom scale
            img.style.transform = `scale(${cropPosition.scale})`;
            
            // Store base dimensions for calculations
            img.dataset.baseWidth = baseWidth;
            img.dataset.baseHeight = baseHeight;
            
            // Update preview with slight delay to ensure DOM is updated
            setTimeout(() => {
                this.updateDraggableCropPreview(img, canvas, ctx, cropPosition);
            }, 50);
        };

        img.onload = initializeCrop;
        if (img.complete) initializeCrop();

        // Drag functions for crop circle
        const startDrag = (e) => {
            e.preventDefault();
            e.stopPropagation();
            isDragging = true;
            
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            dragStart.x = clientX;
            dragStart.y = clientY;
            initialPosition.x = cropPosition.x;
            initialPosition.y = cropPosition.y;
            
            // Show grid lines
            const gridLines = cropCircle.querySelectorAll('.grid-line');
            gridLines.forEach(line => line.style.opacity = '1');
        };

        const drag = (e) => {
            if (!isDragging || isPinching) return;
            e.preventDefault();
            
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            const deltaX = clientX - dragStart.x;
            const deltaY = clientY - dragStart.y;
            
            cropPosition.x = initialPosition.x + deltaX;
            cropPosition.y = initialPosition.y + deltaY;
            
            // Apply position to crop circle
            cropCircle.style.transform = `translate(calc(-50% + ${cropPosition.x}px), calc(-50% + ${cropPosition.y}px))`;
            
            // Update preview with current zoom level
            this.updateDraggableCropPreview(img, canvas, ctx, cropPosition);
        };

        const endDrag = () => {
            if (isDragging) {
                isDragging = false;
                
                // Hide grid lines
                const gridLines = cropCircle.querySelectorAll('.grid-line');
                gridLines.forEach(line => line.style.opacity = '0');
            }
        };

        // Add drag events to crop circle
        cropCircle.addEventListener('mousedown', startDrag);
        cropCircle.addEventListener('touchstart', startDrag, { passive: false });
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        // Pinch-to-zoom for mobile
        const container = modal.querySelector('.crop-container');
        
        const getTouchDistance = (touches) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const handleTouchStart = (e) => {
            if (e.touches.length === 2) {
                // Two finger pinch
                e.preventDefault();
                isPinching = true;
                isDragging = false; // Stop any drag operation
                initialDistance = getTouchDistance(e.touches);
                initialScale = cropPosition.scale;
            }
        };

        const handleTouchMove = (e) => {
            if (isPinching && e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = getTouchDistance(e.touches);
                const scaleChange = currentDistance / initialDistance;
                const newScale = Math.max(0.5, Math.min(3, initialScale * scaleChange));
                
                cropPosition.scale = newScale;
                img.style.transform = `scale(${newScale})`;
                
                // Force preview update with slight delay to ensure transform is applied
                setTimeout(() => {
                    this.updateDraggableCropPreview(img, canvas, ctx, cropPosition);
                }, 10);
            }
        };

        const handleTouchEnd = (e) => {
            if (e.touches.length < 2) {
                isPinching = false;
            }
        };

        // Add pinch zoom events to container
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: false });

        // Scroll wheel zoom for desktop
        const handleWheel = (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            const newScale = Math.max(0.5, Math.min(3, cropPosition.scale + delta));
            
            cropPosition.scale = newScale;
            img.style.transform = `scale(${newScale})`;
            
            // Force preview update with slight delay to ensure transform is applied
            setTimeout(() => {
                this.updateDraggableCropPreview(img, canvas, ctx, cropPosition);
            }, 10);
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        // Button events
        backBtn.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });

        applyBtn.addEventListener('click', () => {
            this.applyDraggableCrop(img, canvas, ctx, cropPosition);
            modal.remove();
            document.body.style.overflow = '';
        });

        // Keyboard events
        const keyHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = '';
                document.removeEventListener('keydown', keyHandler);
            }
        };
        document.addEventListener('keydown', keyHandler);
    }

    centerImage(img, wrapper, transform) {
        // Calculate initial scale to fit the image nicely
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight - 200; // Account for header/footer
        const imageAspectRatio = img.naturalWidth / img.naturalHeight;
        const containerAspectRatio = containerWidth / containerHeight;
        
        if (imageAspectRatio > containerAspectRatio) {
            // Image is wider than container
            img.style.height = containerHeight + 'px';
            img.style.width = 'auto';
        } else {
            // Image is taller than container
            img.style.width = containerWidth + 'px';
            img.style.height = 'auto';
        }
        
        // Center the image
        transform.x = 0;
        transform.y = 0;
        transform.scale = 1;
        
        this.applyTransform(wrapper, transform);
    }

    applyTransform(wrapper, transform) {
        wrapper.style.transform = `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`;
    }

    updateDraggableCropPreview(img, canvas, ctx, cropPosition) {
        const cropSize = 280; // Size of the crop circle
        const previewSize = 80; // Size of the preview canvas
        
        // Clear canvas
        ctx.clearRect(0, 0, previewSize, previewSize);
        
        // Use the same calculation method as the final crop
        const cropData = this.calculateCropCoordinates(img, cropPosition, cropSize);
        
        // Create circular clipping path
        ctx.save();
        ctx.beginPath();
        ctx.arc(previewSize / 2, previewSize / 2, previewSize / 2, 0, Math.PI * 2);
        ctx.clip();
        
        // Draw the cropped image using exact same logic as final crop
        try {
            if (cropData.sourceWidth > 0 && cropData.sourceHeight > 0) {
                ctx.drawImage(
                    img,
                    cropData.sourceX, 
                    cropData.sourceY, 
                    cropData.sourceWidth, 
                    cropData.sourceHeight,
                    cropData.destX * previewSize / cropSize,
                    cropData.destY * previewSize / cropSize,
                    cropData.destWidth * previewSize / cropSize,
                    cropData.destHeight * previewSize / cropSize
                );
            }
        } catch (e) {
            console.warn('Preview update failed:', e);
        }
        
        ctx.restore();
    }

    calculateCropCoordinates(img, cropPosition, cropSize) {
        // Get actual positions
        const imgRect = img.getBoundingClientRect();
        const containerRect = img.parentElement.getBoundingClientRect();
        
        // Calculate crop circle center in screen coordinates
        const cropCenterX = containerRect.left + containerRect.width / 2 + cropPosition.x;
        const cropCenterY = containerRect.top + containerRect.height / 2 + cropPosition.y;
        
        // Calculate crop area relative to the actual image
        const cropLeftX = cropCenterX - cropSize / 2;
        const cropTopY = cropCenterY - cropSize / 2;
        
        // Account for the CSS transform scale applied to the image
        // The image's display size is affected by transform: scale()
        const baseImageWidth = parseFloat(img.style.width) || imgRect.width / cropPosition.scale;
        const baseImageHeight = parseFloat(img.style.height) || imgRect.height / cropPosition.scale;
        
        // Calculate the actual displayed size after zoom
        const displayedWidth = baseImageWidth * cropPosition.scale;
        const displayedHeight = baseImageHeight * cropPosition.scale;
        
        // Convert to natural image coordinates
        const naturalScaleX = img.naturalWidth / displayedWidth;
        const naturalScaleY = img.naturalHeight / displayedHeight;
        
        // Calculate crop area in natural image coordinates
        const cropX = (cropLeftX - imgRect.left) * naturalScaleX;
        const cropY = (cropTopY - imgRect.top) * naturalScaleY;
        const cropWidth = cropSize * naturalScaleX;
        const cropHeight = cropSize * naturalScaleY;
        
        // Calculate source coordinates with bounds checking
        const sourceX = Math.max(0, cropX);
        const sourceY = Math.max(0, cropY);
        const sourceWidth = Math.min(cropWidth, img.naturalWidth - sourceX);
        const sourceHeight = Math.min(cropHeight, img.naturalHeight - sourceY);
        
        // Calculate destination coordinates to maintain aspect ratio
        const destX = (cropX < 0) ? (-cropX * cropSize / cropWidth) : 0;
        const destY = (cropY < 0) ? (-cropY * cropSize / cropHeight) : 0;
        const destWidth = sourceWidth * cropSize / cropWidth;
        const destHeight = sourceHeight * cropSize / cropHeight;
        
        return {
            sourceX, sourceY, sourceWidth, sourceHeight,
            destX, destY, destWidth, destHeight,
            cropX, cropY, cropWidth, cropHeight
        };
    }

    applyDraggableCrop(img, canvas, ctx, cropPosition) {
        const cropSize = 280;
        const finalSize = 300; // Final output size
        
        // Create a temporary canvas for the final crop
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = finalSize;
        tempCanvas.height = finalSize;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Use the same calculation method as preview
        const cropData = this.calculateCropCoordinates(img, cropPosition, cropSize);
        
        // Create circular clipping path
        tempCtx.save();
        tempCtx.beginPath();
        tempCtx.arc(finalSize / 2, finalSize / 2, finalSize / 2, 0, Math.PI * 2);
        tempCtx.clip();
        
        // Scale the coordinates to final size
        const scaleFactor = finalSize / cropSize;
        
        try {
            if (cropData.sourceWidth > 0 && cropData.sourceHeight > 0) {
                tempCtx.drawImage(
                    img,
                    cropData.sourceX, 
                    cropData.sourceY, 
                    cropData.sourceWidth, 
                    cropData.sourceHeight,
                    cropData.destX * scaleFactor,
                    cropData.destY * scaleFactor,
                    cropData.destWidth * scaleFactor,
                    cropData.destHeight * scaleFactor
                );
            }
        } catch (e) {
            console.error('Crop failed:', e);
            this.showError('Failed to crop image. Please try again.');
            return;
        }
        
        tempCtx.restore();
        
        // Apply the cropped image
        const croppedDataURL = tempCanvas.toDataURL('image/webp', 0.9);
        this.applyCroppedImage(croppedDataURL);
    }

    applyCroppedImage(dataURL) {
        // Update profile avatar
        if (this.profileAvatar) {
            this.profileAvatar.src = dataURL;
        }
        
        // Update current picture in modal if open
        if (this.currentPictureImg) {
            this.currentPictureImg.src = dataURL;
            this.currentPictureImg.dataset.changed = 'true';
        }
        
        // Save to localStorage
        localStorage.setItem('profilePicture', dataURL);
        
        // Remove completion prompts since profile picture is now set
        this.removeProfileCompletionPrompts();
        
        this.showSuccess('Profile picture updated successfully!');
    }

    updateCropPreview(img, canvas, ctx, cropData) {
        const scale = Math.min(300 / img.naturalWidth, 300 / img.naturalHeight);
        const scaledWidth = img.naturalWidth * scale;
        const scaledHeight = img.naturalHeight * scale;
        
        // Clear canvas
        ctx.clearRect(0, 0, 120, 120);
        
        // Calculate crop area on original image
        const cropX = (cropData.x + 150) / scale; // 150 is half of 300px container
        const cropY = (cropData.y + 150) / scale;
        const cropSize = cropData.size / scale;
        
        // Draw cropped portion
        ctx.drawImage(
            img,
            Math.max(0, cropX - cropSize/2), 
            Math.max(0, cropY - cropSize/2),
            cropSize, 
            cropSize,
            0, 0, 120, 120
        );
    }

    getCroppedImage(img, cropData) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;
        
        const scale = Math.min(300 / img.naturalWidth, 300 / img.naturalHeight);
        const cropX = (cropData.x + 150) / scale;
        const cropY = (cropData.y + 150) / scale;
        const cropSize = cropData.size / scale;
        
        ctx.drawImage(
            img,
            Math.max(0, cropX - cropSize/2), 
            Math.max(0, cropY - cropSize/2),
            cropSize, 
            cropSize,
            0, 0, 300, 300
        );
        
        return canvas.toDataURL('image/jpeg', 0.9);
    }

    applyCroppedImage(croppedDataURL) {
        // Update profile picture
        if (this.profileAvatar) {
            this.profileAvatar.src = croppedDataURL;
        }
        
        // Save to localStorage
        localStorage.setItem('profilePicture', croppedDataURL);
        
        // Notify global profile manager
        if (window.GlobalProfileManager) {
            window.GlobalProfileManager.notifyProfilePictureUpdated();
        }
        
        this.showSuccess('Profile picture updated successfully!');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add notification styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1002;
                    padding: 12px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    color: white;
                    font-weight: 500;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                }
                .notification-error {
                    background: #dc3545;
                }
                .notification-success {
                    background: #28a745;
                }
                .notification-info {
                    background: #007bff;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Quick Actions Manager Class
class QuickActionsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const actionTitle = card.querySelector('h3').textContent;
                this.handleQuickAction(actionTitle);
            });
        });
    }

    handleQuickAction(actionType) {
        switch (actionType) {
            case 'Add Recipe':
                this.showAddRecipeModal();
                break;
            case 'Saved Recipes':
                this.navigateToSavedRecipes();
                break;
            case 'Recent Activity':
                this.showRecentActivity();
                break;
            case 'Achievements':
                this.showAchievements();
                break;
            default:
                console.log('Unknown action:', actionType);
        }
    }

    showAddRecipeModal() {
        // Create add recipe modal
        const modal = document.createElement('div');
        modal.className = 'quick-action-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-plus"></i> Add New Recipe</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="add-recipe-form">
                        <div class="form-group">
                            <label for="recipe-name">Recipe Name *</label>
                            <input type="text" id="recipe-name" placeholder="Enter recipe name" required>
                        </div>
                        <div class="form-group">
                            <label for="recipe-description">Description</label>
                            <textarea id="recipe-description" placeholder="Brief description of your recipe" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="recipe-ingredients">Ingredients *</label>
                            <textarea id="recipe-ingredients" placeholder="List your ingredients (one per line)" rows="5" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="recipe-instructions">Instructions *</label>
                            <textarea id="recipe-instructions" placeholder="Step-by-step cooking instructions" rows="6" required></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="prep-time">Prep Time (mins)</label>
                                <input type="number" id="prep-time" placeholder="15" min="1">
                            </div>
                            <div class="form-group">
                                <label for="cook-time">Cook Time (mins)</label>
                                <input type="number" id="cook-time" placeholder="30" min="1">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="servings">Servings</label>
                                <input type="number" id="servings" placeholder="4" min="1">
                            </div>
                            <div class="form-group">
                                <label for="difficulty">Difficulty</label>
                                <select id="difficulty">
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel">Cancel</button>
                            <button type="submit" class="btn-submit">Save Recipe</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalStyles();
        
        // Setup form handlers
        const form = modal.querySelector('.add-recipe-form');
        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = modal.querySelector('.btn-cancel');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNewRecipe(form);
            modal.remove();
        });

        [closeBtn, cancelBtn].forEach(btn => {
            btn.addEventListener('click', () => modal.remove());
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Show modal
        setTimeout(() => modal.classList.add('show'), 100);
    }

    navigateToSavedRecipes() {
        window.location.href = 'saved.html';
    }

    showRecentActivity() {
        const modal = document.createElement('div');
        modal.className = 'quick-action-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-history"></i> Recent Activity</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="activity-list">
                        ${this.getRecentActivities()}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalStyles();

        // Setup close handlers
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        setTimeout(() => modal.classList.add('show'), 100);
    }

    showAchievements() {
        const modal = document.createElement('div');
        modal.className = 'quick-action-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-trophy"></i> Your Achievements</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="achievements-grid">
                        ${this.getAchievements()}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupModalStyles();

        // Setup close handlers
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        setTimeout(() => modal.classList.add('show'), 100);
    }

    saveNewRecipe(form) {
        const formData = new FormData(form);
        const recipe = {
            id: Date.now(),
            name: document.getElementById('recipe-name').value,
            description: document.getElementById('recipe-description').value,
            ingredients: document.getElementById('recipe-ingredients').value.split('\n').filter(i => i.trim()),
            instructions: document.getElementById('recipe-instructions').value.split('\n').filter(i => i.trim()),
            prepTime: document.getElementById('prep-time').value || 15,
            cookTime: document.getElementById('cook-time').value || 30,
            servings: document.getElementById('servings').value || 4,
            difficulty: document.getElementById('difficulty').value,
            dateAdded: new Date().toISOString(),
            image: '../images/chef-logo.webp' // Default image
        };

        // Save to localStorage
        let userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
        userRecipes.unshift(recipe);
        localStorage.setItem('userRecipes', JSON.stringify(userRecipes));

        // Show success notification
        this.showNotification('Recipe added successfully!', 'success');
    }

    getRecentActivities() {
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
        
        let activities = [];

        // Add saved recipe activities
        savedRecipes.slice(0, 5).forEach(recipe => {
            activities.push({
                type: 'saved',
                recipe: recipe.name,
                time: recipe.savedAt || 'Recently',
                icon: 'fas fa-heart'
            });
        });

        // Add user recipe activities
        userRecipes.slice(0, 3).forEach(recipe => {
            activities.push({
                type: 'created',
                recipe: recipe.name,
                time: recipe.dateAdded ? new Date(recipe.dateAdded).toLocaleDateString() : 'Recently',
                icon: 'fas fa-plus'
            });
        });

        if (activities.length === 0) {
            return '<div class="no-activity">No recent activity yet. Start cooking!</div>';
        }

        return activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-details">
                    <div class="activity-action">
                        ${activity.type === 'saved' ? 'Saved' : 'Created'} "${activity.recipe}"
                    </div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }

    getAchievements() {
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
        const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
        
        const achievements = [
            {
                name: 'Recipe Collector',
                description: `Saved ${savedRecipes.length} recipes`,
                icon: 'fas fa-bookmark',
                earned: savedRecipes.length >= 5,
                progress: Math.min(savedRecipes.length, 5),
                total: 5
            },
            {
                name: 'Chef Creator',
                description: `Created ${userRecipes.length} recipes`,
                icon: 'fas fa-chef-hat',
                earned: userRecipes.length >= 3,
                progress: Math.min(userRecipes.length, 3),
                total: 3
            },
            {
                name: 'Cooking Explorer',
                description: 'Explored different cuisines',
                icon: 'fas fa-globe',
                earned: savedRecipes.length >= 10,
                progress: Math.min(savedRecipes.length, 10),
                total: 10
            },
            {
                name: 'Profile Master',
                description: 'Completed your profile',
                icon: 'fas fa-user-check',
                earned: !!localStorage.getItem('profilePicture'),
                progress: localStorage.getItem('profilePicture') ? 1 : 0,
                total: 1
            }
        ];

        return achievements.map(achievement => `
            <div class="achievement-card ${achievement.earned ? 'earned' : 'locked'}">
                <div class="achievement-icon">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                    <div class="achievement-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(achievement.progress / achievement.total) * 100}%"></div>
                        </div>
                        <span>${achievement.progress}/${achievement.total}</span>
                    </div>
                </div>
                ${achievement.earned ? '<div class="achievement-badge"><i class="fas fa-check"></i></div>' : ''}
            </div>
        `).join('');
    }

    setupModalStyles() {
        if (document.getElementById('quick-action-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'quick-action-modal-styles';
        style.textContent = `
            .quick-action-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .quick-action-modal.show {
                opacity: 1;
            }

            .quick-action-modal .modal-content {
                background: white;
                border-radius: 16px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }

            .quick-action-modal.show .modal-content {
                transform: scale(1);
            }

            .quick-action-modal .modal-header {
                padding: 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .quick-action-modal .modal-header h3 {
                margin: 0;
                color: #333;
                font-size: 1.25rem;
            }

            .quick-action-modal .modal-header i {
                margin-right: 8px;
                color: #ff6b35;
            }

            .quick-action-modal .close-modal {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }

            .quick-action-modal .close-modal:hover {
                background: #f0f0f0;
                color: #333;
            }

            .quick-action-modal .modal-body {
                padding: 20px;
            }

            .add-recipe-form .form-group {
                margin-bottom: 20px;
            }

            .add-recipe-form .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }

            .add-recipe-form label {
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
                color: #333;
            }

            .add-recipe-form input,
            .add-recipe-form textarea,
            .add-recipe-form select {
                width: 100%;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 14px;
                transition: border-color 0.2s ease;
                box-sizing: border-box;
            }

            .add-recipe-form input:focus,
            .add-recipe-form textarea:focus,
            .add-recipe-form select:focus {
                outline: none;
                border-color: #ff6b35;
            }

            .add-recipe-form textarea {
                resize: vertical;
                font-family: inherit;
            }

            .form-actions {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
                margin-top: 24px;
                padding-top: 20px;
                border-top: 1px solid #eee;
            }

            .btn-cancel,
            .btn-submit {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .btn-cancel {
                background: #f5f5f5;
                color: #666;
            }

            .btn-cancel:hover {
                background: #e0e0e0;
            }

            .btn-submit {
                background: #ff6b35;
                color: white;
            }

            .btn-submit:hover {
                background: #e55a2e;
            }

            .activity-list {
                max-height: 400px;
                overflow-y: auto;
            }

            .activity-item {
                display: flex;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #f0f0f0;
            }

            .activity-item:last-child {
                border-bottom: none;
            }

            .activity-icon {
                width: 40px;
                height: 40px;
                background: #fff5f2;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 12px;
                color: #ff6b35;
            }

            .activity-details {
                flex: 1;
            }

            .activity-action {
                font-weight: 600;
                color: #333;
                margin-bottom: 2px;
            }

            .activity-time {
                font-size: 12px;
                color: #666;
            }

            .no-activity {
                text-align: center;
                padding: 40px 20px;
                color: #666;
                font-style: italic;
            }

            .achievements-grid {
                display: grid;
                gap: 16px;
            }

            .achievement-card {
                display: flex;
                align-items: center;
                padding: 16px;
                border: 2px solid #e0e0e0;
                border-radius: 12px;
                transition: all 0.2s ease;
                position: relative;
            }

            .achievement-card.earned {
                border-color: #4caf50;
                background: #f8fff8;
            }

            .achievement-card.locked {
                opacity: 0.6;
            }

            .achievement-icon {
                width: 48px;
                height: 48px;
                background: #fff5f2;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 16px;
                font-size: 20px;
                color: #ff6b35;
            }

            .achievement-card.earned .achievement-icon {
                background: #e8f5e8;
                color: #4caf50;
            }

            .achievement-info {
                flex: 1;
            }

            .achievement-info h4 {
                margin: 0 0 4px 0;
                color: #333;
                font-size: 16px;
            }

            .achievement-info p {
                margin: 0 0 8px 0;
                color: #666;
                font-size: 14px;
            }

            .achievement-progress {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .progress-bar {
                flex: 1;
                height: 6px;
                background: #e0e0e0;
                border-radius: 3px;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                background: #ff6b35;
                transition: width 0.3s ease;
            }

            .achievement-card.earned .progress-fill {
                background: #4caf50;
            }

            .achievement-progress span {
                font-size: 12px;
                color: #666;
                font-weight: 600;
            }

            .achievement-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                width: 24px;
                height: 24px;
                background: #4caf50;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
            }

            @media (max-width: 480px) {
                .add-recipe-form .form-row {
                    grid-template-columns: 1fr;
                }
                
                .quick-action-modal .modal-content {
                    width: 95%;
                    max-height: 95vh;
                }
                
                .form-actions {
                    flex-direction: column;
                }
                
                .btn-cancel,
                .btn-submit {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `quick-action-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add notification styles if not present
        if (!document.getElementById('quick-action-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'quick-action-notification-styles';
            style.textContent = `
                .quick-action-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 16px 20px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    z-index: 1001;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    border-left: 4px solid #ff6b35;
                }

                .quick-action-notification.success {
                    border-left-color: #4caf50;
                }

                .quick-action-notification.show {
                    transform: translateX(0);
                }

                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: #333;
                    font-weight: 500;
                }

                .notification-content i {
                    color: #ff6b35;
                }

                .quick-action-notification.success .notification-content i {
                    color: #4caf50;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - starting ProfilePictureManager and QuickActionsManager');
    const profilePictureManager = new ProfilePictureManager();
    const quickActionsManager = new QuickActionsManager();
});

// Export for potential external use
window.ProfilePictureManager = ProfilePictureManager;
window.QuickActionsManager = QuickActionsManager;