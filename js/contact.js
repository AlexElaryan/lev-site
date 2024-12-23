const result = document.getElementById('result');
let contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
            result.innerHTML = json.message;

            // Show success alert
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
            });
        } else {
            console.log(response);
            result.innerHTML = json.message;
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
    })
    .finally(() => {
        contactForm.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 3000);
    });
});
