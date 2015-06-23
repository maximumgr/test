/**
 * Created by Ivan on 12.3.2015 г..
 */
$(function() {
    var Exercises = {
        ex1: {

            initialize: function() {
                $("#messages").text("People want you to store your favorite links here. However, you are not into that, you just want to do some XSS magic to the page. Add an alert with the message 'Ex1' to the page (My Sites:)");
                var nativeAlert = window.alert;
                var lastAlert = null;
                window.alert = function(msg) {
                    nativeAlert(msg);
                    lastAlert = msg;
                }
                $("form.ex1").submit(function(evt) {
                    evt.preventDefault();
                    var siteName = $(".ex1 input[type='text']").val();
                    var siteURL = $(".ex1 input[type='url']").val();



                    $("<p class='lead'><span class='label label-success'>" + siteName + "</span>" + siteURL + "</p>").appendTo(".ex1.links-place");
                    if (testForScript("Ex1", [siteName, siteURL], lastAlert)) {

                        $("#messages").removeClass("alert-info").addClass("alert-success");
                        $("#messages").text("You made it to exercise 2. You will be redirected to it in 10 seconds.")
                        levelCompleted(1);



                    }




                })
            }
        }
    }

    Exercises.ex1.initialize();

})
//start it



function spitRegex(text) {
    return  new RegExp("<script>\\s*alert\\(['\"]{1}" + text + "['\"]{1}\\);*\\s*<\\/script>", "g");
}

function testForScript(patternText, variablesToCheck, lastAlert) {
    var regex = spitRegex(patternText);
    for (var i = 0; i < variablesToCheck.length; i++) {
        if (regex.test(variablesToCheck[i])) {
            if (lastAlert === patternText) {
                return true;


            }
        }
    }
    return false;
}
