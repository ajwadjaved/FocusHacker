# Generated by Django 4.1.7 on 2023-08-18 22:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('magic_links', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='magiclinktoken',
            name='created_at',
        ),
        migrations.AddField(
            model_name='magiclinktoken',
            name='email',
            field=models.EmailField(default=1, max_length=254),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='magiclinktoken',
            name='token',
            field=models.CharField(max_length=32, unique=True),
        ),
        migrations.AlterField(
            model_name='magiclinktoken',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
