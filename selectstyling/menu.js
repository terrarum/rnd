/*
    Takes the names and values of the optgroups and options and builds an object.
 */
function getMenu() {
    var menu = {};
    // Loops through each optgroup under the given id.
    $('#category-select optgroup').each(function(child) {
        var optgroup = $(this)[0];          // the optgroup
        var options = optgroup.children;    // the selects
        menu[optgroup.label] = {};

        $.each(options, function(key, value) {  // Loop through the selects
            menu[optgroup.label][key] = {
                "title": options[key].label,    // Add the name and value to
                "value": options[key].value     // the menu object.
            }
        })
    })
    return menu;
}

/*
    Takes the menu object and outputs it as HTML.
 */
function outputMenu(menu) {
    var count = 0,
        size = 0;

    // Get number of optgroups.
    $.each(menu, function(key, value) {
        size++;
    })

    // Process
    $.each(menu, function(key, value) {
        $("#menu").append("<div class='optgroup menu-item'>" + key + "</div>");
        $.each(value, function(key, value) {
            $("#menu").append("<div class='option menu-item' value='" + value.value + "'>" + value.title + "</div>");
        })
        if (count < size - 1) {
            $("#menu").append("<hr />");
        }
        count++;
    });
}

// On load!
$(function() {
    $("#menu").hide();
    var menu = getMenu(),
        visible = false;

    outputMenu(menu);

    // Toggles menu on button click.
    $("#menu-button").click(function() {
        // Could have used .toggle() but this prevents unnecessary clicks elsewhere.
        if (!visible) {
            $("#menu").show();
            visible = true;
        }
        else {
            $("#menu").hide();
            visible = false;
        }
    })

    // On option click, sends value to getCategoryFields, sets selected field to the button text
    // and hides the menu again.
    $("#menu .option").click(function() {
        getCategoryFields($(this).attr("value"));
        $("#menu-button").html($(this).text());

        // Adds a flash to the selected menu item.
        $(this).addClass("menu-item-selected").delay(50).queue(function(next){
            $(this).removeClass("menu-item-selected");
            next();
        });

        $("#menu").delay(100).hide(0);
        visible = false;
    })

    // Hides the menu when the user clicks outside of it.
    $(document).click(function(e) {
        var container = $("#menu");
        if (visible && e.target.id != "menu-button") {
            if (container.has(e.target).length === 0) {
                visible = false;
                container.hide();
            }
        }
    });
})