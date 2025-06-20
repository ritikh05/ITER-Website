// Sample fee data - This would typically come from an API call to your backend
const feeData = [
    {
        id: 1,
        semester: "Semester 1",
        details: "Tuition Fee + Lab Fee + Library Fee",
        dueDate: "15 Aug, 2024",
        amount: 45000,
        status: "paid"
    },
    {
        id: 2,
        semester: "Semester 2",
        details: "Tuition Fee + Lab Fee + Library Fee",
        dueDate: "15 Jan, 2025",
        amount: 45000,
        status: "paid"
    },
    {
        id: 3,
        semester: "Semester 3",
        details: "Tuition Fee + Lab Fee + Library Fee",
        dueDate: "15 Jun, 2025",
        amount: 48000,
        status: "pending"
    },
    {
        id: 4,
        semester: "Semester 4",
        details: "Tuition Fee + Lab Fee + Library Fee",
        dueDate: "15 Dec, 2025",
        amount: 48000,
        status: "pending"
    },
    {
        id: 5,
        semester: "Semester 5",
        details: "Tuition Fee + Project Fee + Library Fee",
        dueDate: "15 Jun, 2026",
        amount: 52000,
        status: "pending"
    },
    {
        id: 6,
        semester: "Semester 6",
        details: "Tuition Fee + Project Fee + Library Fee",
        dueDate: "15 Dec, 2026",
        amount: 52000,
        status: "pending"
    },
    {
        id: 7,
        semester: "Semester 7",
        details: "Tuition Fee + Project Fee + Library Fee",
        dueDate: "15 Jun, 2027",
        amount: 55000,
        status: "pending"
    },
    {
        id: 8,
        semester: "Semester 8",
        details: "Tuition Fee + Project Fee + Library Fee",
        dueDate: "15 Dec, 2027",
        amount: 55000,
        status: "pending"
    }
];

// Selected fee IDs
let selectedFees = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadFeeData();
    initializePaymentOptions();
    
    // Format input for card number
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
    });
    
    // Format input for expiry date
    document.getElementById('expDate').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
});

