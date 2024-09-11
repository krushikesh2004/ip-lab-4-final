// Function to validate and submit order
function submitOrder() {
    const form = document.getElementById('orderForm');
    
    // Validate form fields
    if (!form.checkValidity()) {
        alert('Please fill in all required fields correctly.');
        return;
    }
    
    // Validate delivery date separately
    if (!validateDeliveryDate()) {
        return;
    }

    // Generate receipt
    generateReceipt();
}

// Function to validate delivery date
function validateDeliveryDate() {
    const deliveryDate = document.getElementById("delivery_date").value;
    const dateError = document.getElementById("dateError");

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day

    const selectedDate = new Date(deliveryDate);
    console.log(today);
    console.log(selectedDate);

    // Check if the selected delivery date is before or equal to today
    if (selectedDate <= today) {
        dateError.textContent = "Delivery date cannot be today or in the past.";
        return false; // Prevent form submission
    } else {
        dateError.textContent = ""; // Clear the error
        return true;
    }
}

// Class Person
class Person {
    constructor(name, address, email, phone) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }

    // Display Person details
    displayDetails() {
        return `Name: ${this.name}<br>Address: ${this.address}<br>Email: ${this.email}<br>Phone: ${this.phone}`;
    }
}

// Class Student extending Person
class Student extends Person {
    constructor(name, address, email, phone, sign) {
        super(name, address, email, phone);
        this.sign = sign;

        if (!sign) {
            throw new Error("Please upload a valid signature.");
        }
    }

    // Overriding displayDetails
    displayDetails() {
        return `${super.displayDetails()}<br>Signature: ${this.sign}`;
    }
}

// Generate receipt on order confirmation
function generateReceipt() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Hardcoded signature image as an example (can be dynamic)
    const sign = `<img src="./images.png" alt="Signature" width="100px" height="20px">`;

    try {
        // Create a Student object
        let student = new Student(name, address, email, phone, sign);  // Using signature

        // Receipt content
        const date = new Date();
        const receiptContent = `
            <h2>Order Receipt</h2>
            <p>Your order has been successfully placed on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}.</p>
            <h2>Recipient Details</h2>
            ${student.displayDetails()}
        `;

        document.getElementById('receipt').innerHTML = receiptContent;

    } catch (error) {
        alert(error.message);  // Handle any errors related to signature
    }
}
