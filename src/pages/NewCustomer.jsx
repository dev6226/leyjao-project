import React, { useRef, useState } from 'react'
import CustomerInformation from "../assets/information-image.png"


const NewCustomer = () => {
  const [backimage, setBackimage] = useState(null)
  const [frontimage, setFrontimage] = useState(null)
  const [guarantorBackimage, setGuarantorBackimage] = useState(null)
  const [guarantorFrontimage, setGuarantorFrontimage] = useState(null)
  const [checkfrontcnic, setCheckfrontcnic] = useState(null)
  const [checkbackcnic, setCheckbackcnic] = useState(null)
  const [checkDetail, setCheckDetail] = useState(null)
  const [productDetail, setProductDetail] = useState(null)


  const [guarantors, setGuarantors] = useState([{
    fullName: "",
    fatherName: "",
    cnic: "",
    phone: "",
    address: "",
    homeStatus: "",
    timePeriod: "",
    workInfo: {
      officeAddress: "",
      designation: "",
      salary: "",
      phone: "",
      timePeriod: ""
    },
    cnicFront: null,
    cnicBack: null
  }])

  // customer
  const frontRef = useRef(null)
  const backRef = useRef(null)

  // cheque-details
  const checkfrontRef = useRef(null)
  const checkbackRef = useRef(null)

  // guarantor1
  const g1frontRef = useRef(null)
  const g1backRef = useRef(null)

  // cheque-section
  const chequeRef = useRef(null)

  // product-detail
  const productDetailRef = useRef(null)
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
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                  />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                  <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                    <option>Select</option>
                  </select>
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Salary</label>
                  <input
                    type='text'
                    placeholder='20k - 500k'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                  />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                  <input
                    type='text'
                    placeholder='0300-0000000'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
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
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                  <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                    <option>Select</option>
                  </select>
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Salary</label>
                  <input type='text' placeholder='20k - 500k'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                </div>

                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                  <input type='text' placeholder='0300-0000000'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
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
          {
            guarantors.map((g, index) => (
              <div key={index} className="transition-all duration-500 ease-in-out animate-[fadeIn_0.5s_forwards]">

                {/* dynamically-guarantor-form */}
                <div className='p-4 sm:p-6'>
                  {/* Header */}
                  <div className='flex items-center gap-3'>
                    <img src={CustomerInformation} alt="" />
                    <p className='text-primary text-base sm:text-lg font-semibold'>
                      Guarantor {index + 2}
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
                          className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                      </div>

                      <div>
                        <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                        <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                          <option>Select</option>
                        </select>
                      </div>

                      <div>
                        <label className='text-sm sm:text-base font-semibold text-primary'>Salary</label>
                        <input type='text' placeholder='20k - 500k'
                          className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                      </div>

                      <div>
                        <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                        <input type='text' placeholder='0300-0000000'
                          className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                      </div>
                    </div>
                  </div>

                  {/* Upload Section */}
                  <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>

                    {/* CNIC Front */}
                    <div className='flex flex-col items-center'>
                      <div
                        className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                        onClick={() => document.getElementById(`front${index}`).click()}
                      >
                        {g.cnicFront ? (
                          <img src={g.cnicFront} className='w-full h-full object-cover' />
                        ) : (
                          <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                        )}
                      </div>

                      <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Front</p>

                      <input type="file" id={`front${index}`} className='hidden' onChange={(e) => {
                        const updated = [...guarantors]
                        console.log("cnic front", updated)
                        updated[index].cnicFront = URL.createObjectURL(e.target.files[0])
                        setGuarantors(updated)
                      }} />
                    </div>

                    {/* CNIC Back */}
                    <div className='flex flex-col items-center'>
                      <div
                        onClick={() => document.getElementById(`back${index}`).click()}
                        className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                      >
                        {g.cnicBack ? (
                          <img src={g.cnicBack} className='w-full h-full object-cover' />
                        ) : (
                          <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                        )}
                      </div>

                      <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Back</p>

                      <input type="file" id={`back${index}`} className='hidden' onChange={(e) => {
                        const updated = [...guarantors]
                        updated[index].cnicBack = URL.createObjectURL(e.target.files[0])
                        setGuarantors(updated)
                      }} />
                    </div>

                  </div>

                </div>
              </div>
            ))
          }
        </div>

        {/* Right Column (visible everywhere) */}
        <div className='col-span-1 lg:col-span-3'></div>

      </div>
      {/* button-to-add-more-guarantors-section */}
      <div>
        <button onClick={() => setGuarantors([...guarantors, {
          fullName: "",
          fatherName: "",
          cnic: "",
          phone: "",
          address: "",
          homeStatus: "",
          timePeriod: "",
          workInfo: {
            officeAddress: "",
            designation: "",
            salary: "",
            phone: "",
            timePeriod: ""
          },
          cnicFront: null,
          cnicBack: null
        }])} className='px-6 py-3 mt-7 border-1 border-dashed rounded-xl border-[#0062BD] cursor-pointer '>
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#CEE7FF" />
              <path d="M9.25732 4.85156H10.9293V15.3278H9.25732V4.85156Z" fill="#0062BD" />
              <path d="M4.85645 9.24219H15.3326V10.9142H4.85645V9.24219Z" fill="#0062BD" />
            </svg>
            <p className='text-[#0062BD] text-base '>
              Add Guarantor
            </p>

          </div>
        </button>
      </div>
      {/* check-detail */}
      <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>
        <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
          <div className='p-4 sm:p-6'>
            {/* Header */}
            <div className='flex items-center gap-3'>
              <img src={CustomerInformation} alt="" />
              <p className='text-primary text-base sm:text-lg font-semibold'>
                Check Detail
              </p>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

            {/* Form Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Bank</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Cheque Number</label>
                <input type='text' placeholder="Enter father's name"
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Check Person</label>
                <input type='text' placeholder='00000-0000000-0'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>CNIC</label>
                <input type='text' placeholder='0300-0000000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>
            </div>


            {/* Upload Section */}
            <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>

              {/* cheque-photo */}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => chequeRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {checkDetail ? (
                    <img src={checkDetail} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Cheque Photo </span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>Cheque Photo </p>

                <input type="file" ref={chequeRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setCheckDetail(URL.createObjectURL(file))
                }} />
              </div>

              {/* CNIC Front */}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => checkfrontRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {checkfrontcnic ? (
                    <img src={checkfrontcnic} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Front</p>

                <input type="file" ref={checkfrontRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setCheckfrontcnic(URL.createObjectURL(file))
                }} />
              </div>

              {/* CNIC Back */}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => checkbackRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {checkbackcnic ? (
                    <img src={checkbackcnic} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Back</p>

                <input type="file" ref={checkbackRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setCheckbackcnic(URL.createObjectURL(file))
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right column (visible everywhere) */}
        <div className='col-span-1 lg:col-span-3'></div>

      </div>

      {/* product-details */}
      <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>
        <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
          <div className='p-4 sm:p-6'>
            {/* Header */}
            <div className='flex items-center gap-3'>
              <img src={CustomerInformation} alt="" />
              <p className='text-primary text-base sm:text-lg font-semibold'>
                Product Detail
              </p>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

            {/* Form Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Company</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Product Name</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Model</label>
                <input type='text' placeholder='00000-0000000-0'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Serial No</label>
                <input type='text' placeholder='0300-0000000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Actual Installment</label>
                <input type='text' placeholder='00000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Duration</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Percentage ( % )</label>
                <input type='text' placeholder='0300-0000000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Selling Price</label>
                <input type='text' placeholder='00000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Advance Amount</label>
                <input type='text' placeholder='00000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>

              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Balance Amount</label>
                <input type='text' placeholder='00000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
              </div>
            </div>

            {/* Upload Section */}
            <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>

              {/* product-photo*/}
              <div className='flex flex-col items-center'>
                <div
                  onClick={() => productDetailRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                >
                  {productDetail ? (
                    <img src={productDetail} className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>
                  )}
                </div>

                <p className='text-xs sm:text-sm font-semibold mt-2'>Product Photo</p>

                <input type="file" ref={productDetailRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setProductDetail(URL.createObjectURL(file))
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right column (visible everywhere) */}
        <div className='col-span-1 lg:col-span-3'></div>
      </div>
    </main>
  )
}

export default NewCustomer
