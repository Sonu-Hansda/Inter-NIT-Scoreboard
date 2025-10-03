import { useState } from "react";
import SportPill from "./SportPill";
import FootballScoreboard from "./FootballScoreboard";
import TableTennisScoreboard from "./TableTennisScoreboard";
import FutsalScoreboard from "./FutsalScoreboard";
import Teams from "./TeamDisplay";
import { VIDEO_CONFIG, type VideoSource } from "../../lib/videoConfig";

const SPORTS = ["Football", "Table Tennis", "Futsal", "Teams"];

export default function ScoreTable() {
  const [selected, setSelected] = useState(SPORTS[0]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [tableTennisGender, setTableTennisGender] = useState<"boys" | "girls">(
    "boys"
  );

  const handleSportChange = (sport: string) => {
    setSelected(sport);
    setSelectedVideoIndex(0);
  };

  const handleTableTennisGenderChange = (gender: "boys" | "girls") => {
    setTableTennisGender(gender);
    setSelectedVideoIndex(0);
  };

  const getCurrentSportVideos = (): VideoSource[] => {
    switch (selected) {
      case "Football":
        return VIDEO_CONFIG.football;
      case "Table Tennis":
        return tableTennisGender === "boys"
          ? VIDEO_CONFIG.tableTennisBoys
          : VIDEO_CONFIG.tableTennisGirls;
      case "Futsal":
        return VIDEO_CONFIG.futsal;
      default:
        return [];
    }
  };

  const currentSportVideos = getCurrentSportVideos();
  const currentVideo = currentSportVideos[selectedVideoIndex];

  const renderScoreboard = () => {
    switch (selected) {
      case "Football":
        return <FootballScoreboard />;
      case "Table Tennis":
        return (
          <TableTennisScoreboard
            viewGender={tableTennisGender}
            setViewGender={handleTableTennisGenderChange}
          />
        );
      case "Futsal":
        return <FutsalScoreboard />;
      case "Teams":
        return <Teams />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <div className="flex-1 p-6 md:p-10 min-h-[calc(100vh-120px)]">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Header + Sport Pills */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black">
                  <a href="https://inter-nit.sacnitjsr.org">
                    <span className="text-blue-900 mr-2.5 drop-shadow-[0_2px_2px_rgba(30,58,138,0.5)]">
                      INTER NIT
                    </span>
                  </a>
                  <span className="text-white drop-shadow-[0_2px_2px_rgba(30,58,138,0.5)]">
                    Scoreboard
                  </span>
                </h1>
                <p className="text-sm text-gray-400">
                  Real-time updates · Powered by{" "}
                  <a
                    className="underline"
                    href="https://cmdc.in"
                    target="_blank"
                    rel="noreferrer"
                  >
                    CMDC
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-2 items-stretch mt-6 md:mt-0">
              {SPORTS.map((sport) => (
                <SportPill
                  key={sport}
                  label={sport}
                  active={sport === selected}
                  onClick={() => handleSportChange(sport)}
                />
              ))}
            </div>
          </div>

          {/* Scoreboards */}
          {renderScoreboard()}

          {/* Videos */}
          {currentVideo && selected !== "Teams" && (
            <div className="mt-8 mb-8">
              <div className="relative aspect-video w-full bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={currentVideo.url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              {currentSportVideos.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {currentSportVideos.map((video, index) => (
                    <button
                      key={video.label}
                      className={`py-2 px-4 text-sm font-medium rounded-md ${selectedVideoIndex === index
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100"
                        }`}
                      onClick={() => setSelectedVideoIndex(index)}
                    >
                      {video.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8 py-4 border-t border-gray-300">
        <img
          src="/internit_logo.png"
          loading="lazy"
          alt="Organizing Committee Logo 2"
          className="h-20 w-20 object-contain"
        />
        <img
          src="/nitjsr_logo.png"
          loading="lazy"
          alt="Organizing Committee Logo 1"
          className="h-20 w-20 object-contain"
        />
        <img
          src="/fit_india.png"
          loading="lazy"
          alt="Organizing Committee Logo 3"
          className="h-20 w-20 object-contain"
        />
      </div>
    </div>
  );
}
