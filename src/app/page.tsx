import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";
import Navbar from "./_components/ui/navbar";
import Footer from "./_components/ui/footer";
import { Carousel, CarouselContent, CarouselItem } from "./_components/ui/carousel";
import Image from "next/image";
export default async function Home() {
  const albums = await api.albums.getAllAlbums();
  const carouselItems = albums.map((album) => (
    <CarouselItem key={album.id} className="">
      <Image loading="lazy" src={"/covers/"+album.cover} alt={album.title} width={150} height={150} className="mx-auto"/>
      <p className="text-center">{album.title}</p>
    </CarouselItem>
  ))
  const randomAlubms = albums.sort(() => Math.random() - 0.5).slice(0, 3);
  return (
    <HydrateClient>
      <Navbar/>
      <main className="flex flex-grow flex-col">
        <h1>main content</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-400 p-4">
            <p>Velkommen Hos DJ Grunk.
Her hos DJ Grunk kan du være med til at bestemme hvilken musik der skal indkøbes til Musikbiblioteket.
Hvis du ikke allerede er oprettet som bruger så skynd dig at blive det. Så får du nemlig også 1500 Grunker som du kan bruge til at “købe” for i musikbutikken.
De cd’er der bliver købt flest gange havner på hitlisten her til venstre og hvis du er med til at få dine favoritter på hitlisten er der større chance for at du hurtigere kan låne dem på Musikbiblioteket.
Du kan også lave dine egne anmeldelser, så andre brugere kan se hvilken musik der er på toppen i øjeblikket.
Kik dig omkring og vær med til at sætte liv i kludene.
   DJ Grunk.</p>
          </div>
          <div className="bg-slate-400 p-4 overflow-hidden">
          <Carousel opts={{
            align: "center",
            loop: true,

          }}>
              <CarouselContent className="w-full">
                {carouselItems}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="bg-slate-400 p-4">
            {randomAlubms.map((album) => (<img src={"/covers/"+album.cover} alt={album.title} key={album.id} className="m-4 flex w-1/2 mx-auto"/>))}
          </div>
        </div>
      </main>
      <Footer/>
    </HydrateClient>
  );
}
