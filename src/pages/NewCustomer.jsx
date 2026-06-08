import React, { useRef, useState } from 'react'
import CustomerInformation from "../assets/information-image.png"
import api from '../api/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const NewCustomer = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // ── Customer photo previews ─────────────────
  const [backimage, setBackimage] = useState(null)
  const [frontimage, setFrontimage] = useState(null)
  const [checkfrontcnic, setCheckfrontcnic] = useState(null)
  const [checkbackcnic, setCheckbackcnic] = useState(null)
  const [checkDetail, setCheckDetail] = useState(null)
  const [productDetail, setProductDetail] = useState(null)

  // ── Customer Photo & Cheque Person Photo states ──
  const [customerPhoto, setCustomerPhoto] = useState(null)
  const [customerPhotoFile, setCustomerPhotoFile] = useState(null)
  const [chequePersonPhoto, setChequePersonPhoto] = useState(null)
  const [chequePersonPhotoFile, setChequePersonPhotoFile] = useState(null)

  // ── Customer states ─────────────────────────
  const [fullName, setFullName] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [cnic, setCnic] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [homeStatus, setHomeStatus] = useState("")
  const [timePeriod, setTimePeriod] = useState("")
  const [officeAddress, setOfficeAddress] = useState("")
  const [designation, setDesignation] = useState("")
  const [salary, setSalary] = useState("")
  const [workPhone, setWorkPhone] = useState("")
  const [workTimePeriod, setWorkTimePeriod] = useState("")

  // ── Cheque states ───────────────────────────
  const [chequeBankName, setChequeBankName] = useState("")
  const [chequeAccountNumber, setChequeAccountNumber] = useState("")
  const [chequePersonName, setChequePersonName] = useState("")
  const [chequeCnic, setChequeCnic] = useState("")

  // ── Guarantor 1 (static) states ─────────────
  const [g1, setG1] = useState({
    fullName: "", fatherName: "", cnic: "", phone: "",
    address: "", homeStatus: "", timePeriod: "",
    officeAddress: "", designation: "", salary: "",
    workPhone: "", workTimePeriod: "",
    cnicFront: null, cnicBack: null,
    cnicFrontFile: null, cnicBackFile: null,
  })

  // ── Dynamic guarantors (Guarantor 2+) ───────
  const [guarantors, setGuarantors] = useState([])

  // ── Refs ────────────────────────────────────
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const checkfrontRef = useRef(null)
  const checkbackRef = useRef(null)
  const g1frontRef = useRef(null)
  const g1backRef = useRef(null)
  const chequeRef = useRef(null)
  const productDetailRef = useRef(null)
  const customerPhotoRef = useRef(null)
  const chequePersonPhotoRef = useRef(null)

  // ── Update guarantor 1 helper ───────────────
  const updateG1 = (field, value) => setG1(prev => ({ ...prev, [field]: value }))

  // ── Update dynamic guarantor helper ─────────
  const updateGuarantor = (index, field, value) => {
    const updated = [...guarantors]
    updated[index][field] = value
    setGuarantors(updated)
  }
  const updateGuarantorWork = (index, field, value) => {
    const updated = [...guarantors]
    updated[index].workInfo[field] = value
    setGuarantors(updated)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const data = new FormData()

      // ── Customer Info ──────────────────────────
      data.append('business_id', 1)
      data.append('full_name', fullName)
      data.append('father_name', fatherName)
      data.append('cnic', cnic)
      data.append('phone', phone)
      data.append('home_address', address)
      data.append('home_status', homeStatus || 'owned')
      data.append('time_period', timePeriod || '1 year')
      data.append('office_address', officeAddress)
      data.append('designation', designation)
      data.append('salary', salary)
      data.append('office_phone', workPhone)
      data.append('status', 'draft')

      // ── Customer CNIC Photos ───────────────────
      if (frontRef.current?.files[0])
        data.append('cnic_front', frontRef.current.files[0])
      if (backRef.current?.files[0])
        data.append('cnic_back', backRef.current.files[0])

      // ── Customer Profile Photo ─────────────────
      if (customerPhotoFile) {
        data.append('customer_photo', customerPhotoFile)
      } else if (customerPhotoRef.current?.files[0]) {
        data.append('customer_photo', customerPhotoRef.current.files[0])
      }

      // ── Cheque Person Photo ────────────────────
      if (chequePersonPhotoFile) {
        data.append('cheque_person_photo', chequePersonPhotoFile)
      } else if (chequePersonPhotoRef.current?.files[0]) {
        data.append('cheque_person_photo', chequePersonPhotoRef.current.files[0])
      }

      // ── Guarantor 1 (index 0) ──────────────────
      data.append('guarantors[0][full_name]', g1.fullName)
      data.append('guarantors[0][father_name]', g1.fatherName)
      data.append('guarantors[0][cnic]', g1.cnic)
      data.append('guarantors[0][phone]', g1.phone)
      data.append('guarantors[0][home_address]', g1.address)
      data.append('guarantors[0][home_status]', g1.homeStatus || 'owned')
      data.append('guarantors[0][time_period]', g1.timePeriod || '1 year')
      data.append('guarantors[0][office_address]', g1.officeAddress)
      data.append('guarantors[0][designation]', g1.designation)
      data.append('guarantors[0][salary]', g1.salary)
      data.append('guarantors[0][office_phone]', g1.workPhone)
      if (g1.cnicFrontFile) data.append('guarantors[0][cnic_front]', g1.cnicFrontFile)
      if (g1.cnicBackFile) data.append('guarantors[0][cnic_back]', g1.cnicBackFile)

      // ── Dynamic Guarantors (index 1+) ──────────
      guarantors.forEach((g, i) => {
        const idx = i + 1
        data.append(`guarantors[${idx}][full_name]`, g.fullName || '')
        data.append(`guarantors[${idx}][father_name]`, g.fatherName || '')
        data.append(`guarantors[${idx}][cnic]`, g.cnic || '')
        data.append(`guarantors[${idx}][phone]`, g.phone || '')
        data.append(`guarantors[${idx}][home_address]`, g.address || '')
        data.append(`guarantors[${idx}][home_status]`, g.homeStatus || 'owned')
        data.append(`guarantors[${idx}][time_period]`, g.timePeriod || '1 year')
        data.append(`guarantors[${idx}][office_address]`, g.workInfo?.officeAddress || '')
        data.append(`guarantors[${idx}][designation]`, g.workInfo?.designation || '')
        data.append(`guarantors[${idx}][salary]`, g.workInfo?.salary || '')
        data.append(`guarantors[${idx}][office_phone]`, g.workInfo?.phone || '')
        if (g.cnicFrontFile) data.append(`guarantors[${idx}][cnic_front]`, g.cnicFrontFile)
        if (g.cnicBackFile) data.append(`guarantors[${idx}][cnic_back]`, g.cnicBackFile)
      })

      // ── Cheque Detail ──────────────────────────
      data.append('cheque[bank_name]', chequeBankName)
      data.append('cheque[account_number]', chequeAccountNumber)
      data.append('cheque[cheque_person_name]', chequePersonName)
      data.append('cheque[cnic]', chequeCnic)
      if (chequeRef.current?.files[0])
        data.append('cheque[cheque_front_image]', chequeRef.current.files[0])
      if (checkbackRef.current?.files[0])
        data.append('cheque[cheque_back_image]', checkbackRef.current.files[0])

      const response = await api.post('/customer/store', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      toast.success(response.data.message || 'Customer Saved Successfully')
      navigate('/all-Customer')

    } catch (error) {
      console.log(error.response?.data)
      if (error.response?.status === 422) {
        const errs = error.response.data.errors
        if (errs) {
          Object.values(errs).forEach((item) => toast.error(item[0]))
        } else {
          toast.error(error.response.data.message)
        }
      } else {
        toast.error('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  const timePeriodOptions = ['1 year', '2 year', '3 year', '4 year', '5 year', '10 year', '15 year', '20 year', '30 year', '40 year', '50 year']
  const inputClass = 'mt-2 w-full h-11 px-3 rounded-lg border border-[#E1E7EF] focus:outline-none focus:ring-2 focus:ring-[#0062BD] bg-[#F9FAFB]'

  return (
    <main>
      {/* text */}
      <div>
        <h2 className='text-primary text-xl font-semibold'>Add New Customers</h2>
        <p className='text-secondary text-base mt-1'>Fill in the customer and guarantor details</p>
      </div>

      {/* ── Customer Information ───────────────────── */}
      <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>
        <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
          <div className='p-4 sm:p-6'>
            <div className='flex items-center gap-3'>
              <img src={CustomerInformation} alt="" />
              <p className='text-primary text-base sm:text-lg font-semibold'>Customer Information</p>
            </div>
            <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Full Name*</label>
                <input type='text' placeholder='Enter full name' value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                  className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Father's Name</label>
                <input type='text' placeholder="Enter father's name" value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                  className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>CNIC*</label>
                <input type='text' placeholder='00000-0000000-0' value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                  className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                <input type='text' placeholder='0300-0000000' value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                  className={inputClass} />
              </div>
              <div className='md:col-span-2'>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Address</label>
                <input type='text' placeholder='Enter complete address' value={address}
                  onChange={(e) => setAddress(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Status</label>
                <select value={homeStatus} onChange={(e) => setHomeStatus(e.target.value)} className={inputClass}>
                  <option value="">Select</option>
                  <option value="owned">Personal</option>
                  <option value="rental">Rental</option>
                </select>
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} className={inputClass}>
                  <option value="">Select</option>
                  {timePeriodOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-10 mb-6'></div>

            {/* Work Info */}
            <div className='mt-6'>
              <p className='text-primary text-base sm:text-lg font-semibold'>Work Information</p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
                <div className='md:col-span-2'>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Office Address</label>
                  <input type='text' placeholder='Enter complete address' value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Designation</label>
                  <input type='text' placeholder='Enter designation' value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                    className={inputClass} />
                </div>
                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                  <select value={workTimePeriod} onChange={(e) => setWorkTimePeriod(e.target.value)} className={inputClass}>
                    <option value="">Select</option>
                    {timePeriodOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Salary</label>
                  <input type='text' placeholder='20k - 500k' value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                    className={inputClass} />
                </div>
                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                  <input type='text' placeholder='0300-0000000' value={workPhone}
                    onChange={(e) => setWorkPhone(e.target.value)}
                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                    className={inputClass} />
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12'>
              <div className='flex flex-col items-center'>
                <div onClick={() => frontRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                  {frontimage ? <img src={frontimage} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
                </div>
                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Front</p>
                <input type="file" ref={frontRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setFrontimage(URL.createObjectURL(file))
                }} />
              </div>
              <div className='flex flex-col items-center'>
                <div onClick={() => backRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                  {backimage ? <img src={backimage} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
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
        <div className='lg:col-span-3 lg:sticky lg:top-6 self-start'>
          <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col justify-center items-center gap-6 sm:gap-12'>
            <div className='flex flex-col items-center'>
              <div onClick={() => customerPhotoRef.current.click()}
                className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                {customerPhoto ? <img src={customerPhoto} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
              </div>
              <p className='text-xs sm:text-sm font-semibold mt-2'>Customer Photo</p>
              <input type="file" ref={customerPhotoRef} className='hidden' onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  setCustomerPhoto(URL.createObjectURL(file))
                  setCustomerPhotoFile(file)
                }
              }} />
            </div>
            <div className='flex flex-col items-center'>
              <div onClick={() => chequePersonPhotoRef.current.click()}
                className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                {chequePersonPhoto ? <img src={chequePersonPhoto} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
              </div>
              <p className='text-xs sm:text-sm font-semibold mt-2'>Cheque Person Photo</p>
              <input type="file" ref={chequePersonPhotoRef} className='hidden' onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  setChequePersonPhoto(URL.createObjectURL(file))
                  setChequePersonPhotoFile(file)
                }
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Guarantor 1 (static, fully wired) ─────── */}
      <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>
        <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
          <div className='p-4 sm:p-6'>
            <div className='flex items-center gap-3'>
              <img src={CustomerInformation} alt="" />
              <p className='text-primary text-base sm:text-lg font-semibold'>Guarantor 1</p>
            </div>
            <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Full Name*</label>
                <input type='text' placeholder='Enter full name' value={g1.fullName}
                  onChange={(e) => updateG1('fullName', e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                  className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Father's Name</label>
                <input type='text' placeholder="Enter father's name" value={g1.fatherName}
                  onChange={(e) => updateG1('fatherName', e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                  className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>CNIC*</label>
                <input type='text' placeholder='00000-0000000-0' value={g1.cnic}
                  onChange={(e) => updateG1('cnic', e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                  className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                <input type='text' placeholder='0300-0000000' value={g1.phone}
                  onChange={(e) => updateG1('phone', e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                  className={inputClass} />
              </div>
              <div className='md:col-span-2'>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Address</label>
                <input type='text' placeholder='Enter complete address' value={g1.address}
                  onChange={(e) => updateG1('address', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Home Status</label>
                <select value={g1.homeStatus} onChange={(e) => updateG1('homeStatus', e.target.value)} className={inputClass}>
                  <option value="">Select</option>
                  <option value="owned">Personal</option>
                  <option value="rental">Rental</option>
                </select>
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                <select value={g1.timePeriod} onChange={(e) => updateG1('timePeriod', e.target.value)} className={inputClass}>
                  <option value="">Select</option>
                  {timePeriodOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className='h-[1px] bg-[#E1E7EF] mt-10 mb-6'></div>

            <div className='mt-6'>
              <p className='text-primary text-base sm:text-lg font-semibold'>Work Information</p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
                <div className='md:col-span-2'>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Office Address</label>
                  <input type='text' placeholder='Enter complete address' value={g1.officeAddress}
                    onChange={(e) => updateG1('officeAddress', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Designation</label>
                  <input type='text' placeholder='Enter designation' value={g1.designation}
                    onChange={(e) => updateG1('designation', e.target.value)}
                    onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                    className={inputClass} />
                </div>
                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                  <select value={g1.workTimePeriod} onChange={(e) => updateG1('workTimePeriod', e.target.value)} className={inputClass}>
                    <option value="">Select</option>
                    {timePeriodOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Salary</label>
                  <input type='text' placeholder='20k - 500k' value={g1.salary}
                    onChange={(e) => updateG1('salary', e.target.value)}
                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                    className={inputClass} />
                </div>
                <div>
                  <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                  <input type='text' placeholder='0300-0000000' value={g1.workPhone}
                    onChange={(e) => updateG1('workPhone', e.target.value)}
                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                    className={inputClass} />
                </div>
              </div>
            </div>

            <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
              <div className='flex flex-col items-center'>
                <div onClick={() => g1frontRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                  {g1.cnicFront ? <img src={g1.cnicFront} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
                </div>
                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Front</p>
                <input type="file" ref={g1frontRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setG1(prev => ({ ...prev, cnicFront: URL.createObjectURL(file), cnicFrontFile: file }))
                }} />
              </div>
              <div className='flex flex-col items-center'>
                <div onClick={() => g1backRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                  {g1.cnicBack ? <img src={g1.cnicBack} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
                </div>
                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Back</p>
                <input type="file" ref={g1backRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setG1(prev => ({ ...prev, cnicBack: URL.createObjectURL(file), cnicBackFile: file }))
                }} />
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-1 lg:col-span-3'></div>
      </div>

      {/* ── Dynamic Guarantors (Guarantor 2+) ─────── */}
      {guarantors.length > 0 && (
        <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>
          <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
            {guarantors.map((g, index) => (
              <div key={index} className="transition-all duration-500 ease-in-out">
                <div className='p-4 sm:p-6'>
                  <div className='flex items-center gap-3'>
                    <img src={CustomerInformation} alt="" />
                    <p className='text-primary text-base sm:text-lg font-semibold'>Guarantor {index + 2}</p>
                  </div>
                  <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                      <label className='text-sm sm:text-base font-semibold text-primary'>Full Name*</label>
                      <input type='text' placeholder='Enter full name' value={g.fullName}
                        onChange={(e) => updateGuarantor(index, 'fullName', e.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className='text-sm sm:text-base font-semibold text-primary'>Father's Name</label>
                      <input type='text' placeholder="Enter father's name" value={g.fatherName}
                        onChange={(e) => updateGuarantor(index, 'fatherName', e.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className='text-sm sm:text-base font-semibold text-primary'>CNIC*</label>
                      <input type='text' placeholder='00000-0000000-0' value={g.cnic}
                        onChange={(e) => updateGuarantor(index, 'cnic', e.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                      <input type='text' placeholder='0300-0000000' value={g.phone}
                        onChange={(e) => updateGuarantor(index, 'phone', e.target.value)}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                        className={inputClass} />
                    </div>
                    <div className='md:col-span-2'>
                      <label className='text-sm sm:text-base font-semibold text-primary'>Home Address</label>
                      <input type='text' placeholder='Enter complete address' value={g.address}
                        onChange={(e) => updateGuarantor(index, 'address', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className='text-sm sm:text-base font-semibold text-primary'>Home Status</label>
                      <select value={g.homeStatus} onChange={(e) => updateGuarantor(index, 'homeStatus', e.target.value)} className={inputClass}>
                        <option value="">Select</option>
                        <option value="owned">Personal</option>
                        <option value="rental">Rental</option>
                      </select>
                    </div>
                    <div>
                      <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                      <select value={g.timePeriod} onChange={(e) => updateGuarantor(index, 'timePeriod', e.target.value)} className={inputClass}>
                        <option value="">Select</option>
                        {timePeriodOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className='h-[1px] bg-[#E1E7EF] mt-10 mb-6'></div>

                  <div className='mt-6'>
                    <p className='text-primary text-base sm:text-lg font-semibold'>Work Information</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
                      <div className='md:col-span-2'>
                        <label className='text-sm sm:text-base font-semibold text-primary'>Office Address</label>
                        <input type='text' placeholder='Enter complete address' value={g.workInfo.officeAddress}
                          onChange={(e) => updateGuarantorWork(index, 'officeAddress', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className='text-sm sm:text-base font-semibold text-primary'>Designation</label>
                        <input type='text' placeholder='Enter designation' value={g.workInfo.designation}
                          onChange={(e) => updateGuarantorWork(index, 'designation', e.target.value)}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                          className={inputClass} />
                      </div>
                      <div>
                        <label className='text-sm sm:text-base font-semibold text-primary'>Time Period</label>
                        <select value={g.workInfo.timePeriod} onChange={(e) => updateGuarantorWork(index, 'timePeriod', e.target.value)} className={inputClass}>
                          <option value="">Select</option>
                          {timePeriodOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className='text-sm sm:text-base font-semibold text-primary'>Salary</label>
                        <input type='text' placeholder='20k - 500k' value={g.workInfo.salary}
                          onChange={(e) => updateGuarantorWork(index, 'salary', e.target.value)}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                          className={inputClass} />
                      </div>
                      <div>
                        <label className='text-sm sm:text-base font-semibold text-primary'>Phone Number</label>
                        <input type='text' placeholder='0300-0000000' value={g.workInfo.phone}
                          onChange={(e) => updateGuarantorWork(index, 'phone', e.target.value)}
                          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                          className={inputClass} />
                      </div>
                    </div>
                  </div>

                  <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
                    <div className='flex flex-col items-center'>
                      <div className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'
                        onClick={() => document.getElementById(`front${index}`).click()}>
                        {g.cnicFront ? <img src={g.cnicFront} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
                      </div>
                      <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Front</p>
                      <input type="file" id={`front${index}`} className='hidden' onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          const updated = [...guarantors]
                          updated[index].cnicFront = URL.createObjectURL(file)
                          updated[index].cnicFrontFile = file
                          setGuarantors(updated)
                        }
                      }} />
                    </div>
                    <div className='flex flex-col items-center'>
                      <div onClick={() => document.getElementById(`back${index}`).click()}
                        className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                        {g.cnicBack ? <img src={g.cnicBack} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
                      </div>
                      <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Back</p>
                      <input type="file" id={`back${index}`} className='hidden' onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          const updated = [...guarantors]
                          updated[index].cnicBack = URL.createObjectURL(file)
                          updated[index].cnicBackFile = file
                          setGuarantors(updated)
                        }
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='col-span-1 lg:col-span-3'></div>
        </div>
      )}

      {/* ── Add Guarantor Button ───────────────────── */}
      <div>
        <button onClick={() => setGuarantors([...guarantors, {
          fullName: "", fatherName: "", cnic: "", phone: "",
          address: "", homeStatus: "", timePeriod: "",
          workInfo: { officeAddress: "", designation: "", salary: "", phone: "", timePeriod: "" },
          cnicFront: null, cnicBack: null, cnicFrontFile: null, cnicBackFile: null
        }])} className='px-6 py-3 mt-7 border-1 border-dashed rounded-xl border-[#0062BD] cursor-pointer'>
          <div className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#CEE7FF" />
              <path d="M9.25732 4.85156H10.9293V15.3278H9.25732V4.85156Z" fill="#0062BD" />
              <path d="M4.85645 9.24219H15.3326V10.9142H4.85645V9.24219Z" fill="#0062BD" />
            </svg>
            <p className='text-[#0062BD] text-base'>Add Guarantor</p>
          </div>
        </button>
      </div>

      {/* ── Cheque Detail ──────────────────────────── */}
      <div className='grid grid-cols-1 lg:grid-cols-12 mt-5 gap-4'>
        <div className='lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
          <div className='p-4 sm:p-6'>
            <div className='flex items-center gap-3'>
              <img src={CustomerInformation} alt="" />
              <p className='text-primary text-base sm:text-lg font-semibold'>Check Detail</p>
            </div>
            <div className='h-[1px] bg-[#E1E7EF] mt-6 mb-6'></div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Bank</label>
                <input type='text' placeholder='Enter bank name' value={chequeBankName}
                  onChange={(e) => setChequeBankName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Cheque Number</label>
                <input type='text' placeholder="Enter cheque number" value={chequeAccountNumber}
                  onChange={(e) => setChequeAccountNumber(e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                  className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>Check Person</label>
                <input type='text' placeholder='Enter person name' value={chequePersonName}
                  onChange={(e) => setChequePersonName(e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '') }}
                  className={inputClass} />
              </div>
              <div>
                <label className='text-sm sm:text-base font-semibold text-primary'>CNIC</label>
                <input type='text' placeholder='00000-0000000-0' value={chequeCnic}
                  onChange={(e) => setChequeCnic(e.target.value)}
                  onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9-]/g, '') }}
                  className={inputClass} />
              </div>
            </div>

            <div className='mt-8 border border-[#E1E7EF] rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 shadow-[0px_3px_4px_rgba(218,218,218,0.6)]'>
              <div className='flex flex-col items-center'>
                <div onClick={() => chequeRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                  {checkDetail ? <img src={checkDetail} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Cheque Photo</span>}
                </div>
                <p className='text-xs sm:text-sm font-semibold mt-2'>Cheque Photo</p>
                <input type="file" ref={chequeRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setCheckDetail(URL.createObjectURL(file))
                }} />
              </div>
              <div className='flex flex-col items-center'>
                <div onClick={() => checkfrontRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                  {checkfrontcnic ? <img src={checkfrontcnic} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
                </div>
                <p className='text-xs sm:text-sm font-semibold mt-2'>CNIC Front</p>
                <input type="file" ref={checkfrontRef} className='hidden' onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) setCheckfrontcnic(URL.createObjectURL(file))
                }} />
              </div>
              <div className='flex flex-col items-center'>
                <div onClick={() => checkbackRef.current.click()}
                  className='w-32 sm:w-40 h-28 sm:h-32 border-2 border-dashed border-[#CBD5E1] rounded-lg flex items-center justify-center cursor-pointer'>
                  {checkbackcnic ? <img src={checkbackcnic} className='w-full h-full object-cover' /> : <span className='text-xs sm:text-sm text-gray-500'>Add Photo</span>}
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
        <div className='col-span-1 lg:col-span-3'></div>
      </div>
      {/* ── Save Button ────────────────────────────── */}
      <div className='flex justify-end mt-8 mb-4'>
        <button onClick={handleSubmit} disabled={loading}
          className='px-10 py-3 bg-[#0062BD] hover:bg-[#0054A3] text-white font-semibold rounded-xl transition-all disabled:opacity-60 cursor-pointer'>
          {loading ? 'Saving...' : 'Save Customer'}
        </button>
      </div>
    </main>
  )
}

export default NewCustomer