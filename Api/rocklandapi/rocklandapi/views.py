from django.http import JsonResponse
from .models import RockInformation
from .serializers import *
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from datetime import datetime
import json

# create endpoints here
# endpoints = certain url we can access the data from


# Pre-Defined dictionary
badge_dict = {
    "rockexplorer": "1",
    "quiz1": "2",
    "quiz2": "3",
    "rockenthusiast": "4",
    "quiz3": "5",
    "quiz4": "6",
    "rockexpert": "7",
    "quiz5": "8",
    "quiz6": "9"
}

# Login - Might add email OTP
@api_view(['POST'])
def login(request):
    print("login called")
    print(request.data)
    print(type(request.data))
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail":"Not Found."}, status=status.HTTP_404_NOT_FOUND)
    # found user
    token, created  = Token.objects.get_or_create(user=user)
    authUserSerializer = AuthUserSerializer(instance=user)
    return Response({"token": token.key, "user": authUserSerializer.data})

# Sign Up
@api_view(['POST'])
def signup(request):
    authUserSerializer = AuthUserSerializer(data=request.data)
    userProfileSerializer = UserProfileSerializer(data=request.data)


    if authUserSerializer.is_valid():
        authUserSerializer.save()
        # After user is saved into db, retireve user's username
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        #new code here
        # ref fields = ['id','username', 'password', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']
        #check passed data 
        user.save()

        # Create token for the account
        token = Token.objects.create(user=user)


        # Create record in user profile in db
        if userProfileSerializer.is_valid():
            userProfileSerializer.save()

            # Create record for badge in db once use profile is created
            badge_obtained = badge_dict['rockexplorer']
            date = datetime.today().strftime('%Y-%m-%d')
            data = {'username': request.data['username'], 'badge_id': badge_obtained, 'date_achieved': date}
            badgeSerializer = BadgesSerializer(data=data)
            if badgeSerializer.is_valid():
                badgeSerializer.save()
                return Response({"token": token.key, "user": authUserSerializer.data})
            
            return Response(badgeSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # If not valid 
        return Response(authUserSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # If not valid 
    return Response(authUserSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get all users and Add An User Account
@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def usersAcc_list(request):
    
    # Retrieve User Accounts
    if request.method == 'GET':
        # get all users
        users = User.objects.filter(is_staff=False)

        # serialize
        authUserSerializer = AuthUserSerializer(users, many=True)
        return Response(authUserSerializer.data)
    
    # Add An User Account
    elif request.method == 'POST':
        authUserSerializer = AuthUserSerializer(data=request.data)
        if authUserSerializer.is_valid():
            authUserSerializer.save()

            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()

            return Response({"Created": True}, status=status.HTTP_201_CREATED)
        
        return Response(authUserSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# Retrieve User Account Details, Edit User Account Details
@api_view(['GET', 'PUT'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def userAcc_details(request, username):
    # Get the user by username
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    # Get User Account details by username
    if request.method == 'GET':
        authUserSerializer = AuthUserSerializer(user)
        return Response(authUserSerializer.data)
        
    # Edit User Account details by username
    elif request.method == 'PUT':
        authUserSerializer = AuthUserSerializer(user, data=request.data)
        if authUserSerializer.is_valid():
            authUserSerializer.save()
            return Response({"Updated":True})
        return Response(authUserSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

# Rock Information
@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def rockInfo_list(request):
    
    # Retrieve all Rock Information
    if request.method == 'GET':
        rocks = RockInformation.objects.all()
        rockInfoSerializer = RockInfoSerializer(rocks, many=True)
        return Response(rockInfoSerializer.data)
    
    # Add an Rock Info
    elif request.method == 'POST':
        rockInfoSerializer = RockInfoSerializer(data=request.data)
        if rockInfoSerializer.is_valid():
            rockInfoSerializer.save()
            return Response({"Created": True}, status=status.HTTP_201_CREATED)
        return Response(rockInfoSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# Rock Information Details
@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def rockInfo_detail(request, rockname):

    # Get rock by rock_name
    try:
        rock = RockInformation.objects.get(pk=rockname)
    except RockInformation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Get details by rock_name
    if request.method == 'GET':
        rockInfoSerializer = RockInfoSerializer(rock)
        return Response(rockInfoSerializer.data)
    
    # Edit details by rock_name
    elif request.method == 'PUT':
        rockInfoSerializer = RockInfoSerializer(rock, data=request.data)
        if rockInfoSerializer.is_valid():
            rockInfoSerializer.save()
            return Response({"Updated":True})
        return Response(rockInfoSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        rock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# User Profile - still left edit profile using PUT
@api_view(['GET', 'PUT'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def getedit_Profile(request, username):
    # Get Profile by username
    try:
        profile = UserProfile.objects.get(pk=username)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Get details by username
    if request.method == 'GET':
        userProfileSerializer = UserProfileSerializer(profile)
        return Response(userProfileSerializer.data)
    

# Education Video
@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def get_videos(request, level):
    # Get Videos by level
    try:
        videos = EducationVideo.objects.filter(level=level)
    except EducationVideo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        educationVideoSerializer = EducationVideoSerializer(videos, many=True)
        return Response(educationVideoSerializer.data)
    
#Forum Topics
@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def get_topics(request):
    # Retrieve all Rock Information
    if request.method == 'GET':
        topics = ForumTopics.objects.all()
        forumTopicsSerializer = ForumTopicsSerializer(topics, many=True)
        return Response(forumTopicsSerializer.data)


# Forum Thread
@api_view(['POST'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def post_thread(request):
    if request.method == 'POST':
        forumThreadSerializer = ForumThreadSerializer(data=request.data)
        if forumThreadSerializer.is_valid():
            forumThreadSerializer.save()
            return Response({"Created": True}, status=status.HTTP_201_CREATED)
        return Response(forumThreadSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def get_thread(request, topic_id):
        # Get Videos by level
    try:
        threads = ForumThread.objects.filter(fid=topic_id)
    except ForumThread.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        forumThreadSerializer = GetForumThreadSerializer(threads, many=True)
        return Response(forumThreadSerializer.data)
    
@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def get_threadByThreadId(request, thread_id):
        # Get Videos by level
    try:
        threads = ForumThread.objects.get(thread_id=thread_id)
    except ForumThread.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        forumThreadSerializer = GetForumThreadSerializer(threads)
        return Response(forumThreadSerializer.data) 

#Forum Comment
@api_view(['POST'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def post_comment(request):
    if request.method == 'POST':
        forumCommentSerializer = ForumCommentSerializer(data=request.data)
        if forumCommentSerializer.is_valid():
            forumCommentSerializer.save()
            return Response({"Created": True}, status=status.HTTP_201_CREATED)
        return Response(forumCommentSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def get_comment(request, thread_id):
    try:
        comments = ForumComment.objects.filter(thread_id=thread_id)
    except ForumComment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        forumCommentSerializer = ForumCommentSerializer(comments, many=True)
        return Response(forumCommentSerializer.data) 
    
# Badge
@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def get_badge(request, username):
    try:
        badges = Badges.objects.filter(username=username)
    except Badges.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        badgeSerializer = BadgesSerializer(badges, many=True)
        return Response(badgeSerializer.data)           


# Quiz Result 
@api_view(['POST'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def post_quizResult(request):
    try:
        profile = UserProfile.objects.get(username=request.data['username'])
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        quizResultSerializer = QuizResultSerializer(data=request.data)   #check if quiz data is valid then save 
        if quizResultSerializer.is_valid():
            quizResultSerializer.save()

            # Full mark achieve by user
            if (request.data['quiz_mark'] == 8):
                badge_obtained = badge_dict[request.data['quiz_level']]
                date = datetime.today().strftime('%Y-%m-%d')
                data = {'username': request.data['username'], 'badge_id': badge_obtained, 'date_achieved': date}

                # Save into db
                badgeSerializer = BadgesSerializer(data=data)
                if badgeSerializer.is_valid():
                    badgeSerializer.save()

                    level_up = {}
                    insert_fail = False 
                    # Update user type based on quiz level done
                    if (request.data['quiz_level'] == "quiz2"):
                        
                        # Edit details of user profile
                        userProfileSerializer = UserProfileSerializer(profile, {'username': profile.username, 'level':profile.level, 'gender': profile.gender, 'dob': profile.dob,'usertype': "4"})
                        if userProfileSerializer.is_valid():
                            userProfileSerializer.save()
                            level_up['levelup_userprofile'] = 'success'
                        else:
                            level_up['levelup_userprofile'] = 'fail'
                            level_up['profileError'] = userProfileSerializer.errors
                            insert_Fail = True
                        
                        #badge_obtained = badge_dict[request.data['quiz_level']]
                        date = datetime.today().strftime('%Y-%m-%d')
                        data = {'username': request.data['username'], 'badge_id': badge_dict['rockenthusiast'], 'date_achieved': date} #level up to rock enthusiast at the same time
                        
                         # Save into db
                        badgeSerializer = BadgesSerializer(data=data)
                        if badgeSerializer.is_valid():
                            badgeSerializer.save()
                            level_up['levelup_userbadge'] = 'success'
                        else:
                            level_up['levelup_userbadge'] = 'fail'
                            level_up['badgeError'] = badgeSerializer.errors
                            insert_Fail = True

                        #return Response({"Updated":True})
                        #return Response(userProfileSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
                        if insert_fail == True: #if any insert query above fail, return level_up dict and 404
                            return Response(level_up, status=status.HTTP_400_BAD_REQUEST)
                        else: 
                            return Response(level_up, status = status.HTTP_201_CREATED) #if both insert query pass
                    
                    elif (request.data['quiz_level'] == "quiz4"):
                       # Edit details of user profile
                        userProfileSerializer = UserProfileSerializer(profile, {'username': profile.username, 'level':profile.level, 'gender': profile.gender, 'dob': profile.dob,'usertype': "5"})
                        if userProfileSerializer.is_valid():
                            userProfileSerializer.save()
                            level_up['levelup_userprofile'] = 'success'
                        else:
                            level_up['levelup_userprofile'] = 'fail'
                            level_up['profileError'] = userProfileSerializer.errors
                            insert_Fail = True
                        
                        #badge_obtained = badge_dict[request.data['quiz_level']]
                        date = datetime.today().strftime('%Y-%m-%d')
                        data = {'username': request.data['username'], 'badge_id': badge_dict['rockexpert'], 'date_achieved': date} #level up to rock expert at the same time
                        
                         # Save into db
                        badgeSerializer = BadgesSerializer(data=data)
                        if badgeSerializer.is_valid():
                            badgeSerializer.save()
                            level_up['levelup_userbadge'] = 'success'
                        else:
                            level_up['levelup_userbadge'] = 'fail'
                            level_up['badgeError'] = badgeSerializer.errors
                            insert_Fail = True

                        #return Response({"Updated":True})
                        #return Response(userProfileSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
                        if insert_fail == True: #if any insert query above fail, return level_up dict and 404
                            return Response(level_up, status=status.HTTP_400_BAD_REQUEST)
                        else: 
                            return Response(level_up, status = status.HTTP_201_CREATED) #if both insert query pass

        return Response(quizResultSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Get Result
@api_view(['GET'])
#@authentication_classes([SessionAuthentication, TokenAuthentication])
#@permission_classes([IsAuthenticated])
def get_quizResult(request, username):
    try:
        result = QuizResult.objects.filter(username=username)
    except QuizResult.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'GET':
        quizResultSerializer = QuizResultSerializer(result, many=True)
        return Response(quizResultSerializer.data) 


    

# Sample api that check the token from request

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed for {}.".format(request.user.username) )






# # CRUD Accounts ( TO BE REMOVED )

# @api_view(['GET', 'POST'])
# def account_list(request):

#     #Get all Accounts
#     if request.method == 'GET':
#         # get all account
#         accounts = Accounts.objects.all()
#         # serialize them
#         accSerializer = AccountSerializer(accounts, many=True)
#         # return json
#         return Response(accSerializer.data)
    
#     # Create an Account
#     elif request.method == 'POST':
#         # take the data send over
#         # deserialize it
#         # create a object out of it
#         accSerializer = AccountSerializer(data = request.data)  # data=request.data - data from the json that is send over
#         if accSerializer.is_valid():
#             accSerializer.save()
#             return Response("Created", status=status.HTTP_201_CREATED)
        
# @api_view(['GET', 'PUT', 'DELETE'])
# def account_detail(request, username):

#     try:
#         account = Accounts.objects.get(pk=username)
#     # if account does not exist
#     except Accounts.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     # Search by username
#     if request.method == 'GET':
#         accSerializer = AccountSerializer(account)
#         return Response(accSerializer.data)

#     # Edit account based on username
#     elif request.method == 'PUT':
#         accSerializer = AccountSerializer(account, data=request.data) 
#         if accSerializer.is_valid():
#             accSerializer.save()
#             return Response(accSerializer.data)
#         return Response(accSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Delete account
#     elif request.method == 'DELETE':
#         account.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    