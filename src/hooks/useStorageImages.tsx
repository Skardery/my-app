import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/components/firebase";

const categories = ["oljemalerier", "oljekritt på lito", "litografier"];

const useStorageImages = () => {
  const [images, setImages] = useState<
    { category: string; urls: { name: string; url: string }[] }[]
  >([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const categoryImages = await Promise.all(
          categories.map(async (category) => {
            const folderRef = ref(storage, category);
            const result = await listAll(folderRef);

            const urls = await Promise.all(
              result.items.map(async (item) => ({
                name: item.name,
                url: await getDownloadURL(item),
              }))
            );

            return { category, urls };
          })
        );

        setImages(categoryImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return images;
};

export default useStorageImages;
