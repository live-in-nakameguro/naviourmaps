# Generated by Django 3.1.7 on 2021-03-22 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='名前')),
                ('age', models.IntegerField(verbose_name='年齢')),
            ],
            options={
                'db_table': 'person',
            },
        ),
    ]
