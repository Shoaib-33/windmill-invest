// English translation of content/kennisbank.js (knowledge base articles). Same pages, same order, same structure.

const DISCLAIMER_FISCAAL = `This article is general information and not legal or tax advice. Rates and conditions may change, and the consequences depend on your personal situation. Have your situation assessed by a civil-law notary (notaris), tax specialist (fiscalist) or tax adviser before you make a decision.`;

export default [
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
    related: ['/huis-verkopen/', '/huis-verkopen-zonder-makelaar/', '/huis-verkopen-aan-opkoper/'],
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
          { p: `The fact that the buyer pays the transfer tax still affects your sale, because buyers work with their total budget. For an investor who will not live in a home themselves, the rate in 2026 is 8%. For a buyer who will live there themselves, it is 2%, or 0% with the first-time buyer exemption (startersvrijstelling). You can read more about this in our article on transfer tax in 2026.` },
        ],
      },
      {
        h: `Surplus value, residual debt and the additional borrowing rule`,
        blocks: [
          { p: `If you sell the home you live in yourself, you generally pay no income tax on the gain on sale. The surplus value (overwaarde) can, however, have consequences for a next home. Under the additional borrowing rule (bijleenregeling), you must in principle put the surplus value into a new owner-occupied home; if you do not, this can limit your mortgage interest deduction. A mortgage adviser or tax specialist can calculate this for your situation.` },
          { p: `If the proceeds are lower than your mortgage debt, you are left with a residual debt (restschuld). In that case, contact your lender before the sale. The notary can only have the mortgage cancelled if the debt is repaid in full or if the lender agrees to it.` },
          { p: `If you sell a rented home or a second home, different rules apply, because such a home usually falls under Box 3. See our article on Box 3 and property in 2026.` },
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
    related: ['/verhuurde-woning-verkopen/', '/beleggingspand-verkopen/'],
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
          { p: `Windmill Invest buys rented homes when they fit within our acquisition criteria, with the tenant in place and with respect for their rights. You can read how that works on the page about [selling a rented home](/verhuurde-woning-verkopen/). If taxation plays a part in your considerations, read our article on Box 3 and property in 2026. For the buying party, transfer tax in 2026 is relevant.` },
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
