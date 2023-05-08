from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'Username', 'email', 'password', 'name']
        # The password should not be returned along with others
        extra_kwargs = {
            'password': {'write_only': True}
        }
    # for showing the password in encrypted format

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            # set_password is provided by django, the password will be hashed
            instance.set_password(password)
            # for security reasons, we hash the password
        instance.save()
        return instance
