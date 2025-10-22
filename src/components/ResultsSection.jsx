import { motion } from "framer-motion";

export default function ResultsSection({ results }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mt-10 bg-white shadow-md rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-slate-700 mb-4">
        Scan Results ({results.length} ports found)
      </h3>

      {results.length === 0 ? (
        <p className="text-center text-gray-700 p-8">
          No scan results yet. Start a scan above!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="text-left px-4 py-2 border-b">Port</th>
                <th className="text-left px-4 py-2 border-b">Protocol</th>
                <th className="text-left px-4 py-2 border-b">State</th>
                <th className="text-left px-4 py-2 border-b">Service</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-2 border-b">{r.port}</td>
                  <td className="px-4 py-2 border-b">{r.protocol}</td>
                  <td
                    className={`px-4 py-2 border-b font-medium ${
                      r.state === "Open" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {r.state}
                  </td>
                  <td className="px-4 py-2 border-b">{r.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.section>
  );
}
