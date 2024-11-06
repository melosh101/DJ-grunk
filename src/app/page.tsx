import { api, HydrateClient } from "~/trpc/server";
import Navbar from "./_components/ui/navbar";
import Footer from "./_components/ui/footer";
import Image from "next/image";
import { AlbumCarousel } from "./carousel";

export default async function Home() {
  const albums = await api.albums.getAllAlbums();
  const randomAlubms = albums.sort(() => Math.random() - 0.5).slice(0, 3);
  return (
    <HydrateClient>
      <Navbar />
      <main className="grid md:grid-cols-3 gap-y-20 md:gap-x-4 flex-grow">
          {/* box 1 */}
          <div className=" bg-slate-400 p-4 h-full md:text-lg my-auto">
            <h1 className="font-bold text-xl mt-4">Velkommen Hos DJ Grunk.</h1>
            <p className="pt-5">
              Her hos DJ Grunk kan du være med til at bestemme hvilken musik der skal indkøbes til Musikbiblioteket. <br/>
              Hvis du ikke allerede er oprettet som bruger så skynd dig at blive det. Så får du nemlig også 1500 Grunker som du kan bruge til at “købe” for i musikbutikken. <br />
              De cd’er der bliver købt flest gange havner på hitlisten her til venstre og hvis du er med til at få dine favoritter på hitlisten er der større chance for at du hurtigere kan låne dem på Musikbiblioteket. <br />
              Du kan også lave dine egne anmeldelser, så andre brugere kan se hvilken musik der er på toppen i øjeblikket. <br />
              Kik dig omkring og vær med til at sætte liv i kludene.
              DJ Grunk.</p>
          </div>
          {/* box 2 */}
          <div className="bg-slate-400 p-4 overflow-hidden h-full my-auto">
            <h1 className="font-bold text-xl mt-4">Hot lige nu</h1>
            <AlbumCarousel />
          </div>
          {/* box 3 */}
          <div className="bg-slate-400 md:grid grid-cols-2 my-auto gap-8 p-8 h-full">
            {randomAlubms.map((album) => (
              <div key={album.id} className="md:mt-16 last:col-span-2 last:mx-auto lg:[&:last-child>img]:max-w-[50%] lg:[&:last-child>img]:mx-auto ">
                <Image src={"/covers/" + album.cover} alt={album.title}  width={512} height={512} className="aspect-square min-h-16 min-w-16" />
                <h2 className="text-center mt-2">{album.title}</h2>
                <p className="text-center">{album.artist.name}</p>
              </div>
            ))}
          </div>
      </main>
      <Footer />
    </HydrateClient>
  );
}
