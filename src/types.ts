export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  outcome: string;
  description: string;
  iconName: string;
}

export interface ScenarioItem {
  id: string;
  category: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  useCase: string;
  metrics: string;
}

export interface DialogueNode {
  id: string;
  speaker: "sam" | "caller" | "system";
  text: string;
  options?: Array<{
    text: string;
    nextNodeId: string;
  }>;
}

export interface MockCallSimulation {
  industry: string;
  nodes: Record<string, DialogueNode>;
}

export const FAQs: FAQItem[] = [
  {
    question: "Will it feel robotic to my patients or clients?",
    answer: "Not at all. Sam is built using state-of-the-art conversational voice synthesis that breathes, inflects, and pauses naturally. We configure a conversational cadence tailored to healthcare and aesthetic clinics—polite, clear, and professional. In fact, most callers do not realize they are speaking to an AI until the final live booking confirmation is generated."
  },
  {
    question: "Is our clinic scheduling too complex for an AI to handle?",
    answer: "We specialize in custom rule-mapping. During the onboarding phase, we map out all your appointment types, provider availability constraints, buffer time rules, and medical intake guidelines. If an appointment requires a complex combination of factors, Sam recognizes this immediately and routes the caller to your desk or takes their details for a priority call-back."
  },
  {
    question: "We already have an answering service — how is this different?",
    answer: "Traditional answering services are expensive, prone to human error, and usually just take basic written messages that they email to you. Sam does not just take messages; he actively books appointments directly into your Google Calendar (or Jane, Dentrix, etc.) in real-time, instantly text-confirms the booking with the patient, and can answer complex questions about your treatments 24/7/365."
  },
  {
    question: "Is patient/client data secure?",
    answer: "Security and compliance are our absolute top priorities. Flow AI's systems are fully compliant with standard data protection protocols. All call records, transcriptions, and customer data are fully encrypted at rest and in transit. We can also configure automatic data-purging rules to align with your practice's specific retention policies."
  },
  {
    question: "What if the AI can't handle a complex or urgent question?",
    answer: "Sam is equipped with safety boundaries. If a caller describes a clinical emergency, asks an highly specific medical diagnostic question, or insists on speaking to human staff, Sam smoothly transitions: 'I want to make sure we handle this perfectly for you. Let me transfer you directly to our front-desk manager, or have them call you back on this number immediately.' We configure these smart escalation protocols to fit your desk exactly."
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. We believe in earning your trust month-over-month. All our services are on a transparent month-to-month agreement. If Sam does not save your staff hours of manual work and recover multiple times his cost in booked clinics, you can cancel at any time with 30 days notice."
  }
];

