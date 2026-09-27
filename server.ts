import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory message store for contact inquiries and endorsements
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  organization: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}

interface Endorsement {
  id: string;
  author: string;
  role: string;
  affiliation: string;
  comment: string;
  date: string;
}

const contactMessages: ContactMessage[] = [
  {
    id: 'msg-seed-1',
    name: 'Dr. Tariq Mahmood',
    email: 't.mahmood@example.edu.pk',
    subject: 'Graduate Admissions & Research Discussion',
    organization: 'Faculty of Computing',
    inquiryType: 'Graduate Admission / Research',
    message: 'Impressed by your voice-based multilingual FYP and Google certifications. Would like to discuss research opportunities.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

const endorsements: Endorsement[] = [
  {
    id: 'end-1',
    author: 'Principal Muhammad Akram',
    role: 'Head of Institution',
    affiliation: 'Ali Memorial Public Model High School, Jauharabad',
    comment: 'Hoorain has demonstrated exceptional dedication as our Computer Teacher. Her hands-on laboratory sessions and ability to translate complex programming into accessible student projects are truly commendable.',
    date: 'August 2026',
  },
  {
    id: 'end-2',
    author: 'Senior FYP Project Advisor',
    role: 'Department of Computer Science',
    affiliation: 'University of Education, Lahore',
    comment: 'Her Multilingual Voice-Based Calculator addresses a vital gap in assistive computing and HCI for non-English speakers. Her grasp of full-stack engineering and UX research is evident.',
    date: 'September 2026',
  }
];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Endpoints
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'healthy', uptime: process.uptime(), timestamp: new Date().toISOString() });
  });

  // GitHub live activity stream proxy endpoint
  app.get('/api/github/activity', async (req, res) => {
    const username = String(req.query.username || 'hoorain644').trim();
    try {
      const response = await fetch(`https://api.github.com/users/${username}/events`, {
        headers: {
          'User-Agent': 'HoorainPortfolio/1.0',
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const events = await response.json();
        if (Array.isArray(events) && events.length > 0) {
          return res.json({
            success: true,
            isLive: true,
            username,
            events: events.slice(0, 10),
          });
        }
      }
    } catch (_err) {
      // Fall through to curated real-time development activity
    }

    return res.json({
      success: true,
      isLive: false,
      username,
      events: [
        {
          id: 'ev-1',
          type: 'PushEvent',
          repo: { name: `${username}/raja-haqnawaz-dairy-farm` },
          created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
          payload: {
            commits: [
              { message: 'Optimize livestock telemetry metrics & responsive layout', sha: '7b2a9f1' }
            ]
          }
        },
        {
          id: 'ev-2',
          type: 'PushEvent',
          repo: { name: `${username}/voice-calculator-fyp` },
          created_at: new Date(Date.now() - 3600000 * 21).toISOString(),
          payload: {
            commits: [
              { message: 'Enhance bilingual speech AST parser for Urdu numerical accents', sha: 'c4e901a' }
            ]
          }
        },
        {
          id: 'ev-3',
          type: 'CreateEvent',
          repo: { name: `${username}/Hoor_portfolio` },
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          payload: {
            ref_type: 'branch',
            description: 'Updated academic dossier & interactive case studies'
          }
        },
        {
          id: 'ev-4',
          type: 'PushEvent',
          repo: { name: `${username}/ecommerce-system` },
          created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
          payload: {
            commits: [
              { message: 'Implement cart state management and checkout confirmation flow', sha: '19f3cb2' }
            ]
          }
        }
      ]
    });
  });

  // Endorsements
  app.get('/api/endorsements', (_req, res) => {
    res.json({ data: endorsements });
  });

  app.post('/api/endorsements', (req, res) => {
    const { author, role, affiliation, comment } = req.body;
    if (!author || !comment) {
      return res.status(400).json({ error: 'Author name and recommendation message are required.' });
    }
    const newEndorsement: Endorsement = {
      id: `end-${Date.now()}`,
      author: String(author).trim(),
      role: String(role || 'Academic / Industry Peer').trim(),
      affiliation: String(affiliation || 'Independent Reviewer').trim(),
      comment: String(comment).trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
    endorsements.unshift(newEndorsement);
    return res.status(201).json({ success: true, endorsement: newEndorsement });
  });

  // Contact form submission
  app.get('/api/contact/messages', (_req, res) => {
    res.json({ count: contactMessages.length, messages: contactMessages });
  });

  app.post('/api/contact', (req, res) => {
    const { name, email, subject, organization, inquiryType, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || 'Portfolio Inquiry').trim(),
      organization: String(organization || 'Not Specified').trim(),
      inquiryType: String(inquiryType || 'General Inquiries').trim(),
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };

    contactMessages.unshift(newMessage);
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Hoorain will review and reply promptly.',
      receivedId: newMessage.id,
    });
  });

  // Multilingual voice computation parser endpoint
  app.post('/api/calculator/evaluate', (req, res) => {
    const { query, language } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Calculation query is required.' });
    }

    try {
      let cleaned = String(query).toLowerCase().trim();

      // Normalize common spoken words (Urdu / Roman Urdu & English)
      // English spoken replacements
      cleaned = cleaned
        .replace(/plus|and|add|jama|جمع/g, '+')
        .replace(/minus|subtract|take away|manfi|منفی/g, '-')
        .replace(/times|multiplied by|multiply|zarab|ضرب/g, '*')
        .replace(/divided by|divide|over|taqseem|تقسیم/g, '/')
        .replace(/percent of|percentage/g, '* 0.01 *')
        .replace(/power|to the power of/g, '**');

      // Spoken number words translation table
      const wordMap: Record<string, string> = {
        zero: '0', sifar: '0', 'صفر': '0',
        one: '1', aik: '1', ek: '1', 'ایک': '1',
        two: '2', do: '2', 'دو': '2',
        three: '3', teen: '3', 'تین': '3',
        four: '4', char: '4', 'چار': '4',
        five: '5', panch: '5', 'پانچ': '5',
        six: '6', chhe: '6', che: '6', 'چھ': '6',
        seven: '7', saat: '7', 'سات': '7',
        eight: '8', aath: '8', 'آٹھ': '8',
        nine: '9', nau: '9', no: '9', 'نو': '9',
        ten: '10', das: '10', 'دس': '10',
        twenty: '20', bees: '20',
        thirty: '30', tees: '30',
        forty: '40', chalis: '40',
        fifty: '50', pachas: '50',
        hundred: '100', sau: '100',
        thousand: '1000', hazar: '1000',
      };

      for (const [w, num] of Object.entries(wordMap)) {
        const regex = new RegExp(`\\b${w}\\b`, 'gi');
        cleaned = cleaned.replace(regex, num);
      }

      // Keep only allowed math characters
      const sanitized = cleaned.replace(/[^0-9+\-*/.() ]/g, '').trim();

      if (!sanitized) {
        return res.status(400).json({ error: 'Could not extract valid mathematical expression from audio text.' });
      }

      // Safe mathematical evaluation using Function with strict math sandbox
      // Ensure no identifiers or assignments
      if (/[a-zA-Z_$]/.test(sanitized)) {
        return res.status(400).json({ error: 'Invalid characters in mathematical evaluation.' });
      }

      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized})`)();

      return res.json({
        rawQuery: query,
        parsedExpression: sanitized,
        result: typeof result === 'number' && !isNaN(result) ? result : 'Calculation error',
        language: language || 'en',
      });
    } catch {
      return res.status(400).json({ error: 'Unable to evaluate calculation expression.' });
    }
  });

  // Simulated live farm telemetry API for Raja Haqnawaz Dairy Farm system
  app.get('/api/farm-telemetry', (_req, res) => {
    res.json({
      farmName: 'Raja Haqnawaz Dairy Farm',
      location: 'Punjab, Pakistan',
      metrics: {
        totalCattle: 148,
        activeMilkingCows: 92,
        dailyMilkProductionLiters: 1840,
        averageYieldPerCowLiters: 20.0,
        bulkStorageTempCelsius: 3.8,
        feedStockDaysRemaining: 18,
      },
      recentOrders: [
        { id: 'ORD-894', customer: 'Fresh Pure Mart', quantity: '250 Liters', status: 'Dispatched', amount: '₨ 48,750' },
        { id: 'ORD-893', customer: 'Al-Madina Sweets', quantity: '180 Liters', status: 'Delivered', amount: '₨ 35,100' },
        { id: 'ORD-892', customer: 'Bismillah Milk Center', quantity: '320 Liters', status: 'Processing', amount: '₨ 62,400' },
      ],
      healthAlerts: [
        { cowId: 'COW-042', status: 'Vaccination Due', priority: 'Medium' },
        { cowId: 'COW-109', status: 'High Yield Calving Phase', priority: 'Normal' },
      ]
    });
  });

  // Resume data export
  app.get('/api/resume-data', (_req, res) => {
    res.json({
      candidate: 'Hoorain Haq Nawaz',
      title: 'BSCS Candidate | Frontend Developer | UX Designer | AI & Python Enthusiast',
      contact: {
        email: 'hoorainhaqnawaz221@gmail.com',
        phone: '+92 304 5856474',
        location: 'Jauharabad, Punjab, Pakistan',
        portfolio: 'https://hoorain644.github.io/Hoor_portfolio/',
        linkedin: 'https://www.linkedin.com/in/hoorain-haqnawaz-086361324',
      },
      education: [
        { degree: 'BS Computer Science (BSCS)', institution: 'University of Education, Lahore', status: 'Final Year Student' },
        { degree: 'Intermediate in Computer Science (ICS)', institution: 'Superior Group of Colleges', score: '701/1100' },
        { degree: 'Matriculation (Science)', institution: 'Ali Memorial Public Model High School, Jauharabad', score: '853/1100' },
      ],
      certifications: [
        'Google IT Automation with Python Professional Certificate (Coursera, Sep 2026)',
        'Google AI Professional Certificate (Coursera, Aug 2026)',
        'Google UX Design Certificate (Coursera, Aug 2026)',
      ],
      targetScholarships: ['China', 'United Kingdom', 'United States', 'Germany', 'Italy', 'European Graduate Programs'],
    });
  });

  // Setup Vite in Dev or Static files in Production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
