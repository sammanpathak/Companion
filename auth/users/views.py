from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from rest_framework.response import Response
import jwt
import datetime
from .models import User, Interest
from django.db.models import Count
# import requests
# import environ
# env = environ.Env()
# environ.Env.read_env()

class RegisterView(APIView):
    def post(self, request):
        userDetails = request.data.get('userDetails', {})
        bio = request.data.get('bio', '')
        interest = request.data.get('interest', [])
        
        # Create user serializer instance with userDetails
        serializer = UserSerializer(data=userDetails)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Add bio and interests to user instance
        user.bio = bio
        user.interest.set(interest)
        user.save()

        # #Also register the user to the chat engine page for chat

        # response = requests.post('https://api.chatengine.io/users/',
        #                      data={
        #                          "username": request.Username,
        #                          "secret": request.password,
        #                          "email": request.email,
        #                          "first_name": request.name.split[' '], #Split the name into first and last name
        #                          "last_name": request.name.split[' '],
        #                      },
        #                      headers={
        #                          "Private-Key": env('CHAT_ENGINE_PRIVATE_KEY')}
        #                      )
        
        # Return serialized user data
        return Response(UserSerializer(user).data)



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

#For matching users, 
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class MatchUsers(APIView):
    def get(self, request, format=None):
        # get the token to retrieve the user
        token = request.COOKIES.get('jwt')

        # decoding it to get the user
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        # get according to the id
        user = User.objects.filter(id=payload['id']).first()

        # get users who share at least one interest with the current user, sorted by number of shared interests
        users = User.objects.annotate(
            num_interests=Count('interest')
        ).exclude(
            id=user.id
        ).exclude(
            interest=None
        ).order_by(
            '-num_interests'
        )

        # find top users who share interests with the current user
        top_users = []
        for other_user in users:
            match_count = other_user.interest.filter(
                id__in=user.interest.all().values_list('id', flat=True)
            ).count()
            if match_count > 0:
                top_users.append((other_user, match_count))

        # sort users by number of matched interests
        sorted_users = sorted(top_users, key=lambda x: x[1], reverse=True)

        # get the top 6 users with most matched interests
        recommended_users = []
        for i in range(min(8, len(sorted_users))):
            user_data = {
                'id': sorted_users[i][0].id,
                'username': sorted_users[i][0].Username,
                'bio': sorted_users[i][0].bio,
                'interests': [interest.name for interest in sorted_users[i][0].interest.all()]
            }
            recommended_users.append(user_data)

        return Response({'users': recommended_users})




