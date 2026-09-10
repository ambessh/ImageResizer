// src/config/presets.js

export const PRESETS = [
  // 1. JEE Main / NEET (NTA)
  {
    id: "jee-neet",
    title: "JEE Main / NEET (NTA)",
    category: "Entrance",
    slug: "jee-neet-document-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 200,
        minKB: 10,
        dimensionsLabel: "3.5 x 4.5 cm (80% Face, White BG)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 400,
        height: 150,
        maxKB: 30,
        minKB: 4,
        dimensionsLabel: "3.5 x 1.5 cm (Black Ink)",
      },
      {
        id: "thumb",
        label: "Fingers & Thumb Impression",
        width: 400,
        height: 300,
        maxKB: 200,
        minKB: 10,
        dimensionsLabel: "Horizontal (10 KB - 200 KB)",
      },
    ],
  },

  // 2. SSC (CGL / CHSL / MTS / GD)
  {
    id: "ssc-exams",
    title: "SSC (CGL / CHSL / GD / MTS)",
    category: "Staff Selection",
    slug: "ssc-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 200,
        height: 230,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "3.5 x 4.5 cm (20 - 50 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 140,
        height: 60,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "4.0 x 2.0 cm (10 - 20 KB)",
      },
    ],
  },

  // 3. UPSC (Civil Services IAS / CDS / NDA)
  {
    id: "upsc-cse",
    title: "UPSC (IAS / NDA / CDS)",
    category: "Central Govt",
    slug: "upsc-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 400,
        height: 400,
        maxKB: 200,
        minKB: 20,
        dimensionsLabel: "Square (Min 350x350, 20-200 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 400,
        height: 400,
        maxKB: 100,
        minKB: 20,
        dimensionsLabel: "Clear Signature on White Paper (20-100 KB)",
      },
    ],
  },

  // 4. Banking (IBPS PO, Clerk & SBI)
  {
    id: "ibps-sbi-bank",
    title: "Banking (IBPS PO/Clerk & SBI)",
    category: "Banking",
    slug: "ibps-sbi-bank-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 200,
        height: 230,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "200 x 230 px (Light Background)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 140,
        height: 60,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "140 x 60 px (Running Letters)",
      },
      {
        id: "thumb",
        label: "Left Thumb Impression",
        width: 240,
        height: 240,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "3.0 x 3.0 cm (240x240 px)",
      },
      {
        id: "hand-decl",
        label: "Handwritten Declaration",
        width: 800,
        height: 400,
        maxKB: 100,
        minKB: 50,
        dimensionsLabel: "White Paper Black Ink (50-100 KB)",
      },
    ],
  },

  // 5. Railway RRB (NTPC, Group D, ALP, JE)
  {
    id: "railway-rrb",
    title: "Railway RRB (NTPC / Group D / ALP)",
    category: "Railways",
    slug: "railway-rrb-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "3.5 x 4.5 cm (350x450 px, White BG)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 140,
        height: 60,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "140 x 60 px (Running Handwriting)",
      },
    ],
  },

  // 6. Global US & Schengen Visa
  {
    id: "us-schengen-visa",
    title: "US DS-160 & Schengen Visa",
    category: "Identity",
    slug: "us-schengen-visa-photo-resizer",
    subDocs: [
      {
        id: "us-visa",
        label: "US DS-160 Visa (2x2 inch)",
        width: 600,
        height: 600,
        maxKB: 240,
        minKB: 20,
        dimensionsLabel: "2x2 inch (600x600 px, Plain White BG)",
      },
      {
        id: "schengen-visa",
        label: "Schengen & European Visa",
        width: 413,
        height: 531,
        maxKB: 300,
        minKB: 30,
        dimensionsLabel: "35 x 45 mm (Close up head & neck)",
      },
    ],
  },

  // 7. UP Police (Constable / SI / Computer Operator)
  {
    id: "up-police",
    title: "UP Police Constable / SI (UPPRPB)",
    category: "State Police",
    slug: "up-police-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "35 x 45 mm (White/Grey BG)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 200,
        height: 80,
        maxKB: 20,
        minKB: 5,
        dimensionsLabel: "200 x 80 px (Black Ink Only)",
      },
    ],
  },

  // 8. GATE / IIT JAM
  {
    id: "gate-exam",
    title: "GATE / IIT JAM",
    category: "Entrance",
    slug: "gate-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 480,
        height: 640,
        maxKB: 200,
        minKB: 20,
        dimensionsLabel: "480 x 640 px (3.5 x 4.5 cm ratio)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 560,
        height: 160,
        maxKB: 150,
        minKB: 10,
        dimensionsLabel: "Aspect Ratio ~3.5:1 (Dark Ink)",
      },
    ],
  },

  // 9. PAN Card (NSDL & UTIITSL)
  {
    id: "pan-card",
    title: "PAN Card (NSDL & UTIITSL)",
    category: "Identity",
    slug: "pan-card-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo (213x213)",
        width: 213,
        height: 213,
        maxKB: 50,
        minKB: 10,
        dimensionsLabel: "213 x 213 px (300 DPI, Max 50KB)",
      },
      {
        id: "sign",
        label: "Signature (400x200)",
        width: 400,
        height: 200,
        maxKB: 50,
        minKB: 10,
        dimensionsLabel: "400 x 200 px (2:1 Ratio, Max 50KB)",
      },
    ],
  },

  // 10. Indian Passport / Visa Application
  {
    id: "passport-india",
    title: "Indian Passport (Sewa Portal)",
    category: "Identity",
    slug: "indian-passport-photo-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo (Square)",
        width: 600,
        height: 600,
        maxKB: 300,
        minKB: 20,
        dimensionsLabel: "5.1 x 5.1 cm (2x2 inch, White BG)",
      },
    ],
  },

  // 11. India Post GDS (Gramin Dak Sevak)
  {
    id: "india-post-gds",
    title: "India Post GDS Recruitment",
    category: "Central Govt",
    slug: "india-post-gds-photo-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 200,
        height: 230,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "200 x 230 px (20 - 50 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 140,
        height: 60,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "140 x 60 px (10 - 20 KB)",
      },
    ],
  },

  // 12. BPSC / Bihar Police / CSBC
  {
    id: "bihar-exams",
    title: "Bihar BPSC & CSBC Police",
    category: "State PSC",
    slug: "bihar-bpsc-police-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "3.5 x 4.5 cm (20 - 50 KB)",
      },
      {
        id: "sign-eng",
        label: "Signature (English)",
        width: 200,
        height: 100,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "Running English Script (10 - 20 KB)",
      },
      {
        id: "sign-hindi",
        label: "Signature (Hindi)",
        width: 200,
        height: 100,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "Hindi Devnagari Script (10 - 20 KB)",
      },
    ],
  },

  // 13. MPSC Maharashtra (State & Combined)
  {
    id: "mpsc-maharashtra",
    title: "MPSC (Maharashtra State Service)",
    category: "State PSC",
    slug: "mpsc-maharashtra-photo-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 275,
        height: 354,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "3.5 x 4.5 cm (275x354 px, 20-50 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 275,
        height: 118,
        maxKB: 50,
        minKB: 10,
        dimensionsLabel: "3.5 x 1.5 cm (275x118 px, 10-50 KB)",
      },
    ],
  },

  // 14. TNPSC (Tamil Nadu OTR & Group Exams)
  {
    id: "tnpsc-tamil-nadu",
    title: "TNPSC OTR (Tamil Nadu)",
    category: "State PSC",
    slug: "tnpsc-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "OTR Photograph",
        width: 275,
        height: 354,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "3.5 x 4.5 cm (20 - 50 KB, 200 DPI)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 275,
        height: 118,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "4.0 x 2.0 cm (10 - 20 KB, Black Ink)",
      },
    ],
  },

  // 15. CTET / State TET (Teaching Entrance)
  {
    id: "ctet-exam",
    title: "CTET & State TET (Teaching)",
    category: "Teaching",
    slug: "ctet-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 100,
        minKB: 10,
        dimensionsLabel: "3.5 x 4.5 cm (10 - 100 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 350,
        height: 150,
        maxKB: 30,
        minKB: 3,
        dimensionsLabel: "3.5 x 1.5 cm (3 - 30 KB)",
      },
    ],
  },

  // 16. Defence / Agniveer (Army, Air Force, Navy)
  {
    id: "agniveer-defence",
    title: "Agniveer & Defence (Army / IAF / Navy)",
    category: "Defence",
    slug: "agniveer-defence-photo-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 50,
        minKB: 10,
        dimensionsLabel: "3.5 x 4.5 cm (10 - 50 KB, Light BG)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 280,
        height: 120,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "Running Signature (10 - 20 KB)",
      },
      {
        id: "thumb",
        label: "Left Thumb Impression",
        width: 240,
        height: 240,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "Clear Thumb Impression (10 - 20 KB)",
      },
    ],
  },

  // 17. Driving Licence & Sarathi (Parivahan Portal)
  {
    id: "driving-licence-sarathi",
    title: "Driving Licence (Parivahan Sarathi)",
    category: "Identity",
    slug: "driving-licence-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "35 x 45 mm (Strict Max 20 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 280,
        height: 120,
        maxKB: 20,
        minKB: 10,
        dimensionsLabel: "Strict Max 20 KB (Black Ink)",
      },
    ],
  },

  // 18. Rajasthan Govt (RSMSSB / RPSC / SSO Portal)
  {
    id: "rajasthan-exams",
    title: "Rajasthan RSMSSB & RPSC (SSO)",
    category: "State PSC",
    slug: "rajasthan-rsmssb-rpsc-photo-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 200,
        height: 230,
        maxKB: 100,
        minKB: 50,
        dimensionsLabel: "200 x 230 px (50 - 100 KB, White BG)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 280,
        height: 120,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "280 x 120 px (20 - 50 KB)",
      },
    ],
  },

  // 19. CUET UG / PG (NTA Entrance)
  {
    id: "cuet-nta",
    title: "CUET UG / PG (NTA Portal)",
    category: "Entrance",
    slug: "cuet-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 200,
        minKB: 10,
        dimensionsLabel: "3.5 x 4.5 cm (80% Face Without Mask)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 400,
        height: 150,
        maxKB: 30,
        minKB: 4,
        dimensionsLabel: "3.5 x 1.5 cm (White Paper Black Ink)",
      },
    ],
  },

  // 20. UGC NET / CSIR NET (NTA)
  {
    id: "ugc-net",
    title: "UGC NET / CSIR NET (NTA)",
    category: "Entrance",
    slug: "ugc-net-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 200,
        minKB: 10,
        dimensionsLabel: "3.5 x 4.5 cm (10 - 200 KB, White BG)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 400,
        height: 150,
        maxKB: 30,
        minKB: 4,
        dimensionsLabel: "3.5 x 1.5 cm (4 - 30 KB, Black Ink)",
      },
    ],
  },

  // 21. MP Online / MP ESB (PEB Vyapam)
  {
    id: "mp-esb-vyapam",
    title: "MP ESB / Vyapam (MP Online)",
    category: "State PSC",
    slug: "mp-esb-vyapam-photo-resizer",
    subDocs: [
      {
        id: "template",
        label: "Profile Template (Photo + Sign + Dec)",
        width: 700,
        height: 900,
        maxKB: 220,
        minKB: 50,
        dimensionsLabel: "Standard MP Vyapam Profile Slip (50 - 220 KB)",
      },
      {
        id: "photo",
        label: "Individual Photo (With Name & Date)",
        width: 350,
        height: 450,
        maxKB: 100,
        minKB: 20,
        dimensionsLabel: "3.5 x 4.5 cm (Name & Date at Bottom)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 250,
        height: 120,
        maxKB: 50,
        minKB: 10,
        dimensionsLabel: "Clear Signature on White Box",
      },
    ],
  },

  // 22. Voter ID Card (NVSP / ECI Portal)
  {
    id: "voter-id-eci",
    title: "Voter ID Card (Election Commission)",
    category: "Identity",
    slug: "voter-id-photo-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 400,
        height: 500,
        maxKB: 200,
        minKB: 20,
        dimensionsLabel: "3.5 x 4.5 cm (Max 200 KB, White BG)",
      },
    ],
  },

  // 23. Ayushman Card / ABHA (PM-JAY)
  {
    id: "ayushman-card-abha",
    title: "Ayushman Card & ABHA (PM-JAY)",
    category: "Identity",
    slug: "ayushman-card-photo-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 300,
        height: 300,
        maxKB: 50,
        minKB: 10,
        dimensionsLabel: "Square (300 x 300 px, 10 - 50 KB)",
      },
    ],
  },

  // 24. UKSSSC & UKPSC (Uttarakhand Govt)
  {
    id: "uttarakhand-exams",
    title: "Uttarakhand UKSSSC & UKPSC",
    category: "State PSC",
    slug: "uksssc-ukpsc-photo-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 150,
        height: 200,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "150 x 200 px (20 - 50 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 150,
        height: 100,
        maxKB: 50,
        minKB: 10,
        dimensionsLabel: "150 x 100 px (10 - 50 KB)",
      },
      {
        id: "thumb",
        label: "Left Thumb Impression",
        width: 150,
        height: 100,
        maxKB: 50,
        minKB: 10,
        dimensionsLabel: "150 x 100 px (10 - 50 KB)",
      },
    ],
  },

  // 25. West Bengal WBPSC & WB Police
  {
    id: "wb-exams",
    title: "West Bengal WBPSC & WB Police",
    category: "State PSC",
    slug: "wbpsc-wb-police-photo-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 50,
        minKB: 10,
        dimensionsLabel: "3.5 x 4.5 cm (10 - 50 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 250,
        height: 100,
        maxKB: 20,
        minKB: 5,
        dimensionsLabel: "Running Signature (5 - 20 KB)",
      },
    ],
  },

  // 26. KVS & NVS Recruitment
  {
    id: "kvs-nvs-teaching",
    title: "KVS / NVS Teacher Recruitment",
    category: "Teaching",
    slug: "kvs-nvs-photo-signature-resizer",
    subDocs: [
      {
        id: "photo",
        label: "Passport Photo",
        width: 350,
        height: 450,
        maxKB: 80,
        minKB: 10,
        dimensionsLabel: "3.5 x 4.5 cm (10 - 80 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 350,
        height: 150,
        maxKB: 30,
        minKB: 4,
        dimensionsLabel: "3.5 x 1.5 cm (4 - 30 KB)",
      },
    ],
  },

  // 27. DSSSB (Delhi Subordinate Services)
  {
    id: "dsssb-delhi",
    title: "DSSSB (Delhi Govt Recruitment)",
    category: "Staff Selection",
    slug: "dsssb-delhi-photo-resizer",
    subDocs: [
      {
        id: "postcard",
        label: "Postcard Size Photo (5x7 inch)",
        width: 480,
        height: 672,
        maxKB: 300,
        minKB: 50,
        dimensionsLabel: "5 x 7 inch Postcard (50 - 300 KB)",
      },
      {
        id: "photo",
        label: "Passport Photo",
        width: 200,
        height: 230,
        maxKB: 50,
        minKB: 20,
        dimensionsLabel: "200 x 230 px (20 - 50 KB)",
      },
      {
        id: "sign",
        label: "Signature",
        width: 140,
        height: 110,
        maxKB: 40,
        minKB: 10,
        dimensionsLabel: "140 x 110 px (10 - 40 KB)",
      },
      {
        id: "thumb-left",
        label: "Left Thumb Impression",
        width: 110,
        height: 140,
        maxKB: 40,
        minKB: 10,
        dimensionsLabel: "110 x 140 px (10 - 40 KB)",
      },
      {
        id: "thumb-right",
        label: "Right Thumb Impression",
        width: 110,
        height: 140,
        maxKB: 40,
        minKB: 10,
        dimensionsLabel: "110 x 140 px (10 - 40 KB)",
      },
    ],
  },
];