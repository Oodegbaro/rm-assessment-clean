export const TRAINING_MARKUP = `
<div class="topnav">
  <span class="brand">Account Planning Training</span>
  <span class="modstatus" id="modStatus">Module 1 of 8 &middot; Why this matters now</span>
</div>
<div class="overallbar"><div class="overallfill" id="overallFill" style="width:12.5%;"></div></div>

<div class="module-root" id="mod1" style="display:block;">

  <div class="screen active" id="screen-learn_m1">
    <div class="progressdots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">Why this matters now</div>
    <h1>The market has changed the game</h1>

    <div class="slideblock">
      <img class="heroimg" src="/training-slides/29.jpg" alt="Three market trends reinforcing the need for structured account planning">
      <div class="commentary">
        <h2>Three trends, one direction</h2>
        <p>New corporate additions are marginal compared to rising supply pressure &mdash; growth increasingly has to come from <b>deeper penetration of existing clients</b>, not just adding new names. A decline in high-yield government borrowing is pushing banks to focus harder on corporates to protect revenue. And competition for existing corporates is intensifying, squeezing margins on commoditized products.</p>
        <p>Put together: revenue has to be earned through deeper client penetration and deliberate wallet capture across relationships Access already has &mdash; not primarily by chasing new names.</p>
      </div>
    </div>

    <hr class="divider">

    <div class="slideblock">
      <img class="heroimg" src="/training-slides/27.jpg" alt="Four reasons relationship management in corporate banking is a different ballgame">
      <div class="commentary">
        <h2>Four reasons this is a different game</h2>
        <ul>
          <li><b>High value per client:</b> roughly 30&ndash;50 clients drive most of the economics. Losing one can cut revenue 5&ndash;10%; raising wallet share from 10% to 30% on a single client can add GHc 5&ndash;10m.</li>
          <li><b>Large portion of the wallet is invisible:</b> a client's spend typically spans 6&ndash;10 banks across lending, FX, trade, and cash. Without structured mapping, most of it stays hidden.</li>
          <li><b>Decisions sit high up the chain:</b> CFOs, CEOs, boards, sometimes an offshore HQ. Access has to match that level of seniority and preparation.</li>
          <li><b>Deals are episodic:</b> missing a refinancing or capex window can lock in a competitor for 2&ndash;3 years.</li>
        </ul>
      </div>
    </div>

    <div class="section">
      <span class="practicetag">Try it &middot; not scored</span>
      <h3>Match each reason to its implication</h3>
      <p class="lede">Drag each implication tile into the reason it belongs with. Click "Check my answers" when you're done.</p>

      <div class="tilepool_m1" id="tilepool_m1">
        <div class="tile" draggable="true" data-id="t1" onclick="tileClicked_m1(this)">Prioritize top accounts, track early-warning signals, and deepen share before attrition</div>
        <div class="tile" draggable="true" data-id="t2" onclick="tileClicked_m1(this)">Map wallet by product and competitor to surface gaps and target share systematically</div>
        <div class="tile" draggable="true" data-id="t3" onclick="tileClicked_m1(this)">Map decision-makers, align to decision rights, and build multi-level engagement</div>
        <div class="tile" draggable="true" data-id="t4" onclick="tileClicked_m1(this)">Invest long-term in knowing clients so you can plan around maturities and strategic events</div>
      </div>

      <div class="zonesrow">
        <div class="zone" data-zone="z1" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m1(event,'z1')" onclick="zoneClicked_m1(this)">High value per client</div>
        <div class="zone" data-zone="z2" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m1(event,'z2')" onclick="zoneClicked_m1(this)">Wallet is invisible</div>
        <div class="zone" data-zone="z3" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m1(event,'z3')" onclick="zoneClicked_m1(this)">Decisions sit high up</div>
        <div class="zone" data-zone="z4" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m1(event,'z4')" onclick="zoneClicked_m1(this)">Deals are episodic</div>
      </div>

      <button class="checkbtn" onclick="checkSort_m1()">Check my answers</button>
      <button class="resetbtn" onclick="resetSort_m1()">Reset</button>
      <div class="sortfeedback_m1" id="sortfeedback_m1"></div>
    </div>

    <button class="continuebtn" id="continueBtn_m1" onclick="goTo_m1('check')" disabled>Complete the activity above to continue</button>
  </div>

  <div class="screen" id="screen-check_m1">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot"></div></div>
    <span class="practicetag">Quick check &middot; not scored</span>
    <h1 style="margin-bottom:8px;">Two questions before you move on</h1>
    <p style="color:#5B6474;font-size:0.92rem;margin:0 0 24px;">This is just for you &mdash; nothing here is saved or counted toward your assessment score.</p>

    <div class="section" style="margin-top:0;">
      <div class="pq">
        <div class="qtext">1. A colleague says the fastest way to grow revenue is winning brand-new corporate clients. Based on the market trends here, what's the sharper take?</div>
        <button class="pqopt" onclick="answerPQ_m1(this,false,'q1')">Agree &mdash; new client acquisition is always the primary growth lever</button>
        <button class="pqopt" onclick="answerPQ_m1(this,true,'q1')">Growth increasingly has to come from deeper wallet capture on existing clients, since new additions are marginal against rising supply pressure</button>
        <button class="pqopt" onclick="answerPQ_m1(this,false,'q1')">Neither matters as much as pricing</button>
        <div class="pqexplain" id="pqexplain-q1_m1">New corporate additions are marginal compared to the supply pressure banks are under. The real lever is deeper penetration and deliberate wallet capture on relationships Access already has.</div>
      </div>

      <div class="pq">
        <div class="qtext">2. Why does it matter that "much of a client's wallet is invisible"?</div>
        <button class="pqopt" onclick="answerPQ_m1(this,true,'q2')">Without structured mapping across products and competitors, most of a client's real spend stays hidden from the bank</button>
        <button class="pqopt" onclick="answerPQ_m1(this,false,'q2')">It means the client is hiding money illegally</button>
        <button class="pqopt" onclick="answerPQ_m1(this,false,'q2')">It only matters for very small clients</button>
        <div class="pqexplain" id="pqexplain-q2_m1">A client's spend is typically spread across 6-10 banks and multiple products. Without deliberately mapping it, an RM only ever sees the slice sitting with Access &mdash; not the real opportunity.</div>
      </div>
    </div>

    <button class="finishbtn" id="finishBtn_m1" onclick="goTo_m1('done')" disabled>Finish module &rarr;</button>
  </div>

  <div class="screen" id="screen-done_m1">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div></div>
    <div class="completewrap">
      <div class="checkcircle">&#10003;</div>
      <h2>Module complete</h2>
      <p>Why this matters now &mdash; done. On to Think, Plan, Engage.</p>
      <button class="finishbtn" style="margin-top:0;" onclick="advanceModule(1)">Continue to next module &rarr;</button>
    </div>
  </div>

</div>

<div class="module-root" id="mod2" style="display:none;">

  <!-- ============ SCREEN 1: LEARN ============ -->
  <div class="screen active" id="screen-learn_m2">
    <div class="progressdots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">Think, Plan, Engage</div>
    <h1>The account planning framework</h1>

    <div class="slideblock">
      <img class="heroimg" src="/training-slides/23.jpg" alt="Think Plan Engage framework definition slide">
      <div class="commentary">
        <h2>The three-part cycle</h2>
        <p>An account plan isn&rsquo;t a document you fill in once. It&rsquo;s a systematic framework that runs on a repeating cycle: <b>Think</b>, <b>Plan</b>, and <b>Engage</b>. Each part does a distinct job, and skipping one is the most common way a plan quietly stops working.</p>
      </div>
    </div>

    <hr class="divider">

    <div class="slideblock">
      <img class="heroimg" src="/training-slides/33.jpg" alt="Detailed breakdown of Think, Plan, Engage with specific actions under each">
      <div class="commentary">
        <h2>What each stage actually involves</h2>
        <p><b>Think</b> means understanding the client&rsquo;s business model and priorities &mdash; how they make and spend money, their strategic direction, sector headwinds &mdash; and diagnosing the commercial position: wallet share, product gaps, relationship depth.</p>
        <p><b>Plan</b> means identifying and prioritizing opportunities filtered by winnability (product capability, relationship access, a trigger event) and sized by volume, spread, and probability, then designing the coverage approach and aligning on a tactical calendar.</p>
        <p><b>Engage</b> means executing with discipline &mdash; every meeting produces intelligence or a commitment &mdash; deepening access to real decision-makers, and tracking, reviewing, and iterating: pipeline updated weekly, full plan reviewed monthly with the sector head, every interaction updating at least one field.</p>
      </div>
    </div>

    <hr class="divider">

    <div class="slideblock">
      <img class="heroimg" src="/training-slides/34.jpg" alt="Think Plan Engage detailed breakdown, continued">
      <div class="commentary">
        <p>The same breakdown, reinforced: the discipline underneath Think, Plan, and Engage isn&rsquo;t a one-time setup step. It&rsquo;s the operating rhythm an RM returns to continuously, for as long as the relationship exists.</p>
      </div>
    </div>

    <hr class="divider">

    <div class="slideblock">
      <img class="heroimg" src="/training-slides/32.jpg" alt="How a corporate banker should think - James Donovan six principles mapped to Think Plan Engage">
      <div class="commentary">
        <h2>What this looks like in practice</h2>
        <p>James Donovan, Vice Chairman of Global Client Coverage at Goldman Sachs, frames the same three stages through six practitioner habits: partnering broadly and cultivating radical empathy sit under <b>Think</b>; mastering strategic preparation and boardroom fluency sit under <b>Plan</b>; putting the client first visibly and projecting strategic confidence sit under <b>Engage</b>.</p>
        <p>Different language, same underlying rhythm &mdash; diagnose, organize, then execute with real presence.</p>
      </div>
    </div>

    <div class="section">
      <span class="practicetag">Try it &middot; not scored</span>
      <h3>Sort each activity into the right stage</h3>
      <p class="lede">Drag each tile into Think, Plan, or Engage. Click "Check my answers" when you're done.</p>

      <div class="tilepool_m2" id="tilepool_m2">
        <div class="tile" draggable="true" data-id="t1" onclick="tileClicked_m2(this)">Reviewing last year's wallet share numbers and reading the client's annual report</div>
        <div class="tile" draggable="true" data-id="t2" onclick="tileClicked_m2(this)">Deciding which three opportunities to chase this quarter and looping in the trade finance specialist</div>
        <div class="tile" draggable="true" data-id="t3" onclick="tileClicked_m2(this)">Sitting down with the client's CFO and walking away with a specific, agreed next step</div>
      </div>

      <div class="zonesrow">
        <div class="zone" data-zone="Think" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m2(event,'Think')" onclick="zoneClicked_m2(this)">Think</div>
        <div class="zone" data-zone="Plan" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m2(event,'Plan')" onclick="zoneClicked_m2(this)">Plan</div>
        <div class="zone" data-zone="Engage" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m2(event,'Engage')" onclick="zoneClicked_m2(this)">Engage</div>
      </div>

      <button class="checkbtn" onclick="checkSort_m2()">Check my answers</button>
      <button class="resetbtn" onclick="resetSort_m2()">Reset</button>
      <div class="sortfeedback_m2" id="sortfeedback_m2"></div>
    </div>

    <button class="continuebtn" id="continueBtn_m2" onclick="goTo_m2('check')" disabled>Complete the activity above to continue</button>
  </div>

  <!-- ============ SCREEN 2: PRACTICE CHECK ============ -->
  <div class="screen" id="screen-check_m2">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot"></div></div>
    <span class="practicetag">Quick check &middot; not scored</span>
    <h1 style="margin-bottom:8px;">Two questions before you move on</h1>
    <p style="color:#5B6474;font-size:0.92rem;margin:0 0 24px;">This is just for you &mdash; nothing here is saved or counted toward your assessment score.</p>

    <div class="section" style="margin-top:0;">
      <div class="pq">
        <div class="qtext">1. An RM reviews a client's financials on Monday, and by Wednesday is pitching a new credit facility directly to the CFO, without checking who else needs to be involved. What's missing?</div>
        <button class="pqopt" onclick="answerPQ_m2(this,false,'q1')">They moved too fast without understanding the client at all</button>
        <button class="pqopt" onclick="answerPQ_m2(this,true,'q1')">They never checked decision rights or lined up the right internal team before pitching</button>
        <button class="pqopt" onclick="answerPQ_m2(this,false,'q1')">They should have had more meetings before pitching</button>
        <div class="pqexplain" id="pqexplain-q1_m2">Some Think clearly happened here &mdash; the financials were reviewed. What's missing is Plan: checking who actually decides, and lining up the right people before pitching.</div>
      </div>

      <div class="pq">
        <div class="qtext">2. Which of these should send an RM back to Think, even in the middle of an existing relationship?</div>
        <button class="pqopt" onclick="answerPQ_m2(this,true,'q2')">A leadership change at the client, or a sharp shift in their numbers</button>
        <button class="pqopt" onclick="answerPQ_m2(this,false,'q2')">It's been exactly one month since the last call</button>
        <button class="pqopt" onclick="answerPQ_m2(this,false,'q2')">The RM happens to have a free afternoon</button>
        <div class="pqexplain" id="pqexplain-q2_m2">A leadership change or a real shock in the numbers can flip everything you thought you knew about a client &mdash; that's exactly the kind of trigger that should send you back to reassess, not a fixed time interval or a quiet afternoon.</div>
      </div>
    </div>

    <button class="finishbtn" id="finishBtn_m2" onclick="goTo_m2('done')" disabled>Finish module &rarr;</button>
  </div>

  <!-- ============ SCREEN 3: COMPLETE ============ -->
  <div class="screen" id="screen-done_m2">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div></div>
    <div class="completewrap">
      <div class="checkcircle">&#10003;</div>
      <h2>Module complete</h2>
      <p>Think, Plan, Engage &mdash; done. Seven more to go.</p>
      <button class="finishbtn" style="margin-top:0;" onclick="advanceModule(2)">Continue to next module &rarr;</button>
    </div>
  </div>

</div>

<div class="module-root" id="mod3" style="display:none;">
  <div class="screen active" id="screen-learn_m3">
    <div class="progressdots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">What an account plan actually is</div>
    <h1>Four sections, one living document</h1>
    
<div class="slideblock">
  <img class="heroimg" src="/training-slides/36.jpg" alt="Four broad sections of the account plan">
  <div class="commentary">
    <h2>Four sections, one living document</h2>
    <p>Every account plan has four broad sections: <b>Company overview</b> (profile, ownership, governance, business model, value chain), <b>Financial performance</b> (trend analysis, wallet share, product penetration), <b>Relationship mapping and development plan</b> (heat map plus a development plan), and <b>Opportunity pipeline</b> (the long list of opportunities across Risk, Deposit, FX, and Fee Income).</p>
    <p>This isn't filled in once. It's a living document, continuously updated as the relationship evolves.</p>
  </div>
</div>
<hr class="divider">
<div class="slideblock">
  <img class="heroimg" src="/training-slides/38.jpg" alt="The real account plan cover page fields">
  <div class="commentary">
    <h2>What the cover page actually asks for</h2>
    <p>Before any of the four sections, the cover page fixes a handful of facts that everything else depends on: Client Name, Sector, Date Prepared, Plan Period, Version, Relationship Manager, Sector Head, Relationship Status, Willingness, and Bank Position. Getting these labels precise matters &mdash; a sloppy classification here quietly corrupts every section that follows.</p>
  </div>
</div>

    <div class="section">
      
<span class="practicetag">Try it &middot; not scored</span>
<h3>Match each section to what it covers</h3>
<p class="lede">Drag each description into the section it belongs to.</p>
<div class="tilepool_m3" id="tilepool_m3">
  <div class="tile" draggable="true" data-id="t1" onclick="tileClicked_m3(this)">Profile, ownership, governance, business model, value chain</div>
  <div class="tile" draggable="true" data-id="t2" onclick="tileClicked_m3(this)">Trend analysis, wallet share, product penetration</div>
  <div class="tile" draggable="true" data-id="t3" onclick="tileClicked_m3(this)">Relationship heat map and a development plan</div>
  <div class="tile" draggable="true" data-id="t4" onclick="tileClicked_m3(this)">The long list of opportunities across Risk, Deposit, FX, and Fee Income</div>
</div>
<div class="zonesrow cols4">
  <div class="zone" data-zone="z1" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m3(event,'z1')" onclick="zoneClicked_m3(this)">Company overview</div>
  <div class="zone" data-zone="z2" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m3(event,'z2')" onclick="zoneClicked_m3(this)">Financial performance</div>
  <div class="zone" data-zone="z3" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m3(event,'z3')" onclick="zoneClicked_m3(this)">Relationship mapping</div>
  <div class="zone" data-zone="z4" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m3(event,'z4')" onclick="zoneClicked_m3(this)">Opportunity pipeline</div>
</div>
<button class="checkbtn" onclick="checkSort_m3()">Check my answers</button>
<button class="resetbtn" onclick="resetSort_m3()">Reset</button>
<div class="sortfeedback_m3" id="sortfeedback_m3"></div>

    </div>
    <button class="continuebtn" id="continueBtn_m3" onclick="goTo_m3('check')" disabled>Complete the activity above to continue</button>
  </div>

  <div class="screen" id="screen-check_m3">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot"></div></div>
    <span class="practicetag">Quick check &middot; not scored</span>
    <h1 style="margin-bottom:8px;">A couple of questions before you move on</h1>
    <p style="color:#5B6474;font-size:0.92rem;margin:0 0 24px;">This is just for you &mdash; nothing here is saved or counted toward your assessment score.</p>
    <div class="section" style="margin-top:0;">
      
<div class="pq">
  <div class="qtext">1. Where does a client's wallet share and product penetration actually get recorded?</div>
  <button class="pqopt" onclick="answerPQ_m3(this,false,'q1')">Company overview</button>
  <button class="pqopt" onclick="answerPQ_m3(this,true,'q1')">Financial performance</button>
  <button class="pqopt" onclick="answerPQ_m3(this,false,'q1')">Opportunity pipeline</button>
  <div class="pqexplain" id="pqexplain-q1_m3">Wallet share and product penetration sit in Financial performance, alongside the trend analysis.</div>
</div>
<div class="pq">
  <div class="qtext">2. Why is the account plan described as a "living document" rather than a form you fill out once?</div>
  <button class="pqopt" onclick="answerPQ_m3(this,false,'q2')">Because it needs to be re-typed every year for compliance</button>
  <button class="pqopt" onclick="answerPQ_m3(this,true,'q2')">Because the client relationship keeps changing, so the plan needs continuous updating to stay useful</button>
  <button class="pqopt" onclick="answerPQ_m3(this,false,'q2')">Because the template format changes frequently</button>
  <div class="pqexplain" id="pqexplain-q2_m3">A plan that's filled in once and filed away goes stale fast. It's meant to be updated continuously as the relationship evolves.</div>
</div>

    </div>
    <button class="finishbtn" id="finishBtn_m3" onclick="goTo_m3('done')" disabled>Finish module &rarr;</button>
  </div>

  <div class="screen" id="screen-done_m3">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div></div>
    <div class="completewrap">
      <div class="checkcircle">&#10003;</div>
      <h2>Module complete</h2>
      <p>The account plan structure &mdash; done. On to wallet share.</p>
      <button class="finishbtn" style="margin-top:0;" onclick="advanceModule(3)">Continue to next module &rarr;</button>
    </div>
  </div>
</div>

<div class="module-root" id="mod4" style="display:none;">
  <div class="screen active" id="screen-learn_m4">
    <div class="progressdots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">Wallet share in practice</div>
    <h1>Reading wallet share like an RM</h1>
    
<div class="slideblock">
  <img class="heroimg" src="/training-slides/43.jpg" alt="Nestle Ghana wallet share analysis table showing decline from 9.5% to 1.4%">
  <div class="commentary">
    <h2>What a real wallet share table looks like</h2>
    <p>This is an actual client's numbers. The revenue pool is calculated using 3% of the client's total turnover (or actual interest expense plus 10% of free cash float, where that's available). Wallet share is Access's total revenue from the client, divided by that pool.</p>
    <p>Look at what happened here: wallet share fell from <b>9.5%</b> to <b>8.1%</b> to <b>1.4%</b> across three years &mdash; an 83% decline. Total revenue from this client dropped from GHS 8.6m to just GHS 1.8m, and deposits and loans outstanding both collapsed by roughly 80%. The comment on the slide says it plainly: <b>"Sharp decline &mdash; relationship fragility."</b></p>
    <p>This is exactly the kind of number that should trigger a return to Think: something has changed in this relationship, and the plan needs to find out what before it gets worse.</p>
  </div>
</div>

    <div class="section">
      
<span class="practicetag">Try it &middot; not scored</span>
<h3>Calculate the wallet share</h3>
<p class="lede">A different client: Access earned <b>GHS 2,400,000</b> in total revenue last year. The client's total revenue was <b>GHS 400,000,000</b>. Using the standard 3% rule, what's Access's wallet share? Drag the correct answer into the box.</p>
<div class="tilepool_m4" id="tilepool_m4">
  <div class="tile" draggable="true" data-id="t1" onclick="tileClicked_m4(this)">20%</div>
  <div class="tile" draggable="true" data-id="t2" onclick="tileClicked_m4(this)">2%</div>
  <div class="tile" draggable="true" data-id="t3" onclick="tileClicked_m4(this)">6%</div>
</div>
<div class="zonesrow cols3">
  <div class="zone" data-zone="z1" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m4(event,'z1')" onclick="zoneClicked_m4(this)">Your answer</div>
</div>
<button class="checkbtn" onclick="checkSort_m4()">Check my answer</button>
<button class="resetbtn" onclick="resetSort_m4()">Reset</button>
<div class="sortfeedback_m4" id="sortfeedback_m4"></div>

    </div>
    <button class="continuebtn" id="continueBtn_m4" onclick="goTo_m4('check')" disabled>Complete the activity above to continue</button>
  </div>

  <div class="screen" id="screen-check_m4">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot"></div></div>
    <span class="practicetag">Quick check &middot; not scored</span>
    <h1 style="margin-bottom:8px;">A couple of questions before you move on</h1>
    <p style="color:#5B6474;font-size:0.92rem;margin:0 0 24px;">This is just for you &mdash; nothing here is saved or counted toward your assessment score.</p>
    <div class="section" style="margin-top:0;">
      
<div class="pq">
  <div class="qtext">1. A client's wallet share climbed from 3% to 9% in one year, driven almost entirely by a single large advisory fee on a one-off deal. Good news?</div>
  <button class="pqopt" onclick="answerPQ_m4(this,false,'q1')">Yes, rising wallet share is always a good sign</button>
  <button class="pqopt" onclick="answerPQ_m4(this,true,'q1')">Not necessarily &mdash; a one-off fee is fragile, and the relationship could collapse back down once it's gone</button>
  <div class="pqexplain" id="pqexplain-q1_m4">This is exactly the Nestle pattern in reverse &mdash; concentration in one flow is a fragility risk, even when the number is going up rather than down.</div>
</div>
<div class="pq">
  <div class="qtext">2. What should a wallet share collapse like Nestle's (9.5% to 1.4%) actually trigger for the RM?</div>
  <button class="pqopt" onclick="answerPQ_m4(this,false,'q2')">Nothing &mdash; wallet share naturally fluctuates year to year</button>
  <button class="pqopt" onclick="answerPQ_m4(this,true,'q2')">A return to Think &mdash; something has fundamentally changed in this relationship and needs investigating</button>
  <div class="pqexplain" id="pqexplain-q2_m4">An 83% decline isn't normal fluctuation. It's exactly the kind of shock that should send an RM back to reassess the relationship from scratch.</div>
</div>

    </div>
    <button class="finishbtn" id="finishBtn_m4" onclick="goTo_m4('done')" disabled>Finish module &rarr;</button>
  </div>

  <div class="screen" id="screen-done_m4">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div></div>
    <div class="completewrap">
      <div class="checkcircle">&#10003;</div>
      <h2>Module complete</h2>
      <p>Wallet share &mdash; done. On to mapping relationships.</p>
      <button class="finishbtn" style="margin-top:0;" onclick="advanceModule(4)">Continue to next module &rarr;</button>
    </div>
  </div>
</div>

<div class="module-root" id="mod5" style="display:none;">
  <div class="screen active" id="screen-learn_m5">
    <div class="progressdots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">Mapping relationships</div>
    <h1>Who really decides</h1>
    
<div class="slideblock">
  <img class="heroimg" src="/training-slides/47.jpg" alt="Nestle Ghana relationship map and development plan showing real contacts classified by influence and sentiment">
  <div class="commentary">
    <h2>A real relationship map</h2>
    <p>Five contacts, each classified by Influence (Decision maker, Gatekeeper, or Influencer) and Sentiment. Notice that <b>three separate people are Decision Makers</b> here &mdash; the Group CFO and Group Treasury (both at group level, offshore), plus the local CFO is actually a Gatekeeper, not a decision maker, since local group subsidiaries often need group-level sign-off above a threshold.</p>
    <p>The development plan on the right turns this map into action: a strategy meeting to align on ambitions, a pitch meeting for a stalled vehicle-financing opportunity, an advisory visit, even a social event &mdash; each with a specific Access delegation, an objective, a date, and a status.</p>
  </div>
</div>

    <div class="section">
      
<span class="practicetag">Try it &middot; not scored</span>
<h3>Classify this contact</h3>
<p class="lede">"The Finance Manager processes every payment request Access sends over, but has told the RM directly: 'I just execute what the CFO approves, nothing more.'" Drag the two correct labels into the boxes.</p>
<div class="tilepool_m5" id="tilepool_m5">
  <div class="tile" draggable="true" data-id="t1" onclick="tileClicked_m5(this)">Decision Maker</div>
  <div class="tile" draggable="true" data-id="t2" onclick="tileClicked_m5(this)">Gatekeeper</div>
  <div class="tile" draggable="true" data-id="t3" onclick="tileClicked_m5(this)">Positive</div>
  <div class="tile" draggable="true" data-id="t4" onclick="tileClicked_m5(this)">Neutral</div>
</div>
<div class="zonesrow">
  <div class="zone" data-zone="z1" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m5(event,'z1')" onclick="zoneClicked_m5(this)">Influence level</div>
  <div class="zone" data-zone="z2" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m5(event,'z2')" onclick="zoneClicked_m5(this)">Sentiment</div>
</div>
<button class="checkbtn" onclick="checkSort_m5()">Check my answers</button>
<button class="resetbtn" onclick="resetSort_m5()">Reset</button>
<div class="sortfeedback_m5" id="sortfeedback_m5"></div>

    </div>
    <button class="continuebtn" id="continueBtn_m5" onclick="goTo_m5('check')" disabled>Complete the activity above to continue</button>
  </div>

  <div class="screen" id="screen-check_m5">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot"></div></div>
    <span class="practicetag">Quick check &middot; not scored</span>
    <h1 style="margin-bottom:8px;">A couple of questions before you move on</h1>
    <p style="color:#5B6474;font-size:0.92rem;margin:0 0 24px;">This is just for you &mdash; nothing here is saved or counted toward your assessment score.</p>
    <div class="section" style="margin-top:0;">
      
<div class="pq">
  <div class="qtext">1. On the Nestle map, both the Group CFO and Group Treasury are marked as Decision Makers. What does that tell an RM about where real approval actually happens?</div>
  <button class="pqopt" onclick="answerPQ_m5(this,false,'q1')">Nothing unusual, every client has one clear decision maker</button>
  <button class="pqopt" onclick="answerPQ_m5(this,true,'q1')">For a global/group client, real sign-off can sit at group level, offshore, not with the local team the RM sees day to day</button>
  <div class="pqexplain" id="pqexplain-q1_m5">This is a common pattern for global/group clients &mdash; the local CFO may only be a Gatekeeper, while the actual sign-off sits with group-level contacts the RM rarely meets directly.</div>
</div>
<div class="pq">
  <div class="qtext">2. Why does the development plan list a "social event" alongside pitch meetings and strategy sessions?</div>
  <button class="pqopt" onclick="answerPQ_m5(this,false,'q2')">It doesn't belong there &mdash; only commercial meetings should be tracked</button>
  <button class="pqopt" onclick="answerPQ_m5(this,true,'q2')">Relationship depth is built deliberately, not just through commercial pitches &mdash; it's a real, planned action like any other</button>
  <div class="pqexplain" id="pqexplain-q2_m5">The development plan is about deepening relationships broadly, not just pushing products. A planned social touchpoint is a legitimate, deliberate action, tracked with the same discipline as a pitch meeting.</div>
</div>

    </div>
    <button class="finishbtn" id="finishBtn_m5" onclick="goTo_m5('done')" disabled>Finish module &rarr;</button>
  </div>

  <div class="screen" id="screen-done_m5">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div></div>
    <div class="completewrap">
      <div class="checkcircle">&#10003;</div>
      <h2>Module complete</h2>
      <p>Mapping relationships &mdash; done. On to the opportunity pipeline.</p>
      <button class="finishbtn" style="margin-top:0;" onclick="advanceModule(5)">Continue to next module &rarr;</button>
    </div>
  </div>
</div>

<div class="module-root" id="mod6" style="display:none;">
  <div class="screen active" id="screen-learn_m6">
    <div class="progressdots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">The opportunity pipeline</div>
    <h1>From relationship to revenue</h1>
    
<div class="slideblock">
  <img class="heroimg" src="/training-slides/50.jpg" alt="Nestle Ghana pipeline register showing real opportunities with volume, spread, probability, stage">
  <div class="commentary">
    <h2>A real pipeline register</h2>
    <p>Six live opportunities, each with volume, spread, probability, tenor, and stage. Take the Term Loan for CAPEX: GHS 120,000,000 at a 2% spread and 60% probability gives an annualized value of GHS 1,440,000 &mdash; and with a 3-year tenor, a total weighted value of GHS 4,320,000. It's sitting in Negotiation, the furthest along of anything on this list.</p>
    <p>Add every opportunity together and this client's pipeline totals GHS 4,050,000 in annualized value. Against a target opportunity of GHS 6,750,000, that's a real, named gap of GHS 2,700,000 &mdash; not vague underperformance, an actual number to close.</p>
  </div>
</div>

    <div class="section">
      
<span class="practicetag">Try it &middot; not scored</span>
<h3>Calculate the annualized value</h3>
<p class="lede">A trade finance facility: volume <b>GHS 60,000,000</b>, spread <b>1.5%</b>, probability <b>50%</b>. Drag the correct answer into the box.</p>
<div class="tilepool_m6" id="tilepool_m6">
  <div class="tile" draggable="true" data-id="t1" onclick="tileClicked_m6(this)">GHS 450,000</div>
  <div class="tile" draggable="true" data-id="t2" onclick="tileClicked_m6(this)">GHS 900,000</div>
  <div class="tile" draggable="true" data-id="t3" onclick="tileClicked_m6(this)">GHS 45,000</div>
</div>
<div class="zonesrow cols3">
  <div class="zone" data-zone="z1" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m6(event,'z1')" onclick="zoneClicked_m6(this)">Your answer</div>
</div>
<button class="checkbtn" onclick="checkSort_m6()">Check my answer</button>
<button class="resetbtn" onclick="resetSort_m6()">Reset</button>
<div class="sortfeedback_m6" id="sortfeedback_m6"></div>

    </div>
    <button class="continuebtn" id="continueBtn_m6" onclick="goTo_m6('check')" disabled>Complete the activity above to continue</button>
  </div>

  <div class="screen" id="screen-check_m6">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot"></div></div>
    <span class="practicetag">Quick check &middot; not scored</span>
    <h1 style="margin-bottom:8px;">A couple of questions before you move on</h1>
    <p style="color:#5B6474;font-size:0.92rem;margin:0 0 24px;">This is just for you &mdash; nothing here is saved or counted toward your assessment score.</p>
    <div class="section" style="margin-top:0;">
      
<div class="pq">
  <div class="qtext">1. On the Nestle pipeline, the FX On-demand Supply line has no tenor listed ("N/A"), and its Total Weighted Value column is also blank. Why might that be?</div>
  <button class="pqopt" onclick="answerPQ_m6(this,true,'q1')">FX facilities are typically ongoing/revolving rather than having a fixed tenor, so a multi-year weighted value doesn't apply the same way</button>
  <button class="pqopt" onclick="answerPQ_m6(this,false,'q1')">It's a data entry error that should always be filled in</button>
  <div class="pqexplain" id="pqexplain-q1_m6">Not every product has a tenor in the same sense a term loan does &mdash; an ongoing FX facility is reasonably left blank there rather than forced into the format.</div>
</div>
<div class="pq">
  <div class="qtext">2. This client's pipeline totals GHS 4,050,000 against a target of GHS 6,750,000. What does naming that GHS 2,700,000 gap actually do for the RM?</div>
  <button class="pqopt" onclick="answerPQ_m6(this,false,'q2')">Nothing practical, it's just a reporting number</button>
  <button class="pqopt" onclick="answerPQ_m6(this,true,'q2')">It turns the pipeline into a real forecast with a concrete shortfall to close, not just a list of deals</button>
  <div class="pqexplain" id="pqexplain-q2_m6">A pipeline without a named gap is just a wish list. Naming the shortfall is what makes it something the RM can actually plan against.</div>
</div>

    </div>
    <button class="finishbtn" id="finishBtn_m6" onclick="goTo_m6('done')" disabled>Finish module &rarr;</button>
  </div>

  <div class="screen" id="screen-done_m6">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div></div>
    <div class="completewrap">
      <div class="checkcircle">&#10003;</div>
      <h2>Module complete</h2>
      <p>The opportunity pipeline &mdash; done. On to using AI well.</p>
      <button class="finishbtn" style="margin-top:0;" onclick="advanceModule(6)">Continue to next module &rarr;</button>
    </div>
  </div>
</div>

<div class="module-root" id="mod7" style="display:none;">

  <!-- STAGE 1: CLIENT ARCHETYPE -->
  <div class="screen active" id="screen-s1_m7">
    <div class="progressdots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">Stage 1 of 4</div>
    <h1>Know your client before you prompt</h1>
    <img class="heroimg" src="/training-slides/61.jpg" alt="Client archetype table">
    <div class="commentary">
      <h2>Why archetype comes first</h2>
      <p>The output template never changes, but what feeds it does. Before writing a single prompt, an RM needs to know which of four archetypes a client falls into &mdash; <b>private/local</b>, <b>public/listed</b>, <b>public sector/SOE</b>, or <b>global/group</b> &mdash; because each pulls from a different evidence hierarchy and decision logic.</p>
    </div>
    <div class="section">
      <span class="practicetag">Try it &middot; not scored</span>
      <h3>Classify this client</h3>
      <p class="lede">"A telecoms tower company based in Accra, majority owned by a European infrastructure fund. Day-to-day decisions are made locally, but any new banking facility above $2m needs sign-off from the fund's investment committee abroad." Which archetype is this?</p>
      <div class="tilepool" id="tilepool1_m7">
        <div class="tile" draggable="true" data-id="a1" onclick="tileClicked1_m7(this)">Private / local</div>
        <div class="tile" draggable="true" data-id="a2" onclick="tileClicked1_m7(this)">Public / listed</div>
        <div class="tile" draggable="true" data-id="a3" onclick="tileClicked1_m7(this)">Public sector / SOE</div>
        <div class="tile" draggable="true" data-id="a4" onclick="tileClicked1_m7(this)">Global / group</div>
      </div>
      <div class="zonesrow"><div class="zone" data-zone="ans" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile1_m7(event)">Your answer</div></div>
      <button class="checkbtn" onclick="checkStage1_m7()">Check my answer</button>
      <button class="resetbtn" onclick="resetStage1_m7()">Reset</button>
      <div class="sortfeedback" id="feedback1_m7"></div>
    </div>
    <button class="continuebtn" id="btn1_m7" onclick="goTo_m7('s2')" disabled>Complete the activity above to continue</button>
  </div>

  <!-- STAGE 2: SCOPE -->
  <div class="screen" id="screen-s2_m7">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">Stage 2 of 4</div>
    <h1>What makes a prompt good</h1>
    <img class="heroimg" src="/training-slides/59.jpg" alt="SCOPE framework">
    <div class="commentary">
      <h2>The SCOPE framework</h2>
      <p><b>S</b>ource pack, <b>C</b>lient archetype, <b>O</b>utput format, <b>P</b>roof and gaps, <b>E</b>scalate to action. The golden rule underneath: if the answer would change an RM decision, verify the source before it leaves the RM's desk.</p>
    </div>
    <hr class="divider">
    <img class="heroimg" src="/training-slides/60.jpg" alt="Master prompt sample and Nestle running example">
    <div class="commentary">
      <h2>SCOPE, applied to a real case</h2>
      <p>The master prompt names the source pack, asks for facts to be separated from interpretation, and forbids inventing figures or stakeholders. Applied to a real client, it even catches a real contradiction: FY25 revenue shown as GHS 4.5bn in the financials section but GHS 11bn in the priorities section &mdash; flagged, not silently resolved.</p>
    </div>
    <div class="section">
      <span class="practicetag">Try it &middot; not scored</span>
      <h3>Match each SCOPE letter</h3>
      <div class="tilepool" id="tilepool2_m7">
        <div class="tile" draggable="true" data-id="t1" onclick="tileClicked2_m7(this)">Source pack</div>
        <div class="tile" draggable="true" data-id="t2" onclick="tileClicked2_m7(this)">Client archetype</div>
        <div class="tile" draggable="true" data-id="t3" onclick="tileClicked2_m7(this)">Output format</div>
        <div class="tile" draggable="true" data-id="t4" onclick="tileClicked2_m7(this)">Proof and gaps</div>
        <div class="tile" draggable="true" data-id="t5" onclick="tileClicked2_m7(this)">Escalate to action</div>
      </div>
      <div class="zonesrow" style="grid-template-columns:repeat(5,1fr);">
        <div class="zone" data-zone="S" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile2_m7(event,'S')" onclick="zoneClicked2_m7(this)">S</div>
        <div class="zone" data-zone="C" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile2_m7(event,'C')" onclick="zoneClicked2_m7(this)">C</div>
        <div class="zone" data-zone="O" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile2_m7(event,'O')" onclick="zoneClicked2_m7(this)">O</div>
        <div class="zone" data-zone="P" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile2_m7(event,'P')" onclick="zoneClicked2_m7(this)">P</div>
        <div class="zone" data-zone="E" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile2_m7(event,'E')" onclick="zoneClicked2_m7(this)">E</div>
      </div>
      <button class="checkbtn" onclick="checkStage2_m7()">Check my answers</button>
      <button class="resetbtn" onclick="resetStage2_m7()">Reset</button>
      <div class="sortfeedback" id="feedback2_m7"></div>
    </div>
    <button class="continuebtn" id="btn2_m7" onclick="goTo_m7('s3')" disabled>Complete the activity above to continue</button>
  </div>

  <!-- STAGE 3: EVALUATE SAMPLE PROMPTS -->
  <div class="screen" id="screen-s3_m7">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">Stage 3 of 4</div>
    <h1>Which prompt actually follows best practice?</h1>
    <p style="color:#5B6474;font-size:0.92rem;margin:0 0 20px;">Three RMs each wrote a prompt to draft an account plan for the same client. Read all three, then click the one that genuinely follows best practice.</p>

    <div class="promptcard" id="pcard-good_m7" onclick="selectPrompt_m7('good')">
      <div class="ptext">"You are supporting an RM to build an account plan for [CLIENT], a private local company. Use only the account plan template, financials, product holdings, call memos, and RM notes provided. Separate facts from interpretations. Do not invent figures, decision makers, relationships, or priorities. For every section include RM validation questions and a confidence rating. Flag source conflicts rather than resolving silently."</div>
      <div class="pverdict">Correct pick &mdash; names the source pack, the client archetype, requires evidence and gap-flagging, and ends with validation questions. This is genuinely well-built.</div>
    </div>

    <div class="promptcard" id="pcard-vague_m7" onclick="selectPrompt_m7('vague')">
      <div class="ptext">"Summarize this client's financials and suggest three opportunities for Access."</div>
      <div class="pverdict">No source-pack boundary, no client archetype, no output format, and no instruction to flag gaps. It'll get an answer &mdash; just not one you can trust without redoing the work yourself.</div>
    </div>

    <div class="promptcard" id="pcard-risky_m7" onclick="selectPrompt_m7('risky')">
      <div class="ptext">"Using everything you know about this client, write their strategic priorities."</div>
      <div class="pverdict">"Everything you know" invites the AI outside the source pack entirely &mdash; exactly how unsupported claims end up in a real plan.</div>
    </div>

    <button class="continuebtn" id="btn3_m7" onclick="goTo_m7('s4')" disabled>Complete the activity above to continue</button>
  </div>

  <!-- STAGE 4: WRITE YOUR OWN, GET EVALUATED -->
  <div class="screen" id="screen-s4_m7">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div><div class="dot"></div></div>
    <div class="badge">Stage 4 of 4 &middot; Capstone</div>
    <h1>Write your own prompt</h1>
    <div class="scenariobox">
      <b>Client:</b> Volta Textiles Ltd, a private local manufacturer in Kumasi. You have: financials, product holdings, two call memos, and RM notes. Write ONE prompt you'd give an AI tool to draft a complete first-pass account plan for this client.
    </div>
    <p style="color:#5B6474;font-size:0.85rem;margin:0 0 12px;">Your prompt will be evaluated on SCOPE best practice <b>and</b> whether it would actually produce coverage of every core account plan section &mdash; company overview, financials, relationships and risks, strategic priorities, and the opportunity pipeline.</p>
    <textarea class="promptinput" id="promptInput_m7" placeholder="Type your prompt here..."></textarea>
    <button class="evalbtn" id="evalBtn_m7" onclick="evaluatePrompt_m7()">Evaluate my prompt</button>
    <div class="loadingdots" id="loadingMsg_m7" style="display:none;">Evaluating your prompt&hellip;</div>

    <div class="evalresult" id="evalResult_m7">
      <div class="checklist">
        <h4>SCOPE best practice</h4>
        <div id="scopeChecklist_m7"></div>
      </div>
      <div class="checklist">
        <h4>Account plan coverage</h4>
        <div id="sectionsChecklist_m7"></div>
      </div>
      <div class="verdictbox" id="verdictBox_m7"></div>
    </div>

    <button class="continuebtn" id="btn4_m7" onclick="goTo_m7('done')" disabled>Complete the activity above to continue</button>
  </div>

  <!-- DONE -->
  <div class="screen" id="screen-done_m7">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div></div>
    <div class="completewrap">
      <div class="checkcircle">&#10003;</div>
      <h2>Module complete</h2>
      <p>Using GenAI well &mdash; done. On to call memos.</p>
      <button class="finishbtn" style="margin-top:0;" onclick="advanceModule(7)">Continue to next module &rarr;</button>
    </div>
  </div>

</div>

<div class="module-root" id="mod8" style="display:none;">
  <div class="screen active" id="screen-learn_m8">
    <div class="progressdots"><div class="dot active"></div><div class="dot"></div><div class="dot"></div></div>
    <div class="badge">Call memos & client insights</div>
    <h1>The layer that feeds everything else</h1>
    
<div class="slideblock">
  <img class="heroimg" src="/training-slides/62.jpg" alt="Call memos minimum quality bar and RM task prompt samples">
  <div class="commentary">
    <h2>The minimum quality bar</h2>
    <p><b>Every call memo produces a next action, an owner, a date, and a validation question.</b> Nothing less clears the bar &mdash; it's notes, not a usable memo.</p>
    <p>Call memos serve three jobs: filling one from scratch using raw notes, updating an existing memo with new information without losing prior decisions, and using a memo to refresh the account plan itself &mdash; converting a conversation into a real portfolio action, with the exact section to update and the evidence line that justifies it.</p>
  </div>
</div>

    <div class="section">
      
<span class="practicetag">Try it &middot; not scored</span>
<h3>Spot what's missing</h3>
<p class="lede">"Called the client. They're interested in the new facility. Will follow up." Drag the elements this memo is missing into the box.</p>
<div class="tilepool_m8" id="tilepool_m8">
  <div class="tile" draggable="true" data-id="t1" onclick="tileClicked_m8(this)">A named owner</div>
  <div class="tile" draggable="true" data-id="t2" onclick="tileClicked_m8(this)">A target date</div>
  <div class="tile" draggable="true" data-id="t3" onclick="tileClicked_m8(this)">A validation question</div>
  <div class="tile" draggable="true" data-id="t4" onclick="tileClicked_m8(this)">A next action (present, though vague)</div>
</div>
<div class="zonesrow">
  <div class="zone" data-zone="missing" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m8(event,'missing')" onclick="zoneClicked_m8(this)">Missing</div>
  <div class="zone" data-zone="present" ondragover="event.preventDefault();this.classList.add('over')" ondragleave="this.classList.remove('over')" ondrop="dropTile_m8(event,'present')" onclick="zoneClicked_m8(this)">Already present</div>
</div>
<button class="checkbtn" onclick="checkSort_m8()">Check my answers</button>
<button class="resetbtn" onclick="resetSort_m8()">Reset</button>
<div class="sortfeedback_m8" id="sortfeedback_m8"></div>

    </div>
    <button class="continuebtn" id="continueBtn_m8" onclick="goTo_m8('check')" disabled>Complete the activity above to continue</button>
  </div>

  <div class="screen" id="screen-check_m8">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot"></div></div>
    <span class="practicetag">Quick check &middot; not scored</span>
    <h1 style="margin-bottom:8px;">A couple of questions before you move on</h1>
    <p style="color:#5B6474;font-size:0.92rem;margin:0 0 24px;">This is just for you &mdash; nothing here is saved or counted toward your assessment score.</p>
    <div class="section" style="margin-top:0;">
      
<div class="pq">
  <div class="qtext">1. Raw notes read: "Client seemed hesitant. Confirmed they need board approval before signing." What's the fact, and what's the impression?</div>
  <button class="pqopt" onclick="answerPQ_m8(this,false,'q1')">Both lines are equally factual</button>
  <button class="pqopt" onclick="answerPQ_m8(this,true,'q1')">"Needs board approval" is a fact worth logging; "seemed hesitant" is the RM's read on tone, a different category of information</button>
  <div class="pqexplain" id="pqexplain-q1_m8">A stated requirement is a loggable fact. A feeling about hesitancy is a judgment call &mdash; useful, but shouldn't be stated as if it were confirmed.</div>
</div>
<div class="pq">
  <div class="qtext">2. Why would a good prompt for updating a call memo say "keep old actions, mark completed items, flag any contradictions with the previous meeting record"?</div>
  <button class="pqopt" onclick="answerPQ_m8(this,false,'q2')">It's unnecessary detail, just overwrite the old memo entirely</button>
  <button class="pqopt" onclick="answerPQ_m8(this,true,'q2')">Because updating a memo should preserve prior decisions and surface conflicts, not silently erase or override history</button>
  <div class="pqexplain" id="pqexplain-q2_m8">Losing prior decisions or silently resolving a contradiction defeats the purpose of an evolving record. Updates should build on history, not erase it.</div>
</div>

    </div>
    <button class="finishbtn" id="finishBtn_m8" onclick="goTo_m8('done')" disabled>Finish module &rarr;</button>
  </div>

  <div class="screen" id="screen-done_m8">
    <div class="progressdots"><div class="dot active"></div><div class="dot active"></div><div class="dot active"></div></div>
    <div class="completewrap">
      <div class="checkcircle">&#10003;</div>
      <h2>Module complete</h2>
      <p>Call memos &mdash; done. That's all nine modules complete.</p>
      <button class="finishbtn" style="margin-top:0;" onclick="advanceModule(8)">Continue to next module &rarr;</button>
    </div>
  </div>
</div>

<div class="module-root" id="mod-final" style="display:none;">
  <div class="page">
    <div class="completewrap">
      <div class="checkcircle">&#10003;</div>
      <h2>All training modules complete</h2>
      <p>You've covered the full framework. Ready for the assessment.</p>
      <button class="finishbtn" style="margin-top:0;" onclick="completeTrainingAndGo()">Go to the assessment &rarr;</button>
    </div>
  </div>
</div>
`;
