import Link from 'next/link'
import { Button } from "@/components/ui/button"
import LogoutButton from './LogoutButton'
import LightDarkButton from './LightDarkModeButton'

export default function() {
  return(
    <div className="w-screen h- h-[var(--navbar-height)] z-10 bg-primary-foreground sticky top-0 left-0 flex justify-center items-center gap-4">
      {/* navbar */}
      <Link href="/">
        <Button>
          Home
        </Button>
      </Link>
      <Link href="/auth/signUp">
        <Button>
        Sign Up
        </Button>
      </Link>
      <Link href="/auth/signIn">
        <Button>
          Login
        </Button>
      </Link>
      <LogoutButton />
      <LightDarkButton />
    </div>
  )
}