export const FEATURES: FeatureItem[] = [
  {
    title: "Natural Voice Conversation",
    outcome: "Higher Trust, Higher Clinic Booking Rates",
    description: "Speaks with human-like, polite, and responsive voice intelligence. No robotic pre-recorded menus or tedious keypress options. It flows just like a real phone call.",
    iconName: "PhoneCall"
  },
  {
    title: "Automatic Calendar Sync",
    outcome: "Zero Manual Booking Overhead",
    description: "Sam syncs with Google Calendar, Jane App, Dentrix, or Mindbody in real-time. It checks live availability, respects treatment buffers, and books directly without double-booking.",
    iconName: "Calendar"
  },
  {
    title: "Instant SMS & Email Confirmations",
    outcome: "Dramatically Reduce Patient No-Shows",
    description: "As soon as Sam schedules a call, the caller instantly receives a personalized text and email confirmation with calendar add-on links and clinic address details.",
    iconName: "Send"
  },
  {
    title: "Missed-Call Auto-Rescue SMS",
    outcome: "Rescue Leads Before They Call Competitors",
    description: "If your primary lines are busy and an inbound caller hangs up, Flow AI instantly shoots them a polite SMS: 'Sorry we missed your call! I can help you book right here...' with a custom reservation link.",
    iconName: "ShieldAlert"
  },
  {
    title: "Smart Memory & Clinic Context",
    outcome: "VIP Treatment for Return Patients",
    description: "Sam remembers returning patients, greeting them by name and accessing previous appointment types to speed up bookings and make patients feel valued.",
    iconName: "Database"
  },
  {
    title: "Call Transcripts & AI Summaries",
    outcome: "100% Operational Transparency",
    description: "Every single call is securely recorded and instantly transcribed. Your front-desk gets an automated bullet-point summary emailed to them with clear action items.",
    iconName: "FileText"
  },
  {
    title: "Real-time Metrics Dashboard",
    outcome: "Track Calls, Bookings, and ROI Daily",
    description: "Log in to a premium, minimal dashboard to see how many calls came in, appointments booked, peak-hour trends, and estimated recovered clinic revenue.",
    iconName: "TrendingUp"
  },
  {
    title: "Custom Escalation Protocols",
    outcome: "Complete Operational Safety",
    description: "We train Sam on your specific clinic guardrails. If a call requires urgent triage, a complex medical query, or human warmth, Sam executes a seamless live transfer.",
    iconName: "UserCheck"
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "medspa",
    name: "MedSpas & Aesthetic Clinics",
    iconName: "Sparkles",
    tagline: "Secure high-value consultation bookings instantly.",
    useCase: "Sam answers FAQs on Botox/fillers, explains downtime/pre-care guidelines, qualifies lead inquiries, and books premium cosmetic consults 24/7.",
    metrics: "Average appointment value: $450 - $1,200"
  },
  {
    id: "dental",
    name: "Dental Clinics",
    iconName: "Smile",
    tagline: "Fill the hygienist chairs during morning and peak hours.",
    useCase: "Sam handles routine cleanings, tooth pain triage, recalls, and emergency booking requests during busy Monday mornings and after-hours.",
    metrics: "Patient lifetime value: $1,500 - $4,000"
  },
  {
    id: "dermatology",
    name: "Dermatology Practices",
    iconName: "Heart",
    tagline: "Streamline medical and cosmetic scheduling.",
    useCase: "Sam screens for insurance eligibility, schedules medical skin checks or cosmetic laser appointments, and manages pre-procedure reminders.",
    metrics: "Average booking conversion: Up 32%"
  },
  {
    id: "beauty",
    name: "Beauty & Wellness Clinics",
    iconName: "Flower",
    tagline: "Capture late-night bookings without front-desk burnout.",
    useCase: "Sam books custom skincare facials, laser hair removal sessions, and manages deposit payments via auto-sent secure SMS payment links.",
    metrics: "After-hours bookings captured: 24%"
  }
];

export const ILLUSTRATIVE_SCENARIOS: ScenarioItem[] = [
  {
    id: "sc-1",
    category: "AFTER-HOURS LEAD RESCUE",
    title: "The Sunday Night Laser Consult",
    problem: "A prospective patient sees a MedSpa's Instagram ad at 9:30 PM on Sunday. She calls with a quick question about chemical peel downtime. In most clinics, this goes to voicemail. She hangs up and clicks a competitor's ad instead.",
    solution: "Flow AI answers on the first ring. Sam explains the 2-day recovery time, confirms they have an opening on Tuesday afternoon, and books her into the calendar.",
    result: "A $650 treatment booked, confirmed, and synced before the clinic staff even opens their emails on Monday morning."
  },
  {
    id: "sc-2",
    category: "MONDAY MORNING FLOOD",
    title: "Managing the Peak Hour Overflow",
    problem: "Monday at 9:00 AM, the dental front desk is checking in 3 patients, processing insurance, and the phone is ringing constantly. Two inbound calls are missed while staff is speaking to in-person patients.",
    solution: "Flow AI acts as the backup receptionist. After 2 rings at the front desk, the overflow calls are routed to Sam, who books a hygiene cleaning and answers a parking FAQ.",
    result: "Zero hold times for callers, zero stress for front-desk staff, and two appointments secured that would have otherwise gone to voicemail."
  },
  {
    id: "sc-3",
    category: "FAST LEAD FOLLOW-UP",
    title: "Missed-Call Auto-Rescue",
    problem: "An active dermatology lead calls at lunch. The line is busy. They hang up immediately. Research shows 67% of callers won't leave a message; they will simply call the next listing on Google.",
    solution: "Within 45 seconds of the call drop, Flow AI's automated SMS agent shoots a message: 'Hi! So sorry we missed you. I can help you schedule your skin check right here: [link]'.",
    result: "The lead clicks the link, answers 3 qualification questions, and books a Thursday morning spot. An otherwise lost patient rescued in under 5 minutes."
  }
];

