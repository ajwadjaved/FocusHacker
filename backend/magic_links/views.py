from django.shortcuts import render
from django.views import View
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from magic_links.models import MagicLinkToken
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from .models import MagicLinkToken
from django.shortcuts import redirect
from django.utils import timezone
from django.http import HttpResponse
from django.contrib.auth.models import User

from .models import MagicLinkToken

class VerifyMagicLinkView(View):
    def get(self, request):
        token = request.GET.get('token')
        try:
            magic_link_token = MagicLinkToken.objects.get(token=token)
        except MagicLinkToken.DoesNotExist:
            return HttpResponse('Invalid or expired magic link.')
        
        # Add any additional verification logic here if needed.
        # For example, you could check if the token is still valid or if the user has already been activated.

        # Perform user activation logic here (e.g., set user as active)

        # Delete the magic link token after successful verification
        magic_link_token.delete()

        # Redirect the user to the desired page after successful verification
        return redirect('/')  # Replace with your desired redirect URL


#ADD FRONTEND AS HOST
@method_decorator(csrf_exempt, name='dispatch')
class SignInView(View):
    def post(self, request):
        email = request.POST.get('email')  # Use request.data instead of request.POST
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=404)
        
        token = get_random_string(32)
        MagicLinkToken.objects.create(user=user, token=token)
        
        # Send email with the magic link
        send_mail(
            'Magic Link Sign In',
            f'Click the magic link to sign in: {request.build_absolute_url("/verify/")}?token={token}',
            [email],
            fail_silently=False,
        )
        return JsonResponse({'success': True})

@method_decorator(csrf_exempt, name='dispatch')
class SignUpView(View):
    def post(self, request):
        email = request.POST.get('email')  # Use request.data instead of request.POST
        token = get_random_string(32)
        MagicLinkToken.objects.create(email=email, token=token)
        
        # Send email with the magic link
        send_mail(
            'Magic Link Sign Up',
            f'Click the magic link to sign up: {request.build_absolute_url("/verify/")}?token={token}',
            [email],
            fail_silently=False,
        )
        return JsonResponse({'message': 'Magic link sent successfully.'})