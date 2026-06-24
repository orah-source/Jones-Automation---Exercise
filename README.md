# Jones Automation - Exercise Solutions

## How to Run the Code
1. Run: `npm install`
2. Run: `npx playwright install`
3. Run the tests: `npx playwright test`

---

## Part 2: Answers to the UI Questions

### a. Problems with the screen:
* **Security:** There is no **CVV** field (the 3 digits on the back of the card). Without it, the payment cannot be secure. Also, there is no icon showing the page is encrypted.
* **Usability:** The placeholders say "(No dashes or spaces)". A good system should clean spaces automatically and not count on the user to do it. Also, there are two address lines without clear labels.
* **Localization:** For a global company, fields like "State" and "Postal Code" are only for the US/Canada. Many countries don't have states.
* **Button Layout & Usability:** The `Continue` button is placed to the left of the `Cancel` button. In standard English UI practices, the primary action button (Continue) should be on the right side to align with the natural left-to-right reading flow.
* **Form Layout & Labels:** There are two address lines without clear sub-labels (like Suite/Apt). Also, the "MI" (Middle Initial) field is crammed awkwardly between First and Last nam

### b. Sample Test Cases:
1. **Happy Path:** Fill all fields with valid data, click Continue -> Check that the payment of 30.00 succeeds.
2. **Missing Fields:** Leave "Card Number" empty, click Continue -> Check that a red error message appears.
3. **Card Masking:** Type a credit card -> Check that the numbers change to asterisks (***) so no one can peek.

### c. Product Solution:
Instead of building this form ourselves, the company should use an **iframe widget from a real payment company like Stripe**. It will automatically have a CVV field, detect the card type automatically, and handle all the security for us.