export const MOCK_SIMULATIONS: Record<string, MockCallSimulation> = {
  medspa: {
    industry: "MedSpas & Aesthetic Clinics",
    nodes: {
      start: {
        id: "start",
        speaker: "system",
        text: "Inbound call to Glow Aesthetic Spa... (Click below to start)",
        options: [
          { text: "📞 Click to Ring Sam", nextNodeId: "sam_greet" }
        ]
      },
      sam_greet: {
        id: "sam_greet",
        speaker: "sam",
        text: "Thank you for calling Glow Aesthetic Spa! This is Sam on the digital desk. I can help you answer service questions or book an appointment. What can I do for you today?",
        options: [
          { text: "Hi, I wanted to ask about your Botox treatment pricing.", nextNodeId: "botox_query" },
          { text: "Do you have any openings for a chemical peel this week?", nextNodeId: "peel_query" }
        ]
      },
      botox_query: {
        id: "botox_query",
        speaker: "sam",
        text: "Of course! Our Botox treatments are performed by our certified nurse injectors and are $14 per unit. For new patients, we always recommend starting with a complimentary 15-minute consultation to map your goals. Would you like to schedule that cosmetic consultation?",
        options: [
          { text: "Yes, that sounds perfect. What times do you have?", nextNodeId: "ask_time" },
          { text: "Is there any downtime after Botox? I have an event this weekend.", nextNodeId: "botox_downtime" }
        ]
      },
      botox_downtime: {
        id: "botox_downtime",
        speaker: "sam",
        text: "Great question! Botox has practically zero downtime. You might have some tiny red dots at the injection sites that disappear in about 15 minutes, but you can go right back to work. Just avoid heavy exercise for 24 hours. Shall we look at booking your consultation?",
        options: [
          { text: "Yes, let's schedule it.", nextNodeId: "ask_time" }
        ]
      },
      peel_query: {
        id: "peel_query",
        speaker: "sam",
        text: "Excellent choice! For our chemical peels, we have two openings left this week: Wednesday at 2:00 PM or Thursday morning at 10:30 AM. Do either of those work for your schedule?",
        options: [
          { text: "Wednesday at 2:00 PM works perfectly for me.", nextNodeId: "confirm_details" },
          { text: "Thursday at 10:30 AM is better.", nextNodeId: "confirm_details" }
        ]
      },
      ask_time: {
        id: "ask_time",
        speaker: "sam",
        text: "Wonderful! Checking our live calendar for this week... I have an opening tomorrow afternoon at 3:15 PM, or Friday morning at 9:00 AM. Which one fits your schedule?",
        options: [
          { text: "Tomorrow at 3:15 PM is great.", nextNodeId: "confirm_details" },
          { text: "Friday morning at 9:00 AM please.", nextNodeId: "confirm_details" }
        ]
      },
      confirm_details: {
        id: "confirm_details",
        speaker: "sam",
        text: "Perfect! I've locked in that slot for you. To complete your reservation and send you the text confirmation with pre-care instructions, could you please tell me your first and last name, and your mobile number?",
        options: [
          { text: "Sure! It's Sarah Jenkins, 555-0199.", nextNodeId: "success" }
        ]
      },
      success: {
        id: "success",
        speaker: "system",
        text: "✅ BOOKING SUCCESSFUL! • Sam synced with Google Calendar • Sent confirmation SMS to 555-0199 • Glow Spa staff received real-time email notification. (Click below to restart)",
        options: [
          { text: "🔄 Reset Simulation", nextNodeId: "start" }
        ]
      }
    }
  },
  dental: {
    industry: "Dental Clinics",
    nodes: {
      start: {
        id: "start",
        speaker: "system",
        text: "Inbound call to Riverside Dental Practice... (Click below to start)",
        options: [
          { text: "📞 Click to Ring Sam", nextNodeId: "sam_greet" }
        ]
      },
      sam_greet: {
        id: "sam_greet",
        speaker: "sam",
        text: "Hello! Thank you for calling Riverside Dental. This is Sam. I can help you book cleanings, handle scheduling questions, or lookup your file. Are you a new or returning patient?",
        options: [
          { text: "I'm a new patient and need to book a routine cleaning and checkup.", nextNodeId: "new_patient" },
          { text: "I'm having some tooth pain and need an emergency appointment.", nextNodeId: "emergency_triage" }
        ]
      },
      new_patient: {
        id: "new_patient",
        speaker: "sam",
        text: "Welcome to our practice! We would love to take care of your smile. Our initial comprehensive exam, cleaning, and digital x-rays take about an hour. Do you have dental insurance you'd like us to bill?",
        options: [
          { text: "Yes, I have Delta Dental.", nextNodeId: "insurance_check" },
          { text: "No, I'll be self-paying.", nextNodeId: "insurance_check" }
        ]
      },
      insurance_check: {
        id: "insurance_check",
        speaker: "sam",
        text: "Got it! We accept Delta Dental, Cigna, and several self-pay wellness plans. I have some openings for next week: Monday at 11:00 AM or Thursday afternoon at 2:30 PM. Would either of those fit your routine?",
        options: [
          { text: "Monday at 11:00 AM works well.", nextNodeId: "confirm_details" },
          { text: "Thursday at 2:30 PM is better.", nextNodeId: "confirm_details" }
        ]
      },
      emergency_triage: {
        id: "emergency_triage",
        speaker: "sam",
        text: "Oh, I'm so sorry to hear you're in pain. To help me find the right urgency, are you experiencing any swelling in your jaw or face, or is it mostly sensitivity to hot and cold?",
        options: [
          { text: "No swelling, but it hurts constantly when I bite down.", nextNodeId: "emergency_book" },
          { text: "Yes, my left cheek is quite swollen and I have a fever.", nextNodeId: "escalation" }
        ]
      },
      emergency_book: {
        id: "emergency_book",
        speaker: "sam",
        text: "Thank you for describing that. We keep special emergency slots open every day. I can fit you in today at 1:30 PM with Dr. Reynolds to get that tooth evaluated. Shall I lock that in for you?",
        options: [
          { text: "Yes, please do! Thank you so much.", nextNodeId: "confirm_details" }
        ]
      },
      escalation: {
        id: "escalation",
        speaker: "sam",
        text: "Swelling and a fever can indicate an acute infection, which we need to treat immediately. I am going to initiate a priority transfer directly to our lead nurse at the clinic desk right now. Please hold just a moment while I patch you through...",
        options: [
          { text: "✅ Smart Escalation Simulated Successfully (Reset)", nextNodeId: "start" }
        ]
      },
      confirm_details: {
        id: "confirm_details",
        speaker: "sam",
        text: "Wonderful. I have that spot held. Can I get your full name and the phone number where I can text you our intake forms?",
        options: [
          { text: "It's Marcus Vance, 555-0812.", nextNodeId: "success" }
        ]
      },
      success: {
        id: "success",
        speaker: "system",
        text: "✅ APPOINTMENT SCHEDULED! • Sam synchronized with Dentrix calendar • Intake text sent to Marcus's phone • Front desk screen updated instantly. (Click to reset)",
        options: [
          { text: "🔄 Reset Simulation", nextNodeId: "start" }
        ]
      }
    }
  }
};
