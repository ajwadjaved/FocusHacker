from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Entry
from .serializers import EntrySerializer
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


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
                # serializer.validated_data['description'] = 'Default Description'
            
            # Check if the 'time_taken' field is blank and assign the default value if true
            if not serializer.validated_data.get('time_taken'):
                serializer.validated_data['time_taken'] = 0
            
            serializer.save()
            return Response({'message': 'Entry saved successfully.'})
        else:
            logger.error(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)