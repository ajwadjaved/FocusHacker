from django.http import JsonResponse
from .models import Entry

def save_entry(request):
    if request.method == 'POST':
        entry_data = request.POST
        entry = Entry.objects.create(
            entry=entry_data.get('entry', ''),
            tag=entry_data.get('tag', ''),
            description=entry_data.get('description', ''),
            time_taken=entry_data.get('time_taken', 0)
        )
        return JsonResponse({'message': 'Entry saved successfully.'})
    else:
        return JsonResponse({'error': 'Invalid request method.'})
