import { useState } from "react";
import Header from "@/components/header";
import useStorageImages from "@/hooks/useStorageImages";

export default function Database() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<{ name: string; url: string } | null>(null);
  const categories = useStorageImages();

  return (
    <main className="relative w-screen h-screen bg-[url('/forside.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      <div className="relative z-10">
        <Header />
      </div>

      <div className="relative w-screen flex z-10 h-[85vh]">
        <div className="w-3/4 text-white px-8 overflow-y-auto h-full">
          {categories.length > 0 ? (
            categories.map(({ category, urls }) => {
              const filteredImages = urls.filter((img) =>
                img.name.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredImages.length === 0) return null;

              return (
                <div key={category} className="mb-12">
                  <div className="relative w-full mb-4">
                    <h2 className="inset-0 flex items-center text-white text-2xl font-bold bg-black bg-opacity-60 py-2 pl-4">
                      {category.toUpperCase()}
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {filteredImages.map((img, index) => (
                      <div
                        key={index}
                        className="bg-white text-black p-2 shadow-lg cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-[12rem] object-cover"/>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-white">Laster kunstverk...</p>
          )}
        </div>

        <div className="w-1/4 border-l border-white p-6 bg-opacity-50 text-white">
          <div>
            <p className="text-xl font-semibold text-gray-200 mb-3">Søk</p>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Søk etter kunstverk..."
            />
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-black bg-opacity-70">
            <button
              className="text-white text-lg px-4 py-2"
              onClick={() => setSelectedImage(null)}>← Tilbake
            </button>
            <p className="text-white text-2xl font-semibold">{selectedImage.name
              .replace(/\d{2,4}x\d{2,4}\s*cm?/gi, '')
              .replace(/\(\d+\)/g, '')
              .replace(/\.(jpg|jpeg|png)$/i, '')
              .replace(/\s+$/, '')
              .trim()}
            </p>  
            <div className="w-16"></div>  
          </div>

          <img
            src={selectedImage.url}
            alt={selectedImage.name}
            className="w-auto h-auto max-w-full max-h-full object-contain"
          />
        </div>
      )}

    </main>
  );
}
