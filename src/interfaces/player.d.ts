type Album = {
  id: string;
  title: string;
  artistId: string;
  picture: string | null;
};

type Artist = {
  id: string;
  name: string;
  picture: string | null;
};

type Song = {
  id: string;
  link: string;
  title: string;
  duration: string;
  album: Album;
  artistId: string;
  updated_at: string;
  userId: string | null;
  albumId: string;
  artist: Artist;
  soundWave?: {
    data: string;
  };
};
