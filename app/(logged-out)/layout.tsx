import { LightDarkToogle } from "@/components/light-dark-toggle";
import { Layout } from "@/types/Layout";

function LoggedOutLayout({ children }: Layout) {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center p-24 gap-4">
        {children}
      </div>
      <LightDarkToogle className="fixed right-0 top-1/2" />
    </>
  );
}

export default LoggedOutLayout;
