import { useState } from 'react'

export function CardSubscription({
  isPro = false 
}:{
  isPro: boolean
}) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const session = await response.json();
        
        window.location.href = session.url;
      } else {
        console.error('Error creating checkout session on Stripe.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className='bg-gray-200 rounded p-4 flex flex-col items-center mb-12 md:flex-row md:gap-64 lg:flex-row lg:gap-64'>
      <div>
        <h3 className='font-bold mb-2'>
          Learn even more!
        </h3>
        <p>
          Unclock premium features <br />
          only for $9.99 per month.
        </p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className='bg-black rounded text-white mt-4 p-2 px-12'>
          {isPro ? 'You are already pro' : 'Upgrade'}
        </button>
      </div>
      <img
        src='https://cdn-icons-png.flaticon.com/128/4185/4185361.png'
        className='w-24 mt-8 md:mt-0 lg:mt-0'
      />
    </div>
  )
}
