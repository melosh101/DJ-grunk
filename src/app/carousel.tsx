"use client"
import AutoPlay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./_components/ui/carousel";
import Image from "next/image";
import { api } from "~/trpc/react";
import { Skeleton } from "./_components/ui/skeleton";
import { album, albumWithArtist } from "~/server/db/schema";
import Link from "next/link";

export const AlbumCarousel = () => {
    const albums = api.albums.getAllAlbums.useQuery();
    return (
        <Carousel opts={{
            loop: true,
        }}
            plugins={[
                AutoPlay({
                    delay: 5000,
                })
            ]}
            className="pt-5 w-full">
            <CarouselContent className="w-full">
                {albums.isSuccess ? createCarouselItems(albums.data) :
                    <CarouselItem className="ml-24">
                        <Skeleton className="h-[150px] w-[150px]" />
                        <Skeleton className="mt-2 h-4 w-[150px]" />
                    </CarouselItem>
                }
            </CarouselContent>
            <CarouselNext className="mr-12" />
            <CarouselPrevious className="ml-12" />
        </Carousel>
    )
}

const createCarouselItems = (albums: albumWithArtist[]) => {
    return albums.map((album) => (
        <CarouselItem key={album.id}>
            <Link href={`/albums/${album.id}`}>
                <Image loading="lazy" src={"/covers/" + album.cover} alt={album.title} width={150} height={150} className="mx-auto md:h-80 md:w-80" />
                <p className="text-center mt-4">{album.title} - {album.artist.name}</p>
            </Link>
        </CarouselItem>
    ))
}