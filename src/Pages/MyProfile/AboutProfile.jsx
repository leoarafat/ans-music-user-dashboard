const AboutProfile = ({ profileData, isLoading, refetch }) => {
  if (isLoading) {
    return <p>Loading..</p>;
  }
  return (
    <div className="bg-white p-5 m-5 grid grid-cols-5 gap-5">
      <div className="profile-image col-span-1">
        <img src={profileData?.image} alt="" />
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Name</p>
              <p className="about-profile-title">{profileData?.name}</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Email</p>
              <p className="about-profile-title">{profileData?.email}</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Phone</p>
              <p className="about-profile-title">{profileData?.phoneNumber}</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Address</p>
              <p className="about-profile-title">{profileData?.address}</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Cuntry</p>
              <p className="about-profile-title">{profileData?.country}</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">State</p>
              <p className="about-profile-title">{profileData?.state}</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Ciry</p>
              <p className="about-profile-title">{profileData?.city}</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Vat Registered?</p>
              <p className="about-profile-title">No</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Vat Number?</p>
              <p className="about-profile-title">No</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Facebook</p>
              <p className="about-profile-values">www.facebook.com</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Instagram</p>
              <p className="about-profile-values">www.facebook.com</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Twitter</p>
              <p className="about-profile-values">www.facebook.com</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Youtube</p>
              <p className="about-profile-values">www.facebook.com</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Google Plus</p>
              <p className="about-profile-values">www.facebook.com</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Linkedin</p>
              <p className="about-profile-values">www.facebook.com</p>
            </div>
            <div className="flex items-center justify-between about-profile-custom">
              <p className="about-profile-title">Linkedin</p>
              <p className="about-profile-values">www.facebook.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProfile;
