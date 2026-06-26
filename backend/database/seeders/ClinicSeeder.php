<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Service;
use App\Models\GalleryItem;
use App\Models\BlogPost;
use App\Models\Lead;
use App\Models\SeoConfig;
use Illuminate\Support\Facades\Hash;

class ClinicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        User::updateOrCreate(
            ['email' => 'admin@ycdc.com'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('YcdcAdmin2026!'),
            ]
        );

        // 2. Seed Doctors
        $doctors = [
            // Leadership / Chairman (We can seed him as a special doctor or main bio)
            [
                'name' => 'Dr. K. Yogiraj',
                'qualification' => 'DV, MD (D&V)',
                'designation' => 'Chairman & MD',
                'bio' => 'Managing Director of the Yogiraj Centre for Dermatology & Cosmetology, brings an illustrious career spanning over five decades in Clinical and Cosmetic Dermatology. As a former Professor in the Department of Dermatology and Venereology at Medical College, Trivandrum, he has shaped the future of postgraduate education and research in dermatology.',
                'branch' => 'trivandrum',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            // Bangalore Team
            [
                'name' => 'Dr. Niranjana Raj',
                'qualification' => 'FRGUHS, MD (Dermatology, Venereology & Leprosy)',
                'designation' => 'Chief Consultant Dermatologist',
                'bio' => 'Lead consultant specializing in advanced lasers, aesthetic injectables, and clinical dermatology workflows.',
                'branch' => 'bangalore',
                'instagram_url' => 'https://www.instagram.com/drniranjanaraj/',
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Yasmin Rehman',
                'qualification' => 'MBBS, DDVL',
                'designation' => 'Consultant Dermatologist',
                'bio' => 'Expert in chemical peels, acne therapies, and general clinical skin conditions.',
                'branch' => 'bangalore',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Vignessh Raj',
                'qualification' => 'MBBS, MD (Dermatology)',
                'designation' => 'Aesthetic Dermatologist',
                'bio' => 'Specializes in RF microneedling, skin resurfacing, and body shaping treatments.',
                'branch' => 'bangalore',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Vennela R',
                'qualification' => 'MBBS, MD',
                'designation' => 'Hair Transplant Surgeon',
                'bio' => 'Dedicated trichologist and hair transplant surgeon practicing FUE micro-grafting.',
                'branch' => 'bangalore',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            // Trivandrum Team
            [
                'name' => 'Dr. Maya Vincent',
                'qualification' => 'MBBS, MD – Dermatology',
                'designation' => 'Senior Consultant Dermatologist',
                'bio' => 'Expert senior physician with 15+ years experience in chronic skin conditions.',
                'branch' => 'trivandrum',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Sunil Menon',
                'qualification' => 'MBBS, MD – Dermatology',
                'designation' => 'Consultant Dermatologist',
                'bio' => 'Specialist in laser treatments and pediatric dermatology.',
                'branch' => 'trivandrum',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Bismi Sherief',
                'qualification' => 'MBBS, DNB (Dermatology & Venereology)',
                'designation' => 'Consultant Dermatologist',
                'bio' => 'Expert clinical doctor focusing on venereology and autoimmune skin conditions.',
                'branch' => 'trivandrum',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Deepthi Benny',
                'qualification' => 'MBBS, DNB Dermatology',
                'designation' => 'Consultant Dermatologist',
                'bio' => 'Dedicated clinical practitioner specialized in hyperpigmentation and laser toning.',
                'branch' => 'trivandrum',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Ryan Raju',
                'qualification' => 'MBBS, MD Dermatology, Venereology & Leprology',
                'designation' => 'Aesthetic Specialist',
                'bio' => 'Aesthetic expert focused on anti-wrinkle injections, dermal fillers, and thread lifts.',
                'branch' => 'trivandrum',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Devi Menon',
                'qualification' => 'MBBS, MD Dermatology, Venereology & Leprology',
                'designation' => 'Clinical Dermatologist',
                'bio' => 'Specializes in allergy testing, eczema management, and psoriasis protocols.',
                'branch' => 'trivandrum',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Shruthi S Kumar',
                'qualification' => 'MBBS, MD Dermatology, Venereology & Leprology',
                'designation' => 'Consultant Dermatologist',
                'bio' => 'Clinical expert in acne scar management and chemical peeling strategies.',
                'branch' => 'trivandrum',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
            [
                'name' => 'Dr. Amy',
                'qualification' => 'MBBS, MD Dermatology, Venereology & Leprology',
                'designation' => 'Clinical Consultant',
                'bio' => 'Consulting clinical dermatologist focusing on general dermatological wellness.',
                'branch' => 'trivandrum',
                'instagram_url' => null,
                'active' => true,
                'image_path' => null,
            ],
        ];

        foreach ($doctors as $doc) {
            Doctor::create($doc);
        }

        // 3. Seed Services
        $services = [
            // Clinical skin Care
            [
                'id' => 'acne-therapy',
                'category' => 'skin',
                'category_name' => 'Clinical Dermatology',
                'name' => 'Advanced Acne & Scar Correction',
                'description' => 'Targeted laser and RF therapies to clear active breakouts, balance sebum production, and smooth out deep acne pits or scars.',
                'duration' => '45 mins',
                'price_range' => '₹1,800 - ₹3,500',
                'science' => 'Uses sub-surface thermal energy and localized micro-peels to trigger collagen rebuilding in scar tissue.',
                'treats' => 'Active acne, post-inflammatory hyperpigmentation (PIH), rolling/boxcar scars.',
                'active' => true
            ],
            [
                'id' => 'peels',
                'category' => 'skin',
                'category_name' => 'Clinical Dermatology',
                'name' => 'Premium Chemical Peels',
                'description' => 'Medically formulated resurfacing glycolic, salicylic, or TCA peels administered by dermatologists to peel away pigmentation and reveal luminous skin.',
                'duration' => '30 mins',
                'price_range' => '₹2,500 - ₹5,000',
                'science' => 'Controlled chemical exfoliation targeting the epidermal layers to accelerate skin renewal.',
                'treats' => 'Sun spots, melasma, fine lines, dull complexion.',
                'active' => true
            ],
            [
                'id' => 'microderm',
                'category' => 'skin',
                'category_name' => 'Clinical Dermatology',
                'name' => 'Microdermabrasion & Polish',
                'description' => 'Gentle mechanical exfoliation using diamond-tipped wands to eliminate outer dead skin cells, refine texture, and stimulate microcirculation.',
                'duration' => '40 mins',
                'price_range' => '₹3,000',
                'science' => 'Vacuum-assisted abrasion that instantly buffs skin irregularities and boosts absorption of medical serums.',
                'treats' => 'Open pores, rough skin texture, superficial tan.',
                'active' => true
            ],
            // Hair & Scalp
            [
                'id' => 'prp',
                'category' => 'hair',
                'category_name' => 'Hair & Scalp Care',
                'name' => 'PRP Hair Growth Therapy',
                'description' => 'Platelet-rich plasma derived from your own blood, injected into the scalp to stimulate hair follicles, reverse thinning, and promote thickness.',
                'duration' => '60 mins',
                'price_range' => '₹4,500/session',
                'science' => 'Uses concentration of autologous growth factors (PDGF, VEGF) to activate dormant hair bulb stems.',
                'treats' => 'Androgenetic alopecia, telogen effluvium, general hair thinning.',
                'active' => true
            ],
            [
                'id' => 'transplant',
                'category' => 'hair',
                'category_name' => 'Hair & Scalp Care',
                'name' => 'Follicular Hair Transplant (FUE)',
                'description' => 'Advanced surgical hair restoration where individual healthy follicles are harvested and transplanted into balding areas for natural-looking density.',
                'duration' => '4-8 hours',
                'price_range' => 'Consultation Required',
                'science' => 'Micro-grafting technique ensuring minimal scarring, maximum graft survivability, and lifetime growth.',
                'treats' => 'Male pattern baldness, receding hairlines, crown balding.',
                'active' => true
            ],
            [
                'id' => 'scalp-regen',
                'category' => 'hair',
                'category_name' => 'Hair & Scalp Care',
                'name' => 'Scalp Rejuvenation Treatment',
                'description' => 'Deep cleansing, anti-fungal peeling, and nutritional infusion targeting scalp conditions like dandruff, dry scalp, and hair root inflammation.',
                'duration' => '50 mins',
                'price_range' => '₹3,200',
                'science' => 'Exfoliation of build-up followed by ozone steam and nutrient ampoule delivery.',
                'treats' => 'Stubborn dandruff, oily scalp, scalp folliculitis.',
                'active' => true
            ],
            // Lasers & RF
            [
                'id' => 'secret-rf',
                'category' => 'laser',
                'category_name' => 'Laser & Aesthetics',
                'name' => 'Secret RF Microneedling',
                'description' => 'Fractional radiofrequency combined with microneedling to deliver heat deep into the dermis, tightening loose skin and curing deep stretch marks.',
                'duration' => '60 mins',
                'price_range' => '₹8,000 - ₹12,000',
                'science' => 'Delivers fractional bipolar RF energy to deep layers, promoting profound collagen remodeling without surface downtime.',
                'treats' => 'Skin laxity, deep wrinkles, surgical scars, stretch marks.',
                'active' => true
            ],
            [
                'id' => 'hair-reduction',
                'category' => 'laser',
                'category_name' => 'Laser & Aesthetics',
                'name' => 'Laser Hair Reduction (US-FDA Approved)',
                'description' => 'Permanent, virtually pain-free hair reduction using medical-grade triple wavelength laser targeting hair follicles safely across all skin types.',
                'duration' => '30-90 mins',
                'price_range' => 'From ₹4,000',
                'science' => 'Selective photothermolysis where melanin absorbs laser heat, disabling future follicle growth.',
                'treats' => 'Unwanted facial hair, body hair, ingrown hair.',
                'active' => true
            ],
            [
                'id' => 'q-switch',
                'category' => 'laser',
                'category_name' => 'Laser & Aesthetics',
                'name' => 'Q-Switched Laser Toning',
                'description' => 'Laser treatment designed to breakdown deeper melanin pigments, curing stubborn melasma, birthmarks, and dark spots safely.',
                'duration' => '45 mins',
                'price_range' => '₹5,000 - ₹9,000',
                'science' => 'Nanosecond pulses create acoustic shockwaves to shatter pigment without heat damage to surrounding skin.',
                'treats' => 'Melasma, tattoo ink, freckles, dark underarms.',
                'active' => true
            ],
            // Cosmetic
            [
                'id' => 'botox',
                'category' => 'aesthetics',
                'category_name' => 'Cosmetic Aesthetics',
                'name' => 'Botox Anti-Wrinkle Injections',
                'description' => 'Targeted micro-injections of purified protein to relax dynamic facial muscles, softening crow\'s feet, forehead creases, and frown lines.',
                'duration' => '30 mins',
                'price_range' => 'Price on Consultation',
                'science' => 'Temporarily blocks neuromuscular signals to allow skin creases to flatten and heal.',
                'treats' => 'Forehead lines, crow\'s feet, bunny lines, jaw masseter slimming.',
                'active' => true
            ],
            [
                'id' => 'hydrafacial',
                'category' => 'aesthetics',
                'category_name' => 'Cosmetic Aesthetics',
                'name' => 'Luxury Hydrafacial Medi-Facial',
                'description' => 'Patented multi-step clinical facial to cleanse, extract impurities, and hydrate skin with advanced antioxidant and hyaluronic acid infusions.',
                'duration' => '60 mins',
                'price_range' => '₹5,500',
                'science' => 'Vortex-fusion technology that vacuums pores while simultaneously feeding the skin with customized botanical serums.',
                'treats' => 'Blackheads, dry dehydrated skin, clogged pores, pre-event glow.',
                'active' => true
            ],
            [
                'id' => 'carbon-peel',
                'category' => 'aesthetics',
                'category_name' => 'Cosmetic Aesthetics',
                'name' => 'Hollywood Carbon Laser Glow Peel',
                'description' => 'Carbon cream layer applied to skin, followed by laser treatment that vacuums the carbon particles, removing oils, contaminants, and dead cells instantly.',
                'duration' => '40 mins',
                'price_range' => '₹4,500',
                'science' => 'The carbon absorbs laser energy, vaporizing micro-impurities and tightening skin pores.',
                'treats' => 'Dull complexion, oily skin, enlarged pores.',
                'active' => true
            ]
        ];

        foreach ($services as $srv) {
            Service::create($srv);
        }

        // 4. Seed Gallery Items
        $gallery = [
            [
                'id' => 'before-after-4',
                'type' => 'image',
                'category' => 'treatments',
                'title' => 'Before After - Hair Transplant Density',
                'thumbnail_path' => 'https://ycdc.in/wp-content/uploads/2025/08/eed5800b-c58f-4e3d-a7cf-36350a19166c.jpg',
                'video_path' => null,
                'description' => 'Excellent density and natural hairline restoration 6 months after a FUE hair transplant session.'
            ],
            [
                'id' => 'before-after-3',
                'type' => 'image',
                'category' => 'treatments',
                'title' => 'Before After - Hair Line Restoration',
                'thumbnail_path' => 'https://ycdc.in/wp-content/uploads/2025/05/ycdc-before-after2-880x808.jpeg',
                'video_path' => null,
                'description' => 'Frontal hairline restoration showing significant density and natural growth.'
            ],
            [
                'id' => 'before-after-2',
                'type' => 'image',
                'category' => 'treatments',
                'title' => 'Before After - Acne Scar Correction',
                'thumbnail_path' => 'https://ycdc.in/wp-content/uploads/2025/08/eed5800b-c58f-4e3d-a7cf-36350a19166c.jpg',
                'video_path' => null,
                'description' => 'Visible skin smoothing and reduction of deep pitted acne scars after 3 sessions of Secret RF Microneedling.'
            ],
            [
                'id' => 'image-1',
                'type' => 'image',
                'category' => 'treatments',
                'title' => 'Trichoscopy Scalp Examination',
                'thumbnail_path' => 'https://ycdc.in/wp-content/uploads/2025/05/cosmetologist-doing-trichoscopy-and-watching-resul-2024-10-18-10-16-52-utc-scaled.jpg',
                'video_path' => null,
                'description' => 'Digital trichoscopy scalp analysis to evaluate hair root health and map out custom treatments.'
            ],
            [
                'id' => 'clinic-lobby',
                'type' => 'image',
                'category' => 'infrastructure',
                'title' => 'YCDC Luxury Lobby & Reception',
                'thumbnail_path' => 'https://ycdc.in/wp-content/uploads/2025/05/DSC09954-scaled.jpg',
                'video_path' => null,
                'description' => 'Our welcoming reception lounge designed to provide patients with a calming and premium clinical environment.'
            ],
            [
                'id' => 'before-after-6',
                'type' => 'image',
                'category' => 'treatments',
                'title' => 'Before After - Pigmentation Treatment',
                'thumbnail_path' => 'https://ycdc.in/wp-content/uploads/2025/05/ycdc-before-after6-880x808.jpeg',
                'video_path' => null,
                'description' => 'Advanced Q-Switched laser toning and chemical peel results for melasma and dark spots.'
            ],
            [
                'id' => 'treatment-showcase-video',
                'type' => 'video',
                'category' => 'treatments',
                'title' => 'YCDC Clinic Experience Tour',
                'thumbnail_path' => 'https://ycdc.in/wp-content/uploads/2025/05/Dr.-NR-Opd.jpg',
                'video_path' => 'https://www.youtube.com/watch?v=RWr8XeBUxTU',
                'description' => 'Detailed clinical video tour demonstrating our professional environment, FDA-approved lasers, and workflows.'
            ]
        ];

        foreach ($gallery as $g) {
            GalleryItem::create($g);
        }

        // 5. Seed Blogs
        $blogs = [
            [
                'id' => 'ycdc-skin-care-tips',
                'category' => 'skin',
                'category_label' => 'Skin Care',
                'title' => 'Skin Care Tips – For Healthy & Glowing Skin',
                'author' => 'Dr. Niranjana Raj (Chief Consultant)',
                'date' => 'August 24, 2025',
                'read_time' => '3 min read',
                'excerpt' => 'Beautiful skin starts with the right care. At YCDC, we believe in simple yet effective skin care practices that keep your skin nourished, hydrated, and radiant every day.',
                'image_path' => 'https://ycdc.in/wp-content/uploads/2025/07/beautiful-young-indian-woman-enjoying-face-lifting-2025-03-18-17-16-15-utc-scaled.jpg',
                'body_content' => [
                    'Beautiful skin starts with the right care. At YCDC, we believe in simple yet effective skin care practices that keep your skin nourished, hydrated, and radiant every day. Using cutting-edge ResurFX Laser and Secret RF Microneedling, we effectively target pimple scars, uneven texture, and active breakouts.',
                    '1. Protect Your Skin from Sun Damage: Always use a broad-spectrum sunscreen with SPF 30 or higher. UVA and UVB rays accelerate skin aging and trigger hyperpigmentation. Reapply sunscreen every 3 hours if outdoors.',
                    '2. Keep Your Skin Hydrated: Drinking adequate water and using a hyaluronic acid-based moisturizer helps lock in moisture, strengthening the skin barrier against environmental pollutants.',
                    '3. Follow a Gentle Cleansing Routine: Cleanse your face twice daily with a soap-free, pH-balanced cleanser suitable for your skin type. Avoid harsh scrubbing which can cause micro-tears.'
                ]
            ],
            [
                'id' => 'laser-hair-reduction-guide',
                'category' => 'anti-aging',
                'category_label' => 'Lasers',
                'title' => 'A Complete Guide to Laser Hair Reduction',
                'author' => 'Dr. K. Yogiraj (Chairman)',
                'date' => 'July 15, 2025',
                'read_time' => '4 min read',
                'excerpt' => 'Understand how US-FDA approved laser systems deliver permanent hair reduction safely across all skin types with zero downtime.',
                'image_path' => 'https://ycdc.in/wp-content/uploads/2025/05/a-girl-in-black-underwear-gets-laser-hair-removal-2025-03-24-12-57-40-utc-scaled-500x450.jpg',
                'body_content' => [
                    'Embrace self-confidence and overcome the hassle of frequent waxing or shaving. Laser hair reduction uses selective photothermolysis to target melanin in hair follicles, disabling their growth cycle permanently without damaging surrounding skin tissue.',
                    'At YCDC, we utilize US-FDA approved triple-wavelength lasers that are exceptionally safe for Indian skin types. The integrated cooling tips ensure the treatment is virtually painless.',
                    'Normally, a series of 6 to 8 sessions is required to target hairs in their active growth (anagen) phase. Sessions are spaced 4 to 6 weeks apart, revealing smooth, hair-free skin with no recovery downtime.'
                ]
            ],
            [
                'id' => 'hair-loss-solutions',
                'category' => 'hair',
                'category_label' => 'Hair Care',
                'title' => 'Restoring Hair Health: Reasons and Modern Treatments for Hair Loss',
                'author' => 'Dr. Vennela R (Hair Specialist)',
                'date' => 'June 10, 2025',
                'read_time' => '5 min read',
                'excerpt' => 'Experiencing hair thinning? Explore the biological reasons behind hair fall and clinical hair loss solutions including PRP and FUE transplants.',
                'image_path' => 'https://ycdc.in/wp-content/uploads/2025/05/a-beautician-makes-injections-into-the-scalp-for-h-2024-12-01-11-09-23-utc-scaled.jpg',
                'body_content' => [
                    'Hair loss causing thinning or baldness is a very common concern. Understanding the root cause—whether it is genetic androgenetic alopecia, hormonal imbalances, nutritional deficiencies, or stress-induced telogen effluvium—is the first step to successful restoration.',
                    'Modern trichology offers highly effective solutions: medications to block DHT, Platelet-Rich Plasma (PRP) scalp injections to stimulate hair bulbs, and FUE hair transplant surgery.',
                    'FUE involves harvesting healthy hair follicles from the donor area (usually the back of the head) and transplanting them into balding zones. It delivers lifelong growth, natural direction, and maximum hair density.'
                ]
            ]
        ];

        foreach ($blogs as $b) {
            BlogPost::create($b);
        }

        // 6. Seed SEO Configs
        $seo = [
            [
                'route_name' => 'home',
                'title' => 'YCDC | Yogiraj Centre for Dermatology & Cosmetology',
                'meta_description' => 'Premium dermatology & cosmetology clinics in Whitefield, Bangalore & Pattom, Trivandrum.',
                'keywords' => 'dermatology, cosmetology, clinic, skin care, hair care, Bangalore, Trivandrum'
            ],
            [
                'route_name' => 'about',
                'title' => 'About Us | YCDC Dermatology Center',
                'meta_description' => 'Learn about our 50+ year legacy of excellence in clinical and cosmetic dermatology led by Dr. K. Yogiraj.',
                'keywords' => 'about ycdc, ycdc legacy, dr yogiraj'
            ],
            [
                'route_name' => 'team',
                'title' => 'Our Medical Specialists | YCDC',
                'meta_description' => 'Consult our board-certified dermatologists, trichologists, and transplant surgeons practicing at Bangalore & Trivandrum.',
                'keywords' => 'ycdc doctors, dermatologists bangalore, dermatologists trivandrum'
            ],
            [
                'route_name' => 'before-after',
                'title' => 'Clinical Transformations | YCDC',
                'meta_description' => 'View authentic, un-retouched results of clinical hair transplants and deep acne scar resurfacing.',
                'keywords' => 'before after hair transplant, acne scar results'
            ],
            [
                'route_name' => 'treatments',
                'title' => 'Dermatology & Cosmetology Treatments | YCDC',
                'meta_description' => 'Browse our US-FDA approved clinical lasers, chemical peels, and cosmetic injectables.',
                'keywords' => 'skin treatments, hair transplant price, laser hair removal'
            ],
            [
                'route_name' => 'gallery',
                'title' => 'Clinic Gallery | YCDC',
                'meta_description' => 'Take a virtual tour of our luxury lobby, state-of-the-art laser rooms, and clinical spaces.',
                'keywords' => 'ycdc clinic tour, skin clinic lobby'
            ],
            [
                'route_name' => 'blog',
                'title' => 'Skin & Hair Health Blog | YCDC',
                'meta_description' => 'Expert dermatological advice, sunscreen guides, and hair therapy explanations written by our doctors.',
                'keywords' => 'skincare blog, hair loss tips, prp therapy explanation'
            ],
            [
                'route_name' => 'contact',
                'title' => 'Contact Us | YCDC Bangalore & Trivandrum',
                'meta_description' => 'Book your priority consultation or virtual diagnosis at our Whitefield (Bangalore) or Pattom (Trivandrum) branches.',
                'keywords' => 'book dermatologist appt, ycdc contact number'
            ]
        ];

        foreach ($seo as $s) {
            SeoConfig::create($s);
        }

        // 7. Seed Leads
        $leads = [
            [
                'branch' => 'Whitefield, Bangalore',
                'patient_name' => 'Ramesh Kumar',
                'patient_phone' => '9845012345',
                'patient_email' => 'ramesh.k@gmail.com',
                'service_requested' => 'PRP Hair Growth Therapy',
                'doctor_requested' => 'Dr. Vennela Reddy',
                'preferred_date' => '2026-06-25',
                'preferred_time' => '11:00 AM',
                'concern_type' => 'Hair & Scalp',
                'medical_history' => 'Experiencing severe hair thinning on the crown for the past 6 months.',
                'photo_attached' => null,
                'status' => 'Confirmed',
                'type' => 'Appointment',
                'notes' => 'Confirmed slot, patient notified.'
            ],
            [
                'branch' => 'Pattom, Trivandrum',
                'patient_name' => 'Ananya Pillai',
                'patient_phone' => '9447012345',
                'patient_email' => 'ananya.p@yahoo.com',
                'service_requested' => 'Premium Chemical Peels',
                'doctor_requested' => 'Dr. Maya Vincent',
                'preferred_date' => '2026-06-26',
                'preferred_time' => '02:45 PM',
                'concern_type' => 'Skin Care',
                'medical_history' => 'Looking to treat post-acne pigmentation and uneven skin tone.',
                'photo_attached' => null,
                'status' => 'Contacted',
                'type' => 'Appointment',
                'notes' => 'Called, left voicemail. Scheduled follow-up email.'
            ],
            [
                'branch' => 'Whitefield, Bangalore',
                'patient_name' => 'Rohit Sharma',
                'patient_phone' => '9900012345',
                'patient_email' => 'rohit.s@gmail.com',
                'service_requested' => null,
                'doctor_requested' => null,
                'preferred_date' => null,
                'preferred_time' => null,
                'concern_type' => 'Acne, Pimples & Scars',
                'medical_history' => 'Frequent cystic acne breakouts on cheeks and jawline. No previous clinical treatments.',
                'photo_attached' => 'jawline_acne_left.jpg',
                'status' => 'Pending',
                'type' => 'Online Consultation',
                'notes' => null
            ],
            [
                'branch' => 'Pattom, Trivandrum',
                'patient_name' => 'Meera Nair',
                'patient_phone' => '9496054321',
                'patient_email' => 'meera.nair@hotmail.com',
                'service_requested' => null,
                'doctor_requested' => null,
                'preferred_date' => null,
                'preferred_time' => null,
                'concern_type' => 'Fine Lines, Wrinkles & Anti-Aging',
                'medical_history' => 'Interested in non-surgical anti-aging solutions. Noticeable fine lines around eyes.',
                'photo_attached' => 'forehead_wrinkles.jpg',
                'status' => 'Contacted',
                'type' => 'Online Consultation',
                'notes' => 'Discussed Botox vs Hydrafacial.'
            ]
        ];

        foreach ($leads as $l) {
            Lead::create($l);
        }
    }
}
