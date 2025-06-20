document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    let currentTabIndex = 0;

    // Initialize tabs
    function initTabs() {
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                setActiveTab(index);
            });
        });
    }

    // Set active tab
    function setActiveTab(index) {
        // Update tab buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabButtons[index].classList.add('active');
        
        // Update tab contents
        tabContents.forEach(content => content.classList.remove('active'));
        tabContents[index].classList.add('active');
        
        // Update current tab index
        currentTabIndex = index;
        
        // Update navigation buttons
        updateNavigationButtons();
    }

    // Next and Previous buttons functionality
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');

    function updateNavigationButtons() {
        // Back button is disabled on first tab
        backBtn.disabled = currentTabIndex === 0;
        backBtn.style.opacity = currentTabIndex === 0 ? '0.5' : '1';
        
        // Next button is disabled on last tab
        nextBtn.disabled = currentTabIndex === tabButtons.length - 1;
        nextBtn.style.opacity = currentTabIndex === tabButtons.length - 1 ? '0.5' : '1';
    }

    nextBtn.addEventListener('click', () => {
        if (currentTabIndex < tabButtons.length - 1) {
            setActiveTab(currentTabIndex + 1);
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentTabIndex > 0) {
            setActiveTab(currentTabIndex - 1);
        }
    });

    // Animation for smooth transitions
    function addAnimationEffects() {
        // Add fade-in effect to content sections
        document.querySelectorAll('.details-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
            }, 100);
        });
    }

    // Field validation for server-side data
    function setupFieldValidation() {
        // This would validate data when it's loaded from the server
        // For now, just adding placeholder functionality
        const inputs = document.querySelectorAll('input[readonly]');
        
        inputs.forEach(input => {
            // Add a subtle style to empty fields
            if (!input.value) {
                input.classList.add('empty-field');
            }
        });
    }

    // Add sample rows to qualifications table if needed
    function setupQualificationsTable() {
        const table = document.querySelector('.qualifications-table tbody');
        
        // Check if table is empty and add empty rows if needed
        if (table && table.children.length === 0) {
            for (let i = 0; i < 3; i++) {
                const row = document.createElement('tr');
                
                for (let j = 0; j < 5; j++) {
                    const cell = document.createElement('td');
                    row.appendChild(cell);
                }
                
                table.appendChild(row);
            }
        }
    }

    // Initialize all functionality
    function init() {
        initTabs();
        updateNavigationButtons();
        addAnimationEffects();
        setupFieldValidation();
        setupQualificationsTable();
        
        // Start with first tab active
        setActiveTab(0);
    }

    // Start the application
    init();
});