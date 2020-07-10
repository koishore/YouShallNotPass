from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('stage1/', views.stage1, name='stage1'),
]
