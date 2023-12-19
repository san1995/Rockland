# Generated by Django 5.0 on 2023-12-17 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rocklandapi', '0003_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RockInformation',
            fields=[
                ('rock_name', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=30)),
                ('colour', models.CharField(max_length=20)),
                ('hardness', models.IntegerField()),
                ('description', models.CharField(max_length=500)),
            ],
            options={
                'db_table': 'rock_information',
                'managed': False,
            },
        ),
    ]