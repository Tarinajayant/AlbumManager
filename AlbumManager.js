import React, { useState, useEffect } from "react";
import "./AlbumManager.css";

const AlbumManager = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const addAlbum = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums",
        {
          method: "POST",
          body: JSON.stringify({
            userId: 1,
            title: newAlbumTitle
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      );
      const data = await response.json();
      setAlbums([...albums, data]);
      setNewAlbumTitle("");
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  const updateAlbum = async (albumId, updatedTitle) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: albumId,
            userId: 1,
            title: updatedTitle
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      );
      const data = await response.json();
      const updatedAlbums = albums.map((album) =>
        album.id === albumId ? data : album
      );
      setAlbums(updatedAlbums);
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  const deleteAlbum = async (albumId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
        method: "DELETE"
      });
      const updatedAlbums = albums.filter((album) => album.id !== albumId);
      setAlbums(updatedAlbums);
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  return (
    <div className="album-manager">
      <h1>ALBUM MANAGER APPLICATION</h1>
      <h3 className="update-label">Update</h3>
      <div className="album-input-section">
        <input
          type="text"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          placeholder="Enter album title"
          className="album-input"
        />
        <button onClick={addAlbum} className="add-album-button">
          Add Album
        </button>
      </div>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id} className="album-item">
            <div className="album-item-content">
              <span className="album-title">{album.title}</span>
              <input
                type="text"
                defaultValue={album.title}
                className="update-input"
                onBlur={(e) => updateAlbum(album.id, e.target.value)}
              />
            </div>
            <div className="album-buttons">
              <button
                onClick={() => deleteAlbum(album.id)}
                className="album-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumManager;
