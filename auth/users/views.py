from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from rest_framework.response import Response
import jwt
import datetime
from .models import User
# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

# see from the database if the email ID matches or not
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('usernotfound!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password!')

        # For JSON Web Token, we need to have payload which contains:
        payload = {
            'id': user.id,  # token is identified by unique id
            # how long should a token last, it is defined in max_age below at response.set_cookie
            # 'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()  # initialized at
        }

        # # creating token
        token = jwt.encode(payload, 'secret',
                           algorithm='HS256')
        # token_string = token.decode('utf-8'), no need to decode it as it is already in the string format

        # to return the token via cookies to make it safe,
        # use the token,
        response = Response()
        # Also, we do not want the frontend to access the cookies,
        response.set_cookie(key='jwt', value=token,
                            httponly=True, samesite='None', secure=True, max_age=3600)
        # cookies are created
        response.data = {
            'jwt': token
        }
        return response

# for getting cookies from tokens and retrieve user from the cookie


class UserView(APIView):

    def get(self, request):
        # get the token to retrieve the user
        token = request.COOKIES.get('jwt')

        # # decoding it to get the user
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        # get according to the id
        user = User.objects.filter(id=payload['id']).first()

        serializer = UserSerializer(user)

        return Response(serializer.data)

# For logout


class LogOutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'

        }
        return response
