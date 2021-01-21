var input = document.querySelector('#input');
var printer = document.querySelector('#printer');

        // Image condition checker function ------------------------------------------------------//
var image_formats = [".png",".jpg",".jpeg","gif","svg",".ico"];

function image_condition(value){
    var condition = false;
    for ( a = 0; a < image_formats.length ; a++ ){
        var format = image_formats[a];
        if (value.includes(format)){
            condition = true;
            break;
        };
    };
    if (condition == true){
        return true;
    }else{
        return false;
    };
};
        // Main function --------------------------------------------------------------------------------//
function smart_link() {
    var input_value = "";
    input_value = input.value;
    var main_element =  create_new_element("p", "", "", "", ["class"], ["main_element"]);

    if(input_value.includes("||") || input_value.includes("!!")) {
        var splited_string_array;
        var all_parts_of_string = [];
        var hider_array = [];
        var targeter_array = [];
        var all_index_array = [];
        splited_string_array = input_value.split("");

        splited_string_array.forEach( function (valu , indx) {
            if ( valu =="|" && splited_string_array[indx+1] == "|" && splited_string_array[indx+2] != "|" ){
                hider_array.push(indx);
                all_index_array.push(indx);
            }
            else if ( valu =="!" && splited_string_array[indx+1] == "!" && splited_string_array[indx+2] != "!" ) {
                targeter_array.push(indx);
                all_index_array.push(indx);
            }
        });
            // Filtering procces - 1 ------------------------------------------------------------------//
        all_index_array.forEach(function(valu, indx){
            if(hider_array.includes(valu)){
                var index = hider_array.indexOf(valu);
                var pre_index = hider_array[index-1];
                var pre_indx;
                if(index % 2 != 0){
                    for(i = 1, pre_indx = all_index_array[indx-i]; pre_indx != pre_index; i++){
                        pre_indx = all_index_array[indx-i];
                        pre_indx_all = all_index_array.indexOf(pre_indx);
                        var that_index = targeter_array.indexOf(pre_indx);
                        if( pre_indx != pre_index){
                                // Not for null value
                            if (pre_indx_all != -1 && that_index != -1){
                                delete all_index_array[pre_indx_all];
                                all_index_array = all_index_array.filter(check_number);

                                delete targeter_array[that_index];
                                targeter_array = targeter_array.filter(check_number);
                            }
                        }
                    }
                }
            }
            else if(targeter_array.includes(valu)){
                var index = targeter_array.indexOf(valu);
                var pre_index = targeter_array[index-1];
                var pre_indx;
                if(index % 2 != 0){
                    for(i = 1, pre_indx = all_index_array[indx-i]; pre_indx != pre_index; i++){
                        pre_indx = all_index_array[indx-i];
                        pre_indx_all = all_index_array.indexOf(pre_indx);
                        var that_index = hider_array.indexOf(pre_indx);
                        if( pre_indx != pre_index){
                                // Not for null value
                            if (pre_indx_all != -1 && that_index != -1){
                                delete all_index_array[pre_indx_all];
                                all_index_array = all_index_array.filter(check_number);
    
                                delete hider_array[that_index];
                                hider_array = hider_array.filter(check_number);
                            }
                        }
                    }
                };
            };
        });
            // Filtering procces - 2 ------------------------------------------------------------------//
        if(hider_array.length % 2 != 0){
            var last_indx = hider_array.length -1
            var pre_indx_all = hider_array[last_indx];
            pre_indx_all = all_index_array.indexOf(pre_indx_all);
            if (pre_indx_all != -1){
                delete all_index_array[pre_indx_all];
                all_index_array = all_index_array.filter(check_number);

                hider_array.pop();
                hider_array = hider_array.filter(check_number);
            }
        }
        if(targeter_array.length % 2 != 0){
            var last_indx = targeter_array.length -1
            var pre_indx_all = targeter_array[last_indx];
            pre_indx_all = all_index_array.indexOf(pre_indx_all);
            if (pre_indx_all != -1){
                delete all_index_array[pre_indx_all];
                all_index_array = all_index_array.filter(check_number);

                targeter_array.pop();
                targeter_array = targeter_array.filter(check_number);
            }
        }
        function check_number (number){
            return number != NaN;
        };

            // For simple text ---------------------------------------//
        if(all_index_array.length !== 0){
            all_index_array.forEach(function(valu , indx){
                var simple_text;
                var simple_txt_span = create_new_element("span", "", "", "", [], []);
                if (indx % 2 == 0) {
                    if (indx == 0){
                        simple_text = splited_string_array.slice(0, valu);
                        simple_text = simple_text.join("");
                        all_parts_of_string[valu - 1] = detect_link(simple_text, simple_txt_span);
                    }
                    else {
                        var old_indx = all_index_array[indx - 1];
                        simple_text = splited_string_array.slice(old_indx + 2, valu);
                        simple_text = simple_text.join("");
                        all_parts_of_string[valu - 1] = detect_link(simple_text, simple_txt_span);
                    };
                }
                else {
                    if (indx == all_index_array.length - 1){
                        simple_text = splited_string_array.slice(valu + 2);
                        simple_text = simple_text.join("");
                        all_parts_of_string[valu + 1] = detect_link(simple_text, simple_txt_span);
                    }
                }
            });
        }
        else {
            var simple_text;
            var simple_txt_span = create_new_element("span", "", "", "", [], []);
            simple_text = splited_string_array.join("");
            all_parts_of_string[0] = detect_link(simple_text, simple_txt_span);
        };
            // For hide text ----------------------------------------------//
        if(hider_array.length !== 0){
            hider_array.forEach(function(valu , indx){
                var hidden_value;
                var hidden_txt_span = create_new_element("span", "", "", "", ["class", "onclick"], ["hidden_text hidden", "hide_txt(this)"]);
                var hidden_span = create_new_element("span", "", "", "", ["class"], ["hidden_span"]);
                if (indx % 2 == 0 && hider_array[indx + 1] != undefined ){
                    var after_valu = hider_array[indx + 1];
                    hidden_value = splited_string_array.slice(valu + 2, after_valu);
                    hidden_value = hidden_value.join("");
                    all_parts_of_string[valu] = detect_link(hidden_value, hidden_span);
                    hidden_txt_span.appendChild(all_parts_of_string[valu]);
                    all_parts_of_string[valu] = hidden_txt_span;
                    
                    var inner_html = all_parts_of_string[valu].innerHTML;
                    if (inner_html.includes('<br><img class="smart_img" src="http')){
                        all_parts_of_string[valu].style.display = "block";
                        all_parts_of_string[valu].style.borderRadius = "10px";
                        all_parts_of_string[valu].children[0].style.display = "block";
                    }
                }
            });
        };
            // For triggered text ------------------------------------//
        if(targeter_array.length !== 0){
            targeter_array.forEach(function(valu , indx){
                var triggered_value;
                var triggered_txt_span = create_new_element("span", "", "", "", ["class"], ["triggered_text"]);
                if (indx % 2 == 0 && targeter_array[indx + 1] != undefined ){
                    var after_valu = targeter_array[indx + 1];
                    triggered_value = splited_string_array.slice(valu + 2, after_valu);
                    triggered_value = triggered_value.join("");
                    all_parts_of_string[valu] = detect_link(triggered_value, triggered_txt_span);
                    
                    var inner_html = all_parts_of_string[valu].innerHTML;
                    if (inner_html.includes('<br><img class="smart_img" src="http')){
                        all_parts_of_string[valu].style.display = "block";
                        all_parts_of_string[valu].style.borderRadius = "10px";
                    }
                }
            });
        };
            // append all element into the main element -------------------------//
        for (i = 0 ; i < all_parts_of_string.length ; i ++){
            if(all_parts_of_string[i] != "" && all_parts_of_string[i] != undefined && all_parts_of_string[i] != null ){
                main_element.appendChild(all_parts_of_string[i]);
            };
        };
        printer.appendChild(main_element);
    }
    else {
        var very_simple_txt_span = create_new_element("span", "", "", "", [], []);
        input_value = detect_link(input_value, very_simple_txt_span);
        main_element.appendChild(input_value);
        printer.appendChild(main_element);
    };
    input.value = "";
};



