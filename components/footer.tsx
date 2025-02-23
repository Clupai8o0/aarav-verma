import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="w-full flex justify-between items-center border-t border-border/50 py-6 px">
      <p className="font-sans text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Aarav Verma. All rights reserved.
      </p>

      <div className="flex items-center gap-4">
        <Link href="/" className="font-sans text-sm text-muted-foreground hover:text-primary">
          Home
        </Link>
        <Link href="/contact" className="font-sans text-sm text-muted-foreground hover:text-primary">
          Contact
        </Link>
      </div>
    </footer>
  )
}

export default Footer