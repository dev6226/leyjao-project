import React, { useRef, useState } from 'react'
import CustomerInformation from "../assets/information-image.png"


const NewCustomer = () => {
  const [image, setImage] = useState(null)
  const frontRef = useRef(null)
  const backRef = useRef(null)
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
      <div className='grid grid-cols-12 mt-5'>
        <div className='col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
          <div className='p-6'>

            {/* Header */}
            <div className='flex items-center gap-3'>
              <img src={CustomerInformation} alt="" />
              <p className='text-primary text-lg font-semibold'>
                Customer Information
              </p>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

            {/* Form Grid */}
            <div className='grid grid-cols-2 gap-5'>

              {/* Full Name */}
              <div>
                <label className='text-base font-semibold text-primary'>Full Name*</label>
                <input
                  type='text'
                  placeholder='Enter full name'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* Father Name */}
              <div>
                <label className='text-base font-semibold text-primary'>Father’s Name</label>
                <input
                  type='text'
                  placeholder="Enter father's name"
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* CNIC */}
              <div>
                <label className='text-base font-semibold text-primary'>CNIC*</label>
                <input
                  type='text'
                  placeholder='00000-0000000-0'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* Phone */}
              <div>
                <label className='text-base font-semibold text-primary'>Phone Number</label>
                <input
                  type='text'
                  placeholder='0300-0000000'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* Address full width */}
              <div className='col-span-2'>
                <label className='text-base font-semibold text-primary'>Home Address</label>
                <input
                  type='text'
                  placeholder='Enter complete address'
                  className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                />
              </div>

              {/* Home Status */}
              <div>
                <label className='text-base font-semibold text-primary'>Home Status</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>

              {/* Time Period */}
              <div>
                <label className='text-base font-semibold text-primary'>Time Period</label>
                <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                  <option>Select</option>
                </select>
              </div>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-10 mb-6'></div>

            {/* Work Info */}
            <div className='mt-8'>
              <p className='text-primary text-lg font-semibold'>
                Work Information
              </p>

              <div className='grid grid-cols-2 gap-5 mt-6'>
                {/* Office Address */}
                <div className='col-span-2'>
                  <label className='text-base font-semibold text-primary'>Office Address</label>
                  <input
                    type='text'
                    placeholder='Enter complete address'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className='text-base font-semibold text-primary'>Designation</label>
                  <input
                    type='text'
                    placeholder='Enter designation'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                  />
                </div>

                {/* Time Period */}
                <div>
                  <label className='text-base font-semibold text-primary'>Time Period</label>
                  <select className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'>
                    <option>Select</option>
                  </select>
                </div>

                {/* Salary */}
                <div>
                  <label className='text-base font-semibold text-primary'>Salary</label>
                  <input
                    type='text'
                    placeholder='20k - 500k'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className='text-base font-semibold text-primary'>Phone Number</label>
                  <input
                    type='text'
                    placeholder='0300-0000000'
                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                  />
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className='mt-8 border border-[#E1E7EF] rounded-xl p-6 flex justify-center items-center gap-12 shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
              {/* CNIC Front */}
              <div className='flex flex-col items-center'>
                <div className='flex items-center justify-center w-40 h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg cursor-pointer'>
                  <span className='text-sm text-gray-500'>Add Photo</span>
                </div>
                <p className='text-primary text-sm font-semibold mt-2'>CNIC Front</p>
              </div>

              {/* CNIC Back */}
              <div className='flex flex-col items-center'>
                <div onClick={() => {
                  console.log("backref file attached", backRef.current)
                  backRef.current.click()
                }}
                  className='flex items-center justify-center w-40 h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg cursor-pointer'>
                  {image ? (
                    <img src={image} alt="Back Image" className='w-full h-full object-cover' />
                  )
                    :
                    (
                      <span className='text-sm text-gray-500'>Add Photo</span>
                    )}
                </div>
                <p className='text-primary text-sm font-semibold mt-2'>CNIC Back</p>
                <input type="file" className='hidden' ref={backRef} onChange={(e) => {
                  const showImage = e.target.files[0]
                  console.log("this is your showimage", showImage)
                  if (showImage) {
                    setImage(URL.createObjectURL(showImage))
                  }
                  console.log(e.target.files[0])
                }
                }
                />
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-3'>
        </div>
      </div>
    </main>
  )
}

export default NewCustomer
