# Generated by Django 4.2 on 2023-05-10 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_bio_user_interests_alter_user_username'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='Username',
            field=models.CharField(default='random647922', max_length=255, unique=True),
        ),
        migrations.RemoveField(
            model_name='user',
            name='interests',
        ),
        migrations.AddField(
            model_name='user',
            name='interests',
            field=models.ManyToManyField(to='users.interest'),
        ),
    ]
