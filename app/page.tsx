import UploadForm from "@/components/UploadForm";
import { logout } from "./auth/signout/actions";
import MainDisplay from "@/components/MainDisplay";
import { UploadProvider } from "@/context/UploadContext";



export default function Home() {

  return (
    <>
      <form action={logout} className="flex justify-end p-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out">
          Sign out
        </button>
      </form>
      <UploadProvider>
        <div className="container mx-auto p-6">
          <UploadForm />
          <MainDisplay />
        </div>
      </UploadProvider>
    </>
  );
}
