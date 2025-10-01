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

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Participating Teams
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {teams.map((team, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 p-4 hover:from-blue-100 hover:to-indigo-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in"
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <div className="flex items-center justify-center h-16">
              <h3 className="text-sm font-semibold text-gray-800 text-center leading-tight group-hover:text-blue-900 transition-colors">
                {team}
              </h3>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        ))}
      </div>
    </div>
  );
}