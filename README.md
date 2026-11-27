https://jailoo-boutique-yurts.vercel.app/

TODO

Webhook fails Remains pending; Stripe retries
Card declined Remains pending; customer can retry
Checkout cancelled Remains pending until the session expires
Checkout expires Booking marked expired
Payment succeeds Booking marked confirmed

CREATE OR REPLACE FUNCTION claim_stripe_event(
p_event_id TEXT,
p_event_type TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
claimed_id TEXT;
BEGIN
INSERT INTO stripe_webhook_events (
event_id,
event_type,
status,
claimed_at
)
VALUES (
p_event_id,
p_event_type,
'processing',
NOW()
)
ON CONFLICT (event_id)
DO UPDATE SET
status = 'processing',
claimed_at = NOW(),
processed_at = NULL
WHERE
stripe_webhook_events.status = 'failed'
OR (
stripe_webhook_events.status = 'processing'
AND stripe_webhook_events.claimed_at < NOW() - INTERVAL '5 minutes'
)
RETURNING event_id INTO claimed_id;

RETURN claimed_id IS NOT NULL;
END;

$$
;

CONNECT:
for local listener : stripe listen --events checkout.session.completed --forward-to localhost:3000/api/webhook/stripe

1. include breakfast select
2. include payment status in reservation card
$$
