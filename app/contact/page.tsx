import Bounded from '@/components/layout/bounded'
import React from 'react'

function ContactPage() {
  return (
		<Bounded className="h-[60vh] mb-12 mt-24">
			<h1 className="text-4xl font-bold font-serif mb-3">Contact Us</h1>
			<p className="text-muted-foreground mb-6">
				Got any questions? We'd love to hear from you.
			</p>
			<div className="flex flex-col gap-4">
				<div className="flex gap-2">
					<p className="text-sm text-muted-foreground">Email:</p>
					<p className="text-sm">anu0310v@gmail.com</p>
				</div>
				<div className="flex gap-2">
					<p className="text-sm text-muted-foreground">Phone:</p>
					<p className="text-sm">+61 0 451 283 767</p>
				</div>
				<div className="flex gap-2">
					<p className="text-sm text-muted-foreground">Instagram:</p>
					<p className="text-sm">@aaravvermagg</p>
				</div>
			</div>
		</Bounded>
	);
}

export default ContactPage