import UploadForm from "@/components/UploadForm";
import { logout } from "./auth/signout/actions";
import MainDisplay from "@/components/MainDisplay";
import { UploadProvider } from "@/context/UploadContext";



export default function Home() {

  return (
    <>
      <form action={logout}>
        <button>
          Sign out
        </button>
      </form>
      <UploadProvider>
        <UploadForm />
        <MainDisplay />
      </UploadProvider>
    </>
  );
}
