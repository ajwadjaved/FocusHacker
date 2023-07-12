from rest_framework import serializers
from .models import Entry

class EntrySerializer(serializers.ModelSerializer):
    description = serializers.CharField(required=False, allow_blank=True, default='Default Description')

    class Meta:
        model = Entry
        fields = '__all__'

    def create(self, validated_data):
        if 'description' not in validated_data or not validated_data['description']:
            validated_data['description'] = 'Default Description'
        return super().create(validated_data)
