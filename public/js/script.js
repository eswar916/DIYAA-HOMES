document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const countryCodeSelect = document.querySelector('#country-code');
const submitBtn = document.querySelector('#submit');
const phoneError = document.querySelector('#phone-error');
const diya = document.querySelector('#diyadiv')
const popup = document.querySelector('#popup') 

if(!document.cookie){
    setTimeout(()=>{
        diya.style.opacity = '0.2';
        diya.style.pointerEvents = 'none';
        document.body.style.overflow = 'hidden';
        popup.style.display = 'block';
    },4000)
}



submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phn = phoneInput.value.trim();
    const countryCode = countryCodeSelect.value;
    const fullPhone = countryCode + phn;

    const formData = { name, email, phone: fullPhone };
    console.log('Form Data:', formData);

    if (validphnemail(fullPhone, email)) {
        diya.style.opacity = '1';
        diya.style.pointerEvents = 'auto';
        popup.style.display = 'none';
        document.body.style.overflow = '';

        const d = new Date();
        d.setTime(d.getTime() + (7*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = 'visited = true;' + expires;

        fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        })
        .then((res) => {
            if (!res.ok) throw new Error('Network response not ok');
            return res.json();
        })
        .then((data) => {
            console.log('Server Response:', data);
            phoneError.textContent = 'Submission successful!';
        })
        .catch((err) => {
            console.error('Error:', err);
            phoneError.textContent = 'Submission failed. Please try again.';
        });
    } else {
        phoneError.textContent =
        'Phone must be 10 digits and email must be @gmail.com';
    }
});



const validphnemail = (phn, email) => {

    let isValidEmail = false;
    let isValidPhone = false;
    const pattern = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (regex.test(email)) {
        isValidEmail = true
    }

    if (pattern.test(phn)) {
        isValidPhone = true
    } 
    

    return isValidPhone && isValidEmail;
};
