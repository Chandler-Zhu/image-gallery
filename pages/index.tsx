import Image from 'next/image'
import { Fragment, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Dialog, Transition } from '@headlessui/react'

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )

  const { data } = await supabaseAdmin.from('images').select('*').order('id')
  return {
    props: {
      images: data,
    },
  }
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Image = {
  id: number
  slider: boolean
  imageSrc: string
  title: string
  keywords: string
}

export default function Gallery({ images }: { images: Image[] }) {
  let [isOpen, setIsOpen] = useState(false);
  let [copy,setCopy] = useState('Copy');
  function closeModal() {
    setIsOpen(false);
    setCopy('Copy');
  }
  function openModal() {
    
    if (navigator.share) {
      navigator.share({
        title: 'Chandler Zhu',
        text: 'Web developer and/or graphic designer 👨‍💻️',
        url: 'https://image-gallery-gray.vercel.app/',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
    setIsOpen(true);
    navigator.clipboard.writeText("https://image-gallery-gray.vercel.app/")
  }
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <div
      className="mb-6 pl-2 border-b-8 border-green-800 flex items-center lg:items-stretch flex-row"
    >
      <h1

        className="transition transform origin-left -skew-x-6 inline-block p-2 uppercase text-5xl bg-gradient-to-tr from-green-800 to-green-500 text-transparent bg-clip-text font-extrabold"
      >
        Chandler
      </h1>
      <div   className="justify-end flex flex-1 pt-4 pr-8 pb-4">
       <button type="button"
          onClick={openModal}>
       <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
       </button>

      </div>
      <Transition  show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900 mb-2"
                  >
                   Share this link
                  </Dialog.Title>
                  <p>If your browser does not support <a target="_blank" className='underline text-sky-600' href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share">Web Share API</a>, please try Chrome or Microsoft Edge</p>
                  <div className="mt-2">
                  <div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-gray-500 ml-2"
            >
              <path
                d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"
              ></path>
              <path
                d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"
              ></path>
            </svg>

            <input className="w-full outline-none bg-transparent" type="text" placeholder="link" value="https://image-gallery-gray.vercel.app/"/>

            <button onClick={() => setCopy('Copied!')} className="bg-blue-500 text-white rounded-md text-sm py-2 px-5 mr-2 hover:bg-blue-600">
                {copy}
            </button>
          </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}

function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <a href={image.imageSrc} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl'
              : 'scale-100 blur-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-md text-gray-700 font-semibold">{image.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900"><span className='text-gray-600 text-sm'>Keywords:</span> {image.keywords}</p>
    </a>
  )
}
