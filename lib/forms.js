// The eight lead forms. The build renders them from these definitions and the server validates against
// the same definitions, so the page and the check can never drift apart.
import { createHash, randomUUID } from 'node:crypto';
import { config } from '../config.js';
import { avatarFor } from './avatar.js';
import { parsePhotos } from './photos.js';

const clean = (v, max = 200) => String(v ?? '').replace(/[\u0000-\u0008\u000b-\u001f]/g, ' ').trim().slice(0, max);

export const POSTCODE = /^[1-9][0-9]{3}[A-Z]{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const normalisePostcode = (v) => clean(v, 10).replace(/\s+/g, '').toUpperCase();

// Returns the number in E.164 form (+31612345678) or null. Dutch numbers must have 9 digits after +31;
// any other country code is accepted, because owners and investors abroad (heirs, expats) are common.
export function normalisePhone(v) {
  const raw = clean(v, 30).replace(/[^\d+]/g, '');
  let digits;
  if (raw.startsWith('+')) digits = raw.slice(1).replace(/\D/g, '');
  else if (raw.startsWith('00')) digits = raw.slice(2).replace(/\D/g, '');
  else if (raw.startsWith('0')) digits = '31' + raw.slice(1).replace(/\D/g, '');
  else return null;

  if (digits.startsWith('310')) digits = '31' + digits.slice(3); // "+31 (0)6 ..." written with the trunk zero
  if (digits.startsWith('31')) return /^31\d{9}$/.test(digits) ? '+' + digits : null;
  return /^[1-9]\d{8,14}$/.test(digits) ? '+' + digits : null;
}

const PROPERTY = [['woning', 'Woning'], ['appartement', 'Appartement'], ['meerdere', 'Meerdere woningen'], ['gemengd', 'Gemengd pand'], ['anders', 'Anders']];
const COMMERCIAL = [['kantoor', 'Kantoor'], ['bedrijfshal', 'Bedrijfshal of warehouse'], ['winkel', 'Winkel of horeca'], ['mixed', 'Mixed-use'], ['grond', 'Ontwikkellocatie of grond'], ['portefeuille', 'Portefeuille']];

const f = {
  postcode: { name: 'postcode', label: 'Postcode', type: 'postcode', required: true, half: true, placeholder: '1234 AB' },
  house_number: { name: 'house_number', label: 'Huisnummer', type: 'text', required: true, half: true, max: 10 },
  city: { name: 'city', label: 'Plaats', type: 'text', required: true, max: 60 },
  message: { name: 'message', label: 'Toelichting (optioneel)', type: 'textarea', max: 2000 },
};

// Building blocks for the landing-page funnels (Engine blueprint, "Seller avatars").
const TIMELINE = [['direct', 'Zo snel mogelijk'], ['3m', 'Binnen 3 maanden'], ['6m', 'Binnen 6 maanden'], ['orienteren', 'Ik oriënteer me']];
const OCCUPANCY = [['bewoond', 'Ik woon er zelf'], ['leeg', 'De woning staat leeg'], ['verhuurd', 'De woning is verhuurd']];
const YES_NO_UNSURE = [['ja', 'Ja'], ['nee', 'Nee'], ['weet_niet', 'Weet ik nog niet']];
const CONDITION = [['goed', 'Goed'], ['matig', 'Matig'], ['slecht', 'Slecht of moet vervangen'], ['weet_niet', 'Weet ik niet']];
const ENERGY_LABEL = [...'ABCDEFG'].map((l) => [l, `Label ${l}`]).concat([['weet_niet', 'Weet ik niet']]);
const MORTGAGE = [['nee', 'Nee, geen hypotheek'], ['ja', 'Ja, lager dan de waarde van de woning'], ['onderwater', 'Ja, mogelijk hoger dan de waarde'], ['weet_niet', 'Weet ik niet']];
// The seller funnels follow the Engine blueprint's order: address → property type and occupancy → motivation
// → timeline → condition and mortgage → contact details last.
const SELLER_STEPS = ['Adres', 'De woning', 'Uw situatie', 'Planning', 'Staat en hypotheek', 'Uw gegevens'];
// step: which screen of a multi-step form the field is on (contact details and consents always come last).
// promise: the field is only asked when that promise is switched on in config.promises.
const step = (n, fd) => ({ ...fd, step: n });
const addressStep = [step(1, f.postcode), step(1, f.house_number)];
const mortgage = { name: 'mortgage', label: 'Is er een hypotheek op de woning?', type: 'select', required: true, options: MORTGAGE };
// Optional photos of the property, made smaller in the browser before sending (lib/photos.js has the limits).
const photos = { name: 'photos', label: 'Foto’s van de woning (optioneel, maximaal 5)', type: 'photos' };

export const FORMS = {
  verkoop: {
    title: 'Woning aanmelden',
    intro: 'Vul de gegevens van uw woning in. U ontvangt binnen twee werkdagen een reactie.',
    button: 'Voorstel aanvragen',
    fields: [
      f.postcode, f.house_number,
      { name: 'property_type', label: 'Type woning', type: 'select', required: true, options: PROPERTY },
      { name: 'situation', label: 'Uw situatie', type: 'select', required: true, options: [['verhuizen', 'Ik wil verhuizen'], ['geerfd', 'Geërfde woning'], ['onderhoud', 'Achterstallig onderhoud'], ['leegstand', 'Woning staat leeg'], ['scheiding', 'Scheiding'], ['buitenland', 'Ik woon in het buitenland'], ['financieel', 'Financiële situatie'], ['anders', 'Anders']] },
      { name: 'timeline', label: 'Wanneer wilt u verkopen?', type: 'select', required: true, options: [['direct', 'Zo snel mogelijk'], ['3m', 'Binnen 3 maanden'], ['6m', 'Binnen 6 maanden'], ['orienteren', 'Ik oriënteer me']] },
      f.message,
    ],
  },
  verhuurd: {
    title: 'Verhuurd vastgoed aanmelden',
    intro: 'Vertel ons over de verhuurde woning of het pakket. De huurder hoeft niets te doen.',
    button: 'Beoordeling aanvragen',
    fields: [
      f.postcode, f.house_number,
      { name: 'units', label: 'Aantal verhuureenheden', type: 'number', required: true, min: 1, max: 5000, half: true },
      { name: 'rent', label: 'Totale kale huur per maand (€, optioneel)', type: 'number', min: 0, max: 10000000, half: true },
      { name: 'contract', label: 'Soort huurcontract', type: 'select', required: true, options: [['onbepaald', 'Onbepaalde tijd'], ['tijdelijk', 'Tijdelijk'], ['gemengd', 'Gemengd'], ['onbekend', 'Weet ik niet']] },
      f.message,
    ],
  },
  commercieel: {
    title: 'Vertrouwelijke aanmelding',
    intro: 'Uw gegevens worden vertrouwelijk behandeld. Op verzoek tekenen wij vooraf een geheimhoudingsverklaring.',
    button: 'Vertrouwelijk aanmelden',
    fields: [
      { name: 'company', label: 'Bedrijfsnaam (optioneel)', type: 'text', max: 100 },
      { name: 'asset_type', label: 'Type vastgoed', type: 'select', required: true, options: COMMERCIAL },
      f.city,
      { name: 'size_m2', label: 'Oppervlakte in m² (optioneel)', type: 'number', min: 1, max: 10000000, half: true },
      { name: 'let_status', label: 'Verhuurd?', type: 'select', required: true, half: true, options: [['ja', 'Ja'], ['deels', 'Deels'], ['nee', 'Nee, leeg']] },
      f.message,
    ],
  },
  investeerder: {
    title: 'Investeerderscriteria',
    intro: 'Laat uw criteria achter. Wij nemen alleen contact op met kansen die daarbij passen.',
    button: 'Criteria versturen',
    fields: [
      { name: 'investor_type', label: 'U investeert als', type: 'select', required: true, options: [['particulier', 'Particulier'], ['bv', 'Via een bv'], ['family_office', 'Family office'], ['institutioneel', 'Institutionele partij']] },
      { name: 'budget', label: 'Budget per aankoop', type: 'select', required: true, options: [['lt500k', 'Tot € 500.000'], ['500k-2m', '€ 500.000 – € 2 miljoen'], ['2m-10m', '€ 2 – 10 miljoen'], ['gt10m', 'Meer dan € 10 miljoen']] },
      { name: 'asset_pref', label: 'Voorkeur vastgoedtype', type: 'select', required: true, options: [['woningen', 'Woningen'], ...COMMERCIAL.slice(0, 5), ['geen', 'Geen voorkeur']] },
      { name: 'region', label: 'Voorkeursregio (optioneel)', type: 'text', max: 100 },
      f.message,
    ],
  },
  beheer: {
    title: 'Beheervoorstel aanvragen',
    intro: 'Vertel ons wat u in beheer wilt geven. U ontvangt een voorstel op maat.',
    button: 'Voorstel aanvragen',
    fields: [
      { name: 'units', label: 'Aantal objecten', type: 'number', required: true, min: 1, max: 5000, half: true },
      { name: 'asset_type', label: 'Type vastgoed', type: 'select', required: true, half: true, options: [['woningen', 'Woningen'], ['commercieel', 'Commercieel'], ['gemengd', 'Gemengd']] },
      f.city,
      { name: 'service', label: 'Waar zoekt u hulp bij?', type: 'select', required: true, options: [['verhuur', 'Verhuurbeheer'], ['onderhoud', 'Onderhoudscoördinatie'], ['portefeuille', 'Portefeuillebeheer'], ['alles', 'Volledig beheer']] },
      f.message,
    ],
  },
  ontwikkeling: {
    title: 'Haalbaarheid laten beoordelen',
    intro: 'Beschrijf uw project. Wij laten u weten of en hoe wij kunnen helpen.',
    button: 'Haalbaarheid aanvragen',
    fields: [
      { name: 'project_type', label: 'Type project', type: 'select', required: true, options: [['renovatie', 'Renovatie'], ['transformatie', 'Transformatie'], ['verduurzaming', 'Verduurzaming'], ['herontwikkeling', 'Herontwikkeling of nieuwbouw']] },
      f.city,
      { name: 'phase', label: 'Fase', type: 'select', required: true, options: [['idee', 'Idee'], ['haalbaarheid', 'Haalbaarheidsonderzoek'], ['vergunning', 'Vergunningsfase'], ['uitvoering', 'Klaar voor uitvoering']] },
      f.message,
    ],
  },
  waardebepaling: {
    title: 'Indicatieve waardebeoordeling',
    intro: 'Een indicatieve waardebeoordeling is geen taxatierapport. Voor een gevalideerde taxatie verwijzen wij naar een register-taxateur.',
    button: 'Beoordeling aanvragen',
    fields: [
      f.postcode, f.house_number,
      { name: 'property_type', label: 'Type vastgoed', type: 'select', required: true, options: [...PROPERTY.slice(0, 4), ...COMMERCIAL.slice(0, 3)] },
      { name: 'purpose', label: 'Waarvoor wilt u het weten?', type: 'select', required: true, options: [['verkoop', 'Ik overweeg te verkopen'], ['aankoop', 'Ik overweeg te kopen'], ['inzicht', 'Algemeen inzicht']] },
      f.message,
    ],
  },
  // Landing-page funnels, one per seller avatar.
  funnel_urgent: {
    title: 'Vrijblijvend voorstel aanvragen',
    intro: 'Een paar korte vragen. U zit nergens aan vast.',
    button: 'Voorstel aanvragen',
    steps: SELLER_STEPS,
    fields: [
      ...addressStep,
      step(2, { name: 'property_type', label: 'Type woning', type: 'select', required: true, options: PROPERTY }),
      step(2, { name: 'occupancy', label: 'Wie woont er nu?', type: 'select', required: true, options: OCCUPANCY }),
      step(3, { name: 'situation', label: 'Waarom wilt u verkopen?', type: 'select', required: true, options: [['scheiding', 'Scheiding'], ['geerfd', 'Erfenis'], ['financieel', 'Financiële zorgen of dubbele lasten'], ['verhuizen', 'Verhuizing'], ['anders', 'Anders']] }),
      step(3, { name: 'owners_agree', label: 'Zijn alle eigenaren of erfgenamen het eens over de verkoop?', type: 'select', required: true, options: YES_NO_UNSURE }),
      step(4, { name: 'timeline', label: 'Wanneer wilt u verkopen?', type: 'select', required: true, options: TIMELINE }),
      step(4, { name: 'transfer_date', label: 'Gewenste overdrachtsdatum (optioneel)', type: 'date', promise: 'transferDate' }),
      step(4, { name: 'cash_advance', label: 'Wilt u een voorschot op de koopsom? (optioneel)', type: 'select', options: YES_NO_UNSURE, promise: 'cashAdvance' }),
      step(4, { name: 'rent_back', label: 'Wilt u na de verkoop blijven huren? (optioneel)', type: 'select', options: YES_NO_UNSURE, promise: 'rentBack' }),
      step(5, { name: 'condition', label: 'Hoe is de staat van de woning?', type: 'select', required: true, options: CONDITION }),
      step(5, mortgage),
      step(5, photos),
      step(5, f.message),
    ],
  },
  funnel_asis: {
    title: 'Vrijblijvend voorstel aanvragen',
    intro: 'Vertel ons over de woning zoals ze nu is. U hoeft niets op te knappen.',
    button: 'Voorstel aanvragen',
    steps: SELLER_STEPS,
    fields: [
      ...addressStep,
      step(2, { name: 'property_type', label: 'Type woning', type: 'select', required: true, options: PROPERTY }),
      step(2, { name: 'occupancy', label: 'Wie woont er nu?', type: 'select', required: true, options: OCCUPANCY }),
      step(2, { name: 'energy_label', label: 'Energielabel', type: 'select', required: true, options: ENERGY_LABEL }),
      step(3, { name: 'situation', label: 'Waarom wilt u verkopen?', type: 'select', required: true, options: [['opknappen', 'Opknappen is te duur of te veel werk'], ['verhuizen', 'Verhuizing'], ['geerfd', 'Erfenis'], ['scheiding', 'Scheiding'], ['financieel', 'Financiële zorgen'], ['anders', 'Anders']] }),
      step(4, { name: 'timeline', label: 'Wanneer wilt u verkopen?', type: 'select', required: true, options: TIMELINE }),
      step(4, { name: 'leave_furniture', label: 'Blijven er spullen of meubels achter? (optioneel)', type: 'select', options: YES_NO_UNSURE }),
      step(4, { name: 'transfer_date', label: 'Gewenste overdrachtsdatum (optioneel)', type: 'date', promise: 'transferDate' }),
      step(5, { name: 'roof', label: 'Dak', type: 'select', required: true, half: true, options: CONDITION }),
      step(5, { name: 'kitchen', label: 'Keuken', type: 'select', required: true, half: true, options: CONDITION }),
      step(5, { name: 'bathroom', label: 'Badkamer', type: 'select', required: true, half: true, options: CONDITION }),
      step(5, { name: 'installations', label: 'Installaties (cv, elektra)', type: 'select', required: true, half: true, options: CONDITION }),
      step(5, { name: 'known_defects', label: 'Bekende gebreken (optioneel)', type: 'textarea', max: 1000 }),
      step(5, mortgage),
      step(5, photos),
      step(5, f.message),
    ],
  },
  funnel_portfolio: {
    title: 'Vertrouwelijk aanmelden',
    intro: 'Een senior specialist neemt contact met u op. Uw gegevens blijven vertrouwelijk.',
    button: 'Vertrouwelijk aanmelden',
    steps: ['Portefeuille', 'Verhuur', 'Uw gegevens'],
    fields: [
      step(1, { name: 'units', label: 'Aantal woningen of panden', type: 'number', required: true, min: 1, max: 5000, half: true }),
      step(1, { name: 'legal_owner', label: 'Eigenaar', type: 'select', required: true, half: true, options: [['prive', 'Privé'], ['bv', 'Een bv of holding'], ['anders', 'Anders']] }),
      step(1, { name: 'city', label: 'Plaats of plaatsen', type: 'text', required: true, max: 200 }),
      step(1, { name: 'addresses', label: 'Adressen (optioneel, één per regel)', type: 'textarea', max: 4000 }),
      step(2, { name: 'rent_type', label: 'Soort huur', type: 'select', required: true, options: [['sociaal', 'Sociale huur'], ['midden', 'Middenhuur'], ['vrij', 'Vrije sector'], ['gemengd', 'Gemengd'], ['weet_niet', 'Weet ik niet']] }),
      step(2, { name: 'contract', label: 'Huurcontracten', type: 'select', required: true, options: [['onbepaald', 'Onbepaalde tijd'], ['tijdelijk', 'Tijdelijk'], ['gemengd', 'Gemengd'], ['onbekend', 'Weet ik niet']] }),
      step(2, { name: 'rent', label: 'Totale kale huur per maand (€, optioneel)', type: 'number', min: 0, max: 100000000, half: true }),
      step(2, { name: 'financing', label: 'Rust er financiering op?', type: 'select', required: true, half: true, options: [['ja', 'Ja'], ['nee', 'Nee']] }),
      step(2, { name: 'call_moment', label: 'Wanneer belt een specialist u het liefst? (optioneel)', type: 'select', options: [['ochtend', 'Ochtend'], ['middag', 'Middag'], ['avond', 'Begin van de avond']] }),
      step(2, { name: 'nda', label: 'Ik wil vooraf een geheimhoudingsverklaring ontvangen.', type: 'checkbox' }),
      step(2, f.message),
    ],
  },
  contact: {
    title: 'Stel uw vraag',
    intro: 'Wij reageren binnen twee werkdagen.',
    button: 'Vraag versturen',
    phoneOptional: true,
    fields: [
      { name: 'subject', label: 'Onderwerp', type: 'select', required: true, options: [['verkopen', 'Verkopen'], ['investeren', 'Investeren'], ['beheer', 'Beheer'], ['ontwikkelen', 'Ontwikkelen'], ['advies', 'Advies'], ['anders', 'Anders']] },
      { name: 'message', label: 'Uw vraag', type: 'textarea', required: true, max: 2000 },
    ],
  },
};

// English texts for the forms. Field names and option values stay the same, so stored data is
// identical in both languages; only what the visitor reads changes.
const CONDITION_EN = { goed: 'Good', matig: 'Fair', slecht: 'Poor or needs replacing', weet_niet: 'I don\'t know' };
const SELLER_STEPS_EN = ['Address', 'The home', 'Your situation', 'Timing', 'Condition and mortgage', 'Your details'];
const FORMS_EN = {
  verkoop: { title: 'Register your home', intro: 'Enter the details of your home. You will receive a reply within two working days.', button: 'Request a proposal', labels: { property_type: 'Type of home', situation: 'Your situation', timeline: 'When would you like to sell?' } },
  verhuurd: { title: 'Register tenanted property', intro: 'Tell us about the tenanted home or portfolio. The tenant does not need to do anything.', button: 'Request an assessment', labels: { units: 'Number of rental units', rent: 'Total basic rent per month (€, optional)', contract: 'Type of tenancy' } },
  commercieel: { title: 'Confidential registration', intro: 'Your details are treated confidentially. On request, we sign a non-disclosure agreement in advance.', button: 'Register confidentially', labels: { company: 'Company name (optional)', asset_type: 'Type of property', size_m2: 'Floor area in m² (optional)', let_status: 'Let?' } },
  investeerder: { title: 'Investor criteria', intro: 'Leave your criteria. We only contact you about opportunities that match them.', button: 'Send criteria', labels: { investor_type: 'You invest as', budget: 'Budget per acquisition', asset_pref: 'Preferred property type', region: 'Preferred region (optional)' } },
  beheer: { title: 'Request a management proposal', intro: 'Tell us what you would like us to manage. You will receive a tailored proposal.', button: 'Request a proposal', labels: { units: 'Number of properties', asset_type: 'Type of property', service: 'What do you need help with?' } },
  ontwikkeling: { title: 'Have feasibility assessed', intro: 'Describe your project. We will let you know whether and how we can help.', button: 'Request a feasibility check', labels: { project_type: 'Type of project', phase: 'Stage' } },
  waardebepaling: { title: 'Indicative valuation', intro: 'An indicative valuation is not a valuation report. For a validated valuation we refer you to a registered valuer.', button: 'Request a valuation', labels: { property_type: 'Type of property', purpose: 'What do you need it for?' } },
  contact: { title: 'Ask your question', intro: 'We reply within two working days.', button: 'Send question', labels: { subject: 'Subject', message: 'Your question' } },
  funnel_urgent: {
    title: 'Request a no-obligation proposal', intro: 'A few short questions. You are not committing to anything.', button: 'Request a proposal',
    steps: SELLER_STEPS_EN,
    labels: { property_type: 'Type of home', occupancy: 'Who lives there now?', situation: 'Why do you want to sell?', owners_agree: 'Do all owners or heirs agree to the sale?', timeline: 'When would you like to sell?', transfer_date: 'Preferred transfer date (optional)', cash_advance: 'Would you like an advance on the purchase price? (optional)', rent_back: 'Would you like to keep renting after the sale? (optional)', condition: 'What condition is the home in?' },
    options: { situation: { scheiding: 'Divorce or separation', geerfd: 'Inheritance', financieel: 'Financial worries or paying for two homes', verhuizen: 'Moving', anders: 'Other' } },
  },
  funnel_asis: {
    title: 'Request a no-obligation proposal', intro: 'Tell us about the home as it is now. You do not need to fix anything.', button: 'Request a proposal',
    steps: SELLER_STEPS_EN,
    options: { situation: { opknappen: 'Renovating is too expensive or too much work', verhuizen: 'Moving', geerfd: 'Inheritance', scheiding: 'Divorce or separation', financieel: 'Financial worries', anders: 'Other' } },
    labels: { property_type: 'Type of home', occupancy: 'Who lives there now?', energy_label: 'Energy label', situation: 'Why do you want to sell?', roof: 'Roof', kitchen: 'Kitchen', bathroom: 'Bathroom', installations: 'Installations (heating, electrics)', known_defects: 'Known defects (optional)', timeline: 'When would you like to sell?', leave_furniture: 'Will belongings or furniture be left behind? (optional)', transfer_date: 'Preferred transfer date (optional)' },
  },
  funnel_portfolio: {
    title: 'Register confidentially', intro: 'A senior specialist will contact you. Your details stay confidential.', button: 'Register confidentially',
    steps: ['Portfolio', 'Tenancies', 'Your details'],
    labels: { units: 'Number of homes or buildings', legal_owner: 'Owner', city: 'Town or towns', addresses: 'Addresses (optional, one per line)', rent_type: 'Type of rent', contract: 'Tenancy agreements', rent: 'Total basic rent per month (€, optional)', financing: 'Is there a mortgage or loan on it?', call_moment: 'When would you prefer a specialist to call? (optional)', nda: 'I would like to receive a non-disclosure agreement in advance.' },
  },
};
const LABELS_EN = { postcode: 'Postcode', house_number: 'House number', city: 'Town or city', message: 'Comments (optional)', name: 'Name', email: 'Email address', phone: 'Phone', mortgage: 'Is there a mortgage on the home?', photos: 'Photos of the home (optional, up to 5)' };
const OPTIONS_EN = {
  property_type: { woning: 'House', appartement: 'Apartment', meerdere: 'Several homes', gemengd: 'Mixed-use building', anders: 'Other', kantoor: 'Office', bedrijfshal: 'Industrial unit or warehouse', winkel: 'Shop or hospitality' },
  situation: { verhuizen: 'I am moving', geerfd: 'Inherited home', onderhoud: 'Overdue maintenance', leegstand: 'Home is vacant', scheiding: 'Divorce or separation', buitenland: 'I live abroad', financieel: 'Financial situation', anders: 'Other' },
  timeline: { direct: 'As soon as possible', '3m': 'Within 3 months', '6m': 'Within 6 months', orienteren: 'Just exploring' },
  contract: { onbepaald: 'Indefinite term', tijdelijk: 'Fixed term', gemengd: 'Mixed', onbekend: 'Not sure' },
  asset_type: { kantoor: 'Office', bedrijfshal: 'Industrial unit or warehouse', winkel: 'Shop or hospitality', mixed: 'Mixed-use', grond: 'Development site or land', portefeuille: 'Portfolio', woningen: 'Residential', commercieel: 'Commercial', gemengd: 'Mixed' },
  let_status: { ja: 'Yes', deels: 'Partly', nee: 'No, vacant' },
  investor_type: { particulier: 'Private individual', bv: 'Through a company (bv)', family_office: 'Family office', institutioneel: 'Institutional investor' },
  budget: { lt500k: 'Up to € 500,000', '500k-2m': '€ 500,000 – € 2 million', '2m-10m': '€ 2 – 10 million', gt10m: 'More than € 10 million' },
  asset_pref: { woningen: 'Residential', kantoor: 'Office', bedrijfshal: 'Industrial unit or warehouse', winkel: 'Shop or hospitality', mixed: 'Mixed-use', grond: 'Development site or land', geen: 'No preference' },
  service: { verhuur: 'Rental management', onderhoud: 'Maintenance coordination', portefeuille: 'Portfolio management', alles: 'Full management' },
  project_type: { renovatie: 'Renovation', transformatie: 'Transformation', verduurzaming: 'Sustainability upgrade', herontwikkeling: 'Redevelopment or new build' },
  phase: { idee: 'Idea', haalbaarheid: 'Feasibility study', vergunning: 'Permit stage', uitvoering: 'Ready to build' },
  purpose: { verkoop: 'I am thinking of selling', aankoop: 'I am thinking of buying', inzicht: 'General insight' },
  subject: { verkopen: 'Selling', investeren: 'Investing', beheer: 'Management', ontwikkelen: 'Development', advies: 'Advisory', anders: 'Other' },
  occupancy: { bewoond: 'I live there myself', leeg: 'The home is vacant', verhuurd: 'The home is let' },
  owners_agree: { ja: 'Yes', nee: 'No', weet_niet: 'Not sure yet' },
  cash_advance: { ja: 'Yes', nee: 'No', weet_niet: 'Not sure yet' },
  rent_back: { ja: 'Yes', nee: 'No', weet_niet: 'Not sure yet' },
  leave_furniture: { ja: 'Yes', nee: 'No', weet_niet: 'Not sure yet' },
  energy_label: { weet_niet: 'I don\'t know' },
  mortgage: { nee: 'No mortgage', ja: 'Yes, less than the value of the home', onderwater: 'Yes, possibly more than the value', weet_niet: 'I don\'t know' },
  condition: CONDITION_EN, roof: CONDITION_EN, kitchen: CONDITION_EN, bathroom: CONDITION_EN, installations: CONDITION_EN,
  legal_owner: { prive: 'Privately', bv: 'A company (bv) or holding', anders: 'Other' },
  rent_type: { sociaal: 'Social housing', midden: 'Mid-market rent', vrij: 'Private sector', gemengd: 'Mixed', weet_niet: 'I don\'t know' },
  financing: { ja: 'Yes', nee: 'No' },
  call_moment: { ochtend: 'Morning', middag: 'Afternoon', avond: 'Early evening' },
};

// The form definition in the visitor's language.
// The fields a form asks right now: questions tied to a promise only while that promise is switched on.
export const activeFields = (form) => form.fields.filter((fd) => !fd.promise || config.promises[fd.promise]);

export function formFor(key, lang = 'nl') {
  const form = FORMS[key];
  if (lang !== 'en' || !form || !FORMS_EN[key]) return form;
  const en = FORMS_EN[key];
  const field = (fd) => ({
    ...fd,
    label: en.labels?.[fd.name] || LABELS_EN[fd.name] || fd.label,
    options: fd.options?.map(([v, l]) => [v, en.options?.[fd.name]?.[v] || OPTIONS_EN[fd.name]?.[v] || l]),
  });
  return { ...form, title: en.title, intro: en.intro, button: en.button, steps: en.steps || form.steps, fields: form.fields.map(field), localise: field };
}

export const CONTACT_FIELDS = (form) => {
  const fields = [
    { name: 'name', label: 'Naam', type: 'text', required: true, max: 100, autocomplete: 'name' },
    { name: 'email', label: 'E-mailadres', type: 'email', required: true, max: 120, half: true, autocomplete: 'email' },
    { name: 'phone', label: form.phoneOptional ? 'Telefoon (optioneel)' : 'Telefoon', type: 'tel', required: !form.phoneOptional, half: true, autocomplete: 'tel', placeholder: '06 12345678' },
  ];
  if (!form.localise) return fields;
  return fields.map(form.localise).map((fd) => (fd.name === 'phone' && form.phoneOptional ? { ...fd, label: 'Phone (optional)' } : fd));
};

const MESSAGES = {
  nl: {
    form: 'Onbekend formulier.', name: 'Vul uw naam in.', email: 'Vul een geldig e-mailadres in.',
    phone: 'Vul een geldig telefoonnummer in, bijvoorbeeld 06 12345678 of +32 470 12 34 56.', phoneMissing: 'Vul uw telefoonnummer in.',
    postcode: 'Vul een geldige postcode in (bijv. 1234 AB).', option: 'Kies een van de opties.', number: 'Vul een geldig getal in.',
    choose: 'Kies een optie.', required: (label) => `Vul ${label.toLowerCase()} in.`, consent: 'Ga akkoord met de privacyverklaring om door te gaan.',
    phoneForContact: 'Vul uw telefoonnummer in, zodat we u kunnen bellen of een WhatsApp-bericht kunnen sturen.',
    date: 'Kies een datum vanaf vandaag.',
    photos: 'De foto’s konden niet worden verwerkt. Kies maximaal 5 foto’s (JPG of PNG).',
  },
  en: {
    form: 'Unknown form.', name: 'Please enter your name.', email: 'Please enter a valid email address.',
    phone: 'Please enter a valid phone number, for example +31 6 12345678 or +44 7700 900123.', phoneMissing: 'Please enter your phone number.',
    postcode: 'Please enter a valid Dutch postcode (e.g. 1234 AB).', option: 'Please choose one of the options.', number: 'Please enter a valid number.',
    choose: 'Please choose an option.', required: () => 'This field is required.', consent: 'Please accept the privacy statement to continue.',
    phoneForContact: 'Please enter your phone number, so we can call you or send a WhatsApp message.',
    date: 'Please choose a date from today.',
    photos: 'The photos could not be processed. Please choose up to 5 photos (JPG or PNG).',
  },
};

export const ATTRIBUTION = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'fbp', 'fbc', 'ttclid'];

