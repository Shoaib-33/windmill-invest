// Beheer (English): English translation of content/beheer.js — division hub and three management pages.
export default [
  {
    slug: '/vastgoedbeheer/',
    group: 'beheer',
    template: 'service',
    nav: `Property management`,
    seoTitle: `Property management for owners │ Windmill Invest`,
    meta: `Property management by Windmill Invest: administrative, technical and commercial management of homes and commercial buildings, set out in a management agreement.`,
    h1: `Property management for homes and commercial buildings`,
    keyword: `property management Netherlands`,
    secondary: [`property manager Netherlands`, `manage rental property Netherlands`, `property management company Netherlands`, `technical and administrative property management`],
    form: 'beheer',
    related: ['/verhuurbeheer/', '/onderhoudscoordinatie/', '/vastgoedportefeuillebeheer/', '/vastgoed-verduurzamen/'],
    eyebrow: `Management · Overview`,
    intro: `Property management (vastgoedbeheer) is the day-to-day and strategic care of your property: tenants, rental income, maintenance and reporting. Windmill Invest provides management for private landlords, investors and owners of commercial property throughout the Netherlands. Exactly what falls under our management is set out in advance in a written management agreement (beheerovereenkomst).`,
    heroPoints: [`Administrative, technical and commercial management`, `Tasks set out in a management agreement`, `Regular partners for maintenance and legal matters`],
    sections: [
      {
        h: `What is property management?`,
        blocks: [
          { p: `Letting property involves much more than collecting rent: tenancy agreements, rent increases, service charges (servicekosten), repairs, maintenance and an ever-growing body of regulations. **Property management** brings these tasks together, so that as the owner you keep an overview without having to do everything yourself. In Dutch this is called vastgoedbeheer; internationally it is known as property management.` },
          { p: `At Windmill Invest, management is not separate from the rest of our work. Because we buy, develop and analyse property ourselves, we also look at the long term when managing property: how are the rent, the state of maintenance and the energy performance developing, and what does that mean for the value of your building? In this way, management becomes a basis for sound decisions.` },
        ],
      },
      {
        h: `Administrative, technical and commercial management`,
        blocks: [
          { p: `Technical and administrative management are often mentioned in the same breath, but they are different tasks. We distinguish three components, which you can take separately or in combination.` },
          {
            table: {
              head: [`Component`, `What it covers`, `Examples of tasks`],
              rows: [
                [`Administrative management`, `The financial and contractual side of letting`, `Collecting rent, dealing with rent arrears (huurachterstand), preparing rent increases, settling service charges, keeping files up to date`],
                [`Technical management`, `The physical condition of the building`, `Handling repair requests, planning maintenance and having it carried out, comparing quotes, handovers when tenants change`],
                [`Commercial management`, `Letting and the return on the building`, `Finding and selecting tenants, checking the rent against the points system (puntenstelsel) and the market, limiting vacancy`],
              ],
              note: `Which tasks you entrust to Windmill Invest is set out in the management agreement. Anything not included there does not fall under our management.`,
            },
          },
        ],
      },
      {
        h: `Who is property management for?`,
        blocks: [
          {
            ul: [
              `Private landlords with one or a few homes who no longer want to, or can, handle the letting themselves.`,
              `Investors with a growing portfolio who need fixed processes and periodic reporting.`,
              `Owners who live abroad and need a regular point of contact in the Netherlands.`,
              `Heirs who have inherited a let property and first want an overview before deciding whether to keep or sell.`,
              `Owners of commercial buildings, shops or [mixed-use property](/mixed-use-vastgoed/) with several tenants and different tenancy regimes.`,
            ],
          },
          { p: `If you are unsure whether management suits your situation, we will discuss it with you without obligation. We look at every request and give an honest answer.` },
        ],
      },
      {
        h: `What Windmill does itself and what partners do`,
        blocks: [
          { p: `Windmill Invest coordinates the management and is your point of contact. For hands-on work we work with partners: maintenance firms and contractors for repairs and maintenance, installers for heating, ventilation and electrics among other things, and legal partners for debt collection and tenancy disputes. We do not give legal or tax advice ourselves. If an issue calls for it, we bring in a lawyer or tax adviser in consultation with you.` },
          { p: `Since 1 July 2023 the **Good Landlordship Act (Wet goed verhuurderschap)** has applied. Among other things, it requires landlords not to discriminate when selecting tenants, to inform tenants in writing (the duty to inform), not to ask for a deposit higher than twice the basic rent, and to state service charges separately from the basic rent. Good management helps you build these obligations into your processes. You can read how we do this under [rental management](/verhuurbeheer/).` },
          { p: `Different rules apply to commercial property: retail and hospitality premises fall under Article 7:290 of the Dutch Civil Code (BW), other commercial premises under Article 7:230a BW. We manage within the terms of the tenancy agreement, which is often based on an ROZ model.` },
        ],
      },
      {
        h: `How management of your property starts`,
        blocks: [
          {
            ol: [
              `**Introduction.** We discuss your building or portfolio, the tenants and your wishes, and request the documents, such as tenancy agreements and the rent roll.`,
              `**Proposal and management agreement.** You receive a written proposal with the tasks, working method and fee. Once you agree, we set everything out in a management agreement.`,
              `**Transfer of files.** We take over the administration, check existing arrangements and inform the tenants of their new point of contact.`,
              `**Technical baseline survey.** Where necessary, we have the condition of the building recorded, so that maintenance can be planned from the start.`,
              `**Management and reporting.** Ongoing management begins. You receive a periodic report; larger decisions are agreed with you in advance.`,
            ],
          },
        ],
      },
      {
        h: `Reporting: insight without noise`,
        blocks: [
          { p: `Good management stands or falls with clear information. Our reports show, among other things, rent received and outstanding, maintenance carried out and planned, and points for attention, such as a tenancy agreement that is coming to an end or a rent that does not match the points system. The frequency and format are agreed in the management agreement.` },
          { p: `For investors with several properties, we extend the reporting with key figures per building, such as occupancy rate and maintenance backlog. This ties in with [managing a property portfolio](/vastgoedportefeuillebeheer/), where the emphasis is on strategic choices.` },
        ],
      },
      {
        h: `Services within property management`,
        blocks: [
          {
            cards: [
              { t: `Rental management`, d: `Rent collection, tenant contact, contracts and compliance with the rental rules for your homes.`, href: '/verhuurbeheer/', label: `Rental management` },
              { t: `Maintenance coordination`, d: `Planned and corrective maintenance, a long-term maintenance plan and management of specialist contractors.`, href: '/onderhoudscoordinatie/', label: `Maintenance coordination` },
              { t: `Property portfolio management`, d: `Key figures, reporting and hold/sell analyses for investors with several buildings.`, href: '/vastgoedportefeuillebeheer/', label: `Portfolio management` },
              { t: `Making property more sustainable`, d: `Improving the energy label and planning sustainability measures together with maintenance.`, href: '/vastgoed-verduurzamen/', label: `Making property more sustainable` },
              { t: `Selling an investment property`, d: `Would you rather sell than manage? We assess whether your building fits our acquisition criteria.`, href: '/beleggingspand-verkopen/', label: `Selling an investment property` },
            ],
          },
          { callout: { t: `Management or sale: the choice remains yours`, d: `Sometimes it becomes clear during management that selling suits your plans better. Windmill Invest is also a direct buyer of property, but that is separate from management: you are never obliged to sell to us. If you wish, we will assess without obligation whether your building fits our acquisition criteria. If it does not, we will tell you honestly. Read more about [selling a tenanted home](/verhuurde-woning-verkopen/).` } },
        ],
      },
    ],
    faq: [
      { q: `What exactly does a property manager do?`, a: `A property manager takes over the day-to-day care of the property on the owner's behalf: collecting rent, dealing with tenants, arranging maintenance and keeping the administration up to date. The tasks Windmill Invest carries out are set out in the management agreement. That way you know exactly what you can expect from us and what you continue to do yourself.` },
      { q: `What is the difference between property management and asset management?`, a: `Property management is the operational management of a building: tenants, rent and maintenance. Asset management focuses on the strategy and return of a portfolio, such as the choice between keeping, improving or selling. Windmill Invest can provide both, separately or in combination.` },
      { q: `What does property management cost?`, a: `The fee depends on the type of property, the number of rental units and the tasks you entrust to us. Common arrangements are a percentage of the rental income or a fixed amount per unit, sometimes supplemented by agreements for additional work. You always receive a written proposal from us first, so you know in advance where you stand.` },
      { q: `Can I take only technical or only administrative management?`, a: `Yes, you can. Some owners prefer to keep contact with tenants themselves and outsource only the administration or the maintenance. In the management agreement we set out which components you take and how the tasks are divided between you and Windmill Invest.` },
      { q: `Does Windmill Invest also manage commercial buildings?`, a: `Yes. Besides homes, we also manage offices, commercial premises, shops and mixed-use buildings. Commercial property is subject to different tenancy rules and contracts, such as the ROZ model, and often a different division of maintenance between tenant and landlord. We take this into account in the proposal.` },
      { q: `What will my tenants notice if I hand over the management?`, a: `For your tenants, nothing changes in the substance of their tenancy agreement; only the point of contact changes. We inform them in writing of the new contact details and of how they can report repairs and ask questions. We take over existing arrangements on the basis of the file you provide.` },
      { q: `Do I have to sell my building to Windmill if you manage it?`, a: `No. Management and acquisition are separate. If at some point you want to sell, we can assess without obligation whether your building fits our acquisition criteria, but you are free to choose another route, for example through an estate agent (makelaar).` },
    ],
    cta: { title: `Want to hand over the management of your property?`, text: `Tell us which building or portfolio it concerns and which tasks you want to outsource. You will receive a proposal without obligation, with a clear description of what we do.`, button: `Request management` },
  },

  {
    slug: '/verhuurbeheer/',
    group: 'beheer',
    template: 'service',
    nav: `Rental management`,
    seoTitle: `Rental management for your let home │ Windmill Invest`,
    meta: `Rental management by Windmill Invest: rent collection, tenant contact, contracts and maintenance, with attention to the Good Landlordship Act. Request a proposal.`,
    h1: `Rental management for your rental home`,
    keyword: `rental management Netherlands`,
    secondary: [`managing a tenanted home`, `letting management Netherlands`, `have rental property managed`, `rental management costs`],
    form: 'beheer',
    related: ['/vastgoedbeheer/', '/onderhoudscoordinatie/', '/verhuurde-woning-verkopen/', '/kennisbank/koop-breekt-geen-huur/'],
    eyebrow: `Management · Letting homes`,
    intro: `Rental management (verhuurbeheer) means that a professional party handles the letting of your home on your behalf, from tenant screening (huurdersselectie) and rent collection to repair requests and the annual rent increase. Windmill Invest provides this for private landlords and investors throughout the Netherlands. You and we set out in a written management agreement (beheerovereenkomst) which tasks we take over.`,
    heroPoints: [`One point of contact for you and your tenants`, `Attention to rental rules and the points system`, `Tasks and fee agreed on paper in advance`],
    sections: [
      {
        h: `What is rental management?`,
        blocks: [
          { p: `Letting a home seems simple, but in practice it demands a lot of attention. Tenants must be selected carefully, the rent must come in on time, repairs must be dealt with and the rules change regularly. With **rental management**, also known as huurbeheer, Windmill Invest takes these tasks off your hands. You keep an overview and make the major decisions, but you are no longer your tenants' first point of contact.` },
          { p: `Rental management is part of our wider [property management](/vastgoedbeheer/). Whereas general management also covers commercial buildings and portfolio strategy, this is about managing let homes and the relationship with your tenants. It is suitable for a single rental home, but also for investors with several homes spread across the country.` },
        ],
      },
      {
        h: `Tasks you can outsource`,
        blocks: [
          { p: `We tailor the exact package to your situation. Common components are:` },
          {
            ul: [
              `**Tenant screening**: advertising, viewings, screening and a selection procedure set out in advance that does not discriminate.`,
              `**Tenancy agreement**: drawing up the tenancy agreement on the basis of a standard model or checking an existing contract, with the service charges (servicekosten) stated separately from the basic rent.`,
              `**Rent collection and rent arrears**: monitoring payments, sending reminders and, in the case of persistent arrears (huurachterstand), handing the collection over to a legal partner once you agree.`,
              `**Tenant contact**: one point of contact for questions, reports and complaints.`,
              `**Repairs and maintenance**: assessing reports and bringing in a maintenance firm or installer, in line with the arrangements on [maintenance coordination](/onderhoudscoordinatie/).`,
              `**Annual rent increase**: preparing the proposal within the statutory and contractual limits.`,
              `**Service charges**: drawing up and explaining the annual statement.`,
              `**Changes of tenant**: check-in and check-out with an inspection report and settlement of the deposit.`,
            ],
          },
          { p: `Anything not included in the management agreement does not fall under the management. This prevents misunderstandings about who is responsible for what.` },
        ],
      },
      {
        h: `Rental rules you deal with as a landlord`,
        blocks: [
          { p: `The rules for landlords have changed considerably in recent years. Since 1 July 2023 the **Good Landlordship Act (Wet goed verhuurderschap)** has applied. Among other things, it requires landlords not to discriminate when selecting tenants, to inform tenants in writing (the duty to inform), not to ask for a deposit higher than twice the basic rent, and to include the service charges separately from the basic rent in the tenancy agreement.` },
          { p: `In addition, since 1 July 2024 the Affordable Rent Act (Wet betaalbare huur) and the Fixed-Term Tenancy Abolition Act (Wet vaste huurcontracten) have applied. Under the Affordable Rent Act, the home valuation system (woningwaarderingsstelsel), also known as the points system (puntenstelsel), now also applies to the mid-rent segment; the maximum rent depends on the number of points. Under the Wet vaste huurcontracten, landlords may in principle only offer tenancy agreements for an indefinite period, with limited exceptions.` },
          { p: `In our management we build these rules into fixed working methods: a set selection procedure, standard information for new tenants and a check of the rent against the points system for every new letting. For the legal assessment of a specific situation, such as a tenancy dispute, we bring in a legal partner. If you want to know what the rules mean for your return, also read [how to calculate the return on property](/vastgoed-rendement-berekenen/).` },
        ],
      },
      {
        h: `How management of your rental home works`,
        blocks: [
          {
            ol: [
              `**Intake.** We discuss your home, the current tenant and what you want to outsource. If you are not letting yet, we also look at how lettable the home is and at a rent that fits within the points system and the market.`,
              `**Proposal.** You receive a written proposal with the tasks, the working method, the reporting and the fee.`,
              `**Management agreement.** Once you agree, we set out the arrangements, including an authorisation to collect the rent and a budget within which we may have repairs carried out without consulting you first.`,
              `**Handover.** We take over the tenancy agreements, payment details and maintenance history, and inform your tenant of the new point of contact.`,
              `**Ongoing management.** We collect the rent, deal with reports and keep the file up to date. Decisions outside the agreed limits are put to you first.`,
              `**Reporting and review.** You periodically receive an overview of receipts, costs and particulars. Once a year we discuss the rent increase, maintenance and any points for improvement.`,
            ],
          },
        ],
      },
      {
        h: `Rental management costs: how fees are structured`,
        blocks: [
          { p: `There is no fixed market price for managing a rental home. In practice you mainly see these forms, sometimes in combination:` },
          {
            table: {
              head: [`Form`, `How it works`, `What to look out for`],
              rows: [
                [`Percentage of the rent`, `The manager receives a fixed percentage of the rent actually received.`, `Which tasks does it cover, and does the percentage apply to the basic rent or include service charges?`],
                [`Fixed amount per unit`, `A fixed fee per home per month or per year, regardless of the level of the rent.`, `Which tasks are included and what falls outside them?`],
                [`Fee per task`, `Separate rates for, for example, a new letting, a change of tenant or the service charge statement.`, `Which tasks are charged separately?`],
              ],
              note: `Windmill Invest does not quote standard rates. You receive a written proposal tailored to your home and the chosen package of tasks.`,
            },
          },
          { callout: { t: `What we do not do`, d: `Our management is not a legal or tax service. For a tenancy dispute, proceedings before the Rent Tribunal (Huurcommissie) or a debt collection case, we work with a legal partner. Questions about box 3, the valuation of your let home or the tax consequences of letting should be put to a tax adviser. For an initial orientation, you can read our article on [box 3 and property in 2026](/kennisbank/box-3-vastgoed-2026/).` } },
        ],
      },
      {
        h: `Would you rather stop letting?`,
        blocks: [
          { p: `Sometimes letting no longer suits your situation. In that case there are other routes.` },
          {
            cards: [
              { t: `Selling a tenanted home`, d: `Selling with a sitting tenant: the tenancy agreement passes to the buyer.`, href: '/verhuurde-woning-verkopen/', label: `Selling a tenanted home` },
              { t: `Sale does not break a lease`, d: `What selling a let home means for you and your tenant.`, href: '/kennisbank/koop-breekt-geen-huur/', label: `Sale does not break a lease` },
              { t: `Managing a property portfolio`, d: `Several homes? Key figures and strategic choices per building.`, href: '/vastgoedportefeuillebeheer/', label: `Portfolio management` },
            ],
          },
        ],
      },
    ],
    faq: [
      { q: `What does rental management cost?`, a: `That depends on the number of homes, the tasks you outsource and the form of the fee: a percentage of the rent received, a fixed amount per unit or separate rates per task. Windmill Invest does not quote standard rates, but sends you a tailored written proposal. It also states which work falls outside the fee.` },
      { q: `When is it sensible to have a home managed?`, a: `Many landlords choose management when they have little time, live far away or let several homes. The increase in regulations is another reason: if you do not deal with tenancy law every day, you are more likely to miss an obligation. With management you stay in control of major decisions, while the day-to-day work is outsourced.` },
      { q: `Is huurbeheer the same as verhuurbeheer?`, a: `In practice the two Dutch terms are used interchangeably. Both refer to handling the letting on the owner's behalf: tenants, rent, contracts and reports. More important than the name is exactly what is in the management agreement.` },
      { q: `How does Windmill Invest deal with rent arrears?`, a: `We monitor rent payments and, in the event of arrears, send reminders according to a fixed procedure. Where possible, we look for a solution together with the tenant, such as a payment arrangement in consultation with you. If that does not work, we hand the file over to a legal partner for debt collection once you agree.` },
      { q: `Can I choose the tenant myself if my home is under management?`, a: `Yes, if you wish. We can carry out the selection entirely or put suitable candidates to you. In both cases we work with objective criteria set out in advance, so that the selection complies with the ban on discrimination in the Good Landlordship Act (Wet goed verhuurderschap).` },
      { q: `Can I still offer a fixed-term tenancy agreement?`, a: `Since 1 July 2024, landlords may in principle only offer tenancy agreements for an indefinite period. Limited exceptions apply. Have a legal adviser assess whether an exception applies in your situation.` },
      { q: `Does Windmill Invest also manage flats in an owners' association (VvE)?`, a: `Yes. For a flat in an owners' association (VvE), we manage the letting and the contact with your tenant, while the VvE remains responsible for the common parts. On request, we keep the VvE documents up to date for you and flag decisions that affect your home or the service charges.` },
    ],
    cta: { title: `Want to have your rental home managed?`, text: `Tell us which home it concerns and which tasks you want to outsource. You will receive a proposal without obligation, with the working method and the fee on paper.`, button: `Request a proposal` },
  },

  {
    slug: '/onderhoudscoordinatie/',
    group: 'beheer',
    template: 'service',
    nav: `Maintenance coordination`,
    seoTitle: `Property maintenance coordination and MJOP │ Windmill Invest`,
    meta: `Property maintenance coordination by Windmill Invest: planned and corrective maintenance, MJOP and management of contractors for homes and commercial buildings.`,
    h1: `Property maintenance coordination: planning, arranging and monitoring`,
    keyword: `property maintenance coordination Netherlands`,
    secondary: [`property maintenance Netherlands`, `long-term maintenance plan`, `MJOP`, `rental home maintenance`],
    form: 'beheer',
    related: ['/vastgoedbeheer/', '/verhuurbeheer/', '/vastgoed-verduurzamen/', '/vastgoedrenovatie/'],
    eyebrow: `Management · Maintenance`,
    intro: `Property maintenance coordination (onderhoudscoördinatie) is the service in which one party plans, organises and monitors the maintenance of your building, from a dripping tap to a new roof. Windmill Invest coordinates maintenance for owners of let homes, investors and owners of commercial buildings. The hands-on work is done by maintenance firms, contractors and installers we work with.`,
    heroPoints: [`Planned and corrective maintenance`, `A long-term maintenance plan as the basis`, `Work by specialist contractors, coordination by us`],
    sections: [
      {
        h: `Why coordinate maintenance?`,
        blocks: [
          { p: `Maintenance is one of the largest cost items of property and at the same time one of the most important factors for value and lettability. If you only carry out maintenance when something breaks, you often pay more and risk tenant complaints, consequential damage and poorer energy performance. Good **property maintenance** therefore starts with a plan.` },
          { p: `With our property maintenance coordination, we take charge. We identify what is needed, request quotes, plan the work with tenants and specialist contractors, and check the result. You keep the decision on larger expenditure.` },
        ],
      },
      {
        h: `Planned and corrective maintenance`,
        blocks: [
          { p: `Maintenance falls roughly into two types. Each calls for a different approach.` },
          {
            table: {
              head: [`Characteristic`, `Planned maintenance`, `Corrective maintenance`],
              rows: [
                [`What it is`, `Maintenance scheduled in advance, such as painting, roofing or replacing a central heating boiler at the end of its service life`, `Repairing a fault or defect that arises unexpectedly, such as a leak or a faulty installation`],
                [`Trigger`, `Age and condition of components, inspections and the long-term maintenance plan`, `A report from the tenant, an inspection or damage`],
                [`Costs`, `Easy to budget for and spread over the years`, `Hard to predict and often more expensive per intervention`],
                [`Windmill's role`, `Drawing up or updating the plan, comparing quotes, scheduling the work`, `Assessing the report, bringing in the right contractor, checking the repair`],
              ],
              note: `The larger the share of planned maintenance, the more predictable the costs. In practice it is not possible to avoid corrective maintenance entirely.`,
            },
          },
        ],
      },
      {
        h: `The long-term maintenance plan (MJOP)`,
        blocks: [
          { p: `A **long-term maintenance plan**, **MJOP** for short (meerjarenonderhoudsplan), sets out for each building component which maintenance is needed when and what it is expected to cost. Think of the roof, façade, window frames, installations and common areas. The plan is drawn up on the basis of an inspection of the building's condition and updated periodically.` },
          { p: `For flats, the owners' association (VvE) plays a central role. VvEs are required to set aside reserves for maintenance, and an MJOP is a common basis for this. If you own a flat in a VvE, the VvE takes care of maintaining the common parts and you are responsible for your private part. We follow the VvE's decisions for you and align the maintenance of your own home with them.` },
          { p: `For owners of a whole building or several buildings, we have an MJOP drawn up by a building surveyor, or we update an existing plan. The plan is also a good basis for sustainability improvements: if you are replacing the window frames or the central heating boiler anyway, you can look at insulation or a different heat source at the same time. Read more about [making property more sustainable](/vastgoed-verduurzamen/).` },
        ],
      },
      {
        h: `Maintenance of rental homes: who is responsible for what?`,
        blocks: [
          { p: `With let homes, maintenance is divided between tenant and landlord. The landlord is in principle responsible for major maintenance and remedying defects. Minor repairs are at the tenant's expense; which repairs these are is set out in the **Minor Repairs Decree (Besluit kleine herstellingen)**.` },
          {
            ul: [
              `**For the tenant**: minor, everyday repairs, such as unblocking drains, whitewashing or painting interior walls and keeping the garden tidy.`,
              `**For the landlord**: major maintenance and the repair of defects, such as a leaking roof, damp problems or a faulty central heating boiler.`,
              `**For commercial property**: the division follows mainly from the tenancy agreement, which is often based on an ROZ model. The arrangements may differ per building and per tenant.`,
            ],
          },
          { p: `For every report, we first assess whether the repair is at the tenant's or the landlord's expense, and explain this clearly to both parties. If a difference of opinion arises that cannot be resolved through discussion, you can bring in a legal partner.` },
        ],
      },
      {
        h: `How our property maintenance coordination works`,
        blocks: [
          {
            ol: [
              `**Report or signal.** A tenant reports a defect, an inspection brings something to light or the MJOP indicates that a component is due for replacement.`,
              `**Assessment.** We determine what is needed, how urgent it is and at whose expense the repair will be. If in doubt, we have a contractor take a look on site.`,
              `**Quote and approval.** For work above the agreed budget, we request one or more quotes and put them to you with an explanation. Smaller work within the agreed limit we have carried out straight away.`,
              `**Execution.** A maintenance firm, contractor or installer carries out the work. We coordinate the schedule with the tenant and arrange access to the home or building.`,
              `**Inspection and recording.** Once the work is finished, we check the result, process the invoice and record the work in the building's maintenance file.`,
            ],
          },
          { callout: { t: `Coordination by Windmill, execution by specialist contractors`, d: `Within our property maintenance coordination, Windmill Invest does not carry out any building work itself. We coordinate: we define the requirement clearly, select the contractor, monitor schedule and budget, and check the completed work. We have inspections and MJOPs carried out by a building surveyor, and technical work by contractors and installers. This way you keep one point of contact, while the work is done by specialists.` } },
        ],
      },
      {
        h: `Major backlog: more needed than coordination`,
        blocks: [
          { p: `Our property maintenance coordination is intended for ongoing and planned maintenance. Sometimes, however, the backlog is so large that individual repairs are no longer enough. An integrated approach is then better, in which maintenance, sustainability improvements and possibly a new layout are considered together. That falls under [property renovation](/vastgoedrenovatie/).` },
          { p: `If large-scale maintenance does not fit your plans, selling may be an option. Windmill Invest buys buildings with overdue maintenance when they fit our acquisition criteria. We assess this per building, and if it does not fit, we will tell you honestly. See also [selling a house with overdue maintenance](/huis-verkopen-met-achterstallig-onderhoud/). For an overview of all our management services, go to [property management](/vastgoedbeheer/).` },
        ],
      },
    ],
    faq: [
      { q: `What is an MJOP and do I need one?`, a: `An MJOP is a long-term maintenance plan (meerjarenonderhoudsplan): an overview of the maintenance needed per building component over the coming years, with a cost estimate. For an owners' association (VvE), it is a common basis for the mandatory maintenance reserve. For owners of let buildings, it helps to spread costs and limit surprises.` },
      { q: `Who pays for the maintenance of a rental home?`, a: `The landlord is in principle responsible for major maintenance and remedying defects. Minor repairs, as set out in the Minor Repairs Decree (Besluit kleine herstellingen), are at the tenant's expense. For commercial premises, the division is determined mainly by the tenancy agreement.` },
      { q: `Does Windmill Invest carry out the maintenance itself?`, a: `No. We coordinate the maintenance and bring in maintenance firms, contractors and installers to carry it out. We have inspections and the drawing up of an MJOP done by a building surveyor. You do, however, keep one point of contact: Windmill Invest.` },
      { q: `Can I keep using my own tradesperson?`, a: `Yes. If you have a regular contractor or installer you have had good experiences with, we can include them in the coordination. In the management agreement we set out which parties we bring in and within what budget we may place orders without consulting you first.` },
      { q: `How do you deal with urgent repairs?`, a: `For urgent situations, such as a serious leak or the heating failing, we agree a procedure in advance with you and with the contractors. It sets out how the tenant makes an urgent report and up to what amount we may place an order straight away. How quickly a contractor arrives on site depends on their availability; we give no guarantee on that.` },
      { q: `What does maintenance coordination cost?`, a: `Coordination can be part of a management agreement or agreed as a separate assignment, for example for a large maintenance project. The cost of the work itself is at your expense, on the basis of quotes or arrangements you approve in advance. For our fee, you receive a written proposal.` },
      { q: `Does maintenance also help achieve a better energy label?`, a: `Often, yes. When replacing window frames, roofing or installations, it is a logical moment to include insulation or a more efficient installation as well. Whether and how much the label improves is assessed by an energy adviser. If you wish, we include sustainability measures in the maintenance planning.` },
    ],
    cta: { title: `Want to hand over your maintenance?`, text: `Tell us which building it concerns and what is going on, from individual repairs to an MJOP. You will receive a proposal for the coordination without obligation.`, button: `Get in touch` },
  },

  {
    slug: '/vastgoedportefeuillebeheer/',
    group: 'beheer',
    template: 'service',
    nav: `Portfolio management`,
    seoTitle: `Managing and steering a property portfolio │ Windmill Invest`,
    meta: `Manage your property portfolio with a clear overview: Windmill Invest tracks key figures per building and supports the choice between keeping, improving and selling.`,
    h1: `Managing a property portfolio with clear key figures`,
    keyword: `property portfolio management Netherlands`,
    secondary: [`real estate asset management Netherlands`, `portfolio management property`, `property asset management`, `property portfolio reporting`],
    form: 'beheer',
    related: ['/vastgoedbeheer/', '/vastgoedinvesteringsanalyse/', '/vastgoedportefeuille-verkopen/', '/vastgoed-waardebepaling/'],
    eyebrow: `Management · Portfolio`,
    intro: `Managing a property portfolio goes beyond the day-to-day management of tenants and maintenance: it is about steering on return, risk and the future value of each building. Windmill Invest supports private investors, families and other owners of several buildings with reporting, key figures and well-founded choices between keeping, improving and selling.`,
    heroPoints: [`Key figures per building and per portfolio`, `A well-founded choice: keep, improve or sell`, `Linked to management and maintenance`],
    sections: [
      {
        h: `Managing a property portfolio: asset management and property management`,
        blocks: [
          { p: `In the property world, a distinction is made between **property management** and **asset management**. Property management is the operational management: collecting rent, serving tenants, having maintenance carried out. Asset management looks one level higher: what role does each building play in the portfolio, where are the risks, and which building will still do what you expect of it in a few years' time?` },
          { p: `In smaller portfolios the two often overlap, and that is precisely where blind spots arise. A building can be fully let and still underperform, for example because the rent is above the maximum under the points system (puntenstelsel), the energy label is low or major replacements are coming up. Real estate asset management makes these points visible, so that you can make a conscious choice.` },
          { p: `Managing a property portfolio therefore calls for both execution and strategy. Windmill Invest combines both roles. The day-to-day work runs through [rental management](/verhuurbeheer/) and [maintenance coordination](/onderhoudscoordinatie/); in portfolio management we bring the figures together and translate them into choices.` },
        ],
      },
      {
        h: `The key figures we monitor`,
        blocks: [
          { p: `Good reporting is limited to the figures that really matter. We work with the following key figures, per building and for the portfolio as a whole.` },
          {
            table: {
              head: [`Key figure`, `What it measures`, `Why it matters`],
              rows: [
                [`Occupancy rate`, `The share of lettable units or square metres that is actually let`, `Vacancy costs income directly and sometimes points to a problem with price, condition or location`],
                [`Rent arrears`, `Outstanding rent, broken down by tenant and age of the debt`, `Rising arrears call for timely action and may point to a risk with a specific tenant`],
                [`Maintenance backlog`, `Deferred maintenance compared with the long-term maintenance plan`, `Deferral seems cheap, but often leads to higher costs, consequential damage and loss of value`],
                [`Energy labels`, `The label per property and the distribution across the portfolio`, `For homes, energy performance counts towards the points system; most offices have required at least label C since 1 January 2023`],
                [`Rent level`, `The current rent compared with the maximum rent under the points system and with the market`, `A rent that is too high is a legal risk; a rent that is too low leaves return on the table`],
              ],
              note: `Which key figures appear in your report and how often you receive it are set out in the management agreement.`,
            },
          },
        ],
      },
      {
        h: `Reporting on your property portfolio`,
        blocks: [
          { p: `You periodically receive an overview showing the key figures per building side by side, with a brief explanation: what has changed, what needs attention and which decisions are coming up? Think of a commercial tenancy agreement that is coming to an end, a major replacement under the long-term maintenance plan (MJOP) or a rent increase that needs to be prepared.` },
          { p: `For commercial buildings and shops, we also include the remaining term of the tenancy agreements, because notice dates and renewals largely determine how secure the income is. Tenancy protection differs by type of premises: retail and hospitality premises fall under Article 7:290 of the Dutch Civil Code (BW), other commercial premises under Article 7:230a BW.` },
          { p: `If you want to manage your property portfolio on the basis of facts rather than gut feeling, a fixed format is what helps most. That is why we report in the same format every period, so that developments become visible over time.` },
        ],
      },
      {
        h: `Keep, improve or sell: the hold/sell analysis`,
        blocks: [
          { p: `At set moments, or when there is reason to, we carry out a hold/sell analysis per building. It follows four steps.` },
          {
            ol: [
              `**Recording the current position.** We list the rental income, costs, state of maintenance, energy label and an indication of the current value.`,
              `**Calculating scenarios.** We compare scenarios, such as holding unchanged, investing in maintenance or sustainability improvements, or selling, with the expected cash flows and risks for each scenario.`,
              `**Testing the preconditions.** We look at the rental rules, the position of sitting tenants and possible tax consequences. You have the latter assessed by your tax adviser; we supply the figures.`,
              `**Weighing up and deciding.** You receive a well-founded assessment, including the assumptions on which it is based. The decision is yours.`,
            ],
          },
        ],
      },
      {
        h: `When selling is a logical step`,
        blocks: [
          { p: `A hold/sell analysis may show that a building would be better sold, for example because the investment required is out of proportion to the expected rent, or because you want to simplify the portfolio. You can then sell individual buildings or a larger part of the portfolio in one go. Read more about [selling a property portfolio](/vastgoedportefeuille-verkopen/).` },
          { p: `Windmill Invest itself buys property when it fits our acquisition criteria. To prevent conflicts of interest, we always make this transparent in advance: if we are interested in a building from your portfolio ourselves, we say so, and you are free to choose another buyer or an estate agent (makelaar). If you want a building or scenario calculated in detail, you can have a [property investment analysis](/vastgoedinvesteringsanalyse/) carried out.` },
        ],
      },
      {
        h: `Who is property portfolio management suitable for?`,
        blocks: [
          { p: `Managing a property portfolio with fixed key figures is particularly worthwhile in these situations:` },
          {
            ul: [
              `Private investors with several let homes who want an overview of return and risk.`,
              `Families or heirs who own property together and need clear, shared reporting.`,
              `Owners of a mixed portfolio of homes, shops and commercial premises.`,
              `Investors who want to see the consequences of the points system, the rental rules or [box 3 for property](/kennisbank/box-3-vastgoed-2026/) per building.`,
            ],
          },
          { p: `If you have one building, [property management](/vastgoedbeheer/) with an annual review is often sufficient.` },
        ],
      },
    ],
    faq: [
      { q: `What is the difference between property management and real estate asset management?`, a: `Property management (vastgoedbeheer) is about day-to-day execution: rent, tenants and maintenance. Asset management focuses on the strategy of the portfolio: return, risk and the choice between keeping, improving and selling. Windmill Invest can provide both, separately or in combination.` },
      { q: `From how many buildings is portfolio management worthwhile?`, a: `There is no fixed threshold. Even with a few buildings it can be valuable to track key figures and periodically make a hold/sell assessment, especially if the buildings differ in type, age or tenancy regime. With one building, an annual review within regular management is often sufficient.` },
      { q: `What is in a report on my property portfolio?`, a: `As standard, the key figures per building: occupancy rate, rent arrears, maintenance backlog, energy label and rent level compared with the points system and the market. In addition, a brief explanation of what has changed and which decisions are coming up. We agree the format and frequency together.` },
      { q: `What does asset management for property involve in practice?`, a: `Asset management for property means that for each building you consciously choose what role it plays in your portfolio and what should happen with it. That could be: holding it as it is, investing in maintenance or sustainability improvements, adjusting the letting strategy or selling. These choices are backed up by key figures and scenarios.` },
      { q: `Does Windmill Invest give investment advice?`, a: `No. We provide analyses, figures and a well-founded assessment, but no regulated investment advice, financial advice or tax advice. For the tax and financing side, you work with your own tax adviser or financial adviser, with whom we are happy to share the figures.` },
      { q: `Can Windmill Invest buy buildings from my portfolio?`, a: `Yes, if a building fits our acquisition criteria. We always make it clear in advance when we are acting as a potential buyer. You are never obliged to sell to us and can always choose another buyer or an estate agent.` },
      { q: `How is the value of my buildings determined in the report?`, a: `In the report we use an indicative value assessment based on market data and rental income. This is not a validated valuation report. If you need a formal valuation, for example for financing, this can be done through an NRVT-registered valuer from our network.` },
    ],
    cta: { title: `Want more control over your portfolio?`, text: `Tell us which buildings you own and what you want to achieve. We will discuss without obligation which reporting and support suit you.`, button: `Request a conversation` },
  },
];
