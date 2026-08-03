import { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp, Search, MapPin, Sparkles, Stethoscope, AlertCircle, Phone, MessageSquare } from 'lucide-react';
import { API_BASE_URL } from '../config';
import type { Treatment, TreatmentsListProps } from '../types';

const TREATMENT_IMAGES: Record<string, string> = {
  'dust-allergy-test': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=80',
  'food-allergy-test': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80',
  'food-allergy-prick': 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=700&q=80',
  'asst-test': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80',
  'biopsy-derm': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=700&q=80',
  'dif-test': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=700&q=80',
  'cryo-therapy': 'https://ycdc.in/wp-content/uploads/2025/05/procedure-removing-mole-radio-wave-electrocoagula-2025-04-01-20-38-48-utc-scaled-700x500.jpg',
  'ils-therapy': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=80',
  'electrocautery': 'https://ycdc.in/wp-content/uploads/2025/05/procedure-removing-mole-radio-wave-electrocoagula-2025-04-01-20-38-48-utc-scaled-700x500.jpg',
  'patch-test': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=80',
  'cosmetic-patch-dye': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
  'phototherapy': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80',
  'comedone-extraction': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80',
  'xanthelasma-excision': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=700&q=80',
  'vitiligo-surgeries': 'https://images.unsplash.com/photo-1512290900676-26c2a48f4134?auto=format&fit=crop&w=700&q=80',
  'nail-avulsion': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80',
  'keloid-excision': 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=700&q=80',
  'revlite-laser': 'https://ycdc.in/wp-content/uploads/revslider/video-media/cosmetic-procedure-in-the-salon-of-the-beauty-clin-2024-01-29-16-02-24-utc_2-scaled-700x500.jpeg',
  'soprano-diode': 'https://ycdc.in/wp-content/uploads/2025/05/beautician-doing-depilation-with-laser-hair-remova-2024-10-18-16-29-37-utc-scaled-700x500.jpg',
  'resurfx-laser': 'https://ycdc.in/wp-content/uploads/2025/05/secret-rf-505x500.webp',
  'mnrf-laser': 'https://ycdc.in/wp-content/uploads/2025/05/secret-rf-505x500.webp',
  'secret-laser': 'https://ycdc.in/wp-content/uploads/2025/05/secret-rf-505x500.webp',
  'tribeam-laser': 'https://ycdc.in/wp-content/uploads/revslider/video-media/cosmetic-procedure-in-the-salon-of-the-beauty-clin-2024-01-29-16-02-24-utc_2-scaled-700x500.jpeg',
  'peels': 'https://ycdc.in/wp-content/uploads/2025/05/in-the-eternal-pursuit-of-perfection-composite-sh-2025-04-06-08-18-44-utc-scaled-700x500.jpg',
  'botox': 'https://ycdc.in/wp-content/uploads/2025/05/a-scene-of-medical-cosmetology-treatments-botulinu-2025-01-07-18-28-35-utc-scaled-700x500.jpg',
  'dermal-fillers': 'https://ycdc.in/wp-content/uploads/2025/05/a-scene-of-medical-cosmetology-treatments-botulinu-2025-01-07-18-28-35-utc-scaled-700x500.jpg',
  'hydrafacial': 'https://ycdc.in/wp-content/uploads/2025/05/beautician-using-professional-equipment-during-tre-2025-03-08-04-22-27-utc-scaled-700x500.jpg',
  'electrolysis': 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=700&q=80',
  'ear-piercing': 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=700&q=80',
  'nose-piercing': 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=700&q=80',
  'ear-lobe-repair': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=700&q=80',
  'mesotherapy': 'https://ycdc.in/wp-content/uploads/2025/05/treatment-of-hair-loss-injection-for-hair-growth-2025-04-29-00-57-22-utc-scaled-700x500.jpg',
  'stem-cell-therapy': 'https://ycdc.in/wp-content/uploads/2025/05/dermatologist-trichologist-performs-the-procedure-2025-01-08-12-52-28-utc-scaled-700x500.jpg',
  'gfc': 'https://ycdc.in/wp-content/uploads/2025/05/treatment-of-hair-loss-injection-for-hair-growth-2025-04-29-00-57-22-utc-scaled-700x500.jpg',
  'prp': 'https://ycdc.in/wp-content/uploads/2025/05/treatment-of-hair-loss-injection-for-hair-growth-2025-04-29-00-57-22-utc-scaled-700x500.jpg',
  'transplant': 'https://ycdc.in/wp-content/uploads/2025/05/hair-transplant.webp',
  'smp-hair': 'https://ycdc.in/wp-content/uploads/2025/05/dermatologist-trichologist-performs-the-procedure-2025-01-08-12-52-28-utc-scaled-700x500.jpg',
};

