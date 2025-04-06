'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const van = searchParams.get('van') || 'Transit Medium Roof';
  const pickup = searchParams.get('pickup') || 'Orlando';
  const dropoff = searchParams.get('dropoff') || 'Austin';
  const startDate = searchParams.get('startDate') || '2025-04-22';
  const endDate = searchParams.get('endDate') || '2025-04-22';
  const startTime = searchParams.get('startTime') || '1:00 PM';
  const endTime = searchParams.get('endTime') || '4:30 PM';
  const price = parseFloat(searchParams.get('price') || '189');
  const discount = parseFloat(searchParams.get('discount') || '180');

  const [countdown, setCountdown] = useState(5 * 60);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    email: '',
    special: '',
    smsUpdates: false,
    agreed: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const min = String(Math.floor(countdown / 60)).padStart(2, '0');
    const sec = String(countdown % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.agreed) {
      alert('Please fill all required fields and accept agreement.');
      return;
    }
    router.push('/success');
  };

  // Estimate logic
  const rentalDays = 1;
  const dropFee = 1084.56;
  const licenseFee = 12;
  const cdwFee = 20;
  const subtotal = discount * rentalDays + dropFee + licenseFee + cdwFee;
  const tax = subtotal * 0.065;
  const total = subtotal + tax;
  const deposit = total * 0.3;

  const states = [
    "Alabama", "Alaska", "Alberta", "American Samoa", "Arizona", "Arkansas",
    "British Columbia", "California", "Colorado", "Connecticut", "Delaware",
    "District Of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Manitoba", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Newfoundland", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "North Mariana Islands", "Nova Scotia", "Ohio", "Oklahoma", "Ontario", "Oregon",
    "Pennsylvania", "Prince Edward Island", "Puerto Rico", "Quebec", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const countries = [
    "United States", "Canada", "United Kingdom", "India", "Pakistan", "Australia",
    "Germany", "France", "Japan", "Mexico", "Brazil", "South Africa", "Russia",
    "UAE", "Qatar", "Malaysia", "China", "Indonesia", "Saudi Arabia", "Bangladesh",
    "Philippines", "Italy", "Spain", "Netherlands", "Vietnam", "Thailand", "Sweden",
    "Norway", "Denmark", "Greece", "New Zealand", "Colombia", "Chile", "Argentina"
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-center text-orange-600 font-bold text-xl mb-6">
        TIME LEFT TO COMPLETE RESERVATION: {formatTime()}
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Renter Info */}
        <div className="flex-1 border rounded bg-white shadow p-6">
          <h3 className="text-lg font-bold mb-4">Renter Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" onChange={handleChange} className="p-2 border rounded" />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} className="p-2 border rounded" />
            <input name="organization" placeholder="Organization" onChange={handleChange} className="p-2 border rounded" />
            <input name="street" placeholder="Street" onChange={handleChange} className="p-2 border rounded" />
            <input name="city" placeholder="City" onChange={handleChange} className="p-2 border rounded" />
            <select name="state" value={form.state} onChange={handleChange} className="p-2 border rounded">
              <option value="">State</option>
              {states.map((s) => <option key={s}>{s}</option>)}
            </select>
            <input name="zip" placeholder="Zip Code" onChange={handleChange} className="p-2 border rounded" />
            <select name="country" value={form.country} onChange={handleChange} className="p-2 border rounded">
              <option value="">Select Country</option>
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input name="phone" placeholder="Cell Phone" onChange={handleChange} className="p-2 border rounded" />
            <input name="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded col-span-2" />
            <textarea name="special" placeholder="Special Requests" onChange={handleChange} className="p-2 border rounded col-span-2" rows={3}></textarea>
          </div>

          <label className="flex items-center gap-2 mt-4 text-sm">
            <input type="checkbox" name="smsUpdates" onChange={handleChange} />
            I agree to receive updates via text
          </label>

          <div className="mt-6 text-sm border-t pt-4">
            <p className="font-bold mb-2">Renter Requirements</p>
            <ul className="list-disc list-inside space-y-1">
              <li>25 years of age or older*</li>
              <li>Proof of current auto liability insurance</li>
              <li>A valid and current driver license</li>
            </ul>
          </div>
        </div>

        {/* Summary Section - Matches Image Style */}
        <div className="w-full lg:w-[500px] border rounded shadow bg-white overflow-hidden">
          {/* Trip Itinerary */}
          <div className="bg-gray-100 border-b p-4 font-bold">Trip Itinerary</div>
          <div className="grid grid-cols-2 text-sm border-b">
            <div className="p-4 border-r">
              <div className="text-xs uppercase font-semibold text-gray-500">April 2025</div>
              <div className="text-3xl font-bold">22nd</div>
              <div className="text-sm">Tuesday</div>
              <div className="text-sm mt-1 font-semibold">Pickup:</div>
              <p className="text-xs text-gray-700">{pickup}<br />{startDate} {startTime}</p>
            </div>
            <div className="p-4">
              <div className="text-xs uppercase font-semibold text-gray-500">April 2025</div>
              <div className="text-3xl font-bold">22nd</div>
              <div className="text-sm">Tuesday</div>
              <div className="text-sm mt-1 font-semibold">Dropoff:</div>
              <p className="text-xs text-gray-700">{dropoff}<br />{endDate} {endTime}</p>
            </div>
          </div>

          {/* Rental Estimate */}
          <div className="bg-gray-100 border-b p-4 font-bold">Rental Estimate</div>
          <div className="p-4 space-y-3 text-sm">
            <div className="flex items-center gap-4">
              <img src="/van2.jpg" className="w-28 h-auto border rounded" alt="Van" />
              <div>
                <a href="#" className="text-blue-600 underline text-sm">Transit Transit Pictures</a>
                <div className="text-xs text-gray-600">{van}</div>
              </div>
            </div>
            <div className="flex justify-between border-t pt-2">
              <p>Rented for 1 day(s) at ${price.toFixed(2)}/day:</p>
              <p>${price.toFixed(2)}</p>
            </div>
            <div className="text-sm text-gray-500 italic">
              Free miles included:<br />
              <span className="text-xs">(Additional miles $0.35/mile)</span>
            </div>
            <div className="flex justify-between"><p>One-way Drop Fee</p><p>${dropFee}</p></div>
            <div className="flex justify-between"><p>Vehicle Licensing Fee</p><p>${licenseFee}</p></div>
            <div className="flex justify-between font-bold border-t pt-2">
              <p>Taxable Subtotal</p><p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between"><p>Florida Sales Tax @ 6.00%</p><p>${(subtotal * 0.06).toFixed(2)}</p></div>
            <div className="flex justify-between"><p>Orlando County Sales Tax @ 0.50%</p><p>${(subtotal * 0.005).toFixed(2)}</p></div>
            <div className="flex justify-between"><p>CDW @ $20.00/day</p><p>${cdwFee}</p></div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <p>Estimated Total:</p><p>${total.toFixed(2)}</p>
            </div>
            <div className="bg-green-100 p-2 mt-3 rounded flex justify-between font-semibold text-green-700">
              <p>Deposit Required To Reserve:</p>
              <p className="text-black font-bold text-lg">${deposit.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-gray-100 border-t p-4 font-bold">Customer Agreement</div>
          <label className="flex items-start gap-2 px-4 pb-6 text-sm">
            <input type="checkbox" name="agreed" onChange={handleChange} />
            <span>
              I agree to Bandago's <a className="text-blue-600 underline" href="#">Rental, Cancellation, and Mileage policies</a>.
            </span>
          </label>

          <div className="px-4 pb-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700 transition"
            >
              RESERVE NOW: ${deposit.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
