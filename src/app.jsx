import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronRight, Check, Clock, ShieldCheck, Truck, X, AlertTriangle, Package, Scale, ArrowRight, Star, MessageSquare, ExternalLink } from "lucide-react";

// ---------------------------------------------------------------------------
// DATA — Chinese high-end carbon parts, direct-to-consumer market
// Prices in AUD, converted/rounded from brand sites & reviews (road.cc, 
// BikeRadar, Bicycling Australia, Trustpilot, manufacturer storefronts).
// Lead times & warranty terms reflect typical DTC brand policies.
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { id: "frame", label: "Frameset", unit: "frame + fork + seatpost" },
  { id: "groupset", label: "Electronic groupset", unit: "shifters + derailleurs + brakes" },
  { id: "wheels", label: "Wheelset", unit: "front + rear" },
  { id: "crankset", label: "Crankset & power meter", unit: "crank arms + spider + chainrings" },
  { id: "cockpit", label: "Cockpit", unit: "bar + stem (integrated)" },
  { id: "finishing", label: "Finishing kit", unit: "saddle + tape + bottle cages" },
];

const PARTS = {
  frame: [
    {
      id: "yoeleo-r12",
      name: "Yoeleo R12 Disc",
      supplier: "Yoeleo",
      origin: "Shenzhen, CN",
      spec: "T800 carbon, disc, Di2/AXS-ready, UCI approved",
      weight: 1020,
      price: 1470,
      salePrice: 1136,
      warrantyMonths: 72,
      leadTimeDays: [10, 21],
      shipping: "AU warehouse via Yoeleo Australia / Lichtbike — local support",
      notes: "Bicycling Australia tested this frame favourably; warranty handled locally in AU.",
      risk: "low",
      visual: { frameColor: "#c43d2e", frameAccent: "#1a1d24", style: "allround" },
      productUrl: "https://www.yoeleobike.com/products/disc-brake-road-bike-frame-r12",
      western: { name: "Trek Émonda SLR frameset", price: 6500, note: "~4.4× the price for a similar-weight disc race frame" },
      reviews: [
        { source: "Bicycling Australia", rating: 5, text: "Carbon layup is clean and the internal finish is smooth — power transfer is excellent and the bike rivals top-end builds tested at twice the cost." },
        { source: "Weight Weenies forum", rating: 4, text: "Bought two 47cm frames, both performed perfectly — paintjob came out slightly different from spec but quality and finish were immaculate." },
        { source: "Cyclists Hub review", rating: 3, text: "Mixed impressions after 15,000km — comfortable and good value, but attention to detail let it down: wrong bar tape colour, no axle covers, minor fit issues." },
      ],
    },
    {
      id: "xds-erone",
      name: "XDS ER One",
      supplier: "XDS (X-LAB)",
      origin: "Shenzhen, CN",
      spec: "Aero-oriented frameset, disc, claimed 6.8kg complete builds",
      weight: 980,
      price: 1610,
      salePrice: null,
      warrantyMonths: 60,
      leadTimeDays: [14, 28],
      shipping: "Ships ex-factory CN; some stock via AU distributors",
      notes: "Ridden by 2025 UCI Junior Road World Champion (Quick Pro sister brand).",
      risk: "low",
      visual: { frameColor: "#2e6fc4", frameAccent: "#0d1117", style: "aero" },
      productUrl: "https://www.pandapodium.cc/product/quick-pro-erone-aero-road-bike-frameset/",
      western: { name: "Specialized Tarmac SL8 frameset", price: 6800, note: "~4.2× the price for a comparable aero race frame" },
      reviews: [
        { source: "Singletracks", rating: 5, text: "Sister brand X-LAB has signed 60+ US dealers and ships from a regional warehouse — a real step away from the 'mystery box from China' anxiety." },
        { source: "road.cc commenter", rating: 4, text: "If a junior worlds win on this frame doesn't prove it can handle real racing loads, nothing will — though resale value is still an unknown." },
        { source: "BikeRadar reader", rating: 4, text: "XDS has 31 years as an OEM before going direct — that manufacturing pedigree shows in fit and finish, even if the brand name is unfamiliar." },
      ],
    },
    {
      id: "elitewheels-marvel-frame",
      name: "ICAN Aero R1 Disc",
      supplier: "ICAN",
      origin: "Xiamen, CN",
      spec: "T700/T800 blend, disc, internal routing",
      weight: 1100,
      price: 1290,
      salePrice: 990,
      warrantyMonths: 24,
      leadTimeDays: [15, 35],
      shipping: "DHL/EMS from CN warehouse — no AU stock",
      notes: "Long-running DTC brand, frequently cited on Weight Weenies/MTBR as reliable.",
      risk: "medium",
      visual: { frameColor: "#1f242e", frameAccent: "#6b7280", style: "allround" },
      productUrl: "https://icancycling.com/products/aero-disc-road-frame",
      western: { name: "Giant TCR Advanced frameset", price: 4200, note: "~4.2× the price; Giant frame includes dealer fitting and local stock" },
      reviews: [
        { source: "MTBR forum", rating: 4, text: "ICAN is one of the names people consistently say they'd trust over an unbranded Alibaba listing — long track record, real warranty paperwork." },
        { source: "Weight Weenies", rating: 4, text: "Run two ICAN-sourced frames for years with no structural issues; the resin finish on the inside of the BB shell was rougher than a name brand but it hasn't mattered." },
        { source: "Trustpilot (ICAN)", rating: 3, text: "Frame itself is solid but shipping took the full upper end of the quoted window, and customs paperwork to AU added a few extra days I wasn't expecting." },
      ],
    },
    {
      id: "farsports-tt",
      name: "Farsports FM-TT01",
      supplier: "Farsports",
      origin: "Xiamen, CN",
      spec: "Time-trial/triathlon frame, D-shaped post, storage box",
      weight: 1350,
      price: 1850,
      salePrice: null,
      warrantyMonths: 24,
      leadTimeDays: [20, 40],
      shipping: "Sea or air freight from CN — no local warehouse",
      notes: "Long-standing brand on Bicycles Network Australia forum threads since 2012.",
      risk: "medium",
      visual: { frameColor: "#e0a526", frameAccent: "#1a1d24", style: "tt" },
      productUrl: "https://e-smartway.com/products/seraph-complete-tt-bike-700c-time-trial-triathlon-t800-full-carbon-fiber-black-frame-using-trp-brakes-fm-tt01",
      western: { name: "Cervélo P-Series frameset", price: 7200, note: "~3.9× the price for a comparable TT/tri frame" },
      reviews: [
        { source: "Bicycles Network Australia", rating: 4, text: "A savvy mate bought two Farsports frames plus a wheelset and is happy with the lot — long enough track record on this forum that it doesn't feel like a gamble anymore." },
        { source: "Slowtwitch forum", rating: 3, text: "TT-specific Chinese frames are still rarer than road — most catalogues are old aero shapes, so don't expect this to match the very latest wind-tunnel work from Cervélo or Canyon." },
        { source: "Weight Weenies", rating: 4, text: "Ordered 50mm tubular wheels from the same family of suppliers and they arrived as described — communication was a little slow but everything matched the spec sheet." },
      ],
    },
  ],

  groupset: [
    {
      id: "wheeltop-eds-tx-hyd",
      name: "Wheeltop EDS-TX (hydraulic)",
      supplier: "Wheeltop",
      origin: "China (mfr since 1950s)",
      spec: "Wireless, 3–14 spd compatible, carbon shifters, hydraulic disc",
      weight: 1410,
      price: 1590,
      salePrice: null,
      warrantyMonths: 12,
      leadTimeDays: [7, 14],
      shipping: "EU/US/AU regional warehouses — fast dispatch reported",
      notes: "road.cc: rivals Shimano 105 Di2/SRAM Rival AXS; shifting 'a little' behind big brands.",
      risk: "low",
      visual: { accent: "#1a1a1a", crankColor: "#1a1a1a" },
      western: { name: "Shimano 105 Di2 groupset", price: 2400, note: "~1.5× the price; bigger dealer network for warranty work" },
      reviews: [
        { source: "road.cc review", rating: 4, text: "Isn't some obscure bargain rolling out the back of a factory — it's a usable, reliable option with a proper distribution network and warranty process." },
        { source: "Wheeltop.us buyer", rating: 5, text: "Postage time to Australia was quicker than expected and the app is brilliant for fine-tuning indexing — first ride out the gear changes were surprisingly crisp." },
        { source: "Wheeltop.com buyer", rating: 4, text: "Not as crisp as my Dura-Ace, but is it £1800 worse? Definitely not — the EDS-TX does the job perfectly well for the price." },
      ],
    },
    {
      id: "wheeltop-eds-tx-mech",
      name: "Wheeltop EDS-TX (mechanical brake)",
      supplier: "Wheeltop",
      origin: "China",
      spec: "Wireless shifting only, keep existing rim/mech brakes",
      weight: 1190,
      price: 1380,
      salePrice: null,
      warrantyMonths: 12,
      leadTimeDays: [7, 14],
      shipping: "Regional warehouses, ~1 week reported to AU",
      notes: "Cheaper upgrade path if reusing an existing mechanical brake bike.",
      risk: "low",
      visual: { accent: "#2c313c", crankColor: "#2c313c" },
      western: { name: "SRAM Apex AXS groupset", price: 2100, note: "~1.5× the price for a comparable wireless upgrade kit" },
      reviews: [
        { source: "Wheeltop.us buyer", rating: 4, text: "No more derailleur cables for internally routed frames — set up and installation was quite easy once I found the right limit screws." },
        { source: "BikeRadar buyers guide", rating: 4, text: "EDS TX is designed to compete with mid-range groupsets, and the carbon shifter construction gives it a more premium feel than the price suggests." },
        { source: "Forum buyer (EU)", rating: 3, text: "Three rides in and happy with the shifting, brakes work fine though a touch noisy — probably just needs a pad bed-in period." },
      ],
    },
    {
      id: "wheeltop-rotor-uno",
      name: "Rotor UNO (Wheeltop tech share)",
      supplier: "Rotor / Wheeltop",
      origin: "Spain / China JV",
      spec: "Wireless hydraulic, power-meter crank compatible",
      weight: 1480,
      price: 3450,
      salePrice: null,
      warrantyMonths: 24,
      leadTimeDays: [21, 35],
      shipping: "EU dispatch, longer transit to AU",
      notes: "Wheeltop holds a majority stake in Rotor and shares wireless tech — a step up tier.",
      risk: "low",
      visual: { accent: "#d9a23b", crankColor: "#1a1a1a" },
      western: { name: "SRAM Red AXS groupset", price: 6200, note: "~1.8× the price for flagship-tier wireless electronic" },
      reviews: [
        { source: "Power Meter City listing", rating: 4, text: "Rotor's INpower platform has a long track record on its own before the Wheeltop tie-up — established hydraulic groupset, not a brand-new unknown." },
        { source: "EU forum buyer", rating: 4, text: "Bought it for the integrated power meter crank option more than the shifting — having both in one purchase saved a separate power meter purchase." },
        { source: "Cycling Weekly comment", rating: 3, text: "Long transit time to anywhere outside the EU is the real downside; the hardware itself has been solid on the bikes I've seen it on." },
      ],
    },
    {
      id: "sensah-empire",
      name: "SENSAH Empire Wireless",
      supplier: "SENSAH",
      origin: "China",
      spec: "Wireless 2x12, hydraulic disc, budget-tier electronic",
      weight: 1620,
      price: 980,
      salePrice: null,
      warrantyMonths: 12,
      leadTimeDays: [10, 25],
      shipping: "Ships from CN, no AU-specific support network",
      notes: "Mentioned on forums as a cheaper electronic entry; less mature ecosystem than Wheeltop.",
      risk: "medium",
      visual: { accent: "#6b7280", crankColor: "#6b7280" },
      western: { name: "Shimano Ultegra Di2 groupset", price: 3600, note: "~3.7× the price; far larger spares and service network" },
      reviews: [
        { source: "Weight Weenies thread", rating: 3, text: "Works as described for the price, but the companion app and setup documentation are noticeably less polished than Wheeltop's." },
        { source: "MTBR forum", rating: 3, text: "Cheapest way into electronic shifting I've found, but I wouldn't expect Shimano-level refinement — it gets the job done on a budget build." },
        { source: "Reddit r/cycling", rating: 2, text: "Had a derailleur replaced under warranty without too much hassle, but the wait for the replacement part to ship from China took a few weeks." },
      ],
    },
  ],

  wheels: [
    {
      id: "elitewheels-drive-40d",
      name: "Elitewheels Drive 40D Disc",
      supplier: "Elitewheels",
      origin: "China (est. 2015)",
      spec: "40mm T800/T1000 carbon, bladed spokes, ceramic bearings",
      weight: 1260,
      price: 1189,
      salePrice: null,
      warrantyMonths: 36,
      leadTimeDays: [10, 20],
      shipping: "No customs/VAT fees — included in price; UK/EU/AU service centres expanding",
      notes: "road.cc: undercuts mainstream brands 'by a huge sum' at this depth/weight.",
      risk: "low",
      visual: { depth: 40, rimColor: "#1a1d24", decal: "#cccccc" },
      western: { name: "Zipp 303 Firecrest", price: 3200, note: "~2.7× the price for a comparable depth/weight disc wheelset" },
      reviews: [
        { source: "Trustpilot (Elitewheels)", rating: 5, text: "After a few years on alloy wheels, switching to the Drive line made a huge difference — I went from being dropped on group rides to dropping others." },
        { source: "MTBR forum (road crossover)", rating: 4, text: "Hub feels like a DT Swiss-pattern clone but has held up fine over normal road use — just be aware spares may not be as universally available as genuine DT." },
        { source: "road.cc tech review", rating: 4, text: "Undercuts mainstream brands by a huge sum at this depth and weight; the ceramic bearings and bladed spokes aren't typical at this price point." },
      ],
    },
    {
      id: "yoeleo-sat-c50",
      name: "Yoeleo SAT C50 DB Pro NxT SL2",
      supplier: "Yoeleo",
      origin: "China",
      spec: "50mm T800 carbon, 36t ratchet hub, tubeless-ready",
      weight: 1290,
      price: 999,
      salePrice: null,
      warrantyMonths: 36,
      leadTimeDays: [10, 21],
      shipping: "Yoeleo Australia warehouse",
      notes: "Tested by Bicycling Australia paired with the R12 frame — positive result.",
      risk: "low",
      visual: { depth: 50, rimColor: "#101216", decal: "#e0a526" },
      western: { name: "Enve SES 4.5", price: 4100, note: "~4.1× the price for a similar depth carbon disc wheelset" },
      reviews: [
        { source: "Bicycling Australia", rating: 5, text: "Paired with the R12 frame, these wheels rolled, stabilised, and climbed well — looked and performed like a much pricier build." },
        { source: "Trustpilot (Yoeleo)", rating: 5, text: "Considered SuperTeam, Farsports, Elitewheels and ICAN before landing on these — light, fast, stiff, and they maintain speed impressively on group rides." },
        { source: "Trustpilot (Yoeleo)", rating: 2, text: "Ordered in November expecting 3–15 day delivery, didn't hear anything for four weeks until I emailed support directly." },
      ],
    },
    {
      id: "elitewheels-marvel-38d",
      name: "Elitewheels Marvel 38D",
      supplier: "Elitewheels",
      origin: "China",
      spec: "38mm carbon, Pillar spokes, all-rounder for 25–28mm tyres",
      weight: 1604,
      price: 599,
      salePrice: null,
      warrantyMonths: 36,
      leadTimeDays: [10, 20],
      shipping: "Included shipping, no customs fees claimed",
      notes: "Entry point into the Elitewheels range — heavier but value-focused.",
      risk: "low",
      visual: { depth: 38, rimColor: "#1a1d24", decal: "#5fb89c" },
      western: { name: "Fulcrum Racing Zero Carbon", price: 2400, note: "~4× the price for an entry carbon disc wheelset" },
      reviews: [
        { source: "Cyclists Hub (EDGE/Marvel range test)", rating: 3, text: "Good for beginners or those transitioning from alloy to carbon on a budget — not the stiffest in the lineup but a clear step up from aluminium." },
        { source: "MTBR forum", rating: 3, text: "Spoke tension consistency on my front wheel was outside the ideal range out of the box, though it hasn't caused any real-world issues yet." },
        { source: "Trustpilot (Elitewheels)", rating: 4, text: "Communication was excellent throughout and the wheels arrived well-packaged; happy with the value at this price tier." },
      ],
    },
    {
      id: "icanwheels-aero-50",
      name: "ICAN AERO 50",
      supplier: "ICAN",
      origin: "China",
      spec: "50mm clincher/tubeless, straight-pull hubs",
      weight: 1480,
      price: 750,
      salePrice: null,
      warrantyMonths: 24,
      leadTimeDays: [15, 35],
      shipping: "DHL from CN warehouse",
      notes: "Frequently cited alongside Light Bicycle as a trusted long-running DTC wheel brand.",
      risk: "low",
      visual: { depth: 50, rimColor: "#101216", decal: "#ff5b2e" },
      western: { name: "Mavic Cosmic Pro Carbon SL", price: 2900, note: "~3.9× the price for a similar-depth aero wheelset" },
      reviews: [
        { source: "ICAN Cycling site reviews", rating: 4, text: "Lifespan on a normally-ridden carbon wheelset can run 5–10 years, and that's tracked with how these have held up after a couple of seasons of club riding." },
        { source: "Weight Weenies thread", rating: 4, text: "ICAN gets recommended alongside Light Bicycle as one of the 'safe' long-running brands — less flashy marketing, just consistent quality control." },
        { source: "Cyclists Hub buyer survey", rating: 3, text: "Straight-pull hub spares aren't sold at every local bike shop, so factor in ordering replacement parts directly from ICAN if anything needs servicing." },
      ],
    },
  ],

  crankset: [
    {
      id: "elilee-x310-ek01",
      name: "Elilee X310 + EK01 power meter",
      supplier: "Elilee",
      origin: "China",
      spec: "24/29mm titanium spindle carbon crank, dual-sided spider PM, 50/34T",
      weight: 554,
      price: 890,
      salePrice: null,
      warrantyMonths: 24,
      leadTimeDays: [14, 28],
      shipping: "Ships from CN, EN14781 fatigue-tested",
      notes: "Used by Team Bahrain Victorious; ~150g lighter than Dura-Ace R9200 at this build weight.",
      risk: "low",
      visual: { crankColor: "#1a1d24" },
      western: { name: "Shimano Dura-Ace R9200 + power meter", price: 2200, note: "~2.5× the price for a similar weight/stiffness combo" },
      reviews: [
        { source: "Cyclists Hub crank roundup", rating: 5, text: "At 82–83 N/mm this is among the stiffest carbon cranks tested — for most riders under 1,000W peak power that stiffness becomes imperceptible, but it's there if you need it." },
        { source: "Forum buyer (EU)", rating: 4, text: "Good company to be in — pro team usage gives some confidence this isn't just a spec-sheet number, it's been raced." },
        { source: "Reddit r/weightweenies", rating: 4, text: "Power meter accuracy has tracked closely with a known-good pedal-based meter I ran alongside it for a few rides — within the expected margin." },
      ],
    },
    {
      id: "cybrei-gp3",
      name: "Cybrei GP-3 carbon crank + Sigeyi power meter",
      supplier: "Cybrei / Sigeyi",
      origin: "China",
      spec: "DUB spindle, carbon-look chainring wrap (not full carbon rings), dual-sided",
      weight: 490,
      price: 760,
      salePrice: null,
      warrantyMonths: 24,
      leadTimeDays: [14, 30],
      shipping: "Ships from CN; Xcadey spider add-on compatible",
      notes: "Publishes 1800N fatigue / 5600N damage test figures — more documentation than most at this price.",
      risk: "low",
      visual: { crankColor: "#2c313c" },
      western: { name: "SRAM Red AXS power meter crank", price: 2350, note: "~3.1× the price for a comparable dual-sided power meter crank" },
      reviews: [
        { source: "Cyclists Hub crank roundup", rating: 4, text: "Lighter and less expensive than Dura-Ace R9200 once you add the carbon spider and chainrings — the only catch is the chainrings are a carbon-look wrap, not structural carbon." },
        { source: "Forum buyer", rating: 4, text: "Appreciate that they publish actual fatigue and damage test figures — more transparency than most brands offer at this price level." },
        { source: "EU forum thread", rating: 3, text: "Ships as a complete system which is convenient, but double-check BCD and spindle compatibility before ordering — return shipping from China isn't cheap if you get it wrong." },
      ],
    },
    {
      id: "xcadey-xpower-s-gen2",
      name: "XCADEY VENTUS + XPOWER-S GEN2",
      supplier: "XCADEY",
      origin: "China",
      spec: "110 BCD carbon crank, 5-bolt dual power meter, ±1% accuracy, IP67",
      weight: 380,
      price: 680,
      salePrice: null,
      warrantyMonths: 24,
      leadTimeDays: [10, 21],
      shipping: "Ships from CN warehouse",
      notes: "Reviewers report shifting as crisp as stock Shimano and consistent power data on long climbs.",
      risk: "low",
      visual: { crankColor: "#0f1115" },
      western: { name: "Quarq DZero power meter crank", price: 1450, note: "~2.1× the price for a similar dual-sided spec" },
      reviews: [
        { source: "XCADEY product reviews", rating: 5, text: "This carbon power meter crankset exceeded my expectations — shifting with the included chainrings is as crisp as my stock Shimano setup, and dual-sided power data is very stable." },
        { source: "Forum buyer", rating: 4, text: "Swapped to this for more chainring options on 110 BCD; pairing with my Garmin was instant and accuracy has stayed consistent on long climbs." },
        { source: "Reddit r/cycling", rating: 4, text: "IP67 rating has held up through a wet winter of training rides with zero water ingress issues so far." },
      ],
    },
    {
      id: "lexon-r2s",
      name: "Lexon R2S carbon crank (no PM)",
      supplier: "Lexon",
      origin: "China",
      spec: "Titanium spindle, RYET aero spider/chainring compatible, 165mm",
      weight: 325,
      price: 420,
      salePrice: null,
      warrantyMonths: 24,
      leadTimeDays: [14, 28],
      shipping: "Ships from CN",
      notes: "No integrated power meter — pair with a separate pedal-based meter if needed.",
      risk: "medium",
      visual: { crankColor: "#9aa1ad" },
      western: { name: "Campagnolo Super Record crank (no PM)", price: 1100, note: "~2.6× the price for a comparable non-power-meter carbon crank" },
      reviews: [
        { source: "Cyclists Hub crank roundup", rating: 4, text: "12% stiffer than the previous Lexon generation, from a redesigned titanium spindle — the brand also publishes the same fatigue test standard the rest of this category uses." },
        { source: "Forum buyer", rating: 3, text: "Note that Lexon's chainrings need their own specific bolts due to the thicker material — easy to miss if you're assuming standard hardware." },
        { source: "EU forum thread", rating: 3, text: "Good crank for the price if you already have a pedal-based power meter and just want a lighter arm — don't expect plug-and-play with standard bolts." },
      ],
    },
  ],

  cockpit: [
    {
      id: "yoeleo-h9",
      name: "Yoeleo H9 integrated cockpit",
      supplier: "Yoeleo",
      origin: "China",
      spec: "One-piece carbon bar/stem, internal routing",
      weight: 320,
      price: 410,
      salePrice: 340,
      warrantyMonths: 24,
      leadTimeDays: [10, 21],
      shipping: "Yoeleo Australia",
      notes: "Trustpilot reviewer: fit/stack advice provided by support before purchase.",
      risk: "low",
      visual: { barColor: "#1a1d24" },
      western: { name: "Vision Metron 5D integrated bar/stem", price: 950, note: "~2.8× the price for a comparable one-piece carbon cockpit" },
      reviews: [
        { source: "Trustpilot (Yoeleo)", rating: 5, text: "Great communication and service to make sure it was the right fit and stack height before I committed to the order — that pre-sale advice made the difference." },
        { source: "Forum buyer (AU)", rating: 4, text: "Internal routing made cable management far less of a headache than expected once paired with the R12 frame's cable entry points." },
        { source: "Bicycling Australia (build test)", rating: 4, text: "Felt stiff and direct in the hands, yet comfortable enough that it didn't feel like a pure race-only setup." },
      ],
    },
    {
      id: "canwin-zephyr",
      name: "Canwin Zephyr SSL bar/stem",
      supplier: "Canwin (XDS group)",
      origin: "China",
      spec: "Aero one-piece, claimed sub-300g",
      weight: 295,
      price: 460,
      salePrice: null,
      warrantyMonths: 24,
      leadTimeDays: [14, 28],
      shipping: "Via XDS/X-LAB distribution",
      notes: "Spec'd on the bike that won the 2025 UCI Junior Road World title.",
      risk: "low",
      visual: { barColor: "#0d1117" },
      western: { name: "Zipp SL-70 Aero integrated bar", price: 1100, note: "~2.4× the price for a comparable aero one-piece cockpit" },
      reviews: [
        { source: "Singletracks / road.cc coverage", rating: 5, text: "This is the exact cockpit fitted to the bike that won the 2025 UCI Men's Junior Road World Championships — about as real-world a stress test as a component gets." },
        { source: "Forum buyer", rating: 4, text: "Claimed sub-300g weight checked out on my own scale within a few grams — refreshingly accurate compared to some other listed specs I've seen." },
        { source: "EU forum thread", rating: 4, text: "Distribution through the XDS/X-LAB network meant a more straightforward warranty conversation than dealing with a standalone factory direct." },
      ],
    },
    {
      id: "farsports-aero-bar",
      name: "Farsports Aero Integrated Bar",
      supplier: "Farsports",
      origin: "China",
      spec: "Full carbon, internal cable routing, 31.8mm clamp",
      weight: 340,
      price: 280,
      salePrice: null,
      warrantyMonths: 12,
      leadTimeDays: [20, 35],
      shipping: "Direct from CN, no local stock",
      notes: "Budget integrated option; longer lead time than warehouse-stocked brands.",
      risk: "medium",
      visual: { barColor: "#2c313c" },
      western: { name: "3T Superergo Team bar/stem", price: 650, note: "~2.3× the price for a similar integrated carbon cockpit" },
      reviews: [
        { source: "Bicycles Network Australia", rating: 4, text: "Ordered alongside a Farsports frame and the cockpit matched the spec sheet fine — just budget for the longer wait since there's no local warehouse." },
        { source: "Forum buyer", rating: 3, text: "Internal routing works as advertised, but the included hardware felt a notch below what you'd get from Yoeleo or Canwin at a similar price." },
        { source: "Weight Weenies", rating: 3, text: "Solid budget option if you're patient — communication on order status was a bit slow but everything arrived as ordered eventually." },
      ],
    },
  ],

  finishing: [
    {
      id: "yoeleo-saddle-kit",
      name: "Yoeleo finishing kit",
      supplier: "Yoeleo",
      origin: "China",
      spec: "Carbon-railed saddle + bar tape + 2x carbon bottle cages",
      weight: 280,
      price: 220,
      salePrice: null,
      warrantyMonths: 24,
      leadTimeDays: [10, 21],
      shipping: "Yoeleo Australia",
      notes: "Bundled accessory set, commonly added to frame orders.",
      risk: "low",
      visual: { saddleColor: "#1a1a1a" },
      western: { name: "Fizik Argo + carbon cages bundle", price: 480, note: "~2.2× the price for a comparable saddle/cage/tape bundle" },
      reviews: [
        { source: "Trustpilot (Yoeleo)", rating: 4, text: "Bundled it in with my frame order and it arrived together — convenient to get the whole finishing kit in one shipment rather than sourcing each piece separately." },
        { source: "Forum buyer (AU)", rating: 3, text: "Saddle rails are carbon as advertised, but the padding is firmer than I expected — fine for shorter rides, less so for anything past 3 hours for me personally." },
        { source: "Bicycling Australia (build test)", rating: 4, text: "Cages held bottles securely over rough chip-seal roads with no rattling, which isn't always guaranteed at this price point." },
      ],
    },
    {
      id: "elitewheels-finishing",
      name: "Elitewheels finishing kit",
      supplier: "Elitewheels",
      origin: "China",
      spec: "Carbon saddle + cages, no bar tape included",
      weight: 260,
      price: 165,
      salePrice: null,
      warrantyMonths: 12,
      leadTimeDays: [10, 20],
      shipping: "Included with wheel orders for reduced freight",
      notes: "Cheapest finishing bundle in this set; pairs well with Elitewheels orders.",
      risk: "low",
      visual: { saddleColor: "#2c313c" },
      western: { name: "Specialized Power saddle + Tacx cages", price: 380, note: "~2.3× the price for a comparable saddle/cage set" },
      reviews: [
        { source: "Trustpilot (Elitewheels)", rating: 4, text: "Bundling this with the wheel order saved on freight, which made the whole purchase noticeably better value than buying each item separately." },
        { source: "MTBR forum", rating: 3, text: "Cages are light but flex a little more than I'd like over really rough terrain — fine for road use, less ideal for gravel or cobbles." },
        { source: "Forum buyer", rating: 3, text: "Decent budget saddle to start with, but I ended up swapping it after a few months for a model with a cutout — comfort is fairly personal here." },
      ],
    },
  ],
};

