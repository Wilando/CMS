document.addEventListener('DOMContentLoaded', async function () {
    await initLoad();
});

async function initLoad() {
    await login();
}

async function login() {
    $("#loginButton").click(async function() {
        formValidationClear();
        try {
            let reqData = {
                "username": $("#username").val(),
                "password": $("#password").val(),
            }
            let loginStatus = null;
            await axios.get(app_url +'/sanctum/csrf-cookie').then(async (response) => {
                loginStatus = await axios.post(app_url + '/api/login', reqData);
            });
            
            if (loginStatus.data.status) {
                window.location.href = loginStatus.data.redirect_url;
            } else {
                Swal.fire({
                    title: 'Login Gagal!',
                    text: `${loginStatus.data.message}!`,
                    icon: 'warning',
                    customClass: {
                      confirmButton: 'btn btn-primary waves-effect waves-light'
                    },
                    buttonsStyling: false
                });
            }
            
        } catch (error) {
            formValidation(error);
        }
    });
}
