Simple script to upload Per Diems into Expensify

## Goal

1) Making it simple to upload repetitive Per Diems into Expensify.
2) Follow format as requested by Finance.
3) Opinionated DSL favouring simplicity over beauty.

## Howto

Register once with Expensify to receive credentials: https://integrations.expensify.com/Integration-Server/doc/getting_started.html

Edit your travel plan inside `index.js` and run the following to inspect the payload:

    export EXPENSIFY_PARTNER_USER_ID=aa_your_user_id_thoughtworks_com
    export EXPENSIFY_PARTNER_USER_SECRET=<YOUR SECRET>
    export EXPENSIFY_EMPLOYEE_EMAIL=<YOUR EMAIL>
    node index.js

If this looks fine you are ready to upload it:

    curl -d "requestJobDescription=$(node index.js)" 'https://integrations.expensify.com/Integration-Server/ExpensifyIntegrations'

Following a successful request Expensify reports back the uploaded entries as JSON. In an error it returns a meaningful error message.