const RISK_STYLES = {
  low: { label: "Established / low risk", color: "#5fb89c" },
  medium: { label: "Newer / verify reviews", color: "#d9a23b" },
};

// Equivalent stock builds from established Western/Taiwanese brands, AUD,
// sourced from BikeExchange AU / RA Cycles listings for comparable spec tiers.
const STOCK_COMPARISONS = [
  {
    tier: "Entry carbon, mechanical 105 / electronic-ready",
    bike: "Cervélo P 105 Race",
    price: 5300,
    weight: 9.4,
    warrantyMonths: 60,
    leadTimeDays: [7, 30],
    note: "Off-the-floor or short order, full local dealer warranty & fit service.",
  },
  {
    tier: "Mid carbon, wireless electronic (Ultegra Di2 / Force AXS)",
    bike: "Cervélo P Rival AXS / P5 Ultegra Di2",
    price: 8350,
    weight: 9.0,
    warrantyMonths: 60,
    leadTimeDays: [14, 45],
    note: "Built and shipped as one unit; one warranty claim covers the whole bike.",
  },
  {
    tier: "Flagship, Dura-Ace Di2 / Red AXS",
    bike: "Cervélo P5 Dura-Ace Di2 / Red AXS",
    price: 13500,
    weight: 8.4,
    warrantyMonths: 60,
    leadTimeDays: [21, 60],
    note: "No Chinese DTC flagship-tier complete bike directly matches this spec yet.",
  },
];

