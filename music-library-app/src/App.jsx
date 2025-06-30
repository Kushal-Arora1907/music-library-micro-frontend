import { Music2, Plus, Shield, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AddSongForm from "./components/AddSongForm";
import FilterControls from "./components/FilterControls";
import SongCard from "./components/SongCard";
import { mockSongs } from "./data/mockData";

function App() {
  const [songs, setSongs] = useState(mockSongs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
  });

  const [sort, setSort] = useState({
    field: "title",
    direction: "asc",
  });

  const [group, setGroup] = useState({
    groupBy: "none",
  });

  // Get user data from localStorage (passed from main app)
  useEffect(() => {
    const storedUser = localStorage.getItem("musicApp_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const canModify = user?.role === "admin";

  // Get unique values for filter dropdowns using reduce
  const filterOptions = useMemo(() => {
    return songs.reduce(
      (acc, song) => {
        if (!acc.artists.includes(song.artist)) acc.artists.push(song.artist);
        if (!acc.albums.includes(song.album)) acc.albums.push(song.album);
        if (!acc.genres.includes(song.genre)) acc.genres.push(song.genre);
        if (!acc.years.includes(song.year)) acc.years.push(song.year);
        return acc;
      },
      {
        artists: [],
        albums: [],
        genres: [],
        years: [],
      }
    );
  }, [songs]);

  // Filter songs using filter method
  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesSearch =
        filters.search === "" ||
        song.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        song.artist.toLowerCase().includes(filters.search.toLowerCase()) ||
        song.album.toLowerCase().includes(filters.search.toLowerCase());

      const matchesArtist =
        filters.artist === "" || song.artist === filters.artist;
      const matchesAlbum = filters.album === "" || song.album === filters.album;
      const matchesGenre = filters.genre === "" || song.genre === filters.genre;
      const matchesYear =
        filters.year === "" || song.year.toString() === filters.year;

      return (
        matchesSearch &&
        matchesArtist &&
        matchesAlbum &&
        matchesGenre &&
        matchesYear
      );
    });
  }, [songs, filters]);

  // Sort songs
  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;

      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredSongs, sort]);

  // Group songs using reduce
  const groupedSongs = useMemo(() => {
    if (group.groupBy === "none") {
      return { "All Songs": sortedSongs };
    }

    return sortedSongs.reduce((acc, song) => {
      const key = song[group.groupBy].toString();
      if (!acc[key]) acc[key] = [];
      acc[key].push(song);
      return acc;
    }, {});
  }, [sortedSongs, group]);

  const handleAddSong = (newSong) => {
    const song = {
      ...newSong,
      id: Date.now().toString(),
    };
    setSongs((prev) => [...prev, song]);
  };

  const handleDeleteSong = (id) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  const totalSongs = songs.length;
  const filteredCount = sortedSongs.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <Music2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Music Library</h1>
                <p className="text-xs text-white/60">Micro Frontend</p>
              </div>
            </div>

            {user && (
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                <div className="flex items-center gap-2">
                  {user.role === "admin" ? (
                    <Shield className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <User className="w-4 h-4 text-blue-400" />
                  )}
                  <span className="text-white/90 font-medium capitalize">
                    {user.role}
                  </span>
                </div>
                <span className="text-white/60">•</span>
                <span className="text-white/90">{user.username}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats & Add Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
                <Music2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Music Library</h2>
                <p className="text-white/70">
                  {filteredCount} of {totalSongs} songs
                  {group.groupBy !== "none" && ` • Grouped by ${group.groupBy}`}
                </p>
              </div>
            </div>

            {canModify && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                <Plus className="w-5 h-5" />
                Add Song
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <FilterControls
            filters={filters}
            sort={sort}
            group={group}
            onFiltersChange={setFilters}
            onSortChange={setSort}
            onGroupChange={setGroup}
            availableArtists={filterOptions.artists.sort()}
            availableAlbums={filterOptions.albums.sort()}
            availableGenres={filterOptions.genres.sort()}
            availableYears={filterOptions.years.sort((a, b) => b - a)}
          />

          {/* Songs Display */}
          <div className="space-y-8">
            {Object.entries(groupedSongs).map(([groupName, groupSongs]) => (
              <div key={groupName}>
                {group.groupBy !== "none" && (
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {groupName}
                    </h3>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm">
                      {groupSongs.length} songs
                    </span>
                  </div>
                )}

                {groupSongs.length === 0 ? (
                  <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    <Music2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white/70 mb-2">
                      No songs found
                    </h3>
                    <p className="text-white/50">Try adjusting your filters</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupSongs.map((song) => (
                      <SongCard
                        key={song.id}
                        song={song}
                        canDelete={canModify}
                        onDelete={handleDeleteSong}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Song Modal */}
          {showAddForm && (
            <AddSongForm
              onAddSong={handleAddSong}
              onClose={() => setShowAddForm(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
