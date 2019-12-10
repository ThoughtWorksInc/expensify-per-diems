Simple script to upload Per Diems into Expensify

## Howto

Register once with Expensify to receive credentials: https://integrations.expensify.com/Integration-Server/doc/getting_started.html

Edit your travel plan inside `index.js` and run the following to inspect the payload:

    export EXPENSIFY_PARTNER_USER_ID=aa_your_user_id_thoughtworks_com
    export EXPENSIFY_PARTNER_USER_SECRET=<YOUR SECRET>
    export EXPENSIFY_EMPLOYEE_EMAIL=<YOUR EMAIL>
    node index.js

If this looks fine you are ready to upload it:

    curl -d "requestJobDescription=$(node index.js)" 'https://integrations.expensify.com/Integration-Server/ExpensifyIntegrations'
