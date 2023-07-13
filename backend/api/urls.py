from django.urls import path
from api.views import SaveEntry, UpdateEntry

urlpatterns = [
    path('api/save-entry/', SaveEntry.as_view(), name='save_entry'),
    path('api/save-entry/<int:entry_id>/', UpdateEntry.as_view(), name='update_entry'),
]
