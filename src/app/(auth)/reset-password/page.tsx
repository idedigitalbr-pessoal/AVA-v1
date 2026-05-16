import { ResetPasswordForm } from "@/features/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-600">AVA Acadêmica</h1>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
