from django.contrib import admin
from django.urls import path, include
from api.views import SaveEntry, UpdateEntry
from api.views import SignInView


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('api.urls')),
    path('api/save-entry/', SaveEntry.as_view(), name='save_entry'),
    path('api/save-entry/<int:entry_id>/', UpdateEntry.as_view(), name='update_entry'),
    path('sign-in/', SignInView.as_view(), name='sign-in'),
]
