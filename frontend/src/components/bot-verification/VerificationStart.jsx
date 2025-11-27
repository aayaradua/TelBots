import { useState } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";

export default function VerificationPage() {
  const [botUsername, setBotUsername] = useState("");
  const [step, setStep] = useState("form");
  const [verificationCode, setVerificationCode] = useState("");
  const [botId, setBotId] = useState(null);
  const [status, setStatus] = useState("");

  const requestVerification = async () => {
    const res = await api.post("/verification/request", { botUsername });
    setVerificationCode(res.data.instructions.split(": ")[1]);
    setBotId(res.data.botId);
    setStep("instructions");
  };

  const checkStatus = async () => {
    const res = await api.get(`/verification/status/${botId}`);
    setStatus(res.data.status);
    if (res.data.status === "verified") 
        setStep("done");
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-24">

      {step === "form" && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border rounded-xl bg-gray-900"
        >
          <h1 className="text-xl font-bold mb-4">Bot Verification</h1>

          <input
            placeholder="@yourBot"
            value={botUsername}
            onChange={(e) => setBotUsername(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700 text-white mb-4"
          />

          <button
            onClick={requestVerification}
            className="w-full p-3 rounded bg-blue-600 text-white font-semibold"
          >
            Request Verification
          </button>
        </motion.div>
      )}

      {step === "instructions" && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border rounded-xl bg-gray-900"
        >
          <h1 className="text-xl font-bold mb-4">Verification Instructions</h1>

          <p className="text-gray-300 mb-4">
            Add this code to your Telegram bot description:
          </p>

          <div className="bg-black border border-gray-700 p-4 rounded mb-4 font-mono">
            {verificationCode}
          </div>

          <button
            onClick={checkStatus}
            className="w-full p-3 rounded bg-green-600 text-white font-semibold"
          >
            Check Status
          </button>
        </motion.div>
      )}

      {step === "done" && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border rounded-xl bg-gray-900 text-center"
        >
          <h1 className="text-2xl font-bold text-green-500">Bot Verified</h1>
          <p className="text-gray-400 mt-2">You now have a verified badge and ranking boost.</p>
        </motion.div>
      )}
    </div>
  );
}
