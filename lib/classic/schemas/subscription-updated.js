module.exports = {
    'type': 'object',
    'title': 'Subscription Updated',
    'description': 'Identify this event with the HTTP POST parameter `alert_name` with a value of `subscription_updated`',
    'properties': {
        'alert_name': {
            'default': 'subscription_updated',
            'type': 'string'
        },
        'alert_id': {
            'type': 'string',
            'title': 'Alert ID',
            'description': 'The unique identifier for this Paddle webhook alert. Integer value sent as a string.',
            'pattern': '\\d+'
        },
        'cancel_url': {
            'type': 'string',
            'title': 'Cancel URL',
            'description': 'A URL of the \'Cancel Subscription\' page. [See this documentation](/guides/how-tos/subscriptions/cancel-and-pause#cancel-subscription-url) on cancelation URLs. You should store this URL along with the subscribed customer in your database.',
            'format': 'uri',
            'maxLength': 200
        },
        'checkout_id': {
            'type': 'string',
            'title': 'Checkout ID',
            'description': 'The checkout id of the order created.',
            'example': '27835673-chre93c81118fc7-b3092639c1'
        },
        'custom_data': {
            'type': 'string',
            'title': 'Currency',
            'description': 'A JSON encoded string of custom data that was passed into the checkout for this subscription.',
            'maxLength': 500
        },
        'email': {
            'type': 'string',
            'title': 'Email',
            'description': 'The email address of the customer.',
            'format': 'email'
        },
        'event_time': {
            'type': 'string',
            'title': 'Event Time',
            'description': 'The date and time the event was triggered in UTC (Coordinated Universal Time).',
            'format': 'date-time',
            'pattern': '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]'
        },
        'marketing_consent': {
            'type': 'integer',
            'title': 'Marketing Consent',
            'description': 'The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.',
            'enum': [
                0,
                1
            ]
        },
        'new_price': {
            'type': 'string',
            'description': 'The new total recurring price of the subscription. Please note that this will only be returned if the subscription has quantity enabled. Decimal sent as a string.',
            'pattern': '(\\d+\\.\\d{1,3})'
        },
        'new_quantity': {
            'type': 'string',
            'description': 'The new quantity applied to a quantity enabled subscription. Please note that this will only be returned if the subscription has quantity enabled.',
            'pattern': '\\d+'
        },
        'new_unit_price': {
            'type': 'string',
            'description': 'The new price per unit of the subscription. Please note that this will only be returned if the subscription has quantity enabled. Decimal sent as a string.',
            'pattern': '(\\d+\\.\\d{1,2})'
        },
        'next_bill_date': {
            'type': 'string',
            'title': 'Next Bill Date',
            'description': 'The date the next payment is due on this subscription.',
            'format': 'date',
            'pattern': '^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])( (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9])?$'
        },
        'old_price': {
            'type': 'string',
            'description': 'The previous total recurring price of the subscription. Decimal sent as a string.',
            'pattern': '(\\d+\\.\\d{1,3})'
        },
        'old_quantity': {
            'type': 'string',
            'description': 'The previous quantity applied to the subscription. Please note that this will only be returned if the subscription has quantity enabled.',
            'pattern': '\\d+'
        },
        'old_unit_price': {
            'type': 'string',
            'description': 'The previous price per unit of the subscription. Please note that this will only be returned if the subscription has quantity enabled. Decimal sent as a string.',
            'pattern': '(\\d+\\.\\d{1,2})'
        },
        'currency': {
            'type': 'string',
            'title': 'Currency',
            'description': 'The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).',
            'pattern': '[A-Z]{3}'
        },
        'passthrough': {
            'type': 'string',
            'title': 'Passthrough',
            'description': 'This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information.',
            'maxLength': 1000
        },
        'status': {
            'type': 'string',
            'title': 'Status',
            'description': 'This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses).',
            'enum': [
                'active',
                'trialing',
                'past_due',
                'paused',
                'deleted'
            ]
        },
        'subscription_id': {
            'type': 'string',
            'title': 'Subscription ID',
            'description': 'This is the unique Subscription ID for this customer’s subscription. You should store this with the customer in your database, as it is needed for making API calls.',
            'pattern': '\\d+'
        },
        'subscription_plan_id': {
            'type': 'string',
            'title': 'Subscription Plan ID',
            'description': 'The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).',
            'pattern': '\\d+'
        },
        'user_id': {
            'type': 'string',
            'title': 'User ID',
            'description': 'The customer user id.',
            'pattern': '\\d+'
        },
        'update_url': {
            'type': 'string',
            'title': 'Update URL',
            'description': 'A URL of the ‘Update Payment Details’ page. [See this documentation](/guides/how-tos/subscriptions/update-payment-details#update-payment-details-url) on update URLs. You should store this URL along with the subscribed customer in your database.',
            'format': 'uri',
            'maxLength': 200
        },
        'old_next_bill_date': {
            'type': 'string',
            'description': 'The next bill date before the subscription was updated.',
            'format': 'date',
            'pattern': '^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])( (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9])?$'
        },
        'old_status': {
            'type': 'string',
            'description': 'The subscription status before the subscription was updated. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses).',
            'enum': [
                'active',
                'trialing',
                'past_due',
                'paused',
                'deleted'
            ]
        },
        'old_subscription_plan_id': {
            'type': 'string',
            'description': 'The ID of the subscription plan before the subscription was updated.',
            'pattern': '\\d+'
        },
        'paused_at': {
            'type': 'string',
            'description': 'The date and time when the subscription was requested to be paused. The subscription will be paused on the `paused_from` date.',
            'format': 'date-time',
            'pattern': '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]'
        },
        'paused_from': {
            'type': 'string',
            'description': 'The date when the subscription payment is paused. The customer should be able to use the service they’ve subscribed to up until this date.',
            'format': 'date-time',
            'pattern': '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]'
        },
        'paused_reason': {
            'type': 'string',
            'description': 'The reason why the subscription was paused. For example, `delinquent` if the payment failed and the rule specified in the [recover settings](https://vendors.paddle.com/recover-settings) was to pause the subscription.',
            'enum': [
                'delinquent',
                'voluntary'
            ]
        },
        'p_signature': {
            'type': 'string',
            'title': 'P Signature',
            'description': 'This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks).'
        }
    }
}