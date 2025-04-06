'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, Plug, Fuel, Camera, Armchair, MapPlus } from 'lucide-react';
import router from 'next/router';
import Image from 'next/image';


export default function CheckAvailability() {
  const searchParams = useSearchParams();
    const router = useRouter();
  

  // Get all query params
  const pickup = searchParams.get('pickup');
  const dropoff = searchParams.get('dropoff');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');

  const [checking, setChecking] = useState(true);
  const [available, setAvailable] = useState(false);
  const [timeError, setTimeError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Combine dates and times to Date objects
      const startDateTime = new Date(`${startDate} ${startTime}`);
      const endDateTime = new Date(`${endDate} ${endTime}`);

      // Check if end is before start
      if (startDateTime >= endDateTime) {
        setTimeError(true);
        setChecking(false);
        return;
      }

      // Simulate availability logic
      if (pickup === 'AUSTIN' || pickup === 'DENVER') {
        setAvailable(true);
      } else {
        setAvailable(false);
      }

      setChecking(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pickup, startDate, endDate, startTime, endTime]);

  return (
    <div className="mx-auto p-6 mt-10 min-h-screen">
      {/* Loader */}
      {checking ? (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-50">
          <div className="text-center">


<Image
  src="/Loader.gif"
  alt="Checking Availability"
 width={112}
  height={84}
  className="w-80 h-60 mx-auto"
/>

            {/* <p className="text-gray-700 mt-4 text-lg">
              Checking availability for vans in <strong>{pickup}</strong>
              <br />
              From <strong>{startDate} {startTime}</strong> to <strong>{endDate} {endTime}</strong>...
            </p> */}
          </div>
        </div>
      ) : timeError ? (
        // Time-travel error
        <div className="text-center mt-20">
          <h2 className="text-red-600 font-bold text-xl mb-4">
            Unfortunately we do not rent time-traveling DeLoreans.
            <br />
            You can&apos;t end your rental before it starts!
            </h2>
          <p className="text-gray-700">
            Requested pickup date: {startDate} {startTime}
            <br />
            Requested dropoff date: {endDate} {endTime}
          </p>
          <p className="mt-6 text-gray-600">
            Click the back button on your browser to change your dates. :-)
          </p>
        </div>
      ) : available ? (
        // Van available
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl font-bold mb-6">Available Vans:</h2>

  <div className="space-y-10">
    {[1, 2].map((_, index) => (
      <div
        key={index}
        className="flex flex-col lg:flex-row border rounded-xl shadow-xl overflow-hidden bg-white"
      >
        {/* Left: Image */}
        <div className="lg:w-1/3 w-full p-6">

<Image
  src="/van.jpg"
  alt="Van"
  width={600}
  height={400}
  className="w-full h-72 object-cover rounded-md"
/>

          <button className="mt-4 w-full border border-black py-2 text-sm font-medium hover:bg-gray-100 transition rounded">
            More Pictures
          </button>
        </div>

        {/* Center: Features */}
        <div className="lg:w-1/3 w-full px-6 py-6 border-t lg:border-t-0 lg:border-l lg:border-r border-gray-200">
          <h3 className="text-2xl font-bold mb-4 uppercase text-gray-800 tracking-wide">
            {index === 0 ? 'Sprinter Grand' : 'Transit Medium Roof'}
          </h3>
          <h4 className="font-semibold text-md text-gray-600 mb-3">FEATURES</h4>
          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Users size={18} />
              {index === 0 ? '12 Passengers' : '15 Passengers'}
            </div>
            <div className="flex items-center gap-2">
              <Armchair size={18} />
              Reclining Seats
            </div>
            <div className="flex items-center gap-2">
              <Plug size={18} />
              Power Outlets
            </div>
            <div className="flex items-center gap-2">
              <Camera size={18} />
              Rear Camera
            </div>
            <div className="flex items-center gap-2">
              <Fuel size={18} />
              {index === 0 ? '24 MPG (Diesel)' : '19 MPG (Gasoline)'}
            </div>
            <div className="flex items-center gap-2">
              <MapPlus size={18} />
              GPS Navigation
            </div>
          </div>
        </div>

        {/* Right: Pricing & Actions */}
        <div className="lg:w-1/3 w-full p-6 flex flex-col justify-between bg-gray-50">
          <div>
            <p className="text-2xl font-bold text-gray-800">
              ${index === 0 ? 327 : 189} <span className="text-base">/day</span>
            </p>
            <p className="text-2xl font-bold text-yellow-500 mt-1">
              ${index === 0 ? 311 : 180} <span className="text-base">/day</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Est. Total: ${index === 0 ? '2,177' : '1,359.53'}
            </p>
            <div className="bg-black text-green-400 text-center py-2 mt-3 text-sm font-bold rounded-md">
              SAVE ${index === 0 ? '17.58' : '9.59'}!
            </div>
          </div>
          <div className="mt-5 flex gap-2">
          <button
            onClick={() =>
                router.push(
                `/checkout?van=${index === 0 ? 'Sprinter Grand' : 'Transit Medium Roof'
                }&price=${index === 0 ? 327 : 189
                }&discount=${index === 0 ? 311 : 180
                }&pickup=${pickup}&dropoff=${dropoff}&startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}`
                )
            }
            className="border border-black text-black px-4 py-2 font-bold w-1/2 rounded hover:bg-black hover:text-white transition"
            >
            RESERVE
            </button>

            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 font-bold w-1/2 rounded transition">
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


        </div>
      ) : (
        // No vans available
        <div className="text-center mt-20">
          <p className="text-red-600 font-semibold text-xl mb-2">
            Sorry! No vans available in {pickup} between:
          </p>
          <p className="text-gray-700">
            {startDate} {startTime} → {endDate} {endTime}
          </p>
          <p className="mt-4 text-gray-500">Try a different location or time range.</p>
        </div>
      )}
    </div>
  );
}
