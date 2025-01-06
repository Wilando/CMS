window.formValidation = function(error) {
    const errorServer = error.response.data.errors;
    Object.keys(errorServer).forEach(error => {
        $(`#${error}`).addClass("is-invalid");
        $(`#invalid-${error}`).text(`${errorServer[error]}`);
        //console.log(error, errorServer[error]);
    });
};

window.formValidationClear = function() {
    $(`input, select, textarea`).removeClass("is-invalid");
    $('[id^="invalid-"]').text('');
};

window.formReset = function(field) {
    window.formValidationClear();
    field.forEach(element => {
        const $element = $(element);

        // Jika elemen adalah checkbox atau radio button
        if ($element.is(':checkbox') || $element.is(':radio')) {
            $element.prop('checked', false); // Uncheck
        } else {
            $element.val(null).trigger('change'); // Reset nilai input biasa
        }
    });
};