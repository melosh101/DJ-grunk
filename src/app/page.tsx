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
          <div className="bg-slate-400 p-4 h-[80%]">
            <h1 className="font-bold text-xl">Velkommen Hos DJ Grunk.</h1>
            <p className="pt-5">
              Her hos DJ Grunk kan du være med til at bestemme hvilken musik der skal indkøbes til Musikbiblioteket.
              Hvis du ikke allerede er oprettet som bruger så skynd dig at blive det. Så får du nemlig også 1500 Grunker som du kan bruge til at “købe” for i musikbutikken.
              De cd’er der bliver købt flest gange havner på hitlisten her til venstre og hvis du er med til at få dine favoritter på hitlisten er der større chance for at du hurtigere kan låne dem på Musikbiblioteket.
              Du kan også lave dine egne anmeldelser, så andre brugere kan se hvilken musik der er på toppen i øjeblikket.
              Kik dig omkring og vær med til at sætte liv i kludene.
              DJ Grunk.</p>
          </div>
          <div className="bg-slate-400 p-4 h-[80%] overflow-hidden">
            <h1 className="font-bold text-xl">Hot lige nu</h1>
            <AlbumCarousel />
          </div>
          <div className="bg-slate-400 p-4 md:grid md:grid-flow-row grid-cols-2 grid-rows-2 h-[80%]">
            {randomAlubms.map((album) => (<div key={album.id} className="last:col-span-2">
              <Image src={"/covers/" + album.cover} alt={album.title}  width={512} height={512} className="m-4 h-52 w-52 mx-auto" />
              <h2 className="text-center">{album.title}</h2>
              <p className="text-center">{album.artist.name}</p>
            </div>))}
          </div>
      </main>
      <Footer />
    </HydrateClient>
  );
}
