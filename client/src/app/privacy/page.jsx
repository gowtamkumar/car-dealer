import React from 'react'

const Privacy = () => {
  return (
    <div className='border p-4 shadow-sm rounded-sm'>
      <div>
        <h1 className='border-b text-xl font-bold text-gray-800 py-2'>Privacy Policy of Car Dealer.</h1>
      </div>
      <div className='text-gray-800 py-5'>
        <h1 className='text-lg mb-3' >
          At carAUTOS, we are committed to safeguarding your privacy and ensuring the security of your personal information. By using our platform, you are consenting to the practices outlined in this Privacy Policy.
        </h1>
        <ul>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              1. *Information We Collect:*
            </h1>
            <p className='text-base'>
              - When you register on carAUTOS, we collect basic information such as your name, contact details and address. Additionally, we may gather data related to your car preferences and transactions.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              2. *How We Use Your Information:*
            </h1>
            <p className='text-base'>
              - The information collected is used to facilitate transactions, provide personalized services, and enhance your overall experience on our platform. We may also use it for communication purposes, including updates, promotions and transactional notifications.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              3. *Data Security:*
            </h1>
            <p className='text-base'>
              - We employ industry-standard security measures to protect your data from unauthorized access, disclosure, alteration and destruction. Your account information is password-protected and we use secure socket layer technology (SSL) to encrypt data during transmission.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              4. *Third-Party Services:*
            </h1>
            <p className='text-base'>
              - carAUTOS may use third-party services for analytics, payment processing, and other functionalities. These third parties are contractually obligated to handle your data securely and in accordance with applicable privacy laws.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              5. *Cookies and Tracking Technologies:*
            </h1>
            <p className='text-base'>
              - We utilize cookies and similar technologies to enhance your browsing experience, analyze trends and gather information about user behavior. You can manage your cookie preferences through your browser settings.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              6. *User Control Over Information:*
            </h1>
            <p className='text-base'>
              - You have the right to access, modify or delete your personal information. If you wish to update your details or have concerns about the information we hold, please contact us at <span className='text-red-300 font-bold cursor-pointer hover:underline'>carautos007@gmail.com</span> .
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              7. *Children's Privacy:*
            </h1>
            <p className='text-base'>
              - carAUTOS is not intended for individuals under the age of 13. We do not knowingly collect or store personal information from children. If you believe that we have unintentionally collected such information, please contact us for prompt removal.
            </p>

          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              8. *Changes to the Privacy Policy:*
            </h1>
            <p className='text-base'>
              - We reserve the right to modify this Privacy Policy at any time. Any changes will be reflected on our website and it is your responsibility to stay informed about updates.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              9. *Contact Information:*
            </h1>
            <p className='text-base'>
              - For any privacy-related inquiries or concerns, please reach out to us at <span className='text-red-300 font-bold cursor-pointer hover:underline'>carautos007@gmail.com</span> .
            </p>
          </li>
        </ul>
        <div className='text-center my-5 font-semibold'>
          <p className='text-base'>
            For the complete details, please visit <span className='text-red-300 font-bold cursor-pointer hover:underline'>www.carautos.com/privacy</span>
          </p>
          <p className='text-base'>
            By using carAUTOS, you acknowledge that you have read, understood and agreed to the terms outlined in this Privacy Policy. Your privacy is our priority and we are dedicated to maintaining the trust you place in us.
          </p>

        </div>
      </div>
    </div>
  )
}

export default Privacy