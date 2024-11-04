import {db} from '../index';
import {artists, albums} from '../schema';
import data from './albums.json';

const seed = async () => {
    const album = await db.query.albums.findMany();
    if(album.length > 0) {
        console.log('Albums already seeded skipping');
        return;
    }
    for (const album of data) {
        const artist = await db.insert(artists).values({
            name: album.Kunstner,
        }).returning();
        if(!artist[0]) {
            throw new Error('Artist not found');
        }
        await db.insert(albums).values({
            title: album.Titel,
            artistId: artist[0].id,
            cover: album.Billede,
        });
    }
    return;
};

await seed().then(() => {
    console.log('Seed complete');
    process.exit(0);
})