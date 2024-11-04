import Image from 'next/image';
import React from 'react';
import Footer from '~/app/_components/ui/footer';
import Navbar from '~/app/_components/ui/navbar';
import { api, HydrateClient } from '~/trpc/server';

type PageProps = {
    params: Promise<{ albumId: string }>
}

export default async function AlbumPage({params}: PageProps) {
    const slug = (await params).albumId;
    const albumId = parseInt(slug);
    if(Number.isNaN(albumId)) {
        return <h1>Invalid album id</h1>
    }
    const album = await api.albums.getAlbum({ id: albumId });
    if(!album) {
        return <h1>Album not found</h1>
    }
    return (
        <HydrateClient>
            <Navbar/>
            <main className='flex-grow'>
                <h1>{album.title}</h1>
                <Image src={"/covers/" + album.cover} alt={album.title} width={150} height={150} />
                <p>{album.artist.name}</p>
            </main>
            <Footer />
        </HydrateClient>
    )
}