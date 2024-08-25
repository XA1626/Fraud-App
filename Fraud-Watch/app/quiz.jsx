import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const categories = [
  'Payroll fraud', 'Tax Evasion', 'Phishing', 'Mortgage fraud', 'Card fraud',
  'Identity theft', 'Advance fee fraud', 'Check fraud', 'Remote desktop software',
  'Accounting fraud', 'Charity scams', 'Bank fraud', 'Insurance fraud',
  'Blackmail scams', 'Payment fraud', 'Account takeover', 'Ponzi schemes',
  'Asset misappropriation', 'Bribery', 'CNP fraud', 'Employment scams',
  'Grandparent scams', 'Investment fraud', 'IP infringement'
];

// You will need to organize your questions by category
const questionsByCategory = {
  'Payroll fraud': [
    {
      type: 'True/False',
      question: 'Payroll fraud only occurs in large corporations with complex payroll systems.',
      options: ['True', 'False'],
      answer: 'False'
    },
    {
      type: 'True/False',
      question: 'Ghost employees are a type of payroll fraud where salaries are paid to non-existent workers.',
      options: ['True', 'False'],
      answer: 'True'
    },
    {
      type: 'True/False',
      question: 'It is considered payroll fraud to round up working hours slightly.',
      options: ['True', 'False'],
      answer: 'True'
    },
    {
      type: 'True/False',
      question: 'Small businesses are less likely to experience payroll fraud compared to larger companies.',
      options: ['True', 'False'],
      answer: 'False'
    },
    {
      type: 'True/False',
      question: 'Implementing automated payroll systems can completely eliminate the risk of payroll fraud.',
      options: ['True', 'False'],
      answer: 'False'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Misclassifying employees as _______ can lead to reduced payroll tax liabilities fraudulently.',
      options: ['independent contractors', 'full-time workers', 'interns'],
      answer: 'independent contractors'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Creating fictitious _______ in payroll records is a direct method of committing payroll fraud.',
      options: ['time sheets', 'job titles', 'employee files'],
      answer: 'time sheets'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Unauthorized _______ to payroll software can facilitate fraudulent activities.',
      options: ['access', 'updates', 'deletions'],
      answer: 'access'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Payroll fraud often involves the inflation of _______ to siphon extra funds.',
      options: ['wages', 'bonuses', 'benefits'],
      answer: 'wages'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Regular _______ of payroll accounts can help detect and prevent fraud.',
      options: ['audits', 'closures', 'conversions'],
      answer: 'audits'
    },
    {
      type: 'Multiple Choice',
      question: 'Which action is a red flag for payroll fraud?',
      options: ['Accurate recording of hours worked', 'Frequent changes to payroll records', 'Yearly salary reviews', 'Consistent use of direct deposit'],
      answer: 'Frequent changes to payroll records'
    },
    {
      type: 'Multiple Choice',
      question: 'What is the most effective way to prevent payroll fraud?',
      options: ['Reduce the number of payroll audits', 'Centralize control of payroll processing', 'Segregate duties within the payroll department', 'Increase manual record keeping'],
      answer: 'Segregate duties within the payroll department'
    },
    {
      type: 'Multiple Choice',
      question: 'What can help detect payroll fraud early?',
      options: ['Ignoring minor payroll discrepancies', 'Decreasing transparency in payroll reporting', 'Implementing strict verification processes for payroll changes', 'Allowing unrestricted access to payroll software'],
      answer: 'Implementing strict verification processes for payroll changes'
    },
    {
      type: 'Multiple Choice',
      question: 'Who should regularly review payroll reports to detect potential fraud?',
      options: ['Only the payroll clerk', 'Only the CEO', 'A third-party auditor', 'The internal audit team'],
      answer: 'The internal audit team'
    },
    {
      type: 'Multiple Choice',
      question: 'Which technology can help reduce payroll fraud?',
      options: ['Paper-based record keeping', 'Biometric time clocks', 'Unsecured payroll apps', 'Manual timesheets'],
      answer: 'Biometric time clocks'
    },
    // Additional questions can follow this format
    
  ],
  // Add other categories similarly
  'Tax Evasion': [
    {
      type: 'True/False',
      question: 'Tax evasion is the illegal non-payment or underpayment of tax obligations.',
      options: ['True', 'False'],
      answer: 'True'
    },
    {
      type: 'True/False',
      question: 'Only individuals can commit tax evasion; corporations cannot.',
      options: ['True', 'False'],
      answer: 'False'
    },
    {
      type: 'True/False',
      question: 'Reporting less income than you actually earn is a form of tax evasion.',
      options: ['True', 'False'],
      answer: 'True'
    },
    {
      type: 'True/False',
      question: 'Using legal tax loopholes to minimize tax liability is considered tax evasion.',
      options: ['True', 'False'],
      answer: 'False'
    },
    {
      type: 'True/False',
      question: 'All offshore banking activities are considered tax evasion.',
      options: ['True', 'False'],
      answer: 'False'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Intentionally failing to report _______ is a common method of tax evasion.',
      options: ['income', 'expenses', 'bonuses'],
      answer: 'income'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Claiming false deductions to lower your taxable income is _______.',
      options: ['legal', 'illegal', 'discouraged'],
      answer: 'illegal'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Tax evasion often involves the misuse of _______ to hide assets.',
      options: ['charities', 'shell companies', 'investments'],
      answer: 'shell companies'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Hiding or not declaring cash payments can be classified as _______.',
      options: ['tax planning', 'tax avoidance', 'tax evasion'],
      answer: 'tax evasion'
    },
    {
      type: 'Fill-in-the-Blank',
      question: 'Using _______ documents to verify false deductions is a serious form of tax evasion.',
      options: ['forged', 'legal', 'unrelated'],
      answer: 'forged'
    },
    {
      type: 'Multiple Choice',
      question: 'Which of the following is not considered tax evasion?',
      options: ['Not reporting tips', 'Deducting personal expenses as business expenses', 'Investing in a legal tax deferment plan', 'Underreporting income'],
      answer: 'Investing in a legal tax deferment plan'
    },
    {
      type: 'Multiple Choice',
      question: 'What is a consequence of committing tax evasion?',
      options: ['Receiving a tax refund', 'Legal penalties including fines and possible jail time', 'Getting an audit waiver', 'Earning interest on unpaid taxes'],
      answer: 'Legal penalties including fines and possible jail time'
    },
    {
      type: 'Multiple Choice',
      question: 'Which practice can help prevent tax evasion in a business setting?',
      options: ['Avoiding external audits', 'Not reporting cash transactions', 'Keeping incomplete financial records', 'Implementing strong internal controls'],
      answer: 'Implementing strong internal controls'
    },
    {
      type: 'Multiple Choice',
      question: 'Who can be held responsible for corporate tax evasion?',
      options: ['Only the CEO', 'Only the accountant', 'Only external auditors', 'Any individuals involved in falsifying records'],
      answer: 'Any individuals involved in falsifying records'
    },
    {
      type: 'Multiple Choice',
      question: 'How might the IRS detect potential tax evasion?',
      options: ['Routine data analysis', 'Randomly picking taxpayers', 'Ignoring all foreign accounts', 'Only investigating large corporations'],
      answer: 'Routine data analysis'
    },
    // Continue adding multiple choice questions as per the pattern above
     
    
    ],
    // Define other categories similarly
    'Phishing': [
      {
        type: 'True/False',
        question: 'Phishing always involves stealing your password.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Phishing can occur through SMS messages.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'A secure website with HTTPS cannot be used for phishing attacks.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Emails from legitimate companies never ask for personal information.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'All phishing attacks are easily detectable by their poor grammar.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Phishing often uses ________ to trick victims into providing sensitive information.',
        options: ['emotions', 'logic', 'threats'],
        answer: 'emotions'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A common phishing technique is to fake the ________ of a well-known company.',
        options: ['logo', 'address', 'website'],
        answer: 'website'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '________ links in emails may lead to malicious websites.',
        options: ['Embedded', 'Direct', 'Secure'],
        answer: 'Embedded'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Verifying the ________ of an email sender is crucial to avoid phishing.',
        options: ['identity', 'grammar', 'intent'],
        answer: 'identity'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Always check the URL to make sure it is ________ to the expected website.',
        options: ['identical', 'similar', 'related'],
        answer: 'identical'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common indicator of a phishing email?',
        options: ['A personalized greeting', 'Correct spelling', 'Urgent or threatening language', 'A detailed signature'],
        answer: 'Urgent or threatening language'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action should you take if you receive a suspicious email?',
        options: ['Open all attachments', 'Click every link', 'Reply with personal information', 'None of the above'],
        answer: 'None of the above'
      },
      {
        type: 'Multiple Choice',
        question: 'How can you verify a suspicious link?',
        options: ['Click it to see where it leads', 'Send it to a friend', 'Hover over it to see the URL destination', 'Guess its safety'],
        answer: 'Hover over it to see the URL destination'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of these is NOT a safe practice when dealing with emails?',
        options: ['Using antivirus software', 'Updating your software regularly', 'Sharing your password', 'Ignoring unsolicited requests'],
        answer: 'Sharing your password'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do with emails from unknown senders asking for personal information?',
        options: ['Follow all instructions', 'Download attachments for more details', 'Respond with personal information', 'Report as phishing'],
        answer: 'Report as phishing'
      },
      // Continue adding multiple choice questions as per the pattern above
      
    ],
    'Mortgage fraud': [
      {
        type: 'True/False',
        question: 'Mortgage fraud is only committed by buyers, not sellers or agents.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Providing false income information on a mortgage application is considered fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'It is legal to use a friends bank statement on your mortgage application if you repay the loan on time.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Mortgage fraud can lead to severe penalties including imprisonment.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Using a genuine employment document in a mortgage application ensures the legality of the process.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Misrepresenting your _______ on a mortgage application is a common form of fraud.',
        options: ['income', 'identity', 'address'],
        answer: 'income'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Omitting liabilities from your loan application is considered _______.',
        options: ['negligence', 'fraud', 'oversight'],
        answer: 'fraud'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '________ signatures on mortgage documents can lead to fraud charges.',
        options: ['Forging', 'Witnessing', 'Collecting'],
        answer: 'Forging'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Inflating property values in an appraisal report is a type of _______ fraud.',
        options: ['valuation', 'investment', 'equity'],
        answer: 'valuation'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Mortgage fraud often involves creating fake _______ to support fraudulent claims.',
        options: ['documents', 'identities', 'properties'],
        answer: 'documents'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action can be considered mortgage fraud?',
        options: ['Reporting actual income', 'Listing actual debts', 'Applying for multiple loans without disclosure', 'Refinancing with accurate credit score'],
        answer: 'Applying for multiple loans without disclosure'
      },
      {
        type: 'Multiple Choice',
        question: 'What is the primary goal of most mortgage fraud schemes?',
        options: ['To obtain housing', 'To secure lower interest rates', 'To extract money from real estate transactions', 'To improve credit scores'],
        answer: 'To extract money from real estate transactions'
      },
      {
        type: 'Multiple Choice',
        question: 'Who might be involved in committing mortgage fraud?',
        options: ['Only independent buyers', 'Real estate agents alone', 'A coalition of buyers, agents, and appraisers', 'Banks exclusively'],
        answer: 'A coalition of buyers, agents, and appraisers'
      },
      {
        type: 'Multiple Choice',
        question: 'Which document is commonly manipulated in mortgage fraud?',
        options: ['Warranty deed', 'Title insurance', 'Loan application', 'Home inspection report'],
        answer: 'Loan application'
      },
      {
        type: 'Multiple Choice',
        question: 'How can potential mortgage fraud be detected?',
        options: ['Ignoring financial details', 'Conducting background checks', 'Avoiding credit reports', 'Not verifying employment'],
        answer: 'Conducting background checks'
      },
      // Add more multiple choice questions following the pattern above
      
    ],
    'Card fraud': [
      {
        type: 'True/False',
        question: 'A chip card is completely immune to card fraud.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Card information can be stolen even without the physical card being lost.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'All card frauds are the result of hacking.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Merchants must always comply with PCI DSS standards to prevent card fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Cardholders are always liable for unauthorized transactions on their cards.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Using public _______ networks to make online card transactions can increase the risk of card fraud.',
        options: ['Wi-Fi', 'Ethernet', 'Satellite'],
        answer: 'Wi-Fi'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Card skimming is a fraudulent practice that involves copying the _______ data from the card.',
        options: ['magnetic strip', 'chip', 'photo'],
        answer: 'magnetic strip'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_________ alerts from your bank can help you detect unauthorized transactions quickly.',
        options: ['SMS', 'Email', 'All'],
        answer: 'All'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Entering your PIN backwards at an ATM will alert the _______ in case of an emergency.',
        options: ['police', 'bank', 'security'],
        answer: 'police'  // Note: This is a common myth and is not true.
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'To prevent card fraud, always _______ your card statements for any unauthorized transactions.',
        options: ['check', 'ignore', 'discard'],
        answer: 'check'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common method used in card fraud?',
        options: ['Account takeover', 'Direct debit', 'Salary crediting', 'Subscription renewal'],
        answer: 'Account takeover'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do if you suspect your card has been compromised?',
        options: ['Continue using the card', 'Notify your bank immediately', 'Only use cash', 'Wait for the bank to contact you'],
        answer: 'Notify your bank immediately'
      },
      {
        type: 'Multiple Choice',
        question: 'Which feature on credit cards can add an extra layer of security against fraud?',
        options: ['Magnetic strip', 'Signature panel', 'CVV number', 'Cardholder name'],
        answer: 'CVV number'
      },
      {
        type: 'Multiple Choice',
        question: 'How can one minimize the risk of card fraud while shopping online?',
        options: ['Using public computers', 'Saving card details on websites', 'Using secure payment gateways', 'Sharing card details via email'],
        answer: 'Using secure payment gateways'
      },
      {
        type: 'Multiple Choice',
        question: 'What is NOT a feature of secure online payment?',
        options: ['Two-factor authentication', 'Unencrypted data transmission', 'Secure Socket Layer (SSL) certificates', 'Private browsing modes'],
        answer: 'Unencrypted data transmission'
      },
      // Continue adding more questions as needed
      
    ],
    'Identity theft': [
      {
        type: 'True/False',
        question: 'Identity theft only occurs if your financial information is stolen.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'You should regularly review your credit report to help spot signs of identity theft.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Shredding documents with personal information can help prevent identity theft.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Using public Wi-Fi to make online purchases is safe and does not increase the risk of identity theft.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Children are not at risk of identity theft.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Using strong, unique _______ for online accounts can help protect against identity theft.',
        options: ['passwords', 'usernames', 'hints'],
        answer: 'passwords'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Identity thieves often use _______ engineering to gather personal information.',
        options: ['social', 'mechanical', 'electrical'],
        answer: 'social'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Freezing your _______ can prevent unauthorized access and new account openings in your name.',
        options: ['credit', 'bank account', 'email'],
        answer: 'credit'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Phishing emails pretending to be from legitimate sources can lead to _______.',
        options: ['subscriptions', 'identity theft', 'promotions'],
        answer: 'identity theft'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'It is important to secure your personal documents in a locked _______ to prevent theft.',
        options: ['drawer', 'safe', 'folder'],
        answer: 'safe'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action should you take if you suspect your identity has been stolen?',
        options: ['Ignore the signs hoping it resolves itself', 'Notify relevant financial institutions and agencies', 'Only tell close friends and family', 'Delete all online accounts'],
        answer: 'Notify relevant financial institutions and agencies'
      },
      {
        type: 'Multiple Choice',
        question: 'What is NOT a common indicator of identity theft?',
        options: ['Unexpected bills', 'Accurate credit reports', 'Unauthorized transactions on your statements', 'Missing mail'],
        answer: 'Accurate credit reports'
      },
      {
        type: 'Multiple Choice',
        question: 'Which document is most commonly targeted by identity thieves?',
        options: ['Shopping receipts', 'Expired IDs', 'Social Security card', 'Library card'],
        answer: 'Social Security card'
      },
      {
        type: 'Multiple Choice',
        question: 'Which technology can help in protecting against identity theft?',
        options: ['Public Wi-Fi networks', 'Two-factor authentication', 'Simple password systems', 'Paper-based record keeping'],
        answer: 'Two-factor authentication'
      },
      {
        type: 'Multiple Choice',
        question: 'How can you minimize the risk of identity theft while traveling?',
        options: ['Carry all personal documents with you', 'Share your travel plans on social media', 'Use secure connections for financial transactions', 'Store sensitive information in hotel safes'],
        answer: 'Use secure connections for financial transactions'
      },
      // Additional questions can follow this format
      
    ],
    'Advance fee fraud': [
      {
        type: 'True/False',
        question: 'Advance fee fraud involves requesting upfront payment for goods or services that are never delivered.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Paying an advance fee is a common and safe practice in legitimate business transactions.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Advance fee fraud often involves promises of large sums of money or prizes.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Legitimate businesses will rarely request large sums of money upfront before delivering any goods or services.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Advance fee fraud can only occur in international transactions.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'In advance fee fraud, the scammer usually promises _______ in exchange for the upfront payment.',
        options: ['a loan', 'a refund', 'a prize', 'a contract'],
        answer: 'a prize'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Advance fee fraud often involves fake _______ or fake business entities.',
        options: ['jobs', 'emails', 'companies', 'advertisements'],
        answer: 'companies'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'One common tactic of advance fee fraud is to create a _______ of urgency to get the victim to pay quickly.',
        options: ['sense', 'discount', 'delay', 'promise'],
        answer: 'sense'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Scammers might use _______ methods such as fake websites to convince victims to pay upfront.',
        options: ['official', 'legal', 'deceptive', 'authentic'],
        answer: 'deceptive'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A typical red flag for advance fee fraud is a request for payment via _______ methods that are hard to trace.',
        options: ['credit card', 'bank transfer', 'wire transfer', 'cash'],
        answer: 'wire transfer'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common characteristic of advance fee fraud?',
        options: ['A guaranteed high return on investment', 'A free trial of a product', 'Immediate delivery of goods', 'Discounted prices for early payment'],
        answer: 'A guaranteed high return on investment'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a sign that you might be dealing with advance fee fraud?',
        options: ['A detailed contract', 'Pressure to make a quick payment', 'A reputable company name', 'Verification of credentials'],
        answer: 'Pressure to make a quick payment'
      },
      {
        type: 'Multiple Choice',
        question: 'Which payment method is often used in advance fee fraud due to its difficulty to trace?',
        options: ['Credit card', 'Check', 'Wire transfer', 'Online payment systems'],
        answer: 'Wire transfer'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do if you receive an unsolicited offer requiring an advance payment?',
        options: ['Ignore the offer', 'Provide the payment to secure the deal', 'Research the company thoroughly', 'Proceed with caution and make the payment'],
        answer: 'Research the company thoroughly'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common tactic used by scammers in advance fee fraud?',
        options: ['Providing detailed business information', 'Offering a full refund policy', 'Creating a false sense of urgency', 'Offering a trial period'],
        answer: 'Creating a false sense of urgency'
      },
      {
        type: 'Multiple Choice',
        question: 'Which organization is a good resource to check if you suspect advance fee fraud?',
        options: ['The Better Business Bureau (BBB)', 'Local Chamber of Commerce', 'Financial Planning Association', 'Personal Network'],
        answer: 'The Better Business Bureau (BBB)'
      },
      {
        type: 'Multiple Choice',
        question: 'What action is advisable if you have been a victim of advance fee fraud?',
        options: ['Ignore the loss and move on', 'Report the fraud to authorities', 'Attempt to recover funds directly from the scammer', 'Keep the incident private'],
        answer: 'Report the fraud to authorities'
      },
      {
        type: 'Multiple Choice',
        question: 'Which is NOT a typical feature of advance fee fraud?',
        options: ['Promises of large returns with little risk', 'Requests for small payments for services rendered', 'Offers of valuable prizes in exchange for a fee', 'Impersonation of reputable businesses'],
        answer: 'Requests for small payments for services rendered'
      },
      {
        type: 'Multiple Choice',
        question: 'How can you verify the legitimacy of a business before making an advance payment?',
        options: ['Check for online reviews and ratings', 'Proceed with the payment based on their website', 'Ignore the companys contact information', 'Ask for a refund guarantee'],
        answer: 'Check for online reviews and ratings'
      },
      {
        type: 'Multiple Choice',
        question: 'Which type of email is likely to be associated with advance fee fraud?',
        options: ['An email with a detailed proposal', 'An email from a known contact', 'An unsolicited email with urgent requests for payment', 'An email with a secure link to a website'],
        answer: 'An unsolicited email with urgent requests for payment'
      },
      
    ],
    'Check fraud': [
      {
        type: 'True/False',
        question: 'Check fraud involves the illegal use or manipulation of checks for financial gain.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Only stolen checks can be used for check fraud.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Altering a check to change the payee’s name is an example of check fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Writing a check with insufficient funds is considered check fraud.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Check fraud can involve the use of counterfeit checks or forging signatures.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_________ is a type of check fraud where the payee’s name on a check is altered.',
        options: ['Check kiting', 'Check forgery', 'Check washing', 'Check cloning'],
        answer: 'Check forgery'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_________ is a type of check fraud that involves creating and using counterfeit checks.',
        options: ['Check washing', 'Check kiting', 'Check forgery', 'Check cloning'],
        answer: 'Check cloning'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Using a check with a forged _______ is an example of check fraud.',
        options: ['amount', 'payee', 'signature', 'date'],
        answer: 'signature'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_________ is the practice of altering the amount on a check to commit fraud.',
        options: ['Check washing', 'Check kiting', 'Check forgery', 'Check cloning'],
        answer: 'Check washing'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A _______ check is one that is written without sufficient funds in the account.',
        options: ['counterfeit', 'stale', 'bounced', 'voided'],
        answer: 'bounced'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common method of committing check fraud?',
        options: ['Overdrafting an account', 'Writing a check with a forged signature', 'Using a legitimate check for payment', 'Depositing a check into a savings account'],
        answer: 'Writing a check with a forged signature'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common warning sign of check fraud?',
        options: ['Unusual bank account activity', 'Frequent online transactions', 'Regular check deposits', 'Monthly bank statements'],
        answer: 'Unusual bank account activity'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a type of check fraud?',
        options: ['Check washing', 'Check kiting', 'Check forgery', 'Check signing'],
        answer: 'Check signing'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a typical prevention measure against check fraud?',
        options: ['Using personal checks for all transactions', 'Storing checks in a safe place', 'Writing checks with a pencil', 'Ignoring suspicious activity'],
        answer: 'Storing checks in a safe place'
      },
      {
        type: 'Multiple Choice',
        question: 'What action should you take if you suspect your check has been forged?',
        options: ['Contact the recipient of the check', 'Notify your bank immediately', 'Ignore the issue', 'Destroy the check and write a new one'],
        answer: 'Notify your bank immediately'
      },
      {
        type: 'Multiple Choice',
        question: 'Which check fraud method involves using stolen checks to withdraw funds?',
        options: ['Check cloning', 'Check washing', 'Check kiting', 'Check forgery'],
        answer: 'Check cloning'
      },
      {
        type: 'Multiple Choice',
        question: 'Which organization can assist with issues related to check fraud?',
        options: ['The Federal Trade Commission (FTC)', 'Local Chamber of Commerce', 'International Monetary Fund', 'Consumer Financial Protection Bureau (CFPB)'],
        answer: 'The Federal Trade Commission (FTC)'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following can be a consequence of committing check fraud?',
        options: ['Increased bank interest rates', 'Legal penalties', 'Loss of account privileges', 'Reduced credit score'],
        answer: 'Legal penalties'
      },
      {
        type: 'Multiple Choice',
        question: 'What does check kiting involve?',
        options: ['Writing checks without funds in the account', 'Forging signatures on checks', 'Altering check amounts', 'Using counterfeit checks'],
        answer: 'Writing checks without funds in the account'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common prevention method for check fraud?',
        options: ['Using multiple bank accounts', 'Regularly monitoring account statements', 'Writing checks in different colors', 'Avoiding online banking'],
        answer: 'Regularly monitoring account statements'
      },
      
    ],
    'Remote desktop software': [
      {
        type: 'True/False',
        question: 'Remote desktop software allows users to access and control a computer from a different location.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Remote desktop software can only be used for troubleshooting and maintenance purposes.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Remote desktop sessions are always encrypted to ensure security.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'You need to install additional software on both the host and client computers to use remote desktop software.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Remote desktop software can be used to access a computer from any device with internet access.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Remote desktop software allows a user to access a computer remotely over a _______.',
        options: ['network', 'phone line', 'USB connection', 'CD-ROM'],
        answer: 'network'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'The _______ of remote desktop software ensures that users can access their systems securely.',
        options: ['encryption', 'compression', 'firewall', 'password'],
        answer: 'encryption'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_________ is a popular remote desktop software for connecting to Windows machines.',
        options: ['TeamViewer', 'Chrome Remote Desktop', 'Remote Desktop Connection', 'AnyDesk'],
        answer: 'Remote Desktop Connection'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'To use remote desktop software, the host computer must have the _______ feature enabled.',
        options: ['sharing', 'remote access', 'file transfer', 'multi-user'],
        answer: 'remote access'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_________ is a common remote desktop software used for cross-platform remote access.',
        options: ['LogMeIn', 'VNC', 'Hyper-V', 'Windows Defender'],
        answer: 'VNC'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a benefit of using remote desktop software?',
        options: ['Increased physical security', 'Access to files from anywhere', 'Reduced need for internet connectivity', 'Elimination of software updates'],
        answer: 'Access to files from anywhere'
      },
      {
        type: 'Multiple Choice',
        question: 'What is commonly used to ensure secure communication in remote desktop sessions?',
        options: ['FTP', 'SSH', 'Telnet', 'POP3'],
        answer: 'SSH'
      },
      {
        type: 'Multiple Choice',
        question: 'Which remote desktop software is built into Windows operating systems?',
        options: ['TeamViewer', 'Chrome Remote Desktop', 'Remote Desktop Connection', 'AnyDesk'],
        answer: 'Remote Desktop Connection'
      },
      {
        type: 'Multiple Choice',
        question: 'Which feature is essential for remote desktop software to function effectively?',
        options: ['High-resolution display', 'Fast internet connection', 'Physical access to the computer', 'Backup power supply'],
        answer: 'Fast internet connection'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a free remote desktop software option?',
        options: ['LogMeIn', 'Splashtop', 'Chrome Remote Desktop', 'GoToMyPC'],
        answer: 'Chrome Remote Desktop'
      },
      {
        type: 'Multiple Choice',
        question: 'What does VNC stand for in the context of remote desktop software?',
        options: ['Virtual Network Computing', 'Virtual Node Controller', 'Visual Network Connection', 'Virtual Network Connector'],
        answer: 'Virtual Network Computing'
      },
      {
        type: 'Multiple Choice',
        question: 'Which protocol is commonly used to enable remote desktop access on Unix-like systems?',
        options: ['RDP', 'SSH', 'FTP', 'HTTP'],
        answer: 'SSH'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common security measure for remote desktop software?',
        options: ['Using strong passwords', 'Disabling encryption', 'Ignoring updates', 'Allowing open access'],
        answer: 'Using strong passwords'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT typically a feature of remote desktop software?',
        options: ['File transfer', 'Session recording', 'Multi-monitor support', 'Antivirus scanning'],
        answer: 'Antivirus scanning'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you ensure before initiating a remote desktop session?',
        options: ['Both computers are on the same network', 'The host computer is turned off', 'The remote client has physical access', 'The host computer is running the remote desktop software'],
        answer: 'The host computer is running the remote desktop software'
      },
      
    ],
    'Accounting fraud': [
      {
        type: 'True/False',
        question: 'Accounting fraud involves falsifying financial statements to mislead stakeholders.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Cooking the books is a legal practice to make a companys financial performance look better.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Only large corporations can commit accounting fraud.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Overstating revenues to inflate a company’s financial performance is a form of accounting fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Accounting fraud can lead to criminal charges and legal penalties.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_________ involves manipulating financial data to deceive investors and regulators.',
        options: ['Accounting fraud', 'Tax evasion', 'Money laundering', 'Bribery'],
        answer: 'Accounting fraud'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A common method of accounting fraud is ___________ revenue recognition.',
        options: ['premature', 'delayed', 'accurate', 'consistent'],
        answer: 'premature'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_________ financial statements are used to hide financial problems through fraudulent means.',
        options: ['False', 'Audited', 'Accurate', 'Revised'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'The practice of recording expenses in the wrong period to manipulate profit is known as ___________.',
        options: ['deferring expenses', 'accelerating revenues', 'creative accounting', 'misappropriation'],
        answer: 'creative accounting'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_________ is a key indicator of potential accounting fraud within a company.',
        options: ['Unusual financial ratios', 'High employee turnover', 'Strong market growth', 'Frequent product launches'],
        answer: 'Unusual financial ratios'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common sign of accounting fraud?',
        options: ['Consistent financial results', 'Unusual accounting entries', 'High employee satisfaction', 'Regular audit reviews'],
        answer: 'Unusual accounting entries'
      },
      {
        type: 'Multiple Choice',
        question: 'Which method of accounting fraud involves inflating profits by recognizing revenue prematurely?',
        options: ['Channel stuffing', 'Lapping', 'Ponzi scheme', 'Asset misappropriation'],
        answer: 'Channel stuffing'
      },
      {
        type: 'Multiple Choice',
        question: 'What is the primary purpose of committing accounting fraud?',
        options: ['To comply with tax laws', 'To mislead investors and creditors', 'To improve employee morale', 'To reduce operational costs'],
        answer: 'To mislead investors and creditors'
      },
      {
        type: 'Multiple Choice',
        question: 'Which financial statement is most commonly manipulated in accounting fraud?',
        options: ['Income statement', 'Balance sheet', 'Cash flow statement', 'Statement of changes in equity'],
        answer: 'Income statement'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a common technique used in accounting fraud?',
        options: ['Falsifying invoices', 'Overstating assets', 'Understating liabilities', 'Conducting regular audits'],
        answer: 'Conducting regular audits'
      },
      {
        type: 'Multiple Choice',
        question: 'What is the impact of accounting fraud on a company’s reputation?',
        options: ['Improved public image', 'Increased investor confidence', 'Damage to credibility and trust', 'Higher stock prices'],
        answer: 'Damage to credibility and trust'
      },
      {
        type: 'Multiple Choice',
        question: 'What legal consequences can result from committing accounting fraud?',
        options: ['Monetary fines', 'Jail time', 'Community service', 'All of the above'],
        answer: 'All of the above'
      },
      {
        type: 'Multiple Choice',
        question: 'Which regulation is designed to prevent accounting fraud in publicly traded companies?',
        options: ['SOX (Sarbanes-Oxley Act)', 'FCPA (Foreign Corrupt Practices Act)', 'Dodd-Frank Act', 'GLBA (Gramm-Leach-Bliley Act)'],
        answer: 'SOX (Sarbanes-Oxley Act)'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a red flag for potential accounting fraud?',
        options: ['Consistent profit growth', 'Infrequent management changes', 'Complex financial transactions', 'Frequent company meetings'],
        answer: 'Complex financial transactions'
      },
      {
        type: 'Multiple Choice',
        question: 'Who is responsible for detecting and preventing accounting fraud within a company?',
        options: ['Internal auditors', 'External auditors', 'Company management', 'All of the above'],
        answer: 'All of the above'
      },
      
    ],
    'Charity scams': [],
    'Bank fraud': [],
    'Insurance fraud': [],
    'Blackmail scams': [],
    'Payment fraud': [],
    'Account takeover': [],
    'Ponzi schemes': [],
    'Asset misappropriation': [],
    'Bribery': [],
    'CNP fraud': [],
    'Employment scams': [],
    'Grandparent scams': [],
    'Investment fraud': [],
    'IP infringement': [],
  };

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  const startQuiz = (category) => {
    setCurrentCategory(category);
    setQuestions(questionsByCategory[category]);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
  };

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert(`You've finished the quiz! Score: ${correctAnswers}/${questions.length} Correct, ${incorrectAnswers}/${questions.length} Incorrect`);
    }
  };

  if (!currentCategory) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Select a Category:</Text>
        {categories.map(category => (
          <TouchableOpacity key={category} style={styles.categoryButton} onPress={() => startQuiz(category)}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>Right: {correctAnswers}</Text>
        <Text style={styles.scoreText}>Wrong: {incorrectAnswers}</Text>
      </View>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].options.map((option) => (
        <TouchableOpacity key={option} style={styles.button} onPress={() => handleAnswer(option)}>
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    margin: 20,
  },
  scoreBox: {
    position: 'absolute',
    right: 20,
    top: 20,
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  categoryButton: {
    backgroundColor: 'lightpink',
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});
