import React from 'react'

const TearmsAndCondition = () => {
  return (
    <div className='border p-4 shadow-sm rounded-sm'>
      <div>
        <h1 className='border-b text-xl font-bold text-gray-800 py-2'>Cookies Policy</h1>
      </div>
      <div className='text-gray-800 py-5'>
        <ul>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              1. *What Are Cookies:*
            </h1>
            <p className='text-base'>
              Cookies are small text files that enhance your website experience. We use essential, analytical, functional and advertising cookies.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              2. *Your Control Over Cookies:*
            </h1>
            <p className='text-base'>
              You can control cookie preferences in your browser settings. Note that disabling certain cookies may affect website functionality.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              3. *Third-Party Cookies:*
            </h1>
            <p className='text-base'>
              We use third-party services like analytics and advertising partners, ensuring they align with our privacy standards.</p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              4. *How We Use Cookies:*
            </h1>
            <p className='text-base'>
              Cookies help analyze user behavior, improve services and provide a personalized experience. No personally identifiable information is collected without explicit consent.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              5. *Changes to the Cookies Policy:*
            </h1>
            <p className='text-base'>
              We may update the Cookies Policy to reflect technological or regulatory changes. Updates will be posted on our website.
            </p>
          </li>
        </ul>
        <div className='text-center my-5 font-semibold'>
          <p className='text-base'>
            Read the full Cookies Policy <span className='text-red-300 font-bold cursor-pointer hover:underline'>www.carautos.com/cookies</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default TearmsAndCondition