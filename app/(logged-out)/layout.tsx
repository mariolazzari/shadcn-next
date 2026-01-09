import { Layout } from "@/types/Layout";

function LoggedOutLayout({ children }: Layout) {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-24 gap-4">
      {children}
    </div>
  );
}

export default LoggedOutLayout;
