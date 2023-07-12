from django.urls import path
from api.views import SaveEntry

urlpatterns = [
    path('api/save-entry/', SaveEntry.as_view(), name='save_entry'),
]
