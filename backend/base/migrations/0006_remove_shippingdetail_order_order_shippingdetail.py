# Generated by Django 4.2.1 on 2023-06-05 19:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_shippingdetail_order'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shippingdetail',
            name='order',
        ),
        migrations.AddField(
            model_name='order',
            name='ShippingDetail',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.shippingdetail'),
        ),
    ]