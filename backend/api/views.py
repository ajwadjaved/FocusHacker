from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Entry
from .serializers import EntrySerializer

class SaveEntryView(APIView):
    def post(self, request, format=None):
        serializer = EntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Entry saved successfully.'})
        else:
            return Response(serializer.errors, status=400)


# from django.http import JsonResponse
# from .models import Entry
# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# def save_entry(request):
#     if request.method == 'POST':
#         entry_data = request.POST
#         entry = Entry.objects.create(
#             entry=entry_data.get('entry', ''),
#             tag=entry_data.get('tag', ''),
#             description=entry_data.get('description', ''),
#             time_taken=entry_data.get('time_taken', 0)
#         )
#         return JsonResponse({'message': 'Entry saved successfully.'})
#     else:
#         return JsonResponse({'error': 'Invalid request method.'})
