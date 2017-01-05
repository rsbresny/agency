$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://formspree.io/richardsbresny@gmail.com",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                dataType: 'json',
                beforeSend: function(){
                  $contactForm.append('<div class = "alert alert--loading">Sending message...</div>');
                },
                success: function(data) {
                  $contactForm.find('alert--loading').hide();
                  $contactForm.append('<div class = "alert alert--success">Message sent!</div>');
                },
                error: function(err) {
                  $contactForm.find('alert--loading').hide();
                  $contactForm.append('<div class = "alert alert--error">Oops, there was an error.</div>');
                }
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