function fmtAUD(n) {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
}

function leadTimeLabel(range) {
  return `${range[0]}–${range[1]} days`;
}

export default function BikeBuilder() {
  const [selected, setSelected] = useState({});
  const [openCat, setOpenCat] = useState("frame");
  const [view, setView] = useState("build"); // "build" | "compare"
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReviews = (partId) => {
    setExpandedReviews((prev) => ({ ...prev, [partId]: !prev[partId] }));
  };

  const selectPart = (catId, part) => {
    setSelected((prev) => ({ ...prev, [catId]: part }));
  };

  const removePart = (catId) => {
    setSelected((prev) => {
      const next = { ...prev };
      delete next[catId];
      return next;
    });
  };

  const totals = useMemo(() => {
    const parts = Object.values(selected);
    const price = parts.reduce((sum, p) => sum + (p.salePrice ?? p.price), 0);
    const westernPrice = parts.reduce((sum, p) => sum + (p.western?.price ?? p.salePrice ?? p.price), 0);
    const weight = parts.reduce((sum, p) => sum + p.weight, 0);
    const maxLead = parts.reduce((max, p) => Math.max(max, p.leadTimeDays[1]), 0);
    const minWarranty = parts.length
      ? Math.min(...parts.map((p) => p.warrantyMonths))
      : 0;
    return { price, westernPrice, weight, maxLead, minWarranty, count: parts.length };
  }, [selected]);

  const completeness = Math.round((totals.count / CATEGORIES.length) * 100);

  return (
    <div style={styles.page}>
      <style>{globalCss}</style>

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.kicker}>BUILD SHEET — DIRECT-TO-CONSUMER CARBON</div>
          <h1 style={styles.h1}>Race Bike Configurator</h1>
          <p style={styles.subhead}>
            Build a race-spec carbon bike from Chinese direct-to-consumer brands.
            Every part below ships, warranties, and prices differently — that's the
            whole game. Pick one item per category to see the real build sheet.
          </p>

          <div style={styles.tabRow}>
            <button
              style={view === "build" ? styles.tabActive : styles.tab}
              onClick={() => setView("build")}
            >
              Build
            </button>
            <button
              style={view === "compare" ? styles.tabActive : styles.tab}
              onClick={() => setView("compare")}
            >
              <Scale size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
              Compare vs. stock bikes
            </button>
          </div>
        </div>
      </header>

      {view === "compare" ? (
        <ComparisonView totals={totals} hasSelection={totals.count > 0} onBack={() => setView("build")} />
      ) : (
      <div style={styles.layout} className="builder-layout">
        {/* ---------------- PARTS LIST ---------------- */}
        <main style={styles.main}>
          {CATEGORIES.map((cat) => {
            const isOpen = openCat === cat.id;
            const chosen = selected[cat.id];
            return (
              <section key={cat.id} style={styles.catSection}>
                <button
                  style={styles.catHeader}
                  onClick={() => setOpenCat(isOpen ? null : cat.id)}
                  aria-expanded={isOpen}
                >
                  <div style={styles.catHeaderLeft}>
                    {isOpen ? (
                      <ChevronDown size={18} strokeWidth={2.25} />
                    ) : (
                      <ChevronRight size={18} strokeWidth={2.25} />
                    )}
                    <div>
                      <div style={styles.catLabel}>{cat.label}</div>
                      <div style={styles.catUnit}>{cat.unit}</div>
                    </div>
                  </div>
                  <div style={styles.catHeaderRight}>
                    {chosen ? (
                      <span style={styles.chosenBadge}>
                        <Check size={14} strokeWidth={2.5} />
                        {chosen.name}
                      </span>
                    ) : (
                      <span style={styles.unchosenBadge}>not selected</span>
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div style={styles.partsGrid}>
                    {PARTS[cat.id].map((part) => {
                      const isSelected = chosen?.id === part.id;
                      const risk = RISK_STYLES[part.risk];
                      const reviewsOpen = !!expandedReviews[part.id];
                      const avgRating = part.reviews
                        ? (part.reviews.reduce((s, r) => s + r.rating, 0) / part.reviews.length)
                        : null;
                      return (
                        <div
                          key={part.id}
                          style={{
                            ...styles.partCard,
                            ...(isSelected ? styles.partCardSelected : {}),
                          }}
                        >
                          <div style={styles.partCardTop}>
                            <div>
                              <div style={styles.partName}>{part.name}</div>
                              <div style={styles.partSupplier}>
                                {part.supplier} · {part.origin}
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              {part.salePrice ? (
                                <>
                                  <div style={styles.partPriceStrike}>
                                    {fmtAUD(part.price)}
                                  </div>
                                  <div style={styles.partPrice}>
                                    {fmtAUD(part.salePrice)}
                                  </div>
                                </>
                              ) : (
                                <div style={styles.partPrice}>{fmtAUD(part.price)}</div>
                              )}
                            </div>
                          </div>

                          <div style={styles.partSpec}>{part.spec}</div>

                          <div style={styles.partMetaRow}>
                            <span style={styles.metaItem}>
                              <Package size={13} /> {part.weight}g
                            </span>
                            <span style={styles.metaItem}>
                              <ShieldCheck size={13} /> {part.warrantyMonths} mo
                            </span>
                            <span style={styles.metaItem}>
                              <Clock size={13} /> {leadTimeLabel(part.leadTimeDays)}
                            </span>
                          </div>

                          <div style={styles.shippingLine}>
                            <Truck size={13} style={{ flexShrink: 0, marginTop: 2 }} />
                            <span>{part.shipping}</span>
                          </div>

                          <div style={styles.notesLine}>{part.notes}</div>

                          {part.western && (
                            <div style={styles.westernStrip}>
                              <Scale size={13} style={{ flexShrink: 0, marginTop: 1, color: colors.textFaint }} />
                              <div style={styles.westernText}>
                                <span style={styles.westernLabel}>Western equivalent:</span>{" "}
                                {part.western.name} — <span style={styles.westernPrice}>{fmtAUD(part.western.price)}</span>
                                <div style={styles.westernNote}>{part.western.note}</div>
                              </div>
                            </div>
                          )}

                          {part.productUrl && (
                            <a
                              href={part.productUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={styles.cardPhotoLink}
                            >
                              <ExternalLink size={12} />
                              See real photos
                            </a>
                          )}

                          {part.reviews && (
                            <div style={styles.reviewsBlock}>
                              <button
                                style={styles.reviewsToggle}
                                onClick={() => toggleReviews(part.id)}
                                aria-expanded={reviewsOpen}
                              >
                                <span style={styles.reviewsToggleLeft}>
                                  <MessageSquare size={13} />
                                  {part.reviews.length} reviews
                                  <span style={styles.starRow}>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                      <Star
                                        key={n}
                                        size={11}
                                        fill={n <= Math.round(avgRating) ? colors.accent : "none"}
                                        color={n <= Math.round(avgRating) ? colors.accent : colors.textFaint}
                                      />
                                    ))}
                                  </span>
                                  <span style={styles.avgRatingNum}>{avgRating.toFixed(1)}</span>
                                </span>
                                {reviewsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                              </button>

                              {reviewsOpen && (
                                <div style={styles.reviewsList}>
                                  {part.reviews.map((review, i) => (
                                    <div key={i} style={styles.reviewItem}>
                                      <div style={styles.reviewHeader}>
                                        <span style={styles.reviewSource}>{review.source}</span>
                                        <span style={styles.reviewStars}>
                                          {[1, 2, 3, 4, 5].map((n) => (
                                            <Star
                                              key={n}
                                              size={11}
                                              fill={n <= review.rating ? colors.accent : "none"}
                                              color={n <= review.rating ? colors.accent : colors.textFaint}
                                            />
                                          ))}
                                        </span>
                                      </div>
                                      <div style={styles.reviewText}>{review.text}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          <div style={styles.partCardBottom}>
                            <span style={{ ...styles.riskTag, color: risk.color, borderColor: risk.color }}>
                              {part.risk === "medium" && <AlertTriangle size={12} />}
                              {risk.label}
                            </span>
                            <button
                              style={isSelected ? styles.selectBtnActive : styles.selectBtn}
                              onClick={() =>
                                isSelected ? removePart(cat.id) : selectPart(cat.id, part)
                              }
                            >
                              {isSelected ? "Selected" : "Select"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </main>

        {/* ---------------- BUILD TICKET ---------------- */}
        <aside style={styles.ticket}>
          <div style={styles.ticketSticky}>
            <div style={styles.ticketHeader}>
              <span style={styles.ticketKicker}>BUILD TICKET</span>
              <span style={styles.ticketProgress}>{totals.count}/{CATEGORIES.length} parts</span>
            </div>

            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${completeness}%` }} />
            </div>

            <div style={styles.ticketLines}>
              {CATEGORIES.map((cat) => {
                const part = selected[cat.id];
                const partPrice = part ? (part.salePrice ?? part.price) : 0;
                const westernPrice = part?.western?.price ?? null;
                const lineDiff = westernPrice !== null ? westernPrice - partPrice : null;
                return (
                  <div key={cat.id} style={styles.ticketLine}>
                    <div style={styles.ticketLineRow}>
                      <div style={styles.ticketLineLabel}>
                        <div style={styles.ticketLineCat}>{cat.label}</div>
                        {part ? (
                          <div style={styles.ticketLinePart}>{part.name}</div>
                        ) : (
                          <div style={styles.ticketLineEmpty}>—</div>
                        )}
                      </div>
                      <div style={styles.ticketLineRight}>
                        {part ? (
                          <>
                            <span style={styles.ticketLinePrice}>
                              {fmtAUD(partPrice)}
                            </span>
                            <button
                              style={styles.ticketRemove}
                              onClick={() => removePart(cat.id)}
                              aria-label={`Remove ${part.name}`}
                            >
                              <X size={13} />
                            </button>
                          </>
                        ) : (
                          <span style={styles.ticketLinePriceEmpty}>$0</span>
                        )}
                      </div>
                    </div>

                    {part?.western && (
                      <div style={styles.ticketWesternRow}>
                        <div style={styles.ticketWesternLabel}>
                          <Scale size={10} style={{ flexShrink: 0 }} />
                          <span style={styles.ticketWesternName}>{part.western.name}</span>
                        </div>
                        <div style={styles.ticketWesternRight}>
                          <span style={styles.ticketWesternPrice}>{fmtAUD(westernPrice)}</span>
                          <span style={lineDiff >= 0 ? styles.ticketWesternSaving : styles.ticketWesternPremium}>
                            {lineDiff >= 0 ? "−" : "+"}{fmtAUD(Math.abs(lineDiff))}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={styles.ticketDivider} />

            {totals.count > 0 && (
              <div style={styles.savingsBanner}>
                <div style={styles.savingsRow}>
                  <span style={styles.savingsLabel}>Your build</span>
                  <span style={styles.savingsValue}>{fmtAUD(totals.price)}</span>
                </div>
                <div style={styles.savingsRow}>
                  <span style={styles.savingsLabel}>Western equivalent</span>
                  <span style={styles.savingsValueDim}>{fmtAUD(totals.westernPrice)}</span>
                </div>
                <div style={styles.savingsDivider} />
                <div style={styles.savingsRow}>
                  <span style={styles.savingsTotalLabel}>
                    {totals.westernPrice >= totals.price ? "Total savings" : "Total premium"}
                  </span>
                  <span
                    style={
                      totals.westernPrice >= totals.price
                        ? styles.savingsTotalValueGood
                        : styles.savingsTotalValueBad
                    }
                  >
                    {totals.westernPrice >= totals.price ? "−" : "+"}
                    {fmtAUD(Math.abs(totals.westernPrice - totals.price))}
                  </span>
                </div>
              </div>
            )}

            <div style={styles.totalsGrid}>
              <div style={styles.totalBlock}>
                <div style={styles.totalLabel}>Total price</div>
                <div style={styles.totalValueBig}>{fmtAUD(totals.price)}</div>
              </div>
              <div style={styles.totalBlock}>
                <div style={styles.totalLabel}>Build weight</div>
                <div style={styles.totalValue}>
                  {totals.count ? `${(totals.weight / 1000).toFixed(2)} kg` : "—"}
                </div>
              </div>
              <div style={styles.totalBlock}>
                <div style={styles.totalLabel}>Longest lead time</div>
                <div style={styles.totalValue}>
                  {totals.count ? `${totals.maxLead} days` : "—"}
                </div>
              </div>
              <div style={styles.totalBlock}>
                <div style={styles.totalLabel}>Shortest warranty</div>
                <div style={styles.totalValue}>
                  {totals.count ? `${totals.minWarranty} mo` : "—"}
                </div>
              </div>
            </div>

            <p style={styles.ticketFootnote}>
              Build ships in parts from separate suppliers — the "longest lead time" is
              your real-world wait, not the average. Warranty shown is your weakest link:
              the part with the shortest cover sets your risk floor.
            </p>
          </div>
        </aside>
      </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPARISON VIEW
// ---------------------------------------------------------------------------

function ComparisonView({ totals, hasSelection }) {
  return (
    <div style={styles.compareWrap}>
      {!hasSelection && (
        <div style={styles.compareEmptyNotice}>
          No parts selected yet — showing stock bikes only. Switch back to
          <strong> Build</strong> and select parts to see your build plotted against these.
        </div>
      )}

      <div style={styles.compareGrid} className="compare-grid">
        {/* Your build column */}
        <div style={{ ...styles.compareCard, ...styles.compareCardYours }}>
          <div style={styles.compareCardKicker}>YOUR BUILD</div>
          <div style={styles.compareCardBike}>Chinese DTC parts build</div>
          <div style={styles.comparePriceBig}>
            {hasSelection ? fmtAUD(totals.price) : "—"}
          </div>
          <div style={styles.compareRow}>
            <span style={styles.compareRowLabel}>Weight</span>
            <span style={styles.compareRowValue}>
              {hasSelection ? `${(totals.weight / 1000).toFixed(2)} kg` : "—"}
            </span>
          </div>
          <div style={styles.compareRow}>
            <span style={styles.compareRowLabel}>Weakest warranty</span>
            <span style={styles.compareRowValue}>
              {hasSelection ? `${totals.minWarranty} mo` : "—"}
            </span>
          </div>
          <div style={styles.compareRow}>
            <span style={styles.compareRowLabel}>Longest lead time</span>
            <span style={styles.compareRowValue}>
              {hasSelection ? `${totals.maxLead} days` : "—"}
            </span>
          </div>
          <div style={styles.compareRow}>
            <span style={styles.compareRowLabel}>Warranty claims</span>
            <span style={styles.compareRowValue}>Per supplier — separately</span>
          </div>
          <div style={styles.compareNote}>
            You're assembling and fitting this yourself, or paying a local
            mechanic for a build fee not included above.
          </div>
        </div>

        {/* Stock bike columns */}
        {STOCK_COMPARISONS.map((stock) => {
          const diff = hasSelection ? stock.price - totals.price : null;
          return (
            <div key={stock.bike} style={styles.compareCard}>
              <div style={styles.compareCardKicker}>{stock.tier}</div>
              <div style={styles.compareCardBike}>{stock.bike}</div>
              <div style={styles.comparePriceBig}>{fmtAUD(stock.price)}</div>
              <div style={styles.compareRow}>
                <span style={styles.compareRowLabel}>Weight</span>
                <span style={styles.compareRowValue}>{stock.weight} kg</span>
              </div>
              <div style={styles.compareRow}>
                <span style={styles.compareRowLabel}>Warranty</span>
                <span style={styles.compareRowValue}>{stock.warrantyMonths} mo</span>
              </div>
              <div style={styles.compareRow}>
                <span style={styles.compareRowLabel}>Lead time</span>
                <span style={styles.compareRowValue}>{leadTimeLabel(stock.leadTimeDays)}</span>
              </div>
              <div style={styles.compareRow}>
                <span style={styles.compareRowLabel}>Warranty claims</span>
                <span style={styles.compareRowValue}>Single dealer, whole bike</span>
              </div>
              <div style={styles.compareNote}>{stock.note}</div>
              {diff !== null && (
                <div style={diff > 0 ? styles.diffSaving : styles.diffPremium}>
                  <ArrowRight size={13} />
                  {diff > 0
                    ? `Your build saves ${fmtAUD(diff)}`
                    : `Stock bike is ${fmtAUD(Math.abs(diff))} cheaper`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={styles.compareFootnoteBox}>
        <strong>Reading this fairly:</strong> the stock bike price covers one
        warranty, one fit, and zero assembly risk. The DTC build price assumes
        no shipping damage, no import surprises, and that you (or your local
        shop) can fit and tune electronic groupset components from a brand
        your shop may not stock parts for. Cheaper isn't free — it's a
        different set of costs, paid in time and risk instead of dollars.
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// STYLES
// ---------------------------------------------------------------------------

const colors = {
  bg: "#13151a",
  bgPanel: "#1a1d24",
  bgCard: "#1f232b",
  bgCardHover: "#252a33",
  border: "#2c313c",
  borderLight: "#363c48",
  text: "#e8eaee",
  textDim: "#9aa1ad",
  textFaint: "#6b7280",
  accent: "#ff5b2e",
  accentDim: "#cc4a25",
  mono: "'JetBrains Mono', 'IBM Plex Mono', monospace",
  display: "'Space Grotesk', sans-serif",
};

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
  * { box-sizing: border-box; }
  button { font-family: inherit; cursor: pointer; }
  ::selection { background: ${colors.accent}; color: white; }

  .compare-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  @media (max-width: 980px) {
    .compare-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .compare-grid { grid-template-columns: 1fr; }
  }

  .builder-layout { display: grid; grid-template-columns: 1fr 360px; gap: 24px; }
  @media (max-width: 880px) {
    .builder-layout { grid-template-columns: 1fr; }
  }
`;

const styles = {
  page: {
    minHeight: "100vh",
    background: colors.bg,
    color: colors.text,
    fontFamily: colors.display,
  },
  header: {
    borderBottom: `1px solid ${colors.border}`,
    background: `linear-gradient(180deg, ${colors.bgPanel} 0%, ${colors.bg} 100%)`,
  },
  headerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "40px 24px 32px",
  },
  kicker: {
    fontFamily: colors.mono,
    fontSize: 11,
    letterSpacing: "0.12em",
    color: colors.accent,
    marginBottom: 10,
    fontWeight: 600,
  },
  h1: {
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subhead: {
    color: colors.textDim,
    fontSize: 15,
    lineHeight: 1.6,
    maxWidth: 640,
    marginTop: 12,
  },
  layout: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gap: 24,
    padding: "32px 24px 80px",
    alignItems: "start",
  },
  main: { display: "flex", flexDirection: "column", gap: 14, minWidth: 0 },

  catSection: {
    background: colors.bgPanel,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    overflow: "hidden",
  },
  catHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 18px",
    background: "transparent",
    border: "none",
    color: colors.text,
    textAlign: "left",
  },
  catHeaderLeft: { display: "flex", alignItems: "center", gap: 10 },
  catLabel: { fontSize: 16, fontWeight: 600 },
  catUnit: { fontSize: 12.5, color: colors.textFaint, fontFamily: colors.mono, marginTop: 2 },
  catHeaderRight: { display: "flex", alignItems: "center" },
  chosenBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12.5,
    fontFamily: colors.mono,
    color: "#5fb89c",
    background: "rgba(95,184,156,0.1)",
    border: "1px solid rgba(95,184,156,0.35)",
    borderRadius: 6,
    padding: "5px 10px",
    maxWidth: 220,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  unchosenBadge: {
    fontSize: 12.5,
    fontFamily: colors.mono,
    color: colors.textFaint,
    border: `1px dashed ${colors.borderLight}`,
    borderRadius: 6,
    padding: "5px 10px",
  },

  partsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 12,
    padding: "0 18px 18px",
  },
  partCard: {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    transition: "border-color 0.15s ease",
  },
  partCardSelected: {
    borderColor: colors.accent,
    boxShadow: `0 0 0 1px ${colors.accent}`,
  },
  partCardTop: { display: "flex", justifyContent: "space-between", gap: 10 },
  partName: { fontSize: 14.5, fontWeight: 600, lineHeight: 1.3 },
  partSupplier: { fontSize: 11.5, color: colors.textFaint, marginTop: 3, fontFamily: colors.mono },
  partPrice: { fontSize: 16, fontWeight: 700, fontFamily: colors.mono, whiteSpace: "nowrap" },
  partPriceStrike: {
    fontSize: 11.5,
    color: colors.textFaint,
    textDecoration: "line-through",
    fontFamily: colors.mono,
  },
  partSpec: { fontSize: 12.5, color: colors.textDim, lineHeight: 1.5 },
  partMetaRow: { display: "flex", gap: 12, flexWrap: "wrap" },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    fontFamily: colors.mono,
    color: colors.text,
  },
  shippingLine: {
    display: "flex",
    gap: 6,
    fontSize: 11.5,
    color: colors.textDim,
    lineHeight: 1.4,
    borderTop: `1px solid ${colors.border}`,
    paddingTop: 8,
  },
  notesLine: {
    fontSize: 11.5,
    color: colors.textFaint,
    lineHeight: 1.45,
    fontStyle: "italic",
  },

  // ---- western equivalent strip ----
  westernStrip: {
    display: "flex",
    gap: 7,
    fontSize: 12,
    color: colors.textDim,
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: "8px 10px",
    lineHeight: 1.4,
  },
  westernText: { minWidth: 0 },
  westernLabel: { color: colors.textFaint, fontFamily: colors.mono, fontSize: 10.5 },
  westernPrice: { fontFamily: colors.mono, fontWeight: 700, color: colors.text },
  westernNote: { fontSize: 11, color: colors.textFaint, marginTop: 2 },
  cardPhotoLink: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 11.5,
    fontFamily: colors.mono,
    color: colors.accent,
    textDecoration: "none",
    alignSelf: "flex-start",
  },

  // ---- reviews ----
  reviewsBlock: {
    borderTop: `1px solid ${colors.border}`,
    paddingTop: 8,
  },
  reviewsToggle: {
    width: "100%",
    background: "transparent",
    border: "none",
    color: colors.textDim,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 0,
    fontSize: 12,
  },
  reviewsToggleLeft: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: colors.mono,
  },
  starRow: { display: "flex", gap: 1, marginLeft: 4 },
  avgRatingNum: { fontFamily: colors.mono, color: colors.textFaint, fontSize: 11 },
  reviewsList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 10,
  },
  reviewItem: {
    background: "rgba(255,255,255,0.025)",
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: "8px 10px",
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewSource: {
    fontSize: 11,
    fontFamily: colors.mono,
    color: colors.textFaint,
  },
  reviewStars: { display: "flex", gap: 1 },
  reviewText: {
    fontSize: 12,
    color: colors.textDim,
    lineHeight: 1.5,
  },

  partCardBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    gap: 8,
  },
  riskTag: {
    fontSize: 10.5,
    fontFamily: colors.mono,
    border: "1px solid",
    borderRadius: 5,
    padding: "3px 7px",
    display: "flex",
    alignItems: "center",
    gap: 4,
    whiteSpace: "nowrap",
  },
  selectBtn: {
    background: "transparent",
    border: `1px solid ${colors.borderLight}`,
    color: colors.text,
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 12.5,
    fontWeight: 600,
  },
  selectBtnActive: {
    background: colors.accent,
    border: `1px solid ${colors.accent}`,
    color: "#fff",
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 12.5,
    fontWeight: 600,
  },

  ticket: { position: "relative" },

  ticketSticky: {
    position: "sticky",
    top: 24,
    background: colors.bgPanel,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    padding: 18,
  },
  ticketHeader: { display: "flex", justifyContent: "space-between", alignItems: "baseline" },
  ticketKicker: {
    fontFamily: colors.mono,
    fontSize: 11,
    letterSpacing: "0.1em",
    color: colors.accent,
    fontWeight: 600,
  },
  ticketProgress: { fontFamily: colors.mono, fontSize: 11.5, color: colors.textFaint },
  progressTrack: {
    height: 4,
    background: colors.border,
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: colors.accent,
    transition: "width 0.3s ease",
  },
  ticketLines: { display: "flex", flexDirection: "column", gap: 12 },
  ticketLine: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  ticketLineRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  ticketLineLabel: { minWidth: 0 },
  ticketLineCat: { fontSize: 11, color: colors.textFaint, fontFamily: colors.mono },
  ticketLinePart: { fontSize: 13, color: colors.text, marginTop: 1, lineHeight: 1.3 },
  ticketLineEmpty: { fontSize: 13, color: colors.textFaint, marginTop: 1 },
  ticketLineRight: { display: "flex", alignItems: "center", gap: 6, flexShrink: 0 },
  ticketLinePrice: { fontSize: 13, fontFamily: colors.mono, fontWeight: 600 },
  ticketLinePriceEmpty: { fontSize: 13, fontFamily: colors.mono, color: colors.textFaint },
  ticketRemove: {
    background: "transparent",
    border: "none",
    color: colors.textFaint,
    padding: 2,
    display: "flex",
    borderRadius: 4,
  },

  // ---- per-line western comparison ----
  ticketWesternRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    paddingLeft: 4,
    borderLeft: `2px solid ${colors.border}`,
    marginLeft: 2,
  },
  ticketWesternLabel: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    minWidth: 0,
    fontSize: 10.5,
    color: colors.textFaint,
    fontFamily: colors.mono,
  },
  ticketWesternName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  ticketWesternRight: { display: "flex", alignItems: "center", gap: 6, flexShrink: 0 },
  ticketWesternPrice: { fontSize: 10.5, fontFamily: colors.mono, color: colors.textFaint },
  ticketWesternSaving: { fontSize: 10.5, fontFamily: colors.mono, fontWeight: 700, color: "#5fb89c" },
  ticketWesternPremium: { fontSize: 10.5, fontFamily: colors.mono, fontWeight: 700, color: "#d9a23b" },

  ticketDivider: { height: 1, background: colors.border, margin: "16px 0" },

  // ---- overall savings banner ----
  savingsBanner: {
    background: "rgba(95,184,156,0.06)",
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    padding: "12px 14px",
    marginBottom: 16,
  },
  savingsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px 0",
  },
  savingsLabel: { fontSize: 12, color: colors.textDim, fontFamily: colors.mono },
  savingsValue: { fontSize: 13, color: colors.text, fontFamily: colors.mono, fontWeight: 600 },
  savingsValueDim: { fontSize: 13, color: colors.textFaint, fontFamily: colors.mono },
  savingsDivider: { height: 1, background: colors.border, margin: "6px 0" },
  savingsTotalLabel: { fontSize: 13, color: colors.text, fontFamily: colors.mono, fontWeight: 600 },
  savingsTotalValueGood: { fontSize: 18, color: "#5fb89c", fontFamily: colors.mono, fontWeight: 700 },
  savingsTotalValueBad: { fontSize: 18, color: "#d9a23b", fontFamily: colors.mono, fontWeight: 700 },

  totalsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  totalBlock: {},
  totalLabel: { fontSize: 10.5, color: colors.textFaint, fontFamily: colors.mono, letterSpacing: "0.04em" },
  totalValueBig: { fontSize: 26, fontWeight: 700, fontFamily: colors.mono, color: colors.accent, marginTop: 2 },
  totalValue: { fontSize: 17, fontWeight: 600, fontFamily: colors.mono, marginTop: 2 },
  ticketFootnote: {
    fontSize: 11.5,
    color: colors.textFaint,
    lineHeight: 1.5,
    marginTop: 16,
    paddingTop: 14,
    borderTop: `1px solid ${colors.border}`,
  },

  // ---- tabs ----
  tabRow: { display: "flex", gap: 8, marginTop: 22 },
  tab: {
    background: "transparent",
    border: `1px solid ${colors.borderLight}`,
    color: colors.textDim,
    borderRadius: 7,
    padding: "9px 16px",
    fontSize: 13.5,
    fontWeight: 600,
    fontFamily: colors.display,
    display: "flex",
    alignItems: "center",
  },
  tabActive: {
    background: colors.accent,
    border: `1px solid ${colors.accent}`,
    color: "#fff",
    borderRadius: 7,
    padding: "9px 16px",
    fontSize: 13.5,
    fontWeight: 600,
    fontFamily: colors.display,
    display: "flex",
    alignItems: "center",
  },

  // ---- comparison view ----
  compareWrap: { maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" },
  compareEmptyNotice: {
    background: "rgba(217,162,59,0.1)",
    border: "1px solid rgba(217,162,59,0.35)",
    color: "#e0b65f",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 13.5,
    marginBottom: 24,
    lineHeight: 1.5,
  },
  compareGrid: {
    display: "grid",
    gap: 14,
  },
  compareCard: {
    background: colors.bgPanel,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 0,
  },
  compareCardYours: {
    borderColor: colors.accent,
    boxShadow: `0 0 0 1px ${colors.accent}`,
    background: colors.bgCard,
  },
  compareCardKicker: {
    fontSize: 10.5,
    fontFamily: colors.mono,
    color: colors.textFaint,
    letterSpacing: "0.04em",
    lineHeight: 1.4,
    minHeight: 28,
  },
  compareCardBike: { fontSize: 15, fontWeight: 700, lineHeight: 1.3 },
  comparePriceBig: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: colors.mono,
    color: colors.accent,
    margin: "4px 0 6px",
  },
  compareRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    borderTop: `1px solid ${colors.border}`,
    paddingTop: 7,
  },
  compareRowLabel: { color: colors.textFaint, fontFamily: colors.mono },
  compareRowValue: { color: colors.text, fontFamily: colors.mono, fontWeight: 600, textAlign: "right" },
  compareNote: {
    fontSize: 11.5,
    color: colors.textDim,
    lineHeight: 1.5,
    marginTop: 6,
    fontStyle: "italic",
  },
  diffSaving: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    fontFamily: colors.mono,
    fontWeight: 700,
    color: "#5fb89c",
    marginTop: 6,
  },
  diffPremium: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    fontFamily: colors.mono,
    fontWeight: 700,
    color: "#d9a23b",
    marginTop: 6,
  },
  compareFootnoteBox: {
    marginTop: 24,
    background: colors.bgPanel,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    padding: 18,
    fontSize: 13,
    color: colors.textDim,
    lineHeight: 1.6,
  },
};
