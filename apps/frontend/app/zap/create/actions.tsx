import { FaWpforms, FaEnvelope, FaUserAlt, FaGithub, FaDollarSign } from 'react-icons/fa';
import { useState } from "react";
import { AiOutlineMail, AiOutlineWallet } from "react-icons/ai";
import { PrimaryButton } from '../../../components/buttons/PrimaryButton';
import { Input } from '../../../components/Input';
export const availableTriggers = [
    // { id: "trigger_2", name: "New Email Received", icon: <FaEnvelope />, actions: ["action_1", "action_3"] },
    // { id: "trigger_3", name: "Payment Completion", icon: <FaDollarSign />, actions: ["action_4", "action_5"] },
    { id: "trigger_4", name: "New User Sign In", icon: <FaUserAlt />, actions: ["action_1", "action_6"] },
    // { id: "trigger_5", name: "GitHub New Issue", icon: <FaGithub />, actions: ["action_3", "action_4"] },
];

export const availableActions = [
    { id: "action_1", name: "Send Welcome Email", icon: <FaEnvelope /> },
    { id: "action_2", name: "Send Solana", icon: <FaDollarSign /> },
    { id: "action_3", name: "Send Owner an Email", icon: <FaEnvelope /> },
    { id: "action_4", name: "Update DB", icon: <FaWpforms /> },
    { id: "action_5", name: "Send Email to Service Team", icon: <FaEnvelope /> },
    { id: "action_6", name: "Update Database", icon: <FaUserAlt /> },
    // Add more actions as needed
];

export function EmailSelector({ setMetadata }: { setMetadata: (params: any) => void; }) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <AiOutlineMail className="text-[#512D6D] w-6 h-6" />
                <Input label={"To"} type={"text"} placeholder="Recipient's Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Input label={"Body"} type={"text"} placeholder="Email Body" onChange={(e) => setBody(e.target.value)} />
            <div className="pt-2">
                <PrimaryButton onClick={() => {
                    setMetadata({
                        email,
                        body
                    });
                }}>Submit</PrimaryButton>
            </div>
        </div>
    );
}

export function SolanaSelector({ setMetadata }: { setMetadata: (params: any) => void; }) {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <AiOutlineWallet className="text-[#512D6D] w-6 h-6" />
                <Input label={"To"} type={"text"} placeholder="Recipient's Address" onChange={(e) => setAddress(e.target.value)} />
            </div>
            <Input label={"Amount"} type={"text"} placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
            <div className="pt-4">
                <PrimaryButton onClick={() => {
                    setMetadata({
                        amount,
                        address
                    });
                }}>Submit</PrimaryButton>
            </div>
        </div>
    );
}
