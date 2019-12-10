const category = "Per Diem/Stipend (pre-approved)";

const FD = (...offsets) => ({
    multiplier: 1,
    label: "Full Day",
    offsets: offsets
});

const BreakfastPaid = () => ({
    multiplier: -0.2,
    label: "Breakfast paid"
});

const currencyFormat = (value, currency) => (
    new Intl.NumberFormat('en-GB', {style: 'currency', currency: currency})
        .format(value)
);

// Increase date by no. of days, with correct timezone
const datePlusDays = (d, offset) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset, d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());

const dateToS = d => d.toISOString().replace(/T.*/, '');

const perDiemToExpensify = (perDiem, date, account) => ({
    merchant: `${Math.sign(perDiem.multiplier)} * ${account.label} ${perDiem.label} @ ${currencyFormat(Math.sign(perDiem.multiplier) * perDiem.multiplier * account.fullDayInCents / 100, account.currency)}`,
    created: dateToS(date),
    amount: perDiem.multiplier * account.fullDayInCents,
    currency: account.currency,
    comment: account.comment,
    category: category,
    tag: account.tag
});

const Account = (label, fullDayInCents, currency, comment, tag) => ({label, fullDayInCents, currency, comment, tag});

const Travel = (account, startDate, ...perDiems) => {
    const date = new Date(Date.parse(startDate));

    return perDiems.flatMap((perDiem, idx) => [
        perDiemToExpensify(perDiem, datePlusDays(date, idx), account),
        ...perDiem.offsets.map(offsetPerDiem => perDiemToExpensify(offsetPerDiem, datePlusDays(date, idx), account))
    ]);
};


const CreateExpenses = expenses => (
    {
        type: "create",
        credentials: {
            partnerUserID: process.env["EXPENSIFY_PARTNER_USER_ID"],
            partnerUserSecret: process.env["EXPENSIFY_PARTNER_USER_SECRET"]
        },
        inputSettings: {
            type: "expenses",
            employeeEmail: process.env["EXPENSIFY_EMPLOYEE_EMAIL"],
            transactionList: expenses
        }
    }
);

const print = o => console.log(JSON.stringify(o));

print(
    CreateExpenses(
        Travel(
            Account("Madrid", 4000, "EUR", "ThoughtWorks Madrid, Travel from 14.10. to 20.10.2019", "Some Project Code:Travel"),
            '2019-10-14',
            FD(BreakfastPaid()), // Day 1
            FD(BreakfastPaid()), // Day 2
            FD(BreakfastPaid()), // Day 3
            FD(BreakfastPaid()), // Day 4
            FD(BreakfastPaid()), // Day 5
            FD(), // Day 6
            FD(), // Day 7
        )
    )
);
