import type { Stripe } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'

let stripePromise: Stripe

const getStripe = async () => {
  if (!stripePromise) {
    // @ts-ignore
    stripePromise = new loadStripe(process.env.STRIPE_PUBLIC_KEY)
  }

  return stripePromise
}

export default getStripe
