"use client";

import { motion } from "framer-motion";

interface Speaker {
  name: string;
  role: string;
  image: string;
}

interface JourneyEvent {
  step: string;
  id: string;
  title: string;
  day: string;
  date: string;
  time: string;
  stage: string;
  tag: string;
  speakers: Speaker[];
  description: string;
}

const journeyEvents: JourneyEvent[] = [
  {
    step: "01",
    id: "hair-show",
    title: "HAIR SHOW",
    day: "DAY 1",
    date: "18 August 2026",
    time: "16:00 — 21:30 WIB",
    stage: "Episode Hotel",
    tag: "Live Performance & Fashion Show",
    speakers: [
      { name: "Tony Tsai", role: "Color Expert", image: "/images/speaker-tony.png" },
      { name: "Shinichi Takahashi", role: "Cutting Expert", image: "/images/speaker-shinichi.png" },
    ],
    description:
      "Pertunjukan spektakuler seni rambut dari master stylist internasional dengan konsep visual futuristik, fashion show, dan live color transformation.",
  },
  {
    step: "02",
    id: "workshop",
    title: "WORKSHOP MASTERCLASS",
    day: "DAY 2",
    date: "19 August 2026",
    time: "09:00 — 18:00 WIB",
    stage: "Episode Hotel",
    tag: "Hands-on Practice & Certification",
    speakers: [
      { name: "Tony Tsai", role: "Color Expert", image: "/images/speaker-tony.png" },
      { name: "Shinichi Takahashi", role: "Cutting Expert", image: "/images/speaker-shinichi.png" },
    ],
    description:
      "Pelatihan teknis intensif dan mendalam. Pelajari secara langsung teknik pewarnaan modern, cutting presisi Jepang, dan rahasia styling.",
  },
];

export default function EventInfo() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-[#F9F9FA] overflow-hidden font-sans select-none" id="event-info">
      {/* Simple & Clean Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F9FA] via-[#FAFAFA] to-[#F9F9FA]" />
        {/* Subtle accent glow in top-left */}
        <div className="absolute top-0 left-0 w-full h-[400px] bg-[radial-gradient(ellipse_at_top_left,rgba(235,153,153,0.08),transparent_60%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#EB9999]/15 text-[#D86B6B] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-3">
            EVENT JOURNEY
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight uppercase">
            JADWAL ACARA
          </h2>
          <div className="w-12 h-1 bg-[#EB9999] mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Timeline Journey Track */}
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gray-200 hidden sm:block" />

          {/* Minimalist Journey Cards List */}
          <div className="space-y-10 md:space-y-12">
            {journeyEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8 md:gap-16`}
                >
                  {/* Clean Editorial Timeline Node */}
                  <div className="absolute left-[20px] md:left-1/2 top-8 -translate-x-1/2 z-20 hidden sm:flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#111111] text-white font-bold text-xs flex items-center justify-center shadow-sm border-[3px] border-[#F9F9FA]">
                      {event.step}
                    </div>
                  </div>

                  {/* High-End Editorial Style Card */}
                  <div className="w-full md:w-[calc(50%-3.5rem)] relative group">
                    <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500">
                      
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2 mb-6 border-b border-gray-100 pb-4">
                        <span className="px-3 py-1 bg-[#111111] text-white font-bold text-[10px] tracking-[0.2em] uppercase">
                          {event.day}
                        </span>
                        <span className="text-[11px] font-bold text-gray-400 tracking-[0.1em] uppercase">
                          {event.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-black text-[#111111] mb-3 tracking-tight">
                        {event.title}
                      </h3>

                      {/* Time & Stage */}
                      <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-bold text-gray-500 mb-6 uppercase tracking-wider">
                        <span>{event.time}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-[#D86B6B]">{event.stage}</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed font-medium mb-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* High-End Editorial Venue Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-white rounded-2xl border border-gray-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Venue Info Left */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-6 inline-block">
              <span className="px-3 py-1 bg-[#111111] text-white font-bold text-[10px] tracking-[0.2em] uppercase">
                OFFICIAL VENUE
              </span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-[0.9] mb-4">
              EPISODE<br />
              <span className="text-gray-300">HOTEL</span>
            </h3>
            
            <p className="text-sm text-[#D86B6B] font-bold tracking-widest uppercase mb-2">
              Gading Serpong
            </p>
            <p className="text-xs md:text-sm text-gray-500 font-medium max-w-sm mb-10 leading-relaxed">
              Jl. Gading Serpong Boulevard Barat Blok S No. 6-7, Tangerang, Banten 15810
            </p>

            <div>
              <a
                href="https://maps.google.com/?q=Episode+Hotel+Gading+Serpong"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 bg-[#111111] text-white font-bold text-[10px] tracking-widest uppercase hover:bg-[#D86B6B] transition-colors"
              >
                <span>Buka Google Maps</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Embedded Map Right */}
          <div className="w-full lg:w-1/2 h-[300px] lg:h-auto min-h-[350px] border-t lg:border-t-0 lg:border-l border-gray-100 bg-gray-50 relative">
            <iframe
              title="Lokasi Episode Hotel Gading Serpong"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.195669389242!2d106.62677937587848!3d-6.237976861081545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbdf61864197%3A0xc3b8364cae8cf596!2sEpisode%20Gading%20Serpong!5e0!3m2!1sen!2sid!4v1710000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}