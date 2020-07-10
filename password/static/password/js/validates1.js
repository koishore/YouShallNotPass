function runChecks() {
    var my_string = document.getElementById("id_password").value;
    if (!isPalindrome(my_string)) {
        throwError("Password must be a palindrome!");
        return false;
    }
    else if (!hasCapitalLetter(my_string)) {
        throwError("Password must have a capital letter!");
        return false;
    }
    else if (!hasCountryCapital(my_string)) {
        throwError("Password must contain the capital (of a country)!");
        return false;
    }
    else if (!hasCharE(my_string)) {
        throwError("Pasword must contain the character 'e'!");
        return false;
    }
    else if (!hasSpace(my_string)) {
        throwError("Password must contain a space!");
        return false;
    }
    else if (hasConsecutiveChar(my_string)) {
        throwError("Password must not contain consecutive repeating characters!");
        return false;
    }
    else if (!isDivisible(my_string)) {
        throwError("Length of password must be divisible by 3!");
        return false;
    }
    else if(!maxLength(my_string)) {
        throwError("Length of password cannot be more than 15 characters!");
        return false;
    }
}

function throwError(error_string) {

    var alert_box = document.getElementById("alert");
    if (alert_box) {
        alert_box.remove();
    }

    alert_box = document.createElement("div");
    alert_box.classList.add("alert");
    alert_box.classList.add("alert-danger");
    alert_box.setAttribute("role", "alert");
    alert_box.setAttribute("id", "alert");

    var heading = document.createElement("h4");
    var node_head = document.createTextNode("Sorry!");
    heading.appendChild(node_head);
    heading.classList.add("alert-heading");

    var text = document.createElement("p");
    var node_error = document.createTextNode(error_string);
    text.appendChild(node_error);

    alert_box.appendChild(heading);
    alert_box.appendChild(text);

    var main = document.getElementById("main");
    main.append(alert_box);

    setTimeout(fadeOut, 3000, alert_box);
}

function fadeOut(my_element) {
    if (my_element.style.opacity > 0) {
        my_element.style.opacity = my_element.style.opacity - 0.01;
        setTimeout(fadeOut, 50, my_element);
    }
    else {
        my_element.parentNode.removeChild(my_element);
    }
}


function isPalindrome(my_string) {
    var new_string = my_string.split("").reverse().join("");
    return new_string == my_string;
}

function hasCapitalLetter(my_string) {
    for (var i = 0; i < my_string.length; i++) {
        if (my_string.charCodeAt(i) >= 65 && my_string.charCodeAt(i) <= 90) {
            return true;
        }
    }
    return false;
}

function hasCountryCapital(my_string) {
    var capital_list = ['Kabul', 'Tirana', 'Algiers', 'Andorra la Vella', 'Luanda', "Saint John's", 'Buenos Aires', 'Yerevan', 'Canberra', 'Vienna', 'Baku', 'Nassau', 'Manama', 'Dhaka', 'Bridgetown', 'Minsk', 'Brussels', 'Belmopan', 'Porto-Novo', 'Thimphu', 'La Paz (administrative); Sucre (judicial)', 'Sarajevo', 'Gaborone', 'Brasilia', 'Bandar Seri Begawan', 'Sofia', 'Ouagadougou', 'Gitega (changed from Bujumbura in December 2018)', 'Phnom Penh', 'Yaounde', 'Ottawa', 'Praia', 'Bangui', "N'Djamena", 'Santiago', 'Beijing', 'Bogota', 'Moroni', 'Brazzaville', 'Kinshasa', 'San Jose', 'Yamoussoukro (official); Abidjan (de facto)', 'Zagreb', 'Havana', 'Nicosia', 'Prague', 'Copenhagen', 'Djibouti', 'Roseau', 'Santo Domingo', 'Dili', 'Quito', 'Cairo', 'San Salvador', 'Malabo', 'Asmara', 'Tallinn', 'Addis Ababa', 'Suva', 'Helsinki', 'Paris', 'Libreville', 'Banjul', 'Tbilisi', 'Berlin', 'Accra', 'Athens', "Saint George's", 'Guatemala City', 'Conakry', 'Bissau', 'Georgetown', 'Port-au-Prince', 'Tegucigalpa', 'Budapest', 'Reykjavik', 'New Delhi', 'Jakarta', 'Tehran', 'Baghdad', 'Dublin', 'Jerusalem*', 'Rome', 'Kingston', 'Tokyo', 'Amman', 'Astana', 'Nairobi', 'Tarawa Atoll', 'Pyongyang', 'Seoul', 'Pristina', 'Kuwait City', 'Bishkek', 'Vientiane', 'Riga', 'Beirut', 'Maseru', 'Monrovia', 'Tripoli', 'Vaduz', 'Vilnius', 'Luxembourg', 'Skopje', 'Antananarivo', 'Lilongwe', 'Kuala Lumpur', 'Male', 'Bamako', 'Valletta', 'Majuro', 'Nouakchott', 'Port Louis', 'Mexico City', 'Palikir', 'Chisinau', 'Monaco', 'Ulaanbaatar', 'Podgorica', 'Rabat', 'Maputo', 'Rangoon (Yangon); Naypyidaw or Nay Pyi Taw (administrative)', 'Windhoek', 'no official capital; government offices in Yaren District', 'Kathmandu', 'Amsterdam; The Hague (seat of government)', 'Wellington', 'Managua', 'Niamey', 'Abuja', 'Oslo', 'Muscat', 'Islamabad', 'Melekeok', 'Panama City', 'Port Moresby', 'Asuncion', 'Lima', 'Manila', 'Warsaw', 'Lisbon', 'Doha', 'Bucharest', 'Moscow', 'Kigali', 'Basseterre', 'Castries', 'Kingstown', 'Apia', 'San Marino', 'Sao Tome', 'Riyadh', 'Dakar', 'Belgrade', 'Victoria', 'Freetown', 'Singapore', 'Bratislava', 'Ljubljana', 'Honiara', 'Mogadishu', 'Pretoria (administrative); Cape Town (legislative); Bloemfontein (judiciary)', 'Juba ', 'Madrid', 'Colombo; Sri Jayewardenepura Kotte (legislative)', 'Khartoum', 'Paramaribo', 'Mbabane', 'Stockholm', 'Bern', 'Damascus', 'Taipei', 'Dushanbe', 'Dar es Salaam; Dodoma (legislative)', 'Bangkok', 'Lome', "Nuku'alofa", 'Port-of-Spain', 'Tunis', 'Ankara', 'Ashgabat', 'Vaiaku village, Funafuti province', 'Kampala', 'Kyiv', 'Abu Dhabi', 'London', 'Washington, D.C.', 'Montevideo', 'Tashkent', 'Port-Vila', 'Vatican City', 'Caracas', 'Hanoi', 'Sanaa', 'Lusaka', 'Harare'];
    my_string = my_string.toLowerCase();
    for (var i = 0; i < capital_list.length; i++) {
        if (my_string.includes(capital_list[i].toLowerCase())) {
            return true;
        }
    }
    return false;
}

function hasCharE(my_string) {
    return my_string.includes('e');
}

function hasSpace(my_string) {
    return my_string.includes(' ');
}

function isDivisible(my_string) {
    return my_string.length % 3 == 0;
}

function maxLength(my_string) {
    return my_string.length <= 15;
}

function hasConsecutiveChar(my_string) {
    for (var i = 0; i < my_string.length - 1; i++) {
        if (my_string.charCodeAt(i) == my_string.charCodeAt(i + 1)) {
            return true;
        }
    }
    return false;
}
