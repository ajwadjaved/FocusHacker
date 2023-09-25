from django.contrib import admin
from django.urls import path, include
from api.views import SaveEntry, UpdateEntry
from magic_links.views import SignInView, SignUpView, VerifyMagicLinkView


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('api.urls')),
    path('api/save-entry/', SaveEntry.as_view(), name='save_entry'),
    path('api/save-entry/<int:entry_id>/', UpdateEntry.as_view(), name='update_entry'),
    path('magic_links/sign-in/', SignInView.as_view(), name='sign-in'),
    path('magic_links/sign-up/', SignUpView.as_view(), name='sign-up'),  # New URL for sign-up
    path('verify/', VerifyMagicLinkView.as_view(), name='verify-magic-link'),  # New URL for verifying the magic link

]
