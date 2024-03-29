# Generated by Django 5.0 on 2023-12-11 02:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('rocklandapi', '0002_delete_account'),
    ]

    operations = [
        migrations.CreateModel(
            name='Accounts',
            fields=[
                ('username', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=20)),
                ('usertype', models.CharField(db_column='userType', max_length=20)),
                ('status', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'Accounts',
                'managed': False,
            },
        ),
    ]
