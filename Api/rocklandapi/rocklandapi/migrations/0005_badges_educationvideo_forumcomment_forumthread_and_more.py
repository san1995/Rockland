# Generated by Django 5.0 on 2024-02-13 10:09

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('rocklandapi', '0004_rockinformation'),
    ]

    operations = [
        migrations.CreateModel(
            name='Badges',
            fields=[
                ('username', models.OneToOneField(db_column='username', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('badge_id', models.CharField(max_length=50)),
                ('badge_desc', models.CharField(blank=True, max_length=150, null=True)),
                ('date_achieved', models.DateTimeField()),
            ],
            options={
                'db_table': 'badges',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='EducationVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(blank=True, max_length=45, null=True)),
                ('topics', models.CharField(blank=True, max_length=45, null=True)),
                ('url', models.CharField(blank=True, max_length=45, null=True)),
                ('date_posted', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'education_video',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ForumComment',
            fields=[
                ('comment_id', models.IntegerField(primary_key=True, serialize=False)),
                ('thread_id', models.IntegerField(blank=True, null=True)),
                ('comments', models.CharField(blank=True, max_length=300, null=True)),
                ('date_comment', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'forum_comment',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ForumThread',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('thread_id', models.IntegerField()),
                ('title', models.CharField(blank=True, max_length=45, null=True)),
                ('description', models.CharField(blank=True, max_length=150, null=True)),
                ('fid', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'forum_thread',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ForumTopics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fid', models.IntegerField()),
                ('topic_name', models.CharField(blank=True, max_length=45, null=True)),
            ],
            options={
                'db_table': 'forum_topics',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField()),
                ('question_num', models.IntegerField()),
                ('question', models.CharField(max_length=120)),
                ('op1', models.CharField(blank=True, max_length=120, null=True)),
                ('op2', models.CharField(blank=True, max_length=120, null=True)),
                ('op3', models.CharField(blank=True, max_length=120, null=True)),
                ('op4', models.CharField(blank=True, max_length=120, null=True)),
            ],
            options={
                'db_table': 'quiz_question',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='QuizResult',
            fields=[
                ('username', models.CharField(max_length=150)),
                ('quiz_level', models.IntegerField()),
                ('quiz_mark', models.IntegerField()),
                ('datetime', models.DateTimeField()),
                ('id', models.IntegerField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'quiz_result',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RockMapData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rock_name', models.CharField(max_length=45)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('user', models.CharField(max_length=150)),
                ('date', models.DateTimeField()),
            ],
            options={
                'db_table': 'rock_map_data',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('username', models.OneToOneField(db_column='username', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('level', models.CharField(blank=True, max_length=45, null=True)),
                ('gender', models.CharField(blank=True, max_length=45, null=True)),
                ('dob', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'user_profile',
                'managed': False,
            },
        ),
    ]
