module.exports = {
    'type': 'object',
    'title': 'Subscription Cancelled',
    'description': 'Identify this event with the HTTP POST parameter `alert_name` with a value of `subscription_cancelled`',
    'properties': {
        'alert_name': {
            'type': 'string',
            'default': 'subscription_cancelled'
        },
        'alert_id': {
            'type': 'string',
            'title': 'Alert ID',
            'description': 'The unique identifier for this Paddle webhook alert. Integer value sent as a string.',
            'pattern': '\\d+'
        },
        'cancellation_effective_date': {
            'type': 'string',
            'description': 'The date the cancellation should come into effect, taking the customer’s most recent payment into account. The customer should be able to use the service they\'ve subscribed to up until this date.',
            'format': 'date',
            'pattern': '^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])( (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9])?$'
        },
        'custom_data': {
            'type': 'string',
            'title': 'Currency',
            'description': 'A JSON encoded string of custom data that was passed into the checkout for this subscription.',
            'maxLength': 500
        },
        'checkout_id': {
            'type': 'string',
            'title': 'Checkout ID',
            'description': 'The checkout id of the order created.',
            'example': '27835673-chre93c81118fc7-b3092639c1'
        },
        'currency': {
            'type': 'string',
            'title': 'Currency',
            'description': 'The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).',
            'pattern': '[A-Z]{3}'
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
            'pattern': '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])( (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9])?'
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
        'passthrough': {
            'type': 'string',
            'title': 'Passthrough',
            'description': 'This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information.',
            'maxLength': 1000
        },
        'quantity': {
            'type': 'string',
            'title': 'Quantity',
            'description': 'The number of products or subscription seats sold in the transaction.',
            'pattern': '\\d+'
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
        'unit_price': {
            'type': 'string',
            'title': 'Unit Price',
            'description': 'The price per unit of the subscription.',
            'pattern': '(\\d+\\.\\d{1,2})'
        },
        'user_id': {
            'type': 'string',
            'title': 'User ID',
            'description': 'The customer user id.',
            'pattern': '\\d+'
        },
        'p_signature': {
            'type': 'string',
            'title': 'P Signature',
            'description': 'This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks).'
        }
    }
}