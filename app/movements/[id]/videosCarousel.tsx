const videos = [
  {
    id: 1,
    url: "https://i.makeagif.com/media/8-17-2016/xeicob.gif",
    label: "Jan 4, 2026",
  },
  {
    id: 2,
    url: "https://i.makeagif.com/media/4-26-2017/L99PNb.gif",
    label: "Dec 2, 2025",
  },
  {
    id: 3,
    url: "https://i.makeagif.com/media/10-13-2013/5VJPBF.gif",
    label: "Nov 12, 2025",
  },
  {
    id: 4,
    url: "https://i.makeagif.com/media/1-27-2017/_u_5je.gif",
    label: "Oct 10, 2025",
  },
];

export default function VideosCarousel() {
  return (
    <div className="flex flex-wrap gap-2 justify-between content-start">
      {videos.map((video) => (
        <div key={video.id} className="size-50 rounded-sm relative">
          <img
            key={video.id}
            alt={video.label}
            src={video.url}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-1 text-primary-text/75 bg-info p-0.5 px-1.5 rounded-full">
            {video.label}
          </div>
        </div>
      ))}
    </div>
  );
}