const MOCK_SERVICES: Treatment[] = [
  // --- DERMATIC PROCEDURES (Trivandrum) ---
  {
    id: 'dust-allergy-test',
    category: 'skin',
    category_name: 'Dermatic - Allergy Test',
    name: 'Dust Allergy Test (Normal & Advanced)',
    description: 'Comprehensive dermatological allergen diagnostic panel to identify environmental dust mite and inhalant hypersensitivities.',
    duration: '45 mins',
    price_range: '₹2,000 - ₹4,500',
    science: 'Measures specific IgE antibodies against specific house dust mite proteins and airborne allergens.',
    treats: 'Atopic dermatitis, eczema flare-ups, chronic urticaria, allergic rhinitis.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['dust-allergy-test']
  },
  {
    id: 'food-allergy-test',
    category: 'skin',
    category_name: 'Dermatic - Allergy Test',
    name: 'Food Allergy Test (Normal & Advanced)',
    description: 'Specialized blood & skin screening panel to detect food-induced dermatological reactions and systemic sensitivities.',
    duration: '45 mins',
    price_range: '₹2,500 - ₹5,500',
    science: 'Quantitative ELISA profiling of serum IgE antibodies against major dietary allergens.',
    treats: 'Food-induced hives, facial angioedema, recalcitrant eczema, digestive-skin flareups.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['food-allergy-test']
  },
  {
    id: 'food-allergy-prick',
    category: 'skin',
    category_name: 'Dermatic - Allergy Test',
    name: 'Food Allergy Test - Skin Prick',
    description: 'Rapid, gold-standard epicutaneous prick testing providing immediate 20-minute diagnostic results for acute food allergies.',
    duration: '30 mins',
    price_range: '₹1,800 - ₹3,200',
    science: 'Epidermal introduction of standardized allergen extracts triggering localized mast cell histamine release.',
    treats: 'Acute urticaria, immediate food sensitivity, oral allergy syndrome.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['food-allergy-prick']
  },
  {
    id: 'asst-test',
    category: 'skin',
    category_name: 'Dermatic - Diagnostic',
    name: 'ASST (Autologous Serum Skin Test)',
    description: 'In-clinic intradermal diagnostic test to confirm autoimmune chronic spontaneous urticaria.',
    duration: '40 mins',
    price_range: '₹1,500',
    science: 'Intradermal injection of patient autologous serum to evaluate functional circulating histamine-releasing autoantibodies.',
    treats: 'Chronic spontaneous urticaria, unexplained daily hives, autoimmune dermatoses.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['asst-test']
  },
  {
    id: 'biopsy-derm',
    category: 'skin',
    category_name: 'Dermatic - Histopathology',
    name: 'Biopsy (Hair, Skin, Nail & Mucosal)',
    description: 'Diagnostic punch or incisional tissue sampling under local anesthesia for definitive microscopic diagnosis.',
    duration: '30 mins',
    price_range: '₹2,000 - ₹4,000',
    science: 'Histopathological staining and cellular evaluation of tissue architecture by specialized dermatopathologists.',
    treats: 'Atypical skin lesions, scarring alopecia, blistering disorders, oral mucosal lesions.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['biopsy-derm']
  },
  {
    id: 'dif-test',
    category: 'skin',
    category_name: 'Dermatic - Immunopathology',
    name: 'DIF (Direct Immunofluorescence)',
    description: 'Specialized immunopathological tissue mapping for autoimmune blistering and connective tissue skin conditions.',
    duration: 'Consultation Required',
    price_range: '₹3,500 - ₹6,000',
    science: 'Fluorescein-conjugated antibody staining to visualize tissue-bound IgG, IgA, IgM, and complement deposits.',
    treats: 'Pemphigus vulgaris, bullous pemphigoid, lupus erythematosus, lichen planus.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['dif-test']
  },
  {
    id: 'cryo-therapy',
    category: 'skin',
    category_name: 'Dermatic - Dermato-Surgery',
    name: 'Cryo (Cryotherapy Treatment)',
    description: 'Controlled liquid nitrogen sub-zero freezing application to target and remove benign skin lesions.',
    duration: '20 mins',
    price_range: '₹1,200 - ₹2,500',
    science: 'Rapid thermal reduction (-196°C) causing intracellular ice crystallization and selective tissue necrosis.',
    treats: 'Viral warts, seborrheic keratosis, actinic keratosis, molluscum contagiosum.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['cryo-therapy']
  },
  {
    id: 'ils-therapy',
    category: 'skin',
    category_name: 'Dermatic - Injection Care',
    name: 'ILS (Intralesional Steroids)',
    description: 'Direct targeted micro-injections of anti-inflammatory agents into resistant skin lesions and hair loss patches.',
    duration: '20 mins',
    price_range: '₹1,000 - ₹2,200',
    science: 'Delivers anti-mitotic and anti-inflammatory triamcinolone acetonide directly into active dermal lesions.',
    treats: 'Alopecia areata, hypertrophic scars, keloids, nodular cystic acne.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['ils-therapy']
  },
  {
    id: 'electrocautery',
    category: 'skin',
    category_name: 'Dermatic & Aesthetic',
    name: 'Electrocautery (Warts, Moles & Skin Tags Removal)',
    description: 'Precision thermal radio-frequency removal of facial skin tags, benign moles, and verrucae under local numbing.',
    duration: '30-45 mins',
    price_range: '₹1,500 - ₹4,000',
    science: 'High-frequency electric current thermal coagulation ensuring bloodless tissue excision.',
    treats: 'Skin tags (acrochordons), facial moles, DPB, verruca vulgaris, seborrheic keratosis.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['electrocautery']
  },
  {
    id: 'patch-test',
    category: 'skin',
    category_name: 'Dermatic - Allergy Test',
    name: 'Patch Test (Standard Series)',
    description: 'Dermatological contact hypersensitivity testing to isolate chemical and environmental contact allergens.',
    duration: '48-72 hrs evaluation',
    price_range: '₹2,500 - ₹4,500',
    science: 'Dermal occlusion chambers applying standard series contactants to trigger type IV delayed T-cell hypersensitivity.',
    treats: 'Contact dermatitis, unexplained facial rashes, occupational hand eczema.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['patch-test']
  },
  {
    id: 'cosmetic-patch-dye',
    category: 'skin',
    category_name: 'Dermatic - Allergy Test',
    name: 'Cosmetic Patch + Dye Test',
    description: 'Targeted sensitivity assessment for hair dyes (PPD), cosmetics, preservatives, and fragrance chemicals.',
    duration: '48 hrs evaluation',
    price_range: '₹2,000 - ₹3,500',
    science: 'Patch occlusion of personalized cosmetic formulations and dye elements.',
    treats: 'Hair dye allergy (PPD sensitivity), cosmetic dermatitis, eyelid dermatitis.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['cosmetic-patch-dye']
  },
  {
    id: 'phototherapy',
    category: 'skin',
    category_name: 'Dermatic - Light Therapy',
    name: 'Phototherapy Treatment (Narrowband UVB)',
    description: 'Medical-grade therapeutic light chamber treatments for widespread inflammatory and depigmenting skin conditions.',
    duration: '15-30 mins',
    price_range: '₹800 - ₹1,500/session',
    science: 'Narrowband 311nm UVB light immunosuppression targeting epidermal T-lymphocyte activity and melanocyte stimulation.',
    treats: 'Widespread vitiligo, psoriasis, stubborn eczema, lichen planus.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['phototherapy']
  },
  {
    id: 'comedone-extraction',
    category: 'skin',
    category_name: 'Dermatic - Acne Care',
    name: 'Comedone Extraction',
    description: 'Clinical manual extraction of stubborn blackheads and whiteheads using sterile dermatological extractors after ozone steam.',
    duration: '30 mins',
    price_range: '₹1,200',
    science: 'Keratolytic softening followed by physical evacuation of clogged follicular infundibulum.',
    treats: 'Closed and open comedones, congested pores, early stage acne vulgaris.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['comedone-extraction']
  },
  {
    id: 'xanthelasma-excision',
    category: 'aesthetics',
    category_name: 'Aesthetic Surgery',
    name: 'Xanthelasma Excision',
    description: 'Precision surgical or radiofrequency excision of peri-orbital yellow lipid deposits on upper/lower eyelids.',
    duration: '45 mins',
    price_range: '₹3,500 - ₹7,000',
    science: 'Micro-surgical plane dissection removing sub-epidermal cholesterol plaques with minimal cosmetic scarring.',
    treats: 'Eyelid xanthelasma palpebrarum, periorbital yellow plaques.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['xanthelasma-excision']
  },
  {
    id: 'vitiligo-surgeries',
    category: 'aesthetics',
    category_name: 'Aesthetic Surgery',
    name: 'Vitiligo Surgeries (Pigment Grafting)',
    description: 'Advanced surgical autologous punch grafting or suction blister epidermal grafting for stable vitiligo patches.',
    duration: '1-3 hours',
    price_range: 'Price on Consultation',
    science: 'Transplantation of functional melanocyte donor grafts into stable depigmented recipient beds.',
    treats: 'Stable vitiligo, focal depigmentation, post-traumatic leukoderma.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['vitiligo-surgeries']
  },
  {
    id: 'nail-avulsion',
    category: 'skin',
    category_name: 'Dermatic - Minor Surgery',
    name: 'Nail Avulsion & Matrixectomy',
    description: 'Partial or total surgical removal of painful ingrown toenails under digital block anesthesia.',
    duration: '40 mins',
    price_range: '₹2,500 - ₹4,500',
    science: 'Digital anesthesia block, lateral nail spicule excision, and chemical phenol matrix ablation to prevent recurrence.',
    treats: 'Ingrown toenails (onychocryptosis), severe nail dystrophy, recalcitrant fungal nail infection.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['nail-avulsion']
  },
  {
    id: 'keloid-excision',
    category: 'aesthetics',
    category_name: 'Aesthetic Surgery',
    name: 'Keloid Excision & Scar Revision',
    description: 'Surgical excision of large resistant earlobe or body keloids combined with intralesional steroid protocol.',
    duration: '60 mins',
    price_range: '₹4,000 - ₹9,000',
    science: 'Complete scar capsule excision followed by layered tension-free closure and adjuvant anti-fibrotic injections.',
    treats: 'Earlobe keloids, post-trauma hypertrophic scarring, chest keloids.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'dermatic',
    image: TREATMENT_IMAGES['keloid-excision']
  },

  // --- COSMETIC PROCEDURES (Trivandrum) ---
  {
    id: 'revlite-laser',
    category: 'laser',
    category_name: 'Cosmetic Laser',
    name: 'Revlite Laser (Skin Lightening & Texture)',
    description: 'Advanced PhotoAcoustic Technology Q-switched laser for deep melanin breakdown, skin brightening, and pore refinement.',
    duration: '45 mins',
    price_range: '₹4,500 - ₹8,500',
    science: 'Nanosecond high-peak power acoustic shockwaves shattering sub-dermal pigment without thermal damage.',
    treats: 'Hyperpigmentation, melasma, sun spots, dull skin tone, open pores.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['revlite-laser']
  },
  {
    id: 'soprano-diode',
    category: 'laser',
    category_name: 'Cosmetic Laser',
    name: 'Soprano-Diode Laser (Thick Hair Reduction)',
    description: 'US-FDA approved virtually painless diode laser targeting coarse and dense unwanted facial or body hair.',
    duration: '30-90 mins',
    price_range: '₹3,500 - ₹9,500',
    science: 'In-Motion CW diode thermal absorption targeting follicular melanin bulbs to permanently delay re-growth.',
    treats: 'Thick facial hair, hirsutism, chest/back hair, arm/leg hair reduction.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['soprano-diode']
  },
  {
    id: 'resurfx-laser',
    category: 'laser',
    category_name: 'Cosmetic Laser',
    name: 'ResurFX Laser (Scars & Skin Tightening)',
    description: 'State-of-the-art 1565nm non-ablative laser for acne scar reduction, deep collagen remodeling, and non-surgical skin tightening.',
    duration: '60 mins',
    price_range: '₹7,500 - ₹12,000',
    science: 'Creates thousands of microscopic thermal columns stimulating neo-collagenesis with minimal epidermal downtime.',
    treats: 'Acne scar pits, surgical scars, fine wrinkles, enlarged pores, skin laxity.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['resurfx-laser']
  },
  {
    id: 'mnrf-laser',
    category: 'laser',
    category_name: 'Cosmetic Laser',
    name: 'Micro Needling Radio Frequency Laser (MNRF)',
    description: 'Gold-standard combination of insulated micro-needles and bipolar radiofrequency for severe acne scars and structural lift.',
    duration: '60 mins',
    price_range: '₹8,000 - ₹14,000',
    science: 'Direct dermal delivery of RF heat at exact microneedle depths to contract collagen fibers and flatten deep pits.',
    treats: 'Deep rolling & boxcar acne scars, sagging jawline, neck lines, stretch marks.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['mnrf-laser']
  },
  {
    id: 'secret-laser',
    category: 'laser',
    category_name: 'Cosmetic Laser',
    name: 'Secret Laser (Scars & Skin Tightening)',
    description: 'Fractional micro-needle RF system specifically designed for deep skin remodeling, scar smoothing, and pore contraction.',
    duration: '60 mins',
    price_range: '₹8,500 - ₹13,500',
    science: 'Adjustable micro-needle thermal coagulation zones to revitalize damaged dermal extracellular matrix.',
    treats: 'Acne scars, traumatic scars, facial laxity, uneven texture.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['secret-laser']
  },
  {
    id: 'tribeam-laser',
    category: 'laser',
    category_name: 'Cosmetic Laser',
    name: 'TriBeam Laser (Skin Lightening & Texture)',
    description: 'Dual-pulse Q-switched Nd:YAG laser for hyperpigmentation treatment, laser toning, and instant radiance.',
    duration: '45 mins',
    price_range: '₹4,500 - ₹8,000',
    science: 'Rich-PTP technology delivering double pulses to fragment dermal melanin gently while stimulating collagen.',
    treats: 'Post-acne dark marks, freckles, tanning, nevus of Ota, dull skin.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['tribeam-laser']
  },
  {
    id: 'peels',
    category: 'aesthetics',
    category_name: 'Cosmetic Skin Care',
    name: 'Medical Peels (Skin Resurfacing)',
    description: 'Custom dermatological chemical peels (Glycolic, Salicylic, Yellow Peel) tailored to clear pigmentation and restore skin luminosity.',
    duration: '30 mins',
    price_range: '₹2,200 - ₹4,500',
    science: 'Controlled chemical exfoliation accelerating epidermal turnover and un-clogging hyper-pigmented cells.',
    treats: 'Active acne, melasma, sun damage, dark spots, uneven complexion.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['peels']
  },
  {
    id: 'botox',
    category: 'aesthetics',
    category_name: 'Cosmetic Aesthetics',
    name: 'Botox Treatment',
    description: 'FDA-approved purified protein micro-injections to relax expression lines and restore youthful facial contours.',
    duration: '30 mins',
    price_range: 'Price on Consultation',
    science: 'Targeted nerve signal blockage inhibiting dynamic muscle contractions that cause deep skin creases.',
    treats: 'Forehead lines, crow’s feet, frown lines, masseter jaw slimming.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['botox']
  },
  {
    id: 'dermal-fillers',
    category: 'aesthetics',
    category_name: 'Cosmetic Aesthetics',
    name: 'Dermal Fillers',
    description: 'Hyaluronic acid soft-tissue fillers to add youthful volume, smooth deep laugh lines, and enhance cheek and lip structure.',
    duration: '45 mins',
    price_range: 'Price on Consultation',
    science: 'Cross-linked hyaluronic acid micro-gel binding water molecules to plump and lift dermal depressions.',
    treats: 'Under-eye hollows, smile lines (nasolabial folds), thin lips, sunken cheeks.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['dermal-fillers']
  },
  {
    id: 'hydrafacial',
    category: 'aesthetics',
    category_name: 'Cosmetic Aesthetics',
    name: 'Hydrafacial Medi-Facial',
    description: 'Patented multi-step facial to cleanse, vacuum pores, exfoliate dead cells, and infuse potent antioxidant serums.',
    duration: '60 mins',
    price_range: '₹5,000 - ₹7,500',
    science: 'Vortex-fusion spiral suction delivering salicylic acid, glycolic acid, and hyaluronic peptides.',
    treats: 'Clogged pores, dry dehydrated skin, oily skin, pre-event glowing skin.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['hydrafacial']
  },
  {
    id: 'electrolysis',
    category: 'hair',
    category_name: 'Cosmetic Hair Removal',
    name: 'Electrolysis Hair Removal',
    description: 'Precision probe electrolysis for permanent removal of white, grey, red, or laser-resistant fine hair.',
    duration: '30-60 mins',
    price_range: '₹1,500 - ₹3,000/session',
    science: 'Direct electrical micro-current thermal destruction of individual hair root germinative cells.',
    treats: 'Grey facial hair, white chin hair, paradoxical hypertrichosis, stubborn single hairs.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['electrolysis']
  },
  {
    id: 'ear-piercing',
    category: 'aesthetics',
    category_name: 'Cosmetic Aesthetics',
    name: 'Ear Piercing (Medical Grade)',
    description: 'Sterile, painless medical ear piercing performed by trained clinical staff under aseptic conditions.',
    duration: '20 mins',
    price_range: '₹1,000 - ₹1,800',
    science: 'Precision aseptic pressure piercing using medical-grade surgical titanium studs to prevent nickel allergies.',
    treats: 'Safe earlobe piercing, cartilage piercing, pediatric ear piercing.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['ear-piercing']
  },
  {
    id: 'nose-piercing',
    category: 'aesthetics',
    category_name: 'Cosmetic Aesthetics',
    name: 'Nose Piercing (Medical Grade)',
    description: 'Hygienic, gentle nostril piercing using sterile titanium hardware for fast, infection-free healing.',
    duration: '20 mins',
    price_range: '₹1,200 - ₹2,000',
    science: 'Sterile single-use medical cartridge insertion with anti-bacterial post-care protocol.',
    treats: 'Hygienic nostril piercing, alar piercing.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['nose-piercing']
  },
  {
    id: 'ear-lobe-repair',
    category: 'aesthetics',
    category_name: 'Cosmetic Aesthetics',
    name: 'Ear Lobe Repair',
    description: 'Surgical or non-surgical sutureless repair of stretched, elongated, or completely split earlobe holes.',
    duration: '40 mins',
    price_range: '₹2,500 - ₹5,000',
    science: 'Epithelial edge excision followed by micro-suturing or tissue adhesive bonding for seamless healing.',
    treats: 'Split earlobes, widened earring holes, torn lobules.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['ear-lobe-repair']
  },
  {
    id: 'mesotherapy',
    category: 'hair',
    category_name: 'Cosmetic Skin & Hair',
    name: 'Mesotherapy (Skin & Hair Micro-Infusion)',
    description: 'Micro-injections of potent vitamins, minerals, amino acids, and growth factors into the scalp or facial dermis.',
    duration: '45 mins',
    price_range: '₹3,000 - ₹5,500',
    science: 'Mesodermal micro-delivery of bio-revitalizing cocktails stimulating cellular metabolism.',
    treats: 'Early hair thinning, dull facial skin, loss of skin elasticity.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['mesotherapy']
  },
  {
    id: 'stem-cell-therapy',
    category: 'hair',
    category_name: 'Cosmetic Hair Care',
    name: 'Stem Cell Therapy for Hair',
    description: 'Advanced cellular therapy utilizing plant/peptide stem cell extracts to reactivate dormant hair follicles.',
    duration: '50 mins',
    price_range: '₹4,500 - ₹7,500',
    science: 'Infusion of concentrated signal factors that prolong the anagen (growth) phase of hair bulbs.',
    treats: 'Progressive thinning, hair shedding, weak fragile hair shafts.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['stem-cell-therapy']
  },
  {
    id: 'gfc',
    category: 'hair',
    category_name: 'Cosmetic Hair Care',
    name: 'GFC (Growth Factor Concentrate) Therapy',
    description: 'Next-generation acellular growth factor therapy derived from your blood for maximum follicular stimulation.',
    duration: '45 mins',
    price_range: '₹5,500 - ₹9,000',
    science: 'High-concentration platelet-derived growth factors (PDGF, VEGF, IGF-1) injected cleanly without RBC/WBC contaminants.',
    treats: 'Androgenetic alopecia, telogen effluvium, post-illness hair fall.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['gfc']
  },
  {
    id: 'prp',
    category: 'hair',
    category_name: 'Cosmetic Hair Care',
    name: 'PRP (Platelet-Rich Plasma) Therapy',
    description: 'Autologous concentrated plasma injections enriched with natural growth factors to reverse hair thinning.',
    duration: '60 mins',
    price_range: '₹4,500/session',
    science: 'Centrifuged autologous blood plasma delivering active growth factors to hair root stems.',
    treats: 'Hair thinning, hair fall, pattern baldness, receding hair.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['prp']
  },
  {
    id: 'transplant',
    category: 'hair',
    category_name: 'Cosmetic Hair Care',
    name: 'Hair Transplantation (FUE Grafting)',
    description: 'Permanent surgical hair restoration harvesting healthy individual hair grafts for dense, natural-looking hairline reconstruction.',
    duration: '4-8 hours',
    price_range: 'Consultation Required',
    science: 'Follicular Unit Extraction (FUE) ensuring zero linear scarring and lifetime permanent growth.',
    treats: 'Male pattern baldness, female hairline thinning, crown balding.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['transplant']
  },
  {
    id: 'smp-hair',
    category: 'hair',
    category_name: 'Cosmetic Hair Care',
    name: 'Scalp Micro Pigmentation (SMP)',
    description: 'Medical aesthetic hair tattooing technique creating the realistic appearance of full hair follicles on thinning scalps.',
    duration: '2-4 hours',
    price_range: 'Price on Consultation',
    science: 'Micro-pigment dermal implantation simulating natural short shaved hair follicles.',
    treats: 'Diffuse hair loss, visible scalp skin, post-transplant donor scars.',
    active: true,
    branch: 'trivandrum',
    procedure_type: 'cosmetic',
    image: TREATMENT_IMAGES['smp-hair']
  }
];

