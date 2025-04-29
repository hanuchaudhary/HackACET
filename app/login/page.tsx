import Link from "next/link"
import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold">Log in to your account</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enter your credentials to continue</p>
          </div>
          <div className="mt-6">
            <LoginForm />
          </div>
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
