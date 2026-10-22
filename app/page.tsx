import Gallery from "@/components/gallery/gallery";
import { loadArtworks } from "@/lib/artwork";

/**
 * The gallery. A Server Component: the artwork list is read and the images
 * measured here, at build time, and only the finished records reach the
 * client. To add a work, see content/artwork.json.
 */
export default async function GalleryPage() {
  const items = await loadArtworks();
  return <Gallery items={items} />;
}
