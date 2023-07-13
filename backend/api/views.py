from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Entry
from .serializers import EntrySerializer
from rest_framework import status
from rest_framework.generics import get_object_or_404
from django.views import View
from django.core.mail import send_mail
from django.shortcuts import render
from django.utils.crypto import get_random_string
from magic_links.models import MagicLinkToken
import logging

logger = logging.getLogger(__name__)

class SignInView(View):
    def post(self, request):
        email = request.POST.get('email')
        user = User.objects.get(email=email)
        token = get_random_string(32)
        MagicLinkToken.objects.create(user=user, token=token)
        # Send email with the magic link
        send_mail(
            'Magic Link Sign In',
            f'Click the magic link to sign in: {request.build_absolute_uri("/verify/")}?token={token}',
            'ajwadjaved@gmail.com',
            [email],
            fail_silently=False,
        )
        return JsonResponse({'success': True})


class SaveEntry(APIView):
    def get(self, request, format=None):
        entries = Entry.objects.all()
        serializer = EntrySerializer(entries, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EntrySerializer(data=request.data)
        if serializer.is_valid():
            # Check if the 'entry' field is blank and assign the default value if true
            if not serializer.validated_data.get('entry'):
                serializer.validated_data['entry'] = 'Default Entry'
            
            # Check if the 'description' field is blank and assign the default value if true
            # if not serializer.validated_data.get('description'):
            #     serializer.validated_data['description'] = 'Default Description'
            
            # Check if the 'time_taken' field is blank and assign the default value if true
            if not serializer.validated_data.get('time_taken'):
                serializer.validated_data['time_taken'] = 0
            
            serializer.save()
            return Response({'message': 'Entry saved successfully.'})
        else:
            logger.error(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateEntry(APIView):
    def put(self, request, entry_id, format=None):
        entry = get_object_or_404(Entry, id=entry_id)
        serializer = EntrySerializer(entry, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Entry updated successfully.'})
        else:
            logger.error(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
