// English translation of content/kennisbank.js (knowledge base articles). Same pages, same order, same structure.

const DISCLAIMER_FISCAAL = `This article is general information and not legal or tax advice. Rates and conditions may change, and the consequences depend on your personal situation. Have your situation assessed by a civil-law notary (notaris), tax specialist (fiscalist) or tax adviser before you make a decision.`;

export default [
  {
    slug: '/kennisbank/overdrachtsbelasting-2026/',
    group: 'kennisbank',
    template: 'article',
    nav: `Transfer tax 2026`,
    seoTitle: `Dutch transfer tax 2026: all rates │ Windmill Invest`,
    meta: `Dutch transfer tax 2026: which rates apply to first-time buyers, owner-occupiers, investors and commercial property, who pays and how the tax base works.`,
    h1: `Transfer tax 2026: rates, exemption and who pays`,
    keyword: `transfer tax Netherlands 2026`,
    secondary: [`Dutch transfer tax investors`, `transfer tax 8 percent Netherlands`, `transfer tax commercial property Netherlands`, `first-time buyer exemption 2026 Netherlands`],
    form: 'investeerder',
    related: ['/beleggingspand-kopen/', '/vastgoed-rendement-berekenen/', '/kennisbank/bar-nar-rendement/', '/kennisbank/box-3-vastgoed-2026/'],
    eyebrow: `Knowledge base · Taxes`,
    intro: `Transfer tax (overdrachtsbelasting) in 2026 has four rates: 0% with the first-time buyer exemption (startersvrijstelling), 2% for a home you will live in yourself, 8% for a home you will not live in yourself and 10.4% for other property, such as commercial buildings. The buyer pays the tax through the civil-law notary (notaris), on the purchase price or, if higher, the fair market value (waarde in het economisch verkeer). Below you can read which rate applies when and what to look out for as an investor.`,
    heroPoints: [`Four rates: 0%, 2%, 8% and 10.4%`, `Residential investors have paid 8% since 2026`, `The buyer pays, the notary remits`],
    sections: [
      {
        h: `What is transfer tax?`,
        blocks: [
          { p: `Transfer tax (overdrachtsbelasting) is a tax you pay when you acquire ownership of immovable property, such as a home, a commercial building or a plot of land. The tax may also be due when you acquire certain rights in property, such as a ground lease (erfpacht) or a right of superficies (opstal). The rules are set out in the Wet op belastingen van rechtsverkeer 1970 (Legal Transactions Taxes Act 1970); the Dutch Tax Administration (Belastingdienst) applies them.` },
          { p: `As a buyer, you notice little of the tax return itself. The civil-law notary (notaris) calculates the **transfer tax** at the transfer, includes the amount in the completion statement (nota van afrekening) and remits it to the Belastingdienst. Which transfer tax rate applies in 2026 depends on the type of property and on what you as the buyer will do with it. For a home, the notary will therefore ask you for a declaration about its use.` },
        ],
      },
      {
        h: `Transfer tax 2026: the four rates at a glance`,
        blocks: [
          { p: `Four rates apply to transfer tax in 2026. The most important change compared with 2025: since 1 January 2026, homes that the buyer does not live in themselves no longer fall under the general rate of 10.4%, but under a separate rate of 8%.` },
          {
            table: {
              head: [`Rate`, `When`],
              rows: [
                [`0% (first-time buyer exemption, startersvrijstelling)`, `You are aged 18 to 34 inclusive, will live in the home yourself as your main residence, the value of the home is not more than €555,000 and you have not used the exemption before.`],
                [`2%`, `You buy a home and will live in it yourself, other than temporarily, as your main residence, but you do not meet all the conditions for the first-time buyer exemption.`],
                [`8%`, `You buy a home that you will not use yourself as your main residence, such as a home to let, an investment or a second home. Until 1 January 2026, the rate for this was 10.4%.`],
                [`10.4%`, `All other property, such as commercial buildings, offices, shops and land.`],
              ],
              note: `Source: Belastingdienst. The civil-law notary assesses which rate applies to your transfer.`,
            },
          },
        ],
      },
      {
        h: `First-time buyer exemption 2026: the conditions`,
        blocks: [
          { p: `The first-time buyer exemption (startersvrijstelling) is intended for young buyers who will live in the home themselves. You are only entitled to it if you meet all the conditions:` },
          {
            ul: [
              `At the time of the transfer, you are aged 18 to 34 inclusive.`,
              `You will live in the home yourself, other than temporarily, as your main residence.`,
              `In 2026, the value of the home is not more than €555,000.`,
              `You have not used the first-time buyer exemption before.`,
              `You make a written declaration to the notary that you meet these conditions.`,
            ],
          },
          { p: `If two people buy a home together, the notary assesses the conditions for each buyer. If the value of the home is above the threshold, you pay 2% on the entire value, provided you will live in it yourself. The first-time buyer exemption is not intended for investors.` },
        ],
      },
      {
        h: `Transfer tax for investors: 8 percent on homes`,
        blocks: [
          { p: `For investors, the **8 percent** rate is the most important change in transfer tax for 2026. It applies to homes that the buyer does not use as their own main residence: a home you will let, a flat you hold as an investment or a second home. Anyone who paid 10.4% on the purchase of a rental home in 2025 now pays 8% on a comparable purchase.` },
          { p: `If you buy a home through a private limited company (bv) or another legal entity, the 8% rate generally applies as well, because a legal entity cannot itself live in a home. The reduced rate applies only to homes. For an office, shop or industrial building, 10.4% continues to apply. Whether a building counts as a home or as other property depends in principle on the actual situation at the time of the transfer. If you want to convert a commercial building into homes, have the notary and a tax specialist (fiscalist) assess in advance which rate applies.` },
          { p: `The lower rate does not automatically make a purchase profitable. Transfer tax is part of the total acquisition costs and reduces the net yield in the first year. In our article on [calculating BAR and NAR](/kennisbank/bar-nar-rendement/) you can read how to include these costs in a yield calculation.` },
        ],
      },
      {
        h: `Transfer tax on a commercial or mixed-use building`,
        blocks: [
          { p: `For a commercial building, office, shop, industrial building or plot of land, the general rate of **10.4%** applies in 2026. With commercial property, there is often also the question of whether the supply is subject to VAT (btw). The sale of an existing commercial building is in principle exempt from VAT, but buyer and seller can, under certain conditions, opt for a VAT-taxed supply. That has tax consequences for both parties; always have this assessed by a tax adviser.` },
          { p: `For a mixed-use building, for example a shop on the ground floor with a home above it, two rates can apply at the same time. The notary then splits the purchase price in proportion to the value of the residential part and the commercial part. The rate for homes applies to the residential part, depending on whether you will live there yourself, and 10.4% applies to the commercial part. A well-substantiated value allocation in the purchase agreement prevents disputes afterwards.` },
        ],
      },
      {
        h: `Who pays: buyer's costs or costs included?`,
        blocks: [
          { p: `By law, the buyer is the party liable for transfer tax. Existing homes and commercial buildings are usually sold **buyer's costs** (kosten koper, k.k.). The buyer then pays, on top of the purchase price, the transfer tax, the notary's fees for the deed of transfer and the costs of registration in the Kadaster. The seller pays their own costs, such as cancelling their mortgage. You can read which costs fall on the seller's side in our article on [the costs of selling a house](/kennisbank/kosten-huis-verkopen/).` },
          { p: `With **costs included** (vrij op naam, v.o.n.), the costs of the transfer are included in the purchase price. This is mainly the case with new-build property, where VAT rather than transfer tax is usually included in the price. Even with a v.o.n. price, check in the purchase agreement exactly which costs are included and which are not, such as the costs of a mortgage deed if you finance the purchase.` },
        ],
      },
      {
        h: `The tax base: purchase price or fair market value`,
        blocks: [
          { p: `Transfer tax is calculated on the purchase price or, if higher, the fair market value (waarde in het economisch verkeer). In short, that is the price the highest bidder would pay if the property were sold in the most suitable way and after the best preparation.` },
          { p: `In most cases, the purchase price is the tax base. The fair market value becomes relevant mainly if the price is clearly below market value, for example in a sale between family members or related parties. Movable property that you buy separately, such as loose fixtures and fittings, is in principle not subject to transfer tax. It must, however, be listed separately in the purchase agreement and have a realistic value.` },
        ],
      },
      {
        h: `New build: VAT instead of transfer tax`,
        blocks: [
          { p: `When you buy a new home or a new commercial building, you generally pay VAT (btw) rather than transfer tax. The supply of a building up to two years after it is first put into use and the supply of building land are subject to VAT. To prevent double taxation, an exemption from transfer tax usually applies: the so-called concurrence exemption (samenloopvrijstelling).` },
          { p: `For investors who buy new-build homes to let, the 8% rate therefore usually plays no role. The VAT is usually included in the v.o.n. price and generally cannot be reclaimed when letting homes, because residential rent is exempt from VAT. With new build, redevelopment and conversion, advice from a tax adviser is therefore especially important.` },
        ],
      },
      {
        h: `What does transfer tax in 2026 mean for your purchase?`,
        blocks: [
          { p: `Transfer tax in 2026 is a fixed item in every purchase budget. Include the tax, the notary's fees and any advisory costs before you make an offer. The difference between a home and a non-residential property, or between an existing and a new building, can also noticeably change the outcome. After the purchase, the annual tax also plays a role; for private investors, that is usually [Box 3 for property](/kennisbank/box-3-vastgoed-2026/).` },
          { p: `If you are considering [buying an investment property](/beleggingspand-kopen/), Windmill Invest can prepare an indicative analysis of the purchase, the buyer's costs and the expected rental yield. For the tax assessment, we work with a tax specialist or tax adviser; Windmill Invest does not itself give tax advice.` },
          { callout: { t: `General information`, d: DISCLAIMER_FISCAAL } },
        ],
      },
    ],
    faq: [
      { q: `How much transfer tax do I pay in 2026 as an investor?`, a: `For a home you will not live in yourself, such as a rental home or second home, you pay 8% transfer tax in 2026. For a commercial building, office, shop or land, 10.4% applies. The notary calculates the amount on the purchase price or, if higher, the fair market value.` },
      { q: `Do I pay 8 percent or 10.4 percent on a mixed-use building?`, a: `For a building with both a residential part and a commercial part, the notary splits the purchase price. The rate for homes applies to the residential part, depending on your own use, and 10.4% applies to the commercial part. Preferably record the value allocation in the purchase agreement.` },
      { q: `Does the seller ever pay transfer tax?`, a: `By law, the buyer is liable for the tax. In a purchase on a buyer's costs (kosten koper) basis, the buyer pays the tax directly through the notary. In a purchase on a costs-included (vrij op naam) basis, the transfer costs are included in the purchase price, so the buyer pays them indirectly.` },
      { q: `Can I use the first-time buyer exemption if I am going to let the home?`, a: `No. The first-time buyer exemption and the 2% rate only apply if you will live in the home yourself, other than temporarily, as your main residence. If you buy a home to let, 8% applies. If your situation changes after the purchase, consult a tax specialist about the possible consequences.` },
      { q: `Do I pay transfer tax on a new-build home?`, a: `Usually not. On a new home, you generally pay VAT, which is included in the v.o.n. price, and an exemption from transfer tax applies. If in doubt, for example with a building that has already been in use for some time, have the situation assessed by the notary or a tax adviser.` },
    ],
    cta: { title: `Want a purchase calculated?`, text: `Would you like to know what an investment property costs including buyer's costs and what it could yield? Windmill Invest will prepare an indicative analysis without obligation. For tax questions, we refer you to a tax specialist.`, button: `Request an analysis` },
    updated: '2026-10-28',
    sources: [
      `Belastingdienst — transfer tax rates (tarieven overdrachtsbelasting)`,
      `Belastingdienst — first-time buyer exemption from transfer tax (startersvrijstelling overdrachtsbelasting)`,
      `Wet op belastingen van rechtsverkeer 1970 (Legal Transactions Taxes Act 1970)`,
      `Wet op de omzetbelasting 1968 (VAT Act 1968) — supply of new immovable property`,
      `Rijksoverheid — transfer tax when buying a home (overdrachtsbelasting bij aankoop van een woning)`,
    ],
  },

  {
    slug: '/kennisbank/kosten-huis-verkopen/',
    group: 'kennisbank',
    template: 'article',
    nav: `Costs of selling a house`,
    seoTitle: `Costs of selling a house: 2026 overview │ Windmill Invest`,
    meta: `Costs of selling a house in the Netherlands: the costs you pay as seller, from estate agent and energy label to mortgage cancellation and early repayment fees.`,
    h1: `Costs of selling a house: which costs should you expect as a seller?`,
    keyword: `costs of selling a house Netherlands`,
    secondary: [`seller costs house sale Netherlands`, `estate agent fees Netherlands`, `seller's costs Netherlands`, `mortgage early repayment fee Netherlands`],
    form: 'verkoop',
    related: ['/huis-verkopen/', '/huis-verkopen-zonder-makelaar/', '/huis-verkopen-aan-opkoper/', '/kennisbank/overdrachtsbelasting-2026/'],
    eyebrow: `Knowledge base · Selling`,
    intro: `For the seller, the costs of selling a house consist mainly of the estate agent's commission if you use an estate agent (makelaar), the energy label, the notary's fees for cancelling your mortgage and sometimes an early repayment fee (boeterente). In a sale on a buyer's costs (kosten koper) basis, the buyer pays the transfer tax and the deed of transfer. Below you can read, item by item, when each cost arises and how to avoid surprises.`,
    heroPoints: [`The buyer usually pays the transfer tax`, `An energy label is mandatory when selling`, `An early repayment fee depends on your mortgage terms`],
    sections: [
      {
        h: `What costs do you have when selling a house?`,
        blocks: [
          { p: `When selling a house, many people think first of the proceeds. Even so, it is wise to also look at the costs of selling a house in advance. Some costs are unavoidable, such as the energy label and the notary's fees for cancelling your mortgage. Other costs depend on how you sell, with or without an estate agent, and on the terms of your mortgage.` },
          { p: `The level of the costs of selling a house varies greatly by situation, by region and by service provider. That is why we do not give fixed amounts in this article. Ask each party for a quote or a schedule of fees in advance, so that you know where you stand. That way you can make a realistic estimate of the net proceeds of your home.` },
        ],
      },
      {
        h: `Costs of selling a house: overview by cost item`,
        blocks: [
          { p: `These seller's costs are the most common. Not every item applies in every situation.` },
          {
            table: {
              head: [`Cost item`, `When it applies`, `What to look out for`],
              rows: [
                [`Estate agent's commission`, `If you instruct a selling estate agent`, `Often a percentage of the sale price or a fixed fee. Also ask about start-up costs and costs if you withdraw the instruction.`],
                [`Energy label`, `Always when selling a home`, `A valid, registered energy label is mandatory. A certified energy adviser draws it up after a visit to the home.`],
                [`Notary's mortgage cancellation costs`, `If there is a mortgage on the home`, `The notary has the mortgage registration in the Kadaster cancelled after the debt has been repaid from the sale proceeds.`],
                [`Early repayment fee`, `Possibly if you repay during the fixed-rate period`, `An exception often applies on sale and moving house. Check your mortgage terms and ask for a calculation.`],
                [`Sales costs`, `Depending on your sales approach`, `Think of styling, professional photography, a floor plan, minor repairs or a building survey in advance.`],
                [`Moving costs`, `With almost every move`, `Removals, cleaning, clearance and possibly double housing costs or a bridging loan.`],
              ],
              note: `Amounts vary by provider and situation. Always ask for a written quote in advance.`,
            },
          },
        ],
      },
      {
        h: `Estate agent's fees: what do you pay and what for?`,
        blocks: [
          { p: `If you instruct a selling estate agent (makelaar), the **estate agent's fees** are the largest cost item for many sellers. Estate agents usually work on commission (courtage): a percentage of the final sale price, sometimes with a minimum amount. More and more estate agents also offer a fixed fee. When comparing, check what is included in the price, such as the valuation, photography, floor plans, the listing on property portals, viewings and the negotiations.` },
          { p: `Also ask what happens if the home is not sold or if you withdraw the instruction. Some estate agents then charge withdrawal costs or start-up costs. Record all agreements in writing in the service agreement, so that you are not faced with unexpected items afterwards.` },
          { p: `Selling without an estate agent is also possible. You then save the commission, but take on the tasks yourself, such as setting the price, the presentation and the negotiation. Another route is a direct sale: when you sell to Windmill Invest, you pay no estate agent's commission, and the purchase proposal states in advance which costs are borne by whom. You can read more about the options on our page about [selling a house without an estate agent](/huis-verkopen-zonder-makelaar/).` },
        ],
      },
      {
        h: `Energy label and notary's fees for the seller`,
        blocks: [
          { p: `When selling a home, you are required to have a valid, registered **energy label**. The label gives the buyer insight into the energy efficiency of the home. A certified energy adviser draws up the label after an inspection of the home. A label remains valid for several years: if you already have a valid label, you do not need to apply for a new one. Without a valid label, you risk a fine from the regulator.` },
          { p: `The notary draws up the deed of transfer. In a sale on a buyer's costs basis, the buyer pays for this deed. The seller does, however, pay the **mortgage cancellation costs** (royementskosten): the costs of having the registration of their own mortgage in the Kadaster cancelled. For this, your lender sends the notary a redemption statement, after which the notary repays the debt from the sale proceeds at the transfer. If you have several mortgage registrations, for example with different lenders, this can affect the costs.` },
        ],
      },
      {
        h: `Early repayment fee on your mortgage when selling`,
        blocks: [
          { p: `If you repay your mortgage during the fixed-rate period, the lender may charge compensation, commonly known as an **early repayment fee** (boeterente). This compensation makes up for the lender's loss of interest when the current market rate is lower than the rate you pay. If the current rate is the same or higher, usually little or no compensation is due.` },
          { p: `On the sale of the home, many mortgage terms include an exception: if you repay the mortgage because you are selling the home and moving, you often do not have to pay compensation. Some lenders also allow you to take your interest rate with you to your next home. The rules differ by lender and by contract. So ask for a calculation in good time and, if in doubt, get advice from a mortgage adviser.` },
        ],
      },
      {
        h: `Which costs of selling a house are often forgotten?`,
        blocks: [
          {
            ul: [
              `Double housing costs if you get the new home before you transfer the old one.`,
              `A bridging loan if you need the surplus value (overwaarde) to buy your next home.`,
              `Ongoing fixed costs, such as the owners' association (VvE) contribution and insurance, until the day of the transfer.`,
              `Minor repairs or remedying defects that you agree with the buyer.`,
              `Clearance and cleaning, especially for an inherited home or a home that has been empty for a long time.`,
              `Advisory costs, for example from a mortgage adviser or tax specialist in a special situation.`,
            ],
          },
          { p: `Taking these items into account in advance prevents the net proceeds from turning out lower than expected.` },
        ],
      },
      {
        h: `What does buyer's costs mean for you as a seller?`,
        blocks: [
          { p: `In the Netherlands, existing homes are usually sold **buyer's costs** (kosten koper, k.k.). The buyer then pays, on top of the purchase price, the transfer tax, the notary's fees for the deed of transfer and the costs of registration in the Kadaster. As the seller, you receive the agreed purchase price, less your own costs, such as the repayment of the mortgage and the mortgage cancellation costs.` },
          { p: `The fact that the buyer pays the transfer tax still affects your sale, because buyers work with their total budget. For an investor who will not live in a home themselves, the rate in 2026 is 8%. For a buyer who will live there themselves, it is 2%, or 0% with the first-time buyer exemption (startersvrijstelling). You can read more about this in our article on [transfer tax in 2026](/kennisbank/overdrachtsbelasting-2026/).` },
        ],
      },
      {
        h: `Surplus value, residual debt and the additional borrowing rule`,
        blocks: [
          { p: `If you sell the home you live in yourself, you generally pay no income tax on the gain on sale. The surplus value (overwaarde) can, however, have consequences for a next home. Under the additional borrowing rule (bijleenregeling), you must in principle put the surplus value into a new owner-occupied home; if you do not, this can limit your mortgage interest deduction. A mortgage adviser or tax specialist can calculate this for your situation.` },
          { p: `If the proceeds are lower than your mortgage debt, you are left with a residual debt (restschuld). In that case, contact your lender before the sale. The notary can only have the mortgage cancelled if the debt is repaid in full or if the lender agrees to it.` },
          { p: `If you sell a rented home or a second home, different rules apply, because such a home usually falls under Box 3. See our article on [Box 3 and property in 2026](/kennisbank/box-3-vastgoed-2026/).` },
        ],
      },
      {
        h: `Limiting sales costs: the route makes a big difference`,
        blocks: [
          { p: `The costs of selling a house depend to a large extent on the route you choose. With an estate agent, you pay commission, but you get guidance and a wide reach. If you sell yourself, you keep the commission, but you also bear the responsibility yourself. With a direct sale to a property company, the commission and presentation costs fall away; on the other hand, you weigh certainty and convenience against the price you might be able to achieve on the open market.` },
          { p: `On our page about [selling a house](/huis-verkopen/) we set out the options side by side. Windmill Invest buys homes directly when they fit within our acquisition criteria. If a home does not fit, we will say so honestly, and an estate agent may be a better route.` },
          { callout: { t: `General information`, d: `This article is general information and not legal, tax or financial advice. Costs and conditions differ by situation and by service provider. For your own situation, consult the notary, your lender, a mortgage adviser or a tax specialist.` } },
        ],
      },
    ],
    faq: [
      { q: `Which costs does the seller of a house pay?`, a: `The seller usually pays the estate agent's commission if an estate agent has been instructed, the energy label and the mortgage cancellation costs. An early repayment fee, sales costs such as styling and photography, and moving costs may also play a role. In a sale on a buyer's costs basis, the transfer tax and the deed of transfer are for the buyer.` },
      { q: `Does the seller pay transfer tax?`, a: `No, in a sale on a buyer's costs (kosten koper) basis, the buyer pays the transfer tax. In a sale on a costs-included (vrij op naam) basis, the transfer costs are included in the price. This is mainly the case with new build.` },
      { q: `Is an energy label mandatory if I sell my house?`, a: `Yes. When selling a home, you must have a valid, registered energy label. A certified energy adviser draws up the label after a visit to the home. If you already have a valid label, you can use it.` },
      { q: `Do I have to pay an early repayment fee if I sell my house?`, a: `That depends on your mortgage terms. Many lenders charge no compensation if you repay the mortgage because you are selling the home and moving. Ask your lender for a calculation before you make a decision to sell.` },
      { q: `What does it cost to sell a house without an estate agent?`, a: `Without an estate agent, you pay no commission, but you still have costs such as the energy label, the mortgage cancellation costs and any presentation costs. When you sell directly to Windmill Invest, you pay no estate agent's commission. The purchase proposal states in advance which costs are borne by whom.` },
    ],
    cta: { title: `Curious what selling would bring you?`, text: `Would you like to know whether your home fits within Windmill Invest's acquisition criteria? Request a proposal without obligation. We look at every request and give an honest answer.`, button: `Request a proposal` },
    updated: '2026-10-28',
    sources: [
      `Rijksoverheid — energy label when selling or letting a home (energielabel bij verkoop of verhuur van een woning)`,
      `Belastingdienst — sale of an owner-occupied home and the additional borrowing rule (verkoop eigen woning en bijleenregeling)`,
      `Belastingdienst — transfer tax rates (tarieven overdrachtsbelasting)`,
      `Kadaster — fees for registering and cancelling a mortgage`,
      `Koninklijke Notariële Beroepsorganisatie (KNB) — the notary in the purchase and sale of a home`,
      `Wijzer in geldzaken — repaying a mortgage and early repayment fees (hypotheek aflossen en boeterente)`,
    ],
  },

  {
    slug: '/kennisbank/box-3-vastgoed-2026/',
    group: 'kennisbank',
    template: 'article',
    nav: `Box 3 and property 2026`,
    seoTitle: `Box 3 property 2026: guide for landlords │ Windmill Invest`,
    meta: `Box 3 property 2026: how your rented home is taxed, what the vacant-value ratio and rebuttal scheme mean and what the Actual Return Act would bring.`,
    h1: `Box 3 property 2026: how your rented home is taxed`,
    keyword: `Box 3 property Netherlands 2026`,
    secondary: [`Box 3 rented home Netherlands`, `Box 3 selling rental property`, `Box 3 actual return`, `leegwaarderatio vacant value ratio`],
    form: 'verhuurd',
    related: ['/beleggingspand-verkopen/', '/verhuurde-woning-verkopen/', '/vastgoedportefeuille-verkopen/', '/kennisbank/koop-breekt-geen-huur/'],
    eyebrow: `Knowledge base · Tax`,
    intro: `For Box 3 (tax on savings and investments) and property in 2026, the following applies: you pay tax on a notional, deemed return and not on the actual rental income, at a rate of 36%. Costs such as maintenance and management are not deductible, and a rented home counts at its WOZ value (municipal assessed value) multiplied by the vacant-value ratio (leegwaarderatio). In this article you can read how that works, what the planned Actual Return Act (Wet werkelijk rendement) involves and which questions you can discuss with a tax specialist (fiscalist).`,
    heroPoints: [`Tax on a notional return, rate 36%`, `Rented home: WOZ value × vacant-value ratio`, `Maintenance and management are not deductible`],
    sections: [
      {
        h: `How does Box 3 work for property in 2026?`,
        blocks: [
          { p: `If, as a private individual, you own property that you do not live in yourself, such as a rented home, a second home or a flat held as an investment, it usually falls under **Box 3** for income tax purposes. Box 3 taxes assets that do not belong in Box 1 or Box 2. The Dutch Tax Administration (Belastingdienst) does not base this on what you actually earn, but on a **deemed return** (forfaitair rendement): a percentage that the legislator sets each year for each asset category.` },
          { p: `Property falls into the category of **other assets** (overige bezittingen), together with shares and bonds, among others. For that category, the Belastingdienst uses a higher deemed return than for savings. A rate of 36% applies in 2026 to the total calculated benefit from savings and investments. There is a tax-free allowance (heffingsvrij vermogen), which keeps part of your assets outside the tax.` },
          { p: `An important point for Box 3 and property in 2026 is the **reference date** (peildatum): the Belastingdienst looks at your assets and debts on 1 January of the tax year. Whatever you buy or sell during the year only counts on the reference date of the following year. Debts, such as a loan with which you financed the property, also count. For these, the Belastingdienst uses its own deemed percentage, which reduces the calculated benefit. A threshold applies to debts.` },
        ],
      },
      {
        h: `Box 3 and a rented home: what counts?`,
        blocks: [
          { p: `For landlords, these features of the current system are particularly important:` },
          {
            ul: [
              `The actual rental income is not taxed separately; the Belastingdienst uses a notional return on the value.`,
              `Costs such as maintenance, management, insurance, owners' association (VvE) contributions and municipal taxes are not deductible.`,
              `The value of a rented home is the WOZ value multiplied by the vacant-value ratio.`,
              `A home that is not let on the reference date, such as a second home or a vacant home, counts at the full WOZ value.`,
              `The situation on 1 January is decisive, even if you sell the property later in the year.`,
            ],
          },
        ],
      },
      {
        h: `WOZ value and the vacant-value ratio`,
        blocks: [
          { p: `A rented home is worth less than the same home delivered with vacant possession, because a buyer takes over the tenant. Box 3 takes this into account through the **vacant-value ratio** (leegwaarderatio). You multiply the WOZ value (municipal assessed value) by a percentage that depends on the ratio between the annual rent and the WOZ value. The lower the rent in relation to the WOZ value, the lower the percentage and therefore the value in Box 3. The Belastingdienst publishes the current table.` },
          { p: `The vacant-value ratio only applies under certain conditions. The home must be let on the reference date and the tenant must enjoy rent protection. Different rules may apply, for example, when letting to a related person at a low rent. Have a tax specialist assess which value is the correct one for your home.` },
        ],
      },
      {
        h: `The rebuttal scheme: if your actual return is lower`,
        blocks: [
          { p: `Following rulings by the Supreme Court (Hoge Raad) on Box 3, you may demonstrate that your actual return is lower than the deemed return. This is called the **rebuttal scheme** (tegenbewijsregeling). If your actual return on your entire Box 3 assets is lower, the tax is calculated on that lower return. To do so, you submit a separate statement of your actual return.` },
          { p: `Under this scheme, the actual return includes not only the rental income but also the change in value of your assets, even if you have not realised it. With property, an increased WOZ value can therefore raise the actual return considerably. Whether invoking the rebuttal scheme is beneficial varies greatly by year and by situation. A tax specialist can calculate this for you.` },
        ],
      },
      {
        h: `Actual return in Box 3: what may change?`,
        blocks: [
          { p: `The government wants to replace the current system with a tax on the return actually achieved. To this end, the **Wet werkelijk rendement box 3** (Box 3 Actual Return Act) is being prepared, which according to the planning should take effect in 2028. In 2026, it is not yet certain whether and in what form the act will come: its introduction is politically uncertain and the details may still change. For Box 3 and property in 2026, the deemed-return system with the rebuttal scheme therefore continues to apply.` },
          { p: `The principle is that you pay tax on what your assets actually yield, such as rental income and change in value, rather than on a notional return. The deduction of costs related to the property also plays a role in the plans. For landlords, this may turn out favourably or unfavourably, depending on the relationship between rent, costs and change in value. So do not base a decision on an act that has not yet been passed, but have scenarios calculated by a tax specialist.` },
        ],
      },
      {
        h: `Box 3 and selling your rental home: why landlords sell off`,
        blocks: [
          { p: `Many private landlords are considering selling their rental homes. There are several reasons for this. In Box 3 they pay tax on a notional return, while costs are not deductible. In addition, under the **Wet betaalbare huur** (Affordable Rent Act), the housing valuation system (woningwaarderingsstelsel, the points system) has also applied to the mid-rent segment since 1 July 2024, so that the maximum rent for many homes depends on the number of points. And under the Wet vaste huurcontracten (Fixed-Term Tenancy Abolition Act), landlords may since that date in principle only offer tenancy agreements for an indefinite period, with limited exceptions.` },
          { p: `**Selling off** (uitponden) means selling rental homes one by one, usually when a tenant leaves and the home can be sold with vacant possession. That can yield more than a sale with the tenant in place, but it takes time and you do not know when a home will become vacant. An alternative is a sale with the tenant in place to an investor. The tenant then simply stays; read our article on [koop breekt geen huur (sale does not break a lease)](/kennisbank/koop-breekt-geen-huur/). For the buying investor, [transfer tax of 8% on homes](/kennisbank/overdrachtsbelasting-2026/) has applied since 2026.` },
          { p: `For the Box 3 levy on property in 2026, the situation on 1 January counts. If you sell a rental home during the year, the home still falls under Box 3 in that year and you only see the effect of the sale on the next reference date, for example when the proceeds are in your bank account. Under the current deemed-return system, you pay no separate tax on the gain on sale itself, because Box 3 does not tax actual gains.` },
        ],
      },
      {
        h: `Privately or in a bv: questions for your tax specialist`,
        blocks: [
          { p: `Some landlords are examining whether it makes sense to place their property in a private limited company (bv). That is a far-reaching step with tax and legal consequences. Windmill Invest gives no advice on this. You can discuss these questions with a tax specialist or tax adviser:` },
          {
            ul: [
              `What are the consequences of transferring property to a bv, for example for transfer tax?`,
              `How does taxation in a bv, such as corporate income tax and the tax on distributions to the shareholder, compare with Box 3 in your situation?`,
              `Which costs are deductible in a bv and what additional administrative burden does it bring?`,
              `What does a possible Actual Return Act mean for the choice between holding privately and in a bv?`,
              `How do selling, holding or restructuring fit with your financing, your age and your plans for your estate?`,
            ],
          },
          { p: `A good decision starts with a complete picture of your holdings: value, rent, contracts, financing and state of maintenance.` },
        ],
      },
      {
        h: `What Windmill Invest can do for landlords`,
        blocks: [
          { p: `If you are considering selling one or more rented homes, you can ask Windmill Invest for an indicative assessment. We look at the home, the tenancy agreement and the current rent, and let you know whether the property fits within our acquisition criteria. On the page about [selling an investment property](/beleggingspand-verkopen/) you can read how that works.` },
          { p: `You discuss the tax side, such as the timing of the sale and the consequences for Box 3, with your own tax specialist. Where necessary, we work with a tax specialist or tax adviser as a partner; Windmill Invest does not itself give tax advice.` },
          { callout: { t: `General information`, d: `This article is general information and not legal or tax advice. The Box 3 rules change regularly and the consequences depend heavily on your personal situation. Always have your situation assessed by a tax specialist or tax adviser before you make a decision.` } },
        ],
      },
    ],
    faq: [
      { q: `How is a rented home taxed in Box 3?`, a: `In Box 3, you pay tax on a deemed return on the value of the home on 1 January. For a rented home, that value is the WOZ value multiplied by the vacant-value ratio (leegwaarderatio). The rate on the calculated benefit is 36% in 2026, and costs are not deductible.` },
      { q: `Can I deduct maintenance costs in Box 3?`, a: `No. In the current Box 3 system, costs such as maintenance, management, insurance and owners' association (VvE) contributions are not deductible. That is one of the reasons why many private landlords are reconsidering their situation.` },
      { q: `When will the Box 3 Actual Return Act take effect?`, a: `The act was intended to take effect in 2028. In 2026, its introduction is politically uncertain and the details may still change. Follow the information from the Rijksoverheid and the Belastingdienst and discuss the consequences with a tax specialist.` },
      { q: `What is the vacant-value ratio?`, a: `The vacant-value ratio (leegwaarderatio) is a percentage by which you multiply the WOZ value of a rented home to determine its value in Box 3. The percentage depends on the ratio between the annual rent and the WOZ value. The current table is available from the Belastingdienst.` },
      { q: `Do I pay Box 3 tax on the gain if I sell my rental home?`, a: `Under the current deemed-return system, the gain on sale is not taxed separately. Box 3 looks at your assets on 1 January; after the sale, the proceeds count on the next reference date, for example as a bank balance. If you invoke the rebuttal scheme, an increase in value can, however, count towards the actual return.` },
      { q: `Is it wise to place my rented home in a bv?`, a: `That depends on your full situation and can have consequences for, among other things, transfer tax, corporate income tax and the tax on distributions. Windmill Invest gives no advice on this. Discuss it with a tax specialist or tax adviser.` },
    ],
    cta: { title: `Considering selling your rental home?`, text: `Windmill Invest will assess, without obligation, whether your rented home or portfolio fits within our acquisition criteria. For tax questions, we refer you to a tax specialist.`, button: `Request an assessment` },
    updated: '2026-10-28',
    sources: [
      `Belastingdienst — Box 3: income from savings and investments in 2026 (inkomen uit sparen en beleggen)`,
      `Belastingdienst — value of a rented home in Box 3 and the vacant-value ratio (leegwaarderatio)`,
      `Belastingdienst — rebuttal scheme and statement of actual return (tegenbewijsregeling en opgaaf werkelijk rendement)`,
      `Wet inkomstenbelasting 2001 (Income Tax Act 2001), chapter 5 (income from savings and investments)`,
      `Rijksoverheid — bill for the Wet werkelijk rendement box 3 (Box 3 Actual Return Act)`,
      `Rijksoverheid — Wet betaalbare huur (Affordable Rent Act) and Wet vaste huurcontracten (Fixed-Term Tenancy Abolition Act)`,
    ],
  },

  {
    slug: '/kennisbank/bar-nar-rendement/',
    group: 'kennisbank',
    template: 'article',
    nav: `Calculating BAR and NAR`,
    seoTitle: `BAR and NAR yield: formulas and example │ Windmill Invest`,
    meta: `Calculating BAR and NAR for property: the formulas for gross and net initial yield, a worked example and the mistakes investors often make.`,
    h1: `Calculating BAR and NAR: gross and net initial yield explained`,
    keyword: `calculate gross net initial yield property`,
    secondary: [`gross initial yield`, `net initial yield`, `property yield formula`, `calculate rental yield Netherlands`],
    form: 'investeerder',
    related: ['/vastgoed-rendement-berekenen/', '/beleggingspand-kopen/', '/vastgoedinvesteringsanalyse/', '/kennisbank/overdrachtsbelasting-2026/'],
    eyebrow: `Knowledge base · Yield`,
    intro: `You can calculate BAR and NAR by dividing the annual rent by the investment: the gross initial yield (bruto aanvangsrendement, BAR) uses the gross annual rent and the purchase price, the net initial yield (netto aanvangsrendement, NAR) uses the rent after operating costs and the purchase price including acquisition costs. The BAR is a quick first test; the NAR shows what a property actually yields in the first year. Below you will find the formulas, a worked example and the mistakes that are often made.`,
    heroPoints: [`BAR: gross annual rent divided by purchase price`, `NAR: net rent divided by total investment`, `Both are snapshots, not a guarantee`],
    sections: [
      {
        h: `What are BAR and NAR?`,
        blocks: [
          { p: `The **gross initial yield** (bruto aanvangsrendement, BAR) and the **net initial yield** (netto aanvangsrendement, NAR) are the two most widely used indicators for quickly assessing an investment property. Both express the rental income as a percentage of the investment, measured over the first year after purchase. That is why they are called initial yield.` },
          { p: `The difference lies in what you include. The BAR is simple: the gross rent the property yields, divided by the purchase price. The NAR takes account of the costs you incur as owner and of the costs you pay on purchase. Anyone who wants to calculate BAR and NAR in order to genuinely compare properties or to support an offer therefore uses the NAR as the starting point.` },
          { p: `In listings and brochures, you often see only the BAR, or a yield without explanation. Always ask how a stated yield has been calculated and which costs have and have not been included.` },
        ],
      },
      {
        h: `Calculating BAR and NAR: the formulas`,
        blocks: [
          { p: `To calculate BAR and NAR, you need three figures: the annual rent, the annual costs and the purchase price. The formulas are set out in words below. Multiply the result by 100 to get a percentage.` },
          {
            table: {
              head: [`Indicator`, `Formula`, `What do you use it for?`],
              rows: [
                [`Gross initial yield (BAR)`, `Gross annual rent divided by the purchase price (buyer's costs, kosten koper)`, `Quick initial selection and comparison of what is on offer`],
                [`Net rent`, `Gross annual rent minus operating costs and a provision for vacancy`, `Basis for the NAR and for a valuation`],
                [`Net initial yield (NAR)`, `Net annual rent divided by the purchase price plus acquisition costs (the total investment)`, `Assessing what the property actually yields in the first year`],
                [`Value based on yield`, `Net annual rent divided by the NAR the market applies to comparable properties`, `Indication of what a property may cost at a given yield`],
              ],
              note: `In practice, these terms are not used in exactly the same way everywhere. So always record which rent, which costs and which purchase price you have used.`,
            },
          },
        ],
      },
      {
        h: `Net initial yield: which costs do you deduct?`,
        blocks: [
          { p: `For the NAR, you deduct the annual operating costs from the gross annual rent. Think of:` },
          {
            ul: [
              `Property tax for owners (onroerendezaakbelasting) and other municipal levies for the owner`,
              `Buildings insurance and, where applicable, liability insurance`,
              `Maintenance: minor day-to-day maintenance and a provision for major maintenance`,
              `The owners' association (VvE) contribution for a flat, which also includes the provision for major maintenance`,
              `Management costs if you outsource management, or a realistic valuation of your own time`,
              `A provision for vacancy and loss of rent`,
              `Ground rent (erfpachtcanon), if the land is held under a ground lease`,
            ],
          },
          { p: `The acquisition costs are the [transfer tax (overdrachtsbelasting)](/kennisbank/overdrachtsbelasting-2026/), the notary's fees for the deed of transfer and costs such as a building survey and advice. Costs related to financing, such as mortgage interest, do not belong in the NAR: the initial yield measures the return of the property itself. Tax on income or assets, such as [Box 3 for property](/kennisbank/box-3-vastgoed-2026/), is also left out of the NAR and considered separately.` },
        ],
      },
      {
        h: `Worked example`,
        blocks: [
          { p: `This example is entirely hypothetical and only intended to show the calculation. The amounts say nothing about the current market, about an existing property or about the return you can expect. Suppose an investor buys an existing home to let.` },
          {
            table: {
              head: [`Item`, `Amount (hypothetical)`, `Explanation`],
              rows: [
                [`Purchase price`, `€300,000 k.k.`, `Agreed price, excluding buyer's costs`],
                [`Transfer tax`, `€24,000`, `8%, because the buyer will not live in the home themselves`],
                [`Notary, survey and other acquisition costs`, `€4,000`, `Assumed amount for this example`],
                [`Total investment`, `€328,000`, `Basis for the NAR`],
                [`Gross annual rent`, `€15,000`, `Assumed rent of €1,250 per month; whether such a rent is permitted depends on, among other things, the points system`],
                [`Operating costs and vacancy provision`, `€3,600`, `Property tax (OZB), insurance, maintenance, management and provision combined, assumed`],
                [`Net annual rent`, `€11,400`, `Gross annual rent minus costs`],
                [`BAR`, `5.0%`, `€15,000 divided by €300,000`],
                [`NAR`, `approx. 3.5%`, `€11,400 divided by €328,000`],
              ],
              note: `In this example, the NAR is about one and a half percentage points below the BAR. Anyone who looks only at the BAR therefore overestimates what the property yields in the first year. Suppose the market applies a NAR of 4% to comparable properties: €11,400 divided by 4% then gives an indicative value of €285,000, including acquisition costs. That too is a worked example and not a valuation.`,
            },
          },
        ],
      },
      {
        h: `Common mistakes when calculating rental yield`,
        blocks: [
          { p: `A yield calculation is only as reliable as the assumptions behind it. These mistakes are common in practice.` },
          {
            cards: [
              { t: `Forgetting buyer's costs`, d: `Anyone who calculates the yield on the purchase price alone leaves transfer tax and notary's fees out of account. In 2026, an investor pays 8% transfer tax on a home and 10.4% on a commercial building. Those costs are part of the total investment in the NAR.`, href: '/kennisbank/overdrachtsbelasting-2026/', label: `Transfer tax 2026` },
              { t: `Not allowing for vacancy`, d: `Between two tenants, a home is often empty for some time, a commercial building sometimes longer. A provision for vacancy and loss of rent makes the calculation more realistic.` },
              { t: `Underestimating maintenance`, d: `Besides minor maintenance, there are major items, such as a new roof, window frames or installations. Work with an annual provision that matches the condition of the property, preferably supported by a building survey report.` },
              { t: `Missing the VvE contribution and reserve fund`, d: `For a flat, you pay an owners' association (VvE) contribution. Also check whether the reserve fund and the long-term maintenance plan are adequate; a shortfall can later lead to additional contributions.` },
              { t: `Calculating with a rent that is not permitted`, d: `Since the Wet betaalbare huur (Affordable Rent Act), the points system also determines the maximum rent for many homes in the mid-rent segment. Calculate with the rent that matches the number of points, not with the asking rent of comparable homes.` },
              { t: `Comparing yields on different bases`, d: `A BAR on the purchase price on a buyer's costs basis cannot be compared with a NAR on the total investment. Only compare figures that have been calculated in the same way.` },
            ],
          },
        ],
      },
      {
        h: `BAR, NAR and IRR: which yield do you use when?`,
        blocks: [
          { p: `The BAR is suitable for quick filtering: if a property falls far outside your expectations, there is no need to calculate further. You use the NAR to compare properties seriously and to support an offer. Both are snapshots of the first year and take no account of what happens after that.` },
          { p: `The **internal rate of return** (IRR) looks further ahead. In it, you include all cash flows over the expected investment period: the purchase, the annual net rent, investments in maintenance or sustainability improvements, rental growth and the expected sale proceeds at the end. The IRR also takes account of when money comes in or goes out. That makes it a better indicator for the long term, but the outcome depends heavily on assumptions about the future, such as the change in value.` },
          { p: `If you finance part of the purchase, you can also calculate the return on your own equity. That falls outside the BAR and the NAR and depends on your interest and repayments. Would you like to go further than calculating BAR and NAR, with multiple scenarios and a full cash-flow analysis? Then read more about [calculating property yield](/vastgoed-rendement-berekenen/) with Windmill Invest.` },
        ],
      },
      {
        h: `From yield to value`,
        blocks: [
          { p: `Investors and valuers also reverse the calculation. If you know which NAR the market applies to a certain type of property in a certain location, you can derive an indicative value: the value is then the net annual rent divided by that NAR. With the same rent, a lower market yield leads to a higher value, and a higher market yield to a lower value.` },
          { p: `This method is also known as the capitalisation method. It is useful as a first test, but it does not replace a formal valuation. A registered valuer (register-taxateur) also looks at comparable transactions, the condition of the property, the tenancy agreements and the risks. If you need a validated valuation report, for example for financing, you instruct a registered valuer (NRVT). An indicative value assessment is not a valuation report.` },
          { callout: { t: `General information`, d: `This article is general information and not legal or tax advice, nor investment advice. Yields are always based on assumptions and offer no guarantee for the future. Have a purchase decision supported by your own data and, where necessary, by advice from an independent specialist.` } },
        ],
      },
    ],
    faq: [
      { q: `What is the difference between BAR and NAR?`, a: `The BAR divides the gross annual rent by the purchase price and takes no account of costs. The NAR first deducts the operating costs from the rent and divides by the purchase price including acquisition costs. The NAR therefore gives a more realistic picture of what a property yields in the first year.` },
      { q: `What is a good net initial yield?`, a: `There is no fixed answer to that. An appropriate yield depends on the location, the type of property, the state of maintenance, the tenancy agreements and the risk you accept. So compare with comparable properties and, if in doubt, get advice from an independent specialist.` },
      { q: `Does transfer tax belong in the yield calculation?`, a: `In the NAR, yes. The transfer tax and the notary's fees form part of the total investment. For a home you will not live in yourself, the rate in 2026 is 8%, and for a commercial building 10.4%.` },
      { q: `How do I calculate the rental yield of a flat?`, a: `You use the same formulas, but include the owners' association (VvE) contribution in the operating costs. Also check the VvE's reserve fund and long-term maintenance plan. A shortfall can later lead to additional costs that reduce your yield.` },
      { q: `Is a high BAR always a good investment?`, a: `No. A high BAR may indicate higher risks, such as overdue maintenance, a less sought-after location, a rent that does not match the points system or a tenant with payment problems. So always look at the NAR and at the assumptions behind it.` },
    ],
    cta: { title: `Want an investment property calculated?`, text: `Windmill Invest will prepare, without obligation, an indicative investment analysis with BAR, NAR and the key assumptions. The result is an estimate, not a guarantee and not investment advice.`, button: `Request an analysis` },
    updated: '2026-10-28',
    sources: [
      `Belastingdienst — transfer tax rates (tarieven overdrachtsbelasting)`,
      `Rijksoverheid — Wet betaalbare huur (Affordable Rent Act) and the housing valuation system (woningwaarderingsstelsel)`,
      `Huurcommissie — rent check and points system (huurprijscheck en puntenstelsel)`,
      `Nederlands Register Vastgoed Taxateurs (NRVT) — the role of the registered valuer`,
      `Your municipality — property tax rates (onroerendezaakbelasting, OZB)`,
    ],
  },

  {
    slug: '/kennisbank/koop-breekt-geen-huur/',
    group: 'kennisbank',
    template: 'article',
    nav: `Sale does not break a lease`,
    seoTitle: `Koop breekt geen huur: what does it mean? │ Windmill Invest`,
    meta: `Koop breekt geen huur (sale does not break a lease): the tenancy passes to the buyer on sale. What transfers, what the seller arranges and the tenant's rights.`,
    h1: `Sale does not break a lease: what happens to the tenant when a property is sold?`,
    keyword: `koop breekt geen huur sale does not break a lease`,
    secondary: [`tenant when selling a house Netherlands`, `tenant rights when property is sold Netherlands`, `Article 7:226 Dutch Civil Code`, `sell house with tenant Netherlands`],
    form: 'verhuurd',
    related: ['/verhuurde-woning-verkopen/', '/beleggingspand-verkopen/', '/verhuurbeheer/', '/kennisbank/box-3-vastgoed-2026/'],
    eyebrow: `Knowledge base · Tenancy law`,
    intro: `"Sale does not break a lease" (koop breekt geen huur) means that a tenancy agreement simply continues when the rented home or rented building is sold: the buyer becomes the new landlord, with all the rights and obligations. This is set out in Article 7:226 of the Dutch Civil Code (Burgerlijk Wetboek, BW). The tenant keeps their rent protection, and the seller must arrange the transfer of the tenancy carefully.`,
    heroPoints: [`The tenancy agreement passes to the buyer`, `The tenant keeps their rent protection`, `A sale is not a ground for termination`],
    sections: [
      {
        h: `What does "sale does not break a lease" mean?`,
        blocks: [
          { p: `The principle of **"sale does not break a lease"** (koop breekt geen huur) protects the tenant when ownership changes. If the landlord sells the property, the tenancy agreement does not end. The landlord's rights and obligations pass to the buyer by operation of law. The tenant does not need to consent to this and no new contract needs to be signed.` },
          { p: `The rule is set out in **Article 7:226 BW** and applies both to the lease of residential accommodation and to the lease of business premises. With other forms of transfer of ownership too, such as a transfer within the family or the contribution of a property to a company, the tenancy in principle continues to exist.` },
          { p: `For a buyer, this means that they buy a rented home as it is let: with the current tenant, the current rent and the agreements in the contract. That is an important reason why a rented home is usually valued differently from a home delivered with vacant possession.` },
        ],
      },
      {
        h: `What passes to the buyer?`,
        blocks: [
          { p: `On transfer, the buyer takes over the landlord's position. In practice, this means, among other things, the following.` },
          {
            table: {
              head: [`Element`, `What happens on sale`],
              rows: [
                [`Rent`, `The buyer receives the rent from the transfer onwards. The rent stays the same; an increase is only possible in accordance with the statutory rules and the agreements in the contract.`],
                [`Tenancy terms`, `Term, notice periods, service charges and other agreements remain in force unchanged.`],
                [`Deposit`, `The agreements on the deposit remain in force. Seller and buyer arrange between themselves for the deposit to be transferred or settled, so that the tenant can get the deposit back at the end of the tenancy.`],
                [`Maintenance obligation`, `The buyer becomes responsible for the maintenance that, under the law and the contract, lies with the landlord, including for defects that already existed.`],
                [`Ongoing disputes`, `Proceedings before the Huurcommissie (rent tribunal) or the court concerning the tenancy in principle continue with the new landlord. Make clear agreements about this in the purchase agreement.`],
                [`Rent arrears from before the sale`, `These in principle remain a matter between the former landlord and the tenant, unless seller and buyer agree otherwise.`],
              ],
              note: `The exact consequences depend on the contract and the circumstances. Have the purchase agreement drawn up or checked by the civil-law notary (notaris) or a lawyer.`,
            },
          },
        ],
      },
      {
        h: `Tenant's rights when the property is sold`,
        blocks: [
          { p: `Because of "sale does not break a lease", little changes in substance for the tenant on sale. They keep the same **rent protection** (huurbescherming) as before. For residential accommodation, this means, among other things, that the landlord can only terminate the tenancy on a statutory ground, such as failure to meet the obligations of a good tenant or urgent own use. If the tenant does not agree to the termination, the tenancy only ends if the court grants the claim. The sale itself is not a ground for termination.` },
          { p: `The rules on rent also continue to apply. If the home falls under the housing valuation system (woningwaarderingsstelsel), the number of points determines the maximum rent. Under the **Wet betaalbare huur** (Affordable Rent Act), this has also applied to the mid-rent segment since 1 July 2024. A new owner therefore cannot increase the rent because they paid a higher price for the property.` },
          { p: `If the tenant has a contract for an indefinite period, it stays that way. Under the **Wet vaste huurcontracten** (Fixed-Term Tenancy Abolition Act), landlords may since 1 July 2024 in principle only offer tenancy agreements for an indefinite period, with limited exceptions. A temporary contract that was already running continues on the same terms on sale.` },
          { p: `For business premises, the protection also continues to exist. For retail and hospitality premises, the strong rent protection of Article 7:290 BW applies; for other business premises, Article 7:230a BW. A ROZ lease agreement (ROZ-huurovereenkomst) also passes unchanged to the buyer on sale.` },
        ],
      },
      {
        h: `Selling a home with a tenant: what does the seller arrange?`,
        blocks: [
          { p: `A careful transfer prevents misunderstandings with the tenant and disputes with the buyer. These steps are customary in practice.` },
          {
            ol: [
              `**Gather the tenancy details.** Make sure you have the signed tenancy agreement, any addenda, the current rent, the service charge statement, details of the deposit and correspondence about defects or disputes. A buyer will want to see these documents before making an offer.`,
              `**Inform the tenant in good time.** Let the tenant know that you want to sell the property. Make arrangements for viewings in consultation and check what the tenancy agreement says about this. Respect the tenant's privacy and quiet enjoyment of the home.`,
              `**Record agreements in the purchase agreement.** Record that the property is delivered with the tenancy in place, which tenancy agreement transfers and how rent, service charges and deposit are apportioned as of the date of transfer.`,
              `**Transfer the deposit.** Transfer the deposit to the buyer or have it settled on the notary's completion statement. That way, the new landlord can repay the deposit at the end of the tenancy.`,
              `**Announce the transfer.** After the transfer, inform the tenant in writing of the new landlord, the contact address for maintenance and the account number to which the rent must be paid from now on. Seller and buyer often do this together.`,
              `**Hand over ongoing matters.** Give the buyer information about outstanding maintenance requests, agreements with the tenant and any proceedings, so that the new landlord can deal with them without delay.`,
            ],
          },
        ],
      },
      {
        h: `Myths about "sale does not break a lease"`,
        blocks: [
          { p: `There are persistent misunderstandings about "sale does not break a lease", among tenants and landlords alike.` },
          {
            table: {
              head: [`Myth`, `Fact`],
              rows: [
                [`On sale, the tenant must leave.`, `No. The tenancy agreement passes to the buyer and the tenant may continue to live or work there on the same terms.`],
                [`The new owner can demand a new contract with a higher rent.`, `No. The existing contract remains in force. A rent increase is only possible in accordance with the statutory rules and the agreements in the contract.`],
                [`The tenant must give permission for the sale.`, `No. The landlord may sell the property without the tenant's permission. It is, however, wise to inform the tenant in good time and to plan viewings in consultation.`],
                [`The tenant always has the first right to buy the home.`, `No. There is no general statutory right of first refusal for tenants. It may, however, have been agreed in the tenancy agreement.`],
                [`With a temporary contract, the tenancy ends on sale.`, `No. A temporary tenancy agreement also passes to the buyer and continues in accordance with the agreements and the law.`],
                [`The deposit has disappeared after the sale.`, `No. The agreements on the deposit continue to exist. Seller and buyer must arrange for the new landlord to be able to repay the deposit.`],
                [`The buyer can simply claim the home for themselves.`, `No. Urgent own use is a statutory ground for termination, but the court assesses it strictly. If the tenant refuses, the court decides.`],
              ],
            },
          },
        ],
      },
      {
        h: `What does this mean for you as a seller?`,
        blocks: [
          { p: `For a landlord who wants to sell, "sale does not break a lease" means that the choice is mainly between selling with the tenant in place and waiting until the home becomes vacant. A sale with the tenant in place is easier to plan, because you do not depend on the tenant leaving. The buyer is then usually an investor, who assesses the home on the rent, the contract and the state of maintenance.` },
          { p: `If you wait until the home becomes vacant, you can sell it with vacant possession, but you do not know when that moment will come. Never put pressure on a tenant to leave: that is contrary to rent protection and to the rules on good landlordship. If a tenant leaves voluntarily, record the agreements in writing and get advice from a lawyer or legal adviser.` },
          { p: `Windmill Invest buys rented homes when they fit within our acquisition criteria, with the tenant in place and with respect for their rights. You can read how that works on the page about [selling a rented home](/verhuurde-woning-verkopen/). If taxation plays a part in your considerations, read our article on [Box 3 and property in 2026](/kennisbank/box-3-vastgoed-2026/). For the buying party, [transfer tax in 2026](/kennisbank/overdrachtsbelasting-2026/) is relevant.` },
          { callout: { t: `General information`, d: `This article is general information and not legal or tax advice. The consequences of a sale depend on the tenancy agreement and the circumstances. For your own situation, get advice from a lawyer, a legal adviser or the civil-law notary.` } },
        ],
      },
    ],
    faq: [
      { q: `What does "sale does not break a lease" mean for the tenant?`, a: `It means that the tenancy agreement continues to exist when the home or building is sold. The buyer becomes the new landlord and the tenant keeps the same rent, terms and rent protection.` },
      { q: `May I sell my home if a tenant lives in it?`, a: `Yes. You do not need the tenant's permission. Under Article 7:226 BW, the tenancy agreement passes to the buyer. Do inform the tenant in good time and make arrangements for viewings in consultation.` },
      { q: `Can the new owner terminate the tenancy?`, a: `Only on a statutory ground for termination, such as failure to meet the obligations of a good tenant or urgent own use. The sale itself is not a ground. If the tenant does not agree to the termination, the court decides.` },
      { q: `What happens to the deposit when a rental home is sold?`, a: `The agreements on the deposit remain in force. Seller and buyer arrange in the purchase agreement for the deposit to be transferred or settled. After the transfer, the tenant generally turns to the new landlord for repayment.` },
      { q: `Does "sale does not break a lease" also apply to business premises?`, a: `Yes. Article 7:226 BW also applies to the lease of business premises. The tenant of retail or hospitality premises keeps the protection of Article 7:290 BW, and for other business premises Article 7:230a BW continues to apply.` },
      { q: `Does the tenant have to sign a new tenancy agreement with the buyer?`, a: `No. The existing tenancy agreement transfers by operation of law. A new contract is not needed and the tenant is not obliged to accept different terms.` },
    ],
    cta: { title: `Selling a rented home?`, text: `Windmill Invest will assess, without obligation, whether your rented home fits within our acquisition criteria. The tenant stays in the home, with all their rights preserved.`, button: `Submit your home` },
    updated: '2026-10-28',
    sources: [
      `Burgerlijk Wetboek (Dutch Civil Code) Book 7, Article 7:226 (koop breekt geen huur)`,
      `Burgerlijk Wetboek (Dutch Civil Code) Book 7, Articles 7:271 to 7:274 inclusive (termination of residential tenancies)`,
      `Burgerlijk Wetboek (Dutch Civil Code) Book 7, Article 7:290 and Article 7:230a (lease of business premises)`,
      `Rijksoverheid — Wet betaalbare huur (Affordable Rent Act)`,
      `Rijksoverheid — Wet vaste huurcontracten (Fixed-Term Tenancy Abolition Act)`,
      `Rijksoverheid — Wet goed verhuurderschap (Good Landlordship Act)`,
      `Huurcommissie — information for tenants and landlords`,
    ],
  },
];
