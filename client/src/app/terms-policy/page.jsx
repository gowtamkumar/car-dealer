import React from 'react'

const TearmsAndCondition = () => {
  return (
    <div className='border p-4 shadow-sm rounded-sm'>
      <div>
        <h1 className='border-b text-xl font-bold text-gray-800 py-2'>Terms and Conditions</h1>
      </div>
      <div className='text-gray-800 py-5'>
        <h1 className='text-lg mb-3' >
          Welcome to carAUTOS, where we value transparency, fairness and the satisfaction of every user. By engaging with our platform, you agree to adhere to the following terms and conditions:
        </h1>
        <ul>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              1. *Acceptance of Terms:*
            </h1>
            <p className='text-base'>
              - By accessing and using carAUTOS, you acknowledge and agree to these terms in their entirety. Please read them carefully before proceeding. </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              2. *User Responsibilities:*
            </h1>
            <p className='text-base'>
              - Users are responsible for maintaining the confidentiality of their account information and agree to notify us immediately of any unauthorized access or use of their account.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              3. *Listing Terms for Sellers:*
            </h1>
            <p className='text-base'>
              - Sellers are obligated to provide accurate and truthful information when creating car listings. Misrepresentation of any details may result in the removal of the listing.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              4. *Buying Terms for Buyers:*
            </h1>
            <p className='text-base'>
              - Buyers commit to the purchase of a vehicle upon order confirmation. Cancellations and returns are subject to our cancellation and return policies outlined in separate sections.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              5. *Overseas Orders:*
            </h1>
            <p className='text-base'>
              - Customers opting for overseas car orders are advised to be aware of additional logistical considerations, including shipping costs, import duties and compliance with local regulations.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              6. *Transaction Security:*
            </h1>
            <p className='text-base'>
              - carAUTOS employs industry-standard security measures to safeguard transactions. However, users are encouraged to take necessary precautions, such as verifying the identity of the counterparty.</p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              7. *User Conduct:*
            </h1>
            <p className='text-base'>
              - Users must refrain from engaging in any activity that could disrupt the proper functioning of the platform, including but not limited to hacking, phishing or spreading malicious software.
            </p>

          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              8. *Intellectual Property:*
            </h1>
            <p className='text-base'>
              - All content on carAUTOS, including logos, text and images, is protected by intellectual property laws. Users are not permitted to use, reproduce or distribute any content without explicit permission.
            </p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              9. *Termination of Accounts:*</h1>
            <p className='text-base'>
              - carAUTOS reserves the right to terminate user accounts that violate our terms and conditions, exhibit fraudulent behavior or engage in any form of misconduct.</p>
          </li>
          <li className='mb-3'>
            <h1 className='font-bold text-lg'>
              10. *Privacy:*
            </h1>
            <p className='text-base'>
              - User data is handled as per our Privacy Policy. By using carAUTOS, you consent to the collection, use and sharing of your information as outlined in the Privacy Policy.
            </p>
          </li>
          <li className='mb-3'>
            <p className='text-lg text-black'>
              Please take the time to review these terms thoroughly. Your use of carAUTOS implies your acceptance of these conditions. We are committed to providing a secure and enjoyable platform for all users. </p>
          </li>
        </ul>
        <div className='text-center my-5 font-semibold'>
          <p className='text-base'>
            For the complete details, please visit <span className='text-red-300 font-bold cursor-pointer hover:underline'>www.carautos.com/terms</span>
          </p>
          <p className='text-base'>
            If you have any questions or concerns, feel free to reach out to us at <span className='text-red-300 font-bold cursor-pointer hover:underline'>carautos007@gmail.com</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default TearmsAndCondition