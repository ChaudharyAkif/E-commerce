import EditProfile from "./EditProfile";

function ManageAccount() {
  return (
      <div className="w-full -sm py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">            
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="flex justify-between px-6 py-4 lg:pl-10 text-sm text-gray-700">
        <span className="text-gray-400">Home / <span className="text-black">My Account</span></span>
        <span>Welcome! <span className="text-red-500 font-medium">Md Rimel</span></span>
      </div>

      {/* Content */}
      <EditProfile />
    </div>
            </div>
        </div>
  );
}

export default ManageAccount;
