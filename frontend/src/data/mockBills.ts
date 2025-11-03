export interface Bill {
  id: string;
  billNumber: string;
  title: string;
  state: string;
  status: 'Introduced' | 'In Committee' | 'Passed House' | 'Passed Senate' | 'Enacted' | 'Failed';
  dateIntroduced: string;
  lastUpdated: string;
  summary: string;
  scope: string;
  modelsCovered: string;
  keyRequirements: string[];
  sponsor: string;
  originalLink: string;
}

export const mockBills: Bill[] = [
  {
    id: '1',
    billNumber: 'CA AB 2013',
    title: 'Artificial Intelligence: Automated Decision Systems',
    state: 'California',
    status: 'In Committee',
    dateIntroduced: '2024-02-15',
    lastUpdated: '2024-03-20',
    summary: 'This bill establishes comprehensive requirements for developers and deployers of automated decision systems that make consequential decisions affecting Californians. It mandates impact assessments, algorithmic discrimination testing, and public disclosure requirements for high-risk AI systems used in employment, housing, credit, and healthcare contexts.',
    scope: 'Applies to developers and deployers of automated decision systems with annual gross revenues exceeding $50 million that deploy systems making consequential decisions affecting California residents.',
    modelsCovered: 'High-risk automated decision systems, including those used for employment screening, credit decisions, housing applications, healthcare treatment recommendations, and educational admissions.',
    keyRequirements: [
      'Conduct annual algorithmic impact assessments',
      'Perform bias testing across protected demographic groups',
      'Maintain detailed documentation of training data and model architecture',
      'Provide notice to individuals when automated systems are used',
      'Establish human review processes for consequential decisions'
    ],
    sponsor: 'Assembly Member Rebecca Bauer-Kahan',
    originalLink: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013'
  },
  {
    id: '2',
    billNumber: 'NY S 7623',
    title: 'Generative AI Disclosure and Labeling Act',
    state: 'New York',
    status: 'Passed Senate',
    dateIntroduced: '2024-01-10',
    lastUpdated: '2024-03-18',
    summary: 'Requires companies deploying generative AI systems to clearly disclose when content is AI-generated and implement watermarking technologies. The bill aims to combat misinformation and protect consumers from deceptive AI-generated content in commercial contexts.',
    scope: 'Applies to any person or entity operating in New York that deploys generative AI systems for commercial purposes, including content creation, customer service, or marketing.',
    modelsCovered: 'All generative AI models capable of producing text, images, audio, or video content, including large language models, image generators, and deepfake technologies.',
    keyRequirements: [
      'Disclose AI-generated content with clear, conspicuous labels',
      'Implement technical watermarking for AI-generated media',
      'Maintain records of AI system deployments',
      'Provide consumer opt-out mechanisms for AI interactions',
      'Report significant AI-related incidents to the Attorney General'
    ],
    sponsor: 'Senator Brad Hoylman-Sigal',
    originalLink: 'https://www.nysenate.gov/legislation/bills/2023/S7623'
  },
  {
    id: '3',
    billNumber: 'TX HB 2060',
    title: 'AI Model Registration and Transparency Act',
    state: 'Texas',
    status: 'Introduced',
    dateIntroduced: '2024-03-01',
    lastUpdated: '2024-03-01',
    summary: 'Establishes a state registry for AI models deployed by companies operating in Texas. Requires registration of high-risk AI systems and mandates transparency reports detailing model capabilities, limitations, and intended use cases.',
    scope: 'Applies to companies with more than 100 employees that deploy AI models in Texas for decision-making, content generation, or automated services affecting Texas residents.',
    modelsCovered: 'High-risk AI models including those used in critical infrastructure, financial services, healthcare diagnostics, and public safety applications.',
    keyRequirements: [
      'Register high-risk AI models with the Texas Department of Licensing',
      'Submit annual transparency reports',
      'Disclose model training data sources and methodologies',
      'Implement security measures to prevent unauthorized access',
      'Establish incident response procedures'
    ],
    sponsor: 'Representative Giovanni Capriglione',
    originalLink: 'https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=HB2060'
  },
  {
    id: '4',
    billNumber: 'MA H 3123',
    title: 'Algorithmic Accountability and Fairness Act',
    state: 'Massachusetts',
    status: 'In Committee',
    dateIntroduced: '2024-01-20',
    lastUpdated: '2024-03-15',
    summary: 'Creates a framework for algorithmic accountability requiring companies to assess and mitigate discriminatory impacts of AI systems. Establishes enforcement mechanisms through the Attorney General\'s office and provides private right of action for affected individuals.',
    scope: 'Applies to entities deploying algorithmic decision-making systems in Massachusetts that affect access to opportunities, services, or benefits, with revenues exceeding $25 million annually.',
    modelsCovered: 'All algorithmic decision-making systems, including machine learning models, rule-based systems, and AI-powered tools used in employment, lending, insurance, housing, and education.',
    keyRequirements: [
      'Conduct disparate impact assessments before deployment',
      'Implement ongoing monitoring for discriminatory outcomes',
      'Provide meaningful explanations of automated decisions',
      'Establish appeals processes for adverse decisions',
      'Submit compliance reports to the Attorney General'
    ],
    sponsor: 'Representative Kay Khan',
    originalLink: 'https://malegislature.gov/Bills/193/H3123'
  },
  {
    id: '5',
    billNumber: 'FL SB 1204',
    title: 'AI in Education Safety Act',
    state: 'Florida',
    status: 'Passed House',
    dateIntroduced: '2024-02-05',
    lastUpdated: '2024-03-22',
    summary: 'Regulates the use of AI systems in K-12 educational settings, requiring parental consent, data privacy protections, and prohibiting certain uses of AI for student surveillance or behavioral prediction without explicit authorization.',
    scope: 'Applies to public and private K-12 schools, educational technology vendors, and any entity providing AI-powered educational tools or services to Florida students.',
    modelsCovered: 'AI systems used in educational contexts including adaptive learning platforms, student monitoring tools, automated grading systems, and predictive analytics for student performance.',
    keyRequirements: [
      'Obtain parental consent before using AI systems with student data',
      'Prohibit AI-based surveillance without explicit authorization',
      'Ensure data privacy and limit data retention to necessary periods',
      'Provide transparency about AI system capabilities and limitations',
      'Conduct annual privacy and safety audits'
    ],
    sponsor: 'Senator Shevrin Jones',
    originalLink: 'https://www.flsenate.gov/Session/Bill/2024/1204'
  },
  {
    id: '6',
    billNumber: 'WA HB 1951',
    title: 'AI Risk Management Framework Act',
    state: 'Washington',
    status: 'Enacted',
    dateIntroduced: '2023-11-15',
    lastUpdated: '2024-03-10',
    summary: 'Establishes a comprehensive risk management framework for AI systems deployed in Washington, aligned with NIST AI Risk Management Framework. Requires risk assessments, documentation, and ongoing monitoring of AI systems based on risk tier classification.',
    scope: 'Applies to all entities deploying AI systems in Washington for commercial purposes, with enhanced requirements for high-risk applications affecting critical decisions or vulnerable populations.',
    modelsCovered: 'All AI systems, with tiered requirements based on risk level: high-risk (employment, credit, healthcare), medium-risk (customer service, marketing), and low-risk (general productivity tools).',
    keyRequirements: [
      'Classify AI systems by risk tier using state-provided framework',
      'Conduct risk assessments proportional to system risk level',
      'Implement governance structures for AI oversight',
      'Maintain documentation of AI system lifecycle',
      'Report high-risk system deployments to state authorities'
    ],
    sponsor: 'Representative Vandana Slatter',
    originalLink: 'https://app.leg.wa.gov/billsummary?BillNumber=1951&Year=2023'
  },
  {
    id: '7',
    billNumber: 'IL SB 2892',
    title: 'Biometric AI Regulation Act',
    state: 'Illinois',
    status: 'In Committee',
    dateIntroduced: '2024-02-28',
    lastUpdated: '2024-03-19',
    summary: 'Extends Illinois\' existing biometric privacy law to specifically address AI systems that process biometric data, including facial recognition, voice analysis, and gait recognition technologies. Strengthens consent requirements and establishes strict data retention limits.',
    scope: 'Applies to any private entity operating in Illinois that uses AI systems to collect, store, or analyze biometric identifiers or biometric information.',
    modelsCovered: 'AI systems that process biometric data including facial recognition, emotion detection, voice identification, fingerprint analysis, iris scanning, and behavioral biometrics.',
    keyRequirements: [
      'Obtain written consent before collecting biometric data',
      'Provide detailed disclosure of AI system capabilities',
      'Limit biometric data retention to specific, stated purposes',
      'Implement strong security measures for biometric data',
      'Provide data deletion mechanisms upon request'
    ],
    sponsor: 'Senator Robert Peters',
    originalLink: 'https://www.ilga.gov/legislation/BillStatus.asp?DocNum=2892&GAID=17&DocTypeID=SB&SessionID=112'
  },
  {
    id: '8',
    billNumber: 'CO HB 24-1008',
    title: 'AI Consumer Protection Act',
    state: 'Colorado',
    status: 'Introduced',
    dateIntroduced: '2024-03-05',
    lastUpdated: '2024-03-05',
    summary: 'Establishes consumer protection standards for AI systems, requiring clear disclosure of AI use, prohibiting deceptive AI practices, and creating enforcement mechanisms through the Colorado Attorney General. Focuses on protecting consumers from AI-powered fraud and manipulation.',
    scope: 'Applies to businesses operating in Colorado that use AI systems in consumer-facing applications, including e-commerce, customer service, financial services, and marketing.',
    modelsCovered: 'AI systems used in consumer interactions including chatbots, recommendation engines, pricing algorithms, fraud detection systems, and personalization tools.',
    keyRequirements: [
      'Disclose AI use in consumer interactions',
      'Prohibit AI systems designed to deceive or manipulate consumers',
      'Ensure AI pricing algorithms comply with anti-discrimination laws',
      'Provide human escalation options for AI-driven customer service',
      'Maintain records of AI system decision-making processes'
    ],
    sponsor: 'Representative Brianna Titone',
    originalLink: 'https://leg.colorado.gov/bills/hb24-1008'
  },
  {
    id: '9',
    billNumber: 'CA SB 1047',
    title: 'Safe and Secure Innovation for Frontier Artificial Intelligence Models Act',
    state: 'California',
    status: 'Failed',
    dateIntroduced: '2024-02-01',
    lastUpdated: '2024-03-25',
    summary: 'Would have required developers of large-scale AI models to implement safety protocols, conduct pre-deployment testing, and maintain "kill switch" capabilities. The bill targeted frontier models with computing power exceeding 10^26 FLOPS and aimed to prevent catastrophic harms from advanced AI systems.',
    scope: 'Applied to developers of covered models (those using more than 10^26 FLOPS in training) operating in California or deploying models to California residents.',
    modelsCovered: 'Frontier AI models including large language models, multimodal models, and other advanced AI systems exceeding the computational threshold, particularly those capable of autonomous operation or critical decision-making.',
    keyRequirements: [
      'Implement safety and security protocols before deployment',
      'Conduct red-team testing for potential misuse scenarios',
      'Maintain ability to shut down model operations',
      'Report critical safety incidents to state authorities',
      'Obtain third-party safety audits for covered models'
    ],
    sponsor: 'Senator Scott Wiener',
    originalLink: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1047'
  },
  {
    id: '10',
    billNumber: 'VA HB 2339',
    title: 'Automated Decision-Making in Employment Act',
    state: 'Virginia',
    status: 'In Committee',
    dateIntroduced: '2024-01-18',
    lastUpdated: '2024-03-12',
    summary: 'Regulates the use of automated decision-making systems in employment contexts, including hiring, promotion, and termination decisions. Requires employers to disclose the use of such systems to applicants and employees and mandates annual bias audits.',
    scope: 'Applies to employers with 15 or more employees operating in Virginia that use automated systems to make or substantially assist in employment decisions.',
    modelsCovered: 'Automated employment decision tools including resume screening software, video interview analysis systems, predictive performance models, and algorithmic scheduling systems.',
    keyRequirements: [
      'Disclose use of automated systems to job applicants',
      'Conduct annual independent bias audits',
      'Provide alternative evaluation methods upon request',
      'Maintain human oversight of automated decisions',
      'Document and retain audit results for three years'
    ],
    sponsor: 'Delegate Schuyler VanValkenburg',
    originalLink: 'https://lis.virginia.gov/cgi-bin/legp604.exe?241+sum+HB2339'
  },
  {
    id: '11',
    billNumber: 'NJ A 4909',
    title: 'Algorithmic Discrimination Prevention Act',
    state: 'New Jersey',
    status: 'Introduced',
    dateIntroduced: '2024-02-22',
    lastUpdated: '2024-02-22',
    summary: 'Prohibits discriminatory algorithmic decision-making in housing, credit, employment, and public accommodations. Establishes a private right of action for individuals harmed by algorithmic discrimination and creates an Algorithmic Accountability Office within the Attorney General\'s office.',
    scope: 'Applies to any person or entity using algorithmic decision-making systems in New Jersey that affect access to housing, credit, employment, insurance, education, or public accommodations.',
    modelsCovered: 'All algorithmic systems used for consequential decisions, including machine learning models, statistical models, and rule-based systems that process personal data to make predictions or classifications.',
    keyRequirements: [
      'Conduct impact assessments before deploying systems',
      'Test for discriminatory outcomes across protected classes',
      'Provide notice of algorithmic decision-making to affected individuals',
      'Maintain documentation of system design and validation',
      'Register high-risk systems with the Algorithmic Accountability Office'
    ],
    sponsor: 'Assemblyman Raj Mukherji',
    originalLink: 'https://www.njleg.state.nj.us/bill-search/2024/A4909'
  },
  {
    id: '12',
    billNumber: 'CT HB 6705',
    title: 'Concerning Artificial Intelligence and Data Privacy',
    state: 'Connecticut',
    status: 'Passed House',
    dateIntroduced: '2024-01-25',
    lastUpdated: '2024-03-14',
    summary: 'Amends Connecticut\'s data privacy law to specifically address AI systems that process personal data. Requires data controllers to conduct data protection impact assessments for AI systems and provides consumers with rights regarding automated decision-making.',
    scope: 'Applies to data controllers and processors operating in Connecticut that use AI systems to process personal data of Connecticut residents.',
    modelsCovered: 'AI systems that process personal data for profiling, automated decision-making, or targeted advertising, including recommendation systems, credit scoring models, and behavioral prediction tools.',
    keyRequirements: [
      'Conduct data protection impact assessments for AI systems',
      'Provide consumers right to opt out of automated decisions',
      'Disclose logic and significance of automated processing',
      'Implement appropriate safeguards for sensitive data processing',
      'Maintain records of AI system processing activities'
    ],
    sponsor: 'Representative James Maroney',
    originalLink: 'https://www.cga.ct.gov/asp/cgabillstatus/cgabillstatus.asp?selBillType=Bill&which_year=2024&bill_num=6705'
  },
  {
    id: '13',
    billNumber: 'OR SB 1571',
    title: 'Facial Recognition Technology Regulation Act',
    state: 'Oregon',
    status: 'In Committee',
    dateIntroduced: '2024-02-08',
    lastUpdated: '2024-03-16',
    summary: 'Establishes strict regulations on the use of facial recognition technology by government agencies and private entities. Prohibits real-time facial recognition in public spaces without a warrant and requires transparency reports from entities deploying such systems.',
    scope: 'Applies to all government agencies and private entities operating in Oregon that use facial recognition technology for identification, verification, or surveillance purposes.',
    modelsCovered: 'Facial recognition systems, facial analysis tools, emotion detection systems, and any biometric identification technology that analyzes facial features or expressions.',
    keyRequirements: [
      'Obtain warrant for real-time facial recognition in public spaces',
      'Publish annual transparency reports on system usage',
      'Conduct accuracy testing across demographic groups',
      'Implement data retention limits and deletion protocols',
      'Provide notice when facial recognition is used in commercial settings'
    ],
    sponsor: 'Senator Floyd Prozanski',
    originalLink: 'https://olis.oregonlegislature.gov/liz/2024R1/Measures/Overview/SB1571'
  },
  {
    id: '14',
    billNumber: 'MI HB 5842',
    title: 'Automated Vehicle Decision Systems Transparency Act',
    state: 'Michigan',
    status: 'Introduced',
    dateIntroduced: '2024-03-03',
    lastUpdated: '2024-03-03',
    summary: 'Requires manufacturers of autonomous vehicles to disclose information about the decision-making algorithms used in their vehicles. Mandates reporting of incidents involving automated driving systems and establishes safety standards for AI-driven vehicle operations.',
    scope: 'Applies to manufacturers, operators, and testers of autonomous vehicles operating on Michigan roads, including vehicles with Level 3, 4, or 5 automation capabilities.',
    modelsCovered: 'Automated driving systems, perception models, path planning algorithms, and decision-making systems used in autonomous vehicles, including sensor fusion and object detection models.',
    keyRequirements: [
      'Register automated driving systems with the Secretary of State',
      'Report all incidents involving autonomous vehicle systems',
      'Disclose training data sources and validation methodologies',
      'Maintain cybersecurity protections for vehicle systems',
      'Provide transparency about decision-making logic in safety-critical situations'
    ],
    sponsor: 'Representative Yousef Rabhi',
    originalLink: 'https://www.legislature.mi.gov/documents/2023-2024/billintroduced/House/htm/2024-HIB-5842.htm'
  },
  {
    id: '15',
    billNumber: 'PA SB 1121',
    title: 'Predictive Policing Accountability Act',
    state: 'Pennsylvania',
    status: 'In Committee',
    dateIntroduced: '2024-01-30',
    lastUpdated: '2024-03-08',
    summary: 'Regulates the use of predictive policing algorithms and risk assessment tools by law enforcement agencies. Requires transparency, bias testing, and community oversight of algorithmic tools used in criminal justice contexts.',
    scope: 'Applies to all law enforcement agencies in Pennsylvania that use algorithmic tools for crime prediction, resource allocation, risk assessment, or investigative purposes.',
    modelsCovered: 'Predictive policing algorithms, recidivism risk assessment tools, crime forecasting models, and any algorithmic system used to inform law enforcement decisions or resource deployment.',
    keyRequirements: [
      'Obtain approval from local governing body before deploying systems',
      'Conduct annual bias and accuracy audits',
      'Publish transparency reports on system usage and outcomes',
      'Establish community oversight mechanisms',
      'Prohibit use of facial recognition without probable cause'
    ],
    sponsor: 'Senator Sharif Street',
    originalLink: 'https://www.legis.state.pa.us/cfdocs/billinfo/billinfo.cfm?syear=2023&sind=0&body=S&type=B&bn=1121'
  },
  {
    id: '16',
    billNumber: 'MN HF 4400',
    title: 'Health Care Algorithm Transparency and Accountability Act',
    state: 'Minnesota',
    status: 'Passed House',
    dateIntroduced: '2024-02-12',
    lastUpdated: '2024-03-21',
    summary: 'Requires healthcare providers and insurers to disclose the use of algorithmic tools in clinical decision-making and coverage determinations. Mandates validation studies and establishes patient rights regarding automated healthcare decisions.',
    scope: 'Applies to healthcare providers, health plans, and health care clearinghouses operating in Minnesota that use algorithmic tools for diagnosis, treatment recommendations, or coverage decisions.',
    modelsCovered: 'Clinical decision support systems, diagnostic algorithms, treatment recommendation engines, risk stratification tools, and utilization management algorithms used in healthcare settings.',
    keyRequirements: [
      'Disclose use of algorithms in clinical decision-making to patients',
      'Conduct clinical validation studies before deployment',
      'Monitor for disparate health outcomes across patient populations',
      'Provide patients right to request human review of algorithmic decisions',
      'Submit annual reports to the Department of Health'
    ],
    sponsor: 'Representative Tina Liebling',
    originalLink: 'https://www.revisor.mn.gov/bills/bill.php?b=House&f=HF4400&ssn=0&y=2024'
  },
  {
    id: '17',
    billNumber: 'AZ HB 2770',
    title: 'Deepfake Prevention and Disclosure Act',
    state: 'Arizona',
    status: 'Introduced',
    dateIntroduced: '2024-01-15',
    lastUpdated: '2024-03-05',
    summary: 'Criminalizes the creation and distribution of malicious deepfakes and requires disclosure labels for synthetic media in political advertising. Establishes civil remedies for individuals harmed by deepfake content and creates enforcement mechanisms.',
    scope: 'Applies to any person or entity creating, distributing, or publishing synthetic media in Arizona, with enhanced penalties for deepfakes used in elections, fraud, or harassment.',
    modelsCovered: 'Generative AI models capable of creating synthetic media including deepfake videos, voice cloning systems, face-swap technologies, and AI-generated images or audio of real persons.',
    keyRequirements: [
      'Label synthetic media with clear disclosure statements',
      'Prohibit deepfakes intended to deceive or defraud',
      'Require disclosure in political advertising using synthetic media',
      'Establish takedown procedures for malicious deepfakes',
      'Create civil liability for harmful deepfake distribution'
    ],
    sponsor: 'Representative Alexander Kolodin',
    originalLink: 'https://apps.azleg.gov/BillStatus/BillOverview/82770'
  },
  {
    id: '18',
    billNumber: 'GA HB 986',
    title: 'Insurance Algorithm Fairness Act',
    state: 'Georgia',
    status: 'In Committee',
    dateIntroduced: '2024-02-20',
    lastUpdated: '2024-03-11',
    summary: 'Regulates the use of algorithmic models in insurance underwriting, pricing, and claims processing. Prohibits discriminatory algorithms and requires insurers to validate models for fairness and accuracy across demographic groups.',
    scope: 'Applies to all insurance companies licensed in Georgia that use algorithmic models for underwriting, rating, claims handling, or fraud detection.',
    modelsCovered: 'Insurance algorithms including pricing models, risk assessment tools, claims prediction systems, fraud detection algorithms, and underwriting decision support systems.',
    keyRequirements: [
      'Validate algorithms for discriminatory impact before use',
      'Submit model documentation to the Insurance Commissioner',
      'Conduct annual fairness audits of algorithmic systems',
      'Provide explanations of algorithmic decisions to policyholders',
      'Maintain human oversight of automated underwriting decisions'
    ],
    sponsor: 'Representative Teri Anulewicz',
    originalLink: 'https://www.legis.ga.gov/legislation/64583'
  },
  {
    id: '19',
    billNumber: 'NC SB 678',
    title: 'Student Data and Educational Technology Privacy Act',
    state: 'North Carolina',
    status: 'Passed Senate',
    dateIntroduced: '2024-01-22',
    lastUpdated: '2024-03-17',
    summary: 'Strengthens privacy protections for student data processed by educational technology, including AI-powered learning platforms. Prohibits behavioral profiling of students and restricts the use of student data for commercial purposes.',
    scope: 'Applies to educational technology providers, school districts, and any entity providing digital learning tools or services to North Carolina K-12 students.',
    modelsCovered: 'Educational AI systems including adaptive learning platforms, automated tutoring systems, student behavior monitoring tools, and predictive analytics for academic performance.',
    keyRequirements: [
      'Obtain parental consent for AI-powered educational tools',
      'Prohibit sale or sharing of student data for commercial purposes',
      'Limit data collection to educational purposes only',
      'Implement strong data security and encryption measures',
      'Delete student data upon request or when no longer needed'
    ],
    sponsor: 'Senator Graig Meyer',
    originalLink: 'https://www.ncleg.gov/BillLookUp/2023/S678'
  },
  {
    id: '20',
    billNumber: 'MD HB 1202',
    title: 'Tenant Screening Algorithm Regulation Act',
    state: 'Maryland',
    status: 'Introduced',
    dateIntroduced: '2024-02-28',
    lastUpdated: '2024-02-28',
    summary: 'Regulates the use of algorithmic tenant screening tools by landlords and property management companies. Requires disclosure of screening criteria, prohibits discriminatory algorithms, and establishes tenant rights regarding automated rental decisions.',
    scope: 'Applies to landlords, property managers, and tenant screening companies operating in Maryland that use algorithmic tools to evaluate rental applications.',
    modelsCovered: 'Tenant screening algorithms, rental risk assessment models, eviction prediction tools, and any automated system used to evaluate prospective tenants or determine rental eligibility.',
    keyRequirements: [
      'Disclose use of algorithmic screening to rental applicants',
      'Provide adverse action notices with specific reasons for denial',
      'Test algorithms for discriminatory impact on protected classes',
      'Allow applicants to dispute inaccurate algorithmic assessments',
      'Maintain human review option for all rental decisions'
    ],
    sponsor: 'Delegate Jheanelle Wilkins',
    originalLink: 'https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/HB1202'
  },
  {
    id: '21',
    billNumber: 'WI AB 789',
    title: 'Agricultural AI and Precision Farming Data Act',
    state: 'Wisconsin',
    status: 'In Committee',
    dateIntroduced: '2024-01-12',
    lastUpdated: '2024-03-09',
    summary: 'Establishes data ownership rights for farmers using AI-powered precision agriculture tools. Requires agricultural technology companies to provide transparency about data usage and prohibits sale of farm data without explicit consent.',
    scope: 'Applies to agricultural technology providers offering AI-powered tools, sensors, or analytics platforms to Wisconsin farmers, including precision agriculture and farm management systems.',
    modelsCovered: 'Agricultural AI systems including crop yield prediction models, soil analysis algorithms, automated irrigation systems, livestock monitoring tools, and farm management decision support systems.',
    keyRequirements: [
      'Recognize farmer ownership of agricultural data',
      'Obtain explicit consent before sharing or selling farm data',
      'Provide transparency about AI model training and data usage',
      'Allow farmers to access and delete their data',
      'Prohibit discriminatory pricing based on algorithmic analysis'
    ],
    sponsor: 'Representative Travis Tranel',
    originalLink: 'https://docs.legis.wisconsin.gov/2023/proposals/ab789'
  },
  {
    id: '22',
    billNumber: 'NV SB 405',
    title: 'Gaming and Casino AI Regulation Act',
    state: 'Nevada',
    status: 'Introduced',
    dateIntroduced: '2024-02-14',
    lastUpdated: '2024-03-13',
    summary: 'Regulates the use of AI systems in gaming establishments, including player tracking, behavior analysis, and automated game management. Requires Gaming Control Board approval for AI systems and mandates responsible gaming protections.',
    scope: 'Applies to all licensed gaming establishments in Nevada that use AI systems for player tracking, game management, security, or marketing purposes.',
    modelsCovered: 'Gaming AI systems including player behavior analysis tools, problem gambling detection algorithms, facial recognition for player tracking, and automated game management systems.',
    keyRequirements: [
      'Obtain Gaming Control Board approval before deploying AI systems',
      'Implement responsible gaming protections in AI algorithms',
      'Conduct bias testing to prevent discriminatory treatment',
      'Provide transparency about player tracking and profiling',
      'Establish data privacy protections for player information'
    ],
    sponsor: 'Senator Dina Neal',
    originalLink: 'https://www.leg.state.nv.us/App/NELIS/REL/83rd2025/Bill/10405/Overview'
  },
  {
    id: '23',
    billNumber: 'RI H 7890',
    title: 'Automated Content Moderation Transparency Act',
    state: 'Rhode Island',
    status: 'In Committee',
    dateIntroduced: '2024-01-28',
    lastUpdated: '2024-03-06',
    summary: 'Requires social media platforms to disclose their use of automated content moderation systems and provide transparency about algorithmic enforcement of community standards. Establishes appeal rights for users affected by automated moderation decisions.',
    scope: 'Applies to social media platforms with more than 1 million Rhode Island users that use automated systems for content moderation, recommendation, or enforcement actions.',
    modelsCovered: 'Content moderation algorithms, hate speech detection systems, misinformation classifiers, and automated enforcement tools used to remove, demote, or flag user-generated content.',
    keyRequirements: [
      'Publish transparency reports on automated moderation systems',
      'Provide human review option for automated content decisions',
      'Disclose error rates and accuracy metrics for moderation algorithms',
      'Establish timely appeals process for content removal',
      'Report bias testing results across content categories'
    ],
    sponsor: 'Representative David Morales',
    originalLink: 'http://webserver.rilegislature.gov/BillText/BillText24/HouseText24/H7890.pdf'
  },
  {
    id: '24',
    billNumber: 'UT HB 456',
    title: 'Consumer Credit Algorithm Fairness Act',
    state: 'Utah',
    status: 'Passed House',
    dateIntroduced: '2024-02-06',
    lastUpdated: '2024-03-19',
    summary: 'Regulates the use of alternative data and machine learning models in consumer credit decisions. Requires lenders to validate models for fairness and provide consumers with explanations of credit decisions made by algorithmic systems.',
    scope: 'Applies to lenders, credit bureaus, and fintech companies operating in Utah that use algorithmic models or alternative data sources for credit underwriting or scoring.',
    modelsCovered: 'Credit scoring models, alternative credit assessment algorithms, loan approval systems, and any machine learning model used to evaluate creditworthiness or determine lending terms.',
    keyRequirements: [
      'Validate credit algorithms for disparate impact',
      'Provide consumers with explanations of algorithmic credit decisions',
      'Test models for accuracy across demographic groups',
      'Disclose use of alternative data sources in credit decisions',
      'Establish dispute resolution process for algorithmic errors'
    ],
    sponsor: 'Representative Steve Eliason',
    originalLink: 'https://le.utah.gov/~2024/bills/static/HB0456.html'
  },
  {
    id: '25',
    billNumber: 'VT SB 289',
    title: 'Environmental Impact Assessment for Data Centers Act',
    state: 'Vermont',
    status: 'In Committee',
    dateIntroduced: '2024-01-19',
    lastUpdated: '2024-03-07',
    summary: 'Requires environmental impact assessments for large-scale data centers used for AI model training and deployment. Addresses energy consumption, water usage, and carbon emissions associated with AI infrastructure.',
    scope: 'Applies to data center operators in Vermont with facilities exceeding 1 megawatt of power consumption, particularly those used for AI model training or large-scale machine learning operations.',
    modelsCovered: 'Infrastructure supporting AI model training, large language model deployment, and high-performance computing for machine learning applications.',
    keyRequirements: [
      'Conduct environmental impact assessments before construction',
      'Report annual energy consumption and carbon emissions',
      'Implement renewable energy sources for AI operations',
      'Establish water conservation measures for cooling systems',
      'Contribute to state clean energy fund based on usage'
    ],
    sponsor: 'Senator Christopher Bray',
    originalLink: 'https://legislature.vermont.gov/bill/status/2024/S.289'
  },
  {
    id: '26',
    billNumber: 'HI HB 1567',
    title: 'Tourism and Hospitality AI Disclosure Act',
    state: 'Hawaii',
    status: 'Introduced',
    dateIntroduced: '2024-02-10',
    lastUpdated: '2024-03-04',
    summary: 'Requires hotels, resorts, and tourism operators to disclose their use of AI systems for dynamic pricing, customer service, and guest monitoring. Establishes consumer protection standards for AI-driven hospitality services.',
    scope: 'Applies to hotels, resorts, vacation rentals, and tourism operators in Hawaii that use AI systems for pricing, reservations, customer service, or guest experience management.',
    modelsCovered: 'Dynamic pricing algorithms, chatbot customer service systems, guest behavior analysis tools, and recommendation engines used in hospitality and tourism contexts.',
    keyRequirements: [
      'Disclose use of AI in pricing and reservation systems',
      'Provide human customer service option alongside AI chatbots',
      'Prohibit discriminatory pricing based on algorithmic profiling',
      'Implement data privacy protections for guest information',
      'Establish transparency about AI-driven personalization'
    ],
    sponsor: 'Representative Sean Quinlan',
    originalLink: 'https://www.capitol.hawaii.gov/measure_indiv.aspx?billtype=HB&billnumber=1567&year=2024'
  },
  {
    id: '27',
    billNumber: 'KY SB 234',
    title: 'Coal Mining Safety and Automation Standards Act',
    state: 'Kentucky',
    status: 'In Committee',
    dateIntroduced: '2024-01-24',
    lastUpdated: '2024-03-15',
    summary: 'Establishes safety standards for automated and AI-assisted mining equipment. Requires human oversight of autonomous mining operations and mandates safety testing for AI systems used in hazardous mining environments.',
    scope: 'Applies to coal mining operators in Kentucky that use automated equipment, autonomous vehicles, or AI-powered safety monitoring systems in mining operations.',
    modelsCovered: 'Autonomous mining equipment, AI-powered safety monitoring systems, predictive maintenance algorithms, and automated hazard detection tools used in mining operations.',
    keyRequirements: [
      'Maintain human supervision of automated mining equipment',
      'Conduct safety testing of AI systems in mining environments',
      'Implement fail-safe mechanisms for autonomous equipment',
      'Report AI-related safety incidents to mining regulators',
      'Provide worker training on AI-assisted mining systems'
    ],
    sponsor: 'Senator Phillip Wheeler',
    originalLink: 'https://apps.legislature.ky.gov/record/24rs/sb234.html'
  },
  {
    id: '28',
    billNumber: 'LA HB 623',
    title: 'Oil and Gas AI Safety and Environmental Monitoring Act',
    state: 'Louisiana',
    status: 'Introduced',
    dateIntroduced: '2024-02-16',
    lastUpdated: '2024-03-02',
    summary: 'Requires oil and gas operators to use AI-powered environmental monitoring systems and establishes standards for automated leak detection and safety monitoring. Mandates reporting of AI system failures that could impact environmental safety.',
    scope: 'Applies to oil and gas operators in Louisiana that use AI systems for environmental monitoring, leak detection, or safety management in extraction and refining operations.',
    modelsCovered: 'Environmental monitoring algorithms, leak detection systems, predictive maintenance models for oil and gas infrastructure, and AI-powered safety monitoring tools.',
    keyRequirements: [
      'Deploy AI-powered leak detection systems at facilities',
      'Report AI system failures affecting environmental safety',
      'Conduct regular accuracy testing of monitoring algorithms',
      'Maintain human oversight of automated safety systems',
      'Integrate AI monitoring data with state environmental databases'
    ],
    sponsor: 'Representative Mandie Landry',
    originalLink: 'https://legis.la.gov/legis/BillInfo.aspx?i=245623'
  },
  {
    id: '29',
    billNumber: 'ME LD 1890',
    title: 'Lobster Fishing and Marine AI Technology Act',
    state: 'Maine',
    status: 'In Committee',
    dateIntroduced: '2024-01-31',
    lastUpdated: '2024-03-10',
    summary: 'Regulates the use of AI and automated systems in commercial fishing, including vessel automation, catch monitoring, and marine resource management. Establishes standards for AI-assisted fishing gear and requires environmental impact assessments.',
    scope: 'Applies to commercial fishing operators in Maine waters that use AI-powered navigation, automated fishing gear, or algorithmic catch monitoring systems.',
    modelsCovered: 'Marine navigation algorithms, automated fishing gear systems, catch prediction models, and AI-powered marine resource management tools.',
    keyRequirements: [
      'Register AI-powered fishing equipment with Marine Resources',
      'Conduct environmental impact assessments for automated gear',
      'Maintain human control of vessel navigation systems',
      'Report catch data from AI monitoring systems',
      'Implement safeguards to prevent overfishing by automated systems'
    ],
    sponsor: 'Senator Eloise Vitelli',
    originalLink: 'https://legislature.maine.gov/LawMakerWeb/summary.asp?ID=280084567'
  },
  {
    id: '30',
    billNumber: 'TN HB 2145',
    title: 'Music Industry AI and Copyright Protection Act',
    state: 'Tennessee',
    status: 'Passed House',
    dateIntroduced: '2024-02-03',
    lastUpdated: '2024-03-23',
    summary: 'Protects musicians and artists from unauthorized AI replication of their voices, likenesses, and musical styles. Establishes civil remedies for AI-generated content that mimics artists without permission and requires disclosure of AI-generated music.',
    scope: 'Applies to any person or entity creating, distributing, or selling AI-generated music or voice content in Tennessee, particularly content that replicates identifiable artists.',
    modelsCovered: 'Voice cloning systems, music generation models, style transfer algorithms, and any AI system capable of replicating an artist\'s voice, musical style, or performance characteristics.',
    keyRequirements: [
      'Obtain consent before using AI to replicate artist voices or styles',
      'Label AI-generated music clearly and conspicuously',
      'Establish civil liability for unauthorized AI replication',
      'Provide takedown mechanisms for infringing AI content',
      'Protect artist personality rights in AI training data'
    ],
    sponsor: 'Representative William Lamberth',
    originalLink: 'https://wapp.capitol.tn.gov/apps/BillInfo/Default.aspx?BillNumber=HB2145'
  },
  {
    id: '31',
    billNumber: 'OH SB 178',
    title: 'Manufacturing Automation and Worker Protection Act',
    state: 'Ohio',
    status: 'In Committee',
    dateIntroduced: '2024-01-17',
    lastUpdated: '2024-03-12',
    summary: 'Establishes safety standards for AI-powered manufacturing automation and requires manufacturers to provide worker retraining programs when implementing automated systems. Mandates safety certifications for collaborative robots and AI-assisted manufacturing equipment.',
    scope: 'Applies to manufacturing facilities in Ohio that deploy AI-powered automation, collaborative robots, or automated quality control systems affecting worker roles or safety.',
    modelsCovered: 'Manufacturing automation systems, collaborative robots (cobots), predictive maintenance algorithms, quality control vision systems, and AI-powered production optimization tools.',
    keyRequirements: [
      'Conduct safety assessments before deploying automation systems',
      'Provide worker retraining programs for displaced employees',
      'Implement safety certifications for collaborative robots',
      'Maintain human oversight of automated production lines',
      'Report automation-related workplace incidents'
    ],
    sponsor: 'Senator Theresa Gavarone',
    originalLink: 'https://www.legislature.ohio.gov/legislation/135/sb178'
  },
  {
    id: '32',
    billNumber: 'IN HB 1456',
    title: 'Agricultural Commodity Trading Algorithm Regulation Act',
    state: 'Indiana',
    status: 'Introduced',
    dateIntroduced: '2024-02-21',
    lastUpdated: '2024-03-01',
    summary: 'Regulates the use of algorithmic trading systems in agricultural commodity markets to prevent market manipulation and protect farmers. Requires registration of high-frequency trading algorithms and establishes circuit breakers for AI-driven market volatility.',
    scope: 'Applies to commodity trading firms, agricultural exchanges, and financial institutions using algorithmic trading systems for agricultural commodities in Indiana markets.',
    modelsCovered: 'High-frequency trading algorithms, price prediction models, automated market-making systems, and AI-powered commodity trading strategies.',
    keyRequirements: [
      'Register algorithmic trading systems with state regulators',
      'Implement circuit breakers for AI-driven price volatility',
      'Monitor for market manipulation by trading algorithms',
      'Provide transparency about algorithmic trading strategies',
      'Establish farmer protection mechanisms against algorithmic manipulation'
    ],
    sponsor: 'Representative Don Lehe',
    originalLink: 'https://iga.in.gov/legislative/2024/bills/house/1456'
  },
  {
    id: '33',
    billNumber: 'MO HB 2089',
    title: 'Child Welfare AI Decision Support Systems Act',
    state: 'Missouri',
    status: 'In Committee',
    dateIntroduced: '2024-01-26',
    lastUpdated: '2024-03-14',
    summary: 'Regulates the use of AI-powered risk assessment tools in child welfare and foster care systems. Requires validation studies, bias testing, and human oversight of algorithmic recommendations regarding child placement and family services.',
    scope: 'Applies to state and county child welfare agencies in Missouri that use algorithmic risk assessment tools or AI-powered decision support systems for child protection cases.',
    modelsCovered: 'Child welfare risk assessment algorithms, foster care placement matching systems, family reunification prediction models, and AI tools used in child protection investigations.',
    keyRequirements: [
      'Validate algorithms for accuracy and fairness before deployment',
      'Conduct bias testing across racial and socioeconomic groups',
      'Maintain human decision-making authority in all cases',
      'Provide transparency about algorithmic factors in assessments',
      'Establish independent oversight of AI system performance'
    ],
    sponsor: 'Representative Keri Ingle',
    originalLink: 'https://house.mo.gov/Bill.aspx?bill=HB2089&year=2024&code=R'
  },
  {
    id: '34',
    billNumber: 'SC SB 789',
    title: 'Port Automation and Maritime AI Safety Act',
    state: 'South Carolina',
    status: 'Introduced',
    dateIntroduced: '2024-02-09',
    lastUpdated: '2024-03-08',
    summary: 'Establishes safety standards for automated port operations and AI-powered maritime logistics systems. Requires human oversight of autonomous cargo handling equipment and mandates cybersecurity protections for port automation systems.',
    scope: 'Applies to port authorities and maritime operators in South Carolina that use automated cargo handling equipment, AI-powered logistics systems, or autonomous vessels.',
    modelsCovered: 'Port automation systems, autonomous cargo handling equipment, AI-powered logistics optimization tools, and automated vessel traffic management systems.',
    keyRequirements: [
      'Maintain human supervision of automated cargo operations',
      'Implement cybersecurity protections for port automation systems',
      'Conduct safety testing of autonomous equipment',
      'Report automation-related incidents to maritime authorities',
      'Establish worker safety protocols for human-robot interaction'
    ],
    sponsor: 'Senator Chip Campsen',
    originalLink: 'https://www.scstatehouse.gov/sess125_2023-2024/bills/789.htm'
  },
  {
    id: '35',
    billNumber: 'IA SF 2234',
    title: 'Precision Agriculture Data Cooperative Act',
    state: 'Iowa',
    status: 'Passed Senate',
    dateIntroduced: '2024-01-23',
    lastUpdated: '2024-03-20',
    summary: 'Establishes a farmer-owned data cooperative for agricultural AI and precision farming data. Provides farmers with collective bargaining power over their data and creates standards for agricultural AI transparency and data portability.',
    scope: 'Applies to agricultural technology companies providing AI-powered precision farming tools, sensors, or analytics platforms to Iowa farmers.',
    modelsCovered: 'Precision agriculture AI systems including crop yield prediction models, soil analysis algorithms, weather forecasting tools, and farm management decision support systems.',
    keyRequirements: [
      'Support farmer data portability between platforms',
      'Provide transparency about AI model training and data usage',
      'Allow farmers to participate in data cooperative governance',
      'Prohibit sale of farmer data without cooperative consent',
      'Establish fair compensation for agricultural data contributions'
    ],
    sponsor: 'Senator Tim Kraayenbrink',
    originalLink: 'https://www.legis.iowa.gov/legislation/BillBook?ga=90&ba=SF2234'
  },
  {
    id: '36',
    billNumber: 'KS HB 2567',
    title: 'Autonomous Agricultural Equipment Safety Act',
    state: 'Kansas',
    status: 'In Committee',
    dateIntroduced: '2024-02-13',
    lastUpdated: '2024-03-11',
    summary: 'Establishes safety standards for autonomous tractors, harvesters, and other self-driving agricultural equipment. Requires operator training, safety certifications, and liability insurance for autonomous farm machinery.',
    scope: 'Applies to manufacturers and operators of autonomous agricultural equipment in Kansas, including self-driving tractors, automated harvesters, and AI-powered farm machinery.',
    modelsCovered: 'Autonomous navigation systems for farm equipment, automated harvesting algorithms, field mapping and planning systems, and AI-powered agricultural machinery control systems.',
    keyRequirements: [
      'Obtain safety certification for autonomous farm equipment',
      'Provide operator training for autonomous machinery',
      'Maintain liability insurance for autonomous equipment operations',
      'Implement fail-safe mechanisms and emergency stop systems',
      'Report accidents involving autonomous agricultural equipment'
    ],
    sponsor: 'Representative Ken Rahjes',
    originalLink: 'http://www.kslegislature.org/li/b2023_24/measures/hb2567/'
  },
  {
    id: '37',
    billNumber: 'NE LB 890',
    title: 'Livestock Monitoring and Animal Welfare AI Act',
    state: 'Nebraska',
    status: 'Introduced',
    dateIntroduced: '2024-01-29',
    lastUpdated: '2024-03-06',
    summary: 'Regulates the use of AI-powered livestock monitoring systems and establishes animal welfare standards for automated farming operations. Requires validation of AI health monitoring systems and mandates veterinary oversight of algorithmic health assessments.',
    scope: 'Applies to livestock operations in Nebraska that use AI-powered monitoring systems for animal health, behavior analysis, or automated feeding and care systems.',
    modelsCovered: 'Livestock health monitoring algorithms, behavior analysis systems, automated feeding systems, and AI-powered disease detection tools for cattle, pigs, and poultry.',
    keyRequirements: [
      'Validate AI health monitoring systems with veterinary oversight',
      'Maintain human supervision of automated animal care systems',
      'Implement animal welfare safeguards in AI algorithms',
      'Report AI system failures affecting animal health',
      'Provide transparency about algorithmic health assessments'
    ],
    sponsor: 'Senator Tim Gragert',
    originalLink: 'https://nebraskalegislature.gov/bills/view_bill.php?DocumentID=52890'
  },
  {
    id: '38',
    billNumber: 'OK HB 3456',
    title: 'Energy Grid AI and Cybersecurity Standards Act',
    state: 'Oklahoma',
    status: 'In Committee',
    dateIntroduced: '2024-02-07',
    lastUpdated: '2024-03-13',
    summary: 'Establishes cybersecurity and reliability standards for AI systems used in electric grid management and energy distribution. Requires utilities to implement safeguards against AI-related grid failures and cyberattacks on automated energy systems.',
    scope: 'Applies to electric utilities and grid operators in Oklahoma that use AI-powered systems for load balancing, demand forecasting, or automated grid management.',
    modelsCovered: 'Energy demand forecasting models, automated load balancing systems, predictive maintenance algorithms for grid infrastructure, and AI-powered renewable energy integration tools.',
    keyRequirements: [
      'Implement cybersecurity protections for AI grid management systems',
      'Conduct reliability testing of automated energy systems',
      'Maintain human oversight of critical grid operations',
      'Report AI-related grid incidents to state regulators',
      'Establish backup systems for AI failures'
    ],
    sponsor: 'Representative Mark McBride',
    originalLink: 'http://www.oklegislature.gov/BillInfo.aspx?Bill=HB3456&Session=2400'
  },
  {
    id: '39',
    billNumber: 'AR SB 567',
    title: 'Poultry Industry Automation and Worker Safety Act',
    state: 'Arkansas',
    status: 'Introduced',
    dateIntroduced: '2024-01-20',
    lastUpdated: '2024-03-09',
    summary: 'Establishes safety standards for automated poultry processing equipment and AI-powered quality control systems. Requires worker safety training and mandates human oversight of automated processing lines.',
    scope: 'Applies to poultry processing facilities in Arkansas that use automated equipment, AI-powered quality control systems, or robotic processing technology.',
    modelsCovered: 'Automated poultry processing systems, AI-powered quality inspection tools, robotic cutting and deboning equipment, and predictive maintenance algorithms for processing machinery.',
    keyRequirements: [
      'Conduct safety assessments of automated processing equipment',
      'Provide worker safety training for human-robot interaction',
      'Maintain human oversight of automated processing lines',
      'Implement emergency stop systems for automated equipment',
      'Report automation-related workplace injuries'
    ],
    sponsor: 'Senator Bart Hester',
    originalLink: 'https://www.arkleg.state.ar.us/Bills/Detail?id=SB567&ddBienniumSession=2023%2F2024R'
  },
  {
    id: '40',
    billNumber: 'MS HB 1234',
    title: 'Healthcare Provider AI Liability and Malpractice Act',
    state: 'Mississippi',
    status: 'In Committee',
    dateIntroduced: '2024-02-11',
    lastUpdated: '2024-03-16',
    summary: 'Establishes liability standards for healthcare providers using AI-powered diagnostic and treatment tools. Clarifies malpractice responsibilities when AI systems are involved in clinical decisions and requires disclosure of AI use to patients.',
    scope: 'Applies to healthcare providers, hospitals, and clinics in Mississippi that use AI-powered diagnostic tools, treatment recommendation systems, or clinical decision support algorithms.',
    modelsCovered: 'Medical diagnostic AI systems, treatment recommendation algorithms, clinical decision support tools, and AI-powered medical imaging analysis systems.',
    keyRequirements: [
      'Disclose use of AI systems in clinical decision-making to patients',
      'Maintain professional liability insurance covering AI-assisted care',
      'Establish clear liability standards for AI-related medical errors',
      'Require physician oversight of AI diagnostic recommendations',
      'Document AI system involvement in medical records'
    ],
    sponsor: 'Representative Sam Creekmore',
    originalLink: 'http://billstatus.ls.state.ms.us/2024/pdf/history/HB/HB1234.xml'
  },
  {
    id: '41',
    billNumber: 'AL HB 456',
    title: 'Automated Vehicle Testing and Deployment Act',
    state: 'Alabama',
    status: 'Passed House',
    dateIntroduced: '2024-01-16',
    lastUpdated: '2024-03-21',
    summary: 'Establishes a regulatory framework for testing and deploying autonomous vehicles on Alabama roads. Requires safety certifications, insurance requirements, and incident reporting for companies testing self-driving vehicles.',
    scope: 'Applies to manufacturers and operators testing or deploying autonomous vehicles on Alabama public roads, including passenger vehicles, commercial trucks, and delivery robots.',
    modelsCovered: 'Autonomous vehicle navigation systems, perception and sensor fusion algorithms, path planning models, and decision-making systems for self-driving vehicles.',
    keyRequirements: [
      'Obtain testing permits from the Department of Transportation',
      'Maintain minimum liability insurance for autonomous vehicles',
      'Report all incidents involving autonomous vehicle systems',
      'Provide safety driver during testing phase',
      'Submit annual safety reports on autonomous vehicle performance'
    ],
    sponsor: 'Representative Wes Allen',
    originalLink: 'http://alisondb.legislature.state.al.us/ALISON/SearchableInstruments/2024RS/bills/HB456.htm'
  },
  {
    id: '42',
    billNumber: 'WV SB 345',
    title: 'Coal Mine Automation and Employment Transition Act',
    state: 'West Virginia',
    status: 'In Committee',
    dateIntroduced: '2024-02-04',
    lastUpdated: '2024-03-10',
    summary: 'Addresses the impact of mining automation on coal industry employment. Requires mining companies to provide advance notice of automation plans, offer retraining programs, and contribute to a worker transition fund when implementing AI-powered mining systems.',
    scope: 'Applies to coal mining operators in West Virginia that implement automated mining equipment, autonomous vehicles, or AI-powered extraction systems that affect employment levels.',
    modelsCovered: 'Autonomous mining equipment, AI-powered extraction optimization systems, automated safety monitoring tools, and robotic mining machinery.',
    keyRequirements: [
      'Provide 180-day advance notice of automation implementation',
      'Offer retraining programs for displaced miners',
      'Contribute to state worker transition fund',
      'Maintain safety standards for automated mining operations',
      'Report employment impacts of automation to state regulators'
    ],
    sponsor: 'Senator Eric Tarr',
    originalLink: 'http://www.wvlegislature.gov/Bill_Status/bills_text.cfm?billdoc=SB345%20INTR.htm&yr=2024&sesstype=RS&i=345'
  }
];