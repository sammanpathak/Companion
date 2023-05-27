import random
from django.contrib.auth.models import AbstractUser
from django.db import models

# From interests, since one single user can have many interests, it has to be many to many field(also many user can have the same interest)
class Interest(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name



class User(AbstractUser):
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    bio = models.CharField(max_length=500, default='')

    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_default_username():
        return f"random{random.randint(1, 1000000)}"

    Username = models.CharField(
        max_length=255, unique=True, default=get_default_username()
    )

    interest = models.ManyToManyField(Interest)

    
    # For matching the users based on their interest, since many to many relationship is used
    # def get_matching_users(self):
    #     matching_users = []
    #     for interest in self.interests.all():
    #         matching_users += interest.user_set.exclude(id=self.id).distinct()
    #     return matching_users


# class UserInterest(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     interest = models.ForeignKey(Interest, on_delete=models.CASCADE)

#     def __str__(self):
#         return f"{self.user.name} - {self.interest.name}"
