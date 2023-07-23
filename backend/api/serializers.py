from rest_framework import serializers

from .models import Entry

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'entry', 'tag', 'description', 'time_taken']