// The consent checkboxes on every form: one source for the text the visitor sees and the text stored with
// the consent, so the record proves exactly what was agreed to. Only privacy is required; the others are
// separate and never pre-ticked (Telecommunicatiewet, GDPR). {privacy} becomes a link, {brand} the brand.
export const CONSENTS = [
  {
    field: 'consent_privacy', channel: 'any', purpose: 'request', required: true,
    nl: 'Ik ga akkoord met de verwerking van mijn gegevens volgens de {privacy}, zodat {brand} contact met mij kan opnemen over deze aanvraag.',
    en: 'I agree to the processing of my data in accordance with the {privacy}, so that {brand} can contact me about this request.',
  },
  {
    field: 'consent_phone', channel: 'phone', purpose: 'request',
    nl: 'U mag mij bellen over deze aanvraag. Dat kan ook onze AI-assistent zijn; die zegt dat altijd aan het begin van het gesprek.',
    en: 'You may call me about this request. This may be our AI assistant, which always says so at the start of the call.',
  },
  {
    field: 'consent_whatsapp', channel: 'whatsapp', purpose: 'request',
    nl: 'Stuur mij berichten over deze aanvraag via WhatsApp.',
    en: 'Send me messages about this request on WhatsApp.',
  },
  {
    field: 'consent_marketing', channel: 'email', purpose: 'marketing',
    nl: 'Ja, stuur mij af en toe relevante kansen en nieuws per e-mail (optioneel, altijd af te melden).',
    en: 'Yes, occasionally send me relevant opportunities and news by email (optional, unsubscribe at any time).',
  },
];
export const PRIVACY_WORD = { nl: 'privacyverklaring', en: 'privacy statement' };
// The consent text exactly as the visitor reads it (the page shows the privacy word as a link).
export const consentText = (c, lang) => c[lang].replace('{privacy}', PRIVACY_WORD[lang]).replace('{brand}', config.brand);
// A short fingerprint of a consent text: it changes whenever the wording changes.
export const textVersion = (text) => createHash('sha256').update(text).digest('hex').slice(0, 12);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Validates one submission. Returns { ok, errors, record } where record.data holds the form-specific answers.
export function validateInquiry(input, pageSlugs) {
  const errors = {};
  const lang = input.lang === 'en' ? 'en' : 'nl';
  const m = MESSAGES[lang];
  const formType = clean(input.form_type, 20);
  const form = FORMS[formType];
  if (!form) return { ok: false, errors: { form_type: m.form } };

  const record = { form_type: formType, lang, data: {} };
  record.page = clean(input.page, 200);
  if (pageSlugs && !pageSlugs.has(record.page)) record.page = '';

  record.name = clean(input.name, 100);
  if (record.name.length < 2) errors.name = m.name;
  record.email = clean(input.email, 120).toLowerCase();
  if (!EMAIL.test(record.email)) errors.email = m.email;
  const rawPhone = clean(input.phone, 30);
  record.phone = rawPhone ? normalisePhone(rawPhone) : null;
  if (rawPhone && !record.phone) errors.phone = m.phone;
  else if (!rawPhone && !form.phoneOptional) errors.phone = m.phoneMissing;

  for (const fd of activeFields(form)) {
    if (fd.type === 'photos') {
      const r = parsePhotos(input.photos);
      if (r.error) errors.photos = m.photos; else record.photos = r.photos;
      continue;
    }
    if (fd.type === 'checkbox') { if (input[fd.name] === true) record.data[fd.name] = true; continue; }
    let v = clean(input[fd.name], fd.max || 200);
    if (fd.type === 'date' && v) {
      // A date from today up to five years ahead (YYYY-MM-DD, as date inputs send it).
      const d = /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(v + 'T12:00:00Z') : null;
      const today = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');
      if (!d || Number.isNaN(+d) || d < today || d > new Date(+today + 5 * 365 * 864e5)) { errors[fd.name] = m.date; continue; }
    }
    if (fd.type === 'postcode') {
      v = normalisePostcode(v);
      if (v && !POSTCODE.test(v)) { errors[fd.name] = m.postcode; continue; }
    }
    if (fd.type === 'select' && v && !fd.options.some(([k]) => k === v)) { errors[fd.name] = m.option; continue; }
    if (fd.type === 'number' && v) {
      // Dutch writes 1.500,5 and English 1,500.5.
      const n = Number(lang === 'en' ? v.replace(/[,\s]/g, '') : v.replace(/[.\s]/g, '').replace(',', '.'));
      if (!Number.isFinite(n) || n < (fd.min ?? 0) || n > (fd.max ?? Infinity)) { errors[fd.name] = m.number; continue; }
      v = n;
    }
    if (fd.required && (v === '' || v == null)) { errors[fd.name] = fd.type === 'select' ? m.choose : m.required(fd.label); continue; }
    if (v !== '') record.data[fd.name] = v;
  }

  // One required privacy consent; phone, WhatsApp and email marketing are separate and never pre-ticked.
  // Every box is recorded, ticked or not, with the exact text shown, for the consent ledger.
  if (input.consent_privacy !== true) errors.consent_privacy = m.consent;
  record.consents = CONSENTS.map((c) => {
    const text = consentText(c, lang);
    return { field: c.field, channel: c.channel, purpose: c.purpose, granted: input[c.field] === true, text, text_version: textVersion(text) };
  });
  record.consent_marketing = input.consent_marketing === true ? 1 : 0;
  record.consent_phone = input.consent_phone === true;
  record.consent_whatsapp = input.consent_whatsapp === true;
  if ((record.consent_phone || record.consent_whatsapp) && !record.phone && !errors.phone) errors.phone = m.phoneForContact;

  // One id per inquiry, made in the browser when the form starts (also the idempotency key for the CRM).
  record.lead_id = UUID.test(String(input.lead_id || '')) ? String(input.lead_id).toLowerCase() : randomUUID();
  record.avatar = avatarFor({ form_type: formType, page: record.page, data: record.data, utm_campaign: clean(input.utm_campaign, 200) });

  for (const k of ATTRIBUTION) record[k] = clean(input[k], 200) || null;
  record.landing_page = clean(input.landing_page, 300) || null;
  record.referrer = clean(input.referrer, 300) || null;

  return { ok: Object.keys(errors).length === 0, errors, record };
}

