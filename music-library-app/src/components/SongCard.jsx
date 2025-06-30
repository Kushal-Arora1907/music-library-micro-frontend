import { Calendar, Clock, Play, Trash } from "lucide-react";

const SongCard = ({ song, canDelete, onDelete }) => {
  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] relative">
      {" "}
      {/* Added 'relative' to make absolute positioning work */}
      <div className="flex items-start gap-4">
        {/* Album Cover */}
        <div className="relative">
          <img
            src={song.coverUrl}
            alt={`${song.album} cover`}
            className="w-16 h-16 rounded-lg object-cover shadow-lg"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <Play className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col items-start">
            {" "}
            {/* Changed to flex-col for stacked info */}
            <h3 className="font-semibold text-white text-lg truncate group-hover:text-purple-200 transition-colors w-full">
              {" "}
              {/* Added w-full */}
              {song.title}
            </h3>
            <p className="text-white/70 truncate w-full">{song.artist}</p>{" "}
            {/* Added w-full */}
            <p className="text-white/50 text-sm truncate w-full">
              {song.album}
            </p>{" "}
            {/* Added w-full */}
          </div>

          {/* Song Details */}
          <div className="flex items-center gap-4 mt-3 text-white/60 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{song.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{song.year}</span>
            </div>
            <span className="px-2 py-1 bg-white/10 rounded-md text-xs">
              {song.genre}
            </span>
          </div>
        </div>
      </div>
      {canDelete && (
        <button
          onClick={() => onDelete(song.id)}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 rounded-lg transition-all duration-200 hover:shadow-lg z-10" // Added absolute positioning
          title="Delete song">
          <Trash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SongCard;
