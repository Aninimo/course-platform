import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth, RequireAuthProp } from '@clerk/nextjs/api';
import Stripe from 'stripe';

import prismadb from '../../lib/prismadb';

const stripe = new Stripe('sk_test_51OZsqODFv5B1ocuyaDk7xstegveApUAXhOQgVr0Xo65xG2Gju8nraFA6h1h2cMBZskUDVUIVvaCEPCaKAKKlYj8d002oyi93LJ', {
  apiVersion: '2023-10-16'
});

export default requireAuth(async (
  req: RequireAuthProp<NextApiRequest>,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const { userId } = req.auth;

      const session = await stripe.checkout.sessions.create({
        success_url: `${req.headers.origin}/`,
        cancel_url: `${req.headers.origin}`,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        line_items: [{
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Pro',
            },
            unit_amount: 990,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        }],
        metadata: {
          userId,
        },
      });

      const existingSubscription = await prismadb.subscription.findUnique({
        where: { userId: userId },
      });

      if (existingSubscription) {
        await prismadb.subscription.update({
          where: { userId: userId },
          data: {
            status: 'active',  
          },
        });
      } else {
        await prismadb.subscription.create({
          data: {
            userId: userId,
            status: 'active',  
          },
        });
      }
      res.status(200).json(session);
    } catch (error) {
      console.error('Error creating checkout session on Stripe:', error);
      res.status(500).json({
        message: error instanceof Error ? error.message : null,
      });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});
