import { useState } from "react";

const Winners = () => {
  const [selectedSport, setSelectedSport] = useState<"football" | "tableTennis" | "futsal">("football");
  const [gender, setGender] = useState<"boys" | "girls">("boys");

  // Editable winners data
  const sportsData = {
    football: {
      winner: "NIT Jamshedpur",
      bestPlayer: "Rohit Sharma",
      runnerUp: "NIT Trichy",
      images: ["/images/football1.jpg", "/images/football2.jpg", "/images/football3.jpg"],
    },
    tableTennis: {
      boys: {
        winner: "NIT Warangal",
        bestPlayer: "Aman Gupta",
        runnerUp: "NIT Calicut",
        images: ["/images/tt1.jpg", "/images/tt2.jpg", "/images/tt3.jpg"],
      },
      girls: {
        winner: "NIT Surathkal",
        bestPlayer: "Ananya Singh",
        runnerUp: "NIT Rourkela",
        images: ["/images/tt_girls1.jpg", "/images/tt_girls2.jpg", "/images/tt_girls3.jpg"],
      },
    },
    futsal: {
      winner: "NIT Calicut",
      bestPlayer: "Vivek Raj",
      runnerUp: "NIT Rourkela",
      images: ["/images/futsal1.jpg", "/images/futsal2.jpg", "/images/futsal3.jpg"],
    },
  };

  const data =
    selectedSport === "tableTennis"
      ? sportsData.tableTennis[gender]
      : sportsData[selectedSport];

  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-indigo-50 via-white to-orange-50 min-h-screen text-gray-800 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-blue-900">
        Inter NIT Tournament Winners
      </h1>

      {/* Sport Selection */}
      <div className="flex flex-wrap justify-center mb-8 gap-3">
        {["football", "tableTennis", "futsal"].map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport as any)}
            className={`px-5 py-2 rounded-full font-semibold shadow-md transition-all ${
              selectedSport === sport
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {sport === "football"
              ? "Football"
              : sport === "tableTennis"
              ? "Table Tennis"
              : "Futsal"}
          </button>
        ))}
      </div>

      {/* Gender toggle only for Table Tennis */}
      {selectedSport === "tableTennis" && (
        <div className="flex justify-center gap-4 mb-8">
          {["boys", "girls"].map((g) => (
            <button
              key={g}
              onClick={() => setGender(g as any)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                gender === g
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Winner Details */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10 border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center capitalize">
          {selectedSport === "tableTennis"
            ? `Table Tennis (${gender})`
            : selectedSport === "football"
            ? "Football"
            : "Futsal"}
        </h2>

        <div className="space-y-4 text-lg">
          <p>
            <b>Winner:</b> {data.winner}
          </p>
          <p>
            <b>Best Player:</b> {data.bestPlayer}
          </p>
          <p>
            <b>Runner-up:</b> {data.runnerUp}
          </p>
          {/* Future posts/positions can be added here */}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-blue-900">
          Tournament Gallery
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.images.map((src, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-md hover:scale-105 transform transition duration-300"
            >
              <img
                src={src}
                alt={`moment-${i}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Winners;
