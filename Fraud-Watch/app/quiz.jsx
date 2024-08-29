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
    'Charity scams': [
      {
        type: 'True/False',
        question: 'Charity scams involve misleading donors by pretending to be a legitimate charity.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'It is illegal to use charity donations for personal gain.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Charity scams only affect large, well-known organizations.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'A legitimate charity will never pressure you to donate immediately.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Charity scammers often use emotional appeals to persuade people to donate.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A charity scam often uses ___________ appeals to manipulate potential donors.',
        options: ['emotional', 'rational', 'financial', 'legal'],
        answer: 'emotional'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'To verify the legitimacy of a charity, you should check if it is registered with a ___________.',
        options: ['government agency', 'local business', 'social media site', 'bank'],
        answer: 'government agency'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Charity scammers may use ___________ names that closely resemble real charities.',
        options: ['fake', 'generic', 'famous', 'historical'],
        answer: 'fake'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Always ___________ before making a donation to ensure it is going to a legitimate charity.',
        options: ['research', 'donate immediately', 'ignore', 'contact friends'],
        answer: 'research'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Charity scams can sometimes be identified by ___________ requests for donations through unsolicited phone calls or emails.',
        options: ['urgent', 'timely', 'polite', 'random'],
        answer: 'urgent'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common sign of a charity scam?',
        options: ['Promises of large returns on donations', 'Detailed financial reports available', 'Well-known and reputable organization', 'Clear contact information and transparency'],
        answer: 'Promises of large returns on donations'
      },
      {
        type: 'Multiple Choice',
        question: 'How can you verify if a charity is legitimate?',
        options: ['Check for registration with a government agency', 'Rely on social media reviews', 'Follow unsolicited emails', 'Trust their website only'],
        answer: 'Check for registration with a government agency'
      },
      {
        type: 'Multiple Choice',
        question: 'Which tactic is often used by scammers to solicit donations?',
        options: ['Emotional manipulation', 'Providing clear and honest information', 'Offering detailed annual reports', 'Establishing a physical office'],
        answer: 'Emotional manipulation'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do if you suspect a charity scam?',
        options: ['Report it to the appropriate authorities', 'Ignore it', 'Share it on social media', 'Donate more to help'],
        answer: 'Report it to the appropriate authorities'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a common characteristic of a charity scam?',
        options: ['Pressure to donate quickly', 'Transparency about how donations are used', 'High-pressure tactics', 'Unsolicited phone calls or emails'],
        answer: 'Transparency about how donations are used'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a typical feature of a fraudulent charity website?',
        options: ['Lack of contact information', 'Clear mission statement', 'Links to reputable sources', 'Secure donation processing'],
        answer: 'Lack of contact information'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of these should you verify to avoid charity scams?',
        options: ['The charity’s tax-exempt status', 'The charity’s social media followers', 'The charity’s email design', 'The charity’s advertising budget'],
        answer: 'The charity’s tax-exempt status'
      },
      {
        type: 'Multiple Choice',
        question: 'What action should you take if a charity asks for personal financial information?',
        options: ['Do not provide the information and verify the charity’s legitimacy', 'Provide the information immediately', 'Share the information with friends for advice', 'Only provide partial information'],
        answer: 'Do not provide the information and verify the charity’s legitimacy'
      },
      {
        type: 'Multiple Choice',
        question: 'Which type of donation request should raise a red flag?',
        options: ['A request for cash donations only', 'A request for donations to a well-known charity', 'A request with detailed use of funds', 'A request through official charity channels'],
        answer: 'A request for cash donations only'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common feature of charity scams?',
        options: ['Using a fake charity name similar to a legitimate one', 'Providing clear information about the charity’s mission', 'Offering tax deductions for donations', 'Maintaining a transparent website'],
        answer: 'Using a fake charity name similar to a legitimate one'
      },
      
    ],
    'Bank fraud': [
      {
        type: 'True/False',
        question: 'Bank fraud involves deceiving a financial institution to gain an unfair advantage or steal money.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'All forms of bank fraud are immediately detectable by banks.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Using someone else’s bank account information without permission is considered bank fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Bank fraud can involve both individuals and organizations.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Making a false statement on a bank loan application is a form of bank fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Bank fraud often involves ___________ financial information to deceive the bank.',
        options: ['false', 'real', 'updated', 'reliable'],
        answer: 'false'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Phishing schemes are used to obtain ___________ information for committing bank fraud.',
        options: ['personal', 'company', 'irrelevant', 'general'],
        answer: 'personal'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Using stolen credit card information to make unauthorized purchases is an example of ___________.',
        options: ['bank fraud', 'identity theft', 'tax evasion', 'charity scam'],
        answer: 'bank fraud'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Bank fraud can be committed through various methods including ___________ and phishing.',
        options: ['embezzlement', 'terrorism', 'robbery', 'hacking'],
        answer: 'hacking'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Fraudulent ___________ to gain access to a bank account is a common tactic used in bank fraud.',
        options: ['emails', 'letters', 'phone calls', 'visits'],
        answer: 'emails'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common method used to commit bank fraud?',
        options: ['Phishing', 'Secure password management', 'Regular account monitoring', 'Encryption'],
        answer: 'Phishing'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common sign that someone might be attempting bank fraud?',
        options: ['Unusual transactions on your account', 'Regular account statements', 'Frequent login attempts from your own devices', 'Routine updates from your bank'],
        answer: 'Unusual transactions on your account'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of these actions would likely indicate bank fraud?',
        options: ['Receiving a large sum of money without a clear source', 'Regularly saving money', 'Using an authorized bank credit card', 'Making regular deposits'],
        answer: 'Receiving a large sum of money without a clear source'
      },
      {
        type: 'Multiple Choice',
        question: 'How can banks prevent bank fraud?',
        options: ['By implementing multi-factor authentication', 'By ignoring suspicious activities', 'By avoiding regular updates to security protocols', 'By providing minimal customer support'],
        answer: 'By implementing multi-factor authentication'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do if you suspect bank fraud?',
        options: ['Report it to the bank immediately', 'Ignore it', 'Share your concerns on social media', 'Contact the fraudster directly'],
        answer: 'Report it to the bank immediately'
      },
      {
        type: 'Multiple Choice',
        question: 'Which method is often used by fraudsters to gain access to bank accounts?',
        options: ['Hacking into accounts', 'Consulting financial advisors', 'Reviewing credit reports', 'Using secure passwords'],
        answer: 'Hacking into accounts'
      },
      {
        type: 'Multiple Choice',
        question: 'What type of fraud involves using false information to obtain a loan?',
        options: ['Loan fraud', 'Mortgage fraud', 'Bank fraud', 'Investment fraud'],
        answer: 'Bank fraud'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a preventive measure against bank fraud?',
        options: ['Regularly changing passwords', 'Ignoring unusual account activity', 'Using the same password for multiple accounts', 'Avoiding two-factor authentication'],
        answer: 'Regularly changing passwords'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of these is NOT a common tactic used in bank fraud?',
        options: ['Phishing emails', 'Stolen credit card information', 'Direct bank transfers from legitimate sources', 'Social engineering'],
        answer: 'Direct bank transfers from legitimate sources'
      },
      {
        type: 'Multiple Choice',
        question: 'Which government agency typically investigates cases of bank fraud?',
        options: ['The Federal Bureau of Investigation (FBI)', 'The Department of Health and Human Services', 'The Environmental Protection Agency', 'The Department of Education'],
        answer: 'The Federal Bureau of Investigation (FBI)'
      },
      
    ],
    'Insurance fraud': [
      {
        type: 'True/False',
        question: 'Insurance fraud involves deceitful actions taken to obtain an undeserved insurance benefit.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Submitting a false insurance claim is considered insurance fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Insurance fraud is only committed by individuals, not by businesses.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Falsifying information on an insurance application is a form of insurance fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Insurance fraud is punishable by law and can result in criminal charges.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ claims for damages that did not occur is a form of insurance fraud.',
        options: ['Submitting', 'Honest', 'Correcting', 'Withdrawing'],
        answer: 'Submitting'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Providing false information about an accident to an insurance company is considered ___________.',
        options: ['insurance fraud', 'normal practice', 'a minor error', 'insurance investigation'],
        answer: 'insurance fraud'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ a claim for a higher amount than the actual loss is a type of insurance fraud.',
        options: ['Inflating', 'Reducing', 'Reporting', 'Ignoring'],
        answer: 'Inflating'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Insurance fraud can involve both individuals and ___________.',
        options: ['businesses', 'families', 'banks', 'schools'],
        answer: 'businesses'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ insurance claims to cover pre-existing damages is an example of insurance fraud.',
        options: ['Filing', 'Avoiding', 'Processing', 'Verifying'],
        answer: 'Filing'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common method of committing insurance fraud?',
        options: ['Filing false claims', 'Providing accurate information', 'Verifying policy details', 'Updating personal information'],
        answer: 'Filing false claims'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common consequence of committing insurance fraud?',
        options: ['Increased insurance premiums', 'Criminal charges', 'Higher policy limits', 'Faster claim processing'],
        answer: 'Criminal charges'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action is NOT considered insurance fraud?',
        options: ['Filing a claim for a real accident', 'Falsifying accident details', 'Exaggerating claim amounts', 'Providing false personal information'],
        answer: 'Filing a claim for a real accident'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following best describes "staging" an accident for insurance fraud?',
        options: ['Creating a fake accident scene', 'Documenting an actual accident', 'Reporting a minor accident truthfully', 'Reviewing accident reports'],
        answer: 'Creating a fake accident scene'
      },
      {
        type: 'Multiple Choice',
        question: 'What type of insurance fraud involves submitting claims for damages that did not happen?',
        options: ['False claims', 'Accurate claims', 'Standard claims', 'Legitimate claims'],
        answer: 'False claims'
      },
      {
        type: 'Multiple Choice',
        question: 'Which tactic is often used by fraudsters to commit insurance fraud?',
        options: ['Faking injuries', 'Reporting accurate injuries', 'Verifying legitimate claims', 'Providing honest information'],
        answer: 'Faking injuries'
      },
      {
        type: 'Multiple Choice',
        question: 'Which type of fraud involves misrepresenting or exaggerating losses to gain a larger insurance payout?',
        options: ['Insurance fraud', 'Identity theft', 'Bank fraud', 'Credit card fraud'],
        answer: 'Insurance fraud'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of these actions is NOT a sign of insurance fraud?',
        options: ['Exaggerating damage claims', 'Submitting multiple claims for the same incident', 'Providing truthful information about damages', 'Staging an accident'],
        answer: 'Providing truthful information about damages'
      },
      {
        type: 'Multiple Choice',
        question: 'Which government body typically investigates cases of insurance fraud?',
        options: ['The Department of Insurance', 'The Department of Education', 'The Department of Transportation', 'The Environmental Protection Agency'],
        answer: 'The Department of Insurance'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a preventative measure against insurance fraud?',
        options: ['Maintaining accurate records', 'Ignoring suspicious activities', 'Using unverified contractors', 'Filing claims without documentation'],
        answer: 'Maintaining accurate records'
      },
      
    ],
    'Blackmail scams': [
      {
        type: 'True/False',
        question: 'Blackmail scams involve threatening to expose personal or sensitive information unless a payment is made.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'It is illegal to blackmail someone for money or other benefits.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Blackmail scams can only occur online and not in person.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Ignoring a blackmail threat is a recommended strategy.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Paying a blackmailer guarantees that they will not continue to demand more money.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ is a tactic used in blackmail scams to coerce victims into paying money.',
        options: ['Threatening exposure', 'Offering rewards', 'Giving discounts', 'Providing help'],
        answer: 'Threatening exposure'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Blackmail scams can involve threats of ___________ personal or sensitive information.',
        options: ['exposing', 'protecting', 'sharing', 'ignoring'],
        answer: 'exposing'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'It is advisable to ___________ the demands of a blackmailer and report the scam to authorities.',
        options: ['ignore', 'accept', 'negotiate', 'delay'],
        answer: 'ignore'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Blackmail threats can come via ___________, email, or in person.',
        options: ['phone', 'postal mail', 'fax', 'social media'],
        answer: 'phone'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Paying a blackmailer often leads to ___________ demands for more money or other benefits.',
        options: ['increased', 'decreased', 'same', 'no'],
        answer: 'increased'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common method used by blackmailers to force victims to comply?',
        options: ['Threatening to release sensitive information', 'Offering free services', 'Providing rewards for compliance', 'Offering discounts'],
        answer: 'Threatening to release sensitive information'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action is recommended when dealing with a blackmail scam?',
        options: ['Ignoring the threat', 'Paying the blackmailer', 'Negotiating with the blackmailer', 'Reporting to authorities'],
        answer: 'Reporting to authorities'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a typical method used in blackmail scams?',
        options: ['Threatening exposure of personal information', 'Offering financial rewards', 'Using extortion techniques', 'Demanding money for silence'],
        answer: 'Offering financial rewards'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a potential outcome of paying a blackmailer?',
        options: ['The threats stop immediately', 'The blackmailer may continue to demand more money', 'The blackmailer will disappear permanently', 'The blackmailer will provide a refund'],
        answer: 'The blackmailer may continue to demand more money'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common type of blackmail scam?',
        options: ['Threatening to share private photos', 'Offering legitimate investments', 'Providing discounts on services', 'Offering free information'],
        answer: 'Threatening to share private photos'
      },
      {
        type: 'Multiple Choice',
        question: 'How can you best protect yourself from blackmail scams?',
        options: ['Keeping personal information secure', 'Sharing information freely', 'Ignoring online security measures', 'Responding to blackmail demands'],
        answer: 'Keeping personal information secure'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do if you receive a blackmail threat?',
        options: ['Report it to the authorities', 'Pay the demanded amount', 'Try to negotiate with the blackmailer', 'Ignore it and do nothing'],
        answer: 'Report it to the authorities'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a warning sign of a blackmail scam?',
        options: ['Threats of exposure', 'Offers of free services', 'Notifications of legitimate transactions', 'Updates on account status'],
        answer: 'Threats of exposure'
      },
      {
        type: 'Multiple Choice',
        question: 'Which approach is NOT effective in dealing with blackmail scams?',
        options: ['Paying the blackmailer', 'Ignoring the threat', 'Reporting the scam to authorities', 'Seeking advice from trusted sources'],
        answer: 'Paying the blackmailer'
      },
      {
        type: 'Multiple Choice',
        question: 'Blackmail scams can occur through which of the following methods?',
        options: ['Email', 'Phone calls', 'Text messages', 'All of the above'],
        answer: 'All of the above'
      },
      
    ],
    'Payment fraud': [
      {
        type: 'True/False',
        question: 'Payment fraud involves unauthorized transactions made with someone else\'s payment information.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Using a stolen credit card for online purchases is considered payment fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Payment fraud can only occur with credit cards and not with debit cards.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Phishing scams can be used to collect payment information for fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'It is not necessary to report payment fraud to your bank if you resolve it on your own.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ fraud involves the use of stolen or unauthorized payment information to make transactions.',
        options: ['Payment', 'Identity', 'Bank', 'Investment'],
        answer: 'Payment'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Using someone else’s credit card details without permission is a type of __________.',
        options: ['payment fraud', 'identity theft', 'check fraud', 'charity scam'],
        answer: 'payment fraud'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A common method to obtain payment information for fraud is through __________ scams.',
        options: ['phishing', 'investment', 'employment', 'sweepstakes'],
        answer: 'phishing'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'In case of suspected payment fraud, it is important to __________ the incident to your bank or financial institution.',
        options: ['report', 'ignore', 'delay', 'accept'],
        answer: 'report'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Payment fraud can be perpetrated through __________ transactions made without the cardholder’s knowledge.',
        options: ['unauthorized', 'authorized', 'secure', 'verifiable'],
        answer: 'unauthorized'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common sign of payment fraud?',
        options: ['Unusual transactions on your statement', 'Regularly reviewing your bank account', 'Maintaining a secure password', 'Receiving promotional offers from your bank'],
        answer: 'Unusual transactions on your statement'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do if you suspect payment fraud on your account?',
        options: ['Report it to your bank', 'Ignore it and hope it resolves', 'Attempt to resolve it with the fraudster directly', 'Wait until your next statement'],
        answer: 'Report it to your bank'
      },
      {
        type: 'Multiple Choice',
        question: 'Which method is commonly used by fraudsters to steal payment information?',
        options: ['Phishing emails', 'Personal secure transactions', 'Direct bank contact', 'Legitimate financial advice'],
        answer: 'Phishing emails'
      },
      {
        type: 'Multiple Choice',
        question: 'Which type of card is often targeted in payment fraud?',
        options: ['Credit cards', 'Prepaid cards', 'Debit cards', 'All of the above'],
        answer: 'All of the above'
      },
      {
        type: 'Multiple Choice',
        question: 'How can you protect yourself from payment fraud?',
        options: ['Regularly monitor your account statements', 'Use weak passwords', 'Ignore suspicious activities', 'Share your card details with others'],
        answer: 'Regularly monitor your account statements'
      },
      {
        type: 'Multiple Choice',
        question: 'What action can help prevent payment fraud?',
        options: ['Using multi-factor authentication', 'Sharing your PIN with trusted friends', 'Storing card details on multiple websites', 'Using simple passwords'],
        answer: 'Using multi-factor authentication'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a typical feature of payment fraud?',
        options: ['Unauthorized transactions', 'Phishing schemes', 'Secure payment methods', 'Fraudulent charges'],
        answer: 'Secure payment methods'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common consequence of payment fraud for victims?',
        options: ['Loss of money', 'Increased account balance', 'Better credit score', 'Additional rewards'],
        answer: 'Loss of money'
      },
      {
        type: 'Multiple Choice',
        question: 'Which technology helps protect against payment fraud?',
        options: ['Encryption', 'Weak security protocols', 'Shared passwords', 'Unverified sources'],
        answer: 'Encryption'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you avoid to reduce the risk of payment fraud?',
        options: ['Using secure websites for transactions', 'Reusing passwords across sites', 'Keeping your personal information confidential', 'Regularly updating your security settings'],
        answer: 'Reusing passwords across sites'
      },
      
    ],
    'Account takeover': [
      {
        type: 'True/False',
        question: 'Account takeover involves unauthorized access to a user’s account by an attacker.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Changing your password frequently can help prevent account takeover.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Account takeover can only happen with financial accounts and not with social media accounts.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Phishing emails are a common method used for account takeover.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Enabling multi-factor authentication can significantly reduce the risk of account takeover.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ is a method where attackers gain unauthorized access to an individual’s account by using stolen credentials.',
        options: ['Account takeover', 'Phishing', 'Ransomware', 'Malware'],
        answer: 'Account takeover'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Using __________ for your online accounts helps prevent unauthorized access and account takeover.',
        options: ['multi-factor authentication', 'simple passwords', 'public Wi-Fi', 'shared accounts'],
        answer: 'multi-factor authentication'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'One common sign of account takeover is __________ activity on your account that you did not initiate.',
        options: ['unusual', 'normal', 'expected', 'regular'],
        answer: 'unusual'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '_____________ is a technique often used in account takeover where attackers impersonate legitimate entities to trick users.',
        options: ['Phishing', 'Encryption', 'Firewalls', 'Backup'],
        answer: 'Phishing'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Regularly updating your passwords and monitoring account activity can help protect against __________.',
        options: ['account takeover', 'software updates', 'system maintenance', 'network security'],
        answer: 'account takeover'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common method used for account takeover?',
        options: ['Phishing attacks', 'Using strong passwords', 'Regular account monitoring', 'Secure login practices'],
        answer: 'Phishing attacks'
      },
      {
        type: 'Multiple Choice',
        question: 'What is an effective way to prevent account takeover?',
        options: ['Enabling multi-factor authentication', 'Using the same password for multiple accounts', 'Ignoring account activity', 'Sharing passwords with friends'],
        answer: 'Enabling multi-factor authentication'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action is NOT recommended to prevent account takeover?',
        options: ['Using complex passwords', 'Keeping passwords private', 'Reusing passwords across different sites', 'Updating passwords regularly'],
        answer: 'Reusing passwords across different sites'
      },
      {
        type: 'Multiple Choice',
        question: 'What might indicate that your account has been taken over?',
        options: ['Receiving unexpected login notifications', 'Using strong security questions', 'Regularly updating your password', 'Setting up security alerts'],
        answer: 'Receiving unexpected login notifications'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a sign of account takeover?',
        options: ['Changes to account details that you did not make', 'Using a secure password', 'Regularly checking account activity', 'Activating two-factor authentication'],
        answer: 'Changes to account details that you did not make'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do if you suspect your account has been taken over?',
        options: ['Immediately report it to the service provider', 'Change your password and do nothing', 'Ignore the issue', 'Share your situation on social media'],
        answer: 'Immediately report it to the service provider'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a common technique used in account takeover?',
        options: ['Phishing', 'Brute force attacks', 'Using strong encryption', 'Password guessing'],
        answer: 'Using strong encryption'
      },
      {
        type: 'Multiple Choice',
        question: 'Which measure helps in detecting account takeover?',
        options: ['Monitoring account activity regularly', 'Using a single password for multiple accounts', 'Ignoring security alerts', 'Sharing passwords with others'],
        answer: 'Monitoring account activity regularly'
      },
      {
        type: 'Multiple Choice',
        question: 'What type of authentication can help protect your account from takeover?',
        options: ['Two-factor authentication', 'Simple password', 'Password reuse', 'Public Wi-Fi'],
        answer: 'Two-factor authentication'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following should be avoided to prevent account takeover?',
        options: ['Using public Wi-Fi for login', 'Enabling multi-factor authentication', 'Keeping your password confidential', 'Regularly updating your password'],
        answer: 'Using public Wi-Fi for login'
      },
      
    ],
    'Ponzi schemes': [
      {
        type: 'True/False',
        question: 'A Ponzi scheme is a type of investment scam where returns are paid to earlier investors using new investors’ money.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'In a Ponzi scheme, returns are generated from legitimate business activities and profits.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Ponzi schemes eventually collapse when it becomes difficult to recruit new investors.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'All investments that promise high returns with little risk are Ponzi schemes.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Ponzi schemes are named after Charles Ponzi, who famously used this method to defraud investors in the early 20th century.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A Ponzi scheme is a type of ___________ where returns are paid to earlier investors using new investors’ money.',
        options: ['fraud', 'investment', 'loan', 'insurance'],
        answer: 'fraud'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Ponzi schemes often promise high returns with ___________ risk.',
        options: ['low', 'high', 'moderate', 'minimal'],
        answer: 'low'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'The scheme named after ___________ is known for paying returns to investors from new investors’ contributions.',
        options: ['Charles Ponzi', 'Bernie Madoff', 'Bernard Madoff', 'Frank Abagnale'],
        answer: 'Charles Ponzi'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Ponzi schemes typically collapse when it becomes ___________ to recruit new investors.',
        options: ['difficult', 'easy', 'necessary', 'profitable'],
        answer: 'difficult'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Investors in a Ponzi scheme often receive returns that seem ___________ at first.',
        options: ['legitimate', 'fraudulent', 'unrealistic', 'unpredictable'],
        answer: 'legitimate'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following best describes a Ponzi scheme?',
        options: ['An investment that pays returns from new investors’ money', 'A legitimate investment in stocks', 'A type of insurance policy', 'A savings account with high interest'],
        answer: 'An investment that pays returns from new investors’ money'
      },
      {
        type: 'Multiple Choice',
        question: 'What often leads to the collapse of a Ponzi scheme?',
        options: ['Increased number of new investors', 'Difficulty in recruiting new investors', 'High returns on investment', 'Successful business operations'],
        answer: 'Difficulty in recruiting new investors'
      },
      {
        type: 'Multiple Choice',
        question: 'Who was the most famous perpetrator of a Ponzi scheme?',
        options: ['Charles Ponzi', 'Warren Buffet', 'Elon Musk', 'Mark Zuckerberg'],
        answer: 'Charles Ponzi'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a characteristic of a Ponzi scheme?',
        options: ['Promises of high returns with low risk', 'Returns paid from new investors’ contributions', 'Investment in a legitimate business', 'Eventually collapses'],
        answer: 'Investment in a legitimate business'
      },
      {
        type: 'Multiple Choice',
        question: 'Which sign may indicate a Ponzi scheme?',
        options: ['High returns with little risk', 'Diversified investment portfolio', 'Regular financial audits', 'Transparency in business operations'],
        answer: 'High returns with little risk'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common feature of Ponzi schemes?',
        options: ['Paying returns using money from new investors', 'Investing in various assets', 'Providing regular dividends from profits', 'Having a registered business'],
        answer: 'Paying returns using money from new investors'
      },
      {
        type: 'Multiple Choice',
        question: 'How do Ponzi schemes typically attract investors?',
        options: ['Offering guaranteed returns', 'Providing detailed investment plans', 'Having a registered financial advisor', 'Reporting accurate financial information'],
        answer: 'Offering guaranteed returns'
      },
      {
        type: 'Multiple Choice',
        question: 'What usually happens when a Ponzi scheme is exposed?',
        options: ['The scheme collapses', 'It continues to thrive', 'It transitions to a legitimate business', 'It gets regulated'],
        answer: 'The scheme collapses'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action can help protect against Ponzi schemes?',
        options: ['Conducting thorough research on investments', 'Investing in high-return schemes', 'Ignoring warning signs of fraud', 'Relying on unverified investment advice'],
        answer: 'Conducting thorough research on investments'
      },
      {
        type: 'Multiple Choice',
        question: 'Ponzi schemes are often difficult to detect because they often disguise themselves as __________.',
        options: ['legitimate investments', 'loan services', 'government programs', 'insurance policies'],
        answer: 'legitimate investments'
      },
      
    ],
    'Asset misappropriation': [
      {
        type: 'True/False',
        question: 'Asset misappropriation involves the theft or misuse of an organization’s assets by an employee.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Asset misappropriation can only occur in large corporations and not in small businesses.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Using company resources for personal use without authorization is a form of asset misappropriation.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Embezzlement is a form of asset misappropriation.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Asset misappropriation is only considered a crime if it involves a large amount of money.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ is the act of stealing or misusing company assets for personal gain.',
        options: ['Asset misappropriation', 'Fraudulent reporting', 'Tax evasion', 'Bribery'],
        answer: 'Asset misappropriation'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A common example of asset misappropriation is __________ funds from a company’s bank account.',
        options: ['embezzling', 'reporting', 'investing', 'borrowing'],
        answer: 'embezzling'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ is when an employee uses company property for personal purposes without permission.',
        options: ['Misappropriation', 'Fraud', 'Extortion', 'Forgery'],
        answer: 'Misappropriation'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ is a specific type of asset misappropriation involving the diversion of funds.',
        options: ['Embezzlement', 'Forgery', 'Bribery', 'Larceny'],
        answer: 'Embezzlement'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Asset misappropriation can occur in both __________ and private sector organizations.',
        options: ['public', 'government', 'corporate', 'nonprofit'],
        answer: 'public'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a form of asset misappropriation?',
        options: ['Embezzling company funds', 'Improper tax deductions', 'Inflating sales reports', 'Falsifying inventory records'],
        answer: 'Embezzling company funds'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action is NOT typically associated with asset misappropriation?',
        options: ['Using company resources for personal gain', 'Falsifying financial statements', 'Improperly reporting income', 'Donating to charity'],
        answer: 'Donating to charity'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common preventive measure against asset misappropriation?',
        options: ['Regular audits', 'Allowing unrestricted access to financial records', 'Not tracking employee expenses', 'Ignoring red flags'],
        answer: 'Regular audits'
      },
      {
        type: 'Multiple Choice',
        question: 'What does asset misappropriation typically involve?',
        options: ['Theft or misuse of company assets', 'Providing incorrect tax information', 'Submitting false insurance claims', 'Bribing officials'],
        answer: 'Theft or misuse of company assets'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a sign of potential asset misappropriation?',
        options: ['Unexplained discrepancies in financial records', 'Accurate financial reporting', 'Regularly updated financial statements', 'Transparent company operations'],
        answer: 'Unexplained discrepancies in financial records'
      },
      {
        type: 'Multiple Choice',
        question: 'What is an example of asset misappropriation?',
        options: ['An employee taking office supplies for personal use', 'An employee attending a work-related conference', 'An employee working extra hours', 'An employee reporting overtime accurately'],
        answer: 'An employee taking office supplies for personal use'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a method of asset misappropriation?',
        options: ['Embezzling funds', 'Falsifying financial records', 'Over-reporting sales', 'Reporting accurate expenses'],
        answer: 'Reporting accurate expenses'
      },
      {
        type: 'Multiple Choice',
        question: 'How can organizations minimize the risk of asset misappropriation?',
        options: ['Implementing strong internal controls', 'Allowing unrestricted access to financial systems', 'Ignoring employee behavior', 'Reducing audit frequency'],
        answer: 'Implementing strong internal controls'
      },
      {
        type: 'Multiple Choice',
        question: 'Which term describes the act of an employee diverting company funds for personal use?',
        options: ['Embezzlement', 'Bribery', 'Extortion', 'Forgery'],
        answer: 'Embezzlement'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a typical consequence of asset misappropriation?',
        options: ['Termination of employment', 'Promotion', 'Bonus', 'Public recognition'],
        answer: 'Termination of employment'
      },
      
    ],
    'Bribery': [
      {
        type: 'True/False',
        question: 'Bribery involves offering something of value to influence someone’s actions or decisions.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Offering a gift to a business partner is considered bribery.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Bribery can occur in both public and private sectors.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'It is not considered bribery if the recipient is aware of and accepts the offered benefit.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Bribery is only illegal if the bribe involves a significant amount of money.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ is the act of offering something of value to influence someone’s behavior or decisions.',
        options: ['Bribery', 'Extortion', 'Fraud', 'Embezzlement'],
        answer: 'Bribery'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Offering a __________ to a public official to secure a favorable decision is considered bribery.',
        options: ['gift', 'loan', 'sponsorship', 'consultation'],
        answer: 'gift'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Bribery can be directed towards both __________ and private sector employees.',
        options: ['public officials', 'business owners', 'consumers', 'vendors'],
        answer: 'public officials'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ is considered a form of bribery when it involves influencing official decisions.',
        options: ['Kickbacks', 'Charitable donations', 'Promotional offers', 'Bonuses'],
        answer: 'Kickbacks'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'In legal terms, a bribe is often referred to as a __________ payment.',
        options: ['corrupt', 'legitimate', 'permissible', 'transparent'],
        answer: 'corrupt'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common example of bribery?',
        options: ['Offering money to a government official for favorable treatment', 'Providing a discount to a loyal customer', 'Giving a promotional gift to a client', 'Paying for an employee’s training'],
        answer: 'Offering money to a government official for favorable treatment'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action is NOT typically considered bribery?',
        options: ['Providing a bribe to influence a decision', 'Offering a standard business gift to a client', 'Paying a commission to a sales agent', 'Offering extra perks to win a contract'],
        answer: 'Offering a standard business gift to a client'
      },
      {
        type: 'Multiple Choice',
        question: 'What is the main purpose of a bribe?',
        options: ['To gain an unfair advantage', 'To build a business relationship', 'To increase sales', 'To enhance customer satisfaction'],
        answer: 'To gain an unfair advantage'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a consequence of engaging in bribery?',
        options: ['Legal penalties', 'Increased business opportunities', 'Positive reputation', 'Enhanced business relationships'],
        answer: 'Legal penalties'
      },
      {
        type: 'Multiple Choice',
        question: 'What type of payment is considered bribery?',
        options: ['A payment made to influence someone’s actions', 'A payment for a legitimate service', 'A payment for business expenses', 'A payment for a product purchase'],
        answer: 'A payment made to influence someone’s actions'
      },
      {
        type: 'Multiple Choice',
        question: 'Which sector can bribery occur in?',
        options: ['Only public sector', 'Only private sector', 'Both public and private sectors', 'Neither sector'],
        answer: 'Both public and private sectors'
      },
      {
        type: 'Multiple Choice',
        question: 'Which term describes offering money to someone in exchange for favoring you?',
        options: ['Bribery', 'Charity', 'Business promotion', 'Sponsorship'],
        answer: 'Bribery'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is an example of indirect bribery?',
        options: ['Offering a bribe through an intermediary', 'Directly handing over cash to a decision-maker', 'Providing gifts to influence a decision', 'Paying for travel expenses for a client'],
        answer: 'Offering a bribe through an intermediary'
      },
      {
        type: 'Multiple Choice',
        question: 'What type of gift is most likely to be considered a bribe?',
        options: ['A valuable item given to influence a decision', 'A gift given during the holidays', 'A promotional item with the company logo', 'A small token of appreciation'],
        answer: 'A valuable item given to influence a decision'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following actions is typically NOT a sign of bribery?',
        options: ['Discreet payments to officials', 'Publicly announced business promotions', 'Undisclosed gifts to decision-makers', 'Excessive entertainment expenses'],
        answer: 'Publicly announced business promotions'
      },
      
    ],
    'CNP fraud': [
      {
        type: 'True/False',
        question: 'CNP fraud occurs when a credit card is used without the cardholder’s physical presence.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'CNP fraud can only occur during online transactions.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Using stolen card details for a telephone order is an example of CNP fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'CNP fraud is always detectable through physical card verification methods.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'A cardholder’s PIN is required for CNP transactions.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'CNP fraud involves using a card’s details without the cardholder’s __________.',
        options: ['physical presence', 'email confirmation', 'password', 'phone number'],
        answer: 'physical presence'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A common example of CNP fraud is making an online __________ using stolen card information.',
        options: ['purchase', 'phone call', 'bank transfer', 'mail order'],
        answer: 'purchase'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'To prevent CNP fraud, merchants often use __________ verification methods during transactions.',
        options: ['address', 'phone number', 'two-factor authentication', 'card swipe'],
        answer: 'two-factor authentication'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'CNP fraud can occur in __________ transactions where the cardholder is not physically present.',
        options: ['in-person', 'phone', 'email', 'online'],
        answer: 'online'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'One way to detect CNP fraud is to monitor for __________ patterns in transaction data.',
        options: ['unusual', 'regular', 'expected', 'consistent'],
        answer: 'unusual'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is an example of CNP fraud?',
        options: ['Using a credit card number to make an online purchase', 'Swiping a credit card in a store', 'Using a debit card with a PIN at an ATM', 'Making a purchase with a gift card'],
        answer: 'Using a credit card number to make an online purchase'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common prevention measure for CNP fraud?',
        options: ['Address verification system (AVS)', 'Cardholder’s signature verification', 'Physical card inspection', 'PIN authentication'],
        answer: 'Address verification system (AVS)'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT typically used to prevent CNP fraud?',
        options: ['CVV code', 'Address verification', 'Card swipe technology', 'Two-factor authentication'],
        answer: 'Card swipe technology'
      },
      {
        type: 'Multiple Choice',
        question: 'Which type of transaction is most vulnerable to CNP fraud?',
        options: ['In-person transactions', 'Mail-order transactions', 'ATM transactions', 'Phone transactions'],
        answer: 'Phone transactions'
      },
      {
        type: 'Multiple Choice',
        question: 'What does CVV stand for in the context of card transactions?',
        options: ['Card Verification Value', 'Credit Verification Vault', 'Card Validity Verification', 'Customer Verification Value'],
        answer: 'Card Verification Value'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a sign of potential CNP fraud in transaction data?',
        options: ['Frequent small transactions', 'A sudden large transaction', 'Consistent spending patterns', 'Regular transactions within usual limits'],
        answer: 'A sudden large transaction'
      },
      {
        type: 'Multiple Choice',
        question: 'Which technology helps in reducing the risk of CNP fraud?',
        options: ['Tokenization', 'Magnetic stripe technology', 'Physical card verification', 'Signature matching'],
        answer: 'Tokenization'
      },
      {
        type: 'Multiple Choice',
        question: 'How can consumers protect themselves from CNP fraud?',
        options: ['Regularly monitoring account statements', 'Using the same password for all accounts', 'Storing card details on multiple websites', 'Sharing card information via email'],
        answer: 'Regularly monitoring account statements'
      },
      {
        type: 'Multiple Choice',
        question: 'What is often used to verify identity in CNP transactions?',
        options: ['Two-factor authentication', 'PIN code', 'Signature', 'Physical card swipe'],
        answer: 'Two-factor authentication'
      },
      {
        type: 'Multiple Choice',
        question: 'Which is an example of a non-CNP transaction?',
        options: ['Swiping a card at a store', 'Making a phone order', 'Using card details for online shopping', 'Entering card information in an email'], 
        answer: 'Swiping a card at a store'
      },
      
    ],
    'Employment scams': [
      {
        type: 'True/False',
        question: 'Employment scams often involve fake job offers to collect personal information from job seekers.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Legitimate employers will always ask for personal information, such as Social Security numbers, in the initial job application.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Employment scams can include job offers that require payment for training or materials.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'A common sign of an employment scam is a job offer without a formal interview process.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Employment scams always involve positions with high salaries for little work.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Employment scams may involve job offers that require you to pay for __________ or materials upfront.',
        options: ['training', 'insurance', 'credentials', 'registration'],
        answer: 'training'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Receiving a job offer without a formal interview process could be a sign of an __________ scam.',
        options: ['employment', 'investment', 'charity', 'insurance'],
        answer: 'employment'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A typical red flag for an employment scam is being asked to provide personal information, such as a __________ number, before you have been hired.',
        options: ['Social Security', 'driver’s license', 'passport', 'credit card'],
        answer: 'Social Security'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Job offers that require you to send money for __________ are likely part of an employment scam.',
        options: ['training', 'benefits', 'taxes', 'insurance'],
        answer: 'training'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Scammers often use __________ job descriptions to attract job seekers and gather their personal information.',
        options: ['vague', 'specific', 'detailed', 'honest'],
        answer: 'vague'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common characteristic of employment scams?',
        options: ['Unrealistically high salaries for minimal work', 'Detailed job descriptions and a formal interview process', 'Request for professional references', 'Requirement for background checks'],
        answer: 'Unrealistically high salaries for minimal work'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do if a job offer requires payment for training or materials?',
        options: ['Pay the required amount to secure the job', 'Research the company and offer to verify its legitimacy', 'Immediately accept the offer without further investigation', 'Ignore the offer and continue job searching'],
        answer: 'Research the company and offer to verify its legitimacy'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action is NOT a sign of an employment scam?',
        options: ['Asking for personal information before a formal interview', 'Providing a detailed job description', 'Offering a job without an interview', 'Requiring payment for job-related materials'],
        answer: 'Providing a detailed job description'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a typical red flag for an employment scam?',
        options: ['An offer of a high salary without any qualifications required', 'A request for a formal interview', 'A job description outlining specific responsibilities', 'A company email address for correspondence'],
        answer: 'An offer of a high salary without any qualifications required'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following might indicate a job offer is a scam?',
        options: ['Requests for personal financial information early in the process', 'Professional communication and a clear job role', 'A thorough interview and onboarding process', 'A legitimate company website'],
        answer: 'Requests for personal financial information early in the process'
      },
      {
        type: 'Multiple Choice',
        question: 'If you receive an unsolicited job offer, what should be your first step?',
        options: ['Accept the offer immediately', 'Verify the legitimacy of the company and offer', 'Provide personal information to the employer', 'Ignore the offer and move on'],
        answer: 'Verify the legitimacy of the company and offer'
      },
      {
        type: 'Multiple Choice',
        question: 'Which is NOT typically involved in an employment scam?',
        options: ['Asking for a fee for job placement', 'Offering a position with vague job responsibilities', 'Requesting a detailed resume', 'Providing a legitimate employment contract'],
        answer: 'Providing a legitimate employment contract'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you be cautious about if a job offer seems too good to be true?',
        options: ['The salary offered', 'The required qualifications', 'The job description', 'The request for personal information upfront'],
        answer: 'The request for personal information upfront'
      },
      {
        type: 'Multiple Choice',
        question: 'What is an unusual practice for a legitimate job offer?',
        options: ['Asking for personal details such as Social Security number before hiring', 'Providing a detailed job description and responsibilities', 'Conducting a formal interview', 'Offering a competitive salary'],
        answer: 'Asking for personal details such as Social Security number before hiring'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of these should NOT be asked before offering a job?',
        options: ['Social Security number', 'Previous job experience', 'References', 'Interview schedule'],
        answer: 'Social Security number'
      },
      
    ],
    'Grandparent scams': [
      {
        type: 'True/False',
        question: 'Grandparent scams typically involve a caller pretending to be a grandchild in distress.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'In grandparent scams, the scammer usually requests money for a supposed emergency.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Grandparent scams often use high-pressure tactics to convince the victim to send money quickly.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Scammers in grandparent scams usually provide detailed and accurate information about the grandchild’s situation.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Grandparent scams are less common now due to increased awareness and preventive measures.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'In a grandparent scam, the caller often pretends to be a __________ who is in urgent need of money.',
        options: ['grandchild', 'friend', 'neighbor', 'colleague'],
        answer: 'grandchild'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'The scammer may use a __________ story to create a sense of urgency and pressure the victim to act quickly.',
        options: ['false', 'true', 'unusual', 'common'],
        answer: 'false'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Grandparent scams often involve requests for money to cover supposed __________ such as medical bills or legal fees.',
        options: ['expenses', 'gifts', 'vacations', 'repairs'],
        answer: 'expenses'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Victims of grandparent scams are often asked to send money via __________ or other untraceable methods.',
        options: ['wire transfer', 'check', 'credit card', 'cash'],
        answer: 'wire transfer'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A common tactic in grandparent scams is to use __________ names or urgent requests to prevent the victim from verifying the story.',
        options: ['fake', 'real', 'common', 'familiar'],
        answer: 'fake'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a typical characteristic of a grandparent scam?',
        options: ['A caller claiming to be a grandchild in urgent need', 'An email offering free gifts', 'A legitimate job offer', 'A survey request'],
        answer: 'A caller claiming to be a grandchild in urgent need'
      },
      {
        type: 'Multiple Choice',
        question: 'Which method is commonly used by scammers in grandparent scams to receive money?',
        options: ['Wire transfer', 'Direct deposit', 'Credit card', 'Check'],
        answer: 'Wire transfer'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a red flag that a call might be a grandparent scam?',
        options: ['The caller asks for personal verification', 'The caller claims to be in a serious emergency', 'The caller provides detailed information about a family member', 'The caller offers a prize or gift'],
        answer: 'The caller claims to be in a serious emergency'
      },
      {
        type: 'Multiple Choice',
        question: 'How should one respond to a suspicious call claiming to be from a grandchild in distress?',
        options: ['Immediately send money', 'Verify the caller’s identity by contacting the grandchild directly', 'Ignore the call and delete it', 'Call the number back to confirm'],
        answer: 'Verify the caller’s identity by contacting the grandchild directly'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a common tactic used by scammers to create urgency in grandparent scams?',
        options: ['Offering a reward for quick action', 'Creating a fake emergency situation', 'Providing a legitimate problem that requires immediate attention', 'Offering a free consultation'],
        answer: 'Creating a fake emergency situation'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following should you NOT do if you suspect a grandparent scam?',
        options: ['Send money quickly to help the supposed grandchild', 'Report the scam to authorities', 'Verify the grandchild’s whereabouts with other family members', 'Be cautious about sharing personal information'],
        answer: 'Send money quickly to help the supposed grandchild'
      },
      {
        type: 'Multiple Choice',
        question: 'What type of information is often exaggerated or fabricated in grandparent scams?',
        options: ['The identity of the grandchild', 'The details of a legitimate emergency', 'The grandchild’s contact information', 'The amount of money needed for an emergency'],
        answer: 'The details of a legitimate emergency'
      },
      {
        type: 'Multiple Choice',
        question: 'Which action can help prevent falling victim to a grandparent scam?',
        options: ['Ignoring all unsolicited calls', 'Confirming the caller’s claims with family members', 'Sending money through untraceable methods', 'Providing personal information to the caller'],
        answer: 'Confirming the caller’s claims with family members'
      },
      {
        type: 'Multiple Choice',
        question: 'What is often used by scammers to sound more convincing in grandparent scams?',
        options: ['Fake urgency and emotional appeal', 'Detailed information about family members', 'A professional tone and formal language', 'A legitimate phone number and address'],
        answer: 'Fake urgency and emotional appeal'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of these is NOT a common element of a grandparent scam?',
        options: ['A call from someone pretending to be a grandchild', 'A request for immediate payment to an unfamiliar bank account', 'A promise of a large reward for your help', 'A verification process involving other family members'],
        answer: 'A verification process involving other family members'
      },
      
    ],
    'Investment fraud': [
      {
        type: 'True/False',
        question: 'Investment fraud involves deceiving investors to gain financial benefits illegally.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Ponzi schemes are a form of investment fraud where returns are paid using new investors money.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Investment fraud always involves physical investment in real estate or stocks.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'A guaranteed high return with no risk is a common indicator of investment fraud.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Investment fraud can be committed through misleading investment opportunities and false information.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A scheme where returns to earlier investors are paid using the capital from newer investors is called a __________.',
        options: ['Ponzi scheme', 'Pyramid scheme', 'Pump-and-dump', 'Shell game'],
        answer: 'Ponzi scheme'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Investment fraud often involves promises of __________ returns with little or no risk.',
        options: ['high', 'low', 'moderate', 'variable'],
        answer: 'high'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'In investment fraud, scammers may use __________ to make their schemes seem more legitimate.',
        options: ['fake testimonials', 'real bank statements', 'official documents', 'public records'],
        answer: 'fake testimonials'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A common red flag for investment fraud is the lack of __________ about how the investment works.',
        options: ['transparency', 'profit', 'risk', 'regulation'],
        answer: 'transparency'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Investors should be cautious of opportunities that involve __________ pressure tactics.',
        options: ['high', 'low', 'no', 'reasonable'],
        answer: 'high'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common tactic used in investment fraud?',
        options: ['Guaranteeing high returns with no risk', 'Providing detailed investment reports', 'Offering transparent fees', 'Regulated investment options'],
        answer: 'Guaranteeing high returns with no risk'
      },
      {
        type: 'Multiple Choice',
        question: 'What is a characteristic feature of a Ponzi scheme?',
        options: ['Using new investor money to pay returns to earlier investors', 'Investing in legitimate business opportunities', 'Providing audited financial statements', 'Offering returns based on market performance'],
        answer: 'Using new investor money to pay returns to earlier investors'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following should raise suspicion about an investment opportunity?',
        options: ['A consistent track record of returns', 'High-pressure sales tactics', 'Transparency about fees and risks', 'Regulatory compliance'],
        answer: 'High-pressure sales tactics'
      },
      {
        type: 'Multiple Choice',
        question: 'What action is advisable if you suspect an investment opportunity might be fraudulent?',
        options: ['Invest as much as possible quickly', 'Research the investment thoroughly', 'Ignore the red flags', 'Accept the offer without question'],
        answer: 'Research the investment thoroughly'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a typical indicator of investment fraud?',
        options: ['Promises of guaranteed returns', 'Vague descriptions of how returns are generated', 'Requests for upfront fees', 'Detailed risk assessments'],
        answer: 'Detailed risk assessments'
      },
      {
        type: 'Multiple Choice',
        question: 'How can investors protect themselves from investment fraud?',
        options: ['Verify the legitimacy of the investment with regulatory authorities', 'Avoid all investments to be safe', 'Only invest in unregulated opportunities', 'Follow unsolicited investment advice'],
        answer: 'Verify the legitimacy of the investment with regulatory authorities'
      },
      {
        type: 'Multiple Choice',
        question: 'Which type of scheme involves falsifying investment performance to attract new investors?',
        options: ['Pump-and-dump', 'Ponzi scheme', 'Pyramid scheme', 'Shell game'],
        answer: 'Pump-and-dump'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a common sign of a fraudulent investment opportunity?',
        options: ['Transparency about how the investment works', 'High returns with little or no risk', 'A strong reputation and regulatory oversight', 'Clear and honest communication'],
        answer: 'High returns with little or no risk'
      },
      {
        type: 'Multiple Choice',
        question: 'What should you do if an investment opportunity seems too good to be true?',
        options: ['Conduct thorough due diligence', 'Invest immediately to secure the opportunity', 'Avoid seeking additional opinions', 'Ignore any concerns'],
        answer: 'Conduct thorough due diligence'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following might be a tactic used in a fraudulent investment scheme?',
        options: ['Offering high returns without explaining the investment strategy', 'Providing a detailed business plan', 'Requiring registration with financial authorities', 'Offering a money-back guarantee'],
        answer: 'Offering high returns without explaining the investment strategy'
      },
      
    ],
    'IP infringement': [
      {
        type: 'True/False',
        question: 'Intellectual Property (IP) infringement occurs when someone uses IP without permission.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'IP infringement only applies to physical copies of intellectual property, not digital copies.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'True/False',
        question: 'Using someone else’s patented invention without authorization is considered IP infringement.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Trademark infringement can occur if a company uses a logo similar to an existing trademarked logo.',
        options: ['True', 'False'],
        answer: 'True'
      },
      {
        type: 'True/False',
        question: 'Copyright infringement is limited to reproducing works but does not include public performance or distribution.',
        options: ['True', 'False'],
        answer: 'False'
      },
      {
        type: 'Fill-in-the-Blank',
        question: '__________ infringement involves unauthorized use of copyrighted material.',
        options: ['Copyright', 'Patent', 'Trademark', 'Design'],
        answer: 'Copyright'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A patent grants the inventor exclusive rights to an invention for a period of __________.',
        options: ['20 years', '10 years', '50 years', '5 years'],
        answer: '20 years'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Trademark infringement can occur when a business uses a mark that is __________ to an existing registered trademark.',
        options: ['confusingly similar', 'exactly the same', 'substantially different', 'legally permitted'],
        answer: 'confusingly similar'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'Copyright protection applies to original works of __________, including literature, music, and art.',
        options: ['authorship', 'invention', 'branding', 'design'],
        answer: 'authorship'
      },
      {
        type: 'Fill-in-the-Blank',
        question: 'A __________ is a legal right granted for an invention that provides exclusive use to the inventor.',
        options: ['patent', 'trademark', 'copyright', 'trade secret'],
        answer: 'patent'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is NOT a type of intellectual property?',
        options: ['Patent', 'Copyright', 'Trademark', 'Financial Security'],
        answer: 'Financial Security'
      },
      {
        type: 'Multiple Choice',
        question: 'What must be proven for a case of copyright infringement?',
        options: ['Unauthorized use of copyrighted material', 'Original creation of material', 'Patent registration', 'Trademark similarity'],
        answer: 'Unauthorized use of copyrighted material'
      },
      {
        type: 'Multiple Choice',
        question: 'Which type of IP protection is used for brand names and logos?',
        options: ['Trademark', 'Patent', 'Copyright', 'Trade secret'],
        answer: 'Trademark'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following can be protected by copyright?',
        options: ['Software algorithms', 'Business methods', 'Literary works', 'Designs'],
        answer: 'Literary works'
      },
      {
        type: 'Multiple Choice',
        question: 'What does a patent protect?',
        options: ['Brand names', 'Inventions', 'Artistic works', 'Trade secrets'],
        answer: 'Inventions'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is an example of IP infringement?',
        options: ['Creating a similar product based on patent information', 'Using a patented invention without permission', 'Designing a new product using public domain information', 'Trademarking an original brand name'],
        answer: 'Using a patented invention without permission'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is typically a defense against IP infringement claims?',
        options: ['Independent creation', 'Use of similar trademarks', 'Unregistered patents', 'Copying copyrighted work'],
        answer: 'Independent creation'
      },
      {
        type: 'Multiple Choice',
        question: 'What can be a consequence of IP infringement?',
        options: ['Legal penalties', 'Financial rewards', 'Patent rights', 'Copyright extensions'],
        answer: 'Legal penalties'
      },
      {
        type: 'Multiple Choice',
        question: 'How long does copyright protection last for works created after January 1, 1978?',
        options: ['Life of the author plus 70 years', '20 years from creation', '50 years from publication', 'Indefinitely'],
        answer: 'Life of the author plus 70 years'
      },
      {
        type: 'Multiple Choice',
        question: 'Which of the following is a method to prevent IP infringement?',
        options: ['Registering the IP with appropriate authorities', 'Keeping IP information secret', 'Ignoring unauthorized use', 'Using IP without protection'],
        answer: 'Registering the IP with appropriate authorities'
      },
      
    ],
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
    color: 'black',
    fontSize: 16,
  },
  categoryButton: {
    backgroundColor: 'green',
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});
