import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<{
    name: string;
    email: string;
    dob: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  // Fetch profile data from the /profile endpoint
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure cookies are included in the request
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data); // Set the profile data
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching profile');
      }
    };

    fetchProfileData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
      <div className="space-y-4">
        <div>
          <strong className="text-gray-700">Name:</strong>
          <p className="text-gray-900">{profileData.name}</p>
        </div>
        <div>
          <strong className="text-gray-700">Email:</strong>
          <p className="text-gray-900">{profileData.email}</p>
        </div>
        <div>
          <strong className="text-gray-700">Date of Birth:</strong>
          <p className="text-gray-900">{new Date(profileData.dob).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
