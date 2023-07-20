import { getOldSongsFromPlaylist } from "./getOldSongsFromPlaylist";
import { add } from "./add";
import { remove } from "./remove";

export async function replace(playlist_id) {
  let songs_to_replace = await getOldSongsFromPlaylist(playlist_id);
  console.log("songs to replace" + songs_to_replace);
  songs_to_replace
    .slice()
    .reverse()
    .forEach((song) => {
      add(playlist_id, song.tv, song.position);
    });
  let ids_to_replace = songs_to_replace.map((song) => {
    return song.old;
  });
  await remove(playlist_id, ids_to_replace);
}
