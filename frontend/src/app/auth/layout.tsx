export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
      {children}
    </div>
  )
}
