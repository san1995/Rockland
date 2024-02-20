# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth import get_user_model

AuthUser = get_user_model()


class Accounts(models.Model):
    username = models.CharField(primary_key=True, max_length=20)
    password = models.CharField(max_length=20)
    usertype = models.CharField(db_column='userType', max_length=20)  # Field name made lowercase.
    status = models.CharField(max_length=10)

    def __str__(self):
        return self.username + ' account details' 

    class Meta:
        managed = False
        db_table = 'Accounts'


class RockInformation(models.Model):
    rock_name = models.CharField(primary_key=True, max_length=50)
    type = models.CharField(max_length=30)
    colour = models.CharField(max_length=20)
    hardness = models.IntegerField()
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.rock_name + ' details'
    
    class Meta:
        managed = False
        db_table = 'rock_information'

class Badges(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50)
    badge_id = models.CharField(max_length=50)
    badge_desc = models.CharField(max_length=150, blank=True, null=True)
    date_achieved = models.DateField()

    class Meta:
        managed = False
        db_table = 'badges'


class EducationVideo(models.Model):
    level = models.CharField(max_length=45, blank=True, null=True)
    topics = models.CharField(max_length=45, blank=True, null=True)
    url = models.CharField(max_length=45, blank=True, null=True)
    date_posted = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'education_video'


class ForumComment(models.Model):
    comment_id = models.IntegerField(primary_key=True)
    thread_id = models.IntegerField(blank=True, null=True)
    comments = models.CharField(max_length=300, blank=True, null=True)
    username = models.ForeignKey(AuthUser, models.DO_NOTHING, db_column='username', to_field='username', blank=True, null=True)
    date_comment = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'forum_comment'


class ForumThread(models.Model):
    thread_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=45, blank=True, null=True)
    description = models.CharField(max_length=150, blank=True, null=True)
    fid = models.IntegerField(blank=True, null=True)
    username = models.ForeignKey(AuthUser, models.DO_NOTHING, db_column='username', to_field='username', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'forum_thread'


class ForumTopics(models.Model):
    fid = models.IntegerField(primary_key=True)
    topic_name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'forum_topics'


class QuizQuestion(models.Model):
    level = models.IntegerField()
    question_num = models.IntegerField()
    question = models.CharField(max_length=120)
    op1 = models.CharField(max_length=120, blank=True, null=True)
    op2 = models.CharField(max_length=120, blank=True, null=True)
    op3 = models.CharField(max_length=120, blank=True, null=True)
    op4 = models.CharField(max_length=120, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'quiz_question'


class QuizResult(models.Model):
    username = models.CharField(max_length=150)
    quiz_level = models.CharField(max_length=30)
    quiz_mark = models.IntegerField()
    datetime = models.DateTimeField()
    id = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'quiz_result'


class RockMapData(models.Model):
    rock_name = models.CharField(max_length=45)
    latitude = models.FloatField()
    longitude = models.FloatField()
    user = models.CharField(max_length=150)
    date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'rock_map_data'


class UserProfile(models.Model):
    username = models.CharField(primary_key = True, max_length=45)
    level = models.CharField(max_length=45, blank=True, null=True)
    gender = models.CharField(max_length=45, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    usertype = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_profile'

