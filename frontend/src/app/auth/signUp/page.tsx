"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const formSchema = z.object({
  email: z
  .string()
  .email()
  .min(1, { message: "Email is required"})
  .max(75, { message: "Email cannot be more than 75 characters long"}),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .min(6, { message: "Username must be at least 6 characters long" })
    .max(32, { message: "Username cannot be longer than 32 characters"}),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password cannot be more than 32 characters long"})
    .regex(/(?=.*[A-Z])/, { message: "Password must include at least 1 upper case letter"})
    .regex(/(?=.*[0-9])/, { message: "Password must include at least 1 digit 0-9"})
    .regex(/(?=.*[!#$%^&*])/, { message: "Password must include at least 1 of the following special characters !#$%^&*"}),
  confirmPassword: z
    .string()
    .min(1, { message: "Password is required" })
})
  .refine((data) => data.password === data.confirmPassword , {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  })

export default function SignUp() {
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/');  // Redirect to homepage if user is logged in
    }
  }, [session]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const res = await fetch("http://localhost:3333/users/signup/credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        provider: "credentials",
        username: values.username,
        email: values.email,
        password: values.password
      })
    });


    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.error("Request failed:", res.status, res.statusText);
    }

    // console.log(res)
  }

  return (
    <div className="sm:w-96 w-auto bg-secondary p-8 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Sign Up</Button>
          <p className="text-sm w-full flex justify-center">
            Already have an account? 
            <Link href="/auth/signIn" className="ml-1 text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}
