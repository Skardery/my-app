import Link from "next/link";

export default function Main() {
  
  return (
    <>
      <main className="relative w-screen h-screen flex items-center justify-center bg-[url('/forside.jpg')] bg-cover">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 bg-gradient-radial from-black via-black/80 to-transparent"></div>

        <div className="flex flex-col items-center relative z-10 text-white text-center px-4">
          <p className="text-6xl font-bold text-gray-200">STEINAR HANSEN</p>
          <p className="mt-4">
            Steinar Hansen er en abstrakt norsk kunstner som lager malerier, litografier og mye annet.
          </p>
          <Link href="/database"><button className="group mt-4 border border-gray-400 rounded-md px-12 py-4 font-semibold text-lg relative overflow-hidden">
            <span className="absolute inset-0 bg-gray-100 transition-opacity opacity-0 group-hover:opacity-10"></span>
            <span className="relative z-10 text-white">Sjekk ut kunstverkene</span>
          </button></Link>
          <div className="mt-4 flex">
            <Link href="https://www.facebook.com/">
              <div className="flex items-center">
                <img src="/facebook.webp" width="40" height="40" alt="" /><p className="ml-2 font-bold">Facebook</p>
              </div>
            </Link>
            <Link href="https://www.instagram.com/">
              <div className="flex items-center ml-10">
                <img src="/instagram.webp" width="40" height="40" alt="" /><p className="ml-2 font-bold">Instagram</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
