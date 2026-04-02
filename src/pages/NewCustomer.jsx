import React, { useRef, useState } from 'react'
import CustomerInformation from "../assets/information-image.png"


const NewCustomer = () => {
  const [backimage, setBackimage] = useState(null)
  const [frontimage, setFrontimage] = useState(null)

  const frontRef = useRef(null)
  const backRef = useRef(null)

  const [guarantorBackimage, setGuarantorBackimage] = useState(null)
  const [guarantorFrontimage, setGuarantorFrontimage] = useState(null)

  const g1frontRef = useRef(null)
  const g1backRef = useRef(null)

  const [guarantor2Backimage, setGuarantor2Backimage] = useState(null)
  const [guarantor2Frontimage, setGuarantor2Frontimage] = useState(null)

  const g2frontRef = useRef(null)
  const g2backRef = useRef(null)
  return (
    <main>
      {/* text */}
      <div>
        <h2 className='text-primary text-xl font-semibold'>
          Add New Customers
        </h2>
        <p className='text-secondary text-base mt-1'>
          Fill in the customer and guarantor details
        </p>
      </div>
      {/* grid-cols */}
      <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>

        <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>

          <div className='p-4 sm:p-6'>

            {/* Header */}
            <div className='flex items-center gap-3'>
              <img src={CustomerInformation} alt="" />
              <p className='text-primary text-base sm:text-lg font-semibold'>
                Customer Information
              </p>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

            {/* Form Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

              {/* Full Name */}
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Full Name*</label>
                <input
                  type='text'
                  placeholder='Enter full name'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* Father Name */}
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Father’s Name</label>
                <input
                  type='text'
                  placeholder="Enter father's name"
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* CNIC */}
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>CNIC*</label>
                <input
                  type='text'
                  placeholder='00000-0000000-0'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* Phone */}
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                <input
                  type='text'
                  placeholder='0300-0000000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* Address */}
              <div className='md:col-span-2'>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Address</label>
                <input
                  type='text'
                  placeholder='Enter complete address'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* Home Status */}
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Status</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>

              {/* Time Period */}
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-10 mb-6'></div>

            {/* Work Info */}
            <div className='mt-6'>
              <p className='text-primary text-base sm:text-lg font-semibold'>
                Work Information
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>

                <div className='md:col-span-2'>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Office Address</label>
                  <input
                    type='text'
                    placeholder='Enter complete address'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                  />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Designation</label>
                  <input
                    type='text'
                    placeholder='Enter designation'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]'
                  />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                  <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]'>
                    <option>Select</option>
                  </select>
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Salary</label>
                  <input
                    type='text'
                    placeholder='20k - 500k'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]'
                  />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                  <input
                    type='text'
                    placeholder='0300-0000000'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]'
                  />
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12'>

              {/* CNIC Front */}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => frontRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {frontimage ? (
                    <img src={frontimage} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Front</p>

                <input type="file" ref={frontRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setFrontimage(URL.createObjectURL(file))
                }} />
              </div>

              {/* CNIC Back */}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => backRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {backimage ? (
                    <img src={backimage} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Back</p>

                <input type="file" ref={backRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setBackimage(URL.createObjectURL(file))
                }} />
              </div>

            </div>

          </div>
        </div>

        {/* Right Side Empty */}
        <div className='hidden lg:block lg:col-span-3'></div>

      </div>

      {/* guarantor-1 */}
      <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>

        <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>

          <div className='p-4 sm:p-6'>

            {/* Header */}
            <div className='flex items-center gap-3'>
              <img src={CustomerInformation} alt="" />
              <p className='text-primary text-base sm:text-lg font-semibold'>
                Guarantor 1
              </p>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

            {/* Form Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Full Name*</label>
                <input type='text' placeholder='Enter full name'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Father’s Name</label>
                <input type='text' placeholder="Enter father's name"
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>CNIC*</label>
                <input type='text' placeholder='00000-0000000-0'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                <input type='text' placeholder='0300-0000000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div className='md:col-span-2'>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Address</label>
                <input type='text' placeholder='Enter complete address'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Status</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-10 mb-6'></div>

            {/* Work Info */}
            <div className='mt-6'>
              <p className='text-primary text-base sm:text-lg font-semibold'>
                Work Information
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>

                <div className='md:col-span-2'>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Office Address</label>
                  <input type='text' placeholder='Enter complete address'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Designation</label>
                  <input type='text' placeholder='Enter designation'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]' />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                  <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]'>
                    <option>Select</option>
                  </select>
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Salary</label>
                  <input type='text' placeholder='20k - 500k'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]' />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                  <input type='text' placeholder='0300-0000000'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]' />
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>

              {/* CNIC Front */}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => g1frontRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {guarantorFrontimage ? (
                    <img src={guarantorFrontimage} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Front</p>

                <input type="file" ref={g1frontRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setGuarantorFrontimage(URL.createObjectURL(file))
                }} />
              </div>

              {/* CNIC Back */}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => g1backRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {guarantorBackimage ? (
                    <img src={guarantorBackimage} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Back</p>

                <input type="file" ref={g1backRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setGuarantorBackimage(URL.createObjectURL(file))
                }} />
              </div>

            </div>

          </div>
        </div>

        {/* Right column (visible everywhere) */}
        <div className='col-span-1 lg:col-span-3'></div>

      </div>

      {/* guarantor-2 */}
      <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>

        <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>

          <div className='p-4 sm:p-6'>

            {/* Header */}
            <div className='flex items-center gap-3'>
              <img src={CustomerInformation} alt="" />
              <p className='text-primary text-base sm:text-lg font-semibold'>
                Guarantor 2
              </p>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

            {/* Form Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Full Name*</label>
                <input type='text' placeholder='Enter full name'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Father’s Name</label>
                <input type='text' placeholder="Enter father's name"
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>CNIC*</label>
                <input type='text' placeholder='00000-0000000-0'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                <input type='text' placeholder='0300-0000000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div className='md:col-span-2'>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Address</label>
                <input type='text' placeholder='Enter complete address'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Status</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-10 mb-6'></div>

            {/* Work Info */}
            <div className='mt-6'>
              <p className='text-primary text-base sm:text-lg font-semibold'>
                Work Information
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>

                <div className='md:col-span-2'>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Office Address</label>
                  <input type='text' placeholder='Enter complete address'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Designation</label>
                  <input type='text' placeholder='Enter designation'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]' />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                  <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]'>
                    <option>Select</option>
                  </select>
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Salary</label>
                  <input type='text' placeholder='20k - 500k'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]' />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                  <input type='text' placeholder='0300-0000000'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF]' />
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>

              {/* CNIC Front */}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => g2frontRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {guarantor2Frontimage ? (
                    <img src={guarantor2Frontimage} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Front</p>

                <input type="file" ref={g2frontRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setGuarantor2Frontimage(URL.createObjectURL(file))
                }} />
              </div>

              {/* CNIC Back */}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => g2backRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {guarantor2Backimage ? (
                    <img src={guarantor2Backimage} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Back</p>

                <input type="file" ref={g2backRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setGuarantor2Backimage(URL.createObjectURL(file))
                }} />
              </div>

            </div>

          </div>
        </div>

        {/* Right Column (visible everywhere) */}
        <div className='col-span-1 lg:col-span-3'></div>

      </div>
    </main>
  )
}

export default NewCustomer
