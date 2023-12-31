import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../configs/firebase';

const WelcomeBanner = () => {
  const { auth } = useSelector((state) => state);
  const [user, setUser] = useState('');
  // get users data
  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection('users')
      .where('email', '==', auth?.user?.email)
      .onSnapshot((snapshot) => {
        setUser(snapshot?.docs[0]?.data());
      });

    return () => {
      unsubscribe();
    };
  }, [auth?.user?.email]);

  return (
    <>
      {user === '' ? (
        <div className="w-full h-24 rounded-md mx-auto my-10">
          <div className="flex animate-pulse flex-row items-center h-full justify-center">
            <div className="w-full bg-indigo-50 h-40 sm:h-36 rounded-md "></div>
          </div>
        </div>
      ) : (
        <div className="relative bg-indigo-50 p-4 sm:p-6 rounded-sm overflow-hidden mb-8 mt-2">
          {/* Background illustration */}
          <div
            className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
            aria-hidden="true"
          >
            <svg
              width="319"
              height="198"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
                <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
                <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
                <linearGradient
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  id="welcome-b"
                >
                  <stop stopColor="#5C6BC0" offset="0%" />
                  <stop stopColor="#475569" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="50%"
                  y1="24.537%"
                  x2="50%"
                  y2="100%"
                  id="welcome-c"
                >
                  <stop stopColor="#94A3B8" offset="0%" />
                  <stop stopColor="#7986CB" stopOpacity="0" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <g transform="rotate(64 36.592 105.604)">
                  <mask id="welcome-d" fill="#fff">
                    <use xlinkHref="#welcome-a" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
                  <path
                    fill="url(#welcome-c)"
                    mask="url(#welcome-d)"
                    d="M64-24h80v152H64z"
                  />
                </g>
                <g transform="rotate(-51 91.324 -105.372)">
                  <mask id="welcome-f" fill="#fff">
                    <use xlinkHref="#welcome-e" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
                  <path
                    fill="url(#welcome-c)"
                    mask="url(#welcome-f)"
                    d="M40.333-15.147h50v95h-50z"
                  />
                </g>
                <g transform="rotate(44 61.546 392.623)">
                  <mask id="welcome-h" fill="#fff">
                    <use xlinkHref="#welcome-g" />
                  </mask>
                  <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
                  <path
                    fill="url(#welcome-c)"
                    mask="url(#welcome-h)"
                    d="M40.333-15.147h50v95h-50z"
                  />
                </g>
              </g>
            </svg>
          </div>

          {/* Content */}
          <div className="relative">
            <h1 className="font-display text-2xl md:text-3xl text-brand-900 font-semibold mb-2 tracking-wider">
              {new Date().getHours() > 12
                ? 'শুভ অপরাহ্ন'
                : new Date().getHours() > 19
                ? 'শুভ রাত্রি'
                : 'শুভ সকাল'}
              , {user?.name} <span className="wave">👋</span>
            </h1>
            <p className="pt-2 font-body text-gray-800 w-full sm:w-7/12">
              নবম থেকে দ্বাদশ শ্রেণির পদার্থবিজ্ঞান, রসায়ন ও জীববিজ্ঞান বিষয়ের
              সকল ল্যাব এক্সপেরিমেন্ট এবং বিজ্ঞান চর্চার সকল সিমুলেশন এখন সবসময়,
              সম্পূর্ণ বিনামূল্যে!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeBanner;
