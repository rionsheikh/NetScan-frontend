import { useState } from "react";
import { validateCustomPorts } from "../lib/util";
import { motion } from "framer-motion";

export default function ScanForm({ onScanComplete }) {
  const [formData, setFormData] = useState({
    target: "",
    scanType: "top_100",
    ports: "",
    authorized: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    let hasError = false;
    e.preventDefault();
    const newErrors = {};

    if (!formData.target.trim()) {
      newErrors.target = "Please enter a valid target host or IP.";
      hasError = true;
    }

    if (formData.scanType === "custom") {
      const validPorts = validateCustomPorts(formData.ports);
      if (validPorts.length === 0)
        newErrors.ports = "Enter at least one valid port (1–65535).";
      hasError = true;
    }

    if (!formData.authorized) {
      newErrors.authorized = "You must confirm authorization.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setLoading(true);

      try {
        await new Promise((r) => setTimeout(r, 1200));
        const fakeResults = [
          { port: 22, protocol: "TCP", state: "Open", service: "SSH" },
          { port: 80, protocol: "TCP", state: "Open", service: "HTTP" },
          { port: 443, protocol: "TCP", state: "Open", service: "HTTPS" },
        ];
        onScanComplete(fakeResults);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex-1 bg-white rounded-2xl shadow-md p-3 md:p-8 "
    >
      <h2 className="text-2xl font-semibold text-slate-700 mb-2">
        Scan a Target
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Enter target details to start scanning. Use responsibly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Target (IP / Hostname)
          </label>
          <input
            name="target"
            type="text"
            value={formData.target}
            onChange={handleChange}
            placeholder="example.com or 192.168.1.1"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <p className="text-sm text-red-500 mt-1">{errors.target || ""}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Scan Type
          </label>
          <select
            name="scanType"
            value={formData.scanType}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="top_100">Top 100</option>
            <option value="top_500">Top 500</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {formData.scanType === "custom" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Custom Port Range / Notes
            </label>
            <textarea
              name="ports"
              rows="4"
              value={formData.ports}
              onChange={handleChange}
              placeholder="Example: 20-25,80,443"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
            ></textarea>
            <p className="text-sm text-red-500 mt-1">{errors.ports || ""}</p>
          </div>
        )}

        <div>
          <div className="flex items-start space-x-2">
            <input
              name="authorized"
              type="checkbox"
              checked={formData.authorized}
              onChange={handleChange}
              className="h-4 w-4 mt-1 text-indigo-600 focus:ring-indigo-400 rounded"
            />
            <label htmlFor="authorized" className="text-sm text-slate-700">
              I confirm I have authorization to scan this target.
            </label>
          </div>
          <p className="text-sm text-red-500 mt-1">{errors.authorized || ""}</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-full text-white font-medium transition duration-200 cursor-pointer ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Scanning..." : "Start Scan"}
        </button>
      </form>
    </motion.div>
  );
}
