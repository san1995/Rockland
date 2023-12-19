# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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