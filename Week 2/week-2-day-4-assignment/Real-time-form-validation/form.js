// Field definitions: how to validate each one and what error to show
const fields = [
    {
        id: 'name',
        validate: value => value.trim().length >= 2,
        error: 'Name must be at least 2 characters'
    },
    {
        id: 'email',
        validate: value => {
            const atIndex = value.indexOf('@');
            if (atIndex === -1) return false;
            return value.slice(atIndex + 1).includes('.');
        },
        error: 'Email must contain @ and a . after the @'
    },
    {
        id: 'phone',
        validate: value => /^(07|01)\d{8}$/.test(value),
        error: 'Phone must be 10 digits starting with 07 or 01'
    },
    {
        id: 'password',
        validate: value => value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value),
        error: 'Password must be at least 8 characters, with 1 uppercase letter and 1 number'
    }
];

const form = document.getElementById('registration-form');
const submitBtn = document.getElementById('submit-btn');
const fieldValidity = {};

const updateSubmitState = () => {
    const allValid = fields.every(field => fieldValidity[field.id]);
    submitBtn.disabled = !allValid;
};

fields.forEach(field => {
    const input = document.getElementById(field.id);
    const wrapper = input.closest('.form-field');
    const icon = wrapper.querySelector('.field-icon');
    const errorEl = wrapper.querySelector('.field-error');

    fieldValidity[field.id] = false;

    input.addEventListener('input', () => {
        const isValid = field.validate(input.value);
        fieldValidity[field.id] = isValid;

        input.classList.toggle('valid', isValid);
        input.classList.toggle('invalid', !isValid);

        icon.textContent = isValid ? '✓' : '✗';
        icon.classList.toggle('valid', isValid);
        icon.classList.toggle('invalid', !isValid);

        errorEl.textContent = isValid ? '' : field.error;

        updateSubmitState();
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = {};
    fields.forEach(field => {
        formData[field.id] = document.getElementById(field.id).value;
    });

    console.log(formData);
});
