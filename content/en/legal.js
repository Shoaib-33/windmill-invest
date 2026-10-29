// English translation of content/legal.js (legal pages, document section 13). Drafts with placeholders; a lawyer signs off before launch.
export default [
  {
    slug: '/privacyverklaring/',
    group: 'legal',
    template: 'legal',
    nav: `Privacy statement`,
    seoTitle: `Privacy statement │ Windmill Invest`,
    meta: `Windmill Invest privacy statement: which personal data we process, for what purposes, how long we keep it and which rights you have under the GDPR.`,
    h1: `Windmill Invest privacy statement`,
    keyword: `Windmill Invest privacy statement`,
    secondary: [`Windmill Invest privacy policy`, `personal data`, `GDPR`, `retention periods`],
    form: null,
    related: ['/cookiebeleid/', '/algemene-voorwaarden/', '/contact/'],
    eyebrow: `Legal`,
    intro: `This Windmill Invest privacy statement explains which personal data we process when you visit our website, complete a form or contact us in any other way, and why we do so. It also explains how long we keep your data and which rights you have under the General Data Protection Regulation (GDPR; in Dutch: Algemene verordening gegevensbescherming, AVG).`,
    heroPoints: [],
    version: `28 October 2026`,
    sections: [
      {
        h: `About the Windmill Invest privacy statement`,
        blocks: [
          { p: `This Windmill Invest privacy statement applies to all personal data that we process via the website {{domain}}, via our request and contact forms, by email and telephone, and in our contact with (prospective) sellers, investors, clients, tenants and business relations. Personal data is any information that says something about you as a person or that can be traced back to you, such as your name, your telephone number or the address of a property that you offer to us.` },
          { p: `We handle your data with care. We do not process more data than is necessary for the purpose for which we received it, and we comply with the GDPR and other applicable laws and regulations. For cookies and similar technologies, please also refer to our [cookie policy](/cookiebeleid/).` },
        ],
      },
      {
        h: `Who is responsible for your data`,
        blocks: [
          { p: `The controller within the meaning of the GDPR is {{legalName}}, located at {{address}} and registered with the Chamber of Commerce (Kamer van Koophandel, KvK) under number {{kvk}}. In this privacy statement we also refer to ourselves as ‘Windmill Invest’, ‘we’ or ‘us’.` },
          { p: `Do you have a question about this privacy statement or about the way we handle your data? Please contact us at {{email}} or {{phone}}, or write to {{legalName}}, {{address}}.` },
        ],
      },
      {
        h: `Which personal data we process`,
        blocks: [
          { p: `Which data we process depends on the form you complete and on the service for which you contact us. You may leave fields that are not marked as mandatory empty.` },
          {
            table: {
              head: [`Type of data`, `Examples`, `When we process this data`],
              rows: [
                [`Contact details`, `Name, email address, telephone number and, where applicable, your address and the way in which you wish to be contacted`, `With every form and when you contact us by email or telephone`],
                [`Property details`, `Address and postcode of the property, type of property, owner-occupied or let, state of maintenance, any rental details and photos or documents you send us`, `With a request to sell a home, a let home or a commercial property, with an indicative valuation and with requests for management or development`],
                [`Investor criteria`, `Budget range, preferred regions, desired type of property, investment horizon and whether you invest as a private individual or through a company`, `With the investor form and with acquisition support`],
                [`Information about your situation`, `Information you share yourself, for example about an inheritance, a divorce or the desired timeframe for the sale`, `If you mention that information in a form, an email or a conversation`],
                [`Correspondence and notes of conversations`, `The content of your messages and notes of conversations about your request`, `In all contact with us`],
                [`Data for agreements and administration`, `Names of owners or representatives, company details, bank account number and invoicing and payment details`, `If we enter into or perform an agreement with you`],
                [`Tenant data`, `Name, contact details, rent and payment details of tenants`, `With property management and with the purchase of let property`],
                [`Technical data`, `IP address, browser and device type, pages visited and cookie IDs`, `When you visit the website, as described in our cookie policy`],
              ],
            },
          },
        ],
      },
      {
        h: `Sensitive information and minors`,
        blocks: [
          { p: `When property is sold, personal circumstances sometimes play a role, such as a death, a divorce or financial concerns. If you share anything about this with us, we use that information only to handle your request carefully and appropriately. We do not share it any further than necessary.` },
          { p: `We do not ask for special categories of personal data, such as data concerning your health, nor for your citizen service number (burgerservicenummer, BSN). Please therefore do not include such data in a free-text field. If a copy of an identity document is required for a transaction, for example for the civil-law notary (notaris), we will agree with you how to provide it securely, with your BSN masked.` },
          { p: `Our website and services are not intended for persons under the age of 16. We do not knowingly process personal data of persons under the age of 16 without the consent of a parent or guardian. If you believe that we have received data of someone under the age of 16 without that consent, please contact us. We will then delete that data.` },
        ],
      },
      {
        h: `Why we process your data and on what legal basis`,
        blocks: [
          { p: `We process personal data only if there is a legal basis for doing so under the GDPR. The table shows the legal basis we rely on for each purpose.` },
          {
            table: {
              head: [`Purpose`, `Legal basis`],
              rows: [
                [`Assessing your request, contacting you and providing you with an indicative assessment or a non-binding proposal`, `Taking steps at your request prior to entering into a contract (Article 6(1)(b) GDPR)`],
                [`Entering into and performing an agreement, such as a purchase agreement, a management agreement or an engagement for acquisition support`, `Performance of a contract (Article 6(1)(b) GDPR)`],
                [`Informing you as an investor about opportunities that match the criteria you have specified`, `Taking steps at your request prior to entering into a contract (Article 6(1)(b) GDPR)`],
                [`Engaging a partner, such as a civil-law notary or valuer, where this is necessary for your request or agreement`, `Performance of a contract or taking steps prior to entering into a contract (Article 6(1)(b) GDPR); in other cases your consent (Article 6(1)(a) GDPR)`],
                [`Sending newsletters and other marketing messages`, `Consent (Article 6(1)(a) GDPR); you can unsubscribe with every message`],
                [`Placing and reading analytical cookies and marketing cookies`, `Consent (Article 6(1)(a) GDPR and Article 11.7a of the Dutch Telecommunications Act (Telecommunicatiewet))`],
                [`Following up on earlier contact, for example if a property is not a fit now but may be of interest later, and improving our services`, `Legitimate interest (Article 6(1)(f) GDPR)`],
                [`Securing the website and our systems and preventing misuse, spam and fraud`, `Legitimate interest (Article 6(1)(f) GDPR)`],
                [`Handling complaints, settling disputes and establishing, exercising or defending our rights`, `Legitimate interest (Article 6(1)(f) GDPR)`],
                [`Keeping records and complying with legal obligations, such as the statutory tax retention obligation`, `Legal obligation (Article 6(1)(c) GDPR)`],
              ],
              note: `Where we rely on a legitimate interest, we weigh that interest against your privacy interest. You can always object to processing on this legal basis. We need the data marked as mandatory in a form in order to handle your request; without that data we cannot help you properly.`,
            },
          },
        ],
      },
      {
        h: `With whom we share data: processors`,
        blocks: [
          { p: `We engage service providers that process personal data on our behalf. These are processors within the meaning of the GDPR. We enter into a data processing agreement with them, which states that they may use your data only in accordance with our instructions and must secure it properly. This concerns the following categories:` },
          {
            ul: [
              `hosting and IT service providers for our website, servers and back-ups;`,
              `suppliers of our CRM system, in which we manage requests and contacts;`,
              `suppliers of email, calendar and communication services;`,
              `suppliers of form and website tools through which you submit a request to us;`,
              `providers of analytics services, only insofar as you have consented to analytical cookies;`,
              `suppliers of accounting and administration software.`,
            ],
          },
          { p: `These processors may not use your data for their own purposes.` },
        ],
      },
      {
        h: `Partners and other recipients`,
        blocks: [
          { p: `For certain parts of a transaction or project we work with independent partners, such as a civil-law notary, registered valuer (register-taxateur), building surveyor, tax adviser, lawyer, contractor, architect, installation engineer, energy adviser or structural engineer. We share your data with a partner only if this is necessary for your request or for the performance of an agreement, or if you have given your consent. In that case we share no more data than the partner needs for its work.` },
          { p: `In most cases these partners are themselves controllers of the data they receive. Their processing is governed by their own privacy statement. A civil-law notary, for example, has their own legal obligations in the transfer of property.` },
          { p: `In addition, we provide data to third parties if we are legally obliged to do so, for example to the Dutch Tax and Customs Administration (Belastingdienst) or pursuant to a court ruling.` },
        ],
      },
      {
        h: `We do not sell your data`,
        blocks: [
          { p: `Windmill Invest does not sell, rent out or trade your personal data. Nor do we make your data available to third parties for their own marketing.` },
        ],
      },
      {
        h: `Transfers outside the European Economic Area`,
        blocks: [
          { p: `We aim to have your data processed within the European Economic Area (EEA). However, some service providers are established outside the EEA or process part of the data there. We transfer personal data to a country outside the EEA only if appropriate safeguards apply, such as an adequacy decision of the European Commission or standard contractual clauses adopted by the European Commission, supplemented with additional measures where necessary.` },
          { p: `Would you like to know which safeguards we have put in place? Please contact us at {{email}}.` },
        ],
      },
      {
        h: `How long we keep your data`,
        blocks: [
          { p: `We do not keep personal data for longer than is necessary for the purpose for which we process it, or for as long as the law requires. We apply the following retention periods.` },
          {
            table: {
              head: [`Data`, `Retention period`],
              rows: [
                [`Requests and contact details without follow-up (no agreement has been concluded)`, `A maximum of 24 months after the last contact`],
                [`Data required for an agreement`, `For as long as the agreement runs and thereafter for as long as necessary for its settlement, subject to the statutory retention periods`],
                [`Records, such as invoices, agreements and other documents relevant for tax purposes`, `7 years, under the statutory tax retention obligation; data relating to immovable property 10 years`],
                [`Complaints and their handling`, `For as long as necessary for the handling and thereafter a maximum of 24 months`],
                [`Data for newsletters and marketing messages`, `Until you unsubscribe or withdraw your consent`],
                [`Cookie data`, `Varies per cookie; see the cookie policy and the cookie settings`],
              ],
              note: `If there is a dispute or ongoing proceedings, we may keep the data needed for that purpose for longer, until the matter has been concluded. At the end of the retention period we delete or anonymise your data.`,
            },
          },
        ],
      },
      {
        h: `Your rights`,
        blocks: [
          { p: `Under the GDPR you have the following rights with regard to your personal data:` },
          {
            ul: [
              `**Right of access**: you can request which personal data we process about you and receive a copy of it.`,
              `**Right to rectification**: you can have incorrect or incomplete data corrected or completed.`,
              `**Right to erasure**: you can ask us to erase your data, unless we still need it, for example because of a statutory retention obligation.`,
              `**Right to restriction of processing**: you can ask us to temporarily restrict the use of your data, for example while we assess a request for correction.`,
              `**Right to data portability**: you can receive the data that you have provided to us yourself and that we process by automated means on the basis of your consent or an agreement in a commonly used format, or have it transmitted to another party.`,
              `**Right to object**: you can object to processing based on legitimate interest. You can always object to the use of your data for direct marketing; we will then stop doing so.`,
              `**Right to withdraw consent**: if you have given consent, you can withdraw it at any time. This does not affect the processing that took place before you withdrew your consent.`,
            ],
          },
          { p: `You exercise your rights by sending an email to {{email}}. To prevent us from providing data to the wrong person, we may ask you to verify your identity. Please do not send a copy of your identity document unless asked. We will respond within one month of receiving your request. For complex requests or a large number of requests, this period may be extended by two months; in that case we will let you know within the first month.` },
        ],
      },
      {
        h: `Lodging a complaint with the Dutch Data Protection Authority`,
        blocks: [
          { p: `Are you not satisfied with the way we handle your personal data? Please let us know first, so that we can look for a solution together. You can read how we handle complaints in our [complaints procedure](/klachten-en-disclosures/).` },
          { p: `In addition, you always have the right to lodge a complaint with the supervisory authority, the Dutch Data Protection Authority (Autoriteit Persoonsgegevens). You can do so via autoriteitpersoonsgegevens.nl.` },
        ],
      },
      {
        h: `How we secure your data`,
        blocks: [
          { p: `We take appropriate technical and organisational measures to protect your data against loss, unauthorised access and other unlawful use. These include:` },
          {
            ul: [
              `an encrypted connection (https) for our website and forms;`,
              `access to personal data only for staff who need that data for their work;`,
              `secured accounts, with two-step verification where possible;`,
              `data processing agreements with service providers that process data on our behalf;`,
              `regular back-ups and timely software updates.`,
            ],
          },
          { p: `Despite these measures, a security incident can never be ruled out entirely. If a personal data breach occurs, we act in accordance with the data breach notification obligation: we report the breach to the Autoriteit Persoonsgegevens where the law requires this, and we inform you if the breach is likely to result in a high risk to you.` },
        ],
      },
      {
        h: `No automated decision-making`,
        blocks: [
          { p: `We do not take decisions based solely on automated processing, including profiling, that produce legal effects concerning you or similarly significantly affect you. We may use digital tools to organise requests or summarise information about a property, but the assessment of your request and any decision about it always rests with a member of staff.` },
        ],
      },
      {
        h: `Links to other websites`,
        blocks: [
          { p: `Our website may contain links to websites of others, such as government bodies or partners. We are not responsible for the way in which those parties handle personal data. For that, please read the privacy statement of the website concerned.` },
        ],
      },
      {
        h: `Changes to the Windmill Invest privacy statement`,
        blocks: [
          { p: `We may amend this privacy statement, for example if our services or the law change. The date at the top of this page shows when the text was last updated. In the event of important changes that affect you directly, we will actively inform you of them where possible. We recommend that you consult this page regularly.` },
          { p: `Do you have questions about this privacy statement? Please contact us at {{email}} or {{phone}}, or use our [contact page](/contact/). The other arrangements that apply to the use of our website and services are set out in our [general terms and conditions](/algemene-voorwaarden/).` },
        ],
      },
    ],
    faq: [],
    cta: { title: `Questions about your data?`, text: `Would you like to access, correct or erase your data, or do you have a question about this privacy statement? Please contact us.`, button: `Contact us` },
  },

  {
    slug: '/cookiebeleid/',
    group: 'legal',
    template: 'legal',
    nav: `Cookie policy`,
    seoTitle: `Cookie policy │ Windmill Invest`,
    meta: `The Windmill Invest cookie policy: which functional, analytical and marketing cookies we use, when we ask for consent and how you make your choice.`,
    h1: `Windmill Invest cookie policy`,
    keyword: `Windmill Invest cookie policy`,
    secondary: [`cookies`, `cookie settings`, `cookie consent`],
    form: null,
    related: ['/privacyverklaring/', '/algemene-voorwaarden/', '/contact/'],
    eyebrow: `Legal`,
    intro: `This Windmill Invest cookie policy explains which cookies and similar technologies we use on our website and for what purpose. It also explains when we ask for your consent and how you can change or withdraw your choice at any time.`,
    heroPoints: [],
    version: `28 October 2026`,
    sections: [
      {
        h: `What are cookies`,
        blocks: [
          { p: `Cookies are small text files that are stored on your computer, tablet or phone when you visit a website. On a subsequent visit, the website, or another party, can read those files again. Similar technologies, such as pixels, scripts and local storage in your browser, work in a comparable way. In the Windmill Invest cookie policy we refer to all these technologies together as ‘cookies’.` },
          { p: `Some cookies are placed by us. Others are placed by an external party, for example a provider of analytics or advertising services. We call these third-party cookies.` },
        ],
      },
      {
        h: `Which cookies Windmill Invest uses`,
        blocks: [
          { p: `In the Windmill Invest cookie policy we distinguish between three types of cookies.` },
          {
            ul: [
              `**Functional cookies** — These cookies are necessary for the website to work properly and securely. For example, they ensure that forms are sent correctly, that the website is protected against spam and misuse and that your cookie choice is remembered. No consent is required for functional cookies.`,
              `**Analytical cookies** — These cookies show us how visitors use our website, for example which pages are visited often and where visitors drop off. We use those insights to improve the website. We place analytical cookies only with your consent and, where possible, configure them in a privacy-friendly way.`,
              `**Marketing cookies** — These cookies allow us and our advertising partners to measure whether an advertisement is effective and to better tailor advertisements to your interests, including on other websites. Your browsing behaviour may be tracked across multiple websites in the process. We place marketing cookies only with your consent.`,
            ],
          },
        ],
      },
      {
        h: `Overview of the cookie categories`,
        blocks: [
          { p: `The table shows, for each category, the purpose, an example and whether we ask for your consent.` },
          {
            table: {
              head: [`Category`, `Purpose`, `Example`, `Consent required`, `Retention period`],
              rows: [
                [`Functional cookies`, `Making the website work, securing it and remembering your cookie choice`, `A cookie that records which categories of cookies you have accepted or refused`, `No`, `Varies per cookie; see the cookie settings`],
                [`Analytical cookies`, `Measuring how visitors use the website, in order to improve the website`, `Counting page visits and measuring through which pages visitors complete a form`, `Yes`, `Varies per cookie; see the cookie settings`],
                [`Marketing cookies`, `Measuring advertisements and tailoring them to your interests, including on other websites`, `An advertising pixel that measures whether a visit via an advertisement leads to a request`, `Yes`, `Varies per cookie; see the cookie settings`],
              ],
              note: `The cookie settings contain an up-to-date overview of the individual cookies, with the provider, the purpose and the retention period of each cookie.`,
            },
          },
        ],
      },
      {
        h: `Consent under the Dutch Telecommunications Act`,
        blocks: [
          { p: `Under Article 11.7a of the Dutch Telecommunications Act (Telecommunicatiewet), a website may only store information on your device or read information from it if you have been clearly informed about this and have given your consent. This does not apply to cookies that are strictly necessary for the website to work. In addition, there is a statutory exemption for analytical cookies that have little or no impact on your privacy.` },
          { p: `Windmill Invest always asks for your consent in advance for analytical cookies and marketing cookies, via a cookie banner on your first visit. These cookies are placed only after you have given your consent. Refusing is just as easy as accepting, and you can choose per category.` },
          { p: `Even if you do not give consent, you can use our website. Only elements that depend on third-party cookies, such as embedded videos or maps, may then not be displayed.` },
          { p: `If personal data is processed by means of cookies, the General Data Protection Regulation (GDPR; in Dutch: Algemene verordening gegevensbescherming, AVG) also applies. You can read how we handle personal data in our [privacy statement](/privacyverklaring/).` },
        ],
      },
      {
        h: `Analytical cookies, as privacy-friendly as possible`,
        blocks: [
          { p: `Even for analytical cookies for which we ask consent, we limit the impact on your privacy as much as possible. Where the service used allows this, we configure analytical cookies so that:` },
          {
            ul: [
              `IP addresses are shortened or anonymised;`,
              `the provider may not use the data for its own purposes or share it with others;`,
              `a data processing agreement has been concluded with the provider;`,
              `the data is not combined with other data in order to identify you as a person;`,
              `the data is not kept for longer than necessary.`,
            ],
          },
        ],
      },
      {
        h: `Third-party cookies`,
        blocks: [
          { p: `Analytical cookies and marketing cookies are usually placed by external providers. Those parties may process the data they collect through cookies partly under their own responsibility, on the basis of their own privacy statement and cookie policy. We do not have full control over what they do with that data. That is why we place these cookies only with your consent.` },
          { p: `Some providers process data outside the European Economic Area. This happens only with appropriate safeguards, as described in our [privacy statement](/privacyverklaring/).` },
        ],
      },
      {
        h: `Changing or withdrawing your consent`,
        blocks: [
          { p: `You decide which cookies you allow, and you can always change your choice. Withdrawing your consent is just as easy as giving it. Your choice is stored per browser and per device; on another device you will therefore make a choice again.` },
          {
            ol: [
              `**Open the cookie settings.** Click the ‘Cookie settings’ link at the bottom of every page of our website. You will then see, per category, which choice you made previously.`,
              `**Change your choice.** Switch categories on or off and save your choice. If you withdraw your consent, we will no longer place cookies from that category from that moment on. This does not affect processing that has already taken place.`,
              `**Delete previously placed cookies.** You can delete cookies that are already on your device via your browser settings. Your browser's help function explains how to do this. After deletion, we will ask for your preference again on your next visit.`,
              `**Block cookies via your browser.** In most browsers you can set cookies to be refused or to receive a notification before a cookie is placed. If you block all cookies, some parts of the website may not work properly, such as sending a form.`,
            ],
          },
        ],
      },
      {
        h: `Changes to the Windmill Invest cookie policy`,
        blocks: [
          { p: `We may amend this cookie policy, for example if we start using new cookies or if the rules change. The date at the top of this page shows when the text was last updated. If we start using cookies that require consent and that are not yet covered by your previous choice, we will ask for your consent again.` },
          { p: `You can read more about your rights, such as the right of access and erasure, in our privacy statement. Our [general terms and conditions](/algemene-voorwaarden/) apply to any other use of our website. If you have a question about the Windmill Invest cookie policy, please email {{email}} or use our [contact page](/contact/). If you are dissatisfied with anything, you can use our [complaints procedure](/klachten-en-disclosures/).` },
        ],
      },
    ],
    faq: [],
    cta: { title: `Change your cookie choice?`, text: `You can change your choice via the ‘Cookie settings’ link at the bottom of every page. If you have another question about cookies or privacy, please contact us.`, button: `Contact us` },
  },

  {
    slug: '/algemene-voorwaarden/',
    group: 'legal',
    template: 'legal',
    nav: `General terms and conditions`,
    seoTitle: `General terms and conditions │ Windmill Invest`,
    meta: `The Windmill Invest general terms and conditions for our website and services: non-binding proposals, indicative assessments, purchases and liability.`,
    h1: `Windmill Invest general terms and conditions`,
    keyword: `Windmill Invest terms and conditions`,
    secondary: [`Windmill Invest terms`, `liability`, `governing law`],
    form: null,
    related: ['/privacyverklaring/', '/klachten-en-disclosures/', '/contact/'],
    eyebrow: `Legal`,
    intro: `These Windmill Invest general terms and conditions apply to the use of our website and to all requests, proposals and services of Windmill Invest. Among other things, they describe when an arrangement is binding, what you may expect from an indicative assessment and how liability and complaints are dealt with.`,
    heroPoints: [],
    version: `28 October 2026`,
    sections: [
      {
        h: `Article 1. Definitions`,
        blocks: [
          { p: `In these general terms and conditions, the following terms have the meanings set out below:` },
          {
            ul: [
              `**Windmill Invest**, ‘we’ or ‘us’: {{legalName}}, located at {{address}} and registered with the Chamber of Commerce (Kamer van Koophandel, KvK) under number {{kvk}}.`,
              `**Website**: the website {{domain}}, including all underlying pages.`,
              `**User** or ‘you’: any natural person or legal entity that visits the website, submits a request, contacts Windmill Invest in any other way or enters into an agreement with Windmill Invest.`,
              `**Consumer**: a user who is a natural person and is not acting in the course of a profession or business.`,
              `**Request**: a request from the user, via a form on the website, by email, by telephone or in any other way, for example for an indicative assessment, a proposal or information about a service.`,
              `**Proposal**: an indication, offer, quotation or other proposal from Windmill Invest, whether oral or written.`,
              `**Indicative valuation**: a broad estimate of the value or the possibilities of a property based on available information, which is not a formal valuation (taxatie).`,
              `**Agreement**: a written agreement between Windmill Invest and the user, such as a purchase agreement, a management agreement or a confirmation of engagement.`,
              `**Services**: all activities of Windmill Invest, including the purchase of property, acquisition support for investors, development and value improvement, property and rental management, and advisory and transaction support.`,
              `**Partner**: an independent third party with whom Windmill Invest works, such as a civil-law notary (notaris), registered valuer (register-taxateur), building surveyor, tax adviser, lawyer, contractor, architect, installation engineer, energy adviser or structural engineer.`,
              `**In writing**: on paper or by electronic means, such as by email or with an electronic signature.`,
            ],
          },
        ],
      },
      {
        h: `Article 2. Applicability of the Windmill Invest general terms and conditions`,
        blocks: [
          { p: `2.1 These Windmill Invest general terms and conditions apply to the use of the website, to all requests and proposals and to all agreements and services of Windmill Invest, unless otherwise agreed in writing.` },
          { p: `2.2 If an agreement contains provisions that deviate from these general terms and conditions, the provisions of that agreement prevail. The other provisions of these general terms and conditions then continue to apply.` },
          { p: `2.3 General terms and conditions or purchasing conditions of the user do not apply, unless Windmill Invest has expressly accepted them in writing.` },
          { p: `2.4 We make these general terms and conditions available to you before or when an agreement is concluded, in a way that allows you to store and consult them. On request, we will send them to you free of charge.` },
          { p: `2.5 If a provision of these general terms and conditions is null and void or is annulled, the remaining provisions remain in full force. The provision concerned will then be replaced by a valid provision that reflects the intention of the original provision as closely as possible.` },
        ],
      },
      {
        h: `Article 3. Information on the website`,
        blocks: [
          { p: `3.1 The information on the website is general and indicative in nature. It is intended as an initial orientation and does not constitute personal advice, nor legal, tax, financial or investment advice. For your specific situation, we recommend that you consult an expert, such as a civil-law notary, lawyer, tax adviser or registered valuer.` },
          { p: `3.2 We compile the information on the website with care and keep it as up to date as possible. However, laws and regulations, rates and market conditions may change. We therefore do not guarantee that the information is complete, accurate and up to date at all times. No rights can be derived from the information on the website.` },
          { p: `3.3 Examples and sample calculations on the website are illustrative. They are not a forecast or a commitment as to a price, return, timeframe or other result.` },
          { p: `3.4 The website may contain links to third-party websites. We are not responsible for the content or the availability of those websites.` },
          { p: `3.5 We strive to keep the website readily accessible, but we do not guarantee that the website is always available without interruptions or errors.` },
        ],
      },
      {
        h: `Article 4. Requests and proposals`,
        blocks: [
          { p: `4.1 A request is non-binding. By making a request, you are not obliged to enter into an agreement with Windmill Invest. Nor does a request oblige Windmill Invest to make a proposal or to enter into an agreement.` },
          { p: `4.2 We look at every request and give an honest answer. Windmill Invest only buys property that meets its acquisition criteria. If a property is not a fit, we will let you know and may point you to other options, such as a sale through an estate agent (makelaar).` },
          { p: `4.3 Proposals from Windmill Invest, such as an indicative offer, are non-binding. Obligations arise only once the parties have concluded a written agreement. Until then, either party may decide not to take further steps, without this giving rise to any obligations towards the other party, unless otherwise agreed in writing.` },
          { p: `4.4 A proposal is based on the information available at that time, including the information you have provided to us. If that information proves to be incorrect or incomplete, or if new facts come to light, for example during a viewing or inspection, we may amend or withdraw the proposal.` },
          { p: `4.5 You provide us with the information relevant to your request completely and truthfully, insofar as it is available to you. As a seller, you will in any event inform us of defects, tenancy agreements, pending proceedings and other matters known to you that may be relevant to the purchase.` },
          { p: `4.6 Costs that you incur yourself in connection with a request, for example for your own advice, are for your account, unless otherwise agreed in writing.` },
        ],
      },
      {
        h: `Article 5. Indicative valuations and analyses`,
        blocks: [
          { p: `5.1 An indicative valuation, yield indication, feasibility study or other analysis by Windmill Invest is a broad estimate based on the information available. It is not a formal valuation and not a validated valuation report by a registered valuer.` },
          { p: `5.2 An indicative valuation is not intended or suitable for applying for a mortgage or other financing, for tax purposes or for other purposes for which a valuation report is required. If you need an official valuation, you can engage a registered valuer. You can read more about this on our page on [property valuation](/vastgoed-waardebepaling/).` },
          { p: `5.3 Analyses and indications are not legal, tax or financial advice and not investment advice. You remain responsible for your own decisions. We recommend that you seek independent advice for important decisions.` },
          { p: `5.4 No entitlement to a particular price, return, timeframe or other result can be derived from an indicative valuation or analysis.` },
        ],
      },
      {
        h: `Article 6. Purchase of immovable property`,
        blocks: [
          { p: `6.1 A purchase of immovable property is concluded only by means of a written purchase agreement signed by both parties. Oral arrangements, agreement by telephone or messages about price and conditions do not result in a purchase as long as there is no signed purchase agreement.` },
          { p: `6.2 The purchase agreement sets out the purchase price, the conditions, the allocation of costs and the arrangements regarding the transfer. Which costs are borne by which party is stated in advance in the purchase proposal and in the purchase agreement. In the event of a conflict between the purchase agreement and these general terms and conditions, the purchase agreement prevails.` },
          { p: `6.3 Ownership of immovable property passes by delivery by means of a notarial deed, which is entered in the public registers. You have a say in when the transfer takes place, in consultation and within what the civil-law notary and the practical situation permit.` },
          { p: `6.4 Windmill Invest buys in its own name and for its own account and represents its own interests in a purchase. In that case, we do not act as estate agent or adviser to the seller. We recommend that sellers obtain independent advice where necessary. You can read more about our role in our [complaints procedure and company information](/klachten-en-disclosures/).` },
          { p: `6.5 When let property is purchased, the rights of the tenant remain in place. The tenancy agreement passes to the buyer with all rights and obligations (Article 7:226 of the Dutch Civil Code (Burgerlijk Wetboek, BW)).` },
        ],
      },
      {
        h: `Article 7. Other services`,
        blocks: [
          { p: `7.1 For services such as acquisition support, development, property management and advisory and transaction support, we record the content, the fee and the conditions in a written agreement or confirmation of engagement.` },
          { p: `7.2 We perform our services with due care and expertise. Our obligations are best-efforts obligations, unless a specific result has been expressly promised in the agreement.` },
          { p: `7.3 We do not provide legal, tax, mortgage or financial advice, regulated investment advice or certified valuations. Where such expertise is required, we engage a partner or refer you elsewhere.` },
          { p: `7.4 We may engage third parties in the performance of an agreement if proper performance so requires.` },
        ],
      },
      {
        h: `Article 8. Services of partners`,
        blocks: [
          { p: `8.1 Partners are independent businesses or professionals. They carry out their work under their own responsibility and in accordance with their own professional rules and terms and conditions.` },
          { p: `8.2 If you enter into an agreement with a partner yourself, or a partner carries out work for you, that partner's terms and conditions apply to that work. Windmill Invest is not a party to that agreement and is not liable for the work or advice of the partner, unless otherwise agreed in writing.` },
          { p: `8.3 You are always free to engage an adviser of your own choosing in addition.` },
        ],
      },
      {
        h: `Article 9. Liability`,
        blocks: [
          { p: `9.1 Windmill Invest is liable only for direct damage resulting from an attributable failure in the performance of an agreement or from a tort (onrechtmatige daad).` },
          { p: `9.2 If and to the extent that our liability insurance covers the damage, our liability is limited to the amount paid out by the insurer in the case concerned. In other cases, our liability is limited to the amount we have charged for the service concerned.` },
          { p: `9.3 We are not liable for indirect damage, including consequential damage, loss of profit, lost savings and damage due to business interruption.` },
          { p: `9.4 We are not liable for damage arising because you made decisions on the basis of the general information on the website or of an indicative valuation or analysis, or because the information you provided to us was incorrect or incomplete.` },
          { p: `9.5 We are not liable for the work or advice of partners, as provided in Article 8.` },
          { p: `9.6 Liability in connection with a purchase agreement is governed in the first place by the arrangements in that purchase agreement.` },
          { p: `9.7 The limitations in this article do not apply if the damage is the result of intent or deliberate recklessness on the part of Windmill Invest or its managerial staff. Nor do they apply insofar as mandatory law, including the statutory protection of consumers, precludes them.` },
        ],
      },
      {
        h: `Article 10. Force majeure`,
        blocks: [
          { p: `10.1 We are not obliged to fulfil an obligation if we are prevented from doing so by a circumstance that cannot be attributed to us, such as an outage at a utility company or internet provider, extreme weather conditions, a government measure or a failure by a supplier that we could not reasonably have foreseen. In that case, we will inform you as soon as possible.` },
        ],
      },
      {
        h: `Article 11. Intellectual property`,
        blocks: [
          { p: `11.1 All intellectual property rights in the website and its content, including texts, photos, images, logos, the design, software and databases, are vested in Windmill Invest or its licensors.` },
          { p: `11.2 It is not permitted to copy, reproduce, publish or otherwise use content of the website without the prior written consent of Windmill Invest, except for personal and non-commercial use or insofar as the law expressly permits this.` },
          { p: `11.3 You may use reports, analyses and other documents that we prepare for you for the purpose for which they were provided. You may not make them available to third parties without our consent, with the exception of your own advisers.` },
          { p: `11.4 It is not permitted to read the website by automated means (scraping) or to disrupt the operation of the website.` },
        ],
      },
      {
        h: `Article 12. Privacy`,
        blocks: [
          { p: `12.1 Windmill Invest processes personal data in accordance with the General Data Protection Regulation (GDPR; in Dutch: Algemene verordening gegevensbescherming, AVG). You can read how we do so in our [privacy statement](/privacyverklaring/). You can read more about the use of cookies in our [cookie policy](/cookiebeleid/).` },
        ],
      },
      {
        h: `Article 13. Complaints`,
        blocks: [
          { p: `13.1 If you have a complaint about our website or our services, we would like to hear about it. You can submit your complaint via {{email}}. How we handle complaints and within what period you will receive a response is set out in our [complaints procedure](/klachten-en-disclosures/).` },
          { p: `13.2 You can submit a complaint about the work of a partner directly to that partner, in accordance with the partner's own complaints procedure.` },
        ],
      },
      {
        h: `Article 14. Amendment of the Windmill Invest general terms and conditions`,
        blocks: [
          { p: `14.1 We may amend the Windmill Invest general terms and conditions. The amended terms and conditions apply from the date on which they are published on the website.` },
          { p: `14.2 An agreement that has already been concluded remains subject to the version that applied at the time it was concluded, unless the parties agree otherwise in writing.` },
        ],
      },
      {
        h: `Article 15. Governing law and competent court`,
        blocks: [
          { p: `15.1 These general terms and conditions, the use of the website and all agreements with Windmill Invest are governed by Dutch law. If you are a consumer residing outside the Netherlands, you retain the protection afforded to you by mandatory provisions of the law of your country of residence, insofar as these apply.` },
          { p: `15.2 We will first try to resolve a dispute through mutual consultation.` },
          { p: `15.3 Disputes with a user acting in the course of a profession or business will be submitted to the competent court in the district in which Windmill Invest is established. For disputes with a consumer, the court that has jurisdiction under the law is competent.` },
          { p: `15.4 If these general terms and conditions are also available in another language, the Dutch text prevails in the event of any difference in interpretation.` },
        ],
      },
    ],
    faq: [],
    cta: { title: `Questions about these terms?`, text: `Is anything in these general terms and conditions unclear, or would you like to know what they mean for your situation? Please contact us.`, button: `Contact us` },
  },

  {
    slug: '/klachten-en-disclosures/',
    group: 'legal',
    template: 'legal',
    nav: `Complaints and company information`,
    seoTitle: `Complaints and company information │ Windmill Invest`,
    meta: `Windmill Invest complaints procedure: how to submit a complaint and how we handle it. With our company information and the role we act in for each service.`,
    h1: `Windmill Invest complaints procedure and company information`,
    keyword: `Windmill Invest complaints procedure`,
    secondary: [`Windmill Invest company information`, `submit a complaint`, `role of Windmill Invest`],
    form: null,
    related: ['/algemene-voorwaarden/', '/privacyverklaring/', '/contact/'],
    eyebrow: `Legal`,
    intro: `The Windmill Invest complaints procedure explains how to submit a complaint and how we handle it. This page also contains our company information and the role in which we act for each service.`,
    heroPoints: [],
    version: `28 October 2026`,
    sections: [
      {
        h: `The Windmill Invest complaints procedure`,
        blocks: [
          { p: `We do our work with care, but it may happen that you are dissatisfied with something. For example, with your contact with us, the handling of your request, the performance of an agreement or the way we handle your data. If so, we would like to hear about it. A complaint gives us the opportunity to put a mistake right and to improve our services.` },
          { p: `This Windmill Invest complaints procedure applies to complaints about Windmill Invest itself. If you have a complaint about the work of a partner, such as a civil-law notary (notaris), valuer or contractor, you can submit it directly to that partner, in accordance with the partner's own complaints procedure. If you wish, we will help you find the right contact person.` },
        ],
      },
      {
        h: `How to submit a complaint`,
        blocks: [
          { p: `You submit a complaint in writing, preferably by email to {{email}}. You can also send your complaint by post to {{legalName}}, {{address}}. Please include in your complaint:` },
          {
            ul: [
              `your name and contact details;`,
              `the date on which you submit the complaint;`,
              `the address of the property or the name of the service to which the complaint relates, if applicable;`,
              `a clear description of the complaint, with the date or period in which the incident occurred;`,
              `what you expect from us to resolve the complaint;`,
              `copies of relevant documents, such as emails or other documents.`,
            ],
          },
          { p: `Please submit your complaint within a reasonable period after you have discovered the problem, so that we can investigate the matter properly. Do not send sensitive data that is not needed, such as your citizen service number (burgerservicenummer, BSN) or a copy of your identity document. Would you prefer to discuss the matter by telephone first? Please call {{phone}}.` },
        ],
      },
      {
        h: `How we handle your complaint`,
        blocks: [
          { p: `We handle every complaint carefully and confidentially, in accordance with the following steps.` },
          {
            ol: [
              `**Acknowledgement of receipt.** After we have received your complaint, we will send you an acknowledgement of receipt. It explains how the further handling will proceed.`,
              `**Investigation.** We investigate your complaint and, where necessary, contact you for an explanation or additional information. Where possible, the complaint is handled by someone who was not personally involved in the matter.`,
              `**Substantive response within 14 days.** Within 14 days of receiving your complaint, you will receive a written, substantive response from us. In it we set out our position and, where applicable, the solution we propose.`,
              `**One-time extension if necessary.** If the handling requires more time, for example because we need information from a partner, we will let you know within the 14-day period. We will then state the reason and when you can expect our substantive response. We extend the period no more than once.`,
              `**Record-keeping.** We record the complaint and how it was handled. This allows us to prevent recurrence and improve our services. How long we keep this data is set out in our privacy statement.`,
            ],
          },
        ],
      },
      {
        h: `Not satisfied with the outcome`,
        blocks: [
          { p: `If you do not agree with our response, please let us know in writing within a reasonable period. Your complaint will then be reassessed by the management board of Windmill Invest, which will inform you of the outcome in writing.` },
          { p: `If we cannot resolve the matter together, you can submit the dispute to the competent court, as described in our [general terms and conditions](/algemene-voorwaarden/). If Windmill Invest is affiliated with a disputes committee (geschillencommissie) for the service concerned, you as a consumer can also submit the dispute there. We will state in our response to your complaint whether this is possible.` },
          { p: `If your complaint concerns the processing of your personal data, you can also lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens). You can read more about this in our [privacy statement](/privacyverklaring/).` },
        ],
      },
      {
        h: `Windmill Invest company information`,
        blocks: [
          { p: `Below you will find the details of the company behind Windmill Invest.` },
          {
            table: {
              head: [`Item`, `Details`],
              rows: [
                [`Company name`, `{{legalName}}`],
                [`Trade name`, `Windmill Invest`],
                [`Chamber of Commerce (KvK) number`, `{{kvk}}`],
                [`Address`, `{{address}}`],
                [`Email`, `{{email}}`],
                [`Telephone`, `{{phone}}`],
                [`Website`, `{{domain}}`],
                [`Area of operation`, `The Netherlands`],
              ],
            },
          },
        ],
      },
      {
        h: `The role in which Windmill Invest acts`,
        blocks: [
          { p: `Windmill Invest offers various services. For each service we act in a different role, and that role determines whose interests we represent. With every request, we make clear in advance in which role we act.` },
          {
            table: {
              head: [`Service`, `Role of Windmill Invest`, `What this means for you`],
              rows: [
                [`Selling`, `Buyer in its own name and for its own account`, `We buy property that meets our acquisition criteria and in doing so represent our own interests. We are not your estate agent or adviser.`],
                [`Investing`, `Acquisition support, sourcing opportunities and acting as intermediary in purchases`, `We help you find, assess and acquire opportunities. This is not financial advice and not investment advice; the decision and the risk lie with you.`],
                [`Developing`, `Initiator or coordinator, together with partners`, `We initiate or coordinate renovation, conversion or sustainability improvements. Contractors, architects, structural engineers and other partners carry out their part under their own responsibility.`],
                [`Management`, `Manager on the basis of a written management agreement`, `We carry out the management within the arrangements in the management agreement, on behalf and for the account of the owner.`],
                [`Commercial property`, `Buyer for its own account or adviser, depending on the engagement`, `For each transaction, we record in writing in advance whether we act as buyer or as adviser and whose interests we represent.`],
                [`Advice`, `Preparer of indicative analyses and coordinator of investigations`, `We provide indicative assessments and analyses. This is not a formal valuation and not legal or tax advice; for that, we engage a partner or refer you elsewhere.`],
              ],
            },
          },
        ],
      },
      {
        h: `Independent partners`,
        blocks: [
          { p: `For specialist work we work with independent partners, such as a civil-law notary, registered valuer (register-taxateur, NRVT), building surveyor, tax adviser, lawyer, contractor, architect, installation engineer, energy adviser or structural engineer. These partners are not part of Windmill Invest. They work under their own responsibility, in accordance with their own professional rules and terms and conditions, and form their judgement independently.` },
          { p: `We have no control over the professional judgement of a partner. You are always free to engage an adviser of your own choosing in addition. If Windmill Invest receives a fee from a partner for a referral, we will disclose this in advance.` },
        ],
      },
      {
        h: `No guarantees`,
        blocks: [
          { p: `Windmill Invest gives no guarantees regarding prices, valuations, returns, rental income, timeframes, permits or other outcomes. Indications and examples on the website and in our proposals are based on the information available at that time and may differ from the final outcome. Only what has been recorded in writing in an agreement is binding.` },
          { p: `The value of property and the income from it can both rise and fall. In development and conversion, procedures and outcomes, such as the granting of an environment and planning permit (omgevingsvergunning), depend on the municipality.` },
        ],
      },
      {
        h: `Potential conflicts of interest`,
        blocks: [
          { p: `If Windmill Invest buys a property from you, we are your counterparty. We then represent our own interests, not yours. We aim to make a fair and transparent proposal, but we recommend that you obtain independent advice before signing a purchase agreement, for example from your own estate agent (makelaar), registered valuer, lawyer or tax adviser. This applies in particular in the case of personal circumstances, such as an inheritance, a divorce or financial pressure, and with [sale and leaseback of your home](/huis-verkopen-en-terughuren/).` },
          { p: `With acquisition support for investors, Windmill Invest may itself also be interested in a property, or may offer a property that it owns itself. In that case we will disclose this in advance, so that you can take it into account in your decision. In a single transaction we do not act simultaneously as buyer and as adviser to the seller.` },
          { p: `Do you have questions about our role in your situation? [Contact us](/contact/) and we will be happy to explain.` },
        ],
      },
    ],
    faq: [],
    cta: { title: `Submit a complaint or question?`, text: `Send your complaint to {{email}} or contact us. We handle every complaint carefully and confidentially.`, button: `Contact us` },
  },
];
