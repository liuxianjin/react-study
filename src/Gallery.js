export default function Gallery() {
  const arr = [
    {
      src: "https://i.imgur.com/MK3eW3As.jpg",
      alt: "Katherine Johnson"
    },
    {
      src: "https://i.imgur.com/MK3eW3As.jpg",
      alt: "Katherine Johnson"
    },
    {
      src: "https://i.imgur.com/MK3eW3As.jpg",
      alt: "Katherine Johnson"
    },
    {
      src: "https://i.imgur.com/MK3eW3As.jpg",
      alt: "Katherine Johnson"
    }
  ]
  const profiles = arr.map(({src, alt}, index) => <Profile src={src} key={index} alt={alt}/>);
  return (
    <section>
      {profiles}
    </section>
  );
}

export function Profile({src, alt}) {
  return (
    <>
      <img
        src={src}
        alt={alt}
      />
    </>
  );
}

