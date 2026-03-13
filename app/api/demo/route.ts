import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createApproval, createActivity } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const currentUser = getCurrentUser(request);
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Sample approval items
    const sampleApprovals = [
      {
        agentType: 'salesAgent',
        content: `Subject: Follow-up on Your Interest in Our Services

Hi [Name],

I hope this email finds you well. I wanted to follow up on your recent inquiry about our med spa services.

Based on your interest in facial treatments, I'd love to schedule a complimentary consultation where we can discuss your skincare goals and create a personalized treatment plan.

Our current promotions include:
- 20% off first facial treatment
- Free consultation with our lead aesthetician
- Complimentary skin analysis

Would you be available for a quick 15-minute call this week? I have openings on Tuesday and Thursday afternoon.

Best regards,
Sarah - GrowIQ Sales Agent`,
      },
      {
        agentType: 'reviewAgent',
        content: `Hi [Customer Name],

Thank you for choosing our services! We hope you had a wonderful experience with us.

Would you mind taking a moment to share your experience with others? Your review helps us continue providing excellent service and helps other potential clients learn about what we offer.

You can leave a review on:
- Google: [link]
- Yelp: [link]  
- Facebook: [link]

If you experienced any issues during your visit, please let us know directly so we can address them immediately.

Thank you for your time!

Best,
Review Management Team`,
      },
      {
        agentType: 'followUpAgent',
        content: `Hi [Name],

It's been 3 weeks since your last facial treatment with us. How has your skin been feeling?

As a valued client, I wanted to remind you that regular treatments every 4-6 weeks help maintain optimal results. 

Would you like to schedule your next appointment? I can offer you a 10% loyalty discount for booking within the next week.

Some popular follow-up treatments for your skin type:
- Hydrafacial for deep cleansing
- Chemical peel for skin renewal
- LED therapy for anti-aging

Reply to this email or call us at [phone] to schedule.

Best,
[Your Spa Name] Follow-up Team`,
      },
    ];

    // Create sample approvals
    const createdApprovals = [];
    for (const approval of sampleApprovals) {
      const created = await createApproval(currentUser.id, approval.agentType, approval.content);
      createdApprovals.push(created);
    }

    // Create some sample activity
    const sampleActivities = [
      { agentType: 'salesAgent', message: 'New lead captured from website contact form - Jane Smith interested in Botox consultation' },
      { agentType: 'supportAgent', message: 'Responded to customer inquiry about appointment rescheduling' },
      { agentType: 'reviewAgent', message: 'Review request sent to 3 recent customers' },
      { agentType: 'followUpAgent', message: 'Follow-up sequence initiated for 5 prospects who showed interest but haven\'t booked' },
      { agentType: 'salesAgent', message: 'Appointment booked - John Doe scheduled for facial consultation on Friday 2PM' },
      { agentType: 'supportAgent', message: 'Handled 12 chat conversations with 89% customer satisfaction' },
    ];

    for (const activity of sampleActivities) {
      await createActivity(currentUser.id, activity.agentType, activity.message);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Demo data created successfully',
      approvals: createdApprovals.length,
      activities: sampleActivities.length,
    });
  } catch (error: any) {
    console.error('Demo data creation error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}