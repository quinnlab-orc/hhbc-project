import albumsJSON from "../albums.json";

const DisplayAlbums = () => {
  return (
    <div className="albums">
      {albumsJSON.albums.map(({ title, artist }, index) => (
        <div key={title}>
          <p>{artist + " - " + title}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbums;