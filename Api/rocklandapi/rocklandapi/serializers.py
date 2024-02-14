from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

# class AccountSerializer(serializers.ModelSerializer):
#     class Meta: # metadata describing the model
#         model = Accounts
#         fields = ['username', 'password', 'usertype', 'status']

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id','username', 'password', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

class RockInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RockInformation
        fields = ['rock_name', 'type', 'colour', 'hardness', 'description']

class EducationVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationVideo
        fields = ['topics', 'url', 'date_posted']

class BadgesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badges
        fields = ['username', 'badge_id', 'badge_desc', 'date_achieved']

class QuizResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizResult
        fields = ['username', 'quiz_level', 'quiz_mark', 'datetime']

class PostQuizResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizResult
        fields = ['username', 'quiz_level', 'quiz_mark']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'level', 'gender', 'dob', 'usertype']

class ForumTopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumTopics
        fields = ['fid','topic_name']

class ForumThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumThread
        fields = ['title', 'description', 'username', 'fid']

class GetForumThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumThread
        fields = ['thread_id','title', 'description', 'username', 'fid']

class ForumCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumComment
        fields = ['thread_id', 'comments', 'username']