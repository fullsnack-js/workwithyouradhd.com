'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'About', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'FAQs', href: '#' },
//   { name: 'Company', href: '#' },
]

export const Mailto = ({ styles,email="workwithyouradhd@gmail.com", subject = "I want to learn more", body = '', children }:{email:string, subject?: string, body?: string, styles?:any,children: React.ReactNode[]}) => {
  let params = subject || body ? '?' : '';
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

  return <a className={styles} href={`mailto:${email}${params}`}>{children}</a>;
};


export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="/logo.png"
                className="h-20 w-auto"
              />
            </a>
          </div>
          <div className="flex items-center">
          <div className="flex items-center px-4">
          <a
                  href="https://calendly.com/workwithyouradhd/30min"
                  className="rounded-md bg-orange-400 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                >
                  Free Consult
                </a></div>
          <div className="flex items-center justify-end">
          
            <Mailto email="workwithyouradhd@gmail.com" styles="text-xs sm:text-sm bg-yellow-300 hover:bg-yellow-200 px-4 py-2 rounded font-semibold leading-6 text-gray-600">
              Contact <span aria-hidden="true">&rarr;</span>
            </Mailto>
            
          </div>
          </div>
          <div className="flex hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href={"mailto:workwithyouradhd@gmail.com"} className="text-sm bg-yellow-200 px-4 py-2 rounded font-semibold leading-6 text-gray-900">
              Contact <span aria-hidden="true">&rarr;</span>
            </a>
             <a
                  href="https://calendly.com/workwithyouradhd/30min"
                  className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Free Consultation
                </a>
          </div> */}

        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                alt=""
                src="/logo.png"
                className="h-20 w-auto"
              />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <span className='bg-yellow-200 px-3 py-2.5 rounded-lg '>Contact</span>
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              The Missing Factor in your ADHD Plans
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                {"Hi I'm Leslie! I'm an ADHD Coach whose life changed when I learned to manage my own ADHD. It is my passion and purpose to empower other neurodivergents to work WITH their unique brains to thrive. It IS possible to learn new skills and tools, and I am dedicated to helping you succeed."}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="https://calendly.com/workwithyouradhd/30min"
                  className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                >
                  Free Consultation
                </a>
                <a href={"mailto:workwithyouradhd@gmail.com"} className="rounded-md text-sm px-3.5 py-2.5 bg-yellow-300 hover:bg-yellow-200 font-semibold leading-6 text-gray-600">
                  Contact <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <img
              alt=""
              src="/familia.jpg"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  )
}