const FAQS = [
  {
    q: "What is the difference between Dermatic and Cosmetic procedures?",
    a: "Dermatic procedures focus on clinical diagnoses, allergy testing, immunofluorescence (DIF), biopsies, phototherapy, and minor surgical removals (warts, keloids, ingrown nails). Cosmetic procedures focus on laser resurfacing, skin brightening, anti-aging injectables (Botox/fillers), facial aesthetics, and advanced hair restoration (PRP, GFC, FUE)."
  },
  {
    q: "Which procedures are currently available at Trivandrum Branch?",
    a: "All 37 procedures listed above—including advanced Allergy Panels (Dust & Food), Micro-surgeries, Revlite/Soprano/ResurFX/Secret RF Lasers, Botox, Fillers, Hydrafacial, GFC, PRP, and Hair Transplants—are fully operational at our Pattom, Trivandrum center."
  },
  {
    q: "When will the Bangalore Branch procedure list be updated?",
    a: "The Bangalore (Whitefield) clinic procedure catalog is being compiled and will be published online very soon. However, consultations, clinical dermatological treatments, lasers, and hair care are already available at Whitefield. Please contact us via WhatsApp or Phone to book your Bangalore appointment."
  },
  {
    q: "Are allergy skin prick tests and patch tests safe?",
    a: "Yes, all diagnostic tests including Dust & Food allergy prick tests and European standard patch tests are performed by experienced clinical dermatologists with emergency anti-histamine backup on site."
  },
  {
    q: "How many sessions are recommended for PRP and GFC Hair Therapies?",
    a: "Usually a primary sequence of 4 to 6 sessions spaced 3-4 weeks apart yields optimal reduction in hair shedding and triggers visible follicular density growth."
  }
];

