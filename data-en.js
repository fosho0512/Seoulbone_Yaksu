/* [SEOUL BONE PAIN CLINIC — English Content Data] */

const siteData = {
    content: {
        // 01. Medical Staff
        staff: { 
            title: "Medical Staff", 
            name: "Jang, Yongjun",
            position: "M.D., Ph.D.",
            titles: ["Board-Certified Specialist in Physical Medicine & Rehabilitation\nDoctor of Medicine (Ph.D.)", "Adjunct Assistant Professor, Department of PMR, The Catholic University of Korea"],
            modalImg: "images/staff.webp", 
            signatureImg: "images/signature.webp", 
            bio: [
                { category: "Education", items: ["Graduate of College of Medicine, The Catholic University of Korea", "Combined M.S.-Ph.D. Program in Physical Medicine and Rehabilitation, College of Medicine, The Catholic University of Korea"] },
                { category: "Clinical & Academic Experience", items: ["Intern, St. Mary's Hospital, The Catholic Medical Center", "Resident, St. Mary's Hospital, The Catholic Medical Center", "Attending Physician & Clinical Supervisor, St. Mary's Hospital, The Catholic Medical Center"] },
                { category: "Society Memberships", items: ["Member of Korean Medical Association (KMA)", "Member of Korean Academy of Rehabilitation Medicine (KARM)", "Member of American Congress of Rehabilitation Medicine (ACRM)", "Member of American Academy of Manipulative Therapy (AAMT)", "Member of European Society of Physical and Rehabilitation Medicine (ESPRM)"] }
            ],
            bottomQuote: null,
            details: [] 
        },
        // 02. Core Values
        values: { 
            title: "Core Values", 
            desc: "With integrated expertise and a global perspective,<br>we identify the root cause of pain<br>and pursue a comprehensive, fundamental approach.", 
            slogan: {
                main: "Excellence in Every Detail",
                sub: "We uphold uncompromising principles<br>for every patient's complete recovery."
            },
            sloganBg: "images/values.webp",
            modalImg: "images/values.webp", 
            details: [ 
                {t:"01. Integrated Expertise &<br>Global Perspective", d:"<strong>[Expertise & Global Perspective]</strong><br><br><b>Dual Specialist Insight</b><br>As a dual-trained MD & PhD in both Physical Medicine & Rehabilitation and Neurosurgery, our physician identifies the true root cause of each condition through an integrated, multi-disciplinary lens.<br><br><b>Global Standard</b><br>We adopt advanced, evidence-based treatment systems validated by world-leading medical institutions.<br><br><b>Dedicated Primary Physician (Consistent Personal Physician System)</b><br>We believe in quality over quantity. Our board-certified physician personally oversees every stage of your care — from initial diagnosis to the final phase of treatment. With no rotation of doctors, continuity of care is guaranteed, and even the subtlest changes in your condition are never overlooked.", img:"images/values_01.webp"}, 
                {t:"02. Fundamental Approach", d:"<strong>[Comprehensive Approach]</strong><br><br><b>Beyond Pain</b><br>We don't simply chase pain — we investigate it. By comprehensively analyzing the muscles, nerves, and functional movement patterns underlying each patient's condition.<br><br><b>Personalized Care</b><br>Every treatment plan is individually tailored to each patient's unique medical condition, lifestyle, and goals.", img:"images/values_02.webp"}, 
                {t:"03. Principles", d:"<strong>[Principles & Environment]</strong><br><br><b>Safety & Cleanliness</b><br>Patient safety and rigorous hygiene standards are our foremost priorities. We maintain a clean, comfortable healing environment.<br><b>※ Designated as 'Safe Hospital' by Jung-gu Public Health Center for three consecutive years.</b><br><br><b>Advanced Technology</b><br>We invest in university hospital-grade, state-of-the-art equipment to maximize diagnostic accuracy and treatment efficacy.<br><br><b>Transparent Policy</b><br>We strictly avoid over-treatment and maintain full price transparency across all services — because trust starts with honesty.", img:"images/values_03.webp"}, 
                {t:"04. Personalized Care", d:"<strong>[Patient-Centered Communication & Partnership]</strong><br><br><b>Clear Explanation</b><br>We explain your condition and the underlying cause of your pain in plain, patient-friendly language — clearly and without jargon.<br><br><b>Shared Decision Making</b><br>Treatment decisions are never one-sided. We openly present the pros and cons of all available options and collaborate with each patient to determine the best path forward.<br><br><b>Treatment Roadmap</b><br>Beyond treating today's symptoms, we share a clear long-term treatment roadmap and goals — so you always know where you are on your journey to recovery.", img:"images/values_04.webp"} 
            ] 
        },
        // 03. Diagnostic Tools
        diagnosis: { 
            title: "Diagnostic Tools", 
            desc: "<strong>Accurate Diagnosis Is the First Step to a Complete Recovery.</strong><br>We invest unreservedly in cutting-edge diagnostic technology to identify the root cause of pain — quickly and precisely.", 
            modalImg: "images/diagnosis.webp",
            heroImg: "images/diagnosis-hero.webp",
            details: [ 
                { t: "01. High-Resolution Digital X-ray", d: `<strong>(High-Resolution Digital X-ray)</strong><br><br><i>"The essential first-line imaging study for evaluating bone and joint integrity"</i><br><br>Our latest-generation digital X-ray system significantly reduces radiation exposure compared to conventional film-based methods. High-resolution images are captured instantly, enabling rapid and accurate assessment of fractures, arthritis, spinal deformities, and other skeletal abnormalities.`, img: "images/diagnosis_xray.webp" },
                { t: "02. Premium Musculoskeletal Ultrasound (3 Units)", d: `<strong>(Premium Musculoskeletal Ultrasound — 3 Units)</strong><br><br><i>"The physician's second set of eyes — immediate bedside assessment, no waiting required"</i><br><br>Our high-end ultrasound units provide real-time visualization of soft tissue injuries — including muscles, tendons, ligaments, and nerves — that are difficult to detect on X-ray. With three units stationed in each consultation room, patients receive immediate on-the-spot assessment during their visit, with no separate imaging department and no waiting.`, img: "images/diagnosis_ultra.webp" },
                { t: "03. C-arm Fluoroscopy with SELD Technology", d: `<strong>(C-arm Fluoroscopy with SELD Technology)</strong><br><br><i>"The cornerstone of safe, non-surgical intervention — maximum precision, minimum radiation"</i><br><br>This real-time fluoroscopic imaging system provides live, video-like visualization of internal structures. During spinal and deep joint procedures, it functions as a navigation system, guiding the needle with pinpoint accuracy to ensure error-free treatment.<br><br>Safety Plus: Equipped with SELD (Scattered-radiation Exposure Limiting Device), our C-arm system dramatically reduces unnecessary radiation exposure for both patients and medical staff, ensuring a safer procedural environment.`, img: "images/diagnosis_carm.webp" },
                { t: "04. Nerve Conduction Study & Electromyography (NCS/EMG)", d: `<strong>(Nerve Conduction Study & Electromyography)</strong><br><br><i>"Precision electrodiagnostic testing to detect functional abnormalities invisible to conventional imaging"</i><br><br>NCS/EMG evaluates the functional integrity of the nervous system through electrical signals — revealing information that MRI and X-ray alone cannot provide. When patients present with numbness, sensory changes, or muscle weakness, this study definitively differentiates between nerve and muscle pathology, and precisely locates and grades the severity of any nerve injury.`, img: "images/diagnosis_emg.webp" }
            ] 
        },
        // 04. Integrated Treatment Solutions
        treatment: { 
            title: "Integrated Solutions", 
            desc: "<strong>Integrated Treatment Solutions for Functional Recovery Beyond Pain Relief</strong><br>Combining the expertise of Physical Medicine & Rehabilitation with Orthopedics, our goal is the resolution of the underlying cause.", 
            modalImg: "images/treatment.webp",
            heroImg: "images/treatment-hero.webp",
            slogans: [
                {
                    main: "Integrated Treatment Solutions<br>for Functional Recovery<br>Beyond Pain Relief",
                    sub: "Combining the expertise of Physical Medicine & Rehabilitation with Orthopedics, our goal is not temporary symptom relief but the resolution of the underlying cause.",
                    desc: "Leveraging university hospital-grade equipment and proven clinical expertise, we design a fully personalized, integrated treatment plan for every patient."
                },
                {
                    main: "Three Core Commitments<br>of Seoul Bone Pain Clinic",
                    desc: "We never compromise on the path to recovery."
                }
            ],
            promises: [
                { title: "Strict Standard", name: "Uncompromising Material Selection", desc: "We only use materials and treatments that we would confidently use on our own family.<br>We insist on rigorously verified, best-in-class materials — and never administer any treatment without full confidence in its safety and efficacy." },
                { title: "Real-time Customization", name: "Adaptive Personalized Treatment", desc: "We reject mechanical, routine protocols.<br>At every visit, we precisely reassess your changing physical condition and tailor each treatment to exactly what your body needs at that moment." },
                { title: "Insight for Cause", name: "Treating the Origin, Not the Symptom", desc: "Pain is merely a signal from your body.<br>We look beyond surface-level discomfort to restore balance to underlying structural and functional imbalances — pursuing true, lasting healing." }
            ],
            details: [ 
                { 
                    en: "Image-Guided Injection Therapy",
                    t: "01. Image-Guided Injection Therapy", 
                    quote: "Visual guidance for unmatched precision — safe, effective, and fast pain relief",
                    d: `All injections and procedures at our clinic are performed under real-time imaging guidance — never by feel alone.<br>Using ultrasound or C-arm fluoroscopy, we visualize the target site live, ensuring precise medication delivery to maximize therapeutic effect and minimize the risk of adverse events.<br><br><b>Ultrasound-Guided Injection:</b><br>Targeted lesions — including muscle tears, ligament injuries, and tendinopathies — are visualized in real time, enabling pinpoint delivery of regenerative and anti-inflammatory agents. (e.g., Prolotherapy, PDRN/DNA injection, Viscosupplementation)<br><br><b>C-arm Fluoroscopy-Guided Intervention:</b><br>For deep spinal and periarticular nerve pain, real-time fluoroscopic guidance enables precise needle placement to deliver anti-inflammatory agents that reduce nerve inflammation and edema — a highly effective non-surgical procedure. (SELD radiation reduction device installed on our C-arm unit)`, 
                    img: "images/treatment_injection.webp" 
                },
                { 
                    en: "Advanced Physical & Regenerative Therapy",
                    t: "02. Advanced Physical & Regenerative Therapy", 
                    quote: "Non-surgical regenerative care with university hospital-grade high-end equipment",
                    d: `Going well beyond conventional heat therapy, we operate state-of-the-art, university hospital-grade devices to induce genuine tissue regeneration and manage refractory chronic pain conditions.<br><br><b>Extracorporeal Shock Wave Therapy (ESWT — Focused / Radial):</b><br>Delivers concentrated acoustic energy to the affected tissue, stimulating neovascularization and promoting the regeneration of bone, tendon, and connective tissue.<br><br><b>High-Intensity Laser Therapy (HILT):</b><br>Delivers high-energy laser penetration to deep tissues — well beyond the reach of standard lasers — providing rapid pain relief and accelerating the repair of damaged ligaments and cartilage.<br><br><b>Scrambler Therapy (Pain Scrambler):</b><br>A next-generation neuromodulation treatment that converts pathological pain signals — including chronic and neuropathic pain refractory to medication — into non-pain signals transmitted to the brain, effectively reprogramming the pain experience.<br><br><b>Magnetic Field Therapy:</b><br>Utilizes powerful magnetic fields that penetrate deep into the body to stimulate nerve cells, relieve muscle tension, and alleviate pain.`, 
                    img: "images/treatment_modality.webp" 
                },
                { 
                    en: "Manual Therapy & Therapeutic Exercise",
                    t: "03. Manual Therapy & Therapeutic Exercise", 
                    quote: "Restoring physical balance to prevent recurrence — the fundamental solution",
                    d: `The disappearance of pain does not mean treatment is complete. Under precise prescription from our rehabilitation specialist, our expert therapists work to restore function, correct dysfunctional posture and movement patterns, and prevent recurrence.<br><br><b>One-on-One Manual Therapy:</b><br>Our certified manual therapists use skilled hands-on techniques to mobilize restricted joints, restore spinal and pelvic alignment, and address the structural contributors to pain.<br><br><b>Individualized Therapeutic Exercise:</b><br>A clinically essential component of recovery — strengthening weakened muscles, restoring joint range of motion, and safely guiding patients back to daily activities and sports performance.`, 
                    img: "images/treatment_manual.webp" 
                }
            ] 
        },
        // 05. Cell Therapy (PRP)
        prp: { 
            title: "Cell Therapy (PRP)", 
            desc: "<strong>\"Awakening the Body's Own Healing Power from Within\"</strong><br>PRP (Platelet-Rich Plasma) therapy is a cutting-edge regenerative treatment that concentrates the growth factors responsible for healing and tissue repair from the patient's own blood,<br>then delivers them directly to the site of damaged ligaments, tendons, or cartilage.<br><br><strong>[Key Benefits]</strong><br>• <b>Safety:</b> Derived entirely from the patient's own blood, carrying exceptionally low risk of adverse reactions<br>• <b>Root-Cause Treatment:</b> Actively regenerates and strengthens weakened tissue itself<br>• <b>Powerful Regeneration:</b> Growth factors concentrated 3–5× above normal blood levels amplify the body's innate healing capacity", 
            modalImg: "images/prp.webp"
        },
        // 06. Contact/Location
        contact: { 
            title: "Contact & Location", 
            desc: "Patient-centered care.<br>Seoul Bone Pain Clinic is committed to providing<br>the highest standard of medical care for your recovery.", 
            mapEmbed: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.664609756667!2d127.00938361531086!3d37.55360667979986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca33a26d79a29%3A0x8e8335555c5c000!2z7JW97IiY7Jet!5e0!3m2!1sko!2skr!4v1646200000000!5m2!1sko!2skr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
            modalImg: "images/contact.webp", 
            details: [ 
                {t:"Clinic Hours", d:"Weekdays 09:00 AM – 07:00 PM / Sat 09:00 AM – 01:00 PM", img:"images/contact_hours.webp"}, 
                {t:"Lunch Break", d:"01:00 PM – 02:00 PM (No lunch break on Saturdays)", img:"images/contact_hours.webp"}, 
                {t:"Location", d:"Yaksu Station, Exit 6 (1 min walk)", img:"images/contact_loc.webp"}, 
                {t:"Parking", d:"Mechanical parking available in building", img:"images/contact_parking.webp"} 
            ] 
        }
    }
};
