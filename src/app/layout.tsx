import './globals.css'

export const metadata = {
  title: 'VCS',
  description: 'Vereinigung der Chemiestudierenden an der ETH Zürich',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
