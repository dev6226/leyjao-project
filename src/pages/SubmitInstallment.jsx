import React from 'react'
import Customerimage from '../assets/Customer-image.webp'

const SubmitInstallment = () => {
    return (
        <div>
            {/* Header */}
            <div>
                <h2 className='text-primary text-xl font-semibold'>
                    Add Payment
                </h2>
                <p className='text-secondary text-base mt-1'>
                    Add a new payment for a customer
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>

                {/* FORM */}
                <div className='lg:col-span-9 order-2 lg:order-1'>
                    <div className='p-4 sm:p-6'>

                        {/* Form Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Name</label>
                                <input type='text' placeholder='Enter full name'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Actual Installment</label>
                                <input type='number' placeholder="Enter actual installment"
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Installment Receiving</label>
                                <input type='number' placeholder='00000-0000000-0'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                            </div>

                            <div>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Remaning Amount</label>
                                <input type='number' placeholder='0300-0000000'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                            </div>

                            <div className='md:col-span-2'>
                                <label className='text-sm sm:text-base font-semibold text-primary'>Remarks</label>
                                <input type='text' placeholder='ABC'
                                    className='mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]' />
                            </div>
                        </div>

                        {/* button */}
                        <div className='flex justify-center sm:justify-end'>
                            <button className='mt-3 px-6 py-2 rounded-lg bg-[#2196F3] text-[#FFFFFF] text-base sm:text-lg font-semibold w-full sm:w-auto'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

                {/* IMAGE */}
                <div className="lg:col-span-3 order-1 lg:order-2 flex justify-center lg:justify-start items-center lg:items-start mt-4 lg:mt-8">
                    <img
                        src={Customerimage}
                        alt=""
                        className='w-28 h-32 sm:w-32 sm:h-40 lg:w-40 lg:h-48 object-cover'
                    />
                </div>

            </div>
        </div>

    )
}

export default SubmitInstallment