function detect_link(input_value, main_span){
    var string_array;
    var image_array = [];
    var links_array = [];
    var all_links_array = [];
    var all_value = [];

        // --- // For link and text and extra -----------------------------------------------------------//
    if(input_value.includes("http://") || input_value.includes("https://")){
        string_array = input_value.split(" ");

            // For getting the link's index no. fron that array --------------------------------------//
        for ( i = 0; i < string_array.length ; i++ ){
            if (string_array[i].includes("http://") || string_array[i].includes("https://")){
                if(image_condition(string_array[i])){
                    image_array.push(i);
                    all_links_array.push(i);
                }
                else{
                    links_array.push(i);
                    all_links_array.push(i);
                };
            }
        };

            // For only text -----------------------------------------------------------------------//
        for( t = 0; t < all_links_array.length; t++) {
            var index = all_links_array[t];
            var text_node = [];
            var last_text_node;
            if( t == 0 ){
                var text = string_array.slice( 0, index );
                text = text.join(" ");
                text_node[t] = document.createTextNode(text + " ");
                all_value[index - 1] = text_node[t];
            }else {
                var old_index = all_links_array[t - 1];
                var text = string_array.slice( old_index + 1, index );
                text = text.join(" ");
                text_node[t] = document.createTextNode(text + " ");
                all_value[index - 1] = text_node[t];
            };
            if (t == (all_links_array.length - 1 )){
                var text = string_array.slice( index + 1 );
                text = text.join(" ");
                last_text_node = document.createTextNode(text + " ");
                all_value[index + 1] = last_text_node;
            };
        };

            // For only link ------------------------------------------------------------------//
        if (links_array.length != 0){
            for ( l = 0; l < links_array.length; l++ ){
                var index = links_array[l];
                var link_value = string_array[index];
                var a_element = [];

                if (link_value.indexOf("http://") == 0 || link_value.indexOf("https://") == 0){
                    a_element[l] =  create_new_element("a", link_value, "", "", ["class", "href"], ["smart_link", link_value])
                    all_value[index] = a_element[l];
                }
                else{
                    var link_value_array = link_value.split("http");
                    var link = "http" + link_value_array[1];
                    a_element[l] =  create_new_element("a", link, "", "", ["class", "href"], ["smart_link", link]);
                    all_value[index] = create_new_element("span", link_value_array[0], [a_element[l]], "", ["class"], ["smart_link_span"]);
                };
            };
        };

            // For image link -------------------------------------------------------------//
        if (image_array.length != 0){
            for ( i = 0; i < image_array.length; i++ ){
                var index = image_array[i];
                var link_value = string_array[index];
                var br1 = [];
                var img = [];
                var br2 = [];
                if (link_value.indexOf("http://") == 0 || link_value.indexOf("https://") == 0){
                    br1[i] = create_new_element("br", "", "", "", [], []);
                    img[i] = create_new_element("img", "", "", "", ["class", "src"], ["smart_img", link_value]);
                    br2[i] = create_new_element("br", "", "", "", [], []);
                    all_value[index] = create_new_element("span", "", [br1[i], img[i], br2[i]], "", ["class"], ["smart_img_span"]);
                }
                else{
                    var link_value_array = link_value.split("http");
                    var link = "http" + link_value_array[1];
                    br1[i] = create_new_element("br", "", "", "", [], []);
                    img[i] = create_new_element("img", "", "", "", ["class", "src"], ["smart_img", link]);
                    br2[i] = create_new_element("br", "", "", "", [], []);
                    all_value[index] = create_new_element("span", link_value_array[0], [br1[i], img[i], br2[i]], "", ["class"], ["smart_img_span"]);
                };
            };
        };
            // append all element into the main span element -------------------------//
        for (i = 0 ; i < all_value.length ; i ++){
            if(all_value[i] != "" && all_value[i] != undefined && all_value[i] != null ){
                main_span.appendChild(all_value[i]);
            };
        };

        return main_span;
    }
        // --- // For only text -----------------------------------------------------------//
    else {
        var text = document.createTextNode(input_value);
        main_span.appendChild(text);
        return main_span;
    };
};



        // Create new element function ------------------------------------------------------------------------------------------//
function create_new_element(element_name, inner_text, append_something = [], parent, attribute_name = [], attribute_value = []){
    var new_element = document.createElement(element_name);
    if (inner_text !== ""){
        var text = document.createTextNode(inner_text);
        new_element.appendChild(text);
    }
    if(append_something != ""){
        for (e=0; e < append_something.length; e++) {
            new_element.appendChild(append_something[e]);
        }
    }
    if(parent != ""){
        parent.appendChild(new_element);
    }
    if(attribute_name != "" || attribute_value != ""){
        for (e=0; e < attribute_name.length; e++) {
            new_element.setAttribute(attribute_name[e], attribute_value[e]);
        }
    }
    return new_element;
}

        // Triggering the event ------------------------------//
input.addEventListener('keypress', function ( ) {
    if (event.keyCode == 13){
        var scroll_height = printer.scrollHeight;
        smart_link();
        printer.scrollTo(0, scroll_height);
    };
});

        // For hidden text -----------------------------------//
function hide_txt(element) {
    element.classList.toggle('hidden');
};

    // For information ------------------------------------//
var info_div = document.querySelector("#info");
function info () {
    info_div.style.display = "none";
};
