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
import Image from "next/image"
import { signIn } from "next-auth/react"
import Link from "next/link"

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username or Email is required" })
    .min(8, { message: "Username or Email must be at least 8 characters long" })
    // https://www.atdata.com/blog/long-email-addresses#:~:text=So%20over%20the%20last%20few,show%20at%20least%2031%20characters.
    // A very small percentage of people have email addresses longer than 50 chars, but went up to 75 just to be safe
    .max(75, { message: "Username or Email cannot be longer than 75 characters"}),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password cannot be more than 32 characters long"})
    .regex(/(?=.*[A-Z])/, { message: "Password must include at least 1 upper case letter"})
    .regex(/(?=.*[0-9])/, { message: "Password must include at least 1 digit 0-9"})
    .regex(/(?=.*[!#$%^&*])/, { message: "Password must include at least 1 of the following special characters !#$%^&*"})
})

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

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
    const {
      username,
      password
    } = values

    const emailSchema = z.string().email();

    const validateEmail = (input: string) => {
      try {
        emailSchema.parse(input);
        return true;
      } catch (error) {
        return false;
      }
    };

    const payload = {
      
    }

    if (validateEmail(username)) {
      console.log("Email")
    } else {
      console.log("Password")
    }
  }

  return (
    <div className="sm:w-96 w-auto bg-secondary p-8 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input placeholder="Username or Email" {...field} />
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
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Sign In</Button>
          <p className="text-sm">
            Don't have an account? 
            <Link href="/auth/signUp" className="ml-1 text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>

          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-primary after:ml-4 after:block after:h-px after:flex-grow after:bg-primary">
            or
          </div>

          <Button className="w-full" onClick={(e) => {
            e.preventDefault()
            signIn("google")
          }}> 
              <Image src={"/google.svg"} alt="Google logo" width={24} height={24} className="mr-1" />
            Sign In with Google 
          </Button>
          <Button className="w-full" onClick={(e) => {
            e.preventDefault()
            signIn("facebook")
          }}> 
              <Image src={"/facebook.svg"} alt="Facebook logo" width={24} height={24} className="mr-1" />
            Sign In with Facebook 
          </Button>

          
        </form>
      </Form>
    </div>
  )
}
