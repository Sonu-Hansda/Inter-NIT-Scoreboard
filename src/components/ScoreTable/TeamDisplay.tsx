export default function TeamsDisplay() {
  const teams = [
    "NIT Trichy",
    "NIT Warangal",
    "NITK Surathkal",
    "NIT Calicut",
    "NIT Rourkela",
    "NIT Durgapur",
    "NIT Kurukshetra",
    "NIT Silchar",
    "NIT Meghalaya",
    "NIT Patna",
    "NIT Jamshedpur",
    "MANIT Bhopal",
    "NIT Agartala",
    "NIT Srinagar",
    "NIT Goa",
    "NIT Delhi",
    "NIT Raipur",
    "NIT Jalandhar",
    "IIEST Shibpur",
    "NIT Arunachal Pradesh",
    "NIT Sikkim",
    "NIT Nagaland",
    "NIT Mizoram",
    "NIT Manipur",
    "NIT Uttarakhand",
    "NIT Puducherry",
    "MNIT Jaipur",
    "NIT Andhra Pradesh",
    "VNIT Nagpur",
    "MNNIT Allahabad",
  ];

  const borderColors = [
    "#3b82f6",
    "#ef4444",
    "#22c55e",
    "#eab308",
    "#8b5cf6",
    "#ec4899",
    "#f97316",
    "#14b8a6",
  ];

  return (
    <div className="overflow-x-auto bg-gray-50 rounded-lg p-8">
      <h2 className="text-5xl font-extrabold text-center mb-12 text-gradient">
        Participating Teams
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teams.map((team, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-white to-gray-100 p-4 border border-gray-200 hover:from-white hover:to-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in"
            style={{
              animationDelay: `${index * 50}ms`,
              transform: "skew(-10deg)",
              borderRight: `4px solid ${
                borderColors[index % borderColors.length]
              }`,
            }}
          >
            <div
              style={{
                transform: "skew(10deg)",
              }}
            >
              <div className="flex items-center justify-center h-20">
                <h3 className="text-lg font-bold text-gray-800 text-center leading-tight group-hover:text-blue-900 transition-colors">
                  {team}
                </h3>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
