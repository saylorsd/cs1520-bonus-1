// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function () {
    // Magic!
    console.log('Keepin\'n it clean with an external script!');
    var items = $.get(
        "http://www.mattbowytz.com/simple_api.json",
        {data: "all"},
        function (data) {
            items = (data['data']['interests']).concat(data['data']['programming']);
            console.log(items);
        }
    );
    var print_list = $('#predictions');

    $('#main-input').on('input', function (e) {
        var curr_input = $('#main-input').val();
        var display_list = [];
        var found = false;
        for (var i = 0; i < items.length; i++) {
            if (items[i].toLowerCase().search(curr_input.toLowerCase()) == 0) { //i.e. it's in the beginning of the word
                display_list.push(items[i]);
                console.log(display_list);
                $('#predictions').find('li').remove();
                $.each(display_list, function (i) {
                    var li = $('<li/>')
                        .addClass('prediction-result')
                        .attr('id', 'prediction-result-' + i)
                        .text(display_list[i])
                        .appendTo(print_list);
                });
                found = true;
            }
        }
        if (!found || curr_input == "") {
            $('#predictions').find('li').remove();
        }
    });

    $('.flexsearch-form').on('submit', function (e) {
        e.preventDefault();
        var query = $('.flexsearch-input').val();
        console.log(query);
        window.location.href = "https://www.google.com/?gws_rd=ssl#safe=off&q=" + encodeURIComponent(query);
    });

    $('#predictions').on("click", ".prediction-result", function () {
        console.log('clicked');
        var input = $(this).text();
        console.log(input);
        $('.flexsearch-input').val(input);
        $('#predictions').hide();
    });

})();