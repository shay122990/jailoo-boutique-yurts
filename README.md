TODO

Webhook fails Remains pending; Stripe retries
Card declined Remains pending; customer can retry
Checkout cancelled Remains pending until the session expires
Checkout expires Booking marked expired
Payment succeeds Booking marked confirmed

CONNECT:
for local listener : stripe listen --events checkout.session.completed --forward-to localhost:3000/api/webhook/stripe
