from django.urls import path
from .views import SaveEntryView
# from . import views

urlpatterns = [
    # path('save-entry/', views.save_entry, name='save-entry'),
    path('api/save-entry/', SaveEntryView.as_view(), name='save_entry'),
]
