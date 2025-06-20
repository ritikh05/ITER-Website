document.addEventListener('DOMContentLoaded', function () {
    const admissionForm = document.getElementById('admission-form');
    const photoUpload = document.getElementById('photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Validate form inputs
    function validateForm() {
        const requiredFields = admissionForm.querySelectorAll('[required]');
        for (const field of requiredFields) {
            if (!field.value.trim()) {
                alert(`Please fill in the required field: ${field.name || field.id}`);
                field.focus();
                return false;
            }
        }

        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const guardianContact = document.getElementById('guardian-contact').value.trim();
        const percentage = document.getElementById('previous-percentage').value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        const percentageRegex = /^(100(\.00?)?|[0-9]?[0-9](\.[0-9]{1,2})?)$/;

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (!phoneRegex.test(phone) || !phoneRegex.test(guardianContact)) {
            alert('Please enter a valid 10-digit phone number for both phone and guardian contact.');
            return false;
        }

        if (!percentageRegex.test(percentage)) {
            alert('Please enter a valid percentage between 0 and 100.');
            return false;
        }

        return true;
    }

    // Generate unique student ID
    function generateStudentID() {
        return `SID${Date.now()}`;
    }

    // Collect form data
    function collectFormData() {
        return {
            id: generateStudentID(),
            firstName: document.getElementById('first-name').value.trim(),
            lastName: document.getElementById('last-name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            dob: document.getElementById('dob').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || '',
            address: document.getElementById('address').value.trim(),
            city: document.getElementById('city').value.trim(),
            state: document.getElementById('state').value.trim(),
            zipCode: document.getElementById('zip-code').value.trim(),
            country: document.getElementById('country').value.trim(),
            guardianName: document.getElementById('guardian-name').value.trim(),
            guardianContact: document.getElementById('guardian-contact').value.trim(),
            department: document.getElementById('department').value,
            course: document.getElementById('course').value,
            year: document.getElementById('year').value,
            bloodGroup: document.getElementById('blood-group').value,
            admissionDate: new Date().toISOString().split('T')[0],
            previousSchool: document.getElementById('previous-school').value.trim(),
            previousPercentage: document.getElementById('previous-percentage').value.trim(),
            photo: document.getElementById('preview-img')?.src || '',
            fees: {
                total: parseFloat(document.getElementById('total-fees')?.value || 0),
                paid: parseFloat(document.getElementById('paid-fees')?.value || 0),
            },
        };
    }

    // Save to localStorage
    function saveStudent(student) {
    fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(data => console.log('Saved to backend:', data))
    .catch(error => console.error('Backend save failed:', error));
}


    // Handle photo preview
    photoUpload.addEventListener('change', function () {
        const file = photoUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoPreview.innerHTML = `<img id="preview-img" src="${e.target.result}" alt="Uploaded Photo">`;
                photoPreview.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        } else {
            photoPreview.innerHTML = '';
            photoPreview.classList.remove('has-image');
        }
    });

    // On form submit
    admissionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            successModal.style.display = 'block';
        }
    });

    // On modal close → Save student + redirect
    closeModalBtn.addEventListener('click', function () {
        successModal.style.display = 'none';

        const student = collectFormData();
        saveStudent(student);

        admissionForm.reset();
        photoPreview.innerHTML = '';
        photoPreview.classList.remove('has-image');

        setTimeout(() => {
            window.location.href = 'student.html';
        }, 1000);
    });
});
