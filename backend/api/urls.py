from django.urls import path
from . import views

urlpatterns = [
    path('save-entry/', views.save_entry, name='save-entry'),
]
