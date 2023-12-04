import React from 'react'

const About = () => {
  return (
    <section>
      <div class="relative" id="home">
        <div
          aria-hidden="true"
          class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div class="from-primary h-56 bg-gradient-to-br to-purple-400 blur-[106px] dark:from-blue-700"></div>
          <div class="to-sky-300 h-32 bg-gradient-to-r from-cyan-400 blur-[106px] dark:to-indigo-600"></div>
        </div>
        <div className="container mx-auto">
          <div class="relative ml-auto pt-36">
            <div class="mx-auto text-center lg:w-2/3">
              <h1 class="text-5xl font-bold text-gray-900 dark:text-white md:text-6xl xl:text-7xl">
                Shaping a world with{' '}
                <span class="text-primary dark:text-white">reimagination.</span>
              </h1>
              <p class="mt-8 text-gray-700 dark:text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque
                sed eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam.
                Quidem harum omnis beatae ipsum soluta!
              </p>
              <div class="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-4">
                <a
                  href="#"
                  class="before:bg-primary relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span class="relative text-base font-semibold text-white">Get started</span>
                </a>
                <a
                  href="#"
                  class="before:bg-primary/10 relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                >
                  <span class="text-primary relative text-base font-semibold dark:text-white">
                    Learn more
                  </span>
                </a>
              </div>
              <div class="mt-16 hidden justify-between border-y border-gray-100 py-8 dark:border-gray-800 sm:flex">
                <div class="text-left">
                  <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                    The lowest price
                  </h6>
                  <p class="mt-2 text-gray-500">Some text here</p>
                </div>
                <div class="text-left">
                  <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                    The fastest on the market
                  </h6>
                  <p class="mt-2 text-gray-500">Some text here</p>
                </div>
                <div class="text-left">
                  <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                    The most loved
                  </h6>
                  <p class="mt-2 text-gray-500">Some text here</p>
                </div>
              </div>
            </div>
            <div class="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
              <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/microsoft.svg"
                  class="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/airbnb.svg"
                  class="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="flex p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/google.svg"
                  class="m-auto h-9 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/ge.svg"
                  class="mx-auto h-12 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="flex p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/netflix.svg"
                  class="m-auto h-8 w-auto"
                  loading="lazy"
                  alt="client logo"
                  width=""
                  height=""
                />
              </div>
              <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
                <img
                  src="./images/clients/google-cloud.svg"
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
                fill-rule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                clip-rule="evenodd"
              />
            </svg>

            <h2 class="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
              A technology-first approach to payments and finance
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ad ipsum pariatur
              autem, fugit laborum in atque amet obcaecati? Nisi minima aspernatur, quidem nulla
              cupiditate nam consequatur eligendi magni adipisci.
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
                    First feature
                  </h5>
                  <p class="text-gray-600 dark:text-gray-300">
                    Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.
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
                      fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
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
                    Second feature
                  </h5>
                  <p class="text-gray-600 dark:text-gray-300">
                    Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.
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
                      fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
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
                    Third feature
                  </h5>
                  <p class="text-gray-600 dark:text-gray-300">
                    Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.
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
                      fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
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
                    More features
                  </h5>
                  <p class="text-gray-600 dark:text-gray-300">
                    Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.
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
                      fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
