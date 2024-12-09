import { useState } from "react";

export default function CatForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);
  const [tags, setTags] = useState("");
  const [gif, setGif] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let searchTags = tags;

    if (tags && gif) {
      searchTags = "";
    }

    fetch(
      `https://cataas.com/cat${
        gif ? "/gif" : searchTags ? `/${searchTags}` : ""
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }

        return response.blob();
      })
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob); // Create URL for the image blob
        setResponse(imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Specific Tags for the cat (separate by comma)</label>
          <input
            type="text"
            placeholder="cute,orange"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="form-input">
          <input
            type="checkbox"
            checked={gif}
            onChange={(e) => setGif(e.target.checked)}
          />
          <label>gif? (tags will not work)</label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>An error occured</p>}
      {response && (
        <section className="cat-content">
          <img src={response} alt={`Cat`} />
        </section>
      )}
    </>
  );
}