// Load fee data into the table
function loadFeeData() {
    const tableBody = document.getElementById('feeTableBody');
    tableBody.innerHTML = '';
    
    feeData.forEach(fee => {
        const row = document.createElement('tr');
        
        // Create a status class based on the fee status
        let statusClass = '';
        if (fee.status === 'paid') {
            statusClass = 'status-paid';
        } else if (fee.status === 'pending') {
            statusClass = 'status-pending';
        } else if (fee.status === 'overdue') {
            statusClass = 'status-overdue';
        }
        
        // Disable checkbox for paid fees
        const checkboxDisabled = fee.status === 'paid';
        
        row.innerHTML = `
            <td>
                <input type="checkbox" class="fee-checkbox" data-id="${fee.id}" 
                       data-amount="${fee.amount}" data-semester="${fee.semester}" 
                       data-details="${fee.details}"
                       ${checkboxDisabled ? 'disabled' : ''}
                       ${selectedFees.includes(fee.id) ? 'checked' : ''}
                       onchange="updateSelectedFees()">
            </td>
            <td class="semester-name">${fee.semester}</td>
            <td class="fee-details">${fee.details}</td>
            <td>${fee.dueDate}</td>
            <td class="fee-amount">₹${fee.amount.toLocaleString()}</td>
            <td><span class="fee-status ${statusClass}">${fee.status.toUpperCase()}</span></td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to checkboxes
    document.querySelectorAll('.fee-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedFees);
    });
    
    // Update the total amount
    updateTotalAmount();
}

// Update selected fees when checkboxes are clicked
function updateSelectedFees() {
    selectedFees = [];
    document.querySelectorAll('.fee-checkbox:checked').forEach(checkbox => {
        selectedFees.push(parseInt(checkbox.dataset.id));
    });
    
    updateTotalAmount();
    
    // Update the state of the select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    const pendingCheckboxes = document.querySelectorAll('.fee-checkbox:not([disabled])');
    const checkedPendingCheckboxes = document.querySelectorAll('.fee-checkbox:not([disabled]):checked');
    
    if (pendingCheckboxes.length === checkedPendingCheckboxes.length && pendingCheckboxes.length > 0) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else if (checkedPendingCheckboxes.length === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    } else {
        selectAllCheckbox.indeterminate = true;
    }
}

// Handle select all checkbox
function selectAllSemesters() {
    const selectAllCheckbox = document.getElementById('selectAll');
    document.querySelectorAll('.fee-checkbox:not([disabled])').forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
    
    updateSelectedFees();
}

// Toggle select all fees
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.checked = !selectAllCheckbox.checked;
    selectAllSemesters();
}

// Calculate and update the total amount
function updateTotalAmount() {
    let total = 0;
    document.querySelectorAll('.fee-checkbox:checked').forEach(checkbox => {
        total += parseFloat(checkbox.dataset.amount);
    });
    
    document.getElementById('totalAmount').textContent = `₹${total.toLocaleString()}`;
}

// Proceed to payment modal
function proceedToPayment() {
    if (selectedFees.length === 0) {
        alert('Please select at least one semester fee to pay.');
        return;
    }
    
    // Calculate total amount and number of semesters
    let totalAmount = 0;
    let totalSemesters = 0;
    
    document.querySelectorAll('.fee-checkbox:checked').forEach(checkbox => {
        totalAmount += parseFloat(checkbox.dataset.amount);
        totalSemesters++;
    });
    
    // Update payment modal
    document.getElementById('totalSemesters').textContent = totalSemesters;
    document.getElementById('modalTotalAmount').textContent = `₹${totalAmount.toLocaleString()}`;
    
    // Show payment modal
    document.getElementById('paymentModal').style.display = 'block';
}

// Close payment modal
function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Initialize payment options
function initializePaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // TODO: Change payment form based on selected method
            // For simplicity, we'll keep the card form visible for all options
        });
    });
}

// Process payment with Razorpay
function processPayment() {
    // Validate payment form
    const cardNumber = document.getElementById('cardNumber').value;
    const expDate = document.getElementById('expDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    
    if (!cardNumber || !expDate || !cvv || !cardName) {
        alert('Please fill in all payment details.');
        return;
    }
    
    // Calculate total amount
    let totalAmount = 0;
    document.querySelectorAll('.fee-checkbox:checked').forEach(checkbox => {
        totalAmount += parseFloat(checkbox.dataset.amount);
    });
    
    // Close our custom payment modal as Razorpay will open its own
    closeModal();
    
    // Show loading overlay
    document.getElementById('loadingOverlay').style.display = 'flex';
    
    // Initialize Razorpay payment
    // In production, you would get this order_id from your server
    const options = {
        key: "rzp_test_YourRazorpayTestKey", // Replace with your actual Razorpay key
        amount: totalAmount * 100, // Amount in paisa (Razorpay uses smallest currency unit)
        currency: "INR",
        name: "College Fee Portal",
        description: "Semester Fee Payment",
        image: "https://your-college-logo-url.png", // Replace with your college logo
        prefill: {
            name: cardName,
            email: "student@example.com", // In real implementation, get from student profile
            contact: "9876543210" // In real implementation, get from student profile
        },
        theme: {
            color: "#3a86ff"
        },
        modal: {
            ondismiss: function() {
                // If user closes Razorpay popup
                document.getElementById('loadingOverlay').style.display = 'none';
                alert("Payment cancelled");
            }
        },
        handler: function(response) {
            // This function runs when payment is successful
            // response.razorpay_payment_id contains the payment ID
            
            // Hide loading overlay
            document.getElementById('loadingOverlay').style.display = 'none';
            
            // In a real implementation, you would verify this payment on your server
            // verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
            
            // For this demo, we'll assume payment is verified successfully
            paymentSuccessful(response.razorpay_payment_id);
        }
    };
    
    // Create and open Razorpay payment instance
    try {
        const rzp = new Razorpay(options);
        document.getElementById('loadingOverlay').style.display = 'none';
        rzp.open();
    } catch (error) {
        document.getElementById('loadingOverlay').style.display = 'none';
        alert("Failed to initialize payment gateway. Please try again.");
        console.error("Razorpay initialization error:", error);
    }
}

// Handle successful payment
function paymentSuccessful(paymentId) {
    // Generate receipt
    generateReceipt(paymentId);
    
    // Show receipt modal
    document.getElementById('receiptModal').style.display = 'block';
    
    // Update fee data (mark selected fees as paid)
    selectedFees.forEach(feeId => {
        const fee = feeData.find(fee => fee.id === feeId);
        if (fee) {
            fee.status = 'paid';
        }
    });
    
    // Clear selected fees
    selectedFees = [];
    
    // Reload fee table
    loadFeeData();
}

// Generate payment receipt
function generateReceipt(paymentId = null) {
    // Use Razorpay payment ID if available, otherwise generate random transaction ID
    const transactionId = paymentId || 'TXN' + Math.floor(Math.random() * 10000000000);
    
    // Set receipt details
    document.getElementById('receiptNumber').textContent = 'FEE' + Date.now().toString().substring(5);
    document.getElementById('receiptDate').textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('transactionId').textContent = transactionId;
    
    // Set payment mode
    const paymentMethod = document.querySelector('.payment-option.active').dataset.method;
    let paymentMode = 'Credit/Debit Card';
    if (paymentMethod === 'upi') {
        paymentMode = 'UPI';
    } else if (paymentMethod === 'net-banking') {
        paymentMode = 'Net Banking';
    }
    document.getElementById('paymentMode').textContent = paymentMode;
    
    // Populate receipt table
    const receiptTableBody = document.getElementById('receiptTableBody');
    receiptTableBody.innerHTML = '';
    
    let totalAmount = 0;
    
    document.querySelectorAll('.fee-checkbox:checked').forEach(checkbox => {
        const amount = parseFloat(checkbox.dataset.amount);
        totalAmount += amount;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${checkbox.dataset.semester}</td>
            <td>${checkbox.dataset.details}</td>
            <td>₹${amount.toLocaleString()}</td>
        `;
        
        receiptTableBody.appendChild(row);
    });
    
    document.getElementById('receiptTotalAmount').textContent = `₹${totalAmount.toLocaleString()}`;
}

// Close receipt modal
function closeReceiptModal() {
    document.getElementById('receiptModal').style.display = 'none';
}

// Download receipt as PDF
function downloadReceipt() {
    const { jsPDF } = window.jspdf;
    
    // Show loading message
    const receiptActions = document.querySelector('.receipt-actions');
    const originalContent = receiptActions.innerHTML;
    receiptActions.innerHTML = '<div class="spinner"></div><p>Generating PDF...</p>';
    
    // Get receipt element
    const receipt = document.getElementById('receipt');
    
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'pt', 'a4');
    
    // Use html2canvas to capture the receipt as an image
    html2canvas(receipt).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 550;
        const pageHeight = 842;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 20;
        
        pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Save the PDF
        pdf.save('Fee_Receipt.pdf');
        
        // Restore original action buttons
        receiptActions.innerHTML = originalContent;
    });
}

// Window event listener to close modal when clicking outside
window.addEventListener('click', function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const receiptModal = document.getElementById('receiptModal');
    
    if (event.target === paymentModal) {
        closeModal();
    }
    
    if (event.target === receiptModal) {
        closeReceiptModal();
    }
});
