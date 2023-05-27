from rest_framework import serializers
from .models import User
from .models import Interest

# class InterestSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Interest
#         fields = ['name']


from django.core.exceptions import ObjectDoesNotExist

class UserSerializer(serializers.ModelSerializer):
    interest = serializers.PrimaryKeyRelatedField(many=True, queryset=Interest.objects.all())
    bio = serializers.CharField(max_length=500, required=False)

    class Meta:
        model = User
        fields = ['id', 'Username', 'email', 'password', 'name', 'interest', 'bio']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        interest = validated_data.pop('interest', [])
        bio = validated_data.pop('bio', '')
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.bio = bio
        instance.save()
        if interest:
            instance.interest.set(interest)
        return instance

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['interest'] = [{'id': interest.id, 'name': interest.name} for interest in instance.interest.all()]
        return ret


    def to_internal_value(self, data):
        if isinstance(data.get('interest'), str):
            interest = data['interest'].split(',')
            try:
                data['interest'] = [int(id) for id in interest]
            except ValueError:
                raise serializers.ValidationError("Invalid primary key value for Interest.")
            queryset = Interest.objects.filter(pk__in=data['interest'])
            if len(queryset) != len(data['interest']):
                raise serializers.ValidationError("Interest matching query does not exist.")
            data['interest'] = queryset
        return data