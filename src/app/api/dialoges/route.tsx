import { NextResponse } from 'next/server';

export async function GET() {
  const dialoges = [
    {
      id: 1,
      slug: 'arpanarghya-saha-nimf-digital-first',
      quote:
        'Arpanarghya Saha, Chief Digital Officer at Nippon India Mutual Fund (NIMF), is an industry veteran with 24 years of experience spanning e-commerce, BFSI, and retail. At NIMF, Arpan sparked a digital-first mindset through iterative delivery.',
      author: 'Sendil Kumar Venkatesan',
      role: 'Chief Digital Officer at Nippon India Mutual Fund (NIMF)',
      avatar: '/assets/dialoges/ArpanarghyaSaha.png',
    },
    {
      id: 2,
      slug: 'future-of-aviation-tech-and-sustainability',
      quote:
        'Foresees an exciting future for the aviation sector driven by high-tech, omnipresent customer experiences, contactless technologies, and sustainable operating models reshaping the future of flying.',
      author: 'Vinod Bhat',
      role: 'CIO of Vistara Airlines',
      avatar: '/assets/dialoges/VinodBhat.png',
    },
    {
      id: 3,
      slug: 'cios-driving-digital-business-innovation',
      quote:
        'CIO Dialogues helped broaden my perspective and connected me with peers facing similar challenges in technology leadership.',
      author: 'Ashok Nayak',
      role: 'CIO of Ipca Laboratories',
      avatar: '/assets/dialoges/AshokNayak.png',
    },
    {
      id: 4,
      slug: 'cybersecurity-strategy-for-banking-and-finance',
      quote:
        'Cybersecurity is an essential component of any organization’s business strategy, and an efficient security strategy can help reduce risk in the banking and finance sector.',
      author: 'Ninad Varadkar',
      role: 'Group CISO, Edelweiss Financial Services Ltd ',
      avatar: '/assets/dialoges/NinadVaradkar.png',
    },
    {
      id: 5,
      slug: 'cios-as-strategic-business-partners',
      quote:
        'A global turnaround leader and entrepreneur discussing how CIOs must evolve into strategic business partners in the digital age.',
      author: 'Nitin Seth',
      role: 'CEO, Incedo',
      avatar: '/assets/dialoges/NitinSeth.png',
    },
    {
      id: 6,
      slug: 'building-a-technology-roadmap-for-success',
      quote:
        'Shares insights about key priorities while building the company’s technology roadmap for success.',
      author: 'Kunal Mehta',
      role: ' Global CTO, Fabindia',
      avatar: '/assets/dialoges/KunalMehta.png',
    },
    {
      id: 7,
      slug: 'accelerating-digital-transformation-for-cxos',
      quote:
        'Explains how enterprises can accelerate digital transformation efforts and how CXOs can thrive as digital leaders.',
      author: 'Rahul Ghodke',
      role: 'Editorial Team',
      avatar: '/assets/dialoges/RahulGhodke.png',
    },
    {
      id: 8,
      slug: 'data-driven-business-and-evolving-cios',
      quote:
        'Discusses how data has become one of the essential pillars of business operations and the evolving role of CIOs in a data-driven era.',
      author: ' Kiran Komatla',
      role: 'Group CTO, Restaurant Brands Asia',
      avatar: '/assets/dialoges/KiranKomatla.png',
    },
    {
      id: 9,
      slug: 'leadership-transitions-driving-enterprise-transformation',
      quote:
        'Highlights leadership transitions and executive movements shaping digital and operational transformation in enterprises..',
      author: 'Rishi Sareen',
      role: 'Chief Operating Officer, DTDC Express',
      avatar: '/assets/dialoges/RishiSareen.png',
    },
    {
      id: 10,
      slug: 'leadership-transformation-and-business-growth',
      quote:
        'Focuses on leadership transformation and  strategic business growth driven by experienced industry leaders.',
      author: 'Raghunath Bal',
      role: 'Global Head, Cumii Fine Sciences (CFS)',
      avatar: '/assets/dialoges/RaghunathBal.png',
    },
    {
      id: 11,
      slug: 'cybersecurity-and-secure-digital-transformation',
      quote:
        'shares insights on cybersecurity, IT leadership, and building secure digital transformation strategies in the financial sector.',
      author: 'Devinder Singh',
      role: 'Sr. VP IT & CISO, Religare Broking',
      avatar: '/assets/dialoges/DevinderSingh.png',
    },
  ];

  return NextResponse.json(dialoges);
}