// A partly filled multi-step form (Engine blueprint: "partial save after step 1 with consent"). Holds only the
// answers of the steps done so far, never contact details or photos; invalid answers are dropped, not
// reported. Returns null when the draft cannot be used.
export function validateDraft(input, pageSlugs) {
  const form = FORMS[clean(input.form_type, 20)];
  if (!form?.steps || input.consent !== true || !UUID.test(String(input.lead_id || ''))) return null;
  const step = Number(input.step);
  if (!Number.isInteger(step) || step < 1 || step >= form.steps.length) return null;
  const data = {};
  for (const fd of activeFields(form)) {
    if (fd.step > step || fd.type === 'photos') continue;
    if (fd.type === 'checkbox') { if (input[fd.name] === true) data[fd.name] = true; continue; }
    let v = clean(input[fd.name], fd.max || 200);
    if (fd.type === 'postcode') v = normalisePostcode(v);
    if (fd.type === 'select' && !fd.options.some(([k]) => k === v)) continue;
    if (v) data[fd.name] = v;
  }
  const page = clean(input.page, 200);
  const attribution = {};
  for (const k of [...ATTRIBUTION, 'landing_page', 'referrer']) { const v = clean(input[k], 300); if (v) attribution[k] = v; }
  return {
    lead_id: String(input.lead_id).toLowerCase(), form_type: clean(input.form_type, 20), lang: input.lang === 'en' ? 'en' : 'nl',
    page: pageSlugs && !pageSlugs.has(page) ? '' : page, step, data, attribution,
  };
}
