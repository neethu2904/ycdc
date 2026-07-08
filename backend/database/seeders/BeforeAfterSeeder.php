<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CaseStudy;

class BeforeAfterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $caseStudies = [
            [
                'id' => 'gfc-treatment',
                'category' => 'hair',
                'category_label' => 'GFC Therapy',
                'title' => 'Growth Factor Concentrate (GFC) Treatment',
                'description' => "Growth Factor Concentrate (GFC) treatment is a cutting-edge therapy primarily used in dermatology to promote hair regrowth and skin rejuvenation. It harnesses the body's natural growth factors extracted from the patient's blood, concentrating them into a highly potent solution. At YCDC, our expert dermatologists use state-of-the-art technology and customized treatment plans to ensure optimal outcomes tailored to individual needs.",
                'before_img_path' => '/gfc_before.jpg',
                'after_img_path' => '/gfc_after.jpg',
                'doctor' => 'Dr. K. Yogiraj & Team',
                'technology' => 'GFC Extraction & Micro-Needling',
                'sessions' => '3 - 4 Sessions (spaced 4 weeks apart)',
                'concern' => 'Moderate Hair Thinning & Scalp Rejuvenation',
                'active' => true,
            ],
            [
                'id' => 'acne-correction',
                'category' => 'skin',
                'category_label' => 'Clinical Dermatology',
                'title' => 'Deep Acne Scar Resurfacing',
                'description' => 'Profound texture improvement and post-inflammatory erythema clearing using fractional radiofrequency and customized peeling.',
                'before_img_path' => '/acne_before.png',
                'after_img_path' => '/acne_after.png',
                'doctor' => 'Dr. Niranjana Raj',
                'technology' => 'Secret Fractional RF Microneedling & Glycolic Peels',
                'sessions' => '3 Sessions (spaced 4 weeks apart)',
                'concern' => 'Severe rolling scars, icepick scarring, active blemishes.',
                'active' => true,
            ]
        ];

        foreach ($caseStudies as $cs) {
            CaseStudy::updateOrCreate(['id' => $cs['id']], $cs);
        }
    }
}
