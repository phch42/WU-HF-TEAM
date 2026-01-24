/* ===========================
   FORM VALIDATION
   =========================== */
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const address = document.getElementById('address');
const email = document.getElementById('email');
const call = document.getElementById('call');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

const fnamePattern = /^[A-Za-zÆØÅæøå]{2,10}$/; // 2-10 letters including Danish letters
const lnamePattern = /^[A-Za-zÆØÅæøå]{2,16}$/; // 2-16 letters including Danish letters
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate a single field
function validateField(field, pattern, errorId, errorMsg, optional = false) {
    const value = field.value.trim();
    const errorEl = document.getElementById(errorId);

    if (optional && value === "") {
        field.classList.remove('invalid', 'valid');
        errorEl.textContent = '';
        return true;
    }

    if (!pattern.test(value)) {
        field.classList.add('invalid');
        field.classList.remove('valid');
        errorEl.textContent = errorMsg;
        return false;
    } else {
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorEl.textContent = '';
        return true;
    }
}

// Check if entire form is valid to enable submit
function checkFormValidity() {
    const allValid =
        validateField(fname, fnamePattern, 'fname-error', 'Fornavn skal være 2-10 bogstaver (A-Z, Æ, Ø, Å)') &&
        validateField(lname, lnamePattern, 'lname-error', 'Efternavn skal være 2-16 bogstaver (A-Z, Æ, Ø, Å)') &&
        validateField(address, /.+/, 'address-error', 'Adresse skal udfyldes') &&
        validateField(email, emailPattern, 'email-error', 'Indtast en gyldig email') &&
        validateField(call, /^\d+$/, 'call-error', 'Telefonnummer skal kun indeholde tal', true) &&
        validateField(message, /.+/, 'message-error', 'Besked skal udfyldes');

    if (allValid) {
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '#4CAF50'; // Green background when enabled
    } else {
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = '#ccc'; // Grey when disabled
    }
}

// Live validation listeners
[fname, lname, address, email, call, message].forEach(field => {
    field.addEventListener('input', checkFormValidity);
});

// Form submit validation
function validateForm() {
    return !submitBtn.disabled; // Only submit if button is enabled
}
