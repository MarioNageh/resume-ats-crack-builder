import json
from rest_framework import serializers
from .models import CV

class CVSerializer(serializers.ModelSerializer):
    data = serializers.JSONField()

    class Meta:
        model = CV
        fields = ['id', 'user',  'data', 'title','created_at']
        read_only_fields = ['user', 'created_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['data'] = json.loads(instance.data)
        return representation

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
