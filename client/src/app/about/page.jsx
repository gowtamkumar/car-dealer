'use client'
import React from 'react'
import { Button } from '@material-tailwind/react'

const About = () => {
  return (
    <section>
      <div class="relative" id="home">
        <div
          aria-hidden="true"
          class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div class="from-primary h-56 bg-gradient-to-br to-purple-400 blur-[106px] dark:from-blue-700"></div>
          <div class="to-sky-300 h-32 bg-gradient-to-r from-red-400 blur-[106px] dark:to-indigo-600"></div>
        </div>
        <div className="container mx-auto">
          <div class="relative ml-auto pt-36">
            <div class="mx-auto text-center lg:w-4/5">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white md:text-5xl xl:text-6xl">
                Unlock Your Drive at{' '}
                <span class="to-violet-500 bg-gradient-to-r from-red-500 to-red-700  bg-clip-text text-transparent">
                  <span className="drop-shadow-sm">RMJ Autos</span>
                </span>{' '}
                <span class="text-primary dark:text-white">
                  Where Every Mile Feels Like a Journey.
                </span>
              </h1>
              <p class="mt-8 text-gray-700 dark:text-gray-300">
                Welcome to RMJAUTOS, where I, Siddhartha Shankar Das, am delighted to invite you
                into our dynamic automotive universe. At RMJAUTOS, we don't just sell cars; we craft
                experiences, cater to aspirations and foster a community of passionate car
                enthusiasts.
              </p>
              <div class="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-4">
                <Button variant="gradient" color="red">
                  Get started
                </Button>
                <Button variant="text">Learn more</Button>
              </div>
            </div>
            <div class="mt-16 hidden justify-between gap-5 border-y border-gray-100 py-8 dark:border-gray-800 sm:flex">
              <div class="text-left">
                <h6 class="text-lg font-semibold text-gray-700 dark:text-white">Buy New Car</h6>
                <p class="mt-2 text-gray-500">
                  Determine how much you are willing to spend on a new car. Consider additional
                  costs such as insurance, taxes, and registration fees.
                </p>
              </div>
              <div class="text-left">
                <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                  Buy Recondition Car
                </h6>
                <p class="mt-2 text-gray-500">
                  Look for reputable dealerships or sellers that specialize in reconditioned cars.
                  Check reviews and ratings to ensure their credibility.
                </p>
              </div>
              <div class="text-left">
                <h6 class="text-lg font-semibold text-gray-700 dark:text-white">Buy Used Car</h6>
                <p class="mt-2 text-gray-500">
                  Determine how much you're willing to spend on a used car, considering additional
                  costs like taxes, registration, insurance, and potential repairs.
                </p>
              </div>
            </div>
            <div class="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
              <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="/svg/nissan.svg"
                  class="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="/svg/nissan.svg"
                  class="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="flex p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="/svg/nissan.svg"
                  class="m-auto h-9 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="/svg/nissan.svg"
                  class="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="flex p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="/svg/nissan.svg"
                  class="m-auto h-8 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="/svg/nissan.svg"
                  class="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="features">
        <div className="container mx-auto">
          <div class="md:w-2/3 lg:w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="text-secondary h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                clipRule="evenodd"
              />
            </svg>

            <h2 class="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
              Our Vision
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              Embark on a journey with us as we envision a future where your car-buying experience
              transcends the ordinary. RMJAUTOS is more than a marketplace; it's a haven for
              automotive dreams, a place where the pursuit of driving excellence meets the art of
              seamless transactions.
            </p>
          </div>
          <div class="mt-16 grid divide-x divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:divide-gray-700 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
            <div class="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 dark:bg-gray-800">
              <div class="relative space-y-8 p-8 py-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
                  class="w-12"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div class="space-y-2">
                  <h5 class="group-hover:text-secondary text-xl font-semibold text-gray-700 transition dark:text-white">
                    Unrivaled Selection
                  </h5>
                  <p class="text-gray-600 dark:text-gray-300">
                    Explore our meticulously curated selection of brand new and pre-owned vehicles,
                    each representing a commitment to quality, performance and style. Whether you're
                    drawn to the sleek lines of a new model or the enduring charm of a
                    well-maintained used car, our inventory is a testament to our dedication to
                    diversity and excellence.
                  </p>
                </div>
                <a href="#" class="group-hover:text-secondary flex items-center justify-between">
                  <span class="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-5 w-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div class="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 dark:bg-gray-800">
              <div class="relative space-y-8 p-8 py-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4341/4341134.png"
                  class="w-12"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div class="space-y-2">
                  <h5 class="group-hover:text-secondary text-xl font-semibold text-gray-700 transition dark:text-white">
                    Global Connectivity
                  </h5>
                  <p class="text-gray-600 dark:text-gray-300">
                    Dreaming of a car from overseas? Our platform seamlessly facilitates
                    international orders, ensuring that the car you desire is just a click away. We
                    break down borders to bring you a world of automotive possibilities.
                  </p>
                </div>
                <a href="#" class="group-hover:text-secondary flex items-center justify-between">
                  <span class="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-5 w-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div class="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 dark:bg-gray-800">
              <div class="relative space-y-8 p-8 py-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4341/4341160.png"
                  class="w-12"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div class="space-y-2">
                  <h5 class="group-hover:text-secondary text-xl font-semibold text-gray-700 transition dark:text-white">
                    Empowerment Through Listings
                  </h5>
                  <p class="text-gray-600 dark:text-gray-300">
                    RMJAUTOS is not just a marketplace; it's a platform for empowerment. Sellers can
                    effortlessly list their cars for sale, reaching a broad audience of potential
                    buyers. We believe in making the process simple, transparent, and rewarding for
                    all.
                  </p>
                </div>
                <a href="#" class="group-hover:text-secondary flex items-center justify-between">
                  <span class="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-5 w-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div class="group relative bg-gray-50 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 dark:bg-gray-900">
              <div class="relative space-y-8 p-8 py-12 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4341/4341025.png"
                  class="w-12"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div class="space-y-2">
                  <h5 class="group-hover:text-secondary text-xl font-semibold text-gray-700 transition dark:text-white">
                    Passionate Commitment
                  </h5>
                  <p class="text-gray-600 dark:text-gray-300">
                    At the heart of RMJAUTOS is a team of car enthusiasts, dedicated to making your
                    automotive journey memorable. We thrive on the passion that drives us and the
                    satisfaction that comes from connecting people with their perfect cars.
                  </p>
                </div>
                <a href="#" class="group-hover:text-secondary flex items-center justify-between">
                  <span class="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-5 w-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative py-16">
        <div
          aria-hidden="true"
          class="absolute inset-0 m-auto grid h-max w-full grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div class="from-primary h-56 bg-gradient-to-br to-purple-400 blur-[106px] dark:from-blue-700"></div>
          <div class="to-sky-300 h-32 bg-gradient-to-r from-cyan-400 blur-[106px] dark:to-indigo-600"></div>
        </div>
        <div className="container mx-auto">
          <div class="relative">
            <div class="flex items-center justify-center -space-x-2">
              <img
                loading="lazy"
                width="400"
                height="400"
                src="/svg/nissan.svg"
                alt="member photo"
                class="h-8 w-8 rounded-full object-cover"
              />
              <img
                loading="lazy"
                width="200"
                height="200"
                src="/svg/nissan.svg"
                alt="member photo"
                class="h-12 w-12 rounded-full object-cover"
              />
              <img
                loading="lazy"
                width="200"
                height="200"
                src="/svg/nissan.svg"
                alt="member photo"
                class="z-10 h-16 w-16 rounded-full object-cover"
              />
              <img
                loading="lazy"
                width="200"
                height="200"
                src="/svg/nissan.svg"
                alt="member photo"
                class="relative h-12 w-12 rounded-full object-cover"
              />
              <img
                loading="lazy"
                width="200"
                height="200"
                src="/svg/nissan.svg"
                alt="member photo"
                class="h-8 w-8 rounded-full object-cover"
              />
            </div>
            <div class="m-auto mt-6 space-y-6 md:w-8/12 lg:w-7/12">
              <h1 class="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
                Get Started now
              </h1>
              <p class="text-center text-xl text-gray-600 dark:text-gray-300">
                Be part of millions people around the world using tailus in modern User Interfaces.
              </p>
              <div class="flex flex-wrap justify-center gap-6">
                <Button variant="gradient" color="red">
                  Get started
                </Button>
                <Button variant="text">Learn more</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
