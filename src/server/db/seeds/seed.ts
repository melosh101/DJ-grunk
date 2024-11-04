import {db} from '../index';
import {artists, albums, reviews} from '../schema';
import data from './albums.json';

(async () => {
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
})()