export default function TreatmentsList({ onBookTreatment: _onBookTreatment }: TreatmentsListProps) {
  const [treatments, setTreatments] = useState<Treatment[]>(MOCK_SERVICES);
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'trivandrum' | 'bangalore'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'dermatic' | 'cosmetic'>('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((t: any) => ({
            ...t,
            branch: t.branch || 'trivandrum',
            procedure_type: t.procedure_type || (t.category === 'skin' && t.name.toLowerCase().includes('test') ? 'dermatic' : 'cosmetic'),
            image: TREATMENT_IMAGES[t.id] || 'https://ycdc.in/wp-content/uploads/2025/07/beautiful-young-indian-woman-enjoying-face-lifting-2025-03-18-17-16-15-utc-scaled.jpg'
          }));
          setTreatments(mapped);
        }
      })
      .catch(err => {
        console.warn("Using high-fidelity local procedures dataset:", err);
      });
  }, []);

  // Filter & Search logic
  const filteredTreatments = treatments.filter((t) => {
    const matchesBranch = selectedBranch === 'all' || (t.branch === selectedBranch || t.branch === 'both');
    const matchesType = selectedType === 'all' || t.procedure_type === selectedType;
    const matchesCategory = activeFilter === 'all' || t.category === activeFilter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.treats.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesType && matchesCategory && matchesSearch;
  });

  const dermaticCount = treatments.filter(t => t.procedure_type === 'dermatic' && (selectedBranch === 'all' || t.branch === selectedBranch || t.branch === 'both')).length;
  const cosmeticCount = treatments.filter(t => t.procedure_type === 'cosmetic' && (selectedBranch === 'all' || t.branch === selectedBranch || t.branch === 'both')).length;

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => prev === index ? null : index);
  };

  const handleWhatsAppClick = (branchName: string) => {
    const phone = branchName === 'Bangalore' ? '919008985222' : '919447012345';
    const message = encodeURIComponent(`Hello YCDC ${branchName} Clinic, I would like to inquire about clinical procedures and appointments.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--silk-100)', paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="section-padding" style={{ 
        background: 'linear-gradient(135deg, rgba(30, 20, 40, 0.92), rgba(60, 20, 50, 0.85)), url("/skin_treatment_premium.png") no-repeat center center/cover', 
        color: 'white',
        textAlign: 'center',
        padding: '100px 0 80px'
      }}>
        <div className="container">
          <span className="badge badge-premium" style={{ marginBottom: '16px', backgroundColor: '#7c631a', color: '#ffffff', borderColor: '#634f14' }}>
            Clinical Dermatology & Cosmetic Aesthetics
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '2.8rem', marginBottom: '18px' }}>
            Dermatic & Cosmetic Procedures Catalog
          </h1>
          <p style={{ maxWidth: '750px', margin: '0 auto', color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Explore our specialized clinical allergy testing, dermato-surgeries, laser skin resurfacing, and advanced hair growth therapies across our branches.
          </p>

          {/* Branch Selector Pills in Header */}
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedBranch('all')}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                border: selectedBranch === 'all' ? '2px solid var(--gold-400)' : '1px solid rgba(255,255,255,0.3)',
                backgroundColor: selectedBranch === 'all' ? 'var(--gold-500)' : 'rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.3s ease'
              }}
            >
              <MapPin size={15} /> All Locations
            </button>
            <button
              onClick={() => setSelectedBranch('trivandrum')}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                border: selectedBranch === 'trivandrum' ? '2px solid var(--gold-400)' : '1px solid rgba(255,255,255,0.3)',
                backgroundColor: selectedBranch === 'trivandrum' ? 'var(--gold-500)' : 'rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.3s ease'
              }}
            >
              <MapPin size={15} /> Trivandrum Branch (Pattom)
            </button>
            <button
              onClick={() => setSelectedBranch('bangalore')}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                border: selectedBranch === 'bangalore' ? '2px solid var(--gold-400)' : '1px solid rgba(255,255,255,0.3)',
                backgroundColor: selectedBranch === 'bangalore' ? 'var(--gold-500)' : 'rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.3s ease'
              }}
            >
              <MapPin size={15} /> Bangalore Branch (Whitefield)
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Container */}
      <section style={{ marginTop: '-25px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="glass" style={{ padding: '24px 30px', borderRadius: '14px', background: 'white', boxShadow: 'var(--shadow-md)', border: '1px solid var(--silk-200)' }}>
            
            {/* Primary Filter Tabs: Dermatic vs Cosmetic */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', borderBottom: '1px solid var(--silk-200)', paddingBottom: '16px' }}>
              <button
                onClick={() => setSelectedType('all')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  border: 'none',
                  backgroundColor: selectedType === 'all' ? 'var(--plum-900)' : 'var(--silk-100)',
                  color: selectedType === 'all' ? 'white' : 'var(--plum-900)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                All Procedures ({selectedBranch === 'bangalore' ? 0 : 37})
              </button>
              <button
                onClick={() => setSelectedType('dermatic')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  border: 'none',
                  backgroundColor: selectedType === 'dermatic' ? 'var(--plum-800)' : 'var(--silk-100)',
                  color: selectedType === 'dermatic' ? 'white' : 'var(--plum-900)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Stethoscope size={16} /> Dermatic Procedures ({selectedBranch === 'bangalore' ? 0 : dermaticCount})
              </button>
              <button
                onClick={() => setSelectedType('cosmetic')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  border: 'none',
                  backgroundColor: selectedType === 'cosmetic' ? 'var(--gold-600)' : 'var(--silk-100)',
                  color: selectedType === 'cosmetic' ? 'white' : 'var(--plum-900)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Sparkles size={16} /> Cosmetic Procedures ({selectedBranch === 'bangalore' ? 0 : cosmeticCount})
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              {/* Category buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { key: 'all', label: 'All Specialties' },
                  { key: 'skin', label: 'Skin & Allergy' },
                  { key: 'laser', label: 'Lasers & RF' },
                  { key: 'hair', label: 'Hair & Scalp' },
                  { key: 'aesthetics', label: 'Aesthetic Surgeries' }
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveFilter(cat.key)}
                    className="btn"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.82rem',
                      borderRadius: '20px',
                      backgroundColor: activeFilter === cat.key ? 'var(--plum-900)' : 'var(--silk-100)',
                      color: activeFilter === cat.key ? 'white' : 'var(--muted-charcoal)',
                      border: '1px solid transparent',
                      transition: 'var(--transition-fast)',
                      cursor: 'pointer',
                      fontWeight: activeFilter === cat.key ? '600' : 'normal'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-charcoal)' }} />
                <input
                  type="text"
                  placeholder="Search procedures, allergy tests, lasers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 16px 10px 38px',
                    borderRadius: '30px',
                    border: '1px solid var(--silk-200)',
                    outline: 'none',
                    fontSize: '0.88rem',
                    backgroundColor: 'var(--silk-100)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner for Bangalore Branch */}
      {selectedBranch === 'bangalore' && (
        <section style={{ marginTop: '40px' }}>
          <div className="container">
            <div style={{
              background: 'linear-gradient(135deg, #fff9e6 0%, #fff0f5 100%)',
              border: '2px dashed var(--gold-500)',
              borderRadius: '16px',
              padding: '40px 30px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <AlertCircle size={44} style={{ color: 'var(--gold-600)', marginBottom: '14px' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', fontSize: '1.8rem', marginBottom: '10px' }}>
                Bangalore Branch Procedures Updating Soon
              </h3>
              <p style={{ maxWidth: '650px', margin: '0 auto 24px', color: 'var(--muted-charcoal)', fontSize: '1rem', lineHeight: '1.6' }}>
                The full catalog of clinical and cosmetic procedures specifically customized for our <strong>Whitefield, Bangalore</strong> branch is currently being updated and will be published here shortly.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--plum-800)', fontWeight: '600', marginBottom: '24px' }}>
                All core treatments, consultations, lasers, and hair procedures are fully active at our Whitefield clinic. Reach out to our Bangalore care team directly:
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleWhatsAppClick('Bangalore')}
                  className="btn btn-primary"
                  style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#25D366', borderColor: '#25D366', color: 'white', fontWeight: 'bold' }}
                >
                  <MessageSquare size={16} /> WhatsApp Bangalore Clinic
                </button>
                <a
                  href="tel:+919008985222"
                  className="btn btn-outline"
                  style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--plum-900)', borderColor: 'var(--plum-900)', fontWeight: 'bold' }}
                >
                  <Phone size={16} /> Call Whitefield Branch
                </a>
                <button
                  onClick={() => setSelectedBranch('trivandrum')}
                  className="btn btn-secondary"
                  style={{ padding: '12px 24px', cursor: 'pointer' }}
                >
                  View Trivandrum Procedures ({37})
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Treatments Cards Grid */}
      <section className="section-padding" style={{ padding: '40px 0 60px' }}>
        <div className="container">

          {/* Active branch label bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--muted-charcoal)' }}>
              Showing <strong>{filteredTreatments.length}</strong> procedure{filteredTreatments.length === 1 ? '' : 's'} 
              {selectedBranch === 'trivandrum' ? ' available at Trivandrum Branch' : selectedBranch === 'bangalore' ? ' for Bangalore Branch' : ' across branches'}
            </span>
            <span className="badge badge-plum" style={{ fontSize: '0.75rem' }}>
              {selectedBranch === 'trivandrum' ? '📍 Trivandrum Branch (Pattom)' : selectedBranch === 'bangalore' ? '📍 Bangalore Branch (Whitefield)' : '📍 All Branches'}
            </span>
          </div>

          {filteredTreatments.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '26px' }}>
              {filteredTreatments.map((t) => (
                <div 
                  key={t.id}
                  className="glass"
                  style={{
                    background: 'white',
                    borderRadius: '14px',
                    border: '1px solid var(--silk-200)',
                    overflow: 'hidden',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  {/* Card Cover Image */}
                  {t.image && (
                    <div style={{ height: '175px', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--silk-200)' }}>
                      <img 
                        src={t.image} 
                        alt={t.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                        <span style={{ 
                          fontSize: '0.65rem', 
                          fontWeight: 'bold', 
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          padding: '4px 10px', 
                          borderRadius: '20px', 
                          backgroundColor: t.procedure_type === 'dermatic' ? 'var(--plum-900)' : 'var(--gold-600)',
                          color: 'white'
                        }}>
                          {t.procedure_type === 'dermatic' ? '🩺 DERMATIC' : '✨ COSMETIC'}
                        </span>
                      </div>

                      <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                        <span style={{ 
                          fontSize: '0.65rem', 
                          fontWeight: 'bold',
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          backgroundColor: 'rgba(0,0,0,0.65)',
                          color: 'white',
                          backdropFilter: 'blur(4px)'
                        }}>
                          Trivandrum Branch
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Content Details */}
                  <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Category and duration */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--plum-800)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {t.category_name}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-600)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {t.duration}
                        </span>
                      </div>

                      <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', fontSize: '1.35rem', marginBottom: '10px', lineHeight: '1.3' }}>
                        {t.name}
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--muted-charcoal)', lineHeight: '1.5', marginBottom: '16px' }}>
                        {t.description}
                      </p>

                      {/* Scientific mechanism */}
                      <div style={{ background: 'var(--silk-100)', padding: '10px 14px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.78rem' }}>
                        <strong style={{ color: 'var(--plum-800)', display: 'block', marginBottom: '2px' }}>Clinical Mechanism:</strong>
                        <span style={{ color: 'var(--muted-charcoal)', fontStyle: 'italic' }}>{t.science}</span>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--charcoal)', marginBottom: '0' }}>
                        <strong>Indicated for:</strong> <span style={{ color: 'var(--muted-charcoal)' }}>{t.treats}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : selectedBranch !== 'bangalore' ? (
            <div style={{ textAlign: 'center', padding: '60px 0', background: 'white', borderRadius: '12px', border: '1px solid var(--silk-200)' }}>
              <p style={{ color: 'var(--muted-charcoal)', fontSize: '1.1rem' }}>No procedures found matching your criteria. Try adjusting your search query or filter.</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Treatments FAQ Section */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-premium">Patient Knowledge Base</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginTop: '10px' }}>
              Procedures & Diagnostics FAQ
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                style={{ 
                  border: '1px solid var(--silk-200)', 
                  borderRadius: '10px', 
                  backgroundColor: 'var(--silk-100)',
                  overflow: 'hidden',
                  textAlign: 'left'
                }}
              >
                <div 
                  onClick={() => toggleFaq(idx)}
                  style={{ 
                    padding: '20px 24px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <span style={{ fontWeight: '600', color: 'var(--plum-900)', fontSize: '0.95rem' }}>{faq.q}</span>
                  {expandedFaq === idx ? <ChevronUp size={18} style={{ color: 'var(--plum-800)' }} /> : <ChevronDown size={18} style={{ color: 'var(--plum-800)' }} />}
                </div>

                {expandedFaq === idx && (
                  <div style={{ padding: '0 24px 20px', fontSize: '0.9rem', color: 'var(--muted-charcoal)', lineHeight: '1.6', borderTop: '1px solid var(--silk-200)', paddingTop: '16px', backgroundColor: 'white' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
