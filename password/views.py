from django.http import HttpResponse
from django.shortcuts import render

from .models import Password
from .forms import PasswordForm

def index(request):
    return HttpResponse("Hello, world. You're at the YouShallNotPass index.")

def stage1(request):
    def is_palindrone(password):
	       return password == password[::-1]
    def has_capital_letter(password):
    	for i in range(len(password)):
    		if ord(password[i]) in range(ord('A'), ord('Z') + 1):
    			return True
    	return False
    def has_capital(password):
    	capitals = ['Kabul', 'Tirana', 'Algiers', 'Andorra la Vella', 'Luanda', "Saint John's", 'Buenos Aires', 'Yerevan', 'Canberra', 'Vienna', 'Baku', 'Nassau', 'Manama', 'Dhaka', 'Bridgetown', 'Minsk', 'Brussels', 'Belmopan', 'Porto-Novo', 'Thimphu', 'La Paz (administrative); Sucre (judicial)', 'Sarajevo', 'Gaborone', 'Brasilia', 'Bandar Seri Begawan', 'Sofia', 'Ouagadougou', 'Gitega (changed from Bujumbura in December 2018)', 'Phnom Penh', 'Yaounde', 'Ottawa', 'Praia', 'Bangui', "N'Djamena", 'Santiago', 'Beijing', 'Bogota', 'Moroni', 'Brazzaville', 'Kinshasa', 'San Jose', 'Yamoussoukro (official); Abidjan (de facto)', 'Zagreb', 'Havana', 'Nicosia', 'Prague', 'Copenhagen', 'Djibouti', 'Roseau', 'Santo Domingo', 'Dili', 'Quito', 'Cairo', 'San Salvador', 'Malabo', 'Asmara', 'Tallinn', 'Addis Ababa', 'Suva', 'Helsinki', 'Paris', 'Libreville', 'Banjul', 'Tbilisi', 'Berlin', 'Accra', 'Athens', "Saint George's", 'Guatemala City', 'Conakry', 'Bissau', 'Georgetown', 'Port-au-Prince', 'Tegucigalpa', 'Budapest', 'Reykjavik', 'New Delhi', 'Jakarta', 'Tehran', 'Baghdad', 'Dublin', 'Jerusalem*', 'Rome', 'Kingston', 'Tokyo', 'Amman', 'Astana', 'Nairobi', 'Tarawa Atoll', 'Pyongyang', 'Seoul', 'Pristina', 'Kuwait City', 'Bishkek', 'Vientiane', 'Riga', 'Beirut', 'Maseru', 'Monrovia', 'Tripoli', 'Vaduz', 'Vilnius', 'Luxembourg', 'Skopje', 'Antananarivo', 'Lilongwe', 'Kuala Lumpur', 'Male', 'Bamako', 'Valletta', 'Majuro', 'Nouakchott', 'Port Louis', 'Mexico City', 'Palikir', 'Chisinau', 'Monaco', 'Ulaanbaatar', 'Podgorica', 'Rabat', 'Maputo', 'Rangoon (Yangon); Naypyidaw or Nay Pyi Taw (administrative)', 'Windhoek', 'no official capital; government offices in Yaren District', 'Kathmandu', 'Amsterdam; The Hague (seat of government)', 'Wellington', 'Managua', 'Niamey', 'Abuja', 'Oslo', 'Muscat', 'Islamabad', 'Melekeok', 'Panama City', 'Port Moresby', 'Asuncion', 'Lima', 'Manila', 'Warsaw', 'Lisbon', 'Doha', 'Bucharest', 'Moscow', 'Kigali', 'Basseterre', 'Castries', 'Kingstown', 'Apia', 'San Marino', 'Sao Tome', 'Riyadh', 'Dakar', 'Belgrade', 'Victoria', 'Freetown', 'Singapore', 'Bratislava', 'Ljubljana', 'Honiara', 'Mogadishu', 'Pretoria (administrative); Cape Town (legislative); Bloemfontein (judiciary)', 'Juba ', 'Madrid', 'Colombo; Sri Jayewardenepura Kotte (legislative)', 'Khartoum', 'Paramaribo', 'Mbabane', 'Stockholm', 'Bern', 'Damascus', 'Taipei', 'Dushanbe', 'Dar es Salaam; Dodoma (legislative)', 'Bangkok', 'Lome', "Nuku'alofa", 'Port-of-Spain', 'Tunis', 'Ankara', 'Ashgabat', 'Vaiaku village, Funafuti province', 'Kampala', 'Kyiv', 'Abu Dhabi', 'London', 'Washington, D.C.', 'Montevideo', 'Tashkent', 'Port-Vila', 'Vatican City', 'Caracas', 'Hanoi', 'Sanaa', 'Lusaka', 'Harare']
    	for capital in capitals:
    		if capital.lower() in password.lower():
    			return True
    	return False
    def has_e(password):
    	if 'e' in password:
    		return True
    	return False
    def has_space(password):
    	if ' ' in password:
    		return True
    	return False
    def consecutive(password):
    	curr = password[0]
    	for i in range(1, len(password)):
    		if curr == password[i]:
    			return False
    		else:
    			curr = password[i]
    	return True
    def is_len_div_by_3(password):
    	if len(password) % 3:
    		return False
    	return True
    def max_len(password):
    	if len(password) <= 15:
    		return True
    	return False
    def isValid(password):
    	if not is_palindrone(password):
    		return "Password must be a palindrome"
    	elif not has_capital_letter(password):
    		return "Password must have a capital letter"
    	elif not has_capital(password):
    		return "Password must contain the capital (of a country)"
    	elif not has_e(password):
    		return "Pasword must contain the character 'e'"
    	elif not has_space(password):
    		return "Password must contain a space"
    	elif not consecutive(password):
    		return "Password must not contain consecutive repeating characters"
    	elif not is_len_div_by_3(password):
    		return "Length of password must be divisible by 3"
    	elif not max_len(password):
    		return "Length of password cannot be more than 15 characters"
    	else:
    		return "Valid"
    class Status:
        def __init__(self):
            self.heading = None
            self.password = None
            self.type = None
            self.message = None
    form = PasswordForm(request.POST if request.method == 'POST' else None)
    status = None
    if form.is_valid():
        pwd = form.cleaned_data['password']
        error = isValid(pwd)
        if error == "Valid":
            try:
                password = Password.objects.get(password=pwd)
                password.used = password.used + 1
                used = password.used
                password.save()
            except Password.DoesNotExist:
                password = Password()
                password.password = pwd
                password.used = 1
                used = password.used
                password.save()
            if used == 1:
                status = Status()
                status.heading = 'Congratulations!'
                status.password = pwd
                status.type = "alert alert-success"
                status.message = "You unraveled a new password!"
            else:
                status = Status()
                status.heading = 'You have won, but at what cost?'
                status.password = pwd
                status.type = "alert alert-warning"
                status.message = "This is a valid password which has been used {} times!".format(used)
        else:
            status = Status()
            status.heading = 'Sorry!'
            status.password = pwd
            status.type = "alert alert-danger"
            status.message = error
    context = {
        'form': form,
        'status': status,
    }
    return render(request, 'password/stage1.html', context)
