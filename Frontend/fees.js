document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const yearTabs = document.querySelectorAll('.year-tab');
    const semesterTabs = document.querySelectorAll('.semester-tab');
    const semesterContents = document.querySelectorAll('.semester-content');
    
    // Define semester mapping to academic years
    const semesterYearMap = {
        'sem1': 'first-year',
        'sem2': 'first-year',
        'sem3': 'second-year',
        'sem4': 'second-year',
        'sem5': 'third-year',
        'sem6': 'third-year',
        'sem7': 'fourth-year',
        'sem8': 'fourth-year'
    };
    
    // Define academic year mapping to semesters
    const yearSemesterMap = {
        'first-year': ['sem1', 'sem2'],
        'second-year': ['sem3', 'sem4'],
        'third-year': ['sem5', 'sem6'],
        'fourth-year': ['sem7', 'sem8']
    };
    
    // Function to show semester content
    function showSemesterContent(semesterId) {
        // Hide all semester content
        semesterContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected semester content
        const selectedContent = document.getElementById(semesterId);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
        
        // Update semester tabs
        semesterTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-semester') === semesterId) {
                tab.classList.add('active');
            }
        });
        
        // Update year tabs based on semester
        const yearId = semesterYearMap[semesterId];
        if (yearId) {
            yearTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-year') === yearId) {
                    tab.classList.add('active');
                }
            });
        }
    }
    
    // Function to filter semester tabs by year
    function filterSemestersByYear(yearId) {
        const relatedSemesters = yearSemesterMap[yearId] || [];
        
        // Show/hide semester tabs based on selected year
        semesterTabs.forEach(tab => {
            const semesterId = tab.getAttribute('data-semester');
            
            if (relatedSemesters.includes(semesterId)) {
                tab.style.display = 'block';
            } else {
                tab.style.display = 'none';
            }
        });
        
        // Show first semester of selected year if available
        if (relatedSemesters.length > 0) {
            showSemesterContent(relatedSemesters[0]);
        }
    }
    
    // Initialize event listeners for year tabs
    yearTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const yearId = this.getAttribute('data-year');
            filterSemestersByYear(yearId);
            
            // Update active state for year tabs
            yearTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize event listeners for semester tabs
    semesterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const semesterId = this.getAttribute('data-semester');
            showSemesterContent(semesterId);
        });
    });
    
    // Initialize with first year selected
    filterSemestersByYear('first-year');
    
    // Add hover effect to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f5f5f5';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Add animation to fee cards
    const feeCards = document.querySelectorAll('.fee-card');
    feeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.05)';
        });
    });
});