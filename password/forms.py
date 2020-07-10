from django import forms


class PasswordForm(forms.Form):
    password = forms.CharField(max_length=200, strip=False, widget=forms.TextInput(attrs={'class': "form-control"}))
