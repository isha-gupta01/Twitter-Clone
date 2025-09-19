"use client";
import dynamic from "next/dynamic";

const RegisterPage = dynamic(() => import("@/components/RegisterPage"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-screen text-white">
      Loading registration form...
    </div>
  ),
});

export default function RegisterPageWrapper() {
  return <RegisterPage />;
}
