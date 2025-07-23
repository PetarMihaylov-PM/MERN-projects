import React from 'react'
import { assets } from '../../assets/assets'

function Footer() {
	return (
		<footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
			<div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
				{/* Left Side */}
				<div className='flex flex-col md:items-start items-center w-full'>
					<img className='w-25' src={assets.logo3} alt="logo" />
					<p className='mt-6 text-center md:text-left text-sm text-white'>A modern learning platform offering flexible, expert-led courses to help you grow your skills anytime, anywhere.</p>
				</div>
				<div className='flex flex-col md:items-start items-center w-full'>
					<h2 className='font-semibold text-white mb-5'>Compnay</h2>
					<ul className='flex md:flex-col w-full justify-between text-sm text-white md:space-y-2'>
						<li>
							<a href="#">Home</a>
						</li>
						<li>
							<a href="#">About us</a>
						</li>
						<li>
							<a href="#">Contact us</a>
						</li>
						<li>
							<a href="#">Privacy policy</a>
						</li>
					</ul>
				</div>
				<div></div>
			</div>
			<p className='py-4 text-center text-xs md:text-sm text-white'>Copyright © 2025 Pete's Academy. All Rights Reserved.</p>
		</footer>
	)
}

export default Footer