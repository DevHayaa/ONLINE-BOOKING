'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CheckAvailability() {
  const searchParams = useSearchParams();
  const pickup = searchParams.get('pickup');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const [checking, setChecking] = useState(true);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulated logic for availability
      if (pickup === 'AUSTIN' || pickup === 'DENVER') {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
      setChecking(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pickup]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
      {checking ? (
        <div className="text-center">
          <img src="/image.png" alt="Checking Availability" className="mx-auto w-48" />
          <p className="text-gray-700 mt-4">Checking availability for vans in {pickup} from {startDate} to {endDate}...</p>
        </div>
      ) : available ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Vans:</h2>
          <div className="flex gap-6 border p-4 rounded-lg">
            <img src="/van.jpg" alt="Van" className="w-60 rounded" />
            <div>
              <h3 className="text-xl font-bold mb-2">SPRINTER GRAND</h3>
              <ul className="text-sm mb-2 space-y-1">
                <li>• 12 PASSENGERS</li>
                <li>• POWER OUTLETS</li>
                <li>• 24 MPG (DIESEL)</li>
                <li>• GPS NAVIGATION</li>
                <li>• RECLINING SEATS</li>
                <li>• REAR CAMERA</li>
              </ul>
              <p className="text-lg font-semibold">$327/day</p>
              <p className="text-green-600">Now: $311/day - Save $17.58!</p>
              <div className="flex gap-2 mt-2">
                <button className="bg-black text-white px-4 py-2 rounded">RESERVE</button>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded">PAY NOW</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-600 font-semibold text-xl">
          Sorry! No vans available in {pickup} between {startDate} and {endDate}.
        </p>
      )}
    </div>
  );
}
