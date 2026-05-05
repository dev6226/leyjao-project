import React, { useState } from 'react'
import axios from 'axios'

const ProductModle = () => {
  const [input, setInput] = useState("")
  const [createModel, setCreateModel] = useState([])

  const token = sessionStorage.getItem("token");
  const fomrdata = new FormData();
  fomrdata.append("name", input);
  const handleSave = async () => {
    try {
      const res = await axios.post('https://stage.leyjao.pk/api/product-model/store', fomrdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log("category-Data", res.data);
      setCreateModel(res.data)
      setInput("")
    } catch (error) {
      console.log('error', error)

    }
  }
  return (
    <div>
      <div>
        <h2 className='text-primary text-xl font-semibold'>
          Add New Models
        </h2>
        <p className='text-secondary text-base mt-1'>
          Create a new Model under a Category.
        </p>
      </div>
      {/* new-model */}
      <div className='mt-5 gap-4'>
        <div className='bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
          <div className='p-4 sm:p-6'>
            {/* Form Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {/* Brand Name */}
              <div className='md:col-span-2'>
                <label className='text-sm sm:text-base font-semibold text-primary'>
                  Add Model Name:
                </label>

                <div className="relative mt-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type='text'
                    placeholder='Enter Model name (e.g., Samsung S24 Ultra)'
                    className='w-full h-10 sm:h-11 px-3 pr-10 text-sm sm:text-base rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'
                  />

                  <svg
                    onClick={() => setInput("")}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-4 h-4 sm:w-[17px] sm:h-[20px]"
                    viewBox="0 0 17 20"
                    fill="none"
                  >
                    <path d="M14.4004 5.40039C14.1617 5.40039 13.9328 5.49521 13.764 5.66399C13.5952 5.83278 13.5004 6.0617 13.5004 6.30039V16.3723C13.4746 16.8274 13.27 17.2539 12.9311 17.5588C12.5923 17.8638 12.1467 18.0225 11.6914 18.0004H4.50939C4.05408 18.0225 3.60848 17.8638 3.26965 17.5588C2.93082 17.2539 2.72621 16.8274 2.70039 16.3723V6.30039C2.70039 6.0617 2.60557 5.83278 2.43679 5.66399C2.268 5.49521 2.03909 5.40039 1.80039 5.40039C1.5617 5.40039 1.33278 5.49521 1.16399 5.66399C0.995212 5.83278 0.900391 6.0617 0.900391 6.30039V16.3723C0.92608 17.3049 1.32031 18.1893 1.99675 18.8318C2.67319 19.4744 3.5767 19.8227 4.50939 19.8004H11.6914C12.6241 19.8227 13.5276 19.4744 14.204 18.8318C14.8805 18.1893 15.2747 17.3049 15.3004 16.3723V6.30039C15.3004 6.0617 15.2056 5.83278 15.0368 5.66399C14.868 5.49521 14.6391 5.40039 14.4004 5.40039Z" fill="#767A7E" />
                    <path d="M15.3 2.7H11.7V0.9C11.7 0.661305 11.6052 0.432387 11.4364 0.263604C11.2676 0.0948211 11.0387 0 10.8 0H5.4C5.16131 0 4.93239 0.0948211 4.7636 0.263604C4.59482 0.432387 4.5 0.661305 4.5 0.9V2.7H0.9C0.661305 2.7 0.432387 2.79482 0.263604 2.9636C0.0948211 3.13239 0 3.36131 0 3.6C0 3.8387 0.0948211 4.06761 0.263604 4.2364C0.432387 4.40518 0.661305 4.5 0.9 4.5H15.3C15.5387 4.5 15.7676 4.40518 15.9364 4.2364C16.1052 4.06761 16.2 3.8387 16.2 3.6C16.2 3.36131 16.1052 3.13239 15.9364 2.9636C15.7676 2.79482 15.5387 2.7 15.3 2.7ZM6.3 2.7V1.8H9.9V2.7H6.3Z" fill="#767A7E" />
                    <path d="M7.1999 14.4002V8.1002C7.1999 7.8615 7.10508 7.63258 6.9363 7.4638C6.76752 7.29502 6.5386 7.2002 6.2999 7.2002C6.06121 7.2002 5.83229 7.29502 5.66351 7.4638C5.49472 7.63258 5.3999 7.8615 5.3999 8.1002V14.4002C5.3999 14.6389 5.49472 14.8678 5.66351 15.0366C5.83229 15.2054 6.06121 15.3002 6.2999 15.3002C6.5386 15.3002 6.76752 15.2054 6.9363 15.0366C7.10508 14.8678 7.1999 14.6389 7.1999 14.4002Z" fill="#767A7E" />
                    <path d="M10.8005 14.4002V8.1002C10.8005 7.8615 10.7057 7.63258 10.5369 7.4638C10.3681 7.29502 10.1392 7.2002 9.90049 7.2002C9.66179 7.2002 9.43288 7.29502 9.26409 7.4638C9.09531 7.63258 9.00049 7.8615 9.00049 8.1002V14.4002C9.00049 14.6389 9.09531 14.8678 9.26409 15.0366C9.43288 15.2054 9.66179 15.3002 9.90049 15.3002C10.1392 15.3002 10.3681 15.2054 10.5369 15.0366C10.7057 14.8678 10.8005 14.6389 10.8005 14.4002Z" fill="#767A7E" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* button */}
        <div className='flex justify-end gap-x-3 mt-8'>
          <button className='w-24 h-11 sm:h-9 text-sm 
                            bg-[#FFFFFF] rounded-lg border-1 border-[#65758B] text-[#65758B] font-medium text-base'>
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='w-24 h-11 sm:h-9 text-sm 
                            bg-[#2196F3] rounded-lg  text-[#FFFFFF] font-medium text-base'>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModle